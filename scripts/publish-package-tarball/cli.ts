import { cat, exec, exit } from 'shelljs';

import { config, exitOnError, parseArgv, writePackageLog } from '../shared';

import { smartTag } from './smart-tag';

const {
  args: [registry]
} = parseArgv<never>();

const tarball = exitOnError(cat, config.packageTarballNamePath).stdout;

const { version: packageVersion, tags } = smartTag(tarball);

if (!tags.length) {
  console.error('Help! Smart tags failed');
  exit(1);
}

const publishResult = exitOnError(exec, `npm publish ${tarball} --tag ${tags[0]} --access public`, {
  silent: true
});

writePackageLog(
  `Publish Package Tarball: ${tarball} @${tags[0]}\n\n${
    registry ? 'registry name: ' + registry + '\n\n' : ''
  }stdout:\n\n${publishResult.stdout}\n\nstderr:\n\n${publishResult.stderr}\n\n`
);

const packageSlug = `@agogpixel/phaser3-ts-utils@${packageVersion}`;

for (let i = 1; i < tags.length; ++i) {
  const tag = tags[i];
  const tagResult = exitOnError(exec, `npm dist-tag add ${packageSlug} ${tag}`, {
    silent: true
  });

  writePackageLog(
    `Tag Published Package: @agogpixel/phaser3-ts-utils@${packageVersion} @${tag}\n\n${
      registry ? 'registry name: ' + registry + '\n\n' : ''
    }stdout:\n\n${tagResult.stdout}\n\nstderr:\n\n${tagResult.stderr}\n\n`
  );
}

exit();
