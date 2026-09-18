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
 * The `@instructure/ui-themes` export a token folder feeds. `canvas` and
 * `canvasHighContrast` are still built from token folders named `legacyCanvas`
 * and `legacyCanvasHighContrast`. Every other theme exports under the same name
 * as its folder.
 *
 * This is only the export name. A frozen theme is looked up at runtime by
 * `theme.key`, which is not the same string — `canvasHighContrast` has the key
 * `canvas-high-contrast` — so the generated folders take the key instead.
 */
const themeExportOf = (tokenName: string) =>
  ({
    legacyCanvas: 'canvas',
    legacyCanvasHighContrast: 'canvasHighContrast'
  }[tokenName] ?? tokenName)

// Theme keys are kebab-case, so they name folders but cannot name imports.
const bindingOf = (themeKey: string) =>
  themeKey.replace(/-(\w)/g, (_match, char: string) => char.toUpperCase())

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

/**
 * Collects the `sharedTokens` paths a styles.ts reads.
 *
 * Starts at the third parameter of the file's default export, which is always
 * generateStyle's `sharedTokens`, and follows that value wherever it goes:
 * property and index accesses become paths, destructured bindings carry the
 * path they stand for, and a value handed to a helper declared in the same
 * file is traced into that helper's parameter. `View` reaches its tokens only
 * that way — through `getBorderStyle`, `getSpacingStyle` and `getOffsetStyle`
 * — so without the hand-off every token those read would be dropped.
 */
