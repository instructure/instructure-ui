const path = require('path')
const defineTest = require('jscodeshift/dist/testUtils').defineTest

const tests = ['imports']

jest.autoMockOff()

describe('updateImports', () => {
  tests.forEach(test => {
    defineTest(
      __dirname,
      'lib/updateImports',
      {
        config: path.join(__dirname, '../__testfixtures__/imports.config.js')
      },
      `updateImports/${test}`
    )
  })
})

