import React from 'react'
import Spinner from '../index'

describe('<Spinner />', function () {
  const testbed = new Testbed(
    <Spinner title="Loading" />
  )

  it('should render', function () {
    const spinner = testbed.render()
    expect(spinner).to.be.present
  })

  it('should render the title prop text in the SVG element title', function () {
    const spinner = testbed.render()
    expect(spinner.find('svg > title').text()).to.equal('Loading')
  })

  it('should meet a11y standards', function (done) {
    const spinner = testbed.render()

    spinner.should.be.accessible(done)
  })
})
