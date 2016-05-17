import React from 'react'
import Transition from '../index'

describe('<Transition />', function () {
  const testbed = createTestbed(Transition, {
    children: <div>hello</div>
  })

  /* example test (replace me) */
  it('should render', function () {
    testbed.render(/* override default props here */)

    expect(testbed.dom.node).to.exist
  })

  it('should have tests')
})
