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

import { createRef } from 'react'
import { render } from 'vitest-browser-react'
import { page } from 'vitest/browser'
import { describe, it, expect, vi } from 'vitest'
import { runAxeCheck } from '@instructure/ui-axe-check'
import { InstUISettingsProvider } from '@instructure/emotion'
import { light } from '@instructure/ui-themes'

import { GlobalNav } from '@instructure/ui-global-nav/latest'

const requiredProps = {
  label: 'Main navigation',
  collapsed: false,
  onCollapse: vi.fn(),
  collapseLabel: 'Collapse navigation',
  expandLabel: 'Expand navigation',
  backLabel: (title: string) => `Back to ${title}`,
  closeSubNavLabel: 'Close sub navigation',
  expandSubNavLabel: 'Open sub navigation',
  items: [],
  logo: { name: 'Canvas' }
}

describe('<GlobalNav />', () => {
  it('should render a navigation landmark named by the label', async () => {
    await render(<GlobalNav {...requiredProps} />)
    const nav = page.getByRole('navigation', { name: 'Main navigation' })
    await expect.element(nav).toBeInTheDocument()
  })

  it('should forward the ref to the nav element', async () => {
    const ref = createRef<HTMLElement>()
    await render(<GlobalNav {...requiredProps} ref={ref} />)
    expect(ref.current?.tagName).toBe('NAV')
  })

  it('should be accessible', async () => {
    const { container } = await render(<GlobalNav {...requiredProps} />)
    const axeCheck = await runAxeCheck(container)
    expect(axeCheck).toBe(true)
  })
})

const icon = <svg aria-hidden="true" />

const items = [
  {
    itemID: 'dashboard',
    label: 'Dashboard',
    href: '/dashboard',
    icon,
    itemElementProps: {
      id: 'dashboard_menu_item',
      className: 'app-item',
      'data-item': 'dashboard'
    },
    labelElementProps: { className: 'app-label', 'data-label': 'dashboard' }
  },
  { itemID: 'hidden', label: 'Hidden', href: '/hidden', icon },
  { itemID: 'inbox', label: 'Inbox', href: '/inbox', icon },
  { itemID: 'help', label: 'Help', href: '/help', icon }
]

const subNav = {
  title: 'Courses',
  elementProps: { id: 'app_courses_tray', 'data-tray': 'courses' },
  listElementProps: { id: 'app_courses_list', 'data-list': 'courses' },
  items: [
    {
      itemID: 'biology',
      label: 'Biology',
      href: '/courses/1',
      itemElementProps: { className: 'app-tray-item', 'data-course': '1' },
      labelElementProps: {
        className: 'app-tray-label',
        'data-label': 'biology'
      }
    },
    { itemID: 'chemistry', label: 'Chemistry', href: '/courses/2' }
  ]
}

const subNavItems = [
  { itemID: 'courses', label: 'Courses', icon, subNav },
  ...items.slice(1)
]

