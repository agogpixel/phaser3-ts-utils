import { existsSync, writeFileSync } from 'fs';
import { clean, gt, major, minor, patch, prerelease } from 'semver';
import { cat, exec, exit } from 'shelljs';

import { exitOnError } from '../shared';

interface SmartTag {
  version: string;
  tags: string[];
}

export function smartTag(tarball: string): SmartTag {
  const matches = tarball.match(/^phaser3-ts-utils-(.+)\.tgz$/);

  if (!matches || matches.length < 2) {
    console.error(`Package tarball ${tarball} is invalid`);
    exit(1);
  }

  const slug = matches[1];

  if (slug === 'next') {
    return {
      version: 'next',
      tags: ['next']
    };
  }

  const packageVersion = clean(slug);

  if (!packageVersion) {
    console.error(`Package tarball version ${slug} is invalid`);
    exit(1);
  }

  const cacheFilename = '.smarttagcache';

  let cache: Record<string, string[]> = {};

  if (existsSync(cacheFilename)) {
    cache = JSON.parse(exitOnError(cat, cacheFilename).stdout);

    if (Array.isArray(cache[packageVersion])) {
      return {
        version: packageVersion,
        tags: cache[packageVersion]
      };
    }
  }

  const isPreRelease = !!prerelease(packageVersion);

  const publishedVersions = fetchPublishedVersions(isPreRelease);

  if (publishedVersions.includes(packageVersion)) {
    console.error(`Package already published with version: ${packageVersion}`);
    exit(1);
  }

  const apv = analyzePackageVersion(packageVersion, publishedVersions);

  const tagPrefixes = [
    `v${apv.major.toString()}`,
    `v${apv.major.toString()}.${apv.minor.toString()}`,
    `v${apv.major.toString()}.${apv.minor.toString()}.${apv.patch.toString()}`
  ];

  const smartTag: SmartTag = {
    version: apv.version,
    tags: isPreRelease ? smartTagPreRelease(apv, tagPrefixes) : smartTagRelease(apv, tagPrefixes)
  };

  cache[packageVersion] = smartTag.tags;

  try {
    writeFileSync(cacheFilename, JSON.stringify(cache));
  } catch (e) {
    console.error(e);
    exit(1);
  }

  return smartTag;
}

function fetchPublishedVersions(isPreRelease: boolean): string[] {
  return (
    JSON.parse(
      exitOnError(exec, `npm view @agogpixel/phaser3-ts-utils versions --json`, {
        silent: true
      }).stdout
    ) as string[]
  ).filter((version) => {
    const preReleaseParts = prerelease(version);
    const preReleaseExists = !!preReleaseParts;

    return (
      (isPreRelease &&
        preReleaseExists &&
        !preReleaseParts.some((part) => typeof part === 'string' && !!part.match(/(^dev|.*-dev)$/))) ||
      (!isPreRelease && !preReleaseExists)
    );
  });
}

interface AnalyzedPackageVersion {
  version: string;
  major: number;
  minor: number;
  patch: number;
  isMajorHighest: boolean;
  isMinorHighest: boolean;
  isPatchHighest: boolean;
  matches: {
    major: string[];
    minor: string[];
    patch: string[];
  };
}

function analyzePackageVersion(packageVersion: string, publishedVersions: string[]): AnalyzedPackageVersion {
  const packageVersionMajor = major(packageVersion);
  const packageVersionMinor = minor(packageVersion);
  const packageVersionPatch = patch(packageVersion);

  let isPackageVersionMajorHighest = true;
  let isPackageVersionMinorHighest = true;
  let isPackageVersionPatchHighest = true;

  const matchingMajorVersions = publishedVersions.filter((version) => {
    const v = major(version);

    if (v > packageVersionMajor) {
      isPackageVersionMajorHighest = false;
      return false;
    }

    return packageVersionMajor === v;
  });

  const matchingMinorVersions = matchingMajorVersions.filter((version) => {
    const v = minor(version);

    if (v > packageVersionMinor) {
      isPackageVersionMinorHighest = false;
      return false;
    }

    return packageVersionMinor === v;
  });

  const matchingPatchVersions = matchingMinorVersions.filter((version) => {
    const v = patch(version);

    if (v > packageVersionPatch) {
      isPackageVersionPatchHighest = false;
      return false;
    }

    return packageVersionPatch === v;
  });

  return {
    version: packageVersion,
    major: packageVersionMajor,
    minor: packageVersionMinor,
    patch: packageVersionPatch,
    isMajorHighest: isPackageVersionMajorHighest,
    isMinorHighest: isPackageVersionMinorHighest,
    isPatchHighest: isPackageVersionPatchHighest,
    matches: {
      major: matchingMajorVersions,
      minor: matchingMinorVersions,
      patch: matchingPatchVersions
    }
  };
}

