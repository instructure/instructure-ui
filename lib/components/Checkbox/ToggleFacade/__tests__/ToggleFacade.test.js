import React from 'react'
import ToggleFacade from '../index'

describe('<ToggleFacade />', function () {
  const testbed = new Testbed(<ToggleFacade>label text</ToggleFacade>)

  /* example test (replace me) */
  it('should render', function () {
    const subject = testbed.render(/* override default props here */)

    expect(subject).to.be.present
  })

  it('should meet a11y standards', function (done) {
    const subject = testbed.render()

    subject.should.be.accessible(done)
  })
})
