/* eslint no-var: 0 */
var path = require('path')
var PROJECT_ROOT = path.resolve(__dirname)

var PATHS = {
  root: PROJECT_ROOT + '/',
  docsRoot: PROJECT_ROOT + '/docs',
  docsApp: PROJECT_ROOT + '/docs/app',
  build: PROJECT_ROOT + '/__build__',
  docsBuild: PROJECT_ROOT + '/__docs__',
  distBuild: PROJECT_ROOT + '/__dist__',
  libRoot: PROJECT_ROOT + '/lib',
  libComponents: PROJECT_ROOT + '/lib/components',
  templatesRoot: PROJECT_ROOT + '/templates'
}

module.exports = PATHS
