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
const path = require('path')
const fs = require('fs')

// Generate aliases for all @instructure/* workspace packages
// This is needed because Cypress tests run from the root workspace
// and need to resolve workspace package imports during testing
function getWorkspaceAliases() {
  const packagesDir = path.resolve(__dirname, '../packages')
  const packages = fs.readdirSync(packagesDir)
  const aliases = {}

  packages.forEach((pkg) => {
    const pkgPath = path.join(packagesDir, pkg)
    if (fs.statSync(pkgPath).isDirectory()) {
      const pkgJsonPath = path.join(pkgPath, 'package.json')
      if (fs.existsSync(pkgJsonPath)) {
        const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf8'))
        const pkgName = pkgJson.name
        if (pkgName && pkgName.startsWith('@instructure/')) {
          // Alias subpath exports (e.g., './latest', './v11_6') to source files.
          // This is needed because the base alias below overrides package.json
          // exports resolution, so we must handle subpaths explicitly.
          if (pkgJson.exports) {
            Object.entries(pkgJson.exports).forEach(([subpath, target]) => {
              if (subpath.includes('*')) return
              const importPath = (typeof target === 'object' ? target.import : target) || ''
              // Map built output path (./es/X.js) back to source (./src/X.ts)
              const srcPath = importPath.replace(/^\.\/es\//, './src/').replace(/\.js$/, '.ts')
              const resolved = path.join(pkgPath, srcPath)
              if (fs.existsSync(resolved)) {
                if (subpath === '.') {
                  // Root export: alias the package name directly to the source entry
                  aliases[`${pkgName}$`] = resolved
                } else {
                  aliases[`${pkgName}/${subpath.replace(/^\.\//, '')}`] = resolved
                }
              }
            })
          }
          // Fallback: alias package name to its directory (for non-exports packages)
          if (!aliases[`${pkgName}$`]) {
            aliases[pkgName] = pkgPath
          }
          // Also alias deep imports (e.g., '@instructure/ui-button/src/...')
          aliases[`${pkgName}/src`] = path.join(pkgPath, 'src')
        }
      }
    }
  })

  return aliases
}

module.exports = {
  mode: 'development',
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: getWorkspaceAliases(),
    fallback: {
      fs: false,
      module: false,
      path: false,
      process: false
    }
  },
  module: {
    rules: [
      {
        test: /\.(tsx?|js)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  }
}
