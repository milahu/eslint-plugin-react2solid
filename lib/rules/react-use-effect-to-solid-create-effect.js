"use strict";

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: "problem", // required
    //type: "suggestion", // optional

    docs: {
      description: "react useEffect to solid createEffect",
      recommended: true,
    },
    fixable: "code",
    schema: [],
  },
  create: function(context) {
    const state = {}
    state.addedImport = false
    return {
      CallExpression: function(node) {
        if (
          (
            node.callee.type == "MemberExpression" &&
            node.callee.object.name == "React" &&
            node.callee.property.name == "useEffect"
          ) ||
          (
            node.callee.type == "Identifier" &&
            node.callee.name == "useEffect"
          )
        ) {
          let programNode = node
          while (programNode && programNode.type != "Program") {
            programNode = programNode.parent
          }
          context.report({
            node: node,
            message: "react useEffect",
            fix: function* (fixer) {
                // TODO avoid collisions with existing "createEffect" in scope
                yield fixer.replaceText(node.callee, "createEffect");

                if (!state.addedImport) {
                  yield fixer.insertTextBefore(programNode, "import {createEffect} from 'solid-js';\n");
                  state.addedImport = true
                }
            },
          });
        }
      },
    };
  },
};
