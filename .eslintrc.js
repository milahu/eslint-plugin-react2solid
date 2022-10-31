/*
https://stackoverflow.com/questions/49277528/eslint-prettier-for-jsx
*/

module.exports = {
    //"parser": "babel-eslint",
    "parser": "@typescript-eslint/parser",
    "extends": [
        "airbnb",
        "prettier",
        //"prettier/react"
    ],
    "env": {
        "browser": true
    },
    "plugins": [
        //"react",
        "jsx-a11y",
        "import",
        "prettier"
    ],
    "rules": {
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
        "prettier/prettier": [
            "error",
            {
                "trailingComma": "es5",
                "singleQuote": true,
                "printWidth": 120
            }
        ]
    }
}
