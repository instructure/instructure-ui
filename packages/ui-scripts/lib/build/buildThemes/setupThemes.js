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

import { promises } from 'fs'
import createFile from './createFile.js'
import { generatePrimitives, generateType } from './generatePrimitives.js'
import generateSemantics, {
  generateSemanticsType,
  mergeSemanticSets
} from './generateSemantics.js'
import generateComponent, {
  generateComponentType
} from './generateComponents.js'
import { exec } from 'child_process'
import { promisify } from 'node:util'

// transform to an object for easier handling
export const transformThemes = (themes) =>
  //TODO-rework the Primitive theme is a hackaround for design and only for the duration of the v12 work. This should be removed before the release (.filter(t=>t!=="Primitive"))
  themes
    .filter((t) => t.name !== 'Primitive')
    .reduce((acc, theme) => {
      const tokenSets = Object.keys(theme.selectedTokenSets).reduce(
        (acc, tokenSet) => {
          if (tokenSet.includes('primitives')) {
            return { ...acc, primitives: tokenSet }
          }
          if (tokenSet.includes('semantic')) {
            return { ...acc, semantic: [...acc.semantic, tokenSet] }
          }
          if (theme.selectedTokenSets[tokenSet] === 'enabled') {
            return { ...acc, components: [...acc.components, tokenSet] }
          }
          return acc
        },
        { primitives: '', semantic: '', components: [] }
      )

      return { ...acc, [theme.name]: tokenSets }
    }, {})

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1)
const unCapitalize = (str) => str.charAt(0).toLowerCase() + str.slice(1)

const getTypeImports = (componentTypes, theme) => {
  let imports = ''
  if (componentTypes.includes(`Semantics[`)) {
    imports =
      imports + `import type { Semantics } from "../${theme}/semantics"\n`
  }
  if (componentTypes.includes('TokenBoxshadowValueInst')) {
    imports =
      imports +
      `import type { TokenBoxshadowValueInst } from '../commonTypes'\n`
  }
  if (componentTypes.includes('TokenBorderValue')) {
    imports =
      imports + `import type { TokenBorderValue } from '@tokens-studio/types'\n`
  }
  if (componentTypes.includes('TokenTypographyValueInst')) {
    imports =
      imports +
      `import type { TokenTypographyValueInst } from '../commonTypes'\n`
  }
  return imports
}

