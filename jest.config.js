module.exports = {
  preset: 'ts-jest/presets/js-with-ts',
  testEnvironment: 'jsdom',
  setupFiles: ['jest-canvas-mock'],
  setupFilesAfterEnv: ['<rootDir>/test/test-setup.ts'],
  testPathIgnorePatterns: ['<rootDir>/test/integration/'],
  verbose: true,
  collectCoverageFrom: ['src/**/*.ts', '!src/**/index.ts', '!src/types.ts'],
  coverageReporters: ['text', 'html']
};
