import React from 'react'
import Transition from '../index'

describe('<Transition />', function () {
  const testbed = createTestbed(
    <Transition>
      <div>hello</div>
    </Transition>
  )

  it('should render', function () {
    const subject = testbed.render()

    expect(subject.text()).to.equal('hello')
  })

  it('should have tests')
})
