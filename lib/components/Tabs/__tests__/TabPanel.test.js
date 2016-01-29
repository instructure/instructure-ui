import { TabPanel } from '../index'

describe('TabPanel', function () {
  const contents = 'Panel contents'

  const testbed = createTestbed(TabPanel, {
    selected: true,
    children: contents
  })

  it('should render children', function () {
    testbed.render()

    expect(testbed.dom.find(':contains("Panel contents")'))
      .to.be.ok
  })

  describe('for a11y', function () {
    it('should meet standards', function (done) {
      testbed.render()

      testbed.checkA11yStandards(done)
    })
  })
})
