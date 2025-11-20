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

const setupThemes = async (targetPath, input) => {
  //clear old themes
  await promises.rm(targetPath, { recursive: true, force: true })
  //make new root folder
  await promises.mkdir(targetPath, { recursive: true })

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
    // console.log(JSON.stringify(mergedSemanticData));
    const semantics = generateSemantics(mergedSemanticData)
    const semanticsTypes = generateSemanticsType(mergedSemanticData)
    const semanticsFileContent = `
        import primitives from "./primitives.js"
        import type {Primitives} from "./primitives.js"

        export type Semantics = ${semanticsTypes}

        const semantics: Semantics = {${semantics}}
        export default semantics
          `
    await createFile(`${themePath}/semantics.ts`, semanticsFileContent)

    //components
    for (const componentpath of themeData[theme].components) {
      const rawComponentName =
        componentpath.split('/')[componentpath.split('/').length - 1]
      const componentName =
        rawComponentName[0].toLowerCase() + rawComponentName.slice(1)

      const component = generateComponent(input[componentpath][componentName])
      const componentTypes = generateComponentType(
        input[componentpath][componentName]
      )

      const componentFileContent = `
        import semantics from "../semantics.js"
        import type { ${capitalize(
          componentName
        )} } from '../../componentTypes/${componentName}.js'

        const ${componentName}: ${capitalize(componentName)} = {${component}}
        export default ${componentName}
          `

      await createFile(
        `${themePath}/components/${componentName}.ts`,
        componentFileContent
      )
      if (themeIndex === 0) {
        let importSemantics = ''
        if (componentTypes.includes(`Semantics[`)) {
          importSemantics = `import type { Semantics } from "../${theme}/semantics"`
        }
        let importBoxShadow = ''
        if (componentTypes.includes('TokenBoxshadowValueInst')) {
          importBoxShadow = `import type { TokenBoxshadowValueInst } from '../commonTypes'`
        }
        let importBorder = ''
        if (componentTypes.includes('TokenBorderValue')) {
          importBorder = `import type { TokenBorderValue } from '@tokens-studio/types'`
        }
        let importTypography = ''
        if (componentTypes.includes('TokenTypographyValueInst')) {
          importTypography = `import type { TokenTypographyValueInst } from '../commonTypes'`
        }
        const typeFileContent = `
          ${importSemantics}
          ${importBoxShadow}
          ${importBorder}
          ${importTypography}

          export type ${capitalize(componentName)} = ${componentTypes}

          export default ${capitalize(componentName)}
        `
        await createFile(
          `${targetPath}/componentTypes/${componentName}.ts`,
          typeFileContent
        )
      }
    }

    //index file
    const componentImports = themeData[theme].components
      .map((componentpath) => {
        const componentName =
          componentpath.split('/')[componentpath.split('/').length - 1]

        return `import ${unCapitalize(
          componentName
        )} from "./components/${unCapitalize(componentName)}"`
      })
      .join('\n')
    const componentNames = themeData[theme].components
      .map((componentpath) => {
        const componentName =
          componentpath.split('/')[componentpath.split('/').length - 1]
        return `${componentName}: ${unCapitalize(componentName)}`
      })
      .join(',\n')
    const indexFileContent = `
      import primitives, {type Primitives} from "./primitives";
      import semantics, {type Semantics} from "./semantics";
      import type { BaseTheme } from '../commonTypes';
      ${componentImports}

      export type Theme = BaseTheme<Primitives, Semantics>

      const theme: Theme = {
        primitives,
        semantics,
        components: {
          ${componentNames}
        },
      };

      export default theme
      `
    await createFile(`${themePath}/index.ts`, indexFileContent)

    //index type file
    if (themeIndex === 0) {
      const componentTypeImports = themeData[theme].components
        .map((componentpath) => {
          const componentName =
            componentpath.split('/')[componentpath.split('/').length - 1]

          return `import type ${capitalize(
            componentName
          )} from './${unCapitalize(componentName)}'`
        })
        .join('\n')
      const componentTypeExport = themeData[theme].components
        .map((componentpath) => {
          const componentName =
            componentpath.split('/')[componentpath.split('/').length - 1]

          return `${capitalize(componentName)}:${capitalize(componentName)}`
        })
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

export type BaseTheme<P extends Record<string, any> = Record<string, any>, S extends Record<string, any> = Record<string, any>> = {
    primitives: P
    semantics: S
    components: ComponentTypes
  }`
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
