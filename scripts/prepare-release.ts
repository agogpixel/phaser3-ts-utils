import { exec } from 'child_process';
import { writeFile } from 'fs';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageJson = require('../dist/package.json');

const isDevRelease = process.argv.length > 2 && process.argv[2] === 'dev';

const timestamp = Math.floor(Date.now() / 1000);

const tarballPrefix = 'phaser3-ts-utils';

const tarballPostfix = `${packageJson.version}` + (isDevRelease ? `-dev.${timestamp}` : '');

const srcTarball = `agogpixel-${tarballPrefix}-${tarballPostfix}.tgz`;
const dstTarball = isDevRelease ? `${tarballPrefix}-dev.tgz` : `${tarballPrefix}-${tarballPostfix}.tgz`;

function pack() {
  const mvCmd = `mv ${srcTarball} ../${dstTarball}`;

  exec(`cd dist && npm pack && ${mvCmd} && cd ..`, (err, stdout, stderr) => {
    if (err) {
      console.error(err.message);
      throw err;
    }

    writeFile(
      'release-log.txt',
      `[${timestamp}]\nPrepare Release: ${dstTarball}\n\nstdout:\n\n${stdout}\n\nstderr:\n\n${stderr}\n\n`,
      { flag: 'a', encoding: 'utf-8' },
      (err) => {
        if (err) {
          console.error(err.message);
          throw err;
        }

        writeFile('release-tarball-name.txt', dstTarball, { flag: 'w', encoding: 'utf-8' }, (err) => {
          if (err) {
            console.error(err.message);
            throw err;
          }

          console.log(dstTarball);
        });
      }
    );
  });
}

if (isDevRelease) {
  packageJson.version = tarballPostfix;

  writeFile('dist/package.json', JSON.stringify(packageJson, undefined, 2), { flag: 'w', encoding: 'utf-8' }, (err) => {
    if (err) {
      console.error(err.message);
      throw err;
    }

    pack();
  });
} else {
  pack();
}
