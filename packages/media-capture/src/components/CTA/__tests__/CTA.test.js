import React from 'react'
import { _component as CTA } from '../index'

describe('<CTA />', () => {
  const testbed = new Testbed(<CTA />)

  it('should render', () => {
    const CTA = testbed.render()
    expect(CTA).to.be.present
  })
})
