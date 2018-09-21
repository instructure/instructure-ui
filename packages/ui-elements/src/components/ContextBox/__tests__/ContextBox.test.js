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

import ContextBox from '../index'
import styles from '../styles.css'

describe('<ContextBox />', () => {
  it('should render the children', async () => {
    const subject = await mount(<ContextBox>foo</ContextBox>)
    const contextBox = within(subject.getDOMNode())
    expect(await contextBox.find({ contains: 'foo' })).to.exist()
  })

  it('should meet a11y standards', async () => {
    const subject = await mount(<ContextBox>foo</ContextBox>)
    const contextBox = within(subject.getDOMNode())
    expect(await contextBox.accessible()).to.be.true()
  })

  describe('with the default props', () => {
    it('should render above the trigger element', async () => {
      const subject = await mount(<ContextBox placement="top">foo</ContextBox>)
      const contextBox = within(subject.getDOMNode())
      expect(await contextBox.find(`.${styles['positioned--top']}`)).to.exist()
    })

    it('should render with an arrow', async () => {
      const subject = await mount(<ContextBox>foo</ContextBox>)
      const contextBox = within(subject.getDOMNode())
      expect(await contextBox.find(`.${styles['with-arrow']}`)).to.exist()
    })
  })

  describe('when the arrow is disabled', () => {
    it('should not display the arrow', async () => {
      const subject = await mount(<ContextBox withArrow={false}>foo</ContextBox>)
      const contextBox = within(subject.getDOMNode())
      expect(await contextBox.find(`.${styles['with-arrow']}`, {
        expectEmpty: true
      })).to.not.exist()
    })
  })

  describe('when a placement is provided', () => {
    it('should display in that position', async () => {
      const placement = 'bottom'
      const subject = await mount(<ContextBox placement={placement}>foo</ContextBox>)

      const contextBox = within(subject.getDOMNode())
      expect(await contextBox.find(
        `.${styles[`positioned--${placement}`]}`
      )).to.exist()
    })
  })
})
