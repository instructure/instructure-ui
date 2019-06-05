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
import {
  expect,
  mount,
  generateA11yTests
} from '@instructure/ui-test-utils'

import AppNavExamples from '../__examples__/AppNav.examples'
import { AppNav } from '../index'
import AppNavLocator from '../locator'

describe('<AppNav />', async () => {
  it('should render a nav element with an aria-label', async () => {
    await mount(<AppNav screenReaderLabel="Some label" />)

    const nav = await AppNavLocator.find()
    expect(await nav.find('nav[aria-label="Some label"]')).to.exist()
  })

  it('should render a semantic list of items', async () => {
    await mount(
      <AppNav screenReaderLabel="App navigation">
        <AppNav.Item
          renderLabel="Some first label"
          href="http://instructure.design"
        />
        <AppNav.Item
          renderLabel="Some second label"
          onClick={() => 'clicked'}
        />
      </AppNav>
    )

    const nav = await AppNavLocator.find()

    const list = await nav.findAll('ul')
    const items = await nav.findAll('li')
    const link = await nav.findAll('a')
    const button = await nav.findAll('button')

    expect(list).to.have.length(1)
    expect(items).to.have.length(2)
    expect(link).to.have.length(1)
    expect(button).to.have.length(1)
  })

  it('should render content after the navigation', async () => {
    await mount(
      <AppNav
        screenReaderLabel="App navigation"
        renderAfterItems={<button type="button">I am rendered after!</button>}
      >
        <AppNav.Item
          renderLabel="Some label"
          href="http://instructure.design"
        />
      </AppNav>
    )
    const nav = await AppNavLocator.find()
    expect(await nav.find('button:contains(I am rendered after!)')).to.exist()
  })

  describe('with generated examples', async () => {
    generateA11yTests(AppNavExamples)
  })
})
