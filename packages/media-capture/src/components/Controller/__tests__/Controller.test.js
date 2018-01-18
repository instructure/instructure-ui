import React from 'react'

import {
  READY,
  RECORDING,
  PREVIEWSAVE,
  SAVING
} from '../../../constants/CaptureStates'

import Controller from '../index'

describe('<Controller />', () => {
  const props = {
    captureState: '',
    fileName: '',
    devices: {
      audioinput: [],
      videoinput: []
    },
    audioDeviceId: '',
    videoDeviceId: '',
    actions: {}
  }

  const testbed = new Testbed(<Controller {...props} />)

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
      const props = {
        captureState: READY,
        actions: {
          audioDeviceChanged: () => {},
          videoDeviceChanged: () => {}
        }
      }

      const controller = testbed.render(props)
      expect(controller.find('DeviceSelection').length).to.eql(2)
    })
  })

  context('when RECORDING state', () => {
    it('renders a reset button', () => {
      const controller = testbed.render({
        captureState: RECORDING, actions: { startoverClicked: () => {} }
      })
      expect(controller.find('StartOver').length).to.eql(1)
    })
  })

  context('when PREVIEWSAVE state', () => {
    it('renders a <FileSave />', () => {
      const controller = testbed.render({
        captureState: PREVIEWSAVE, actions: { saveClicked: () => {}, startoverClicked: () => {}}
      })

      expect(controller.find('FileSave').length).to.eql(1)
    })

    it('renders a <StartOver />', () => {
      const controller = testbed.render({
        captureState: PREVIEWSAVE, actions: { saveClicked: () => {}, startoverClicked: () => {}}
      })

      expect(controller.find('StartOver').length).to.eql(1)
    })
  })

  context('when SAVING state', () => {
    it('renders a <FileSave />', () => {
      const controller = testbed.render({
        captureState: PREVIEWSAVE, actions: { saveClicked: () => {}, startoverClicked: () => {} }
      })

      expect(controller.find('FileSave').length).to.eql(1)
    })

    it('renders a <StartOver />', () => {
      const controller = testbed.render({
        captureState: PREVIEWSAVE, actions: { saveClicked: () => {}, startoverClicked: () => {}}
      })

      expect(controller.find('StartOver').length).to.eql(1)
    })
  })
})
