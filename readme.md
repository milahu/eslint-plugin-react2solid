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

https://eslint.org/docs/latest/developer-guide/

https://eslint.org/docs/latest/user-guide/configuring/plugins

parser: @typescript-eslint/parser https://eslint.org/docs/latest/user-guide/configuring/plugins#specifying-parser

https://playcode.io/react_ts_hooks

https://playcode.io/react

https://non-traditional.dev/an-intro-to-solidjs-for-react-developers

## tests

https://storybook.js.org/blog/interaction-testing-with-storybook/

https://medium.com/storybookjs/testing-lib-storybook-react-8c36716fab86

## similar projects

[suid](https://github.com/swordev/suid) - A port of Material-UI (MUI) built with SolidJS.

[suid/codemod](https://github.com/swordev/suid/tree/main/packages/codemod) - Transform your MUI React code to SUID SolidJS. ([live demo](https://suid.io/tools/react-to-solid))

[solid-reactor](https://github.com/yellowsink/solid-reactor) - A compiler to ease the move from React to SolidJS.

[react2solid](https://github.com/rrjanbiah/react2solid) - from scratch?

https://github.com/solidjs-community/solid-codemod

[sveltosis](https://github.com/sveltosis/sveltosis) - convert svelte to mitosis. [parser](https://github.com/sveltosis/sveltosis/tree/main/packages/parser) based on svelte parser
([stories](https://party.sveltosis.dev/))
([playground](https://try.sveltosis.dev/))

[component-party](https://github.com/matschik/component-party) - Web component JS frameworks overview by their syntax and features.
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

[reactjs-solidjs-bridge](https://github.com/Sawtaytoes/reactjs-solidjs-bridge) - runtime adapter between react and solid
