import ContextBox from '../index'

describe('ContextBox', function () {
  const testbed = createTestbed(ContextBox, {
    position: 'above',
    children: 'foo'
  })
  it('should render', function () {
    testbed.render()

    expect(testbed.dom.node).to.be.ok
  })
  it('should have tests')
})
