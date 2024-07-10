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

import React, { ComponentType } from 'react'
import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import '@testing-library/jest-dom'

import { Byline } from '../index'
import { BylineProps } from '../props'
import { runAxeCheck } from '@instructure/ui-axe-check'
import { View } from '@instructure/ui-view'

const TEST_TITLE = 'Test-title'
const TEST_DESCRIPTION = 'Test-description'
const TEST_HEADING = 'Test-heading'
const TEST_PARAGRAPH = 'Lorem Ipsum...'
const TEST_LINK = 'http://instructure-test.com'
const TEST_IMAGE = (
  <img
    alt=""
    src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
  />
)

const initProps = {
  title: TEST_TITLE,
  description: TEST_DESCRIPTION
}

const renderByline = (props: Partial<BylineProps> = { ...initProps }) => {
  return render(<Byline {...props}>{TEST_IMAGE}</Byline>)
}

const originalOmitViewProps = View.omitViewProps

describe('<Byline />', () => {
  let consoleWarningMock: ReturnType<typeof vi.spyOn>
  let consoleErrorMock: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    // Mocking console to prevent test output pollution
    consoleWarningMock = vi
      .spyOn(console, 'warn')
      .mockImplementation(() => {}) as any
    consoleErrorMock = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {}) as any
  })

  afterEach(() => {
    consoleWarningMock.mockRestore()
    consoleErrorMock.mockRestore()
  })

  beforeAll(() => {
    // View component read Component.name instead of Component.displayName
    // causing [undefined] in error messages
    type BylineComponentType = ComponentType & {
      name: 'Byline'
    }

    View.omitViewProps = (props, Component) => {
      const ModifiedComponent = {
        ...Component,
        name: 'Byline'
      } as BylineComponentType
      return originalOmitViewProps(props, ModifiedComponent)
    }
  })

  afterAll(() => {
    View.omitViewProps = originalOmitViewProps
  })

  it('should render', () => {
    const { container } = renderByline()

    expect(container.firstChild).toBeInTheDocument()
  })

  it('should pass down div and its contents via the description property', () => {
    const descriptionElement = (
      <div>
        <h2>
          <a href={TEST_LINK}>{TEST_HEADING}</a>
        </h2>
        <p>{TEST_PARAGRAPH}</p>
      </div>
    )
    renderByline({ description: descriptionElement })
    const clickableHeading = screen.getByText(TEST_HEADING)
    const descriptionText = screen.getByText(TEST_PARAGRAPH)

    expect(clickableHeading.tagName).toBe('A')
    expect(clickableHeading).toHaveAttribute('href', TEST_LINK)
    expect(clickableHeading?.parentElement?.tagName).toBe('H2')

    expect(descriptionText).toBeInTheDocument()
    expect(descriptionText.tagName).toBe('P')
  })

  it('should meet a11y standards', async () => {
    const { container } = renderByline()
    const axeCheck = await runAxeCheck(container)

    expect(axeCheck).toBe(true)
  })

  it(`should render a figure by default`, () => {
    renderByline()
    const figureElement = screen.getByRole('figure')

    expect(figureElement).toBeInTheDocument()
  })

  describe('when passing down props to View', () => {
    const customAllowedProps: { [key: string]: string } = { margin: 'small' }
    const customIgnoredProps = ['elementRef', 'children']

    const allProps = View.allowedProps as Array<string>
    const testPropsToAllow = Object.keys(customAllowedProps)
    const testPropsToDisallow = allProps.filter((prop) => {
      return !(prop in customAllowedProps) && !customIgnoredProps.includes(prop)
    })

    testPropsToAllow.forEach((prop) => {
      it(`should allow the '${prop}' prop`, () => {
        renderByline({ [prop]: customAllowedProps[prop] })

        expect(consoleErrorMock).not.toHaveBeenCalled()
      })
    })

    testPropsToDisallow.forEach((prop) => {
      it(`should NOT allow the '${prop}' prop`, () => {
        renderByline({ [prop]: 'foo' })
        const expectedWarningMessage = `Warning: [Byline] prop '${prop}' is not allowed.`
        const warningMessage = consoleErrorMock.mock.calls[0][0]

        expect(warningMessage).toBe(expectedWarningMessage)
        expect(consoleErrorMock).toHaveBeenCalledTimes(1)
      })
    })
  })
})