function smartTagRelease(apv: AnalyzedPackageVersion, tagPrefixes: string[]): string[] {
  const availableTags = tagPrefixes.map((v) => `${v}~latest`);

  if (apv.isMajorHighest) {
    if (!apv.matches.major.length) {
      // Highest new major version.
      // latest, vX~latest, vX.Y~latest
      return ['latest'].concat(availableTags.slice(0, -1));
    }

    if (apv.isMinorHighest) {
      if (!apv.matches.minor.length || apv.isPatchHighest) {
        // Highest new minor version on highest major version or
        // highest new patch version on highest major.minor version.
        // latest, vX~latest, vX.Y~latest
        return ['latest'].concat(availableTags.slice(0, -1));
      }

      // New patch version on highest major.minor version.
      // vX.Y.Z~latest
      return availableTags.slice(-1);
    }

    if (!apv.matches.minor.length || apv.isPatchHighest) {
      // New minor version on highest major version or
      // highest new patch version on minor version.
      // vX.Y~latest
      return availableTags.slice(1, -1);
    }

    // New patch version on minor version.
    // vX.Y.Z~latest
    return availableTags.slice(-1);
  }

  if (!apv.matches.major.length) {
    // New major version.
    // vX~latest, vX.Y~latest
    return availableTags.slice(0, -1);
  }

  if (apv.isMinorHighest) {
    if (!apv.matches.minor.length || apv.isPatchHighest) {
      // Highest new minor version on major version or
      // highest new patch version on highest minor version.
      // vX~latest, vX.Y~latest
      return availableTags.slice(0, -1);
    }

    // New patch version on highest minor version.
    // vX.Y.Z~latest
    return availableTags.slice(-1);
  }

  if (!apv.matches.minor.length || apv.isPatchHighest) {
    // New minor version on major version or
    // highest new patch version on minor version.
    // vX.Y~latest
    return availableTags.slice(1, -1);
  }

  // New patch version on minor version.
  // vX.Y.Z~latest
  return availableTags.slice(-1);
}

function smartTagPreRelease(apv: AnalyzedPackageVersion, tagPrefixes: string[]): string[] {
  // vX~next, vX.Y~next, vX.Y.Z~next
  const availableTags = tagPrefixes.map((v) => `${v}~next`);

  if (apv.isMajorHighest) {
    if (!apv.matches.major.length) {
      // Highest new major version.
      // vX~next, vX.Y~next, vX.Y.Z~next
      return availableTags.slice();
    }

    if (apv.isMinorHighest) {
      if (!apv.matches.minor.length) {
        // Highest new minor version on highest major version.
        // vX~next, vX.Y~next, vX.Y.Z~next
        return availableTags.slice();
      }

      if (apv.isPatchHighest) {
        if (!apv.matches.patch.length || gt(apv.version, apv.matches.patch.slice(-1)[0])) {
          // Highest new patch version on highest major.minor version or
          // highest pre-release version on highest major.minor.patch version.
          // vX~next, vX.Y~next, vX.Y.Z~next
          return availableTags.slice();
        }
      }

      // New patch version on highest major.minor version or
      // new pre-release version on major.minor.patch version.
      // vX.Y.Z~next
      return availableTags.slice(-1);
    }

    if (!apv.matches.minor.length) {
      // New minor version on highest major version.
      // vX.Y~next, vX.Y.Z~next
      return availableTags.slice(-2);
    }

    // Highest new patch version on major.minor version or
    // new pre-release version on major.minor.patch version.
    // vX.Y.Z~next
    return availableTags.slice(-1);
  }

  if (!apv.matches.major.length) {
    // New major version.
    // vX.Y~next, vX.Y.Z~next
    return availableTags.slice(-2);
  }

  if (apv.isMinorHighest) {
    if (!apv.matches.minor.length) {
      // Highest new minor version.
      // vX.Y~next, vX.Y.Z~next
      return availableTags.slice(-2);
    }

    if (apv.isPatchHighest) {
      if (!apv.matches.patch.length || gt(apv.version, apv.matches.patch.slice(-1)[0])) {
        // Highest new patch version on highest minor version or
        // highest pre-release version on highest minor.patch version.
        // vX.Y~next, vX.Y.Z~next
        return availableTags.slice(-2);
      }
    }

    // New pre-release version on highest minor.patch version or
    // new patch version on highest minor version or
    // new pre-release version on minor.patch version.
    // vX.Y.Z~next
    return availableTags.slice(-1);
  }

  if (!apv.matches.minor.length) {
    // New minor version.
    // vX.Y~next, vX.Y.Z~next
    return availableTags.slice(-2);
  }

  if (apv.isPatchHighest) {
    if (!apv.matches.patch.length || gt(apv.version, apv.matches.patch.slice(-1)[0])) {
      // Highest new patch version on highest minor version or
      // highest pre-release version on highest patch version.
      // vX.Y~next, vX.Y.Z~next
      return availableTags.slice(-2);
    }

    // New pre-release version on highest patch version.
    // vX.Y.Z~next
    return availableTags.slice(-1);
  }

  if (!apv.matches.patch.length) {
    // Highest new patch version on major.minor version.
    // vX.Y~next, vX.Y.Z~next
    return availableTags.slice(-2);
  }

  // New pre-release version on major.minor.patch version.
  // vX.Y.Z~next
  return availableTags.slice(-1);
}
