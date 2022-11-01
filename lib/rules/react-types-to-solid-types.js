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
          const debug = false
          debug && console.dir({
            range: node.range,
            //src: node.toString(),
            state
          }, { depth: 2 })
          /*
            node.typeName.right.name == "MouseEvent"
            etc
          */
          let programNode = node
          while (programNode && programNode.type != "Program") {
            programNode = programNode.parent
          }
          // add import type React
          // FIXME this breaks react-use-memo-to-solid-create-memo -> React.useMemo is not replaced
          /*
          if (!state.addedImport) {
          //if (false) {
            // FIXME this has no effect
            state.addedImport = true
            context.report({
              node: node,
              message: "import type React",
              fix: (fixer) => {
                // FIXME import is added 2 times
                return fixer.insertTextBefore(programNode, "import type React from 'react';\n");
              }
            });
          }
          */

          // react: React.ComponentPropsWithoutRef<"div">
          // solid: JSX.IntrinsicElements['div']
          if (
            node.typeName.right.name == "ComponentPropsWithoutRef" &&
            node.typeParameters.params.length > 0 &&
            node.typeParameters.params[0].type == "TSLiteralType"
          ) {
            const elementName = node.typeParameters.params[0].literal.value
            context.report({
              node: node,
              message: `replace type React.${node.typeName.right.name}`,
              fix: (fixer) => {
                return fixer.replaceText(node, `JSX.IntrinsicElements['${elementName}']`);
              }
            });
          }

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
