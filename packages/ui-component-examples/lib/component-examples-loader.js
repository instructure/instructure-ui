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

module.exports = function componentExamplesLoader(source, map, meta) {
  this.cacheable && this.cacheable()

  const loader = this
  const callback = loader.async()

  const config = {
    maxExamples: 500,
    ...loadConfig('examples', {})
  }

  const generateComponentExamples = require.resolve(
    './generateComponentExamples'
  )
  const configPath = `!!${loaderUtils.getRemainingRequest(loader)}`

  const getComponentPath =
    typeof config.getComponentPath === 'function'
      ? config.getComponentPath
      : (configFilePath) => {
          const basePath = path.dirname(configFilePath)
          // try to determine component source based on where the .examples file is:
          return path.resolve(
            basePath,
            configFilePath.includes('__examples__')
              ? '../index.js'
              : './index.js'
          )
        }

  const componentPath = getComponentPath(this.resourcePath)

  fs.readFile(
    `${componentPath}${!componentPath.includes('.') ? '.js' : ''}`,
    'utf8',
    (err, componentSrc) => {
      err && loader.emitWarning(err)
      let generatedPropValues = {}
      if (!err) {
        loader.addDependency(componentPath)
        try {
          generatedPropValues = parsePropValues(componentSrc)
        } catch (error) {
          loader.emitWarning(error)
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
