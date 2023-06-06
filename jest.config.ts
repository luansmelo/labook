module.exports = {
  roots: ['<rootDir>/tests/'],
  testEnvironment: "node",
  testMatch: ['<rootDir>/tests/**/*.(spec|test).[jt]s'],
  verbose: true,
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },  
  transformIgnorePatterns: [
    '<rootDir>/node_modules/',
    '^.+\\.js?$'
  ],
};
