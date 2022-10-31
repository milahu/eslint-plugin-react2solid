/*
import putout from "putout"

import react2solid from "./putout-plugin-react2solid/lib/react2solid.js"
*/

var code = `
// import missing: useState
useState(0)
const name = "world"
function App(props) {
    return (
        <div className="asdf">
            <h1>hello {props.name}</h1>
            <p>asfd asdf asdf</p>
        </div>
    )
}
`;

const fs = require("fs")
const path = require("path")

const filePathAbsolute = (
    process.argv[2] ? path.resolve(process.argv[2]) :
    null
)

// workdir is project root
process.chdir(path.dirname(path.dirname(__filename)))

const srcPath = (
    filePathAbsolute ? path.relative(process.cwd(), filePathAbsolute) :
    "test/src/component-party/content/1-reactivity/1-declare-state/react/Name.jsx"
)

console.log(`reading ${srcPath}`)

const filePath = (
    srcPath.startsWith("test/src/") ? srcPath.slice("test/src/".length) :
    null
)

//const srcPath = "test/src/" + filePath
const outPath = filePath && ("test/out/" + filePath)
const outDir = outPath && path.dirname(outPath)

var code = fs.readFileSync(srcPath, "utf8")
console.log(code)

if (outDir) {
    fs.mkdirSync(outDir, { recursive: true })
}

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

if (results[0].output) {
    if (outPath) {
        console.log(`writing ${outPath}`)
        fs.writeFileSync(outPath, results[0].output, "utf8")
        console.log(results[0].output)
    }
    else {
        console.log(`done`)
        console.log(results[0].output)
    }
}
else {
    console.log("not fixed")
    console.log(results)

}

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
