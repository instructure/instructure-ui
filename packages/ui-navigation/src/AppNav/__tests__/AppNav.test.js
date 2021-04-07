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
  generateA11yTests,
  stub,
  wait,
  within
} from '@instructure/ui-test-utils'

import AppNavExamples from '../__examples__/AppNav.examples'
import { AppNav } from '../index'
import { AppNavLocator } from '../AppNavLocator'

describe('<AppNav />', async () => {
  describe('for a11y', () => {
    it('should render a nav element with an aria-label', async () => {
      await mount(
        <AppNav screenReaderLabel="Screen reader label" visibleItemsCount={2}>
          <AppNav.Item
            renderLabel="Some label"
            href="http://instructure.design"
          />
          <AppNav.Item
            renderLabel="Some other label"
            href="http://instructure.design"
          />
        </AppNav>
      )

      const nav = await AppNavLocator.find()
      expect(await nav.find('ul[aria-label="Screen reader label"]')).to.exist()
    })

    it('should render a semantic list of items', async () => {
      await mount(
        <AppNav screenReaderLabel="App navigation" visibleItemsCount={2}>
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

    it('should render with a single item', async () => {
      await mount(
        <AppNav screenReaderLabel="App navigation" visibleItemsCount={1}>
          <AppNav.Item
            renderLabel="Some label"
            href="http://instructure.design"
          />
        </AppNav>
      )

      const nav = await AppNavLocator.find()

      const list = await nav.findAll('ul')
      const items = await nav.findAll('li')
      const link = await nav.findAll('a')

      expect(list).to.have.length(1)
      expect(items).to.have.length(1)
      expect(link).to.have.length(1)
    })
  })

  describe('with rendered content', () => {
    it('should render content after the navigation', async () => {
      await mount(
        <AppNav
          screenReaderLabel="App navigation"
          renderAfterItems={<button type="button">I am rendered after!</button>}
          visibleItemsCount={2}
        >
          <AppNav.Item
            renderLabel="Some label"
            href="http://instructure.design"
          />
          <AppNav.Item
            renderLabel="Some other label"
            href="http://instructure.design"
          />
        </AppNav>
      )
      const nav = await AppNavLocator.find()
      expect(await nav.find('button:contains(I am rendered after!)')).to.exist()
    })
  })

  describe('with item truncation', () => {
    it('should hide and show items based on the containing element width', async () => {
      const onUpdate = stub()
      const itemWidth = 70

      const Nav = ({ width }) => (
        <div style={{ width }}>
          <AppNav screenReaderLabel="App navigation" onUpdate={onUpdate}>
            <AppNav.Item
              renderLabel={<div style={{ width: itemWidth }}>coolLabel</div>}
              href="http://instructure.design"
            />
            <AppNav.Item
              renderLabel={<div style={{ width: itemWidth }}>coolLabel</div>}
              href="http://instructure.design"
            />
            <AppNav.Item
              renderLabel={<div style={{ width: itemWidth }}>coolLabel</div>}
              href="http://instructure.design"
            />
            <AppNav.Item
              renderLabel={<div style={{ width: itemWidth }}>coolLabel</div>}
              href="http://instructure.design"
            />
          </AppNav>
        </div>
      )

      const subject = await mount(<Nav width={800} />)

      await wait(() => {
        expect(onUpdate).to.have.been.calledWith({ visibleItemsCount: 4 })
      })

      onUpdate.reset()
      await subject.setProps({ width: 400 })

      await wait(() => {
        expect(onUpdate).to.have.been.calledWith({ visibleItemsCount: 2 })
      })
    })

    it('should pass a custom label to the menu trigger', async () => {
      const subject = await mount(
        <AppNav
          screenReaderLabel="App navigation"
          visibleItemsCount={2}
          renderTruncateLabel={function () {
            return 'I am sooo custom!'
          }}
        >
          <AppNav.Item renderLabel="Label" href="http://instructure.design" />
          <AppNav.Item renderLabel="Label" href="http://instructure.design" />
          <AppNav.Item renderLabel="Label" href="http://instructure.design" />
          <AppNav.Item renderLabel="Label" href="http://instructure.design" />
        </AppNav>
      )

      const nav = within(subject.getDOMNode())
      const trigger = await nav.findAll('li:contains(I am sooo custom!)')

      expect(trigger).to.have.length(1)
    })
  })

  describe('with generated examples', async () => {
    generateA11yTests(AppNavExamples)
  })
})
