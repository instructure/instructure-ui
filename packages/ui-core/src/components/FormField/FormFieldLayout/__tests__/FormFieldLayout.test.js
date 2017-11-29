import React from 'react'
import FormFieldLayout from '../index'
import { GridCol } from '../../../Grid'

describe('<FormFieldLayout />', () => {
  const testbed = new Testbed(<FormFieldLayout label="Username" />)

  /* example test (replace me) */
  it('should render', () => {
    const subject = testbed.render(/* override default props here */)

    expect(subject).to.be.present
  })

  it('should meet a11y standards', (done) => {
    const subject = testbed.render()

    subject.should.be.accessible(done)
  })

  it('should align label to right by default', () => {
    const subject = testbed.render()
    const col = subject.find(GridCol).first()
    expect(col.prop('textAlign')).to.equal('end')
  })

  it('should align label to left', () => {
    const subject = testbed.render({ labelAlign: 'start' })
    const col = subject.find(GridCol).first()
    expect(col.prop('textAlign')).to.equal('start')
  })
})
