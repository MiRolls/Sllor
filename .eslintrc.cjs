module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ["next/core-web-vitals", "eslint:recommended", "plugin:react/recommended"],
    overrides: [
        {
            env: {
                node: true,
            },
            files: [".eslintrc.{js,cjs}"],
            parserOptions: {
                sourceType: "script",
            },
        },
    ],
    settings: {
        react: {
            version: "detect",
        },
    },
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
    },
    plugins: ["@typescript-eslint", "react"],
    rules: {
        "react/react-in-jsx-scope": "off",
        "react/jsx-no-target-blank": "off",
        "react/display-name": "off",
    },
};
