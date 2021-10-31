import { writeFileSync } from 'fs';
import minimist from 'minimist';
import { argv } from 'process';
import { exit, cat, ShellString } from 'shelljs';

export const config = {
  packageTarballNamePath: 'package-tarball-name.txt'
};

export function exitOnError<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Command extends (...args: any) => ShellString,
  CommandParameters extends Parameters<Command>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
>(cmd: Command, ...params: CommandParameters | any[]): ShellString {
  const result = cmd(...params);

  if (result.code) {
    console.error(result.stderr);
    exit(result.code);
  }

  return result;
}

type ParseArgvOptions = Record<string, boolean | number | string>;

interface ParsedArgv<Options extends ParseArgvOptions> {
  args: string[];
  opts: Options;
}

export function parseArgv<Options extends ParseArgvOptions>(
  optionDefaults: Partial<Options> = {}
): ParsedArgv<Options> {
  const parsed = minimist(argv.slice(2));

  const args = parsed._.slice();
  const opts = {} as Options;

  for (const name in parsed) {
    if (name === '_' || name === '--') {
      continue;
    }

    (opts as ParseArgvOptions)[name] = parsed[name] !== undefined ? parsed[name] : optionDefaults[name];
  }

  return { args, opts };
}

export function readPackageJson(): Record<string, unknown> {
  return JSON.parse(exitOnError(cat, 'package.json').stdout);
}

export function readDistPackageJson(): Record<string, unknown> {
  return JSON.parse(exitOnError(cat, 'dist/package.json').stdout);
}

export function writeDistPackageJson(packageJson: Record<string, unknown>): void {
  try {
    writeFileSync('dist/package.json', JSON.stringify(packageJson, undefined, 2));
  } catch (e) {
    console.error(e);
    exit(1);
  }
}

export function writePackageLog(text: string): void {
  try {
    writeFileSync('package-log.txt', text, { flag: 'a' });
  } catch (e) {
    console.error(e);
    exit(1);
  }
}
