const path = require('path')
const pkg = require('../../package.json')

const projectRoot = path.resolve(__dirname, '../../')

module.exports = {
  projectRoot,
  title: `${pkg.name} : ${pkg.description} (${pkg.version})`,
  favicon: path.resolve(projectRoot, 'logo.png'),
  library: {
    name: pkg.name,
    version: pkg.version,
    repository: pkg.repository.url,
    author: pkg.author,
    packages: 'packages',
    scope: '@instructure',
    codepen: {
      // codepen button form data (https://blog.codepen.io/documentation/api/prefill/)
      // this is usually whatever webpack entries you've defined
      js_external: [
        `${pkg.homepage}common.js`,
        `${pkg.homepage}instructure-ui.js`,
        `${pkg.homepage}globals.js`
      ].join(';')
    }
  },
  files: [
    path.resolve(projectRoot, 'CHANGELOG.md'),
    path.resolve(projectRoot, 'packages/ui-core/src/components/*/**/index.js'),
    path.resolve(projectRoot, 'packages/ui-core/src/utils/**/*.js'),
    path.resolve(projectRoot, 'packages/ui-themeable/src/**/*.js'),
    path.resolve(projectRoot, 'packages/ui-utils/src/**/*.js'),
    path.resolve(projectRoot, 'packages/*/README.md'),
    path.resolve(projectRoot, 'packages/*/docs/**/*.md')
  ],
  ignore: [
    path.resolve(projectRoot, '**/node_modules/**'),
    path.resolve(projectRoot, '**/__tests__/**'),
    path.resolve(projectRoot, '**/__docs__/**'),
    path.resolve(projectRoot, '**/config/**'),
    path.resolve(projectRoot, '**/src/index.js'),
    path.resolve(projectRoot, 'packages/ui-utils/src/{react,dom,i18n}/index.js'),
    path.resolve(projectRoot, '**/theme.js')
  ],
  template: path.resolve(__dirname, 'index.tmpl.html')
}
