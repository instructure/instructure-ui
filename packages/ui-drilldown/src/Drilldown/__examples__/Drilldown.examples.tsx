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
  sectionProp: 'trigger',
  maxExamplesPerPage: 8,
  propValues: {
    trigger: [
      <Button margin="medium" key={1}>
        hello
      </Button>,
      undefined
    ],
    // these are non-existing props, we just pass them to getComponentProps()
    customProps: [
      { text: 'all custom props are undefined' },
      { text: 'disabled', defaultShow: false, disabled: true },
      {
        text: 'no overflow',
        defaultShow: true,
        disabled: false,
        separator: true,
        groupDisabled: true,
        renderGroupTitle: 'groupTitle',
        contentVAlign: 'start'
      },
      // overflowX tests
      {
        text: 'overflowX auto',
        defaultShow: true,
        width: '12rem',
        overflowX: 'auto',
        disabled: false,
        separator: true,
        groupDisabled: true,
        renderGroupTitle: 'groupTitle',
        contentVAlign: 'start'
      },
      {
        text: 'overflowX hidden',
        defaultShow: true,
        width: '12rem',
        overflowX: 'hidden',
        disabled: true,
        separator: false,
        groupDisabled: false,
        renderGroupTitle: undefined,
        contentVAlign: 'center'
      },
      {
        text: 'overflowX visible',
        defaultShow: true,
        width: '12rem',
        overflowX: 'visible',
        disabled: false,
        separator: false,
        groupDisabled: false,
        renderGroupTitle: undefined,
        contentVAlign: 'end'
      },
      // overflowY tests
      {
        text: 'overflowY auto',
        defaultShow: true,
        height: '20rem',
        overflowY: 'auto',
        disabled: false,
        separator: true,
        groupDisabled: true,
        renderGroupTitle: 'groupTitle',
        contentVAlign: 'start'
      },
      {
        text: 'overflowY hidden',
        defaultShow: true,
        height: '20rem',
        overflowY: 'hidden',
        disabled: true,
        separator: false,
        groupDisabled: false,
        renderGroupTitle: undefined,
        contentVAlign: 'center'
      },
      {
        text: 'overflowY visible',
        defaultShow: true,
        height: '20rem',
        overflowY: 'visible',
        disabled: false,
        separator: false,
        groupDisabled: false,
        renderGroupTitle: undefined,
        contentVAlign: 'end'
      }
    ]
  },
  getExampleProps(props) {
    return {
      height:
        props.customProps.defaultShow || !props.trigger ? '35rem' : '3rem',
      width: '25rem',
      padding: '0 0 0 large'
    }
  },
  getComponentProps: (props) => {
    return {
      rootPageId: 'page0',
      children: [
        <Drilldown.Page id="page0" key="page0">
          <Drilldown.Option id="otext">
            {props.customProps.text}
          </Drilldown.Option>
          <Drilldown.Option id="o">
            this should be an option with very very super very very long label
          </Drilldown.Option>
          <Drilldown.Option id="o1" href="#">
            this is a link
          </Drilldown.Option>
          <Drilldown.Group
            id="g1"
            disabled={props.customProps.groupDisabled}
            renderGroupTitle={props.customProps.renderGroupTitle}
            withoutSeparators={props.customProps.separator}
            selectableType="multiple"
          >
            <Drilldown.Option id="o2" renderLabelInfo="li" defaultSelected>
              defaultSelected
            </Drilldown.Option>
            <Drilldown.Option id="o3">minimal</Drilldown.Option>
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
          <Drilldown.Separator id="s1" />
          <Drilldown.Option
            id="o6"
            beforeLabelContentVAlign={props.customProps.contentVAlign}
            renderBeforeLabel="bef"
            afterLabelContentVAlign={props.customProps.contentVAlign}
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
      overflowX: props.customProps.overflowX,
      overflowY: props.customProps.overflowY,
      placement: 'bottom center',
      shouldHideOnSelect: true,
      shouldFocusTriggerOnClose: true,
      shouldContainFocus: false,
      shouldReturnFocus: true,
      offsetX: 0,
      offsetY: 0,
      width: props.customProps.width,
      height: props.customProps.height,
      disabled: props.customProps.disabled,
      withArrow:
        props.trigger && props.customProps.defaultShow
          ? props.withArrow
          : false,
      defaultShow: props.trigger ? props.customProps.defaultShow : false
    }
  }
} as StoryConfig<DrilldownProps>
