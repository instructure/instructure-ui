import Foo from '../index'

describe('ic-foo', function () {
  const testbed = createTestbed(Foo, {
    /* default props go here */
  })
  it('should render', function () {
    testbed.render(/* override default props here */)

    expect(testbed.dom.node).to.be.ok
  })
  it('should have tests')
})
