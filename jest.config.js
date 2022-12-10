/** @type {import('ts-jest').JestConfigWithTsJest} */

module.exports = {
    /* Preference settings */
    verbose: true, // verbose enabled
    rootDir: "./",

    preset: "ts-jest",
    testEnvironment: "node",

    /* Global test preference */
    clearMocks: true,
};
