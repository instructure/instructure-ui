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

const outputName = 'prop-data.json'
// eslint-disable-next-line no-console
console.log('starting to build example prop combinations to ' + outputName)

const path = require('path')
const fs = require('fs')
const globby = require('globby')
const parsePropValues = require('./parsePropValues')
const { getTransitiveDependents } = require('./getTransitiveDependents')

const projectRoot = path.resolve(__dirname, '../../')
const packages = process.argv.slice(2)

async function buildExamplesJSON(packagesToBuild = []) {
  const packages = packagesToBuild.length
    ? await getTransitiveDependents(packagesToBuild)
    : ['**']
  const files = packages.map((package) =>
    path.resolve(projectRoot, `${package}/src/**/*.examples.ts*`)
  )

  const ignorePaths = ['**/node_modules/**', '**/lib/**', '**/es/**']
  const ignore = ignorePaths.map(
    (file) => '!' + path.resolve(projectRoot, file)
  )

  const matches = await globby([...files, ...ignore])
  const componentProps = matches.reduce((result, absoluteExampleFilePath) => {
    // path to the component that is tested, e.g. /ui-tag/src/Tag/index.js
    const componentPath = path.resolve(
      path.dirname(absoluteExampleFilePath),
      '../index.tsx'
    )
    const componentFilePathParts = componentPath.split('/')
    const exampleFilePathParts = absoluteExampleFilePath.split('/')
    const [packageName] = componentFilePathParts.filter((path) =>
      path.startsWith('ui-')
    )

    const componentSource = fs.readFileSync(componentPath)
    // contains all the prop values and its variants
    const generatedPropValues = parsePropValues(componentSource, componentPath)
    const packageIndex = exampleFilePathParts.findIndex(
      (value) => value === packageName
    )
    const exampleFilePath = exampleFilePathParts.slice(packageIndex).join('/')
    const componentName =
      componentFilePathParts[componentFilePathParts.length - 2]

    return {
      ...result,
      [componentName]: {
        generatedPropValues,
        exampleFilePath
      }
    }
  }, {})

  const everything = JSON.stringify(componentProps)

  fs.writeFileSync(outputName, everything)

  // eslint-disable-next-line no-console
  console.log('finished generating example prop combinations.')
}

buildExamplesJSON(packages)
