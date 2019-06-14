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

const { confirm } = require('@instructure/command-utils')
const { handleCreate } = require('../handlers')

exports.command = 'create'
exports.desc = 'Create content generated from Instructure UI template packages.'

exports.builder = (yargs) => {
  const generateCreateCommandArgs = ({ contentType, desc }) => [
    contentType,
    desc,
    (yargs) => {
      yargs.option('path', {
        alias: 'p',
        describe: `The path where the ${contentType} source will be generated.`,
      })

      yargs.option('name', {
        alias: 'n',
        describe: `The name of the ${contentType}.`
      })
    },
    async (argv) => {
      let { name, path } = argv

      if (!path && contentType === 'app') {
        path = process.cwd()
      }

      if (!name) {
        name = await confirm(`Please enter a name for the ${contentType}: `)
      }

      handleCreate({ contentType, path, name })
    }
  ]

  yargs.command(...generateCreateCommandArgs({
    contentType: 'app',
    desc: 'Create a starter app with all Instructure UI presets configured (webpack, babel, etc). Similar to create react app.'
  }))

  yargs.command(...generateCreateCommandArgs({
    contentType: 'package',
    desc: 'Create an Instructure UI package.'
  }))
}
