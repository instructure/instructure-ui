import ReactTestbed from 'react-testbed'
import ContextBox from '../index'

describe('ic-context-box', function () {
  const testbed = new ReactTestbed(ContextBox, {
    position: 'above',
    children: 'foo'
  })
  it('should render', function () {
    testbed.render()

    expect(testbed.dom.node).to.be.ok
  })
  it('should have tests')
})
