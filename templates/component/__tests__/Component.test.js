import ${COMPONENT} from '../index'

describe('${COMPONENT}', function () {
  const testbed = createTestbed(${COMPONENT}, {
    /* default props go here */
  })

  /* example test (replace me) */
  it('should render', function () {
    testbed.render(/* override default props here */)

    expect(testbed.dom.node).to.be.ok
  })

  it('should have tests')

  describe('for a11y', function () {
    /* placeholder for a11y tests */
    it('should meet a11y standards')
  })
})
