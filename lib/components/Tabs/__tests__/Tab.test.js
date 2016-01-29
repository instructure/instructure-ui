import { Tab } from '../index'

describe('Tab', function () {
  const label = 'Tab Label'

  const testbed = createTestbed(Tab, {
    children: label
  })

  it('should render children', function () {
    testbed.render()

    expect(testbed.dom.find(':contains("Tab Label")'))
      .to.be.ok
  })

  describe('for a11y', function () {
    it('should meet standards', function (done) {
      testbed.render()

      testbed.checkA11yStandards(done, {
        ignores: [
          'aria-required-parent', // ignore this because it should be used as a child of TabList
          'listitem' // same
        ]
      })
    })
  })
})
