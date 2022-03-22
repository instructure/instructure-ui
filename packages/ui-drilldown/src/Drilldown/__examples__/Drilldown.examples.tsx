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

import type { StoryConfig } from '@instructure/ui-test-utils'

import { Drilldown } from '../index'
import type { DrilldownProps } from '../props'
// eslint-disable-next-line import/no-extraneous-dependencies
import { Button } from '@instructure/ui-buttons'

export default {
  //sectionProp: '',
  maxExamplesPerPage: 11,
  propValues: {
    trigger: [
      <Button margin="medium" key={1}>
        hello
      </Button>,
      undefined
    ],
    // these are non-existing props, we just pass them to getComponentProps()
    contentVAlign: ['start', 'center', 'end'],
    group: [
      { separator: true, disabled: true, renderGroupTitle: 'groupTitle' },
      { separator: false, disabled: false, renderGroupTitle: undefined }
    ]
  },
  getExampleProps(props) {
    return {
      height: props.defaultShow || !props.trigger ? '30rem' : '3rem',
      width: '25rem',
      padding: '0 0 0 large'
    }
  },
  filter: () => {
    return false
  },
  getComponentProps: (props) => {
    return {
      rootPageId: 'page0',
      children: [
        <Drilldown.Page id="page0" key="0">
          <Drilldown.Option id="o1">minimal</Drilldown.Option>
          <Drilldown.Group
            id="g1"
            disabled={props.group.disabled}
            renderGroupTitle={props.group.renderGroupTitle}
            withoutSeparators={props.group.separator}
            selectableType="multiple"
          >
            <Drilldown.Option id="o2" renderLabelInfo="li" defaultSelected>
              defaultSelected
            </Drilldown.Option>
            <Drilldown.Option id="o3" href="#">
              renders as link
            </Drilldown.Option>
          </Drilldown.Group>
          <Drilldown.Option id="o4" disabled>
            disabled
          </Drilldown.Option>
          <Drilldown.Option
            id="o5"
            renderBeforeLabel="be"
            renderAfterLabel="af"
            renderLabelInfo="li"
          >
            extra labels
          </Drilldown.Option>
          <Drilldown.Separator />
          <Drilldown.Option
            id="o6"
            beforeLabelContentVAlign={props.contentVAlign}
            renderBeforeLabel="bef"
            afterLabelContentVAlign={props.contentVAlign}
            renderAfterLabel="after"
          >
            <br />
            valign settings
            <br />
            <br />
          </Drilldown.Option>
          <Drilldown.Option id="o7" description="the description">
            has description
          </Drilldown.Option>
        </Drilldown.Page>
      ],
      rotateFocus: true,
      overflowX: 'auto',
      overflowY: 'auto',
      placement: 'bottom center',
      shouldHideOnSelect: true,
      shouldFocusTriggerOnClose: true,
      shouldContainFocus: false,
      shouldReturnFocus: true,
      offsetX: 0,
      offsetY: 0,
      disabled: false, // TODO comment this out
      withArrow: props.trigger && props.defaultShow ? props.withArrow : false,
      defaultShow: props.trigger ? props.defaultShow : false
    }
  }
} as StoryConfig<DrilldownProps>
