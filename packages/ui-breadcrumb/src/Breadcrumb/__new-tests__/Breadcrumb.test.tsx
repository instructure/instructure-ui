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

import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import type { MockInstance } from 'vitest'
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

describe('<Breadcrumb />', () => {
  let consoleWarningMock: ReturnType<typeof vi.spyOn>
  let consoleErrorMock: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    // Mocking console to prevent test output pollution and expect for messages
    consoleWarningMock = vi
      .spyOn(console, 'warn')
      .mockImplementation(() => {}) as MockInstance
    consoleErrorMock = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {}) as MockInstance
  })

  afterEach(() => {
    consoleWarningMock.mockRestore()
    consoleErrorMock.mockRestore()
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

  it('should add aria-current="page" to the last element by default', () => {
    const { container } = render(
      <Breadcrumb label={TEST_LABEL}>
        <Breadcrumb.Link href={TEST_LINK}>{TEST_TEXT_01}</Breadcrumb.Link>
        <Breadcrumb.Link>{TEST_TEXT_02}</Breadcrumb.Link>
      </Breadcrumb>
    )
    const links = container.querySelectorAll('[class$="--block-link"]')
    const firstLink = links[0]
    const lastLink = links[links.length - 1]

    expect(firstLink).not.toHaveAttribute('aria-current', 'page')
    expect(lastLink).toHaveAttribute('aria-current', 'page')
  })

  it('should add aria-current="page" to the element if isCurrent is true', () => {
    const { container } = render(
      <Breadcrumb label={TEST_LABEL}>
        <Breadcrumb.Link isCurrentPage href={TEST_LINK}>
          {TEST_TEXT_01}
        </Breadcrumb.Link>
        <Breadcrumb.Link>{TEST_TEXT_02}</Breadcrumb.Link>
      </Breadcrumb>
    )
    const links = container.querySelectorAll('[class$="--block-link"]')
    const firstLink = links[0]
    const lastLink = links[links.length - 1]

    expect(firstLink).toHaveAttribute('aria-current', 'page')
    expect(lastLink).not.toHaveAttribute('aria-current', 'page')
  })

  it('should throw a warning when multiple elements have isCurrent set to true', () => {
    render(
      <Breadcrumb label={TEST_LABEL}>
        <Breadcrumb.Link isCurrentPage href={TEST_LINK}>
          {TEST_TEXT_01}
        </Breadcrumb.Link>
        <Breadcrumb.Link isCurrentPage>{TEST_TEXT_02}</Breadcrumb.Link>
      </Breadcrumb>
    )

    expect(consoleWarningMock).toHaveBeenCalledWith(
      expect.stringContaining(
        'Warning: Multiple elements with isCurrentPage=true found. Only one element should be set to current.'
      )
    )
  })

  it('should not add aria-current="page" to the last element if it set to false', () => {
    const { container } = render(
      <Breadcrumb label={TEST_LABEL}>
        <Breadcrumb.Link href={TEST_LINK}>{TEST_TEXT_01}</Breadcrumb.Link>
        <Breadcrumb.Link isCurrentPage={false}>{TEST_TEXT_02}</Breadcrumb.Link>
      </Breadcrumb>
    )
    const links = container.querySelectorAll('[class$="--block-link"]')
    const firstLink = links[0]
    const lastLink = links[links.length - 1]

    expect(firstLink).not.toHaveAttribute('aria-current', 'page')
    expect(lastLink).not.toHaveAttribute('aria-current', 'page')
  })
})
