import { exec } from 'child_process';
import { writeFile } from 'fs';

const tarball = process.argv.length > 2 ? process.argv[2] : undefined;

if (!tarball) {
  console.error('Release tarball not provided');
  throw new Error();
}

const tag = process.argv.length > 3 ? process.argv[3] : 'latest';

exec(`npm publish ${tarball} --tag ${tag} --access public`, (err, stdout, stderr) => {
  if (err) {
    console.error(err.message);
    throw err;
  }

  writeFile(
    'release-log.txt',
    `Publish Release Package: ${tarball}\n\nstdout:\n\n${stdout}\n\nstderr:\n\n${stderr}`,
    { flag: 'a', encoding: 'utf-8' },
    (err) => {
      if (err) {
        console.error(err.message);
        throw err;
      }
    }
  );
});
