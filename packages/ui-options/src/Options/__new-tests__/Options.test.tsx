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
import { vi, expect } from 'vitest'
import { runAxeCheck } from '@instructure/ui-axe-check'

// eslint-disable-next-line no-restricted-imports
import { generateA11yTests } from '@instructure/ui-scripts/lib/test/generateA11yTests'
import '@testing-library/jest-dom'
import { Options } from '../index'
import OptionsExamples from '../__examples__/Options.examples'

describe('<Options />', () => {
  it('should render', async () => {
    const { container } = render(<Options />)

    const options = container.querySelector('div[class$="-options"]')

    expect(options).toBeInTheDocument()
  })

  it('should render items', async () => {
    render(
      <Options>
        <Options.Item>Option one</Options.Item>
        <Options.Item>Option two</Options.Item>
      </Options>
    )
    const items = screen.getAllByRole('listitem')

    expect(items.length).toBe(2)
  })

  it('should provide elementRef', async () => {
    const elementRef = vi.fn()

    render(
      <Options elementRef={elementRef} as="ul">
        <Options.Item>Option one</Options.Item>
        <Options.Item>Option two</Options.Item>
      </Options>
    )
    const optionList = screen.getByRole('list')

    expect(elementRef).toHaveBeenCalledWith(optionList)
  })

  it('should render designated tag if `as` prop is specified', async () => {
    render(
      <Options as="ol">
        <Options.Item>Option one</Options.Item>
        <Options.Item>Option two</Options.Item>
      </Options>
    )
    const optionList = screen.getByRole('list')

    expect(optionList.tagName).toBe('OL')
  })

  it('should render children as listitems when appropriate', async () => {
    const { container } = render(
      <Options as="ul">
        <Options.Item>Option one</Options.Item>
        <Options.Item>Option two</Options.Item>
      </Options>
    )
    const list = container.querySelector('ul')
    const items = container.querySelectorAll('li')

    expect(list).toBeInTheDocument()
    expect(items.length).toBe(2)
  })

  it('should pass props through to list', async () => {
    const { container } = render(
      <Options as="ul" role="listbox" data-custom-attr="true">
        <Options.Item>Option one</Options.Item>
        <Options.Item>Option two</Options.Item>
      </Options>
    )
    const options = container.querySelector('[class$="-options__list"]')

    expect(options).toHaveRole('listbox')
    expect(options).toHaveAttribute('data-custom-attr', 'true')
  })

  it('should render root with appropriate role', async () => {
    const { container } = render(
      <Options role="listbox">
        <Options.Item>Option one</Options.Item>
        <Options.Item>Option two</Options.Item>
      </Options>
    )
    const options = container.querySelector('div[class$="-options"]')

    expect(options).toHaveAttribute('role', 'presentation')
  })

  it('should allow null children', async () => {
    render(<Options />)

    const options = screen.getByRole('list')

    expect(options).toBeInTheDocument()
  })

  it('should render nested options properly', async () => {
    const { container } = render(
      <Options data-testId="outer-list">
        <Options.Item>Option one </Options.Item>
        <Options.Item>Option two </Options.Item>
        <Options renderLabel={'Nested list'} data-testId="nested-list">
          <Options.Item>Nested option one </Options.Item>
          <Options.Item>Nested option two </Options.Item>
        </Options>
      </Options>
    )

    const allLists = container.querySelectorAll('[class$="-options__list"]')
    const allItems = container.querySelectorAll('[class$="-optionItem"]')
    expect(allLists.length).toBe(2)
    expect(allItems.length).toBe(5)

    const outerList = screen.getByTestId('outer-list')
    expect(outerList).toHaveTextContent('Option one Option two')

    const nestedLabel = outerList.querySelector(
      '[class$=-options__label]'
    ) as HTMLElement
    expect(nestedLabel).toBeInTheDocument()
    expect(nestedLabel).toHaveTextContent('Nested list')

    const nestedList = screen.getByTestId('nested-list')
    expect(nestedList).toHaveTextContent('Nested option one Nested option two')

    const nestedListItems = nestedList!.querySelectorAll('[class$=-optionItem]')
    expect(nestedListItems.length).toBe(2)

    expect(outerList).toContainElement(nestedLabel)
    expect(outerList).toContainElement(nestedList)
  })

  describe('with generated examples', () => {
    const generatedComponents = generateA11yTests(Options, OptionsExamples)

    for (const component of generatedComponents) {
      it(component.description, async () => {
        const { container } = render(component.content)

        // axe-check is more strict now, and expects "list" role to have "listitem" children, but we use "role='none'" children. After discussing it with the A11y team, we agreed to ignore this error because the screen readers can read the component perfectly.
        // TODO: try to remove this ignore if axe-check is updated and isn't this strict anymore
        // https://dequeuniversity.com/rules/axe/4.6/aria-required-children?application=axeAPI
        const axeCheck = await runAxeCheck(container, {
          ignores: ['aria-required-children']
        })

        expect(axeCheck).toBe(true)
      })
    }
  })

  describe('for a11y', () => {
    it('should be accessible with links', async () => {
      const { container } = render(
        <Options>
          <Options.Item>Option</Options.Item>
          <Options.Item href="/">Option link</Options.Item>
        </Options>
      )

      // axe-check is more strict now, and expects "list" role to have "listitem" children, but we use "role='none'" children. After discussing it with the A11y team, we agreed to ignore this error because the screen readers can read the component perfectly.
      // TODO: try to remove this ignore if axe-check is updated and isn't this strict anymore
      // https://dequeuniversity.com/rules/axe/4.6/aria-required-children?application=axeAPI
      const axeCheck = await runAxeCheck(container, {
        ignores: ['aria-required-children']
      })

      expect(axeCheck).toBe(true)
    })
  })
})
