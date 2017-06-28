import React from 'react'
import FormFieldMessages from '../index'

describe('<FormFieldMessages />', () => {
  const testbed = new Testbed(<FormFieldMessages messages={[
    { text: 'Invalid name', type: 'error' },
    { text: 'Good job!', type: 'success' },
    { text: 'Full name, first and last', type: 'hint' }
  ]}
  />)

  /* example test (replace me) */
  it('should render', () => {
    const subject = testbed.render()

    expect(subject).to.be.present
  })

  it('should have tests')

  it('should meet a11y standards', (done) => {
    const subject = testbed.render()

    subject.should.be.accessible(done, {
      ignores: [
        'color-contrast' // success and error colors don't meet 4.5:1
      ]
    })
  })
})
