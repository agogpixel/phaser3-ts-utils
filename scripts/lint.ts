import { exec, exit } from 'shelljs';

import { exitOnError, parseArgv } from './shared';

enum Flag {
  Fix = 'fix'
}

const eslintTargets = ['jest.config.js', 'webpack.config.js', 'src', 'test'];

const { opts } = parseArgv<{ [F in Flag]: boolean }>();

const withFix = opts.fix;

console.log(`Linting${withFix ? ' & fixing ' : ' '}files\n`);

const eslintCmd = `eslint ${withFix ? '--fix' : ''} ${eslintTargets.join(' ')}`;
const prettierCmd = `prettier ${withFix ? '--write' : '--check'} .`;

if (withFix) {
  console.log(exitOnError(exec, eslintCmd, { silent: true }).stdout);
  console.log(exitOnError(exec, prettierCmd, { silent: true }).stdout);
  exit();
}

const eslintResult = exec(eslintCmd, { silent: true });
const prettierResult = exec(prettierCmd, { silent: true });

if (eslintResult.code) {
  console.error(eslintResult.stderr);
} else {
  console.log(eslintResult.stdout);
}

if (prettierResult.code) {
  console.error(prettierResult.stderr);
} else {
  console.log(prettierResult.stdout);
}

exit(!eslintResult.code && !prettierResult.code ? 0 : 1);
