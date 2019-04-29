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

import { createChainedFunction } from '@instructure/ui-utils'
import { expect, mount, stub, spy, within } from '@instructure/ui-test-utils'

import { safeCloneElement } from '../safeCloneElement'

describe('safeCloneElement', async () => {
  const SafeClone = function ({ element, props, children }) {
    return safeCloneElement(element, props, children)
  }

  it('should preserve refs', async () => {
    const origRef = stub()
    const cloneRef = stub()

    await mount(
      <SafeClone
        element={<div ref={origRef} />}
        props={{ref: cloneRef}}
      />
    )

    expect(origRef).to.have.been.called()
    expect(cloneRef).to.have.been.called()
  })

  it('should preserve event handlers', async () => {
    const onClickA = spy()
    const onClickB = spy()

    const subject = await mount(
      <SafeClone
        element={<button onClick={onClickA} />}
        props={{ onClick: onClickB }}
      />
    )

    const button = within(subject.getDOMNode())
    await button.click()

    expect(onClickA).to.have.been.called()
    expect(onClickB).to.have.been.called()
  })

  it('should preserve already chained functions', async () => {
    const onClickA = spy()
    const onClickB = spy()
    const onClickC = spy()

    const subject = await mount(
      <SafeClone
        element={<button onClick={onClickA} />}
        props={{ onClick: createChainedFunction(onClickB, onClickC)}}
      />
    )

    const button = within(subject.getDOMNode())
    await button.click()

    expect(onClickA).to.have.been.called()
    expect(onClickB).to.have.been.called()
    expect(onClickC).to.have.been.called()
  })
})
