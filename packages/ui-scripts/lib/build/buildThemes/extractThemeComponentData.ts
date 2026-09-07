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
// TypeScript 7 dropped the programmatic Compiler API, so this imports
// Microsoft's TypeScript 6.0 compatibility shim instead.
// TODO revisit once TypeScript 7.1 adds a Compiler API (see https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/)
import * as ts from 'typescript-compiler-api'
import type { Node, ParameterDeclaration } from 'typescript-compiler-api'
import { fileURLToPath } from 'node:url'
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  writeFileSync
} from 'node:fs'
import { dirname, join } from 'node:path'

// Anchor on the workspace file so paths are independent of where this runs from.
const repoRoot = (() => {
  let dir = dirname(fileURLToPath(import.meta.url))
  while (!existsSync(join(dir, 'pnpm-workspace.yaml'))) dir = dirname(dir)
  return dir
})()

const license = `/*
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

`

const writeGenerated = (filePath: string, contents: string) =>
  writeFileSync(filePath, license + contents, 'utf-8')

/**
 * The published theme a token folder feeds. `canvas` and `canvasHighContrast`
 * are still built from token folders named `legacyCanvas` and
 * `legacyCanvasHighContrast`, so the theme object and the generated folder both
 * take the theme's name while the token sources keep the folder's. Every other
 * theme names its folder the same as itself.
 */
const themeOf = (tokenName: string) =>
  ({
    legacyCanvas: 'canvas',
    legacyCanvasHighContrast: 'canvasHighContrast'
  }[tokenName] ?? tokenName)

const spy = (paths: string[], path = ''): any =>
  new Proxy(() => {}, {
    get: (_t, key: string | symbol) => {
      if (typeof key !== 'string') return () => path
      const next = path ? `${path}.${key}` : key
      paths.push(next)
      return spy(paths, next)
    }
  })

// A spy records every step of an access, so `color`, `color.background` and
// `color.background.base` all show up. Only the deepest of a chain is a real
// read; keeping the prefixes would pull in whole subtrees.
const leavesOf = (paths: string[]) =>
  paths.filter((p) => !paths.some((o) => o !== p && o.startsWith(`${p}.`)))

const narrow = <A, R extends object>(fn: (arg: A) => R, paths: string[]) => {
  const leaves = leavesOf(paths)
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

// Reading any symbol off a spy returns a thunk yielding the path that spy
// stands for, which is how a value found in the output is traced back to input.
const SPY_PATH = Symbol('spyPath')

/**
 * Maps requested output paths of a token function back to the input paths they
 * read.
 *
 * Spying a narrowed function does not work: `narrow` filters the output, so it
 * still runs the whole body and every input read is recorded. Instead this runs
 * the function once against a spy, then walks the *result* and reads the path
 * tag off each spy value sitting under a requested output path.
 *
 * Only direct references (`semantic.borderRadius.sm`) are traced. A value the
 * function computes from an input, e.g. by interpolating it into a string,
 * loses the tag and is not reported.
 */
const dependencies = (fn: (arg: any) => object, outputPaths: string[]) => {
  const result = fn(spy([]))
  const deps = new Set<string>()

  const walk = (node: any, path: string, wanted: boolean) => {
    // Spies are proxies over a function, so this distinguishes them from the
    // plain objects and string literals the token functions also emit.
    if (typeof node === 'function') {
      if (wanted) deps.add(node[SPY_PATH]())
      return
    }
    if (node && typeof node === 'object') {
      for (const [key, value] of Object.entries(node)) {
        const next = path ? `${path}.${key}` : key
        walk(value, next, wanted || outputPaths.includes(next))
      }
    }
  }
  walk(result, '', false)
  return [...deps]
}

/**
 * Thrown when a token access can't be pinned down at build time, so we can't
 * know which tokens to keep. Always a hard failure: silently treating the
 * access as "no tokens used" would strip tokens the component needs at runtime.
 */
class UnresolvableTokenUsageError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'UnresolvableTokenUsageError'
  }
}

