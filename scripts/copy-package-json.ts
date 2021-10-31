import { exit } from 'shelljs';

import { readPackageJson, writeDistPackageJson } from './shared';

const keysToRemove = ['devDependencies', 'engines', 'lint-staged', 'scripts'];

const packageJson = readPackageJson();

console.log('Copy & redact to dist/package.json\n');
console.log(`Removing: ${keysToRemove.join(', ')}`);

keysToRemove.forEach((key) => delete packageJson[key]);

writeDistPackageJson(packageJson);

exit();
