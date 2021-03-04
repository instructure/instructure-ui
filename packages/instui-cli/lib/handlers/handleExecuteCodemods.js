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

const yargsInteractive = require('yargs-interactive')
const semver = require('semver')

const { info, error } = require('@instructure/command-utils')
const executeCodemod = require('@instructure/ui-upgrade-scripts/lib/utils/execute-codemod')

const getInstuiConfigPaths = require('../utils/getInstuiConfigPaths')
const getParserConfigPath = require('../utils/getParserConfigPath')

async function promptImportMigration({ version } = {}) {
  // If no version is specified, they are looking to get on the latest, so prompt them in that case as well
  if (!version || semver.satisfies(semver.coerce(version), '^7')) {
    const importMigrationOptions = [
      'Migrate all component imports to `@instructure/ui`',
      "Migrate each component import to it's individual package"
    ]

    const migrationDescription = `From Instructure UI 7.0, each component now has it's own package (Avatar is now in @instructure/ui-avatar, Modal is now in @instructure/ui-modal etc). As an alternative to having to deal with all these package names in your codebase, we also provide a meta package that exports all components called @instructure/ui.

  These codemods can migrate your Instructure UI component imports to either option. Choose which one you prefer:`

    const importMigrationOption = (
      await yargsInteractive()
        .version(false)
        .interactive({
          interactive: { default: true },
          importMigrationOption: {
            type: 'list',
            describe: migrationDescription,
            choices: importMigrationOptions
          }
        })
    ).importMigrationOption

    return importMigrationOptions[0] === importMigrationOption
  } else {
    return false
  }
}

module.exports = async ({
  sourcePath,
  scopeModifications,
  version,
  ignore,
  parser,
  parserConfig
}) => {
  if (scopeModifications.includes('imports')) {
    const isMetaComponentPackageMigration = await promptImportMigration({
      version
    })

    executeCodemods({
      sourcePath,
      codemodName: 'updateImports.js',
      configPaths: getInstuiConfigPaths({
        type: 'codemod-configs',
        name: 'imports.config.js',
        version
      }),
      ignore,
      parser,
      parserConfig,
      isMetaComponentPackageMigration
    })
  }

  if (scopeModifications.includes('props')) {
    executeCodemods({
      sourcePath,
      codemodName: 'updatePropNames.js',
      configPaths: getInstuiConfigPaths({
        type: 'codemod-configs',
        name: 'propNames.config.json',
        version
      }),
      ignore,
      parser,
      parserConfig
    })
  }

  return
}

const executeCodemods = ({
  sourcePath,
  configPaths,
  codemodName,
  ignore,
  parser,
  parserConfig,
  isMetaComponentPackageMigration
}) => {
  try {
    info(`Applying codemods to ${sourcePath}\n`)

    const codemodPath = require.resolve(
      `@instructure/ui-codemods/lib/${codemodName}`
    )

    for (const configPath of configPaths) {
      executeCodemod({
        sourcePath,
        codemodPath,
        configPath,
        ignore,
        parser,
        parserConfig: parserConfig || getParserConfigPath(),
        isMetaComponentPackageMigration
      })
    }
  } catch (err) {
    error(err)
    process.exit(1)
  }
}
