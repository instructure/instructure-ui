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

import Volume from '../index'

describe('<Volume />', () => {
  const prop = {
    videoId: 'uuid-123',
    value: 1,
    onChange: () => {},
    onKeyDown: () => {},
    mountNode: () => {},
    label: <div />,
    showControls: false,
    forwardRef: () => {}
  }
  let testProp = { ...prop }
  const testbed = new Testbed(<Volume {...testProp} />)

  beforeEach(() => {
    testProp = { ...prop }
  })

  it('renders volume button', () => {
    const component = testbed.render().find('VideoPlayerButton')
    expect(component).to.be.present()
  })

  it('passes down videoId prop to VideoPlayerButton', () => {
    const component = testbed.render().find('VideoPlayerButton')
    expect(component.prop('videoId')).to.be.eql('uuid-123')
  })

  it('invokes forwardRef prop on mount', () => {
    const forwardRef = testbed.stub()
    testbed.render({ forwardRef })
    expect(forwardRef).to.have.been.called
  })

  it('hides popover when it\'s open and showControls is false', () => {
    const component = testbed.render({ showControls: true })
    component.instance().hidePopover = testbed.stub()
    component.setState({ showPopover: true }, () => {
      component.setProps({ showControls: false }, () => {
        expect(component.instance().hidePopover).to.have.been.called
      })
    })
  })

  it('doesn\'t show slider by default', () => {
    const component = testbed.render()
    expect(component.state('showPopover')).to.eql(false)
    expect(document.getElementsByTagName('input').length).to.eql(0)
  })

  it('opens slider when volume button is clicked', () => {
    const component = testbed.render()
    component.find('PopoverTrigger').click()
    expect(component.state('showPopover')).to.eql(true)
    expect(document.getElementsByTagName('input').length).to.eql(1)
  })
})
