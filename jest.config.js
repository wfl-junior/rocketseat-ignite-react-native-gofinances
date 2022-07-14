module.exports = {
  preset: "jest-expo",
  setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect"],
  testRegex: ["(/src/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$"],
  testPathIgnorePatterns: ["/node_modules", "/android", "/ios"],
};
