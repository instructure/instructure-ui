import React from 'react'

import {
  READY,
  RECORDING,
  PREVIEWSAVE,
  SAVING
} from '../../../constants/CaptureStates'

import Controller from '../index'

describe('<Controller />', () => {
  const testbed = new Testbed(<Controller captureState="" />)

  it('should render', () => {
    const controller = testbed.render()
    expect(controller).to.be.present
  })

  it('renders children', () => {
    const child = <div>a child</div>
    const controller = testbed.render({ children: child })
    expect(controller.text()).to.eql('a child')
  })

  context('when READY state', () => {
    it('renders device controls', () => {
      const controller = testbed.render({ captureState: READY })
      expect(controller.find('Button').length).to.eql(2)
    })
  })

  context('when RECORDING state', () => {
    it('renders a reset button', () => {
      const controller = testbed.render({ captureState: RECORDING })
      expect(controller.find('Button').length).to.eql(1)
    })
  })

  context('when PREVIEWSAVE state', () => {
    it('renders a text input for file name', () => {
      const controller = testbed.render({ captureState: PREVIEWSAVE })
      expect(controller.find('TextInput').length).to.eql(1)
    })
  })

  context('when SAVING state', () => {
    it('renders a text input for file name', () => {
      const controller = testbed.render({ captureState: SAVING })
      expect(controller.find('TextInput').length).to.eql(1)
    })
  })
})
