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

import React, { ReactElement, ReactNode } from 'react'

import { createChainedFunction } from '@instructure/ui-utils'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import { safeCloneElement } from '../safeCloneElement'

describe('safeCloneElement', () => {
  const SafeClone = function <P extends { style?: unknown }>({
    element,
    props,
    children
  }: {
    element: ReactElement<P>
    props: P
    children?: ReactNode[]
  }) {
    return safeCloneElement(element, props, children)
  }

  it('should preserve refs', () => {
    const origRef = jest.fn()
    const cloneRef = jest.fn()

    render(
      <SafeClone element={<div ref={origRef} />} props={{ ref: cloneRef }} />
    )

    expect(origRef).toHaveBeenCalled()
    expect(cloneRef).toHaveBeenCalled()
  })

  it('should preserve event handlers', () => {
    const onClickA = jest.fn()
    const onClickB = jest.fn()

    render(
      <SafeClone
        element={<button onClick={onClickA} />}
        props={{ onClick: onClickB }}
      />
    )

    const button = screen.getByRole('button')
    button.click()

    expect(onClickA).toHaveBeenCalled()
    expect(onClickB).toHaveBeenCalled()
  })

  it('should preserve already chained functions', () => {
    const onClickA = jest.fn()
    const onClickB = jest.fn()
    const onClickC = jest.fn()

    render(
      <SafeClone
        element={<button onClick={onClickA} />}
        props={{ onClick: createChainedFunction(onClickB, onClickC) }}
      />
    )

    const button = screen.getByRole('button')
    button.click()

    expect(onClickA).toHaveBeenCalled()
    expect(onClickB).toHaveBeenCalled()
    expect(onClickC).toHaveBeenCalled()
  })
})
