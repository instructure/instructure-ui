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
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'

import '@testing-library/jest-dom'
import { SubNav } from '../index'

const menuItems = [
  { title: 'Home', href: 'www.google.com', selected: true },
  { title: 'Announcements', href: 'http://www.google.com', selected: false },
  { title: 'Assignments', href: 'https://instructure.design/', selected: false }
]

describe('<SubNav />', () => {
  it('should render SubNav', async () => {
    const {container} = render(
      <SubNav
        menuItems={menuItems}
      />
    )
    const subNav = container.querySelector('[class$="-subNavContainer"]')

    expect(subNav).toBeInTheDocument()
  })

  it('should render items', async () => {
    const {container} = render(
      <SubNav
        menuItems={menuItems}
      />
    )
    const items = container.querySelectorAll('[class$="-subNavLinkContainer"]')

    expect(items.length).toBe(3)
    expect(items[0]).toHaveTextContent('Home')
    expect(items[1]).toHaveTextContent('Announcements')
    expect(items[2]).toHaveTextContent('Assignments')
  })

  it('should render items as links with correct href attributes', async () => {
    const {container} = render(
      <SubNav
        menuItems={menuItems}
      />
    )
    const links = container.querySelectorAll('[class$="-link"]')

    expect(links.length).toBe(3)

    expect(links[0].tagName).toBe('A')
    expect(links[0]).toHaveAttribute('href', 'www.google.com')

    expect(links[1].tagName).toBe('A')
    expect(links[1]).toHaveAttribute('href', 'http://www.google.com')

    expect(links[2].tagName).toBe('A')
    expect(links[2]).toHaveAttribute('href', 'https://instructure.design/')
  })

  it('should apply a border to the selected menu item', async () => {
    const {container} = render(
      <SubNav
        menuItems={menuItems}
      />
    )
    screen.debug()
    const links = container.querySelectorAll('[class$="-link"]')

    for (const link of links) {
      if (link.textContent === 'Home') {
        expect(link.parentElement).toHaveStyle({ 'border-left': '3px solid' })
        // TODO expect(link).toHaveAttribute('aria-selected', 'true') kap külön jelölést?
      } else {
        expect(link.parentElement).not.toHaveStyle({ 'border-left': '3px solid' })
      }
    }
  })

  it('should call onClick when item is clicked', async () => {
    const onClickMock = vi.fn()

    render(
      <SubNav
        menuItems={[
          { title: 'Home', href: 'www.google.com', selected: true, onClick: onClickMock },
          { title: 'Announcements', href: 'http://www.google.com', selected: false },
          { title: 'Assignments', href: 'https://instructure.design/', selected: false }
        ]}
      />
    )
    const item = screen.getByText('Home')

    await userEvent.click(item)

    await waitFor(() => {
      expect(onClickMock).toHaveBeenCalled()
    })
  })
})
