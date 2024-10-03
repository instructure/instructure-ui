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
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'

import { InlineList } from '../index'
import { runAxeCheck } from '@instructure/ui-axe-check'

describe('<InlineList />', () => {
  let consoleWarningMock: ReturnType<typeof vi.spyOn>
  let consoleErrorMock: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    // Mocking console to prevent test output pollution and expect for messages
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

  it('should render list items and filter out null/falsy children', async () => {
    render(
      <InlineList>
        <InlineList.Item>List item 1</InlineList.Item>
        <InlineList.Item>List item 2</InlineList.Item>
        <InlineList.Item>List item 3</InlineList.Item>
        <InlineList.Item>List item 4</InlineList.Item>
        {null}
        {false}
      </InlineList>
    )
    const listItems = screen.getAllByRole('listitem')

    expect(listItems.length).toEqual(4)
  })

  it('should render a delimiter when delimiter="pipe"', async () => {
    const { container } = render(
      <InlineList delimiter="pipe">
        <InlineList.Item>List item 1</InlineList.Item>
        <InlineList.Item>List item 2</InlineList.Item>
        <InlineList.Item>List item 3</InlineList.Item>
        <InlineList.Item>List item 4</InlineList.Item>
      </InlineList>
    )
    const delimiters = container.querySelectorAll('span[aria-hidden="true"]')

    expect(delimiters.length).toEqual(4)
    delimiters.forEach((delimiter) => {
      expect(delimiter.getAttribute('class')).toContain(
        'inlineListItem__delimiter'
      )
    })
  })

  it('should warn when itemSpacing is set when delimiter is set to anything other than none', async () => {
    render(
      <InlineList delimiter="pipe" itemSpacing="large">
        <InlineList.Item>List item 1</InlineList.Item>
        <InlineList.Item>List item 2</InlineList.Item>
        <InlineList.Item>List item 3</InlineList.Item>
        <InlineList.Item>List item 4</InlineList.Item>
      </InlineList>
    )
    const warning = `Warning: [InlineList] \`itemSpacing\` has no effect inside Lists with the \`delimiter\` prop set to anything other than \`none\`.`

    expect(consoleErrorMock.mock.calls[0][0]).toBe(warning)
  })

  it('should render an ordered list', async () => {
    render(
      <InlineList as="ol">
        <InlineList.Item>List item 1</InlineList.Item>
        <InlineList.Item>List item 2</InlineList.Item>
        <InlineList.Item>List item 3</InlineList.Item>
        <InlineList.Item>List item 4</InlineList.Item>
      </InlineList>
    )
    const list = screen.getByRole('list')

    expect(list.tagName).toBe('OL')
  })

  it('should meet a11y standards', async () => {
    const { container } = render(
      <InlineList>
        <InlineList.Item>List item 1</InlineList.Item>
        <InlineList.Item>List item 2</InlineList.Item>
        <InlineList.Item>List item 3</InlineList.Item>
        <InlineList.Item>List item 4</InlineList.Item>
      </InlineList>
    )
    const axeCheck = await runAxeCheck(container)

    expect(axeCheck).toBe(true)
  })
})
