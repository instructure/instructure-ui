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

const { warn } = require('@instructure/command-utils')
const { handleCreatePackage } = require('../handlers')

exports.command = 'create-package'
exports.desc =
  'Generate a package from a template. (Note: This command has been moved to `@instructure/ui-template-scripts`)'

exports.builder = (yargs) => {
  yargs.option('template', {
    alias: 't',
    type: 'string',
    describe: 'The path to the template file or directory.',
    demandOption: true
  })

  yargs.option('path', {
    alias: 'p',
    type: 'string',
    describe:
      "The path where the generated package will be located. If no path is provided, prompts for selection of workspace defined in the current working directory's package.json. If no workspaces are defined, defaults to the current working directory."
  })

  yargs.option('name', {
    alias: 'n',
    type: 'string',
    describe: 'The name of the generated package.',
    demandOption: true
  })

  yargs.option('values', {
    type: 'string',
    describe:
      'A JSON string mapping variable names to values which will be used to replace variables in the template package. Ex. \'{"NAME":"my-package","VERSION":"12.0.0"}\'.',
    default: '{}'
  })
}

exports.handler = async (argv) => {
  const { template, path, name, values } = argv

  warn('This command has now been moved to `@instructure/ui-template-scripts`.')

  handleCreatePackage({ template, path, name, values })
}
