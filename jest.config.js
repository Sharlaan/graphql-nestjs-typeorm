module.exports = {
  moduleFileExtensions: ["ts", "js"],
  testMatch: ["**/__tests__/*.(test|spec).(ts|js)"],
  testPathIgnorePatterns: ["/dist/", "/node_modules/"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
};
