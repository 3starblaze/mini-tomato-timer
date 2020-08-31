module.exports = {
    "env": {
        "browser": true,
        "es2020": true
    },
    "extends": [
        "airbnb-base",
    ],
    "parserOptions": {
        "ecmaVersion": 11,
        "sourceType": "module"
    },
    "rules": {
        "no-new": 0,
        "no-underscore-dangle": 0
    },
    "overrides": [
        {
            "files": "*.ts",
            plugins: [
                "@typescript-eslint",
            ],
            "extends": "plugin:@typescript-eslint/recommended",
            rules: {
                "@typescript-eslint/no-explicit-any": 0,
            },
        },
    ],
};
