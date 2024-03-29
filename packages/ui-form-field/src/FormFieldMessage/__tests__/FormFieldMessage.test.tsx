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
import { IconWarningLine } from '@instructure/ui-icons'

import { FormFieldMessage } from '../index'

describe('<FormFieldMessage />', async () => {
  it('should render message', async () => {
    const subject = await mount(
      <FormFieldMessage>hello world</FormFieldMessage>
    )

    const formFieldMessage = within(subject.getDOMNode())
    expect(await formFieldMessage.findWithText('hello world')).to.exist()
  })

  it('should render message if Node is passed', async () => {
    const subject = await mount(
      <FormFieldMessage>
        <span>
          <IconWarningLine /> Invalid name
        </span>
      </FormFieldMessage>
    )

    const formFieldMessage = within(subject.getDOMNode())
    expect(await formFieldMessage.findWithText('Invalid name')).to.exist()
    expect(await formFieldMessage.find('svg')).to.exist()
  })

  it('should meet a11y standards', async () => {
    const subject = await mount(<FormFieldMessage />)

    const formFieldMessage = within(subject.getDOMNode())
    expect(await formFieldMessage.accessible()).to.be.true()
  })
})
