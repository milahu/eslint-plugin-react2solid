"use strict";

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    //type: "problem", // required
    type: "suggestion", // optional

    docs: {
      description: "jsx className to class",
      recommended: true,
    },
    fixable: "code",
    schema: [],
  },
  create: function(context) {
    return {
      JSXAttribute: (node) => {
        if (
          node.name.name == "className"
        ) {
          context.report({
            node: node,
            message: "jsx className",
            fix: (fixer) => {
                return fixer.replaceText(node.name, "class");
            },
          });
        }
      },
    };
  },
};
