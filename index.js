/*
import putout from "putout"

import react2solid from "./putout-plugin-react2solid/lib/react2solid.js"
*/

var code = `
// import missing: useState
useState(0)

const name = "world"

const div = (
    <div className="asdf">
        <h1>hello {name}</h1>
        <p>asfd asdf asdf</p>
        <p>asfd asdf asdf</p>
    </div>
)

`;

/*
// simple
import * as React from "React"
React.useState(0)

import React, { useState } from "React"
useState(0)

import { useState } from "React"
useState(0)

const hello: string = 'world';
const hi = 'there';
console.log(hello);
*/

const {ESLint} = require("eslint")

const {FlatESLint} = require("eslint/use-at-your-own-risk")

/** @type {ESLint.Options} */
const eslintOptions = {
    /*
    use eslint.config.js
    https://eslint.org/docs/latest/user-guide/configuring/configuration-files-new
    */
    //configType: "flat",
    fix: true,
}

async function main() {

/*
use eslint.config.js
https://eslint.org/docs/latest/user-guide/configuring/configuration-files-new
> If you are using the API, you can use the configuration system described on this page
> by using the FlatESLint class, the FlatRuleTester class,
> or by setting configType: "flat" in the Linter class.
*/
const useFlatESLint = false
//const eslint = new ESLint(eslintOptions);
const eslint = (
    useFlatESLint ? new FlatESLint(eslintOptions) : // eslint.config.js
    new ESLint(eslintOptions) // .eslintrc.js
)

const codeOptions = {
    filePath: "code.tsx",
}
const results = await eslint.lintText(code, codeOptions);

console.log(results[0].output);

}

main()

if (false) {

// putout CLI: use only one plugin https://github.com/coderaiser/putout/issues/10

const res = putout(source, {
    isTS: true,
    isJSX: true,
    //isFlow: true,
    //parser: 'babel',
    //sourceFileName: 'input.tsx',
    //sourceMapName: 'input.tsx.map',
    processors: [
        //'typescript', // @putout/processor-typescript type checking for typescript files
    ],
    plugins: [
        //'typescript', // @putout/plugin-typescript transform TypeScript code. Enabled by default for ts and tsx files.
        //'remove-unused-variables',
        // use local plugin https://github.com/coderaiser/putout/issues/62
        ['react2solid', react2solid],

        //"babel/transform-react-jsx", // transform jsx with @babel/plugin-transform-react-jsx

    ],
    /*
    rules: [
        ['jsx-classname-to-class', 'on'],
    ],
    */
    rules: {
        // default: all rules on
        //'react2solid/jsx-classname-to-class': 'on',
    },
});

console.log(res.code);

}
