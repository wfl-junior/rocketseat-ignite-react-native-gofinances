module.exports = {
  preset: "jest-expo",
  testRegex: ["(/src/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$"],
  testPathIgnorePatterns: ["/node_modules", "/android", "/ios"],
  setupFilesAfterEnv: [
    "@testing-library/jest-native/extend-expect",
    "jest-styled-components",
  ],
};
