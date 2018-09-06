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
import NavigationItem from '../index'
import Badge from '@instructure/ui-elements/lib/components/Badge'
import IconAdmin from '@instructure/ui-icons/lib/Line/IconAdmin'

describe('<NavigationItem />', () => {

  const testbed = new Testbed(
        <NavigationItem
          icon={<Badge count={99}><IconAdmin /></Badge>}
          label="Inbox"
          onClick={() => { this.loadSubNav('account') }}
        />
  )

  it('should render', () => {
    const subject = testbed.render()
    expect(subject).to.be.present()
  })

  it('should have an aria attribute for the tooltip label when the nav is minimized ', () => {
    const subject = testbed.render({minimized: true})
    const attr = subject.find('button').getAttribute('aria-controls')

    expect(attr).to.exist()
  })
})
