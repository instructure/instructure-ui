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

const fse = require('fs-extra')
const path = require('path')
const styleDictionary = require('style-dictionary')
const { error } = require('@instructure/command-utils')

module.exports = async ({
  themeKey,
  sourcePath,
  styleDictionarySource,
  outputPath
}) => {
  return fse
    .outputFile(sourcePath, JSON.stringify(styleDictionarySource))
    .then(() => {
      const dictionary = styleDictionary.extend({
        source: [sourcePath],
        platforms: {
          scss: {
            transformGroup: 'scss',
            prefix: 'instui-' + themeKey,
            buildPath: path.join(outputPath, 'scss/'),
            files: [
              {
                destination: '_variables.scss',
                format: 'scss/variables'
              }
            ]
          },
          // TODO: Revisit the best way to distribute tokens for vanilla JS
          // js: {
          //   transformGroup: 'js',
          //   buildPath: path.join(outputPath, 'js/'),
          //   files: [
          //     {
          //       destination: 'umd.js',
          //       format: 'javascript/umd'
          //     },
          //     {
          //       destination: 'es6.js',
          //       format: 'javascript/es6'
          //     }
          //   ]
          // }
        }
      })

      dictionary.buildAllPlatforms()
    })
    .catch(e => error(e))
}
