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
import { expect, mount, stub, locator } from '@instructure/ui-test-utils'
import { View } from '@instructure/ui-view'
import { ModalBody } from '../index'
import generateComponentTheme from '../theme'
import { canvas } from '@instructure/ui-themes'
import { color2hex } from '@instructure/ui-color-utils'
// @ts-expect-error ts-migrate(2339) FIXME: Property 'selector' does not exist on type 'typeof... Remove this comment to see the full error message
const ModalBodyLocator = locator(ModalBody.selector)

describe('<ModalBody />', async () => {
  it('should render', async () => {
    await mount(<ModalBody />)
    const body = await ModalBodyLocator.find()
    expect(body).to.exist()
  })

  it('should set inverse styles', async () => {
    const variables = generateComponentTheme(canvas)

    await mount(<ModalBody variant="inverse" />)
    const body = await ModalBodyLocator.find()

    const cssStyleDeclaration = body.getComputedStyle() // CSSStyleDeclaration type
    expect(variables.inverseBackground).to.equal(
      color2hex(cssStyleDeclaration.getPropertyValue('background-color'))
    )
  })

  it('should set 100% width and height when overflow is set to fit', async () => {
    await mount(<ModalBody overflow="fit" />)

    const body = await ModalBodyLocator.find()

    expect(body.getDOMNode().style.width).to.equal('100%')
    expect(body.getDOMNode().style.height).to.equal('100%')
  })
})