const extractPaths = (filePath: string) => {
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

  // Unwraps whatever an expression ends up referring to, so a call to a helper
  // written as `const getBorderStyle = (...) => ...` resolves to its arrow.
  // Imported helpers have no declaration here and come back undefined.
  const functionOf = (node?: Node): any => {
    if (!node) return undefined
    if (ts.isParenthesizedExpression(node)) return functionOf(node.expression)
    if (
      ts.isArrowFunction(node) ||
      ts.isFunctionExpression(node) ||
      ts.isFunctionDeclaration(node)
    ) {
      return node
    }
    if (ts.isIdentifier(node)) {
      const declaration = checker.getSymbolAtLocation(node)?.valueDeclaration
      return declaration && ts.isVariableDeclaration(declaration)
        ? functionOf(declaration.initializer)
        : functionOf(declaration)
    }
    return undefined
  }

  // `export default generateStyle`, `export default () => ...` and
  // `export default function generateStyle() {}` all name the same function.
  const generateStyle = (() => {
    for (const statement of source.statements) {
      if (ts.isExportAssignment(statement) && !statement.isExportEquals) {
        return functionOf(statement.expression)
      }
      if (
        ts.isFunctionDeclaration(statement) &&
        statement.modifiers?.some(
          (modifier) => modifier.kind === ts.SyntaxKind.DefaultKeyword
        )
      ) {
        return statement
      }
    }
    return undefined
  })()

  if (!generateStyle) {
    throw new UnresolvableTokenUsageError(
      `${filePath}\nNo default exported function found, so there is no ` +
        `generateStyle whose token reads can be traced.`
    )
  }

  // sharedTokens is the third parameter, after componentTheme and the
  // component's props.
  const sharedTokensParam: ParameterDeclaration | undefined =
    generateStyle.parameters[2]
  // Not declaring the parameter means the function never reads it, so nothing
  // is used. Plenty of styles files take no sharedTokens at all.
  if (!sharedTokensParam) {
    return []
  }

  // Reading a shorthand `{ sharedTokens }` through getSymbolAtLocation gives
  // the property being defined, not the variable it stands for.
  const valueSymbolOf = (node: Node) =>
    ts.isShorthandPropertyAssignment(node.parent) && node.parent.name === node
      ? checker.getShorthandAssignmentValueSymbol(node.parent)
      : checker.getSymbolAtLocation(node)

  // The name side of a declaration introduces a binding rather than reading
  // one, so it is not a use of the value being tracked.
  const isDeclarationName = (node: Node) => {
    const parent = node.parent
    const declares =
      ts.isParameter(parent) ||
      ts.isVariableDeclaration(parent) ||
      ts.isBindingElement(parent) ||
      ts.isPropertyAssignment(parent)
    if (!declares) return false
    const { name, propertyName } = parent as any
    return name === node || propertyName === node
  }

  // Indexing every identifier up front keeps the tracing a lookup per binding
  // instead of a fresh walk of the file.
  const uses = new Map<any, Node[]>()
  const index = (node: Node) => {
    if (ts.isIdentifier(node) && !isDeclarationName(node)) {
      const symbol = valueSymbolOf(node)
      if (symbol) uses.set(symbol, [...(uses.get(symbol) ?? []), node])
    }
    ts.forEachChild(node, index)
  }
  index(source)

  const paths: string[] = []
  const tracked = new Set<any>()
  const join = (prefix: string, key: string) =>
    prefix ? `${prefix}.${key}` : key

  // A tracked binding is a name holding some subtree of sharedTokens, paired
  // with the path that subtree sits at. The parameter itself holds the root,
  // so its prefix is empty.
  const track = (symbol: any, prefix: string) => {
    if (!symbol || tracked.has(symbol)) return
    tracked.add(symbol)
    for (const node of uses.get(symbol) ?? []) use(node, prefix)
  }

  // Binds a name, or every name a destructuring pattern introduces, to the
  // path it reads from.
  const trackBinding = (name: any, prefix: string): void => {
    if (ts.isIdentifier(name)) {
      track(checker.getSymbolAtLocation(name), prefix)
      return
    }
    if (!ts.isObjectBindingPattern(name)) {
      fail(
        name,
        `Only object destructuring can be attributed to token paths. ` +
          `Read the values this needs by name instead.`
      )
    }
    for (const element of name.elements) {
      if (element.dotDotDotToken) {
        fail(
          element,
          `A rest binding collects whatever was not named above it, so the ` +
            `tokens it holds cannot be determined statically. Destructure the ` +
            `values this needs by name instead.`
        )
      }
      const key: any = element.propertyName ?? element.name
      if (!ts.isIdentifier(key) && !ts.isStringLiteral(key)) {
        fail(element, `A computed key cannot be attributed to a token path.`)
      }
      trackBinding(element.name, join(prefix, key.text))
    }
  }

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
              `token this reads cannot be determined statically. Index ` +
              `"${node.getText(source)}" with a string literal, or ` +
              `destructure the values it needs by name.`
          )
        }
        keys.push(arg.text)
        current = parent
      } else {
        break
      }
    }
    return keys.join('.')
  }

  // Follows a tracked value into the parameter of the function it was handed
  // to. `key` is set when it travelled as a property of an options object, in
  // which case the callee has to destructure that property to reach it.
  // Returns false when the hand-off can't be followed.
  const intoParameter = (
    call: any,
    argumentIndex: number,
    prefix: string,
    key?: string
  ): boolean => {
    const callee = functionOf(call.expression)
    if (!callee) return false
    const param = callee.parameters[argumentIndex]
    // The callee ignores the argument, so nothing it holds is read.
    if (!param) return true
    if (key === undefined) {
      trackBinding(param.name, prefix)
      return true
    }
    if (!ts.isObjectBindingPattern(param.name)) return false
    const element = param.name.elements.find(
      (binding: any) => (binding.propertyName ?? binding.name).text === key
    )
    if (!element) {
      // A rest binding could still be holding the property, so only an
      // exhaustive set of named bindings proves the callee never reads it.
      return !param.name.elements.some((binding: any) => binding.dotDotDotToken)
    }
    trackBinding(element.name, prefix)
    return true
  }

  // Handles a tracked value that is moved somewhere else rather than read.
  const propagate = (node: Node, prefix: string): boolean => {
    const parent: any = node.parent

    // `const tokens = sharedTokens`, including destructuring.
    if (ts.isVariableDeclaration(parent) && parent.initializer === node) {
      trackBinding(parent.name, prefix)
      return true
    }
    // A positional argument: `processBorderWidthValue(value, sharedTokens)`.
    if (ts.isCallExpression(parent) && parent.arguments.includes(node as any)) {
      return intoParameter(
        parent,
        parent.arguments.indexOf(node as any),
        prefix
      )
    }
    // A property of an options object: `getBorderStyle({ sharedTokens, dir })`.
    const property =
      ts.isShorthandPropertyAssignment(parent) ||
      (ts.isPropertyAssignment(parent) && parent.initializer === node)
        ? parent
        : undefined
    if (property && ts.isObjectLiteralExpression(property.parent)) {
      const object = property.parent
      const call = object.parent
      const key = property.name
      if (
        ts.isCallExpression(call) &&
        call.arguments.includes(object) &&
        (ts.isIdentifier(key) || ts.isStringLiteral(key))
      ) {
        return intoParameter(
          call,
          call.arguments.indexOf(object),
          prefix,
          key.text
        )
      }
    }
    return false
  }

  function use(node: Node, prefix: string) {
    const parent = node.parent
    if (
      (ts.isPropertyAccessExpression(parent) ||
        ts.isElementAccessExpression(parent)) &&
      parent.expression === node
    ) {
      paths.push(join(prefix, chain(node)))
      return
    }
    if (propagate(node, prefix)) return
    // A destructured binding already names a subtree, so keeping all of it is
    // the honest answer when the value is used whole.
    if (prefix) {
      paths.push(prefix)
      return
    }
    fail(
      node,
      `"${node.getText(source)}" is used here whole rather than read from, ` +
        `and it did not land in a function declared in this file that could ` +
        `be traced, so every token it holds would have to be kept. Read the ` +
        `values it needs by name instead.`
    )
  }

  trackBinding(sharedTokensParam.name, '')
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
 *     frozenThemes/<theme key>/index.ts
 *     frozenThemes/<theme key>/primitives.ts
 *     frozenThemes/<theme key>/semantics.ts
 *     frozenThemes/<theme key>/sharedTokens.ts
 *     frozenThemes/<theme key>/components.ts
 *
 * Folders are named after the theme's runtime `key`, because that is what
 * `useStyleNew` and `withStyleNew` index the frozen theme with.
 */
