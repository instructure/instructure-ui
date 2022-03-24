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
  generateA11yTests,
  match,
  mount,
  stub,
  wrapQueryResult
} from '@instructure/ui-test-utils'

import { IconCheckSolid } from '@instructure/ui-icons'

import { Drilldown } from '../index'
import { DrilldownLocator } from '../DrilldownLocator'
import DrilldownExamples from '../__examples__/Drilldown.examples'

const data = Array(5)
  .fill(0)
  .map((_v, ind) => ({
    label: `option ${ind}`,
    id: `opt_${ind}`
  }))

const renderOptions = (page: string) => {
  return data.map((option) => (
    <Drilldown.Option id={option.id} key={option.id}>
      {option.label} - {page}
    </Drilldown.Option>
  ))
}
describe('<Drilldown />', async () => {
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

  it('should fire onSelect when option is selected', async () => {
    const onSelect = stub()
    await mount(
      <Drilldown rootPageId="page0" onSelect={onSelect}>
        <Drilldown.Page id="page0">
          {data.map((option) => (
            <Drilldown.Option id={option.id} key={option.id}>
              {option.label}
            </Drilldown.Option>
          ))}
        </Drilldown.Page>
      </Drilldown>
    )
    const option = await DrilldownLocator.findAllOptions()
    await option[1].click()

    expect(onSelect).to.have.been.calledOnce()
    const selectValue = match.falsy.or(match.string).or(match.number)
    expect(onSelect).to.have.been.calledWithMatch(
      // this should be match.instanceOf(React.SyntheticEvent)
      match.object,
      match.every(selectValue).or(selectValue),
      match.bool,
      match.object
    )
  })

  xit('should not call onSelect when drilldown is disabled', async () => {
    const onSelect = stub()
    await mount(
      <Drilldown rootPageId="page0" onSelect={onSelect} disabled>
        <Drilldown.Page id="page0">
          {data.map((option) => (
            <Drilldown.Option id={option.id} key={option.id}>
              {option.label}
            </Drilldown.Option>
          ))}
        </Drilldown.Page>
      </Drilldown>
    )
    const option = await DrilldownLocator.findAllOptions()
    await option[1].click()
    expect(onSelect).to.not.have.been.called()
  })

  describe('with a trigger', () => {
    it('should not show content by default', async () => {
      await mount(
        <Drilldown rootPageId="page0" trigger={<button>click me</button>}>
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option0">Option 0</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )
      const trigger = await DrilldownLocator.findPopoverTrigger()
      const content = await DrilldownLocator.findPopoverContentWrapper({
        expectEmpty: true
      })

      expect(trigger.getTextContent()).to.be.eq('click me')
      expect(content).to.be.null()
    })

    it('should render into a mountNode', async () => {
      const container = document.createElement('div')
      document.body.appendChild(container)

      await mount(
        <Drilldown
          rootPageId="page0"
          mountNode={container}
          trigger={<button>Options</button>}
        >
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option0">Option 0</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )
      const trigger = await DrilldownLocator.findPopoverTrigger()

      await trigger.click()

      expect(container.innerText).to.eq('Option 0')
    })
    it('should have an aria-haspopup attriubte', async () => {
      await mount(
        <Drilldown rootPageId="page0" trigger={<button>Options</button>}>
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option0">Option 0</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )
      const drilldown = await DrilldownLocator.findPopoverTrigger()

      expect(drilldown.getAttribute('aria-haspopup')).to.exist()
    })
    it('should call onToggle when Drilldown is opened', async () => {
      const onToggle = stub()
      await mount(
        <Drilldown
          rootPageId="page0"
          trigger={<button>Options</button>}
          onToggle={onToggle}
        >
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option0">Option 0</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      const drilldown = await DrilldownLocator.findPopoverTrigger()

      await drilldown.click()

      expect(onToggle).to.have.been.calledOnce()
      expect(onToggle).to.have.been.calledWithMatch(match.object, {
        shown: true,
        drilldown: match.object,
        pageHistory: ['page0'],
        goToPage: match.func,
        goToPreviousPage: match.func
      })
    })
    it('should call onToggle when Drilldown is closed', async () => {
      const onToggle = stub()
      await mount(
        <Drilldown
          rootPageId="page0"
          trigger={<button>Options</button>}
          onToggle={onToggle}
          defaultShow
        >
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option0">Option 0</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )
      const drilldown = await DrilldownLocator.find()
      await drilldown.keyUp('esc')

      expect(onToggle).to.have.been.calledOnce()
      expect(onToggle).to.have.been.calledWithMatch(match.instanceOf(Event), {
        shown: false,
        drilldown: match.object,
        pageHistory: ['page0'],
        goToPage: match.func,
        goToPreviousPage: match.func
      })
    })
    it('should call onDismiss when Drilldown is closed', async () => {
      const onDismiss = stub()
      await mount(
        <Drilldown
          rootPageId="page0"
          trigger={<button>Options</button>}
          onDismiss={onDismiss}
          defaultShow
        >
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option0">Option 0</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )
      const drilldown = await DrilldownLocator.find()

      await drilldown.keyUp(27)

      expect(onDismiss).to.have.been.calledOnce()
      expect(onDismiss).to.have.been.calledWithMatch(
        match.instanceOf(Event),
        false
      )
    })
  })

  describe('navigation', () => {
    it('should be able to navigate between options with up/down arrows', async () => {
      await mount(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            {data.map((option) => (
              <Drilldown.Option id={option.id} key={option.id}>
                {option.label}
              </Drilldown.Option>
            ))}
          </Drilldown.Page>
        </Drilldown>
      )
      const drilldown = await DrilldownLocator.find()
      const options = await drilldown.findAllOptions()

      await drilldown.focus()
      await drilldown.keyDown('down')

      expect(options[0].containsFocus()).to.be.true()

      await drilldown.keyDown('down')

      expect(options[1].containsFocus()).to.be.true()

      await drilldown.keyDown('down')

      expect(options[2].containsFocus()).to.be.true()

      await drilldown.keyDown('up')
      expect(options[1].containsFocus()).to.be.true()
    })
    it('should be able to navigate forward between pages with right arrow', async () => {
      await mount(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0" renderTitle={'Page 0'}>
            <Drilldown.Option id="opt0" subPageId="page1">
              To Page 1
            </Drilldown.Option>
          </Drilldown.Page>
          <Drilldown.Page id="page1" renderTitle={'Page 1'}>
            {[
              <Drilldown.Option key="opt5" id="opt5" subPageId="page2">
                To Page 2
              </Drilldown.Option>,
              ...renderOptions('page 1')
            ]}
          </Drilldown.Page>

          <Drilldown.Page id="page2" renderTitle="Page 2">
            {renderOptions('page 2')}
          </Drilldown.Page>
        </Drilldown>
      )
      const drilldown = await DrilldownLocator.find()
      let options = await drilldown.findAllOptionWrappers()

      await drilldown.focus()
      await drilldown.keyDown('down')
      // the option which navigates to next page should be focused
      expect(options[1].containsFocus()).to.be.true()

      // options[1] is the active element
      let activeOption = wrapQueryResult(document.activeElement!)
      await activeOption.keyDown('ArrowRight')

      // the 1st option is the `Back` button, navigate to the second option
      await Promise.all([drilldown.keyDown('down'), drilldown.keyDown('down')])
      let header = await drilldown.findHeaderTitle()
      expect(header.text()).to.be.eq('Page 1')
      options = await drilldown.findAllOptionWrappers()
      activeOption = options.find((opt: typeof drilldown) =>
        opt.containsFocus()
      )
      expect(activeOption.text()).to.be.eq('To Page 2')
      await activeOption.keyDown('ArrowRight')
      header = await drilldown.findHeaderTitle()
      expect(header.text()).to.be.eq('Page 2')
    })

    it('should be able to navigate back to previous page with left arrow', async () => {
      await mount(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0" renderTitle={'Page 0'}>
            <Drilldown.Option id="opt0" subPageId="page1">
              To Page 1
            </Drilldown.Option>
          </Drilldown.Page>
          <Drilldown.Page id="page1" renderTitle={'Page 1'}>
            {[
              <Drilldown.Option key="opt5" id="opt5" subPageId="page2">
                To Page 2
              </Drilldown.Option>,
              ...renderOptions('page 1')
            ]}
          </Drilldown.Page>

          <Drilldown.Page id="page2" renderTitle="Page 2">
            {renderOptions('page 2')}
          </Drilldown.Page>
        </Drilldown>
      )

      const drilldown = await DrilldownLocator.find()

      await drilldown.focus()
      await drilldown.keyDown('down')
      const activeOption = wrapQueryResult(document.activeElement!)
      await activeOption.keyDown('ArrowRight')
      await drilldown.keyDown('ArrowLeft')

      const header = await drilldown.findHeaderTitle()

      expect(drilldown.containsFocus()).to.be.true()
      expect(header.text()).to.be.eq('Page 0')
    })
    it('should close the drilldown on root page and left arrow is pressed', async () => {
      await mount(
        <Drilldown
          rootPageId="page0"
          trigger={<button>options</button>}
          defaultShow
        >
          <Drilldown.Page id="page0" renderTitle={'Page 0'}>
            <Drilldown.Option id="opt0" subPageId="page1">
              To Page 1
            </Drilldown.Option>
          </Drilldown.Page>
          <Drilldown.Page id="page1" renderTitle={'Page 1'}>
            {[
              <Drilldown.Option key="opt5" id="opt5" subPageId="page2">
                To Page 2
              </Drilldown.Option>,
              ...renderOptions('page 1')
            ]}
          </Drilldown.Page>

          <Drilldown.Page id="page2" renderTitle="Page 2">
            {renderOptions('page 2')}
          </Drilldown.Page>
        </Drilldown>
      )
      const drilldown = await DrilldownLocator.find()

      const content = await drilldown.findPopoverContent()

      expect(content.getDOMNode()).to.be.eq(document.activeElement)

      await content.keyDown('ArrowLeft')
      const contentWrapper = await DrilldownLocator.findPopoverContentWrapper({
        expectEmpty: true
      })
      expect(contentWrapper).to.be.null()
      expect(drilldown.containsFocus()).to.be.false()
    })
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
            <Drilldown.Option id="item08" renderAfterLabel={<IconCheckSolid />}>
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

    it('should meet a11y standarts when drilldown is open', async () => {
      const subject = await mount(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option0">Option 0</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )
      const element = wrapQueryResult(subject.getDOMNode())
      expect(await element.accessible()).to.be.true()
    })
    it('should correctly return focus when "trigger" and "shouldReturnFocus" is set', async () => {
      await mount(
        <Drilldown
          rootPageId="page0"
          trigger={<button>Options</button>}
          shouldReturnFocus
        >
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option0">Option 0</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )
      const drilldown = await DrilldownLocator.find()
      const trigger = await DrilldownLocator.findPopoverTrigger()

      await trigger.focus()

      await trigger.keyDown(' ')
      await drilldown.keyDown('esc')

      expect(trigger.containsFocus()).to.be.true()
    })
  })
  describe('with generated examples', async () => {
    generateA11yTests(Drilldown, DrilldownExamples)
  })
})
