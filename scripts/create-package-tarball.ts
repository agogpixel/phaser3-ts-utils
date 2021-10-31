import { writeFileSync } from 'fs';
import { exec, exit } from 'shelljs';

import { config, exitOnError, parseArgv, readDistPackageJson, writeDistPackageJson, writePackageLog } from './shared';

enum Flag {
  Release = 'release'
}

const { opts } = parseArgv<{ [F in Flag]: boolean }>();

const packageJson = readDistPackageJson();

const isDevRelease = !opts.release;

const timestamp = Math.floor(Date.now() / 1000);

const tarballPrefix = 'phaser3-ts-utils';
const tarballPostfix = `${packageJson.version}` + (isDevRelease ? `-dev.${timestamp}` : '');

const srcTarball = `agogpixel-${tarballPrefix}-${tarballPostfix}.tgz`;
const dstTarball = isDevRelease ? `${tarballPrefix}-next.tgz` : `${tarballPrefix}-v${tarballPostfix}.tgz`;

console.log('Create package tarball with dist\n');

if (isDevRelease) {
  packageJson.version = tarballPostfix;
  writeDistPackageJson(packageJson);
}

const packResult = exitOnError(exec, `cd dist && npm pack && mv ${srcTarball} ../${dstTarball} && cd ..`, {
  silent: true
});

writePackageLog(
  `[${timestamp}]\nCreate Package Tarball: ${dstTarball}\n\nstdout:\n\n${packResult.stdout}\n\nstderr:\n\n${packResult.stderr}\n\n`
);

try {
  writeFileSync(config.packageTarballNamePath, dstTarball);
} catch (e) {
  console.error(e);
  exit(1);
}

console.log(dstTarball);

exit();
