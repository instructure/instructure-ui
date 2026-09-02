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

type PrettierOptions = Record<string, unknown>

/**
 * The subset of the Prettier API this module uses. Both Prettier 2 and 3 are
 * supported: in v2 `format` is synchronous and `resolveConfig` returns a
 * promise, in v3 both are asynchronous. Awaiting covers both shapes.
 */
type PrettierModule = {
  format: (
    source: string,
    options?: PrettierOptions
  ) => string | Promise<string>
  resolveConfig: (
    path: string
  ) => PrettierOptions | null | Promise<PrettierOptions | null>
}

const PRETTIER = 'prettier'

let prettierPromise: Promise<PrettierModule | undefined> | undefined
let warnedAboutMissingPrettier = false

/**
 * jscodeshift registers `@babel/register` for `.mjs` and `.cjs` files too and
 * rewrites their modules to CommonJS. That breaks Prettier 3, whose `index.cjs`
 * loads the ESM `index.mjs` at runtime. Hiding the dynamic import in a
 * `new Function` keeps Babel from compiling it to a `require` call, so Node
 * loads Prettier itself.
 */
const importModule = new Function('specifier', 'return import(specifier)') as (
  specifier: string
) => Promise<Record<string, unknown>>

async function importPrettier(): Promise<Record<string, unknown>> {
  try {
    return await importModule(PRETTIER)
  } catch {
    // Test runners that evaluate modules in their own context (Vitest) give
    // `new Function` no dynamic import callback, but do handle a plain import.
    return await import(PRETTIER)
  }
}

/**
 * Prettier is an optional peer dependency, so it is resolved from the
 * consumer's `node_modules` and its version is whatever they installed.
 */
function loadPrettier() {
  if (!prettierPromise) {
    prettierPromise = importPrettier()
      .then((namespace) => {
        const asDefault = namespace.default as PrettierModule | undefined
        return typeof asDefault?.format === 'function'
          ? asDefault
          : (namespace as unknown as PrettierModule)
      })
      .catch(() => undefined)
  }
  return prettierPromise
}

export default async function formatSource(source: string, sourcePath: string) {
  const prettier = await loadPrettier()
  if (!prettier) {
    if (!warnedAboutMissingPrettier) {
      warnedAboutMissingPrettier = true
      console.warn(
        'Prettier is not installed, the codemod result is not formatted. ' +
          'Install prettier (v2 or v3) or run the codemod with --usePrettier=false'
      )
    }
    return source
  }
  let options: PrettierOptions | null = null
  const extension = sourcePath.split('.').pop()
  let parser = 'babel'
  if (extension === 'ts' || extension === 'tsx') {
    parser = 'typescript'
  }
  try {
    options = await prettier.resolveConfig(sourcePath)
    if (options) {
      // Set the parser argument if the consumer did not set one to avoid a console warning
      options = {
        ...options,
        parser: options.parser || parser
      }
    }
  } catch (err) {
    // Will revert to the default prettier options if a config cannot be parsed
  }
  let result = source
  try {
    result = await prettier.format(
      source,
      options || {
        parser: parser,
        semi: false,
        singleQuote: true,
        trailingComma: 'none'
      }
    )
  } catch (e) {
    console.warn('Prettier could not format the codemod result')
  }
  return result
}
