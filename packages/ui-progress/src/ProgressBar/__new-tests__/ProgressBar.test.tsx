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
import { render } from '@testing-library/react'

import '@testing-library/jest-dom'
import { runAxeCheck } from '@instructure/ui-axe-check'
import { ProgressBar } from '../index'

describe('<ProgressBar />', () => {
  it('should render', async () => {
    const { container } = render(
      <ProgressBar
        screenReaderLabel="Chapters read"
        valueMax={60}
        valueNow={30}
      />
    )
    const progress = container.querySelector('progress')

    expect(progress).toBeInTheDocument()
  })

  it('should render a progress element with correct aria attributes', async () => {
    const { container } = render(
      <ProgressBar
        screenReaderLabel="Chapters read"
        valueMax={60}
        valueNow={30}
      />
    )
    const progress = container.querySelector('progress')

    expect(progress).toHaveAttribute('value', '30')
  })

  it('should format the displayed text', async () => {
    const current = 30
    const max = 60
    const { container } = render(
      <ProgressBar
        screenReaderLabel="Chapters read"
        valueMax={max}
        valueNow={current}
        renderValue={({ valueNow, valueMax }) => `${valueNow} of ${valueMax}`}
      />
    )
    const progress = container.querySelector('[class$="-progressBar"]')

    expect(progress).toHaveTextContent(`${current} of ${max}`)
  })

  it('should meet a11y standards', async () => {
    const { container } = render(
      <ProgressBar
        screenReaderLabel="Chapters read"
        valueMax={60}
        valueNow={30}
      />
    )
    const axeCheck = await runAxeCheck(container)
    expect(axeCheck).toBe(true)
  })
})
