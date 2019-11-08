module.exports = {
    extends: [
        "plugin:vue/essential"
    ],
    parserOptions: {
        parser: "babel-eslint",
        sourceType: 'module',
        allowImportExportEverywhere: true
    },
    rules: {
        "semi": ["warn",
            "always"
        ],
        "no-unused-vars" : ["warn",{
            "args": "none",
            "vars": "local",
            "args": "none"
        }],
        "quotes": [
            "warn",
            "single"
        ],
        "require-jsdoc" : ["warn",{
            "require": {
                "FunctionDeclaration": true,
                "MethodDefinition": false,
                "ClassDeclaration": true,
                "ArrowFunctionExpression": false,
                "FunctionExpression": false
            }
        }]
    }
}
