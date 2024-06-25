module.exports = {
  verbose: true,
  moduleFileExtensions: ["js", "jsx", "json", "ts"],
  transformIgnorePatterns: ["/node_modules/"],
  setupFiles: ["dotenv/config"],
  moduleNameMapper: {
    '@app/(.*)': '<rootDir>/src/$1',
  },
  testMatch: ["**/src/**/*.(spec|test).(js|jsx|ts|tsx)"],
  transform: {
    "^.+\\.(t|j)sx?$": "@swc/jest",
  },
  collectCoverageFrom: [
    'src/**/*.(js|jsx|ts|tsx)',
  ],
  coveragePathIgnorePatterns: [
    'src/__fixtures__/*',
    'src/index.ts',
    'node_modules/*',
    'bin/*',
  ],
  testPathIgnorePatterns: [
    'src/__fixtures__/*'
  ]
};