const setupThemes = async (targetPath, input) => {
  //clear old themes
  await promises.rm(targetPath, { recursive: true, force: true })
  //make new root folder
  await promises.mkdir(targetPath, { recursive: true })

  // we need to put sharedTokensTypes to the commonTypes where it makes sense, however it comes from token studio as a component. This variable is seen by both parts of the code
  let sharedTokensTypes = ''

  const themeData = transformThemes(input['$themes'])
  //TODO-rework the Primitive theme is a hackaround for design and only for the duration of the v12 work. This should be removed before the release (.filter(t=>t!=="Primitive"))
  const themes = Object.keys(themeData).filter((t) => t !== 'Primitive')
  for (let themeIndex = 0; themeIndex < themes.length; themeIndex++) {
    const theme = themes[themeIndex]
    const themePath = `${targetPath}/${theme}`
    await promises.mkdir(themePath, { recursive: true })

    // primitives
    const primitives = generatePrimitives(input[themeData[theme].primitives])
    const primitiveTypes = generateType(primitives)
    const primitivesFileContent = `
          export type Primitives = ${primitiveTypes}

          const primitives: Primitives = ${JSON.stringify(primitives)}
          export default primitives
          `
    await createFile(`${themePath}/primitives.ts`, primitivesFileContent)

    // semantics
    const mergedSemanticData = mergeSemanticSets(
      input,
      themeData[theme].semantic
    )
    const semantics = generateSemantics(mergedSemanticData)
    const semanticsTypes = generateSemanticsType(mergedSemanticData)
    const semanticsFileContent = `
        import primitives from "./primitives"
        import type {Primitives} from "./primitives"

        export type Semantics = ${semanticsTypes}

        const semantics: Semantics = {${semantics}}
        export default semantics
          `
    await createFile(`${themePath}/semantics.ts`, semanticsFileContent)

    const componentAndSubcomponentNames = []
    //components
    for (const componentpath of themeData[theme].components) {
      const rawComponentName =
        componentpath.split('/')[componentpath.split('/').length - 1]
      // e.g. ['tabs', 'tabsPanel', 'tabsTab']
      const componentAndSubComponents = Object.keys(input[componentpath])
      const componentNameDict = {}
      for (let i = 0; i < componentAndSubComponents.length; i++) {
        // e.g. 'tag' or 'menuSeparator'
        const fullComponentName = componentAndSubComponents[i]
        if (componentNameDict[fullComponentName]) {
          throw new Error(
            'Component names must be unique. The following name' +
              ' appears more than once: ',
            fullComponentName
          )
        } else {
          componentNameDict[fullComponentName] = true
        }
        if (fullComponentName !== 'sharedTokens') {
          componentAndSubcomponentNames.push(fullComponentName)
        }
        const componentThemeVars = generateComponent(
          input[componentpath][fullComponentName]
        )

        const componentTypes = generateComponentType(
          input[componentpath][fullComponentName]
        )
        const semanticsImport = componentThemeVars.includes('semantics.')
          ? 'import semantics from "../semantics"'
          : ''
        // SharedTokens have to be at the component level in the input data
        // because of Figma, but it should be one level higher for our purposes
        if (rawComponentName !== 'SharedTokens') {
          const componentFileContent = `
          ${semanticsImport}
          import type { ${capitalize(
            fullComponentName
          )} } from '../../componentTypes/${fullComponentName}'

          const ${fullComponentName}: ${capitalize(
            fullComponentName
          )} = {${componentThemeVars}}
          export default ${fullComponentName}
            `
          await createFile(
            `${themePath}/components/${fullComponentName}.ts`,
            componentFileContent
          )
        }

        if (rawComponentName === 'SharedTokens') {
          sharedTokensTypes = componentTypes
          const componentFileContent = `
        import semantics from "./semantics"
        import { SharedTokens } from '../commonTypes'

        const ${fullComponentName}: ${capitalize(
            fullComponentName
          )} = {${componentThemeVars}}
        export default ${fullComponentName}
          `

          await createFile(
            `${themePath}/${fullComponentName}.ts`,
            componentFileContent
          )
        }

        if (themeIndex === 0) {
          const typeFileContent = `
          ${getTypeImports(componentTypes, theme)}

          export type ${capitalize(fullComponentName)} = ${componentTypes}

          export default ${capitalize(fullComponentName)}
        `
          if (rawComponentName !== 'SharedTokens') {
            await createFile(
              `${targetPath}/componentTypes/${fullComponentName}.ts`,
              typeFileContent
            )
          }
        }
      }
    }

    //index file
    const componentImports = componentAndSubcomponentNames
      .map(
        (componentName) =>
          `import ${unCapitalize(
            componentName
          )} from "./components/${unCapitalize(componentName)}"`
      )
      .join('\n')
    const componentNames = componentAndSubcomponentNames
      .map(
        (componentName) =>
          `${capitalize(componentName)}: ${unCapitalize(componentName)}`
      )
      .join(',\n')
    const indexFileContent = `
      import sharedTokens from "./sharedTokens";
      import primitives, {type Primitives} from "./primitives";
      import semantics, {type Semantics} from "./semantics";

      ${componentImports}

      import type { BaseTheme } from '../commonTypes';

      export type Theme = BaseTheme<Primitives, Semantics>

      const theme: Theme = {
        primitives,
        semantics,
        sharedTokens,
        components: {
          ${componentNames}
        },
      };

      export default theme
      `
    await createFile(`${themePath}/index.ts`, indexFileContent)

    //index type file
    if (themeIndex === 0) {
      const componentTypeImports = componentAndSubcomponentNames
        .map(
          (componentName) =>
            `import type ${capitalize(componentName)} from './${unCapitalize(
              componentName
            )}'`
        )
        .join('\n')
      const componentTypeExport = componentAndSubcomponentNames
        .map(
          (componentName) =>
            `${capitalize(componentName)}:${capitalize(componentName)}`
        )
        .join(',\n')

      const componentsTypesFileContent = `
          ${componentTypeImports} \n
          type ComponentTypes = {
          ${componentTypeExport} \n
          }

          export type { ComponentTypes }
          export default ComponentTypes
        `
      await createFile(
        `${targetPath}/componentTypes/index.ts`,
        componentsTypesFileContent
      )
    }
  }
  // export common types
  const commonTypes = `import type { ComponentTypes } from "./componentTypes"
    import type { TokenTextCaseValue, TokenTextDecorationValue } from '@tokens-studio/types'


    // This type is broken in Token Studio, use their version when the bug is fixed
    export type TokenBoxshadowValueInst = {
        color: string
        type: 'dropShadow' | 'innerShadow' // BUG: this is an enum in the original
        x: string | number
        y: string | number
        blur: string | number
        spread: string | number
        blendMode?: string
    }
    // This type is broken in Token Studio, use their version when the bug is fixed
    export type TokenTypographyValueInst = {
    fontFamily?: string
    fontWeight?: string | number // BUG: this is just 'string' in the original
    fontSize?: string
    lineHeight?: string | number
    letterSpacing?: string
    paragraphSpacing?: string
    paragraphIndent?: string
    textCase?: TokenTextCaseValue
    textDecoration?: TokenTextDecorationValue
  }

  export type SharedTokens = ${sharedTokensTypes}

  export type BaseTheme<P extends Record<string, any> = Record<string, any>, S extends Record<string, any> = Record<string, any>> = {
    primitives: P
    semantics: S
    sharedTokens: SharedTokens
    components: ComponentTypes
  }


  `
  await createFile(`${targetPath}/commonTypes.ts`, commonTypes)

  // export index.ts
  const themeImports = Object.keys(themeData)
    .map(
      (theme) =>
        `import ${theme}, {type Theme as ${capitalize(
          theme
        )}} from "./${theme}"`
    )
    .join('\n')
  const themeExports = Object.keys(themeData)
    .map((theme) => theme)
    .join(',\n')

  const themeTypeExports = Object.keys(themeData)
    .map((theme) => `type ${capitalize(theme)}`)
    .join(',\n')

  const exportIndexFileContent = `
    ${themeImports}
    export {
      ${themeExports}
    }
    export {
      ${themeTypeExports}
    }
  `
  await createFile(`${targetPath}/index.ts`, exportIndexFileContent)
  const execAsync = promisify(exec)
  try {
    const { stdout, stderr } = await execAsync(
      "dprint fmt '" + targetPath + "/**/*.*'"
    )
    // eslint-disable-next-line no-console
    console.log('[dprint]', stdout)
    if (stderr) {
      console.error('[dprint error]:', stderr)
    }
  } catch (error) {
    throw new Error('dprint: ' + error.message)
  }
}

export default setupThemes
