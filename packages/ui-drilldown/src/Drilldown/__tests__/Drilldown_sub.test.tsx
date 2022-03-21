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
import { expect, mount, stub } from '@instructure/ui-test-utils'

import { Drilldown } from '../index'
import { DrilldownLocator } from '../DrilldownLocator'

describe('<Drilldown />', async () => {
  describe('rootPageId prop', async () => {
    it('should set the initial page and render it', async () => {
      await mount(
        <Drilldown rootPageId="page1">
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option01">Option</Drilldown.Option>
          </Drilldown.Page>
          <Drilldown.Page id="page1">
            <Drilldown.Option id="option11">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      const drilldown = await DrilldownLocator.find()
      const page0Option = await drilldown.find('#option01', {
        expectEmpty: true
      })
      const page1Option = await drilldown.find('#option11')

      expect(page0Option).to.not.exist()
      expect(page1Option).to.exist()
    })
  })

  describe('children prop', async () => {
    it('should not allow non-DrilldownPage children', async () => {
      stub(console, 'error')
      await mount(
        <Drilldown rootPageId="page0">
          <div id="testDiv">DIV</div>
        </Drilldown>
      )

      const drilldown = await DrilldownLocator.find({
        expectEmpty: true
      })

      expect(drilldown).to.not.exist()
    })
  })

  describe('id prop', async () => {
    it('should put id attr on the drilldown', async () => {
      await mount(
        <Drilldown rootPageId="page0" id="testId">
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option01">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      const drilldown = await DrilldownLocator.find()

      expect(drilldown.getId()).to.equal('testId')
    })
  })

  describe('label prop', async () => {
    it('should be added as aria-label', async () => {
      await mount(
        <Drilldown rootPageId="page0" label="testLabel">
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option01">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      const drilldown = await DrilldownLocator.find()

      expect(drilldown.getAttribute('aria-label')).to.equal('testLabel')
    })
  })

  describe('disabled prop', async () => {
    it('should disable all options', async () => {
      await mount(
        <Drilldown rootPageId="page0" disabled>
          <Drilldown.Page id="page0" renderActionLabel="Action">
            <Drilldown.Option id="option01">Option</Drilldown.Option>
            <Drilldown.Option id="option02">Option</Drilldown.Option>
            <Drilldown.Option id="option03">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      const drilldown = await DrilldownLocator.find()
      const allOptions = await drilldown.findAllOptions()

      expect(allOptions.length).to.equal(4) // header action + 3 options

      allOptions.forEach((option) => {
        expect(option.getAttribute('aria-disabled')).to.equal('true')
      })
    })

    it('should prevent option actions', async () => {
      await mount(
        <Drilldown rootPageId="page0" disabled>
          <Drilldown.Page id="page0" renderActionLabel="Action">
            <Drilldown.Option id="page0option" subPageId="page1">
              Option
            </Drilldown.Option>
          </Drilldown.Page>
          <Drilldown.Page id="page1">
            <Drilldown.Option id="page1option">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      const drilldown = await DrilldownLocator.find()
      const page0option = await drilldown.find('#page0option')

      await page0option.click()

      const page1option = await drilldown.find('#page1option', {
        expectEmpty: true
      })

      expect(page0option).to.be.visible()
      expect(page1option).to.not.be.visible()
    })

    it('should disabled trigger, if provided', async () => {
      await mount(
        <Drilldown
          rootPageId="page0"
          disabled
          trigger={<button data-test-id="toggleButton">Toggle</button>}
        >
          <Drilldown.Page id="page0" renderActionLabel="Action">
            <Drilldown.Option id="page0option">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      const drilldown = await DrilldownLocator.find()
      const toggleButton = await drilldown.find('[data-test-id="toggleButton"]')

      expect(toggleButton.getAttribute('aria-disabled')).to.equal('true')
      expect(
        (toggleButton.getDOMNode() as HTMLButtonElement).disabled
      ).to.equal(true)

      await toggleButton.click()

      const option = await drilldown.find('#page0option', { expectEmpty: true })

      expect(option).to.not.be.visible()
    })
  })
})
