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
import { mount, expect, generateA11yTests } from '@instructure/ui-test-utils'

import { SVGIcon } from '../index'
import { SVGIconLocator } from '../SVGIconLocator'
import SVGIconExamples from '../__examples__/SVGIcon.examples'

import styles from '../styles.css'

const SVG_SRC = `<svg><circle cx="50" cy="50" r="40" /></svg>`

describe('<SVGIcon />', async () => {
  it('should render', async () => {
   await mount(
    <SVGIcon src={SVG_SRC} />
    )
    const icon = await SVGIconLocator.find()
    expect(icon).to.exist()
  })

  it('should set rotate to 0 by default', async () => {
   await mount(
    <SVGIcon src={SVG_SRC} />
    )
    const icon = await SVGIconLocator.find()
    expect(icon.getAttribute('rotate')).to.equal('0')
  })

  it('should allow rotate prop to be overridden', async () => {
    await mount(
      <SVGIcon
        rotate="90"
        src={SVG_SRC}
      />
    )
    const icon = await SVGIconLocator.find()
    expect(icon.getAttribute('rotate')).to.equal('90')
  })

  it('should set size', async () => {
    await mount(
      <SVGIcon
        size='large'
        src={SVG_SRC}
      />
    )
    const subject = await SVGIconLocator.find()
    expect(subject.hasClass(styles['size--large'])).to.be.true()
  })

  describe('with generated examples', async () => {
    generateA11yTests(SVGIconExamples)
  })
})
