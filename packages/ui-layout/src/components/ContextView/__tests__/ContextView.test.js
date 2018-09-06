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
import ContextView from '../index'
import styles from '../styles.css'

describe('<ContextView />', () => {
  const testbed = new Testbed(<ContextView />)

  it('should render', () => {
    const subject = testbed.render()

    expect(subject).to.be.present()
  })

  it('should meet a11y standards', (done) => {
    const subject = testbed.render()

    subject.should.be.accessible(done)
  })

  it('should apply default styled arrow by default', () => {
    const subject = testbed.render()

    subject.hasClass(styles['arrow--default'])
  })

  it('should apply inverse arrow when inverse is set', () => {
    const subject = testbed.render({
      background: 'inverse'
    })

    expect(subject.find(`.${styles['arrow--inverse']}`)).to.exist()
  })

  function testPlacement (placement) {
    it(`should apply placement classes for ${placement}`, () => {
      const subject = testbed.render({
        placement
      })

      expect(subject.hasClass(styles[`placement--${placement.split(' ').join('-')}`]))
        .to.be.true()
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
    it(`should mirror the arrow position based on the placement for ${placement}`, () => {
      const subject = testbed.render({
        placement
      })
      const mirroredStyle = `arrow--${mirror.split(' ').join('-')}`
      expect(subject.find(`.${styles[mirroredStyle]}`)).to.exist()
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
