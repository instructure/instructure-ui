import React from 'react'
import Table from '../index'
import Container from '../../Container'

describe('<Table />', () => {
  const testbed = new Testbed(<Table caption="Test table" />)

  it('should render a caption', () => {
    const subject = testbed.render({
      caption: 'An amazing test table'
    })
    expect(subject.find('caption').text()).to.equal('An amazing test table')
  })

  it('should not allow padding to be added as a property', () => {
    const subject = testbed.render({
      padding: 'small medium large small'
    })
    expect(subject.find(Container).props().padding).to.not.exist
  })

  it('should meet a11y standards', (done) => {
    const subject = testbed.render()

    subject.should.be.accessible(done, {
      ignores: []
    })
  })
})
