import React from 'react'
import Loading from '../index'

describe('<Loading />', () => {
  const testbed = new Testbed(<Loading />)

  it('should render', () => {
    const loading = testbed.render()
    expect(loading).to.be.present
  })

  it('should render a <Spinner />', () => {
    const loading = testbed.render()
    expect(loading.find('Spinner').length).to.eql(1)
  })
})
