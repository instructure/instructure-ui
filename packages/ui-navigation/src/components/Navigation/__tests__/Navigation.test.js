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
import Badge from '@instructure/ui-elements/lib/Badge'
import IconAdminLine from '@instructure/ui-icons/lib/IconAdminLine'
import IconDashboardLine from '@instructure/ui-icons/lib/IconDashboardLine'

import Navigation, { NavigationItem } from '../index'
import NavigationLocator from '../locator'

import styles from '../styles.css'

describe('<Navigation />', async () => {
  it('should render', async () => {
    await mount(
      <Navigation
        label="Main navigation"
        toggleLabel={{
          expandedLabel: 'Minimize Navigation',
          minimizedLabel: 'Expand Navigation'}}>
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

  it('should render a single semantic nav element', async () => {
    await mount(
      <Navigation
        label="Main navigation"
        toggleLabel={{
          expandedLabel: 'Minimize Navigation',
          minimizedLabel: 'Expand Navigation'}}>
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

  it('should render a semantic list for the nav content', async () => {
    await mount(
      <Navigation
        label="Main navigation"
        toggleLabel={{
          expandedLabel: 'Minimize Navigation',
          minimizedLabel: 'Expand Navigation'}}>
        <NavigationItem
          icon={<IconDashboardLine />}
          label="Dashboard"
          href="#"
        />
        <NavigationItem
          icon={<Badge count={99}><IconAdminLine /></Badge>}
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

  it('should switch aria-expanded when the Toggle Navigation button is clicked', async () => {
    await mount(
      <Navigation
        label="Main navigation"
        toggleLabel={{
          expandedLabel: 'Minimize Navigation',
          minimizedLabel: 'Expand Navigation'}}>
        <NavigationItem
          icon={<IconDashboardLine />}
          label="Dashboard"
          href="#"
        />
        <NavigationItem
          icon={<Badge count={99}><IconAdminLine /></Badge>}
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

  it('should add the minimized style to the root when the nav is collapsed', async () => {
    await mount(
      <Navigation
        label="Main navigation"
        toggleLabel={{
          expandedLabel: 'Minimize Navigation',
          minimizedLabel: 'Expand Navigation'}}
        >
        <NavigationItem
          icon={<IconDashboardLine />}
          label="Dashboard"
          href="#"
        />
        <NavigationItem
          icon={<Badge count={99}><IconAdminLine /></Badge>}
          label="Inbox"
          href="#"
        />
      </Navigation>
    )
    const nav = await NavigationLocator.find()
    const toggle = await nav.find(':contains(Minimize Navigation):focusable')
    await toggle.click()
    expect(nav).to.have.className(styles['minimized'])
  })

  it('should meet a11y standards', async () => {
    await mount(
      <Navigation
        label="Main navigation"
        toggleLabel={{
          expandedLabel: 'Minimize Navigation',
          minimizedLabel: 'Expand Navigation'}}
        >
        <NavigationItem
          icon={<IconDashboardLine />}
          label="Dashboard"
          href="#"
        />
        <NavigationItem
          icon={<Badge count={99}><IconAdminLine /></Badge>}
          label="Inbox"
          href="#"
        />
      </Navigation>
    )
    const nav = await NavigationLocator.find()
    expect(await nav.accessible()).to.be.true()
  })
})
