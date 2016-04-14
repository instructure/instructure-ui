import Grid from '../index'

describe('<Grid />', function () {
  const testbed = createTestbed(Grid, {
    /* default props go here */
  })

  /* example test (replace me) */
  it('should render', function () {
    testbed.render(/* override default props here */)

    expect(testbed.dom.node).to.exist
  })

  it('should have tests')

  describe('for a11y', function () {
    it('should meet standards', function (done) {
      testbed.render()

      testbed.checkA11yStandards(done, {
        ignores: [  /* add a11y standards rules to ignore here (https://dequeuniversity.com/rules/axe) */ ]
      })
    })
    /* additional a11y related tests go here */
  })
})
