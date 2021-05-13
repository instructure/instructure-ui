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

import { warn } from '@instructure/command-utils'
import { handleCreateComponent } from '../handlers'

export default {
  command: 'create-component',
  desc: 'Generate a component within a new package or within an existing package. (Note: This command has been moved to `@instructure/ui-template-scripts`)',
  builder: (yargs: any) => {
    yargs.option('template', {
      alias: 't',
      type: 'string',
      describe: 'The path to the template file or directory for the component.',
      demandOption: true
    })

    yargs.option('path', {
      alias: 'p',
      type: 'string',
      describe:
        'The path where the generated component will be located. If the path is to a monorepo containing packages, optionally suggests packages to choose from where the component will be created.'
    })

    yargs.option('package-source', {
      alias: 'packageSource',
      type: 'string',
      describe:
        'The directory containing the package source code if the component is going to be created within an existing package.',
      default: 'src'
    })

    yargs.option('name', {
      alias: 'n',
      type: 'string',
      describe: 'The name of the component (in PascalCase, e.g. NumberInput).',
      demandOption: true
    })

    yargs.option('values', {
      type: 'string',
      describe:
        'A JSON string mapping variable names to values which will be used to replace variables in the template component. Ex. \'{"NAME":"MyComponent","VERSION":"12.0.0"}\'.',
      default: '{}'
    })
  },
  handler: async (argv: any) => {
    const { template, path, packageSource, name, values } = argv

    warn(
      'This command has now been moved to `@instructure/ui-template-scripts`.'
    )

    handleCreateComponent({
      componentTemplate: template,
      path,
      packageSource,
      name,
      values
    })
  }
}
