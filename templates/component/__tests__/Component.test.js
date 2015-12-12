import ${COMPONENT} from '../index'

describe('${COMPONENT}', function () {
  const testbed = createTestbed(${COMPONENT}, {
    /* default props go here */
  })
  it('should render', function () {
    testbed.render(/* override default props here */)

    expect(testbed.dom.node).to.be.ok
  })
  it('should have tests')
})
