import React from 'react'
import Controller from '../index'

describe('<Controller />', () => {
  const testbed = new Testbed(<Controller />)

  it('should render', () => {
    const controller = testbed.render()
    expect(controller).to.be.present
  })
})
