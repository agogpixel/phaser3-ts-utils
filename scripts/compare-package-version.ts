import { clean, compare } from 'semver';
import { exit } from 'shelljs';

import { parseArgv, readPackageJson } from './shared';

const {
  args: [tag]
} = parseArgv<never>();

if (!tag) {
  console.error('Invalid tag argument');
  exit(1);
}

const { version: packageVersion } = readPackageJson();

const result = compare(clean(tag), clean(packageVersion as string));

if (result) {
  console.error(`Not congruent: package version: ${packageVersion} input tag: ${tag}`);
  exit(1);
}

console.log(`Congruent: package version: ${packageVersion} input tag: ${tag}`);

exit();
