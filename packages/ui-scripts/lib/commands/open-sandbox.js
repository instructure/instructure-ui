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

const { handleOpenSandbox } = require('../handlers')

exports.command = 'open-sandbox'
exports.desc = 'Open a GitHub project in codesandbox.'

exports.builder = (yargs) => {
  yargs.option('branch', {
    alias: 'b',
    type: 'string',
    describe: 'The branch within the GitHub repository.',
    default: 'master'
  })

  yargs.option('remote', {
    alias: 'r',
    type: 'string',
    describe:
      'The specified remote that will be used to find the GitHub repository.',
    default: 'origin'
  })

  yargs.option('path', {
    alias: 'p',
    type: 'string',
    describe:
      'A relative path from the root of the GitHub repository to the project that will be opened.',
    default: ''
  })

  yargs.option('scope', {
    type: 'string',
    describe:
      'The name of the child app. When this argument is present, it is assumed you are using a monorepo managed by lerna and the child app is opened in codesandbox.'
  })
}

exports.handler = (argv) => {
  const { branch, remote, path, scope } = argv

  handleOpenSandbox({ branch, remote, path, scope })
}
