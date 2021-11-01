import { exit, rm } from 'shelljs';

import { exitOnError, parseArgv } from './shared';

enum Flag {
  All = 'all',
  Dist = 'dist',
  Node = 'node',
  Package = 'package',
  Test = 'test'
}

const cleanMatrix: Record<Flag, { dirs: string[]; files: string[] }> = {
  all: undefined,
  dist: {
    dirs: ['dist'],
    files: []
  },
  node: {
    dirs: [],
    files: ['npm-debug.log']
  },
  package: {
    dirs: [],
    files: ['.smarttagcache', 'package-log.txt', 'package-tarball-name.txt', 'phaser3-ts-utils-*.tgz']
  },
  test: {
    dirs: ['coverage'],
    files: ['.eslintcache']
  }
};

function cleanDirs(flag: Flag) {
  const dirs = cleanMatrix[flag]?.dirs || [];
  if (dirs.length) {
    exitOnError(rm, '-rf', ...dirs);
  }
}

function cleanFiles(flag: Flag) {
  const files = cleanMatrix[flag]?.files || [];
  if (files.length) {
    exitOnError(rm, '-f', ...files);
  }
}

const {
  opts: { all, dist, node, package: pkg, test }
} = parseArgv<{ [F in Flag]: boolean }>();

if (all || dist) {
  cleanDirs(Flag.Dist);
  cleanFiles(Flag.Dist);
}

if (all || pkg) {
  cleanDirs(Flag.Package);
  cleanFiles(Flag.Package);
}

if (all || test) {
  cleanDirs(Flag.Test);
  cleanFiles(Flag.Test);
}

// Do node last.
if (all || node) {
  cleanDirs(Flag.Node);
  cleanFiles(Flag.Node);
}

exit();
