# eslint-react2solid

convert react components to solid components

## why eslint

https://npmtrends.com/eslint-vs-prettier-vs-putout-vs-recast-vs-tslint

before i used `putout` in
https://github.com/milahu/putout-plugin-react2solid
putout is based on `recast`
but recast has a bug in the JSX pretty-printer
https://github.com/coderaiser/putout/issues/116
https://github.com/benjamn/recast/issues/211

## based on

eslint-solid-standalone
https://www.npmjs.com/package/eslint-solid-standalone
parser: @typescript-eslint/parser

putout
https://www.npmjs.com/package/putout
parser: @babel/parser via @putout/engine-parser
parser for TSX: @typescript-eslint/parser

## tests

https://storybook.js.org/blog/interaction-testing-with-storybook/

https://medium.com/storybookjs/testing-lib-storybook-react-8c36716fab86

## similar projects

https://github.com/rrjanbiah/react2solid

https://github.com/sveltosis/sveltosis - convert svelte to mitosis
stories: https://party.sveltosis.dev/ inspired by https://component-party.dev/
playground: https://try.sveltosis.dev/

https://github.com/matschik/component-party - Web component JS frameworks overview by their syntax and features
components for:
Svelte
React
Vue 3
Angular
SolidJS
Lit
Ember
Alpine
Qwik
