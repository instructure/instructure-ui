import React from 'react'
import Message from '../index'

describe('<Message />', () => {
  const props = {
    msg: 'this is an error'
  }
  const testbed = new Testbed(<Message {...props} />)

  it('should render', () => {
    const message = testbed.render()
    expect(message).to.be.present
  })

  describe('as an error', () => {
    it('should render a readble message', () => {
      const message = testbed.render()
      expect(message.text()).to.eql('this is an error')
    })
  })
})
