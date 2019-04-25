const path = require('path')
const defineTest = require('jscodeshift/dist/testUtils').defineTest

const tests = ['elements', 'updateValues']

jest.autoMockOff()

describe('updatePropNames', () => {
  tests.forEach(test => {
    defineTest(
      __dirname,
      'lib/updatePropNames',
      {
        config: path.join(__dirname, '../__testfixtures__/props.config.js')
      },
      `updatePropNames/${test}`
    )
  })
})
