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

import fs from 'fs'
import createFile from './createFile.js'
import { generatePrimitives, generateType } from './generatePrimitives.js'
import generateSemantics, {
  generateSemanticsType,
  mergeSemanticSets
} from './generateSemantics.js'
import generateComponent, {
  generateComponentType
} from './generateComponents.js'
// transform to an object for easier handling
export const transformThemes = (themes) =>
  themes.reduce((acc, theme) => {
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

const setupThemes = (targetPath, rawInput) => {
  const input = JSON.parse(rawInput.toString())
  const themeData = transformThemes(input['$themes'])
  // console.log(themeData)
  Object.keys(themeData).forEach((theme, themeIndex) => {
    const themePath = `${targetPath}/${theme}`
    fs.rmSync(themePath, { recursive: true, force: true })
    fs.mkdirSync(themePath, { recursive: true })

    // primitives
    const primitives = generatePrimitives(input[themeData[theme].primitives])
    const primitiveTypes = generateType(primitives)

    const primitivesFileContent = `
          export type Primitives = ${primitiveTypes}

          const primitives: Primitives = ${JSON.stringify(primitives)}
          export default primitives
          `

    createFile(`${themePath}/primitives.ts`, primitivesFileContent)

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
    createFile(`${themePath}/semantics.ts`, semanticsFileContent)

    //components
    themeData[theme].components.forEach((componentpath) => {
      const rawComponentName = componentpath.split('/')[componentpath.split('/').length - 1]
      const componentName =rawComponentName[0].toLowerCase() + rawComponentName.slice(1)

      const component = generateComponent(input[componentpath][componentName])
      const componentTypes = generateComponentType(
        input[componentpath][componentName]
      )

      const componentFileContent = `
        import semantics from "../semantics.js"
        import type { ${capitalize(componentName)} } from '../../componentTypes/${componentName}.js'

        const ${componentName}: ${capitalize(componentName)} = {${component}}
        export default ${componentName}
          `

      createFile(
        `${themePath}/components/${componentName}.ts`,
        componentFileContent
      )
      if(themeIndex===0){
        const typeFileContent = `
          import type { Semantics } from "../${theme}/semantics"

          export type ${capitalize(componentName)} = ${componentTypes}

          export default ${capitalize(componentName)}
        `
          createFile(
          `${targetPath}/componentTypes/${componentName}.ts`,
          typeFileContent
        )
      }
    })

    //index file
    const componentImports = themeData[theme].components
      .map((componentpath) => {
        const componentName =
          componentpath.split('/')[componentpath.split('/').length - 1]

        return `import ${unCapitalize(componentName)} from "./components/${unCapitalize(componentName)}"\n
        import type ${capitalize(componentName)} from "../componentTypes/${unCapitalize(componentName)}"`
      })
      .join('\n')

    const componentTypes = themeData[theme].components
      .map((componentpath) => {
        const componentName =
          componentpath.split('/')[componentpath.split('/').length - 1]

        return `${componentName}: ${capitalize(componentName)}`
      })
      .join('\n')
    const componentNames = themeData[theme].components
      .map(
        (componentpath) =>{
          const componentName=componentpath.split('/')[componentpath.split('/').length - 1]
          return `${componentName}: ${unCapitalize(componentName)}`
        }

      )
      .join(',\n')
    const indexFileContent = `
      import primitives, {type Primitives} from "./primitives";
      import semantics, {type Semantics} from "./semantics";
      ${componentImports}

      export type Theme={
        primitives: Primitives
        semantics: Semantics
        components: {
          ${componentTypes}
        }
      }


      const theme = {
        primitives,
        semantics,
        components: {
          ${componentNames}
        },
      };

      export default theme
      `
    createFile(`${themePath}/index.ts`, indexFileContent)

    //index type file
    if(themeIndex===0){
      const componentTypeImports = themeData[theme].components
          .map((componentpath) => {
            const componentName =
              componentpath.split('/')[componentpath.split('/').length - 1]


            return `import type ${capitalize(componentName)} from './${unCapitalize(componentName)}'`
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
          type Theme = {
          ${componentTypeExport} \n
          }

          export default Theme
        `
        createFile(
            `${targetPath}/componentTypes/index.ts`,
            componentsTypesFileContent
          )
    }
  })


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
  createFile(`${targetPath}/index.ts`, exportIndexFileContent)
}

export default setupThemes
