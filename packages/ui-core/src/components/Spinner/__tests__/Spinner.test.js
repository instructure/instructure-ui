import React from 'react'
import Spinner from '../index'

describe('<Spinner />', () => {
  const testbed = new Testbed(
    <Spinner title="Loading" />
  )

  it('should render', () => {
    const spinner = testbed.render({ size: 'small' })
    expect(spinner).to.be.present
  })

  it('should render the title prop text in the SVG element title', () => {
    const spinner = testbed.render({ size: 'large' })
    expect(spinner.find('svg > title').text()).to.equal('Loading')
  })

  it('should meet a11y standards', (done) => {
    const spinner = testbed.render()

    spinner.should.be.accessible(done)
  })
})
