/*
https://stackoverflow.com/questions/49277528/eslint-prettier-for-jsx
*/

module.exports = {
    //"parser": "babel-eslint",
    "parser": "@typescript-eslint/parser",
    "extends": [
        /*
        "airbnb",
        "prettier",
        //"prettier/react",
        */
        "plugin:react2solid/all",
    ],
    "env": {
        "browser": true
    },
    "plugins": [
        "react2solid",
        /*
        //"react",
        "jsx-a11y",
        "import",
        "prettier",
        */
    ],
    "rules": {
        "indent": "off", // keep indent
        // TODO "prettier/indent": "off", // keep indent
        // fixed by test/import.sh -> convert indent to spaces
        "no-console": "off",
        "linebreak-style": "off",
        /*
        "react/jsx-filename-extension": [
            1,
            {
                "extensions": [".js", ".jsx"]
            }
        ],
        "react/react-in-jsx-scope": 0,
        */
        /*
        "prettier/prettier": [
            "error",
            {
                "trailingComma": "es5",
                "singleQuote": true,
                "printWidth": 120
            }
        ],
        */
    }
}
