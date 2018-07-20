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
  import Navigation, { NavigationItem } from '../index'
  import ScreenReaderContent from '@instructure/ui-a11y/lib/components/ScreenReaderContent'
  import Img from '@instructure/ui-elements/lib/components/Img'
  import Avatar from '@instructure/ui-elements/lib/components/Avatar'
  import Badge from '@instructure/ui-elements/lib/components/Badge'
  import IconAdmin from '@instructure/ui-icons/lib/Line/IconAdmin'
  import IconDashboard from '@instructure/ui-icons/lib/Line/IconDashboard'

import styles from '../styles.css'

describe('<Navigation />', () => {
  // eslint-disable-next-line max-len
  const image = 'data:image/gif;base64,R0lGODlhFAAUAJEAAP/9/fYQEPytrflWViH5BAAAAAAALAAAAAAUABQAQAJKhI+pGe09lnhBnEETfodatVHNh1BR+ZzH9LAOCYrVYpiAfWWJOxrC/5MASbyZT4d6AUIBlUYGoR1FsAXUuTN5YhxAEYbrpKRkQwEAOw=='

  const testbed = new Testbed(
    <div style={{height: '25rem'}}>
      <Navigation
        label="Main navigation"
        toggleLabel={{
          expandedLabel: 'Minimize Navigation',
          minimizedLabel: 'Expand Navigation'}}>
        <NavigationItem
          icon={<Img src={image} constrain="cover" />}
          label={<ScreenReaderContent>Home</ScreenReaderContent>}
          href="#"
        />
        <NavigationItem
          icon={<Avatar name="Ziggy Marley" size="x-small"/>}
          label="Account"
          onClick={() => { this.loadSubNav('account') }}
        />
        <NavigationItem
          icon={<Badge count={99}><IconAdmin /></Badge>}
          label="Inbox"
          href="#"
        />
        <NavigationItem
          icon={<IconDashboard />}
          label="Supercalifragilistic"
          href="#"
        />
      </Navigation>
    </div>
  )

  it('should render', () => {
    const subject = testbed.render()
    expect(subject).to.be.present
  })

  it('should render a single semantic nav element', () => {
    const subject = testbed.render()
    expect(subject.find('nav').length).to.equal(1)
  })

  it('should render a semantic list for the nav content', () => {
    const subject = testbed.render()
    expect(subject.find('li').length).to.equal(4)
  })

  it('should switch aria-expanded when the Toggle Navigation button is clicked', () => {
    const subject = testbed.render()
    const toggle = subject.find('NavigationItem').last()

    expect(toggle.getAttribute('aria-expanded')).to.equal('true')

    toggle.find('button').simulate('click')

    expect(toggle.getAttribute('aria-expanded')).to.equal('false')
  })

  it('should add the minimized style to the root when the nav is collapsed', () => {
    const subject = testbed.render()
    const toggle = subject.find(NavigationItem).last()
    toggle.find('button').simulate('click')

    expect(subject.find('nav').hasClass(styles['minimized'])).to.be.true
  })
})
