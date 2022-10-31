"use strict";

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: "problem", // required
    //type: "suggestion", // optional

    docs: {
      description: "react useState to solid createSignal",
      recommended: true,
    },
    fixable: "code",
    schema: [],
  },
  create: function(context) {
    // TODO what is the scope of state? should be "per file"
    const state = {}
    state.addedImport = false
    return {
      //ReturnStatement: function(node) {
      CallExpression: function(node) {
        // TODO shorter?
        if (
          (
            node.callee.type == "MemberExpression" &&
            node.callee.object.name == "React" &&
            node.callee.property.name == "useState"
          ) ||
          (
            node.callee.type == "Identifier" &&
            node.callee.name == "useState"
          )
        ) {
          // TODO shorter?
          let programNode = node
          while (programNode && programNode.type != "Program") {
            programNode = programNode.parent
          }
          context.report({
            node: node,
            message: "react useState",
            fix: function* (fixer) {
                yield fixer.replaceText(node.callee, "createSignal");

                if (!state.addedImport) {
                  yield fixer.insertTextBefore(programNode, "import {createSignal} from 'solid-js';\n");
                  state.addedImport = true
                }

                // extend range of the fix to the range of `node.parent`
                //yield fixer.insertTextBefore(node.parent, "");
                //yield fixer.insertTextAfter(node.parent, "");
            },
            //fix: function(fixer) {
            //  return fixer.insertTextAfter(node, ";");
            //},
          });
        }
      },
      /*
      // at a function expression node while going up:
      "FunctionExpression:exit": checkLastSegment,
      "ArrowFunctionExpression:exit": checkLastSegment,
      onCodePathStart: function (codePath, node) {
        // at the start of analyzing a code path
      },
      onCodePathEnd: function(codePath, node) {
        // at the end of analyzing a code path
      },
      */
    };
  },
};
