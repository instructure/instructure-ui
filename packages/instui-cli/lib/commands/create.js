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

const { handleCreate } = require('../handlers')

exports.command = 'create'
exports.desc =
  'Create content generated from Instructure UI template packages. DEPRECATED, this will be deleted in InstUI 9'

exports.builder = (yargs) => {
  const generatePathOption = ({ yargs, contentType }) => {
    yargs.option('path', {
      alias: 'p',
      describe: `The path where the ${contentType} source will be generated.`
    })
  }

  const generateNameOption = ({
    yargs,
    contentType,
    formatInstructions = ''
  } = {}) => {
    yargs.option('name', {
      alias: 'n',
      describe: `The name of the ${contentType}${formatInstructions}.`
    })
  }

  const packageCommand = 'package'
  const packageFormatInstructions = ' (in kebab-case, e.g. my-package)'
  yargs.command(
    packageCommand,
    'Create an Instructure UI package. FOR INTERNAL USE ONLY!',
    (yargs) => {
      const options = { yargs, contentType: packageCommand }
      generatePathOption(options)
      generateNameOption({
        ...options,
        formatInstructions: packageFormatInstructions
      })
    },
    async (argv) => {
      const { name, path } = argv
      handleCreate({
        contentType: packageCommand,
        path,
        name,
        formatInstructions: packageFormatInstructions
      })
    }
  )

  const componentCommand = 'component'
  const componentFormatInstructions = ' (in PascalCase, e.g. NumberInput)'
  yargs.command(
    componentCommand,
    'Create an Instructure UI component. FOR INTERNAL USE ONLY!',
    (yargs) => {
      const options = { yargs, contentType: componentCommand }
      generatePathOption(options)
      generateNameOption({
        ...options,
        formatInstructions: componentFormatInstructions
      })
    },
    async (argv) => {
      const { name, path } = argv
      handleCreate({
        contentType: componentCommand,
        path,
        name,
        formatInstructions: componentFormatInstructions
      })
    }
  )
}
