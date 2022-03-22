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
  // sectionProp: 'shape',
  propValues: {
    trigger: [<Button key={1}>hello</Button>],
    defaultShow: [true, false]
  },
  getExampleProps(props) {
    return {
      height: props.defaultShow ? '12rem' : '3rem',
      width: '6rem'
    }
  },
  filter: () => {
    return false
  },
  getComponentProps: () => {
    // TODO: write examples, these defaults are just for the build to run
    return {
      rootPageId: 'page0',
      children: [
        <Drilldown.Page id="page0" key="0">
          <Drilldown.Option id="option1">Option 1</Drilldown.Option>
          <Drilldown.Option id="option2">Option 2</Drilldown.Option>
          <Drilldown.Option id="option3">Option 3</Drilldown.Option>
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
      withArrow: true,
      offsetX: 0,
      offsetY: 0
    }
  }
} as StoryConfig<DrilldownProps>
