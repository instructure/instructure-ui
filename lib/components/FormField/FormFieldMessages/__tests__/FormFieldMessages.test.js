import React from 'react'
import FormFieldMessages from '../index'

describe('<FormFieldMessages />', function () {
  const testbed = createTestbed(<FormFieldMessages messages={[
    { text: 'Invalid name', type: 'error' },
    { text: 'Good job!', type: 'success' },
    { text: 'Full name, first and last', type: 'hint' }
  ]} />)

  /* example test (replace me) */
  it('should render', function () {
    const subject = testbed.render()

    expect(subject).to.be.present
  })

  it('should have tests')

  it('should meet a11y standards', function (done) {
    const subject = testbed.render()

    subject.should.be.accessible(done, {
      ignores: [
        'color-contrast' // success and error colors don't meet 4.5:1
      ]
    })
  })
})
