export default {
  verbose: true,
  coverageReporters: ["json-summary", "lcov", "cobertura"],
  moduleFileExtensions: ["js", "jsx", "json", "node"],
  testMatch: ["**/test/**/*.+(js|jsx|ts|tsx)", "**/?(*.)+(spec|test).+(js|jsx|ts|tsx)"],
  transformIgnorePatterns: [
    "/node_modules/(?!url-join)" // Exclude everything except url-join
  ],
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest", // Use Babel for JavaScript and JSX files
    ".+\\.(css|gif|styl|less|sass|svg|scss|png|jpg|ttf|woff|woff2)$": "jest-transform-stub", // Stub out CSS and asset imports
  },
  testEnvironment: "jsdom", // Simulate a browser environment for React tests
  coverageDirectory: './coverage',
  collectCoverage: true,
  collectCoverageFrom: [
    "./**/*.{js,jsx}", // Collect coverage from all JavaScript/JSX files
    "!**/node_modules/**", // Exclude node_modules
    "!**/test/**", // Exclude test files
    "!**/coverage/**", // Exclude coverage files
    '!**/babel.config.js',
    '!**/dev_embed.js',
    '!**/vite.config.js',
    '!**/index.jsx',
    "!**/dist/**",
  ],
  clearMocks: true,
};