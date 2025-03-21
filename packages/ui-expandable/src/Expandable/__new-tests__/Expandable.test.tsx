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

import { fireEvent, render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import '@testing-library/jest-dom'

import { Expandable } from '../index'

describe('<Expandable />', () => {
  it('should set expanded to false by default', () => {
    type RenderArgs = { expanded: boolean }
    const renderContent = vi.fn((_args: RenderArgs) => <div>hello</div>)

    render(<Expandable render={renderContent} />)

    expect(renderContent.mock.calls[0][0].expanded).toBe(false)
  })

  it('should correctly provide the aria-expanded attribute', () => {
    type RenderArgs = {
      getToggleProps: () => { 'aria-expanded': boolean }
    }

    const renderContent = vi.fn((args: RenderArgs) => {
      const toggleProps = args.getToggleProps()
      return <div {...toggleProps}>Toggle</div>
    })

    render(<Expandable render={renderContent} />)

    const ariaExpanded =
      renderContent.mock.calls[0][0].getToggleProps()['aria-expanded']

    expect(ariaExpanded).toBe(false)
  })

  it('should provide the toggle and details with a shared, unique id', () => {
    const renderContent = vi.fn(({ getToggleProps, getDetailsProps }) => (
      <>
        <div {...getToggleProps()}>Toggle</div>
        <div {...getDetailsProps()}>Details</div>
      </>
    ))

    render(<Expandable render={renderContent} />)

    const toggleProps = renderContent.mock.calls[0][0].getToggleProps()
    const detailsProps = renderContent.mock.calls[0][0].getDetailsProps()

    const toggleId = toggleProps['aria-controls']
    const detailsId = detailsProps['id']

    expect(toggleId).toBeDefined()
    expect(detailsId).toBeDefined()
    expect(toggleId).toEqual(detailsId)
  })

  it('should call onToggle when onClick is called', () => {
    const onToggle = vi.fn()

    const renderContent = vi.fn(({ getToggleProps }) => (
      <button {...getToggleProps()}>Toggle</button>
    ))

    render(
      <Expandable render={renderContent} onToggle={onToggle} expanded={false} />
    )

    const toggleButton = screen.getByText('Toggle')
    fireEvent.click(toggleButton)

    expect(onToggle).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'click' }),
      true
    )
  })

  it('should set expanded to true when defaultExpanded is true', () => {
    const renderContent = vi.fn(({ expanded }) => (
      <div>{expanded ? 'Expanded' : 'Collapsed'}</div>
    ))

    render(<Expandable render={renderContent} defaultExpanded={true} />)

    expect(renderContent.mock.calls[0][0].expanded).toBe(true)
  })
})
