import { exec } from 'child_process';
import { writeFile } from 'fs';

const tarball = process.argv.length > 2 ? process.argv[2] : undefined;

if (!tarball) {
  console.error('Release tarball not provided');
  throw new Error();
}

const registry = process.argv.length > 3 ? process.argv[3] : undefined;

if (!registry) {
  console.error('Registry name not provided');
  throw new Error();
}

const tag = process.argv.length > 4 ? process.argv[4] : 'latest';

exec(`npm publish ${tarball} --tag ${tag} --access public`, (err, stdout, stderr) => {
  if (err) {
    console.error(err.message);
    throw err;
  }

  writeFile(
    'release-log.txt',
    `Publish Release Package: ${registry}\n\nstdout:\n\n${stdout}\n\nstderr:\n\n${stderr}\n\n`,
    { flag: 'a', encoding: 'utf-8' },
    (err) => {
      if (err) {
        console.error(err.message);
        throw err;
      }
    }
  );
});
