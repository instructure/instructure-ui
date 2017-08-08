const path = require('path')
const defineTest = require('jscodeshift/dist/testUtils').defineTest

const tests = [
  'propTypes',
  'defaultProps',
  'propMember',
  'declaration',
]

jest.autoMockOff()

describe('deprecatePropNames', () => {
  tests.forEach((test) => {
    defineTest(
      __dirname,
      'deprecatePropNames',
      {
        config: path.join(__dirname, '../__testfixtures__/config.js')
      },
      `deprecatePropNames/${test}`
    )
  })
})


