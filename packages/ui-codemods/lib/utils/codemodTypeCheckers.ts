/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 - present Instructure, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import type {
  CallExpression,
  Identifier,
  ImportDefaultSpecifier,
  ImportSpecifier,
  JSXAttribute,
  JSXElement,
  JSXExpressionContainer,
  JSXFragment,
  JSXIdentifier,
  JSXMemberExpression,
  JSXText,
  Literal,
  MemberExpression,
  SpreadElement,
  TSTypeParameter
} from 'jscodeshift'

type astElem = { type: string }

/**
 * a function call — basically any invocation like `foo()`, `obj.method()`, or
 * even more complex calls.
 */
function isCallExpression(elem?: astElem | null): elem is CallExpression {
  return elem !== null && elem !== undefined && elem.type == 'CallExpression'
}

/**
 * a node that represents the name of something—typically a variable, function,
 * class, or any named entity in source code.
 *
 * For example, in the JavaScript snippet `score` is the indentifier:
 * `let score = 42;`
 */
function isIdentifier(elem?: astElem | null): elem is Identifier {
  return elem !== null && elem !== undefined && elem.type === 'Identifier'
}

function isImportSpecifier(elem?: astElem | null): elem is ImportSpecifier {
  return elem !== null && elem !== undefined && elem.type === 'ImportSpecifier'
}

function isImportDefaultSpecifier(
  elem?: astElem | null
): elem is ImportDefaultSpecifier {
  return (
    elem !== null &&
    elem !== undefined &&
    elem.type === 'ImportDefaultSpecifier'
  )
}

function isJSXAttribute(elem?: astElem | null): elem is JSXAttribute {
  return elem !== null && elem !== undefined && elem.type === 'JSXAttribute'
}

/**
 * A standard JSX tag like `<div>`, `<MyComponent>`, or any non-fragment JSX
 * structure.
 */
function isJSXElement(elem?: astElem | astElem[] | null): elem is JSXElement {
  return (
    elem !== null &&
    elem !== undefined &&
    !Array.isArray(elem) &&
    elem.type == 'JSXElement'
  )
}

/**
 * raw text between JSX tags.
 *
 * For example in `<div>Hello, world!</div>` the string `"Hello, world!"` is
 * represented as a `JSXText` node in the AST.
 */
function isJSXText(elem?: astElem | astElem[] | null): elem is JSXText {
  return (
    elem !== null &&
    elem !== undefined &&
    !Array.isArray(elem) &&
    elem.type == 'JSXText'
  )
}

/**
 * node that represents the name of a JSX element, attribute, or expression —
 * basically any plain identifier used in JSX
 * @example
 * <div></div>
 * {
 *   type: "JSXElement",
 *   openingElement: {
 *     name: {
 *       type: "JSXIdentifier",
 *       name: "div"
 *     }
 *   }
 * <MyComponent title="hello" />
 * {
 *   type: "JSXAttribute",
 *   name: {
 *     type: "JSXIdentifier",
 *     name: "title"
 *   }
 * }
 */
function isJSXIdentifier(elem?: astElem | null): elem is JSXIdentifier {
  return elem !== null && elem !== undefined && elem.type == 'JSXIdentifier'
}

/**
 * A JSX fragment (`<>...</>`)
 * @example
 * <>
 *   <h1>Hello</h1>
 * </>
 */
function isJSXFragment(elem?: astElem | null): elem is JSXFragment {
  return elem !== null && elem !== undefined && elem.type == 'JSXFragment'
}

/**
 * chained JSX identifier like `<List.Item />
 */
function isJSXMemberExpression(
  elem?: astElem | null
): elem is JSXMemberExpression {
  return (
    elem !== null && elem !== undefined && elem.type == 'JSXMemberExpression'
  )
}

/**
 * an AST is a node that wraps any JavaScript expression inside curly braces
 * ({}) in JSX.
 * @example
 * <div>{user.name}</div>
 */
function isJSXExpressionContainer(
  elem?: astElem | null
): elem is JSXExpressionContainer {
  return (
    elem !== null && elem !== undefined && elem.type == 'JSXExpressionContainer'
  )
}

/**
 * A concrete primitive value in the code like `'asd'` or `42`
 */
function isLiteral(elem?: astElem | null): elem is Literal {
  return elem !== null && elem !== undefined && elem.type === 'Literal'
}

/**
 * Represents property access like `asd.dfg` or `asd["dfg"]`
 */
function isMemberExpression(elem?: astElem | null): elem is MemberExpression {
  return elem !== null && elem !== undefined && elem.type == 'MemberExpression'
}

/**
 * The `...` element in the source code
 */
function isSpreadElement(elem?: astElem | null): elem is SpreadElement {
  return elem !== null && elem !== undefined && elem.type === 'SpreadElement'
}

/**
 * This represents a generic type declaration, the part between "<" and ">"
 * For example in
 * ```
 * function foo<T extends number = 42>(x: T) {}
 * ```
 * the `TSTypeParameter` is `T extends number = 42`
 */
function isTSTypeParameter(elem?: astElem | null): elem is TSTypeParameter {
  return elem !== null && elem !== undefined && elem.type === 'TSTypeParameter'
}

export {
  isCallExpression,
  isIdentifier,
  isImportSpecifier,
  isImportDefaultSpecifier,
  isJSXAttribute,
  isJSXElement,
  isJSXText,
  isJSXIdentifier,
  isJSXFragment,
  isJSXMemberExpression,
  isJSXExpressionContainer,
  isLiteral,
  isMemberExpression,
  isSpreadElement,
  isTSTypeParameter
}
