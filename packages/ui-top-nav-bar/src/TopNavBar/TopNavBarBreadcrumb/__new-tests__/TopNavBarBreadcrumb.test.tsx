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
import { fireEvent, render } from '@testing-library/react'
import { vi } from 'vitest'
import type { MockInstance } from 'vitest'
import '@testing-library/jest-dom'

// eslint-disable-next-line no-restricted-imports
import { runAxeCheck } from '@instructure/ui-axe-check'
import { TopNavBarBreadcrumb } from '../index'
import { Breadcrumb } from '@instructure/ui-breadcrumb'
import TopNavBarContext from '../../TopNavBarContext'

let originalMatchMedia: typeof window.matchMedia

beforeAll(() => {
  originalMatchMedia = window.matchMedia

  window.matchMedia = vi.fn().mockImplementation((query) => {
    return {
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn()
    }
  })
})

afterAll(() => {
  window.matchMedia = originalMatchMedia
})

const TEST_BREADCRUMB_LABEL = 'You are here:'

const BaseExample = (props: {
  inverseColor: boolean
  layout: 'desktop' | 'smallViewport'
  onClick?: () => void
}) => {
  return (
    <TopNavBarContext.Provider
      value={{
        layout: props.layout,
        inverseColor: props.inverseColor
      }}
    >
      <TopNavBarBreadcrumb onClick={props.onClick}>
        <Breadcrumb label={TEST_BREADCRUMB_LABEL}>
          <Breadcrumb.Link>Course page 1</Breadcrumb.Link>
          <Breadcrumb.Link>Course page 2</Breadcrumb.Link>
          <Breadcrumb.Link>Course page 3</Breadcrumb.Link>
          <Breadcrumb.Link href="https://www.instructure.com">
            Course page 4
          </Breadcrumb.Link>
          <Breadcrumb.Link>Course page 5</Breadcrumb.Link>
        </Breadcrumb>
      </TopNavBarBreadcrumb>
    </TopNavBarContext.Provider>
  )
}

BaseExample.defaultProps = {
  inverseColor: true,
  layout: 'desktop',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onClick: () => {}
}

describe('<TopNavBarBreadcrumb />', () => {
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

  it('should render', () => {
    const { getByLabelText } = render(
      <BaseExample inverseColor={true} layout="desktop" />
    )

    const element = getByLabelText(TEST_BREADCRUMB_LABEL)

    expect(element).toBeInTheDocument()
  })

  it('should warn if inverseColor is false', () => {
    const { queryByLabelText } = render(
      <BaseExample inverseColor={false} layout="desktop" />
    )

    const element = queryByLabelText(TEST_BREADCRUMB_LABEL)

    expect(element).not.toBeInTheDocument()
    expect(consoleErrorMock.mock.calls[0][0]).toEqual(
      'Warning: [TopNavBarBreadcrumb] If the inverseColor prop is not set to true, TopNavBarBreadcrumb fails to render.'
    )
  })

  it('should render last but one crumb in smallViewPort mode', () => {
    const { queryByText } = render(
      <BaseExample inverseColor={true} layout="smallViewport" />
    )

    const page1 = queryByText('Course page 1')
    const page2 = queryByText('Course page 2')
    const page3 = queryByText('Course page 3')
    const page4 = queryByText('Course page 4')
    const page5 = queryByText('Course page 5')

    expect(page1).not.toBeInTheDocument()
    expect(page2).not.toBeInTheDocument()
    expect(page3).not.toBeInTheDocument()
    expect(page4).toBeInTheDocument()
    expect(page5).not.toBeInTheDocument()
  })

  it('should fire onClick', () => {
    const onClick = vi.fn()

    const { getByRole } = render(
      <BaseExample inverseColor={true} layout="desktop" onClick={onClick} />
    )

    const hamburger = getByRole('button')
    expect(hamburger).toBeInTheDocument()

    fireEvent.click(hamburger)

    expect(onClick).toHaveBeenCalled()
  })

  describe('should be accessible', () => {
    it('a11y', async () => {
      const { container } = render(
        <BaseExample inverseColor={true} layout="desktop" />
      )
      const axeCheck = await runAxeCheck(container)

      expect(axeCheck).toBe(true)
    })
  })
})
