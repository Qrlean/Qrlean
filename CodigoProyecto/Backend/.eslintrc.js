module.exports = {
    env: {
        node: true,
        commonjs: true,
        browser: true,
        es6: true,
    },
    extends: ['eslint:recommended', 'prettier', 'plugin:prettier/recommended'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 12,
    },
    plugins: ['@typescript-eslint'],
    rules: {
        'prettier/prettier': [
            'error',
            {
                endOfLine: 'auto',
            },
        ],
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars-experimental': 'error',
        'no-control-regex': 0,
    },
};
