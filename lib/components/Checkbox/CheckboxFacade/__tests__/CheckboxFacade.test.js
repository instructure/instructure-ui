import React from 'react'
import CheckboxFacade from '../index'

describe('<CheckboxFacade />', () => {
  const testbed = new Testbed(<CheckboxFacade>label text</CheckboxFacade>)

  /* example test (replace me) */
  it('should render', () => {
    const subject = testbed.render(/* override default props here */)

    expect(subject).to.be.present
  })

  it('should meet a11y standards', (done) => {
    const subject = testbed.render()

    subject.should.be.accessible(done)
  })
})
