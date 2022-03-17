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
import { expect, generateA11yTests, mount } from '@instructure/ui-test-utils'

import { IconCheckSolid } from '@instructure/ui-icons'

import { Drilldown } from '../index'
import { DrilldownLocator } from '../DrilldownLocator'
import DrilldownExamples from '../__examples__/Drilldown.examples'

// TODO: write tests
describe('<Drilldown />', async () => {
  describe('for a11y', async () => {
    it('should render', async () => {
      await mount(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option1">Option 0</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      const drilldown = await DrilldownLocator.find()

      expect(drilldown).to.exist()
    })

    describe('for a11y', async () => {
      it('should be accessible', async () => {
        await mount(
          <Drilldown rootPageId="page0">
            <Drilldown.Page
              id="page0"
              renderTitle="Page Title"
              renderActionLabel="Action Label"
            >
              <Drilldown.Option id="item01">Item1</Drilldown.Option>
              <Drilldown.Option id="item02" subPageId="page1">
                Item2
              </Drilldown.Option>
              <Drilldown.Option id="item03" description="This is a description">
                Item3
              </Drilldown.Option>
              <Drilldown.Option id="item04" renderLabelInfo="After">
                Item4
              </Drilldown.Option>
              <Drilldown.Option id="item05" disabled>
                Item5
              </Drilldown.Option>
              <Drilldown.Option id="item06" href="/">
                Item6
              </Drilldown.Option>
              <Drilldown.Option
                id="item07"
                renderBeforeLabel={<IconCheckSolid />}
              >
                Item7
              </Drilldown.Option>
              <Drilldown.Option
                id="item08"
                renderAfterLabel={<IconCheckSolid />}
              >
                Item8
              </Drilldown.Option>

              <Drilldown.Separator id="sep1" />

              <Drilldown.Group
                id="group1"
                renderGroupTitle="Multi-select group"
                selectableType="multiple"
              >
                <Drilldown.Option id="groupItem11">GroupItem</Drilldown.Option>
                <Drilldown.Option id="groupItem12">GroupItem</Drilldown.Option>
                <Drilldown.Option id="groupItem13">GroupItem</Drilldown.Option>
              </Drilldown.Group>

              <Drilldown.Group
                id="group2"
                renderGroupTitle="Single-select group"
                selectableType="single"
              >
                <Drilldown.Option id="groupItem21">GroupItem</Drilldown.Option>
                <Drilldown.Option id="groupItem22">GroupItem</Drilldown.Option>
                <Drilldown.Option id="groupItem23">GroupItem</Drilldown.Option>
              </Drilldown.Group>
            </Drilldown.Page>

            <Drilldown.Page id="page1">
              <Drilldown.Option id="item11">Item1</Drilldown.Option>
            </Drilldown.Page>
          </Drilldown>
        )

        const drilldown = await DrilldownLocator.find()

        expect(await drilldown.accessible()).to.be.true()
      })
    })
  })

  describe('with generated examples', async () => {
    generateA11yTests(Drilldown, DrilldownExamples)
  })
})
