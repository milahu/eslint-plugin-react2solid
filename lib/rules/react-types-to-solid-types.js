"use strict";

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: "problem", // required
    //type: "suggestion", // optional

    docs: {
      description: "react types to solid types",
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
      TSTypeReference: (node) => {
        if (
          (
            node.typeName.type == "TSQualifiedName" &&
            node.typeName.left.name == "React"
          )
        ) {
          /*
            node.typeName.right.name == "MouseEvent"
            etc
          */
          let programNode = node
          while (programNode && programNode.type != "Program") {
            programNode = programNode.parent
          }
          context.report({
            node: node,
            message: "react useState",
            fix: (fixer) => {
                if (!state.addedImport) {
                  state.addedImport = true
                  //// FIXME import is added 2 times, comment is added 10 times
                  //return fixer.insertTextBefore(programNode, "// npm i -D @types/react\nimport type React from 'react';\n");
                  // FIXME import is added 2 times
                  return fixer.insertTextBefore(programNode, "import type React from 'react';\n");
                }
            },
          });
          // remove type annotations
          if (
            node.typeName.right.name == "ReactElement" // React.ReactElement
          ) {
            // find type annotation
            let annotation = node
            while (annotation && annotation.type != "TSTypeAnnotation") {
              annotation = annotation.parent
            }
            context.report({
              node: annotation,
              message: `remove type React.${node.typeName.right.name}`,
              fix: (fixer) => {
                // FIXME import is added 2 times
                return fixer.remove(annotation);
              }
            });
          }
        }
      },
    };
  },
};
