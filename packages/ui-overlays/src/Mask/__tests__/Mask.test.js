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
import { expect, mount, spy, stub, within } from '@instructure/ui-test-utils'

import { Mask } from '../index'
import styles from '../styles.css'

describe('<Mask />', async () => {
  it('should render', async () => {
    const subject = await mount(<Mask />)
    expect(subject.getDOMNode()).to.exist()
  })

  it('should have tabIndex -1 when onClick is provided', async () => {
    const onClick = stub()
    const subject = await mount(<Mask onClick={onClick} />)
    expect(subject.getDOMNode().getAttribute('tabindex')).to.equal('-1')
  })

  it('should call onClick prop when clicked', async () => {
    const onClick = stub()
    const subject = await mount(<Mask onClick={onClick} />)

    const mask = within(subject.getDOMNode())
    const clickable = await mask.find(':clickable')

    await clickable.click()

    expect(onClick).to.have.been.called()
  })

  it('should apply fullscreen class when prop is true', async () => {
    const subject = await mount(<Mask fullscreen />)
    const mask = within(subject.getDOMNode())
    const fullscreen = await mask.find(`.${styles['fullscreen']}`)
    expect(fullscreen).to.exist()
  })

  it('should provide an elementRef', async () => {
    const elementRef = spy()
    const subject = await mount(<Mask elementRef={elementRef} />)
    expect(elementRef).to.have.been.calledWith(subject.getDOMNode())
  })
})
