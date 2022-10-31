"use strict";

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: "problem", // required
    //type: "suggestion", // optional

    docs: {
      description: "react import remove",
      recommended: true,
    },
    fixable: "code",
    schema: [],
  },
  create: function(context) {
    return {
      ImportDeclaration: (node) => {
        if (
          node.source.value == "react"
        ) {
          context.report({
            node: node,
            message: "react import",
            fix: (fixer) => {
              return fixer.remove(node);
            },
          });
        }
      },
    };
  },
};
