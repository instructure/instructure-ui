import React from 'react'
import CheckboxFacade from '../index'

describe('<CheckboxFacade />', function () {
  const testbed = createTestbed(<CheckboxFacade>label text</CheckboxFacade>)

  /* example test (replace me) */
  it('should render', function () {
    const subject = testbed.render(/* override default props here */)

    expect(subject.dom()).to.exist
  })

  it('should have tests')

  it('should meet a11y standards', function (done) {
    const subject = testbed.render()

    subject.should.be.accessible(done)
  })
})
