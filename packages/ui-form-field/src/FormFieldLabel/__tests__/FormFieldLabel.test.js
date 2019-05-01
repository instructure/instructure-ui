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
import { expect, mount, within, stub } from '@instructure/ui-test-utils'

import { FormFieldLabel } from '../index'

describe('<FormFieldLabel />', async () => {
  it('should render', async () => {
    const subject = await mount(<FormFieldLabel>Foo</FormFieldLabel>)

    const formFieldLabel = within(subject.getDOMNode())
    expect(formFieldLabel).to.exist()
  })

  it('should render as specified via the `as` prop', async () => {
    const subject = await mount(<FormFieldLabel as="li">Foo</FormFieldLabel>)

    const formFieldLabel = within(subject.getDOMNode())
    expect(await formFieldLabel.find('li:contains(Foo)')).to.exist()
  })

  it('should require children', async () => {
    const consoleError = stub(console, 'error')

    await mount(<FormFieldLabel />)

    expect(consoleError).to.have.been.calledWithMatch(
      'prop `children` is marked as required in `FormFieldLabel`'
    )
  })

  it('should meet a11y standards', async () => {
    const subject = await mount(<FormFieldLabel>Foo</FormFieldLabel>)

    const formFieldLabel = within(subject.getDOMNode())
    expect(await formFieldLabel.accessible()).to.be.true()
  })
})
