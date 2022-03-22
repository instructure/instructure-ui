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
  mount,
  stub,
  wrapQueryResult
} from '@instructure/ui-test-utils'

import { IconCheckSolid } from '@instructure/ui-icons'

import { Drilldown } from '../index'
import { DrilldownLocator } from '../DrilldownLocator'
import DrilldownExamples from '../__examples__/Drilldown.examples'

// TODO: write tests
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
    const data = Array(5).map((_v, ind) => ({
      label: `option ${ind}`,
      id: `opt_${ind}`
    }))
    const onSelect = stub()

    await mount(
      <Drilldown rootPageId="page0" onSelect={onSelect} defaultShow>
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
    const options = await drilldown.findOptions()
    debugger
  })

  describe('without a trigger', () => {})

  describe('with a trigger', () => {
    it('should not show content by default', async () => {
      await mount(
        <Drilldown rootPageId="page0" trigger={<button>click me</button>}>
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option0">Option 0</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )
      const trigger = await DrilldownLocator.findTrigger()
      const content = await DrilldownLocator.findContent({ expectEmpty: true })

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
      const trigger = await DrilldownLocator.findTrigger()

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
      const drilldown = await DrilldownLocator.findTrigger()

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

      const drilldown = await DrilldownLocator.findTrigger()

      await drilldown.click()

      expect(onToggle).to.have.been.called()
      expect(onToggle).to.have.been.callCount(1)
    })
    xit('should call onToggle when Drilldown is closed', async () => {
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
      const trigger = await DrilldownLocator.find()
      const drilldown = await DrilldownLocator.findTrigger()

      // debugger
      // await drilldown

      expect(onToggle).to.have.been.called()
      expect(onToggle).to.have.been.callCount(1)
    })
    //TODO: these closing tests does not work, investigate
    xit('should call onDismiss when Drilldown is closed', async () => {
      const onDismiss = stub()
      const subject = await mount(
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

      await drilldown.keyPress('esc')
      // const a = wrapQueryResult()
      // await a.keyPress(27)
      // debugger
      expect(onDismiss).to.have.been.called()
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

it('should give back the underlying html element when "drilldownRef" prop is set', async () => {})
it('should give back the correct reference when "ref" is set', async () => {})
it('navigation should work correctly', async () => {}) // ???
it('should be able to set the root page via prop', async () => {})

it('should not work when "disabled" is set', async () => {})

describe('header', () => {
  it('should not have back button on root page', async () => {})
  it('should have back button when not on root page', async () => {})
})
describe('options', () => {})
xdescribe('for a11y', async () => {
  // it('should be accessible', async () => {
  //   await mount(
  //     <Drilldown rootPageId="page0">
  //       <Drilldown.Page id="page0">
  //         <Drilldown.Option id="item1">Item1</Drilldown.Option>
  //       </Drilldown.Page>
  //     </Drilldown>
  //   )

  //   const drilldown = await DrilldownLocator.find()

  //   expect(await drilldown.accessible()).to.be.true()
  // })

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
  it('should correctly return focus when "trigger" and "shouldReturnFocus" is set', async () => {})
})
