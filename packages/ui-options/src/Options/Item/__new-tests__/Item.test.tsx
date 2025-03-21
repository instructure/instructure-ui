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

import { render, screen, waitFor } from '@testing-library/react'
import { vi, expect } from 'vitest'
import userEvent from '@testing-library/user-event'

import '@testing-library/jest-dom'
import { IconCheckSolid } from '@instructure/ui-icons'
import { Options } from '../../index'
import { Item } from '../index'

describe('<Item />', () => {
  it('should render', async () => {
    const { container } = render(<Item />)

    const optionItem = container.querySelector('[class$="-optionItem"]')
    expect(optionItem).toBeInTheDocument()

    const optionItemContainer = optionItem!.querySelector(
      '[class$="-optionItem__container"]'
    )
    expect(optionItemContainer).toBeInTheDocument()
  })

  it('should not render as a list item by default', async () => {
    const { container } = render(<Item>Hello World</Item>)

    const item = container.querySelector('[class$="-optionItem"]')

    expect(item).toBeInTheDocument()
    expect(item!.tagName).not.toBe('LI')
  })

  it('should render designated tag if `as` prop is specified', async () => {
    const { container } = render(<Item as="li">Hello World</Item>)

    const item = container.querySelector('[class$="-optionItem"]')

    expect(item).toBeInTheDocument()
    expect(item!.tagName).toBe('LI')
  })

  it('should render children properly', async () => {
    const { container } = render(
      <Item>
        <span id="customContent">Hello World</span>
      </Item>
    )

    const item = container.querySelector('[class$="-optionItem"]')
    const customContent = item!.querySelector('#customContent')

    expect(customContent).toHaveTextContent('Hello World')
  })

  it('should render role attributes appropriately when given a role', async () => {
    const { container } = render(<Item role="option">Hello World</Item>)

    const item = container.querySelector('[class$="-optionItem"]')
    const child = screen.getByRole('option')

    expect(item).toHaveAttribute('role', 'none')
    expect(child).toBeInTheDocument()
  })

  it('should render description properly', async () => {
    const { container } = render(
      <Item description="Some text as description">
        <span id="customContent">Hello World</span>
      </Item>
    )
    const item = container.querySelector('[class$="-optionItem"]')

    const customContent = item!.querySelector('#customContent')
    const description = item!.querySelector('[class$="__description"]')

    expect(customContent).toHaveTextContent('Hello World')
    expect(description).toHaveTextContent('Some text as description')
  })

  it('should render role attributes for description', async () => {
    render(
      <Item description="Some text as description" descriptionRole="comment">
        Hello World
      </Item>
    )
    const description = screen.getByRole('comment')

    expect(description).toBeInTheDocument()
    expect(description).toHaveTextContent('Some text as description')
  })

  it('should pass props through to label', async () => {
    const { container } = render(
      <Item role="option" tabIndex={-1} data-custom-attr="true">
        Hello World
      </Item>
    )
    const optionItem = container.querySelector('[class$="-optionItem"]')
    const optionItemContainer = optionItem!.querySelector(
      '[class$="-optionItem__container"]'
    )

    expect(optionItem).toHaveRole('none')
    expect(optionItemContainer).toHaveRole('option')
    expect(optionItemContainer).toHaveAttribute('tabindex', '-1')
    expect(optionItemContainer).toHaveAttribute('data-custom-attr', 'true')
  })

  it('should pass event handlers through to label', async () => {
    const onClick = vi.fn()
    const { container } = render(<Item onClick={onClick}>Hello World</Item>)

    const optionItem = container.querySelector('[class$="-optionItem"]')
    const optionItemContainer = container.querySelector(
      '[class$="-optionItem__container"]'
    )

    userEvent.click(optionItem!)
    await waitFor(() => {
      expect(onClick).not.toHaveBeenCalled()
    })

    userEvent.click(optionItemContainer!)
    await waitFor(() => {
      expect(onClick).toHaveBeenCalledTimes(1)
    })
  })

  it('should render content before label', async () => {
    const { container } = render(
      <Item renderBeforeLabel={<IconCheckSolid />}>Hello World</Item>
    )

    const content = container.querySelector(
      '[class$=-optionItem__content--before]'
    )
    expect(content).toBeInTheDocument()

    const icon = content!.querySelector('svg[name="IconCheck"]')
    expect(icon).toBeInTheDocument()
  })

  it('should render content after label', async () => {
    const { container } = render(
      <Item renderAfterLabel={<IconCheckSolid />}>Hello World</Item>
    )

    const content = container.querySelector(
      '[class$=-optionItem__content--after]'
    )
    expect(content).toBeInTheDocument()

    const icon = content!.querySelector('svg[name="IconCheck"]')
    expect(icon).toBeInTheDocument()
  })

  it('should render nested lists', async () => {
    const { container } = render(
      <Item>
        <Options as="ul" renderLabel={'Nested list'}>
          <Item>Sub item</Item>
        </Options>
      </Item>
    )

    const item = container.querySelector('span[class$="-optionItem"]')
    expect(item).toBeInTheDocument()

    const options = item!.querySelector('div[class$="-options"]')
    expect(options).toBeInTheDocument()

    const nestedList = options!.querySelector('ul')
    const nestedItem = options!.querySelector('li[class$="-optionItem"]')

    expect(nestedList).toBeInTheDocument()
    expect(nestedItem).toBeInTheDocument()
    expect(nestedItem).toHaveTextContent('Sub item')
  })

  it('should render as link with href prop', async () => {
    const { container } = render(<Item href="/helloWorld">Hello World</Item>)

    const link = container.querySelector('[class$="-optionItem__container"]')

    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/helloWorld')
    expect(link?.tagName).toBe('A')
  })
})
