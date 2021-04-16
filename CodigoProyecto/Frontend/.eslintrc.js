module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'plugin:react/recommended',
        'standard',
        'prettier',
        'plugin:prettier/recommended',
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
    },
    plugins: ['react'],
    rules: {
        'react/prop-types': 'off',
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
    ignorePatterns: ['node_modules/'],
};
