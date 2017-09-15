const path = require('path')

module.exports = {
  testEnvironment: 'node',
  collectCoverage: true,
  collectCoverageFrom: ['lib/**/*.js'],
  coverageDirectory: path.join(__dirname, '../../coverage/ui-codemods'),
  coverageReporters: ['lcov']
}
