module.exports = {
  preset: "jest-expo",
  testMatch: ["**/__tests__/**/?(*.)+(spec|test).ts?(x)"],
  testPathIgnorePatterns: ["/node_modules", "/android", "/ios"],
  setupFiles: ["./src/__tests__/setup.ts"],
  setupFilesAfterEnv: [
    "@testing-library/jest-native/extend-expect",
    "jest-styled-components",
  ],
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.ts?(x)", "!**/__tests__/**/*"],
  coverageReporters: ["lcov"],
};
