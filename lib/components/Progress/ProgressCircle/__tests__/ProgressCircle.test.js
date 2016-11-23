import React from 'react'
import ProgressCircle from '../index'

describe('<ProgressCircle />', function () {
  const testbed = new Testbed(
    <ProgressCircle
      label="Loading completion"
      valueNow={40}
      valueMax={60}
    />
  )

  /* example test (replace me) */
  it('should render', function () {
    const subject = testbed.render(/* override default props here */)

    expect(subject).to.be.present
  })

  it('should have tests')

  it('should meet a11y standards', function (done) {
    const subject = testbed.render()

    subject.should.be.accessible(done)
  })
})