const writeFrozenTheme = (
  frozen: {
    themeKey: string
    primitives: object
    semantics: string
    sharedTokens: string
    components: Record<string, (...args: any[]) => object>
  },
  target: {
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
  const themeDir = join(frozenThemes, frozen.themeKey)
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
    'components.ts',
    `const components = {\n${Object.entries(frozen.components)
      .map(([id, fn]) => `  ${id}: ${withAnyParams(fn.toString())}`)
      .join(',\n')}\n}\n\n` + `export default components\n`
  )
  write(
    'index.ts',
    `import primitives from './primitives'\n` +
      `import semantics from './semantics'\n` +
      `import sharedTokens from './sharedTokens'\n` +
      `import components from './components'\n\n` +
      `const theme = {\n  primitives,\n  semantics,\n  sharedTokens,\n  components\n}\n\n` +
      `export default theme\n`
  )

  const themeKeys = readdirSync(frozenThemes, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort()
  writeGenerated(
    join(frozenThemes, 'index.ts'),
    `${themeKeys
      .map((key) => `import ${bindingOf(key)} from './${key}'`)
      .join('\n')}\n\n` +
      `const frozenThemes = {\n${themeKeys
        .map((key) => `  '${key}': ${bindingOf(key)}`)
        .join(',\n')}\n}\n\n` +
      `export default frozenThemes\n`
  )

  return themeDir
}

/**
 * Every component whose tokens a version folder owns, as `componentId` and the
 * folder it lives in.
 *
 * A version folder holds the component itself plus a folder per subcomponent,
 * and each of those has its own entry in the theme. `Menu` v2 carries
 * `Menu.Item`, `Menu.Group` and `Menu.Separator`, so freezing only `Menu` would
 * drop every token its items read. Folder names are no guide here —
 * `MenuItemGroup/` holds `Menu.Group` — so the id comes out of the source.
 *
 * Dots are stripped because that is the key the theme's `components` object and
 * `withStyleNew` both use.
 */
const componentsUnder = (
  dir: string
): { componentId: string; dir: string }[] => {
  const found: { componentId: string; dir: string }[] = []
  const index = join(dir, 'index.tsx')
  if (existsSync(index)) {
    // Class components declare `static readonly componentId = 'Menu.Item'`,
    // function components pass `componentId: 'FormFieldLayout'` to useStyleNew.
    const componentId = readFileSync(index, 'utf8').match(
      /\bcomponentId\s*[:=]\s*['"]([^'"]+)['"]/
    )?.[1]
    if (componentId) {
      found.push({ componentId: componentId.split('.').join(''), dir })
    }
  }
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    // Subcomponents are capitalized; frozenThemes and __tests__ are not.
    if (entry.isDirectory() && /^[A-Z]/.test(entry.name)) {
      found.push(...componentsUnder(join(dir, entry.name)))
    }
  }
  return found
}

