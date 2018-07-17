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

import VideoPlayerPopover from '../index'

describe('<VideoPlayerPopover />', () => {
  const triggerId = 'trigger'
  const popoverId = 'some-popover-id'
  const testbed = new Testbed(
    <VideoPlayerPopover showControls={false}>
      {({ showPopover }, togglePopover) => (
        <div>
          <button id={triggerId} onClick={togglePopover} />
          {showPopover && <div id={popoverId} />}
        </div>
      )}
    </VideoPlayerPopover>
  )

  it('does not show popover by default', () => {
    const component = testbed.render()
    expect(component.find(`#${popoverId}`)).to.not.be.present()
  })

  it('shows popover when toggled', () => {
    const component = testbed.render()
    expect(component.find(`#${popoverId}`)).to.not.be.present()
    component.find(`#${triggerId}`).click()
    expect(component.find(`#${popoverId}`)).to.be.present()
  })

  it('hides popover when it\'s open and other controls are hidden (showControls is false)', () => {
    const component = testbed.render({ showControls: true })
    component.setState({ showPopover: true }, () => {
      expect(component.find(`#${popoverId}`)).to.be.present()
      component.setProps({ showControls: false }, () => {
        expect(component.find(`#${popoverId}`)).to.not.be.present()
      })
    })
  })
})
