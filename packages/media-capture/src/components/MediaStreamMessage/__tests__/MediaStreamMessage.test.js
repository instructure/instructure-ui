import React from 'react'
import MediaStreamMessage from '../index'

describe('<MediaStreamMessage />', () => {
  const testbed = new Testbed(<MediaStreamMessage loaded={false} />)

  it('should render', () => {
    const message = testbed.render()
    expect(message).to.be.present
  })

  describe('when loading', () => {
    it('should render a <Spinner />', () => {
      const message = testbed.render()
      expect(message.find('Spinner').length).to.eql(1)
    })
  })

  describe('as an error', () => {
    it('should render a readble message', () => {
      const message = testbed.render({ error: 'this is an error' })
      expect(message.text()).to.eql('this is an error')
    })
  })
})
