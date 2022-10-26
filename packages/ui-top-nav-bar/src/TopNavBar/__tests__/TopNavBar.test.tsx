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
import { expect, mount, generateA11yTests } from '@instructure/ui-test-utils'

import { TopNavBar } from '../index'
import { TopNavBarLocator } from '../TopNavBarLocator'
import TopNavBarExamples from '../__examples__/TopNavBar.examples'

const BaseExample = () => {
  return (
    <TopNavBar breakpoint={700}>
      {() => (
        <TopNavBar.Layout
          desktopConfig={{}}
          smallViewportConfig={{
            dropdownMenuToggleButtonLabel: 'Toggle Menu',
            dropdownMenuLabel: 'Main Menu'
          }}
          renderMenuItems={
            <TopNavBar.MenuItems
              listLabel="Page navigation"
              currentPageId="Overview"
              renderHiddenItemsMenuTriggerLabel={(hiddenChildrenCount) =>
                `${hiddenChildrenCount} More`
              }
            >
              <TopNavBar.Item id="Overview" href="/#TopNavBar">
                Overview
              </TopNavBar.Item>
            </TopNavBar.MenuItems>
          }
        />
      )}
    </TopNavBar>
  )
}

// TODO: write tests
describe('<TopNavBar />', async () => {
  it('should render', async () => {
    await mount(<BaseExample />)
    const component = await TopNavBarLocator.find()

    expect(component).to.exist()
  })

  describe('should be accessible', async () => {
    generateA11yTests(TopNavBar, TopNavBarExamples)

    it('a11y', async () => {
      await mount(<BaseExample />)
      const topNavBar = await TopNavBarLocator.find()
      expect(await topNavBar.accessible()).to.be.true()
    })
  })
})
