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
import ts from 'typescript'

const spy = (paths: string[], path = ''): any =>
  new Proxy(() => {}, {
    get: (_t, key: string | symbol) => {
      if (typeof key !== 'string') return () => path
      const next = path ? `${path}.${key}` : key
      paths.push(next)
      return spy(paths, next)
    }
  })

const narrow = <A, R extends object>(fn: (arg: A) => R, paths: string[]) => {
  const leaves = paths.filter(
    (p) => !paths.some((o) => o !== p && o.startsWith(`${p}.`))
  )
  return (arg: A) => {
    const source = fn(arg)
    const used: Record<string, any> = {}
    for (const leaf of leaves) {
      const keys = leaf.split('.')
      let src: any = source
      let dest: any = used
      for (const key of keys.slice(0, -1)) {
        src = src?.[key]
        dest = dest[key] ??= {}
      }
      dest[keys.at(-1)!] = src?.[keys.at(-1)!]
    }
    return used
  }
}

const extractPaths = (filePath: string, paramIndex: number) => {
  const program = ts.createProgram([filePath], {})
  const checker = program.getTypeChecker()
  const source = program.getSourceFile(filePath)!

  let param: ts.ParameterDeclaration | undefined
  const findParam = (node: ts.Node) => {
    if (
      !param &&
      (ts.isArrowFunction(node) || ts.isFunctionDeclaration(node)) &&
      node.parameters.length > paramIndex
    ) {
      param = node.parameters[paramIndex]
    }
    ts.forEachChild(node, findParam)
  }
  findParam(source)
  const symbol = checker.getSymbolAtLocation(param!.name)

  const chain = (node: ts.Node) => {
    const keys: string[] = []
    let current: ts.Node = node
    while (true) {
      const parent = current.parent
      if (
        ts.isPropertyAccessExpression(parent) &&
        parent.expression === current
      ) {
        keys.push(parent.name.text)
        current = parent
      } else if (
        ts.isElementAccessExpression(parent) &&
        parent.expression === current
      ) {
        const arg = parent.argumentExpression
        if (!ts.isStringLiteral(arg)) return { path: '', wide: true }
        keys.push(arg.text)
        current = parent
      } else {
        break
      }
    }
    return { path: keys.join('.'), wide: keys.length === 0 }
  }

  const paths: string[] = []
  let wide = false
  const visit = (node: ts.Node) => {
    if (
      ts.isIdentifier(node) &&
      node !== param!.name &&
      checker.getSymbolAtLocation(node) === symbol
    ) {
      const { path, wide: escaped } = chain(node)
      if (escaped) wide = true
      else paths.push(path)
    }
    ts.forEachChild(node, visit)
  }
  visit(source)
  return { paths, wide }
}

const test = async (component: string) => {
  const { dark } = await import(
    new URL('../../ui-themes/lib/index.js', import.meta.url).href
  )
  const { default: generateStyle } = await import(
    new URL('../../ui-alerts/lib/Alert/v2/styles.js', import.meta.url).href
  )
  const primitives = dark.newTheme.primitives
  const semanticFn = dark.newTheme.semantics
  const sharedTokensFn = dark.newTheme.sharedTokens
  const componentFn = dark.newTheme.components[component]

  const semanticPaths: string[] = []
  componentFn(spy(semanticPaths))

  const usedSemanticFn = narrow(semanticFn, semanticPaths)
  console.log(
    extractPaths(
      new URL('../../ui-alerts/src/Alert/v2/styles.ts', import.meta.url)
        .pathname,
      2
    )
  )
}

test('Pill')
