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

// based on https://github.com/paradoxxxzero/babel-plugin-add-react-static-displayname v0.02

const babel = require('@babel/core')
const t = babel.types

module.exports = () => ({
  visitor: {
    Program(path) {
      path.traverse({
        Class(path) {
          let name = 'Anonymus'
          if (path.node.id && path.node.id.name) {
            name = path.node.id.name
          }
          const body = path.get('body')
          // If there is no render method, assuming not a component, return
          if (
            !body.node.body.find(
              (node) =>
                t.isClassMethod(node) &&
                t.isIdentifier(node.key, { name: 'render' })
            )
          ) {
            return
          }
          // If there is already a displayName, return
          if (
            body.node.body.find(
              (node) =>
                t.isClassProperty(node) &&
                t.isIdentifier(node.key, { name: 'displayName' })
            )
          ) {
            return
          }
          // Creating the class property
          const classProperty = t.classProperty(
            t.identifier('displayName'),
            t.stringLiteral(name)
          )
          // Don't know if possible to set this with constructor
          classProperty.static = true
          // Inserting at start of class body
          body.unshiftContainer('body', classProperty)
        }
      })
    }
  }
})