const extractPaths = (filePath: string, paramIndex: number) => {
  const program = ts.createProgram([filePath], {})
  const checker = program.getTypeChecker()
  const source = program.getSourceFile(filePath)!

  // Points at the offending source line so the failure is actionable. The
  // explicit annotation is what lets control flow analysis treat calls to this
  // as never-returning, so the code after a fail() is correctly unreachable.
  const fail: (node: Node, reason: string) => never = (node, reason) => {
    const { line, character } = source.getLineAndCharacterOfPosition(
      node.getStart(source)
    )
    throw new UnresolvableTokenUsageError(
      `${filePath}:${line + 1}:${character + 1}\n` +
        `  ${node.getText(source)}\n` +
        `${reason}`
    )
  }

  let param: ParameterDeclaration | undefined
  const findParam = (node: Node) => {
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
  // Not declaring the parameter means the function never reads it, so nothing
  // is used. Plenty of styles files take no sharedTokens at all.
  if (!param) {
    return []
  }
  const paramNameNode = param.name
  const symbol = checker.getSymbolAtLocation(paramNameNode)
  const paramName = paramNameNode.getText(source)

  const chain = (node: Node) => {
    const keys: string[] = []
    let current: Node = node
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
        if (!ts.isStringLiteral(arg)) {
          fail(
            parent,
            `Computed key "${arg.getText(
              source
            )}" is only known at runtime, so the ` +
              `token this reads cannot be determined statically. Index "${paramName}" ` +
              `with a string literal, or destructure the values it needs by name.`
          )
        }
        keys.push(arg.text)
        current = parent
      } else {
        break
      }
    }
    if (keys.length === 0) {
      fail(
        current,
        `"${paramName}" is used here without a property access, so it escapes and ` +
          `every token it holds would have to be kept. Read the values it needs by name instead.`
      )
    }
    return keys.join('.')
  }

  const paths: string[] = []
  const visit = (node: Node) => {
    if (
      ts.isIdentifier(node) &&
      node !== paramNameNode &&
      checker.getSymbolAtLocation(node) === symbol
    ) {
      paths.push(chain(node))
    }
    ts.forEachChild(node, visit)
  }
  visit(source)
  return paths
}

/**
 * Rebuilds a token function's source with only the requested output paths kept,
 * returned as a string.
 *
 * Applies to the shared token trees, semantics and sharedTokens, which every
 * component reads a sliver of. Component modules are deliberately not pruned:
 * a component consumes its whole token object, and a token its generateStyle
 * never reads is a bug in the token set rather than something to trim.
 *
 * Kept properties are sliced verbatim out of the original source rather than
 * reconstructed, so literals, arrays, `{ value, modify }` objects and
 * `semantic.x.y` references survive exactly as written. Only the object
 * literals that actually need pruning get rewritten.
 *
 * The return type annotation is dropped, since a narrowed object no longer
 * satisfies the full `Semantics` / `SharedTokens` type.
 */
const rebuildFn = (filePath: string, keepPaths: string[]) => {
  const source = ts.createSourceFile(
    filePath,
    readFileSync(filePath, 'utf8'),
    ts.ScriptTarget.Latest,
    true
  )
  const bail = (node: Node, reason: string): never => {
    throw new UnresolvableTokenUsageError(
      `${filePath}\n  ${node.getText(source)}\n${reason}`
    )
  }

  let arrow: any
  const findArrow = (node: Node) => {
    if (!arrow && ts.isArrowFunction(node)) arrow = node
    ts.forEachChild(node, findArrow)
  }
  findArrow(source)
  if (!arrow) {
    throw new UnresolvableTokenUsageError(
      `${filePath}\nNo arrow function found, so there is no token function to rebuild.`
    )
  }

  // Token functions return `({ ... })`, so unwrap the parentheses.
  const unwrap = (node: any) =>
    ts.isParenthesizedExpression(node) ? node.expression : node

  const root = unwrap(arrow.body)
  if (!ts.isObjectLiteralExpression(root)) {
    bail(
      root,
      'The function does not return an object literal, so it cannot be pruned.'
    )
  }

  const keep = leavesOf(keepPaths)

  const emit = (obj: any, path: string): string => {
    const parts: string[] = []
    for (const prop of obj.properties) {
      if (!ts.isPropertyAssignment(prop)) {
        bail(
          prop,
          'Only plain property assignments can be pruned; spreads, shorthands and ' +
            'methods leave the output path unattributable.'
        )
      }
      const name = prop.name
      if (
        !ts.isIdentifier(name) &&
        !ts.isStringLiteral(name) &&
        !ts.isNumericLiteral(name)
      ) {
        bail(prop, 'A computed key cannot be attributed to an output path.')
      }
      const next = path ? `${path}.${name.text}` : name.text

      // Inside a kept path: take the whole subtree as written. An ancestor of
      // one: recurse to prune the branches that are not needed.
      if (keep.some((k) => next === k || next.startsWith(`${k}.`))) {
        parts.push(prop.getText(source))
      } else if (keep.some((k) => k.startsWith(`${next}.`))) {
        const init = unwrap(prop.initializer)
        parts.push(
          ts.isObjectLiteralExpression(init)
            ? `${name.getText(source)}: ${emit(init, next)}`
            : prop.getText(source)
        )
      }
    }
    return `{\n${parts.join(',\n')}\n}`
  }

  const params = arrow.parameters
    .map((param: any) => param.getText(source))
    .join(', ')
  return `(${params}) => (${emit(root, '')})`
}

/**
 * Rewrites an arrow function's parameter list to `any`.
 *
 * The frozen files are standalone and do not import `Primitives` / `Semantics`,
 * so the annotations `rebuildFn` carried over from the source would not
 * resolve. Handles both `(semantic: Semantics) => ...` and the bare
 * `semantic => ...` that compiled output produces.
 */
