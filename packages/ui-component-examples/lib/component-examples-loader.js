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

const path = require('path')
const fs = require('fs')
const loaderUtils = require('loader-utils')
const loadConfig = require('@instructure/config-loader')

const parsePropValues = require('./parsePropValues')
/**
 * A webpack loader that processes component example files for e.g. Storybook
 * for more see https://webpack.js.org/api/loaders/
 */
module.exports = function componentExamplesLoader(source, map, meta) {
  this.cacheable && this.cacheable()

  const callback = this.async()
  const config = {
    maxExamples: 500,
    ...loadConfig('examples', {})
  }

  const generateComponentExamples = require.resolve(
    './generateComponentExamples'
  )

  // TODO do not use this method, its an internal webpack feature. See
  // https://github.com/webpack/loader-utils/issues/42
  const configPath = `!!${loaderUtils.getRemainingRequest(this)}`

  const getComponentPath =
    typeof config.getComponentPath === 'function'
      ? config.getComponentPath
      : (configFilePath) => {
          const basePath = path.dirname(configFilePath)
          // try to determine component source based on where the .examples file is:
          return path.resolve(
            basePath,
            configFilePath.includes('__examples__')
              ? '../index.tsx'
              : './index.tsx'
          )
        }

  const componentPath = getComponentPath(this.resourcePath)

  fs.readFile(
    `${componentPath}${!componentPath.includes('.') ? '.tsx' : ''}`,
    'utf8',
    (err, componentSrc) => {
      err && this.emitWarning(err)
      let generatedPropValues = {}
      if (!err) {
        this.addDependency(componentPath)
        try {
          generatedPropValues = parsePropValues(componentSrc, componentPath)
        } catch (error) {
          this.emitWarning(error)
        }
      }
      const result = `
const generateComponentExamples = require(${JSON.stringify(
        generateComponentExamples
      )})
const config = require(${JSON.stringify(configPath)}).default

// merge in generated prop values:
config.propValues = Object.assign(
  ${JSON.stringify(generatedPropValues)},
  config.propValues || {}
)
const Component = require(${JSON.stringify(componentPath)}).default

config.maxExamples = Boolean(config.maxExamples) ? config.maxExamples : ${
        config.maxExamples
      }

module.exports = {
 componentName: Component.displayName || Component.name,
 sections: generateComponentExamples(Component, config)
}`
      return callback(null, result, map)
    }
  )
}
