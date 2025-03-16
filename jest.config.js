module.exports = {
  testEnvironment: "node",
  testPathIgnorePatterns: ["/node_modules/", "/.aws-sam/"],
  moduleNameMapper: {
    "^aws-sdk$": "<rootDir>/__mocks__/aws-sdk.js",
  },
};