const withAnyParams = (source: string) => {
  const arrow = source.indexOf('=>')
  const head = source.slice(0, arrow).trim()
  const body = source.slice(arrow + 2).trim()
  const inner = head.startsWith('(') ? head.slice(1, -1) : head
  const names = inner
    .split(',')
    .map((param) => param.split(':')[0].trim())
    .filter(Boolean)

  const params = names.map((name) =>
    new RegExp(`\\b${name}\\b`).test(body) ? `${name}: any` : `_${name}: any`
  )
  return `(${params.join(', ')}) => ${body}`
}

/**
 * Writes one theme's folder inside the component version's frozenThemes
 *
 *     frozenThemes/index.ts
 *     frozenThemes/<theme>/index.ts
 *     frozenThemes/<theme>/primitives.ts
 *     frozenThemes/<theme>/semantics.ts
 *     frozenThemes/<theme>/sharedTokens.ts
 *     frozenThemes/<theme>/component.ts
 */
const writeFrozenTheme = (
  frozen: {
    primitives: object
    semantics: string
    sharedTokens: string
    component: (...args: any[]) => object
  },
  target: {
    themeName: string
    componentName: string
    componentPackageName: string
    version: string
  }
) => {
  const frozenThemes = join(
    repoRoot,
    'packages',
    target.componentPackageName,
    'src',
    target.componentName,
    target.version,
    'frozenThemes'
  )
  const themeDir = join(frozenThemes, target.themeName)
  mkdirSync(themeDir, { recursive: true })

  const write = (file: string, contents: string) =>
    writeGenerated(join(themeDir, file), contents)

  write(
    'primitives.ts',
    `const primitives = ${JSON.stringify(frozen.primitives, null, 2)}\n\n` +
      `export default primitives\n`
  )
  write(
    'semantics.ts',
    `const semantics = ${withAnyParams(frozen.semantics)}\n\n` +
      `export default semantics\n`
  )
  write(
    'sharedTokens.ts',
    `const sharedTokens = ${withAnyParams(frozen.sharedTokens)}\n\n` +
      `export default sharedTokens\n`
  )
  write(
    'component.ts',
    `const component = ${withAnyParams(frozen.component.toString())}\n\n` +
      `export default component\n`
  )
  write(
    'index.ts',
    `import primitives from './primitives'\n` +
      `import semantics from './semantics'\n` +
      `import sharedTokens from './sharedTokens'\n` +
      `import component from './component'\n\n` +
      `const theme = {\n  primitives,\n  semantics,\n  sharedTokens,\n  component\n}\n\n` +
      `export default theme\n`
  )

  const themes = readdirSync(frozenThemes, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort()
  writeGenerated(
    join(frozenThemes, 'index.ts'),
    `${themes
      .map((name) => `import ${name} from './${name}'`)
      .join('\n')}\n\n` +
      `const frozenThemes = {\n${themes
        .map((name) => `  ${name}`)
        .join(',\n')}\n}\n\n` +
      `export default frozenThemes\n`
  )

  return themeDir
}

const resolveUsedThemeElements = async (
  tokenName: string,
  componentName: string,
  componentPackageName: string,
  version: string
) => {
  const theme = (
    await import(join(repoRoot, 'packages', 'ui-themes', 'lib', 'index.js'))
  )[themeOf(tokenName)]
  const primitives = theme.newTheme.primitives
  const semanticFn = theme.newTheme.semantics
  const sharedTokensFn = theme.newTheme.sharedTokens
  const componentFn = theme.newTheme.components[componentName]

  const semanticPaths: string[] = []
  componentFn(spy(semanticPaths))

  const sharedTokenPaths = extractPaths(
    join(
      repoRoot,
      'packages',
      componentPackageName,
      'src',
      componentName,
      version,
      'styles.ts'
    ),
    2
  )
  const sharedTokensSemanticPaths = dependencies(
    sharedTokensFn,
    sharedTokenPaths
  )

  const usedSemanticPaths = leavesOf([
    ...semanticPaths,
    ...sharedTokensSemanticPaths
  ])
  const usedPrimitivePaths = dependencies(semanticFn, usedSemanticPaths)

  const usedPrimitives = narrow((p: any) => p, usedPrimitivePaths)(primitives)

  const tokenSource = (file: string) =>
    join(
      repoRoot,
      'packages/ui-themes/src/themes/newThemeTokens',
      tokenName,
      file
    )

  const usedSemantics = rebuildFn(
    tokenSource('semantics.ts'),
    usedSemanticPaths
  )
  const usedSharedTokens = rebuildFn(
    tokenSource('sharedTokens.ts'),
    sharedTokenPaths
  )

  return {
    primitives: usedPrimitives,
    semantics: usedSemantics,
    sharedTokens: usedSharedTokens,
    component: componentFn
  }
}

const buildFrozenThemes = async (data: any) => {
  for (let i = 0; i < data.themes.length; i++) {
    const frozen = await resolveUsedThemeElements(
      data.themes[i],
      data.componentName,
      data.componentPackageName,
      data.version
    )
    console.log(
      writeFrozenTheme(frozen, {
        themeName: themeOf(data.themes[i]),
        componentName: data.componentName,
        componentPackageName: data.componentPackageName,
        version: data.version
      })
    )
  }
}

export default buildFrozenThemes
