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

import { FormFieldMessages } from '../index'

describe('<FormFieldMessages />', () => {
  it('should render', async () => {
    const messages = [
      { text: 'Invalid name', type: 'error' },
      { text: 'Good job!', type: 'success' },
      { text: 'Full name, first and last', type: 'hint' }
    ]

    const subject = await mount(<FormFieldMessages messages={messages} />)

    const formFieldMessages = within(subject.getDOMNode())
    expect(formFieldMessages).to.exist()
    expect(formFieldMessages.getTextContent()).to.equal(
      'Invalid nameGood job!Full name, first and last'
    )
  })

  it('should render if Node is passed as message text', async () => {
    const messages = [
      {
        text: (
          <span>
            <IconWarningLine /> Invalid name
          </span>
        ),
        type: 'error'
      }
    ]

    const subject = await mount(<FormFieldMessages messages={messages} />)

    const formFieldMessages = within(subject.getDOMNode())
    expect(formFieldMessages).to.exist()
    expect(formFieldMessages.getTextContent()).to.equal(' Invalid name')
    expect(await formFieldMessages.find('svg')).to.exist()
  })

  it('should meet a11y standards', async () => {
    const messages = [
      { text: 'Invalid name', type: 'error' },
      { text: 'Good job!', type: 'success' },
      { text: 'Full name, first and last', type: 'hint' }
    ]

    const subject = await mount(<FormFieldMessages messages={messages} />)

    const formFieldMessages = within(subject.getDOMNode())
    expect(await formFieldMessages.accessible()).to.be.true()
  })
})
