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
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
import path from 'path'
import React from 'react'
import pkgUtils from '@instructure/pkg-utils'
import { runCommandSync, resolveBin } from '@instructure/command-utils'

export default {
  command: 'test',
  desc: 'run tests',
  builder: (yargs) => {
    yargs.parserConfiguration({
      'boolean-negation': false
    })
    yargs.option('watch', { boolean: true, desc: '' })
    yargs.option('no-launch', { boolean: true, desc: '' })
    yargs.option('no-headless', { boolean: true, desc: '' })
    yargs.option('no-coverage', { boolean: true, desc: '' })
    yargs.option('randomize', { boolean: true, desc: '' })
    yargs.option('browsers', { desc: '' })
    yargs.option('scope', { string: true, desc: '' })
    yargs.option('path', { desc: '' })
    yargs.option('changed', { boolean: true, desc: '' })
    yargs.option('staged', { boolean: true, desc: '' })
    yargs.option('cached', { boolean: true, desc: '' })
    yargs.strictOptions(true)
  },
  handler: async (argv) => {
    const { OMIT_INSTUI_DEPRECATION_WARNINGS, USE_REACT_STRICT_MODE = '1' } =
      process.env

    const karmaArgs = ['start']

    let envVars = {
      NODE_ENV: 'test',
      REACT_VERSION: React.version,
      NODE_OPTIONS: '--max_old_space_size=120000'
    }
    if (USE_REACT_STRICT_MODE) {
      envVars = { ...envVars, USE_REACT_STRICT_MODE: USE_REACT_STRICT_MODE }
    }
    if (OMIT_INSTUI_DEPRECATION_WARNINGS) {
      envVars = { ...envVars, OMIT_INSTUI_DEPRECATION_WARNINGS: '1' }
    }

    if (!argv.watch) {
      const coverage = argv.noCoverage ? {} : { COVERAGE: '1' }
      envVars = {
        ...envVars,
        NO_DEBUG: '1',
        ...coverage
      }
    }

    if (argv.noLaunch) {
      karmaArgs.push('--no-launch')
    }

    if (argv.noHeadless) {
      karmaArgs.push('--no-headless')
    }

    if (argv.randomize) {
      karmaArgs.push('--randomize')
    }

    if (argv.browsers) {
      karmaArgs.push(`--browsers ${argv.browsers}`)
    }

    let paths = []

    if (argv.scope) {
      const allPackages = pkgUtils.getPackages()
      const scopes = argv.scope.split(',').map((scope) => scope.trim())
      const pkgs = allPackages.filter((pkg) => scopes.includes(pkg.name))
      if (pkgs.length >= 0) {
        paths = pkgs.map((pkg) => path.relative('.', pkg.location) + path.sep)
      }
    } else if (argv.path) {
      paths = argv.path.split(',').map((path) => path.trim())
    } else if (argv.changed) {
      const changedPackages = pkgUtils.getChangedPackages('HEAD^1', undefined)
      paths = changedPackages.map(
        (pkg) => path.relative('.', pkg.location) + path.sep
      )
    } else if (argv.staged) {
      const changedPackages = pkgUtils.getChangedPackages('--cached', undefined)
      paths = changedPackages.map(
        (pkg) => path.relative('.', pkg.location) + path.sep
      )
    }

    if (paths.length > 0) {
      envVars = { ...envVars, ...{ UI_TEST_SCOPE_PATHS: paths.join(',') } }
    }
    process.exit(runCommandSync(resolveBin('karma'), karmaArgs, envVars).status)
  }
}
