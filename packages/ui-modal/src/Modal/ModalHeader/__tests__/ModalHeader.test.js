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
import { ModalHeader } from '../index'
import generateComponentTheme from '../theme'
import { canvas } from '@instructure/ui-themes'

describe('<ModalHeader />', async () => {
  it('should render', async () => {
    const subject = await mount(<ModalHeader />)
    const header = within(subject.getDOMNode())
    expect(header).to.exist()
  })

  it('should set inverse styles', async () => {
    const variables = generateComponentTheme(canvas)
    const subject = await mount(<ModalHeader variant="inverse" />)
    const header = within(subject.getDOMNode())
    const cssStyleDeclaration = header.getComputedStyle() // CSSStyleDeclaration type
    expect(variables.inverseBackground.toUpperCase()).to.equal(
      rgb2hex(cssStyleDeclaration.getPropertyValue('background-color'))
    )
    expect(variables.inverseBorderColor.toUpperCase()).to.equal(
      rgb2hex(cssStyleDeclaration.getPropertyValue('border-bottom-color'))
    )
  })

  function rgb2hex(rgb) {
    const rgbRegex = rgb.match(
      /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+))?\)$/
    )
    function hex(x) {
      return ('0' + parseInt(x).toString(16)).slice(-2)
    }
    return (
      '#' +
      hex(rgbRegex[1]) +
      hex(rgbRegex[2]) +
      hex(rgbRegex[3])
    ).toUpperCase()
  }
})
