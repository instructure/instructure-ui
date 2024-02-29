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
import { render, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'

import { InstUISettingsProvider } from '@instructure/emotion'
import { runAxeCheck } from '@instructure/ui-axe-check'

import { RatingIcon } from '../index'

describe('<RatingIcon />', () => {
  it('transitions when filled on render and animateFill is true', async () => {
    const { container } = render(
      <InstUISettingsProvider
        theme={{
          componentOverrides: {
            Transition: {
              duration: '100ms'
            }
          }
        }}
      >
        <RatingIcon filled animateFill />
      </InstUISettingsProvider>
    )

    await waitFor(
      () => {
        const icon = container.querySelector('svg')

        expect(icon).toBeInTheDocument()
        expect(icon!.getAttribute('name')).toBe('IconStar')
        expect(icon).toHaveClass('transition--scale-entered')
      },
      { timeout: 500 }
    )
  })

  it('transitions when filled after render and animateFill is true', async () => {
    const { container, rerender } = render(
      <InstUISettingsProvider
        theme={{
          componentOverrides: {
            Transition: {
              duration: '100ms'
            }
          }
        }}
      >
        <RatingIcon filled={false} animateFill={true} />
      </InstUISettingsProvider>
    )
    await waitFor(
      () => {
        const icon = container.querySelector('svg')

        expect(icon).toBeInTheDocument()
        expect(icon!.getAttribute('name')).toBe('IconStarLight')
        expect(icon).not.toHaveClass('transition--scale-entered')
      },
      { timeout: 500 }
    )

    rerender(
      <InstUISettingsProvider
        theme={{
          componentOverrides: {
            Transition: {
              duration: '100ms'
            }
          }
        }}
      >
        <RatingIcon filled={true} animateFill={true} />
      </InstUISettingsProvider>
    )

    await waitFor(
      () => {
        const icon = container.querySelector('svg')

        expect(icon).toBeInTheDocument()
        expect(icon!.getAttribute('name')).toBe('IconStar')
        expect(icon).toHaveClass('transition--scale-entered')
      },
      { timeout: 500 }
    )
  })

  it('should meet a11y standards', async () => {
    const { container } = render(<RatingIcon filled animateFill />)

    const axeCheck = await runAxeCheck(container)
    expect(axeCheck).toBe(true)
  })
})
