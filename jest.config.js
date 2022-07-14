module.exports = {
  preset: "jest-expo",
  testMatch: ["**/__tests__/**/?(*.)+(spec|test).[jt]s?(x)"],
  testPathIgnorePatterns: ["/node_modules", "/android", "/ios"],
  setupFiles: ["./src/__tests__/setup.ts"],
  setupFilesAfterEnv: [
    "@testing-library/jest-native/extend-expect",
    "jest-styled-components",
  ],
};
