/* eslint-disable @typescript-eslint/no-var-requires */

const { resolve } = require('path');

const srcPath = resolve(__dirname, 'src');
const dstPath = resolve(__dirname, 'dist');

module.exports = {
  mode: 'production',
  devtool: 'hidden-source-map',
  entry: `${srcPath}/index.ts`,
  output: {
    filename: 'phaser-ts-utils.js',
    path: dstPath,
    library: {
      name: 'PhaserTSUtils',
      type: 'umd'
    }
  },
  externals: /^(phaser.*)$/,
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: 'tsconfig.build.json'
            }
          },
          'source-map-loader'
        ],
        include: srcPath,
        exclude: /node_modules/
      }
    ]
  }
};
