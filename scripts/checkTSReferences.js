#! /usr/bin/env node
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

/**
 * This simple script will check if there is any discrepancies between the listed instui related
 * dependencies of a given package and it's typescript references listed in the package's tsconfig.build.json config.
 *
 * If there is any it will print out the differences to the console and exits the current process with code 1.
 */
const path = require('path')
const chalk = require('chalk')
const fs = require('fs')
const referencesFile = path.resolve('./tsconfig.references.json')
const tsReferences = require(referencesFile).references

const packageDepsAndRefs = tsReferences.map((reference) => {
  const [, dir, package] = reference.path.split('/')
  const packageJson = require(path.resolve(`./${dir}/${package}/package.json`))
  const tsConfigJson = require(path.resolve(`${reference.path}`))
  const { devDependencies, dependencies } = packageJson

  const tsConfigReferencies = new Set(
    (tsConfigJson.references || []).map((obj) => {
      const [, package] = obj.path.split('/')

      return package
    })
  )

  const packageJsonDependencies = new Set(
    Object.entries({ ...dependencies, ...devDependencies })
      .filter(([depName]) => depName.includes('@instructure'))

      .map(([depName]) => {
        const [, package] = depName.split('/')

        return package
      })
      .filter((depName) => {
        // check if the dependent package is a ts package at all
        return fs.existsSync(
          path.resolve(`./packages/${depName}/tsconfig.build.json`)
        )
      })
  )

  return {
    package,
    packageDependencies: packageJsonDependencies,
    tsConfigReferencies
  }
})

const depsAndRefsWithDiff = packageDepsAndRefs.filter(
  ({ packageDependencies, tsConfigReferencies }) =>
    !equalSets(tsConfigReferencies, packageDependencies)
)

if (depsAndRefsWithDiff.length > 0) {
  for (let packageInfo of depsAndRefsWithDiff) {
    const { packageDependencies, tsConfigReferencies, package } = packageInfo

    console.warn(`\n Dependency mismatch in package: ${chalk.red(package)}!`)
    console.warn(
      `Please make sure the package.json 'dependencies' and 'devDependencies' entries and the tsconfig.build.json 'references' are synchronized!`
    )
    console.warn(
      'These are the dependencies for the package:\n',
      chalk.green([...packageDependencies])
    )
    console.warn(
      'And these are the project references listed in tsconfig.build.json:\n',
      chalk.blue([...tsConfigReferencies])
    )
    console.warn(
      'The difference is:\n',
      chalk.yellow([
        ...symmetricDifference(packageDependencies, tsConfigReferencies)
      ])
    )
  }
  process.exit(1)
}

process.exit(0)

function equalSets(setA, setB) {
  if (setA.size !== setB.size) return false

  for (let elem of setA) {
    if (!setB.has(elem)) return false
  }

  return true
}

function symmetricDifference(setA, setB) {
  const difference = new Set(setA)

  for (let elem of setB) {
    if (difference.has(elem)) {
      difference.delete(elem)
    } else {
      difference.add(elem)
    }
  }

  return difference
}
