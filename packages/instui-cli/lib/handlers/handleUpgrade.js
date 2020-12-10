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

const {
  info,
  error,
  confirm,
  runCommandSync
} = require('@instructure/command-utils')
const verifyPackageJson = require('@instructure/ui-upgrade-scripts/lib/utils/verify-package-json')
const checkDependencies = require('@instructure/ui-upgrade-scripts/lib/utils/check-dependencies')

const handleExecuteCodemods = require('./handleExecuteCodemods')
const handleUpgradePackages = require('./handleUpgradePackages')

const {
  getRemovedPackageList,
  getPackageList
} = require('../utils/getPackageLists')

module.exports = async ({
  sourcePath,
  scopeModifications,
  version,
  ignore,
  ignoreWorkspaceRootCheck,
  npmClient,
  parser,
  parserConfig
}) => {
  verifyPackageJson({ sourcePath })

  await handleExecuteCodemods({
    sourcePath,
    scopeModifications,
    version,
    ignore,
    parser,
    parserConfig
  })

  info('Auditing Instructure UI dependencies...')
  const { missing, unused } = await checkInstuiDependencies({
    sourcePath,
    version
  })

  // Remove any unused instructure ui packages
  await executeRemoveUnusedPackages({
    unusedPackages: unused,
    sourcePath,
    ignoreWorkspaceRootCheck,
    npmClient
  })

  // Upgrade instructure ui packages that are still in the project to the latest
  handleUpgradePackages({
    sourcePath,
    version,
    ignoreWorkspaceRootCheck,
    npmClient
  })

  // Add any missing packages that were not listed in the project deps
  await executeAddMissingPackages({
    missingPackages: missing,
    version,
    sourcePath,
    ignoreWorkspaceRootCheck,
    npmClient
  })
}

const checkInstuiDependencies = async ({ sourcePath, version }) => {
  const packages = getPackageList({ version })
  const removedPackages = getRemovedPackageList({ version })

  const checkedDependencies = await checkDependencies({ sourcePath }).catch(
    (err) => {
      error(err)
      process.exit(1)
    }
  )

  const { dependencies, devDependencies, missing } = checkedDependencies || {}

  return {
    missing: Object.keys(missing || {}).filter((dep) => packages.includes(dep)),
    unused: [
      ...(dependencies || []),
      ...(devDependencies || [])
    ].filter((dep) => removedPackages.includes(dep))
  }
}

const executeRemoveUnusedPackages = async ({
  unusedPackages,
  sourcePath,
  ignoreWorkspaceRootCheck,
  npmClient
}) => {
  if (!unusedPackages || unusedPackages.length === 0) return

  const reply = await confirm(
    `After updating your imports, the following Instructure UI dependencies have been detected in your project but are not being used:
${unusedPackages.map((pkg) => `  *  ${pkg}`).join('\n')}

Would you like this script to remove them from your project now? [y/n]
`
  )

  if (['Y', 'y', 'Yes', 'yes'].includes(reply.trim())) {
    try {
      if (npmClient === 'yarn') {
        const yarnRemoveArgs = [
          'remove',
          ...unusedPackages,
          '--cwd',
          sourcePath
        ]

        if (ignoreWorkspaceRootCheck) {
          yarnRemoveArgs.push('--ignore-workspace-root-check')
        }

        runCommandSync('yarn', yarnRemoveArgs)
      } else if (npmClient === 'npm') {
        runCommandSync('npm', [
          'uninstall',
          '--prefix',
          sourcePath,
          ...unusedPackages
        ])
      }
    } catch (err) {
      error(err)
    }
  }
}

const executeAddMissingPackages = async ({
  missingPackages,
  version,
  sourcePath,
  ignoreWorkspaceRootCheck,
  npmClient
}) => {
  if (!missingPackages || missingPackages.length === 0) return

  const reply = await confirm(
    `After updating your imports, the following Instructure UI packages are being used in your project but are not listed in your dependencies:
${missingPackages.map((pkg) => `  *  ${pkg}`).join('\n')}

Would you like this script to add them to your project now? [y/n]
`
  )

  if (['Y', 'y', 'Yes', 'yes'].includes(reply.trim())) {
    try {
      const packages = missingPackages.map(
        (pkg) => `${pkg}@${version || 'latest'}`
      )

      if (npmClient === 'yarn') {
        const yarnAddArgs = ['add', ...packages, '--cwd', sourcePath]

        if (ignoreWorkspaceRootCheck) {
          yarnAddArgs.push('--ignore-workspace-root-check')
        }

        runCommandSync('yarn', yarnAddArgs)
      } else if (npmClient === 'npm') {
        runCommandSync('npm', ['install', '--prefix', sourcePath, ...packages])
      }
    } catch (err) {
      error(err)
    }
  }
}
