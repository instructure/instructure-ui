import React from 'react'
import Table from '../index'

describe('<Table />', () => {
  const testbed = new Testbed(<Table caption="Test table" />)

  it('should render a caption', () => {
    const subject = testbed.render({
      caption: 'An amazing test table'
    })
    expect(subject.find('caption').text()).to.equal('An amazing test table')
  })

  it('should meet a11y standards', (done) => {
    const subject = testbed.render()

    subject.should.be.accessible(done, {
      ignores: []
    })
  })
})
