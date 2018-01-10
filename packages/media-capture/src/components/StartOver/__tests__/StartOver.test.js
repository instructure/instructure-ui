import React from 'react'

import StartOver from '../index'

describe('<StartOver />', () => {
  const testbed = new Testbed(<StartOver actions={{ startoverClicked: () => {} }} />)

  it('should render', () => {
    const StartOver = testbed.render()
    expect(StartOver).to.be.present
  })

  it('should render an appropriate label', () => {
    const StartOver = testbed.render()
    expect(StartOver.text()).to.eql('Start Over')
  })

  it('should render an appropriate icon', () => {
    const StartOver = testbed.render()
    expect(StartOver.find('IconResetSolid').length).to.eql(1)
  })

  it('should invoke the startOver action when clicked', () => {
    const startoverClickedSpy = testbed.spy()
    const StartOver = testbed.render({ actions: { startoverClicked: startoverClickedSpy }})
    StartOver.simulate('click')
    expect(startoverClickedSpy).to.have.been.called
  })
})
