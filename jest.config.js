module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  collectCoverage: true,
  collectCoverageFrom: [
    "**/src/**/*.ts"
  ],
  testEnvironment: "node",
  testMatch: [
    "**/test/**/*.test.ts"
  ],
  testPathIgnorePatterns: [
    "/coverage/",
    "/node_modules/",
    "/test/fixtures/"
  ]
};