const resolveUsedThemeElements = async (
  tokenName: string,
  componentName: string,
  componentPackageName: string,
  version: string
) => {
  const theme = (
    await import(join(repoRoot, 'packages', 'ui-themes', 'lib', 'index.js'))
  )[themeExportOf(tokenName)]
  const primitives = theme.newTheme.primitives
  const semanticFn = theme.newTheme.semantics
  const sharedTokensFn = theme.newTheme.sharedTokens

  const versionDir = join(
    repoRoot,
    'packages',
    componentPackageName,
    'src',
    componentName,
    version
  )

  const semanticPaths: string[] = []
  const sharedTokenPaths: string[] = []
  const components: Record<string, (...args: any[]) => object> = {}

  for (const component of componentsUnder(versionDir)) {
    const componentFn = theme.newTheme.components[component.componentId]
    // Not every subcomponent has tokens of its own, but it can still read
    // sharedTokens in its styles.ts.
    if (componentFn) {
      components[component.componentId] = componentFn
      componentFn(spy(semanticPaths))
    }
    const styles = join(component.dir, 'styles.ts')
    if (existsSync(styles)) sharedTokenPaths.push(...extractPaths(styles))
  }

  // A component with no tokens of its own is fine as long as its styles.ts
  // reads sharedTokens, because those still drift. Neither means the folder
  // holds nothing a frozen theme could pin down.
  if (Object.keys(components).length === 0 && sharedTokenPaths.length === 0) {
    throw new UnresolvableTokenUsageError(
      `${versionDir}\nNo component in this folder has tokens in the ` +
        `"${tokenName}" theme or reads sharedTokens, so there is nothing to freeze.`
    )
  }

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
    // Taken off the theme rather than derived from the folder, so it always
    // matches the key the components look the frozen theme up with.
    themeKey: theme.key as string,
    primitives: usedPrimitives,
    semantics: usedSemantics,
    sharedTokens: usedSharedTokens,
    components
  }
}

const buildFrozenThemes = async (data: {
  themes: string[]
  componentName: string
  componentPackageName: string
  version: string
}) => {
  for (const tokenName of data.themes) {
    const frozen = await resolveUsedThemeElements(
      tokenName,
      data.componentName,
      data.componentPackageName,
      data.version
    )
    console.log(
      writeFrozenTheme(frozen, {
        componentName: data.componentName,
        componentPackageName: data.componentPackageName,
        version: data.version
      })
    )
  }
}

export default buildFrozenThemes
