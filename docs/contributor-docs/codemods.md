---
title: Writing codemods
category: Contributor Guides
order: 11
---

## Codemods

Codemods are small scripts that can automate tedious code refactorings. It's like Search & replace, just on steroids, InstUI uses them so breaking changes during major version upgrades are easier for users. Common use cases are renaming imports or props of components.

To accomplish this our codemods use [jsCodeshift](https://github.com/facebook/jscodeshift). This tool parses source files to an Abstract Syntax Tree (AST) and gives us an API that can modify it.

### Codemod development

Our codemods live in the `ui-codemods` package. Each codemod is an ES module with a default export and is executed by jscodeshift. it should have the following code:

```ts
---
type: code
---
import type { Transform } from 'jscodeshift'
/**
 * @param file the file to transform
 * @param api jscodeshift instance
 * @param options
 * @param options.filename if `filename` is specified then emitted warnings are
 * written to this file.
 * @param options.usePrettier if `true` the transformed code will be run through
 * [Prettier](https://prettier.io/). You can customize this through a [Prettier
 * config file](https://prettier.io/docs/configuration.html)
 * @returns the modified file as `string` or `null`
 */
const myCodemod: Transform = (file, api,
                              options?: { fileName?: string; usePrettier?: boolean }) => {
    return instUICodemodExecutor([my, cool, scripts], file, api, options)
}
export default myCodemod
```

> You can find lots of useful helper functions in `packages/ui-codemods/lib/utils/codemodhelpers.ts` and `packages/ui-codemods/lib/utils/codemodTypeCheckers.ts`

#### Testing codemods

You should write unit tests for your codemods. They are tested via test fixtures (sample before transform, sample after transform). To create a unit test for say `sampleCodemod` the following steps are needed:

1. Create a new test in `packages/ui-codemods/lib/__node_tests__/codemod.tests.ts`:
   ```ts
   ---
   type: code
   ---
   it('tests the cool sampleCodemod', () => {
     runTest(sampleCodemod)
   })
   ```
2. Create a folder named `sampleCodemod` in `packages/ui-codemods/lib/__node_tests__/__testfixtures__`
3. Here create sample input-output file pairs whose filename follows the following naming convention: `[fixtureName].input.[js/ts/tsx]`, `[fixtureName].output.[js/ts/tsx]`. These should be your test cases that ensure that the codemod does the transformation correctly.

Done! Run `npm run test:vitest ui-codemods` to run your test.

#### Testing codemod warnings

Sometimes codemods need to emit warnings to inform users about manual follow-ups or tricky edge cases.
We support testing these warnings using special fixtures and a console.warn spy.

1. In your codemod you can use the `printWarning` from `utils/codemodhelpers.ts` to create warnings.
2. Create new sample input file in the `__testfixtures__` folder, filename follows the following naming convention: `[fixtureName].warning.input.[js/ts/tsx]`:
   ```ts
   ---
   type: code
   ---
   <MyComponent deprecatedProp="value" />
   ```
3. Create new sample output file with the array of expected warning messages in the `__testfixtures__` folder, filename follows the following naming convention: `[fixtureName].warning.output.json`:
   ```json
   ---
   type: code
   ---
   ["Warn for deprecated prop usage.", "Warn for something else."]
   ```
4. When you run `npm run test:vitest ui-codemods`, your test will pass and ensure your codemod warns as expected.

Finally, you should try to run your codemod as users will do:

```sh
---
type: code
---
npx jscodeshift@17.3.0 -t /path/to/sampleCodemod.ts /path/to/code/to/rewrite --usePrettier=false
```
