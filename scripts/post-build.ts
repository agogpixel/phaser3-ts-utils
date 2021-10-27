import { copyFile, writeFile } from 'fs';
import { join } from 'path';
import { promisify } from 'util';

const copyFilePromise = promisify(copyFile);
const writeFilePromise = promisify(writeFile);

function copyFiles(srcDir: string, destDir: string, files: string[]) {
  return Promise.all(files.map((f) => copyFilePromise(join(srcDir, f), join(destDir, f))));
}

Promise.all([
  copyFiles('src', 'dist', ['phaser-ts-utils.d.ts']).catch((e) => console.error(e)),

  copyFiles('.', 'dist', ['package.json', 'README.md', 'LICENSE'])
    .then(() => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const packageJson = require('../dist/package.json');

      delete packageJson.devDependencies;
      delete packageJson.scripts;
      delete packageJson.engines;
      delete packageJson['lint-staged'];

      return writeFilePromise('dist/package.json', JSON.stringify(packageJson, undefined, 2));
    })
    .catch((e) => console.error(e)),

  copyFiles('.', 'dist/docs', ['LICENSE']).catch((e) => console.error(e))
])
  .then(() => console.log('Build Complete'))
  .catch((e) => console.error(e));
