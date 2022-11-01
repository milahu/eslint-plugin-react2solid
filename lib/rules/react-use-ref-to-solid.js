/*

https://beta.reactjs.org/apis/react/useRef
useRef - reference a value that’s not needed for rendering.
Changing a ref does not trigger a re-render.
refs are perfect for storing information that
doesn’t affect the visual output of your component.
store information between re-renders.

https://non-traditional.dev/an-intro-to-solidjs-for-react-developers
you need to re-teach yourself that components don't ever get re-run.
in Solid, We don't need hooks like useCallback and useRef,
because the component never re-runs.
Instead, we can just assign them to variables

https://www.w3schools.com/react/react_useref.asp

[Feature]: Transform ReactJS useRef into simple let
https://github.com/solidjs-community/solid-codemod/issues/3

test/src/component-party/content/2-templating/5-dom-ref/react/InputFocused.jsx
test/src/react-use-ref/App.tsx

react: const divRef = React.useRef<HTMLDivElement>(null)
solid: let divRef: HTMLDivElement? = null

react: divRef.current
solid: divRef

note:
React.useRef can be used for any value
const numRef = React.useRef<number>(0)
numRef.current = 1

solid: ref on components
https://www.solidjs.com/tutorial/bindings_forward_refs
function Component(props) {
  return <div ref={props.ref}>asdf</div>
}

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
    // TODO what is the scope of state? should be "per file"
    const sourceCode = context.getSourceCode()
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
            node.callee.property.name == "useRef"
          ) ||
          (
            node.callee.type == "Identifier" &&
            node.callee.name == "useRef"
          )
        ) {
          
          //console.dir({ range: node.range, loc: node.loc }) // debug

          const programNode = findParent(node, "Program")

          const declaration = findParent(node, "VariableDeclaration")

          // TODO loop multiple decls
          // const a = 1, b = 2;

          const decl = declaration.declarations[0]
          // decl.type == "VariableDeclarator"

          const refType = node.typeParameters?.params[0].typeName.name

          const initValueRaw = node.arguments[0]?.raw

          const name = decl.id.name

          let newCode = `let ${name}`
          if (refType) newCode += `: ${refType}`
          if (initValueRaw) newCode += ` = ${initValueRaw}`
          newCode += ";\n"

          // note: we must call context.report only once, to avoid double-fixing
          // example: someValue -> someValue()()
          context.report({
            node: decl,
            message: "react useRef",
            fix: function* (fixer) {
              yield fixer.insertTextBefore(declaration, newCode)
              if (declaration.declarations.length == 1) {
                yield fixer.remove(declaration);
              }
              else {
                const nextToken = sourceCode.getTokenAfter(decl)
                if (
                  nextToken.type == "Punctuator" &&
                  nextToken.value == ","
                ) {
                  // no. this causes duplicate insert
                  //fixer.removeRange(decl.range[0], nextToken.range[1])
                  yield fixer.remove(decl);
                  yield fixer.remove(nextToken);
                }
                else {
                  yield fixer.remove(decl);
                }
              }

              // replace getters in scope
              // someRef.current -> someRef

              const getterName = decl.id.name

              //console.dir({ getterName }) // debug
              // https://github.com/mysticatea/eslint-utils/blob/master/docs/api/scope-utils.md
              const globalScope = context.getScope();
              const localScope = eslintUtils.getInnermostScope(globalScope, node);
              const variable = eslintUtils.findVariable(localScope, getterName);
              if (variable) {
                for (const ref of variable.references) {
                  console.log(ref)
                  if (
                    ref.identifier.parent.type == "MemberExpression" &&
                    ref.identifier.parent.property.name == "current"
                  ) {
                    const prop = ref.identifier.parent.property
                    const prevToken = sourceCode.getTokenBefore(prop)
                    yield fixer.remove(prevToken);
                    yield fixer.remove(prop);
                  }
                }
              }
            },
          });
        }
      },
    };
  },
};

/*
  shadowing is not possible

  so we dont have to handle cases like
  const someRef = someRef.current

  > const a=1; if(1){ const a=a+1; console.log(a); }
  Uncaught ReferenceError: Cannot access 'a' before initialization

  React.useEffect(() => {
    // shadowing
    const divRef = divRef.current
    if (divRef) {
      setColorId((colorId + 1) % 3)
      divRef.style.color = colors[colorId]
    }
  }, [counter2])
*/
