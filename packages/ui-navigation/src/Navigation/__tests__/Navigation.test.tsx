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
import { mount, expect } from '@instructure/ui-test-utils'

import { Badge } from '@instructure/ui-badge'
import { IconAdminLine, IconDashboardLine } from '@instructure/ui-icons'

import { Navigation, NavigationItem } from '../index'
import { NavigationLocator } from '../NavigationLocator'

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('<Navigation />', async () => {
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should render', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <Navigation
        label="Main navigation"
        toggleLabel={{
          expandedLabel: 'Minimize Navigation',
          minimizedLabel: 'Expand Navigation'
        }}
      >
        <NavigationItem
          icon={<IconDashboardLine />}
          label="Dashboard"
          href="#"
        />
      </Navigation>
    )

    const nav = await NavigationLocator.find()
    expect(nav).to.exist()
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should render a single semantic nav element', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <Navigation
        label="Main navigation"
        toggleLabel={{
          expandedLabel: 'Minimize Navigation',
          minimizedLabel: 'Expand Navigation'
        }}
      >
        <NavigationItem
          icon={<IconDashboardLine />}
          label="Dashboard"
          href="#"
        />
      </Navigation>
    )
    const nav = await NavigationLocator.find()
    expect(nav).to.contain('nav')
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should render a semantic list for the nav content', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <Navigation
        label="Main navigation"
        toggleLabel={{
          expandedLabel: 'Minimize Navigation',
          minimizedLabel: 'Expand Navigation'
        }}
      >
        <NavigationItem
          icon={<IconDashboardLine />}
          label="Dashboard"
          href="#"
        />
        <NavigationItem
          icon={
            <Badge count={99}>
              <IconAdminLine />
            </Badge>
          }
          label="Inbox"
          href="#"
        />
      </Navigation>
    )
    const nav = await NavigationLocator.find()
    const list = await nav.findAll('ul')
    const items = await nav.findAll('li')

    expect(list).to.have.length(1)
    expect(items).to.have.length(2)
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should switch aria-expanded when the Toggle Navigation button is clicked', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <Navigation
        label="Main navigation"
        toggleLabel={{
          expandedLabel: 'Minimize Navigation',
          minimizedLabel: 'Expand Navigation'
        }}
      >
        <NavigationItem
          icon={<IconDashboardLine />}
          label="Dashboard"
          href="#"
        />
        <NavigationItem
          icon={
            <Badge count={99}>
              <IconAdminLine />
            </Badge>
          }
          label="Inbox"
          href="#"
        />
      </Navigation>
    )
    const nav = await NavigationLocator.find()
    const toggle = await nav.find(':contains(Minimize Navigation):focusable')
    expect(toggle).to.have.attribute('aria-expanded', 'true')
    await toggle.click()
    expect(toggle).to.have.attribute('aria-expanded', 'false')
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should meet a11y standards', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <Navigation
        label="Main navigation"
        toggleLabel={{
          expandedLabel: 'Minimize Navigation',
          minimizedLabel: 'Expand Navigation'
        }}
      >
        <NavigationItem
          icon={<IconDashboardLine />}
          label="Dashboard"
          href="#"
        />
        <NavigationItem
          icon={
            <Badge count={99}>
              <IconAdminLine />
            </Badge>
          }
          label="Inbox"
          href="#"
        />
      </Navigation>
    )
    const nav = await NavigationLocator.find()
    expect(await nav.accessible()).to.be.true()
  })
})
