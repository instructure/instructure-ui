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

import { expect, mount, within } from '@instructure/ui-test-utils'
import ContextView from '../index'
import styles from '../styles.css'

describe('<ContextView />', async () => {
  it('should render', async () => {
    const subject = await mount(
      <ContextView />
    )

    expect(subject.getDOMNode()).to.exist()
  })

  it('should meet a11y standards', async () => {
    const subject = await mount(
      <ContextView />
    )

    const contextView = within(subject.getDOMNode())
    expect(await contextView.accessible()).to.be.true()
  })

  it('should apply default styled arrow by default', async () => {
    const subject = await mount(
      <ContextView />
    )

    const contextView = within(subject.getDOMNode())
    const arrow = await contextView.find({css: `.${styles['arrow']}`})

    expect(arrow.hasClass(styles['arrow--default'])).to.be.true()
  })

  it('should apply inverse arrow when inverse is set', async () => {
    const subject = await mount(
      <ContextView background="inverse" />
    )

    const contextView = within(subject.getDOMNode())
    const arrow = await contextView.find({css: `.${styles['arrow']}`})

    expect(arrow.hasClass(styles['arrow--inverse'])).to.be.true()
  })

  function testPlacement (placement) {
    it(`should apply placement classes for ${placement}`, async () => {
      const subject = await mount(
        <ContextView placement={placement} />
      )
      const classname = styles[`placement--${placement.split(' ').join('-')}`]
      const contextView = within(subject.getDOMNode())

      expect(contextView.hasClass(classname)).to.be.true()
    })
  }

  testPlacement('top')
  testPlacement('top start')
  testPlacement('top end')
  testPlacement('start')
  testPlacement('start top')
  testPlacement('start bottom')
  testPlacement('bottom')
  testPlacement('bottom start')
  testPlacement('bottom end')
  testPlacement('end')
  testPlacement('end top')
  testPlacement('end bottom')
  testPlacement('offscreen')

  function testArrowPlacement (placement, mirror) {
    it(`should mirror the arrow position based on the placement for ${placement}`, async () => {
      const subject = await mount(
        <ContextView placement={placement} />
      )
      const classname = styles[`arrow--${mirror.split(' ').join('-')}`]
      const contextView = within(subject.getDOMNode())
      const arrow = await contextView.find({css: `.${styles['arrow']}`})

      expect(arrow.hasClass(classname)).to.be.true()
    })
  }

  testArrowPlacement('top', 'bottom')
  testArrowPlacement('top start', 'bottom start')
  testArrowPlacement('top end', 'bottom end')
  testArrowPlacement('start', 'end')
  testArrowPlacement('start top', 'end top')
  testArrowPlacement('start bottom', 'end bottom')
  testArrowPlacement('bottom', 'top')
  testArrowPlacement('bottom start', 'top start')
  testArrowPlacement('bottom end', 'top end')
  testArrowPlacement('end', 'start')
  testArrowPlacement('end top', 'start top')
  testArrowPlacement('end bottom', 'start bottom')
})