describe('<GlobalNav /> element props', () => {
  it('should set the app attributes on the root, list, items and labels', async () => {
    const { container } = await render(
      <GlobalNav
        {...requiredProps}
        id="app_nav"
        data-nav="main"
        items={items}
        listElementProps={{
          id: 'app_menu',
          className: 'app-menu',
          'data-menu': 'main'
        }}
      />
    )

    const nav = container.querySelector('nav')!
    expect(nav.id).toBe('app_nav')
    expect(nav).toHaveAttribute('data-nav', 'main')

    const list = container.querySelector('ul')!
    expect(list.id).toBe('app_menu')
    expect(list).toHaveClass('app-menu')
    expect(list).toHaveAttribute('data-menu', 'main')

    const item = container.querySelector('li')!
    expect(item.id).toBe('dashboard_menu_item')
    expect(item).toHaveClass('app-item')
    expect(item).toHaveAttribute('data-item', 'dashboard')

    const label = container.querySelector('[data-label="dashboard"]')!
    expect(label).toHaveClass('app-label')
    expect(label.textContent).toBe('Dashboard')
  })

  it('should keep the label element when collapsed, with the same accessible name', async () => {
    const { container } = await render(
      <GlobalNav {...requiredProps} collapsed items={items} />
    )

    const label = container.querySelector('.app-label')
    expect(label).not.toBeNull()
    expect(label!.textContent).toBe('Dashboard')
    expect(
      label!.parentElement!.getBoundingClientRect().width
    ).toBeLessThanOrEqual(1)
    await expect
      .element(page.getByRole('link', { name: 'Dashboard', exact: true }))
      .toBeInTheDocument()

    const axeCheck = await runAxeCheck(container)
    expect(axeCheck).toBe(true)
  })

  it('should set the app attributes on the logo link and the logo without a link', async () => {
    const elementProps = {
      id: 'app_logo',
      className: 'app-logo',
      'data-logo': 'main'
    }
    const { container, rerender } = await render(
      <GlobalNav
        {...requiredProps}
        logo={{ name: 'Canvas', href: '/', elementProps }}
      />
    )
    const link = container.querySelector('[data-logo="main"]')!
    expect(link.tagName).toBe('A')
    expect(link.id).toBe('app_logo')
    expect(link).toHaveClass('app-logo')

    await rerender(
      <GlobalNav {...requiredProps} logo={{ name: 'Canvas', elementProps }} />
    )
    const div = container.querySelector('[data-logo="main"]')!
    expect(div.tagName).toBe('DIV')
    expect(div.id).toBe('app_logo')
    expect(div).toHaveClass('app-logo')
  })

  it('should keep an app class on the current item across re-renders', async () => {
    const withActiveClass = (currentID: string) =>
      items.map((item) => ({
        ...item,
        current: item.itemID === currentID,
        itemElementProps: {
          ...item.itemElementProps,
          'data-id': item.itemID,
          className: item.itemID === currentID ? 'app-active' : undefined
        }
      }))
    const { container, rerender } = await render(
      <GlobalNav {...requiredProps} items={withActiveClass('inbox')} />
    )
    const activeIDs = () =>
      Array.from(container.querySelectorAll('li.app-active')).map((li) =>
        li.getAttribute('data-id')
      )
    expect(activeIDs()).toEqual(['inbox'])

    await rerender(
      <GlobalNav
        {...requiredProps}
        collapsed
        items={withActiveClass('inbox')}
      />
    )
    expect(activeIDs()).toEqual(['inbox'])

    await rerender(
      <GlobalNav {...requiredProps} collapsed items={withActiveClass('help')} />
    )
    expect(activeIDs()).toEqual(['help'])
  })

  it('should keep InstUI attributes over app attributes on the logo', async () => {
    const elementProps: Record<string, string> = {
      'data-logo': 'main',
      href: '/other'
    }
    const { container } = await render(
      <GlobalNav
        {...requiredProps}
        logo={{ name: 'Canvas', href: '/', elementProps }}
      />
    )
    expect(container.querySelector('[data-logo="main"]')).toHaveAttribute(
      'href',
      '/'
    )
  })

  it('should set the app attributes on the collapse button', async () => {
    await render(
      <GlobalNav
        {...requiredProps}
        collapseButtonElementProps={{
          id: 'app_collapse',
          'data-collapse': 'rail'
        }}
      />
    )
    const button = page
      .getByRole('button', { name: 'Collapse navigation' })
      .element()
    expect(button.id).toBe('app_collapse')
    expect(button).toHaveAttribute('data-collapse', 'rail')
  })

  it('should set the app attributes on the SubNav panel, list and items', async () => {
    const { container } = await render(
      <GlobalNav {...requiredProps} items={subNavItems} openSubNav="courses" />
    )

    const panel = page.getByRole('navigation', { name: 'Courses' })
    await expect.element(panel).toHaveAttribute('id', 'app_courses_tray')
    await expect.element(panel).toHaveAttribute('data-tray', 'courses')
    await expect
      .element(page.getByRole('button', { name: 'Courses' }))
      .toHaveAttribute('aria-controls', 'app_courses_tray')

    const list = container.querySelector('#app_courses_list')!
    expect(list).toHaveAttribute('data-list', 'courses')

    const item = container.querySelector('[data-course="1"]')!
    expect(item.tagName).toBe('LI')
    expect(item).toHaveClass('app-tray-item')

    const label = container.querySelector('[data-label="biology"]')!
    expect(label).toHaveClass('app-tray-label')
    expect(label.textContent).toBe('Biology')
  })

  it('should keep the generated SubNav id without an app id', async () => {
    const { elementProps: _elementProps, ...subNavWithoutId } = subNav
    await render(
      <GlobalNav
        {...requiredProps}
        items={[
          { itemID: 'courses', label: 'Courses', icon, subNav: subNavWithoutId }
        ]}
        openSubNav="courses"
      />
    )
    const panel = page.getByRole('navigation', { name: 'Courses' }).element()
    expect(panel.id).not.toBe('')
    await expect
      .element(page.getByRole('button', { name: 'Courses' }))
      .toHaveAttribute('aria-controls', panel.id)
  })

  it('should keep InstUI attributes over app attributes on the SubNav panel', async () => {
    const elementProps: Record<string, string> = {
      id: 'app_courses_tray',
      'aria-labelledby': 'other'
    }
    await render(
      <GlobalNav
        {...requiredProps}
        items={[
          {
            itemID: 'courses',
            label: 'Courses',
            icon,
            subNav: { ...subNav, elementProps }
          }
        ]}
        openSubNav="courses"
      />
    )
    await expect
      .element(page.getByRole('navigation', { name: 'Courses' }))
      .toHaveAttribute('id', 'app_courses_tray')
  })

  it.each([false, true])(
    'should leave no space for an item whose link is hidden, collapsed: %s',
    async (collapsed) => {
      const style = document.createElement('style')
      style.textContent = '.app-hidden a { display: none; }'
      document.head.appendChild(style)

      const { container } = await render(
        <InstUISettingsProvider theme={light}>
          <GlobalNav
            {...requiredProps}
            collapsed={collapsed}
            items={items.map((item) =>
              item.itemID === 'hidden'
                ? { ...item, itemElementProps: { className: 'app-hidden' } }
                : item
            )}
          />
        </InstUISettingsProvider>
      )

      const listItems = container.querySelectorAll('ul > li')
      const [first, , third, fourth] = Array.from(listItems).map((li) =>
        li.querySelector('a')!.getBoundingClientRect()
      )

      const gap = fourth.top - third.bottom
      expect(gap).toBeGreaterThan(0)
      expect(listItems[1].getBoundingClientRect().height).toBe(0)
      expect(third.top - first.bottom).toBeCloseTo(gap)
      style.remove()
    }
  )
})
