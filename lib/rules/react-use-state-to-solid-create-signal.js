"use strict";

const eslintUtils = require("eslint-utils")

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
          //console.dir({ range: node.range, loc: node.loc }) // debug
          // TODO shorter?
          let programNode = node
          while (programNode && programNode.type != "Program") {
            programNode = programNode.parent
          }
          // note: we must call context.report only once, to avoid double-fixing
          // example: someValue -> someValue()()
          context.report({
            node: node,
            message: "react useState",
            fix: function* (fixer) {
              // TODO avoid collisions with existing "createSignal" in scope
              yield fixer.replaceText(node.callee, "createSignal");

              // replace getters in scope
              // someValue -> someValue()

              if (!state.addedImport) {
                yield fixer.insertTextBefore(programNode, "import {createSignal} from 'solid-js';\n");
                state.addedImport = true
              }

              // find getter name
              // example: const [someValue, setSomeValue] = React.useState("initial value")
              const getterName = (() => {
                if (
                  node.parent.type == "VariableDeclarator" &&
                  node.parent.id.type == "ArrayPattern" &&
                  node.parent.id.elements.length >= 1
                ) {
                  return node.parent.id.elements[0].name
                }
              })()
              //console.dir({ getterName }) // debug
              if (getterName) {
                // https://github.com/mysticatea/eslint-utils/blob/master/docs/api/scope-utils.md
                const globalScope = context.getScope();
                const localScope = eslintUtils.getInnermostScope(globalScope, node);
                const variable = eslintUtils.findVariable(localScope, getterName);
                if (variable) {
                  for (const ref of variable.references) {
                    //console.log(ref)
                    if (
                      ref.identifier.parent.type == "ArrayPattern" &&
                      ref.identifier.parent.parent.type == "VariableDeclarator"
                    ) {
                      // keep the declaration
                      // example: const [counter1, setCounter1] = createSignal(0)
                      continue
                    }
                    // patch the call sites
                    // examples:
                    //   <div>{counter1}</div>
                    //   const increment1 = () => setCounter1(counter1 + 1)
                    yield fixer.insertTextAfter(ref.identifier, "()")
                  }
                }
              }
            },
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
