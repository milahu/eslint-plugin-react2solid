/*

TODO
// unwrap the arg0 node

react:

test/src/react-forward-ref.tsx

export const Button = React.forwardRef<
  HTMLDivElement,
  ButtonOptions
>(
  function Button(props, ref): React.ReactElement {
    return <div ref={ref}>button</div>
  }
)

solid:

export const Button = function Button(props: ButtonOptions & { ref: HTMLDivElement }) {
  return <div ref={props.ref}>button</div>
}

https://www.solidjs.com/tutorial/bindings_forward_refs

https://github.com/solidjs/solid/issues/116
Could you go to detail about how to use Refs?

note: "forwardRef" attribute was removed from solid
> Property 'forwardRef' does not exist on type 'HTMLAttributes<HTMLDivElement>'.

*/

"use strict";

const eslintUtils = require("eslint-utils")

/** @return {Node | undefined} */
const findParent = (node, type) => {
  let result = node
  while (result && result.type != type) {
    result = result.parent
  }
  return result
}

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
    const sourceCode = context.getSourceCode()
    return {
      CallExpression: function(node) {
        if (
          (
            node.callee.type == "MemberExpression" &&
            node.callee.object.name == "React" &&
            node.callee.property.name == "forwardRef"
          ) ||
          (
            node.callee.type == "Identifier" &&
            node.callee.name == "forwardRef"
          )
        ) {

          // TODO handle missing params
          const refType = node.typeParameters?.params[0].typeName.name
          const propsType = node.typeParameters?.params[1].typeName.name

          const arg0 = node.arguments[0]


          context.report({
            node: node, // 1 report
            node: arg0, // 2 reports
            message: "react useRef",
            fix: function* (fixer) {
              // this works when this is the only fix
              // but fails when "overlapped" with other fixes
              //yield fixer.replaceText(node, sourceCode.getText(arg0))
              //return

              // modify the arg0 node

              if (arg0.type == "FunctionExpression") {
                if (arg0.params[0]) {
                  yield fixer.insertTextAfter(arg0.params[0], `: ${propsType}`)
                }
                if (arg0.params[1]) {

                  const propsName = arg0.params[0].name
                  const getterName = arg0.params[1].name

                  // https://github.com/mysticatea/eslint-utils/blob/master/docs/api/scope-utils.md
                  const globalScope = context.getScope();
                  const localScope = eslintUtils.getInnermostScope(globalScope, node);
                  const variable = eslintUtils.findVariable(localScope, getterName);
                  if (variable) {
                    for (const ref of variable.references) {
                      console.log(ref)
                      if (ref.identifier.parent.type != "FunctionExpression") {
                        yield fixer.insertTextBefore(ref.identifier, `${propsName}.`);
                      }
                    }
                  }
                  const comma = sourceCode.getTokenBefore(arg0.params[1])
                  yield fixer.remove(comma)
                  yield fixer.remove(arg0.params[1])
                }
              }

              // unwrap the arg0 node

              /** /
              // AssertionError [ERR_ASSERTION]: Fix has invalid range
              yield fixer.removeRange(node.range[0], arg0.range[0])
              yield fixer.removeRange(arg0.range[1], node.range[1])
              /**/

              /** /
              // no effect
              for (const token of sourceCode.getTokensBetween(node, arg0)) {
                yield fixer.remove(token)
              }
              /**/

              /** /
              // debug: ok
              // { node_range: [ 93, 275 ], arg0_range: [ 150, 273 ] }
              // { node_range: [ 68, 241 ], arg0_range: [ 125, 239 ] }
              console.dir({
                node_range: node.range,
                arg0_range: arg0.range,
              })
              /**/

              /** /
              // AssertionError [ERR_ASSERTION]: Fix has invalid range
              yield fixer.removeRange(node.range[0]+1, arg0.range[0]-1)
              /**/

              /** /
              // AssertionError [ERR_ASSERTION]: Fix objects must not be overlapped in a report.
              yield fixer.replaceText(node, sourceCode.getText(arg0))
              /**/

              /** /
              // debug: empty: { between1: [], between2: [] }
              console.dir({
                between1: sourceCode.getTokensBetween(node, arg0),
                between2: sourceCode.getTokensBetween(arg0, node),
              })
              /**/

              /** /
              // no effect
              fixer.removeRange(node.range[0], node.range[0]+57)
              /**/
            },
          });



          /** /
          // 2 reports
          // only "unwrap" works - "modify" fails
          context.report({
            node: node,
            message: "react useRef",
            fix: function* (fixer) {
              // this works when this is the only fix
              // but fails when "overlapped" with other fixes
              yield fixer.replaceText(node, sourceCode.getText(arg0))
              //return
            }
          })
          /**/


        }
      },
    };
  },
};
