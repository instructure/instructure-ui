import React from 'react'
import MediaStreamMessage from '../index'

describe('<MediaStreamMessage />', () => {
  const testbed = new Testbed(<MediaStreamMessage loaded={false} />)

  it('should render', () => {
    const message = testbed.render()
    expect(message).to.be.present
  })
})
