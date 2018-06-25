/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 - present Instructure, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
import React from 'react'

import VolumeSlider from '../index'
import { SEEK_VOLUME_INTERVAL } from '../../../../VideoPlayer'

describe('<VolumeSlider />', () => {
  const testbed = new Testbed(
    <VolumeSlider
      value={1}
      onKeyDown={() => {}}
      onChange={() => {}}
      label={<div />}
    />
  )

  it('should render', () => {
    const component = testbed.render()
    const sliderWrapper = component.find('View')
    expect(sliderWrapper).to.be.present()
    const slider = component.find('RangeInput')
    expect(slider).to.be.present()
  })

  it('has a range of [0,1]', () => {
    const slider = testbed.render().find('RangeInput')
    expect(slider.prop('min')).to.eql(0)
    expect(slider.prop('max')).to.eql(1)
  })

  it('should have a value of 1 by default', () => {
    expect(testbed.render().find('RangeInput').prop('defaultValue')).to.eql(1)
  })

  it(`has step value of ${SEEK_VOLUME_INTERVAL}`, () => {
    expect(testbed.render().find('RangeInput').prop('step')).to.eql(SEEK_VOLUME_INTERVAL)
  })

  it('passes down the value prop', (done) => {
    const component = testbed.render()
    const value = 0.5
    component.setProps({ value }, () => {
      expect(component.prop('value')).to.eql(value)
      done()
    })
  })

  it('shows Unmuted on ScreenReaderContent', () => {
    const label = <div>Unmuted</div>
    expect(testbed.render({ label }).text()).to.match(/Unmuted/)
  })

  it('shows Muted on ScreenReaderContent', () => {
    const label = <div>Muted</div>
    expect(testbed.render({ label }).text()).to.match(/Muted/)
  })

  it('invokes onChange prop with the right argument', () => {
    const handleOnChange = testbed.stub()
    const slider = testbed.render({ onChange: handleOnChange }).find('RangeInput')
    slider.prop('onChange')(0.75)
    expect(handleOnChange).to.have.been.calledWith(0.75)
  })

  it('does not display current value', () => {
    expect(testbed.render().find('RangeInput').prop('displayValue')).to.eql(false)
  })

  describe('keybindings', () => {
    context('while focus is on slider', () => {
      it('invokes function(s) that\'s mapped to the key', () => {
        const keyDownStub = testbed.stub()
        const handleKeyPress = (e) => {
          if (e.key === 'ArrowRight') {
            keyDownStub()
          }
        }
        const component = testbed.render({ onKeyDown: handleKeyPress })
        component.find('RangeInput').prop('onKeyDown')({ key: 'ArrowRight' })
        expect(keyDownStub).to.have.been.called
      })
    })
  })
})
