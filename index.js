// based on eslint-plugin-react/index.js

'use strict';

const fromEntries = require('object.fromentries');
const entries = require('object.entries');

// TODO glob lib/rules/*.js
const allRulesList = [
  'react-use-state-to-solid-create-signal',
];

const allRules = {};
for (const name of allRulesList) {
  allRules[name] = require(`./lib/rules/${name}.js`)
}

function filterRules(rules, predicate) {
  return fromEntries(entries(rules).filter((entry) => predicate(entry[1])));
}

function configureAsError(rules) {
  return fromEntries(Object.keys(rules).map((key) => [`react2solid/${key}`, 2]));
}

const activeRules = filterRules(allRules, (rule) => !rule.meta.deprecated);
const activeRulesConfig = configureAsError(activeRules);

const deprecatedRules = filterRules(allRules, (rule) => rule.meta.deprecated);

module.exports = {
  deprecatedRules,
  rules: allRules,
  configs: {
    all: {
      plugins: [
        'react2solid',
      ],
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      rules: activeRulesConfig,
    },
  },
};
