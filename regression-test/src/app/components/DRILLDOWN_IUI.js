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
import { Drilldown } from '@instructure/ui'

const DRILLDOWN_IUI = () => {
  return (
    <Drilldown rootPageId="root">
      <Drilldown.Page
        id="root"
        renderTitle="Title"
        renderActionLabel="Action"
        renderBackButtonLabel="Back"
      >
        <Drilldown.Option id="option">Option</Drilldown.Option>
        <Drilldown.Option id="subpage" subPageId="page0">
          Subpage
        </Drilldown.Option>
        <Drilldown.Option id="disabled" disabled>
          Disabled
        </Drilldown.Option>
        <Drilldown.Option id="link" href="/hello">
          Link
        </Drilldown.Option>
        <Drilldown.Option id="description" description="/hello">
          Description
        </Drilldown.Option>
        <Drilldown.Option id="renderLabelInfo" renderLabelInfo="info">
          renderLabelInfo
        </Drilldown.Option>
        <Drilldown.Option id="renderBeforeLabel" renderBeforeLabel="before">
          renderBeforeLabel
        </Drilldown.Option>
        <Drilldown.Option id="renderAfterLabel" renderAfterLabel="after">
          renderAfterLabel
        </Drilldown.Option>

        <Drilldown.Separator id="sep1" />

        <Drilldown.Group
          id="group1"
          renderGroupTitle="Select one option"
          selectableType="single"
        >
          <Drilldown.Option id="+2" value="+2" defaultSelected>
            Strongly agree
          </Drilldown.Option>
          <Drilldown.Option id="+1" value="+1">
            Somewhat agree
          </Drilldown.Option>
          <Drilldown.Option id="0" value="0">
            Neither agree nor disagree
          </Drilldown.Option>
          <Drilldown.Option id="-1" value="-1">
            Somewhat disagree
          </Drilldown.Option>
          <Drilldown.Option id="-2" value="-2">
            Strongly disagree
          </Drilldown.Option>
        </Drilldown.Group>
      </Drilldown.Page>
    </Drilldown>
  )
}

export default DRILLDOWN_IUI
