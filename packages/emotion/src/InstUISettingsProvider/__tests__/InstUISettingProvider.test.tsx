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

/** @jsx jsx */
import React from 'react'
import { expect, mount } from '@instructure/ui-test-utils'
import { canvas } from '@instructure/ui-themes'
import { InstUISettingsProvider } from '../index'
import { jsx } from '../../index'
import { textDirectionContextConsumer } from '@instructure/ui-i18n'
import type { BidirectionalProps } from '@instructure/ui-i18n'

@textDirectionContextConsumer()
class TextDirAwareComponent extends React.Component<BidirectionalProps> {
  render() {
    return <div data-dir={this.props.dir}>hello world</div>
  }
}

describe('InstUISettingsProvider', async () => {
  it('can handle nested text direction setting changes', async () => {
    const subject = await mount(
      <InstUISettingsProvider theme={canvas} dir="rtl">
        <InstUISettingsProvider>
          <TextDirAwareComponent />
        </InstUISettingsProvider>
      </InstUISettingsProvider>
    )
    let element = subject.getDOMNode().firstElementChild?.firstElementChild
    expect(element!.getAttribute('data-dir')).to.equal('rtl')
    await subject.setProps({ dir: 'ltr' })
    element = subject.getDOMNode().firstElementChild?.firstElementChild
    expect(element!.getAttribute('data-dir')).to.equal('ltr')
  })
  it('can handle text direction on native HTML elements', async () => {
    const subject = await mount(
      <InstUISettingsProvider dir="rtl">
        <div>Should be RTL</div>
      </InstUISettingsProvider>
    )
    let element = subject.getDOMNode()

    expect(element.getAttribute('dir')).to.equal('rtl')

    await subject.setProps({ dir: 'ltr' })
    element = subject.getDOMNode()

    expect(element.getAttribute('dir')).to.equal('ltr')
  })
})
