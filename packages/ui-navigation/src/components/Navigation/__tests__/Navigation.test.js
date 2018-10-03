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
import ScreenReaderContent from '@instructure/ui-a11y/lib/components/ScreenReaderContent'
import Img from '@instructure/ui-elements/lib/components/Img'
import Avatar from '@instructure/ui-elements/lib/components/Avatar'
import Badge from '@instructure/ui-elements/lib/components/Badge'
import IconAdmin from '@instructure/ui-icons/lib/Line/IconAdmin'
import IconDashboard from '@instructure/ui-icons/lib/Line/IconDashboard'

import Navigation, { NavigationItem } from '../index'
import NavigationLocator from '../locator'

import styles from '../styles.css'

describe('<Navigation />', async () => {
  it('should render', async () => {
    // eslint-disable-next-line max-len
    const image = 'data:image/gif;base64,R0lGODlhFAAUAJEAAP/9/fYQEPytrflWViH5BAAAAAAALAAAAAAUABQAQAJKhI+pGe09lnhBnEETfodatVHNh1BR+ZzH9LAOCYrVYpiAfWWJOxrC/5MASbyZT4d6AUIBlUYGoR1FsAXUuTN5YhxAEYbrpKRkQwEAOw=='

    await mount(
      <Navigation
        label="Main navigation"
        toggleLabel={{
          expandedLabel: 'Minimize Navigation',
          minimizedLabel: 'Expand Navigation'}}>
        <NavigationItem
          icon={<IconDashboard />}
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
          icon={<IconDashboard />}
          label="Dashboard"
          href="#"
        />
      </Navigation>
    )
    const nav = await NavigationLocator.findAll({ tag: 'nav' })
    expect(nav).to.have.length(1)
  })

  it('should render a semantic list for the nav content', async () => {
    await mount(
      <Navigation
        label="Main navigation"
        toggleLabel={{
          expandedLabel: 'Minimize Navigation',
          minimizedLabel: 'Expand Navigation'}}>
        <NavigationItem
          icon={<IconDashboard />}
          label="Dashboard"
          href="#"
        />
        <NavigationItem
          icon={<Badge count={99}><IconAdmin /></Badge>}
          label="Inbox"
          href="#"
        />
      </Navigation>
    )
    const list = await NavigationLocator.findAll({ tag: 'ul' })
    const items = await NavigationLocator.findAll({ tag: 'li' })
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
          icon={<IconDashboard />}
          label="Dashboard"
          href="#"
        />
        <NavigationItem
          icon={<Badge count={99}><IconAdmin /></Badge>}
          label="Inbox"
          href="#"
        />
      </Navigation>
    )
    const nav = await NavigationLocator.find()
    const toggle = await NavigationLocator.find({ focusable: true, contains: 'Minimize Navigation'  })
    expect(toggle.getAttribute('aria-expanded')).to.equal('true')
    await toggle.click()
    expect(toggle.getAttribute('aria-expanded')).to.equal('false')
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
          icon={<IconDashboard />}
          label="Dashboard"
          href="#"
        />
        <NavigationItem
          icon={<Badge count={99}><IconAdmin /></Badge>}
          label="Inbox"
          href="#"
        />
      </Navigation>
    )
    const nav = await NavigationLocator.find()
    const toggle = await NavigationLocator.find({ focusable: true, contains: 'Minimize Navigation' })
    await toggle.click()
    expect(nav.hasClass(styles['minimized'])).to.exist()
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
          icon={<IconDashboard />}
          label="Dashboard"
          href="#"
        />
        <NavigationItem
          icon={<Badge count={99}><IconAdmin /></Badge>}
          label="Inbox"
          href="#"
        />
      </Navigation>
    )
    const nav = await NavigationLocator.find()
    expect(await nav.accessible()).to.be.true()
  })
})
