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
const loaderUtils = require('loader-utils')
const path = require('path')
const fs = require('fs')
const globby = require('globby')
const loadConfig = require('@instructure/config-loader')
const reactDocgen = require('react-docgen')

module.exports = function (source, map) {
  this.cacheable && this.cacheable()

  const loader = this
  const callback = this.async()

  const options = Object.assign({}, loadConfig('examples-loader'), loaderUtils.getOptions(this))

  const files = options.files || ['**/examples.json']
  const ignore = (options.ignore || []).concat(['**/node_modules/**'])
  const cwd = options.cwd || process.cwd()
  const parseExampleNameFromPath = options.parseExampleNameFromPath || function (filePath) {
    return path.basename(path.dirname(filePath))
  }

  globby(files, { ignore, cwd })
    .then((matches) => {
      const generateExample = (match) => {
        const configPath = path.join(cwd, match)
        const config = require(configPath)
        const basePath = path.dirname(configPath)

        const examplesConfigPath = config.configPath ? path.resolve(basePath, config.configPath) : null
        const componentPath = path.resolve(basePath, config.componentPath || (function () {
          const fallback = 'index.js'
          loader.emitWarning(
            new Error(`Expected property 'componentPath' was not supplied in configuration file at '${basePath}' Attempting to use ${fallback} instead.`)
          )
          return fallback
        }()))

        let parsedSrc
        try {
          parsedSrc = reactDocgen.parse(
            fs.readFileSync(`${componentPath}${!componentPath.includes('.') ? '.js' : ''}`, 'utf8'),
            null,
            null,
            {legacyDecorators: true}
          )
        } catch (error) {
          loader.emitWarning(error)
        }

        return `
          examples.push({
            displayName: '${config.name || parseExampleNameFromPath(componentPath)}',
            ${examplesConfigPath ? `config: require('${examplesConfigPath}').default,` : ''}
            component: require('${componentPath}').default,
            props: ${JSON.stringify(parsePropsFromSource(parsedSrc))}
          })
        `
      }

      const result = `
        module.exports = (function () {
          const examples = []

          ${matches.map((match) => {
            return generateExample(match)
          }).join('\n')}

          return examples
        }())
      `
      callback(null, `${result}`, map)
    }).catch((error) => {
      callback(error)
    })
}

const parsePropsFromSource = (parsedSrc) => {
  const props = {}

  if (parsedSrc && parsedSrc.props) {
    const parsedProps = parsedSrc.props

    Object.keys(parsedProps).forEach((key) => {
      const prop = parsedProps[key]

      if (!(prop && prop.type)) {
        return
      }

      const { name, value } = prop.type

      if (name === 'enum') {
        props[key] = value.map((entry) => {
          const result = entry.value.replace(/['"]+/g, '')
          return result === 'null' ? null : result
        })
        return
      }

      if (name === 'bool') {
        props[key] = [false, true]
        return
      }
    })
  }

  return props
}
