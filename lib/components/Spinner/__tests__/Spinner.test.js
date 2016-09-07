import React from 'react'
import Spinner from '../index'

describe('<Spinner />', function () {
  const testbed = createTestbed(
    <Spinner title="Loading" />
  )

  it('should render', function () {
    const spinner = testbed.render()
    expect(spinner.dom()).to.exist
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
