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
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

// eslint-disable-next-line no-restricted-imports
import { generateA11yTests } from '@instructure/ui-scripts/lib/test/generateA11yTests'
import { runAxeCheck } from '@instructure/ui-axe-check'
import { Breadcrumb } from '../index'
import BreadcrumbExamples from '../__examples__/Breadcrumb.examples'

const TEST_LABEL = 'You are here:'
const TEST_TEXT_01 = 'Account'
const TEST_TEXT_02 = 'Settings'
const TEST_LINK = 'http://instructure-test.com'

const originalResizeObserver = global.ResizeObserver

describe('<Breadcrumb />', () => {
  beforeAll(() => {
    // Mock for ResizeObserver browser API
    global.ResizeObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn()
    }))
  })

  it('should be accessible', async () => {
    const { container } = render(
      <Breadcrumb label={TEST_LABEL}>
        <Breadcrumb.Link href={TEST_LINK}>{TEST_TEXT_01}</Breadcrumb.Link>
        <Breadcrumb.Link>{TEST_TEXT_02}</Breadcrumb.Link>
      </Breadcrumb>
    )
    const axeCheck = await runAxeCheck(container)

    expect(axeCheck).toBe(true)
  })

  describe('with generated examples', () => {
    const generatedComponents = generateA11yTests(
      Breadcrumb,
      BreadcrumbExamples
    )

    it.each(generatedComponents)(
      'should be accessible with example: $description',
      async ({ content }) => {
        const { container } = render(content)
        const axeCheck = await runAxeCheck(container)
        expect(axeCheck).toBe(true)
      }
    )
  })

  it('should render the label as an aria-label attribute', () => {
    render(
      <Breadcrumb label={TEST_LABEL}>
        <Breadcrumb.Link>{TEST_TEXT_01}</Breadcrumb.Link>
      </Breadcrumb>
    )

    const label = screen.getByLabelText(TEST_LABEL)

    expect(label).toBeInTheDocument()
    expect(label).toHaveAttribute('aria-label', TEST_LABEL)
  })

  it('should render an icon as a separator', () => {
    const { container } = render(
      <Breadcrumb label={TEST_LABEL}>
        <Breadcrumb.Link href={TEST_LINK}>{TEST_TEXT_01}</Breadcrumb.Link>
        <Breadcrumb.Link>{TEST_TEXT_02}</Breadcrumb.Link>
      </Breadcrumb>
    )
    const icon = container.querySelector('svg')

    expect(icon).toBeInTheDocument()
    expect(icon).toHaveAttribute('aria-hidden', 'true')
  })

  afterAll(() => {
    global.ResizeObserver = originalResizeObserver
  })
})
