const {pathsToModuleNameMapper} = require('ts-jest');
const {compilerOptions} = require('./tsconfig');

module.exports = {
  preset: 'jest-preset-angular',
  testMatch: ['**/+(*.)+(spec).+(ts)'],
  setupFilesAfterEnv: ['<rootDir>/src/test.ts'],
  verbose: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: ['html', "json", ["cobertura", {projectRoot: "../../"}]],
  reporters: ["default", "jest-junit"],
  globals: {
    "ts-jest": {
      useESM: true,
    },
  },
  roots: ["<rootDir>/src"],
  modulePaths: ["<rootDir>"],
  moduleDirectories: ["node_modules"],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths || {}, {
    prefix: '<rootDir>/'
  })
};
