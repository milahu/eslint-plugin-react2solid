// TODO refactor with react-use-state-to-solid-create-signal.js

"use strict";

const eslintUtils = require("eslint-utils")

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: "problem", // required
    //type: "suggestion", // optional

    docs: {
      description: "react useMemo to solid createMemo",
      recommended: true,
      url: "https://www.solidjs.com/docs/latest/api#creatememo",
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
            node.callee.property.name == "useMemo"
          ) ||
          (
            node.callee.type == "Identifier" &&
            node.callee.name == "useMemo"
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
            message: "react useMemo",
            fix: function* (fixer) {
              // TODO avoid collisions with existing "createMemo" in scope
              yield fixer.replaceText(node.callee, "createMemo");

              // replace getters in scope
              // someValue -> someValue()

              if (!state.addedImport) {
                yield fixer.insertTextBefore(programNode, "import {createMemo} from 'solid-js';\n");
                state.addedImport = true
              }

              // find getter name
              // example: const someValue = React.useMemo("initial value")
              const getterName = (() => {
                if (
                  node.parent.type == "VariableDeclarator" &&
                  node.parent.id.type == "Identifier"
                ) {
                  return node.parent.id.name
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
                      ref.identifier.parent.type == "VariableDeclarator"
                    ) {
                      // keep the declaration
                      // example: const [counter1, setCounter1] = createMemo(0)
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
