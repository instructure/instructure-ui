import React from 'react'
import FormField from '../index'

describe('<FormField />', () => {
  const testbed = new Testbed(<FormField label="foo" id="bar" />)

  /* example test (replace me) */
  it('should render', () => {
    const subject = testbed.render(/* override default props here */)

    expect(subject).to.be.present
  })

  it('should have tests')

  it('should meet a11y standards', (done) => {
    const subject = testbed.render()

    subject.should.be.accessible(done)
  })
})
