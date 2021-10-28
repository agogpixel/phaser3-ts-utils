import { exec } from 'child_process';
import { writeFile } from 'fs';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageJson = require('../dist/package.json');

const isDevRelease = process.argv.length > 2 && process.argv[2] === 'dev';

const tarballPrefix = 'phaser3-ts-utils';

const tarballPostfix = `${packageJson.version}` + (isDevRelease ? `-dev.${Math.floor(Date.now() / 1000)}` : '');

function pack() {
  const mvCmd =
    `mv agogpixel-${tarballPrefix}-${tarballPostfix}.tgz ` +
    (isDevRelease ? `../${tarballPrefix}-latest.tgz` : `../${tarballPrefix}-${tarballPostfix}.tgz`);

  exec(`cd dist && npm pack && ${mvCmd} && cd ..`, (err, stdout, stderr) => {
    if (err) {
      console.error(err.message);
      throw err;
    }

    console.log(stdout);
    console.log(stderr);
  });
}

if (isDevRelease) {
  packageJson.version = tarballPostfix;

  writeFile('dist/package.json', JSON.stringify(packageJson, undefined, 2), 'utf-8', (err) => {
    if (err) {
      console.error(err.message);
      throw err;
    }

    pack();
  });
} else {
  pack();
}
