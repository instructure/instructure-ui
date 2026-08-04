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

import { render } from 'vitest-browser-react'
import { page, userEvent } from 'vitest/browser'
import { fireEvent } from '@testing-library/dom'
import { describe, it, vi, expect } from 'vitest'

import { IconCheckSolid } from '@instructure/ui-icons'
import { Options, OptionItem as Item } from '@instructure/ui-options/latest'

describe('<Item />', () => {
  it('should render', async () => {
    const { container } = await render(<Item />)

    const optionItem = container.querySelector('[class$="-optionItem"]')
    expect(optionItem).toBeInTheDocument()

    const optionItemContainer = optionItem!.querySelector(
      '[class$="-optionItem__container"]'
    )
    expect(optionItemContainer).toBeInTheDocument()
  })

  it('should not render as a list item by default', async () => {
    const { container } = await render(<Item>Hello World</Item>)

    const item = container.querySelector('[class$="-optionItem"]')

    expect(item).toBeInTheDocument()
    expect(item!.tagName).not.toBe('LI')
  })

  it('should render designated tag if `as` prop is specified', async () => {
    const { container } = await render(<Item as="li">Hello World</Item>)

    const item = container.querySelector('[class$="-optionItem"]')

    expect(item).toBeInTheDocument()
    expect(item!.tagName).toBe('LI')
  })

  it('should render children properly', async () => {
    const { container } = await render(
      <Item>
        <span id="customContent">Hello World</span>
      </Item>
    )

    const item = container.querySelector('[class$="-optionItem"]')
    const customContent = item!.querySelector('#customContent')

    expect(customContent).toHaveTextContent('Hello World')
  })

  it('should render role attributes appropriately when given a role', async () => {
    const { container } = await render(<Item role="option">Hello World</Item>)

    const item = container.querySelector('[class$="-optionItem"]')
    const child = page.getByRole('option').element()

    expect(item).toHaveAttribute('role', 'none')
    expect(child).toBeInTheDocument()
  })

  it('should render description properly', async () => {
    const { container } = await render(
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
    const { container } = await render(
      <Item description="Some text as description" descriptionRole="comment">
        Hello World
      </Item>
    )
    // `comment` isn't in the locator's role list, so query the attribute
    const description = container.querySelector('[role="comment"]')

    expect(description).toBeInTheDocument()
    expect(description).toHaveTextContent('Some text as description')
  })

  it('should pass props through to label', async () => {
    const { container } = await render(
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
    const { container } = await render(
      <Item onClick={onClick}>Hello World</Item>
    )

    const optionItem = container.querySelector('[class$="-optionItem"]')
    const optionItemContainer = container.querySelector(
      '[class$="-optionItem__container"]'
    )

    // the container fills the whole item, so a real click on the outer
    // element would land on the container: dispatch it directly instead
    fireEvent.click(optionItem!)
    await vi.waitFor(() => {
      expect(onClick).not.toHaveBeenCalled()
    })

    await userEvent.click(optionItemContainer!)
    await vi.waitFor(() => {
      expect(onClick).toHaveBeenCalledTimes(1)
    })
  })

  it('should render content before label', async () => {
    const { container } = await render(
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
    const { container } = await render(
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
    const { container } = await render(
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
    const { container } = await render(
      <Item href="/helloWorld">Hello World</Item>
    )

    const link = container.querySelector('[class$="-optionItem__container"]')

    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/helloWorld')
    expect(link?.tagName).toBe('A')
  })

  describe('Component tests', () => {
    it('should allow label to receive focus', async () => {
      const onFocus = vi.fn()
      const { container } = await render(
        <Item tabIndex={-1} onFocus={onFocus}>
          Hello World
        </Item>
      )
      const item = container.querySelector<HTMLElement>(
        'span[role="listitem"]'
      )!

      item.focus()

      await vi.waitFor(() => {
        expect(onFocus).toHaveBeenCalled()
      })
      await expect.element(page.getByText('Hello World')).toHaveFocus()
    })

    it('should render colored icon before label', async () => {
      const { container } = await render(
        <Item
          renderBeforeLabel={(props) => {
            return (
              <IconCheckSolid
                {...(props.variant === 'default' && { color: 'warning' })}
              />
            )
          }}
        >
          Hello World
        </Item>
      )
      const icon = container.querySelector(
        '[class$="-optionItem__content--before"] svg[name="IconCheck"]'
      )!

      expect(getComputedStyle(icon).color).toBe('rgb(207, 74, 0)')
    })

    it('should render colored icon after highlighted label', async () => {
      const { container } = await render(
        <Item
          variant="highlighted"
          renderAfterLabel={(props) => {
            return (
              <IconCheckSolid
                {...(props.variant === 'highlighted' && { color: 'success' })}
              />
            )
          }}
        >
          Hello World
        </Item>
      )
      const icon = container.querySelector(
        '[class$="-optionItem__content--after"] svg[name="IconCheck"]'
      )!

      expect(getComputedStyle(icon).color).toBe('rgb(3, 137, 61)')
    })
  })
})
