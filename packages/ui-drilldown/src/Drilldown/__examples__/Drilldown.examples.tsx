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

import type { StoryConfig } from '@instructure/ui-test-utils'

import { Drilldown } from '../index'
import type { DrilldownProps } from '../props'

const triggerButton = (
  <button
    key={1}
    style={{ marginLeft: '72px', position: 'absolute', top: '45%' }}
  >
    a drilldown trigger
  </button>
)

export default {
  maxExamplesPerPage: 10,
  propValues: {
    // these are non-existing props, we just pass them to getComponentProps()
    customProps: [
      { text: 'all custom props are undefined' },
      { text: 'disabled', defaultShow: false, disabled: true },
      {
        text: 'no overflow setting',
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
      },
      // tests for Drilldown.Page
      { page: 'pageWithSubpages' },
      { page: 'pageWithSubpages2' },
      // Popover version
      {
        text: 'with trigger',
        trigger: triggerButton,
        defaultShow: false,
        disabled: false
      },
      {
        text: 'with trigger disabled',
        trigger: triggerButton,
        defaultShow: false,
        disabled: true
      },
      {
        text: 'with trigger and defaultShow',
        trigger: triggerButton,
        defaultShow: true,
        disabled: false
      },
      {
        text: 'with trigger, defaultShow and disabled',
        trigger: triggerButton,
        defaultShow: true,
        disabled: true
      },
      {
        text: 'with trigger and withArrow',
        trigger: triggerButton,
        defaultShow: true,
        withArrow: true
      },
      {
        text: 'with trigger and withArrow="false"',
        trigger: triggerButton,
        defaultShow: true,
        withArrow: false
      },
      {
        text: 'with trigger and placement + offset',
        trigger: triggerButton,
        defaultShow: true,
        placement: 'end top',
        offsetX: 10,
        offsetY: -20,
        width: '20rem'
      },
      {
        text: 'with trigger and width + height',
        trigger: triggerButton,
        defaultShow: true,
        width: '20rem',
        height: '20rem'
      },
      {
        text: 'with display="block" container',
        trigger: (
          <button key={1} style={{ margin: '30px auto', width: '100%' }}>
            a drilldown trigger
          </button>
        ),
        defaultShow: false,
        width: '20rem',
        height: '20rem',
        positionContainerDisplay: 'block'
      }
    ]
  },
  getExampleProps(props) {
    return {
      height:
        props.customProps.defaultShow || !props.customProps.trigger
          ? '57rem'
          : '5rem',
      width: '38rem',
      padding: '0 0 0 small',
      withVisualDebug: true,
      position: 'relative'
    }
  },
  getComponentProps: (props) => {
    return {
      rootPageId: 'page0',
      children: generateDrilldownChildren(props, props.customProps.page),
      rotateFocus: true,
      overflowX: props.customProps.overflowX,
      overflowY: props.customProps.overflowY,
      shouldHideOnSelect: true,
      shouldFocusTriggerOnClose: true,
      shouldContainFocus: false,
      shouldReturnFocus: true,
      width: props.customProps.width,
      height: props.customProps.height,
      disabled: props.customProps.disabled,
      trigger: props.customProps.trigger,
      positionContainerDisplay: props.customProps.positionContainerDisplay,
      ...(props.customProps.trigger
        ? {
            defaultShow: props.customProps.defaultShow,
            withArrow: props.customProps.withArrow,
            placement: props.customProps.placement,
            offsetX: props.customProps.offsetX,
            offsetY: props.customProps.offsetY
          }
        : {
            defaultShow: false,
            withArrow: false,
            placement: 'bottom center',
            offsetX: 0,
            offsetY: 0
          })
    }
  }
} as StoryConfig<DrilldownProps>

function generateDrilldownChildren(
  props: Record<string, any>,
  variant: string
) {
  if (variant == 'pageWithSubpages') {
    return [
      <Drilldown.Page id="page0" key="page0" renderTitle="pageWithSubpages">
        <Drilldown.Option id="o1" subPageId="subpage">
          has subpage
        </Drilldown.Option>
        <Drilldown.Separator id="s1" />
        <Drilldown.Option id="o2">does not have subpage</Drilldown.Option>
        <Drilldown.Option id="o3" href="#">
          this is a link
        </Drilldown.Option>
      </Drilldown.Page>,
      <Drilldown.Page id="subpage" renderTitle="aaa" key={1}>
        <Drilldown.Option id="tmp">not shown</Drilldown.Option>
      </Drilldown.Page>
    ]
  } else if (variant == 'pageWithSubpages2') {
    return [
      <Drilldown.Page
        id="page0"
        key="page0"
        renderTitle="pageWithSubpages2"
        renderActionLabel="action label"
        withoutHeaderSeparator
        renderBackButtonLabel="go back"
      >
        <Drilldown.Option id="o1" subPageId="subpage">
          has subpage
        </Drilldown.Option>
        <Drilldown.Separator id="s1" />
        <Drilldown.Option id="o2">does not have subpage</Drilldown.Option>
      </Drilldown.Page>,
      <Drilldown.Page id="subpage" renderTitle="aaa" key={1}>
        <Drilldown.Option id="tmp">subpage option</Drilldown.Option>
      </Drilldown.Page>
    ]
  }
  return [
    <Drilldown.Page id="page0" key="page0">
      <Drilldown.Option id="otext">{props.customProps.text}</Drilldown.Option>
      <Drilldown.Option id="o">
        <div style={{ whiteSpace: 'nowrap' }}>
          this should be an option with very very super very very long label
        </div>
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
  ]
}
