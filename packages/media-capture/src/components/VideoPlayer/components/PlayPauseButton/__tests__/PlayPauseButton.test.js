import React from 'react'
import PlayPauseButton from '../index'

import {
  PAUSED,
  PLAYING,
  ENDED
} from '../../../videoStates'

describe('<PlayPauseButton />', () => {
  const videoId = 'uuid-123'
  const testbed = new Testbed(<PlayPauseButton videoId={videoId} />)

  it('should render', () => {
    expect(testbed.render()).to.be.present
  })

  it('defaults to the paused variant', () => {
    expect(testbed.render().text()).to.match(/Play/)
  })

  it('invokes onClick prop when clicked', () => {
    const onClick = testbed.stub()
    const button = testbed.render({ onClick })
    button.simulate('click')
    expect(onClick).to.have.been.called
  })

  describe('variants', () => {
    context('PAUSED', () => {
      it('renders a play button', () => {
        const button = testbed.render({ variant: PAUSED })
        expect(button.text()).to.match(/Play/)
        expect(button.find('IconPlaySolid').length).to.eql(1)
      })
    })

    context('ENDED', () => {
      it('renders a play button', () => {
        const button = testbed.render({ variant: ENDED })
        expect(button.text()).to.match(/Play/)
        expect(button.find('IconPlaySolid').length).to.eql(1)
      })
    })

    context('PLAYING', () => {
      it('renders a pause button', () => {
        const button = testbed.render({ variant: PLAYING })
        expect(button.text()).to.match(/Pause/)
        expect(button.find('IconPauseSolid').length).to.eql(1)
      })
    })
  })
})
