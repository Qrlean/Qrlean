module.exports = {
    env: {
        node: true,
        commonjs: true,
        browser: true,
        es6: true,
    },
    extends: ['eslint:recommended', 'plugin:prettier/recommended'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 12,
    },
    plugins: ['@typescript-eslint'],
    rules: {},
};
