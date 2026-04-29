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
} from './generateSemantics.ts'
import generateComponent, {
  generateComponentType
} from './generateComponents.js'
import { exec } from 'child_process'
import { promisify } from 'node:util'

// transform to an object for easier handling
export const transformThemes = (themes: any, input: any) =>
  //TODO-rework the Primitive theme is a hackaround for design and only for the duration of the v12 work. This should be removed before the release (.filter(t=>t!=="Primitive"))
  themes
    .filter((t) => t.name !== 'Primitive')
    .reduce((acc, theme) => {
      const tokenSets = Object.entries(theme.selectedTokenSets).reduce(
        (acc, [path, status]) => {
          const value = path
            .split('/')
            .reduce((node, key) => node?.[key], input)
          if (path.includes('primitives')) {
            return { ...acc, primitives: value }
          }
          if (path.includes('semantic')) {
            return { ...acc, semantic: [...acc.semantic, value] }
          }
          if (status === 'enabled') {
            return {
              ...acc,
              components: [
                ...acc.components,
                { name: path.split('/').at(-1), data: value }
              ]
            }
          }
          return acc
        },
        { primitives: null, semantic: [], components: [] }
      )

      return { ...acc, [theme.name]: tokenSets }
    }, {})

const capitalize = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1)
const unCapitalize = (str: string): string =>
  str.charAt(0).toLowerCase() + str.slice(1)

const getTypeImports = (componentTypes: any, theme: any): string => {
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

const setupThemes = async (targetPath: string, input: any): Promise<void> => {
  //clear old themes
  await promises.rm(targetPath, { recursive: true, force: true })
  //make new root folder
  await promises.mkdir(targetPath, { recursive: true })

  // we need to put sharedTokensTypes to the commonTypes where it makes sense, however it comes from token studio as a component. This variable is seen by both parts of the code
  let sharedTokensTypes = ''

  const themeData = transformThemes(input['$themes'], input)
  //TODO-rework the Primitive theme is a hackaround for design and only for the duration of the v12 work. This should be removed before the release (.filter(t=>t!=="Primitive"))
  const themes = Object.keys(themeData).filter((t) => t !== 'Primitive')
  for (let themeIndex = 0; themeIndex < themes.length; themeIndex++) {
    const theme = themes[themeIndex]
    const themePath = `${targetPath}/${theme}`
    await promises.mkdir(themePath, { recursive: true })

    // primitives
    const primitives = generatePrimitives(themeData[theme].primitives)
    const primitiveTypes = generateType(primitives)
    const primitivesFileContent = `
          export type Primitives = ${primitiveTypes}

          const primitives: Primitives = ${JSON.stringify(primitives)}
          export default primitives
          `
    await createFile(`${themePath}/primitives.ts`, primitivesFileContent)

    // semantics
    const mergedSemanticData = mergeSemanticSets(themeData[theme].semantic)
    const semantics = generateSemantics(mergedSemanticData)
    const semanticsTypes = generateSemanticsType(mergedSemanticData)
    const semanticsFileContent = `
        import type {Primitives} from "./primitives"

        export type Semantics = ${semanticsTypes}

        const semantics = (primitives: Primitives): Semantics => ({${semantics}})
        export default semantics
          `
    await createFile(`${themePath}/semantics.ts`, semanticsFileContent)

    const componentAndSubcomponentNames = []
    //components
    for (const component of themeData[theme].components) {
      const rawComponentName = component.name
      // e.g. ['tabs', 'tabsPanel', 'tabsTab']
      const componentAndSubComponents = Object.keys(component.data)
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
          component.data[fullComponentName]
        )

        const componentTypes = generateComponentType(
          component.data[fullComponentName]
        )
        const usesSemantic = componentThemeVars.includes('semantics.')

        // SharedTokens have to be at the component level in the input data
        // because of Figma, but it should be one level higher for our purposes
        if (rawComponentName !== 'SharedTokens') {
          const componentFileContent = `

          ${usesSemantic ? "import type { Semantics} from '../semantics'" : ''}
          import type { ${capitalize(
            fullComponentName
          )} } from '../../componentTypes/${fullComponentName}'

          const ${fullComponentName} = (${
            usesSemantic ? 'semantics: Semantics' : ''
          }): ${capitalize(fullComponentName)} => ({${componentThemeVars}})
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

        import { SharedTokens } from '../commonTypes'
        import { Semantics } from "./semantics"

        const ${fullComponentName} = (semantics: Semantics): ${capitalize(
            fullComponentName
          )} => ({${componentThemeVars}})
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
      // TODO-theme-types: fix any
      const theme: any = {
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
          (
            componentName // TODO type better
          ) =>
            `${capitalize(componentName)}: (semantics: any) => ${capitalize(
              componentName
            )}`
        )
        .sort()
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

  export type BaseTheme<P = any, S = any> = {
    primitives: P
    semantics: (primitives: P) => S
    sharedTokens: (semantics: S) => SharedTokens
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
    console.log('[dprint]', stdout)
    if (stderr) {
      console.error('[dprint error]:', stderr)
    }
  } catch (error) {
    throw new Error('dprint: ' + error.message)
  }
}

export default setupThemes
