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
import { expect, mount, find, stub, match } from '@instructure/ui-test-utils'

import type { QueriesHelpersEventsType } from '@instructure/ui-test-queries'

import { Drilldown } from '../../index'
import { DrilldownLocator } from '../../DrilldownLocator'

const checkSelectedValues = async (
  options: QueriesHelpersEventsType[],
  expectedSelectedValues: string[]
) => {
  options.forEach((option) => {
    const value = option.getAttribute('data-value')!
    if (expectedSelectedValues.includes(value)) {
      expect(option.getAttribute('aria-checked')).to.equal('true')
    } else {
      expect(option.getAttribute('aria-checked')).to.equal('false')
    }
  })
}

describe('<Drilldown.Group />', async () => {
  it('should not allow de-selecting an option when selectableType = "single"', async () => {
    const options = ['one', 'two', 'three']
    const Example = ({ opts }: { opts: typeof options }) => {
      return (
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Group id="group0" selectableType="single">
              {opts.map((opt) => {
                return (
                  <Drilldown.Option
                    key={opt}
                    value={opt}
                    name={opt}
                    id={opt}
                    defaultSelected={opt === 'three'}
                  >
                    {opt}
                  </Drilldown.Option>
                )
              })}
            </Drilldown.Group>
          </Drilldown.Page>
        </Drilldown>
      )
    }

    await mount(<Example opts={options} />)

    let drilldown = await DrilldownLocator.find()
    let selectedOption = await drilldown.find('#three')

    expect(selectedOption.getDOMNode().getAttribute('aria-checked')).to.be.eq(
      'true'
    )

    selectedOption.click()

    drilldown = await DrilldownLocator.find()
    selectedOption = await drilldown.find('#three')

    expect(selectedOption.getDOMNode().getAttribute('aria-checked')).to.be.eq(
      'true'
    )
  })

  it("shouldn't render non-DrilldownGroup children", async () => {
    stub(console, 'error')
    await mount(
      <Drilldown rootPageId="page0">
        <Drilldown.Page id="page0">
          <Drilldown.Group id="group0">
            <div id="testDiv">Div</div>
          </Drilldown.Group>
        </Drilldown.Page>
      </Drilldown>
    )

    const div = await find('#testDiv', { expectEmpty: true })

    expect(div).to.not.exist()
  })

  it('elementRef should return ref to the group', async () => {
    const elementRef = stub()
    await mount(
      <Drilldown rootPageId="page0">
        <Drilldown.Page id="page0">
          <Drilldown.Group id="group0" elementRef={elementRef}>
            <Drilldown.Option id="groupOption01">Option</Drilldown.Option>
          </Drilldown.Group>
        </Drilldown.Page>
      </Drilldown>
    )

    const drilldown = await DrilldownLocator.find()
    const group = await drilldown.find('#group0')

    expect(elementRef).to.have.been.calledWith(group.getDOMNode())
  })

  describe('renderGroupTitle', async () => {
    it('should display', async () => {
      await mount(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Group id="group0" renderGroupTitle="Group Title">
              <Drilldown.Option id="groupOption01">Option</Drilldown.Option>
            </Drilldown.Group>
          </Drilldown.Page>
        </Drilldown>
      )

      const drilldown = await DrilldownLocator.find()
      const groupLabels = await drilldown.findAllGroupLabels()

      expect(groupLabels[0]).to.have.text('Group Title')
    })

    it('should display, if function is provided', async () => {
      await mount(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Group id="group0" renderGroupTitle={() => 'Group Title'}>
              <Drilldown.Option id="groupOption01">Option</Drilldown.Option>
            </Drilldown.Group>
          </Drilldown.Page>
        </Drilldown>
      )

      const drilldown = await DrilldownLocator.find()
      const groupLabels = await drilldown.findAllGroupLabels()

      expect(groupLabels[0]).to.have.text('Group Title')
    })
  })

  describe('separators', async () => {
    it("shouldn't display, when group is first and/or last item", async () => {
      await mount(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Group id="group0">
              <Drilldown.Option id="groupOption01">Option</Drilldown.Option>
            </Drilldown.Group>
          </Drilldown.Page>
        </Drilldown>
      )

      const drilldown = await DrilldownLocator.find()
      const separators = await drilldown.findAllSeparators({
        expectEmpty: true
      })

      expect(separators.length).to.equal(0)
    })

    it('should display by default, if group is between other items', async () => {
      await mount(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option1">Option</Drilldown.Option>
            <Drilldown.Group id="group0">
              <Drilldown.Option id="groupOption01">Option</Drilldown.Option>
            </Drilldown.Group>
            <Drilldown.Option id="option2">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      const drilldown = await DrilldownLocator.find()
      const separators = await drilldown.findAllSeparators()

      expect(separators.length).to.equal(2)
    })

    it("shouldn't display extra separator between groups", async () => {
      await mount(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option1">Option</Drilldown.Option>
            <Drilldown.Group id="group0">
              <Drilldown.Option id="groupOption01">Option</Drilldown.Option>
            </Drilldown.Group>
            <Drilldown.Group id="group1">
              <Drilldown.Option id="groupOption11">Option</Drilldown.Option>
            </Drilldown.Group>
            <Drilldown.Option id="option2">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      const drilldown = await DrilldownLocator.find()
      const separators = await drilldown.findAllSeparators()

      expect(separators.length).to.equal(3)
    })
  })

  describe('disabled prop', async () => {
    it('should disable all items in the group', async () => {
      await mount(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option1">Option</Drilldown.Option>
            <Drilldown.Group id="group0" disabled>
              <Drilldown.Option id="groupOption01">Option</Drilldown.Option>
              <Drilldown.Option id="groupOption02">Option</Drilldown.Option>
            </Drilldown.Group>
            <Drilldown.Option id="option2">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      const drilldown = await DrilldownLocator.find()
      const options = await drilldown.findAllOptions()

      options.forEach((option) => {
        const id = option.getAttribute('id')!
        if (['groupOption01', 'groupOption02'].includes(id)) {
          expect(option.getAttribute('aria-disabled')).to.equal('true')
        } else {
          expect(option.getAttribute('aria-disabled')).to.equal(null)
        }
      })
    })
  })

  describe('role prop', async () => {
    it('should be "group" by default', async () => {
      await mount(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Group id="group0">
              <Drilldown.Option id="groupOption01">Option</Drilldown.Option>
              <Drilldown.Option id="groupOption02">Option</Drilldown.Option>
            </Drilldown.Group>
          </Drilldown.Page>
        </Drilldown>
      )

      const drilldown = await DrilldownLocator.find()
      const group = await drilldown.find('#group0')

      expect(group.getDOMNode()).to.have.attribute('role', 'group')
    })

    it('should render the group with passed role', async () => {
      await mount(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Group id="group0" role="menu">
              <Drilldown.Option id="groupOption01">Option</Drilldown.Option>
              <Drilldown.Option id="groupOption02">Option</Drilldown.Option>
            </Drilldown.Group>
          </Drilldown.Page>
        </Drilldown>
      )

      const drilldown = await DrilldownLocator.find()
      const group = await drilldown.find('#group0')

      expect(group.getDOMNode()).to.have.attribute('role', 'menu')
    })
  })

  describe('as prop', async () => {
    it('should inherit Drilldown\'s "ul" by default', async () => {
      await mount(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Group id="group0">
              <Drilldown.Option id="groupOption01">Option</Drilldown.Option>
              <Drilldown.Option id="groupOption02">Option</Drilldown.Option>
            </Drilldown.Group>
          </Drilldown.Page>
        </Drilldown>
      )

      const drilldown = await DrilldownLocator.find()
      const drilldownContainer = await drilldown.findSelectableContainer()
      const group = await drilldown.find('#group0')

      expect(drilldownContainer.getDOMNode()).to.have.tagName('ul')
      expect(group.getDOMNode()).to.have.tagName('ul')
    })

    it('should inherit Drilldown\'s "as" prop', async () => {
      await mount(
        <Drilldown rootPageId="page0" as="ol">
          <Drilldown.Page id="page0">
            <Drilldown.Group id="group0">
              <Drilldown.Option id="groupOption01">Option</Drilldown.Option>
              <Drilldown.Option id="groupOption02">Option</Drilldown.Option>
            </Drilldown.Group>
          </Drilldown.Page>
        </Drilldown>
      )

      const drilldown = await DrilldownLocator.find()
      const drilldownContainer = await drilldown.findSelectableContainer()
      const group = await drilldown.find('#group0')

      expect(drilldownContainer.getDOMNode()).to.have.tagName('ol')
      expect(group.getDOMNode()).to.have.tagName('ol')
    })

    it('should render the group as other element', async () => {
      await mount(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Group id="group0" as="ol">
              <Drilldown.Option id="groupOption01">Option</Drilldown.Option>
              <Drilldown.Option id="groupOption02">Option</Drilldown.Option>
            </Drilldown.Group>
          </Drilldown.Page>
        </Drilldown>
      )

      const drilldown = await DrilldownLocator.find()
      const group = await drilldown.find('#group0')

      expect(group.getDOMNode()).to.have.tagName('ol')
    })
  })

  describe('selectableType', async () => {
    it('if not set, should render role="menuitem" options without icon by default', async () => {
      await mount(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Group id="group0">
              <Drilldown.Option id="groupOption01">Option</Drilldown.Option>
            </Drilldown.Group>
          </Drilldown.Page>
        </Drilldown>
      )

      const drilldown = await DrilldownLocator.find()
      const option = await drilldown.find('#groupOption01')
      const optionWrapper = await drilldown.findOptionWrapperByOptionId(
        'groupOption01'
      )

      expect(option.getAttribute('role')).to.equal('menuitem')
      expect(
        await optionWrapper.find('[name="IconCheck"]', {
          expectEmpty: true
        })
      ).to.not.exist()
    })

    it('value "single" should render role="menuitemradio" options with icon', async () => {
      await mount(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Group id="group0" selectableType="single">
              <Drilldown.Option id="groupOption01">Option</Drilldown.Option>
            </Drilldown.Group>
          </Drilldown.Page>
        </Drilldown>
      )

      const drilldown = await DrilldownLocator.find()
      const option = await drilldown.find('#groupOption01')
      const optionWrapper = await drilldown.findOptionWrapperByOptionId(
        'groupOption01'
      )

      expect(option.getAttribute('role')).to.equal('menuitemradio')
      expect(await optionWrapper.find('[name="IconCheck"]')).to.exist()
    })

    it('value "multiple" should render role="menuitemcheckbox" options with icon', async () => {
      await mount(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Group id="group0" selectableType="multiple">
              <Drilldown.Option id="groupOption01">Option</Drilldown.Option>
            </Drilldown.Group>
          </Drilldown.Page>
        </Drilldown>
      )

      const drilldown = await DrilldownLocator.find()
      const option = await drilldown.find('#groupOption01')
      const optionWrapper = await drilldown.findOptionWrapperByOptionId(
        'groupOption01'
      )

      expect(option.getAttribute('role')).to.equal('menuitemcheckbox')
      expect(await optionWrapper.find('[name="IconCheck"]')).to.exist()
    })
  })

  describe('defaultSelected', async () => {
    describe('if not provided', async () => {
      it('all group options has to be unselected', async () => {
        await mount(
          <Drilldown rootPageId="page0">
            <Drilldown.Page id="page0">
              <Drilldown.Group id="group0" selectableType="multiple">
                <Drilldown.Option id="groupOption01" value={1}>
                  Option
                </Drilldown.Option>
                <Drilldown.Option id="groupOption02" value={2}>
                  Option
                </Drilldown.Option>
                <Drilldown.Option id="groupOption03" value={3}>
                  Option
                </Drilldown.Option>
              </Drilldown.Group>
            </Drilldown.Page>
          </Drilldown>
        )

        const drilldown = await DrilldownLocator.find()
        const options = await drilldown.findAllOptions()

        await checkSelectedValues(options, [])
      })

      it('all checkboxes should not be visible', async () => {
        await mount(
          <Drilldown rootPageId="page0">
            <Drilldown.Page id="page0">
              <Drilldown.Group id="group0" selectableType="multiple">
                <Drilldown.Option id="groupOption01" value={1}>
                  Option
                </Drilldown.Option>
                <Drilldown.Option id="groupOption02" value={2}>
                  Option
                </Drilldown.Option>
                <Drilldown.Option id="groupOption03" value={3}>
                  Option
                </Drilldown.Option>
              </Drilldown.Group>
            </Drilldown.Page>
          </Drilldown>
        )

        const drilldown = await DrilldownLocator.find()
        const [_groupOptionWrapper, ...optionWrappers] =
          await drilldown.findAllOptionWrappers()

        for (const wrapper of optionWrappers) {
          const icon = await wrapper.find('[name="IconCheck"]')
          expect(getComputedStyle(icon.getDOMNode()).opacity).to.equal('0')
        }
      })
    })

    describe('if provided', async () => {
      it('all selected checkboxes should be visible', async () => {
        const selectedValues = ['item1', 'item3']
        await mount(
          <Drilldown rootPageId="page0">
            <Drilldown.Page id="page0">
              <Drilldown.Group
                id="group0"
                selectableType="multiple"
                defaultSelected={selectedValues}
              >
                {/* data-value attr is for testing purposes only */}
                <Drilldown.Option
                  id="groupOption01"
                  value="item1"
                  data-value="item1"
                >
                  Option
                </Drilldown.Option>
                <Drilldown.Option
                  id="groupOption02"
                  value="item2"
                  data-value="item2"
                >
                  Option
                </Drilldown.Option>
                <Drilldown.Option
                  id="groupOption03"
                  value="item3"
                  data-value="item3"
                >
                  Option
                </Drilldown.Option>
              </Drilldown.Group>
            </Drilldown.Page>
          </Drilldown>
        )

        const drilldown = await DrilldownLocator.find()
        const [_groupOptionWrapper, ...optionWrappers] =
          await drilldown.findAllOptionWrappers()

        for (const wrapper of optionWrappers) {
          const icon = await wrapper.find('[name="IconCheck"]')
          const option = await wrapper.find('[data-value]')
          const value = option.getAttribute('data-value')!
          if (selectedValues.includes(value)) {
            expect(getComputedStyle(icon.getDOMNode()).opacity).to.equal('1')
          } else {
            expect(getComputedStyle(icon.getDOMNode()).opacity).to.equal('0')
          }
        }
      })

      it("should be overridden by the Option's own defaultSelected", async () => {
        const selectedValues = ['item1', 'item3']
        await mount(
          <Drilldown rootPageId="page0">
            <Drilldown.Page id="page0">
              <Drilldown.Group
                id="group0"
                selectableType="multiple"
                defaultSelected={selectedValues}
              >
                {/* data-value attr is for testing purposes only */}
                <Drilldown.Option
                  id="groupOption01"
                  value="item1"
                  data-value="item1"
                >
                  Option
                </Drilldown.Option>
                <Drilldown.Option
                  id="groupOption02"
                  value="item2"
                  data-value="item2"
                  defaultSelected={true}
                >
                  Option
                </Drilldown.Option>
                <Drilldown.Option
                  id="groupOption03"
                  value="item3"
                  data-value="item3"
                  defaultSelected={false}
                >
                  Option
                </Drilldown.Option>
              </Drilldown.Group>
            </Drilldown.Page>
          </Drilldown>
        )

        const drilldown = await DrilldownLocator.find()
        const options = await drilldown.findAllOptions()

        // first item from the group,
        // second item from own prop,
        // third item "false" should override group's
        const expectedSelected = ['item1', 'item2']

        await checkSelectedValues(options, expectedSelected)
      })

      describe('for "multiple" selectableType', async () => {
        it('all selected options should be checked', async () => {
          const selectedValues = ['item1', 'item3']
          await mount(
            <Drilldown rootPageId="page0">
              <Drilldown.Page id="page0">
                <Drilldown.Group
                  id="group0"
                  selectableType="multiple"
                  defaultSelected={selectedValues}
                >
                  {/* data-value attr is for testing purposes only */}
                  <Drilldown.Option
                    id="groupOption01"
                    value="item1"
                    data-value="item1"
                  >
                    Option
                  </Drilldown.Option>
                  <Drilldown.Option
                    id="groupOption02"
                    value="item2"
                    data-value="item2"
                  >
                    Option
                  </Drilldown.Option>
                  <Drilldown.Option
                    id="groupOption03"
                    value="item3"
                    data-value="item3"
                  >
                    Option
                  </Drilldown.Option>
                </Drilldown.Group>
              </Drilldown.Page>
            </Drilldown>
          )

          const drilldown = await DrilldownLocator.find()
          const options = await drilldown.findAllOptions()

          await checkSelectedValues(options, selectedValues)
        })
      })

      describe('for "single" selectableType', async () => {
        it('the selected option should be checked', async () => {
          const selectedValues = ['item2']
          await mount(
            <Drilldown rootPageId="page0">
              <Drilldown.Page id="page0">
                <Drilldown.Group
                  id="group0"
                  selectableType="single"
                  defaultSelected={selectedValues}
                >
                  {/* data-value attr is for testing purposes only */}
                  <Drilldown.Option
                    id="groupOption01"
                    value="item1"
                    data-value="item1"
                  >
                    Option
                  </Drilldown.Option>
                  <Drilldown.Option
                    id="groupOption02"
                    value="item2"
                    data-value="item2"
                  >
                    Option
                  </Drilldown.Option>
                  <Drilldown.Option
                    id="groupOption03"
                    value="item3"
                    data-value="item3"
                  >
                    Option
                  </Drilldown.Option>
                </Drilldown.Group>
              </Drilldown.Page>
            </Drilldown>
          )

          const drilldown = await DrilldownLocator.find()
          const options = await drilldown.findAllOptions()

          await checkSelectedValues(options, selectedValues)
        })

        it("should throw error if multiple items are selected, and shouldn't select any item", async () => {
          const selectedValues = ['item1', 'item3']
          const consoleError = stub(console, 'error')
          await mount(
            <Drilldown rootPageId="page0">
              <Drilldown.Page id="page0">
                <Drilldown.Group
                  id="group0"
                  selectableType="single"
                  defaultSelected={selectedValues}
                >
                  {/* data-value attr is for testing purposes only */}
                  <Drilldown.Option
                    id="groupOption01"
                    value="item1"
                    data-value="item1"
                  >
                    Option
                  </Drilldown.Option>
                  <Drilldown.Option
                    id="groupOption02"
                    value="item2"
                    data-value="item2"
                  >
                    Option
                  </Drilldown.Option>
                  <Drilldown.Option
                    id="groupOption03"
                    value="item3"
                    data-value="item3"
                  >
                    Option
                  </Drilldown.Option>
                </Drilldown.Group>
              </Drilldown.Page>
            </Drilldown>
          )

          const drilldown = await DrilldownLocator.find()
          const options = await drilldown.findAllOptions()

          expect(consoleError).to.have.been.called()

          await checkSelectedValues(options, [])
        })
      })
    })
  })

  describe('selection', async () => {
    it('should fire "onSelect" callback', async () => {
      const onSelect = stub()
      await mount(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Group
              id="group0"
              selectableType="multiple"
              onSelect={onSelect}
            >
              {/* data-value attr is for testing purposes only */}
              <Drilldown.Option
                id="groupOption01"
                value="item1"
                data-value="item1"
              >
                Option
              </Drilldown.Option>
              <Drilldown.Option
                id="groupOption02"
                value="item2"
                data-value="item2"
              >
                Option
              </Drilldown.Option>
              <Drilldown.Option
                id="groupOption03"
                value="item3"
                data-value="item3"
              >
                Option
              </Drilldown.Option>
            </Drilldown.Group>
          </Drilldown.Page>
        </Drilldown>
      )

      const drilldown = await DrilldownLocator.find()
      const option2 = await drilldown.find('#groupOption02')

      await option2.click()

      expect(onSelect).to.have.been.calledWithMatch(match.object, {
        value: ['item2'],
        isSelected: true,
        selectedOption: match.object,
        drilldown: match.object
      })

      // 1st arg is the event
      expect(onSelect.lastCall.args[0].target).to.equal(option2.getDOMNode())

      expect(onSelect.lastCall.args[1].selectedOption.props.value).to.equal(
        'item2'
      )
      expect(typeof onSelect.lastCall.args[1].drilldown.hide).to.equal(
        'function'
      )
    })

    describe('for "multiple" selectableType', async () => {
      it('should toggle the selected option only', async () => {
        const selectedValues = ['item1', 'item2', 'item3']
        await mount(
          <Drilldown rootPageId="page0">
            <Drilldown.Page id="page0">
              <Drilldown.Group
                id="group0"
                selectableType="multiple"
                defaultSelected={selectedValues}
              >
                {/* data-value attr is for testing purposes only */}
                <Drilldown.Option
                  id="groupOption01"
                  value="item1"
                  data-value="item1"
                >
                  Option
                </Drilldown.Option>
                <Drilldown.Option
                  id="groupOption02"
                  value="item2"
                  data-value="item2"
                >
                  Option
                </Drilldown.Option>
                <Drilldown.Option
                  id="groupOption03"
                  value="item3"
                  data-value="item3"
                >
                  Option
                </Drilldown.Option>
              </Drilldown.Group>
            </Drilldown.Page>
          </Drilldown>
        )

        const drilldown = await DrilldownLocator.find()
        const options = await drilldown.findAllOptions()

        await checkSelectedValues(options, selectedValues)

        await options[1].click()

        await checkSelectedValues(options, ['item1', 'item3'])
      })
    })

    describe('for "single" selectableType', async () => {
      it('should toggle options in radio fashion', async () => {
        const selectedValues = ['item1']
        await mount(
          <Drilldown rootPageId="page0">
            <Drilldown.Page id="page0">
              <Drilldown.Group
                id="group0"
                selectableType="single"
                defaultSelected={selectedValues}
              >
                {/* data-value attr is for testing purposes only */}
                <Drilldown.Option
                  id="groupOption01"
                  value="item1"
                  data-value="item1"
                >
                  Option
                </Drilldown.Option>
                <Drilldown.Option
                  id="groupOption02"
                  value="item2"
                  data-value="item2"
                >
                  Option
                </Drilldown.Option>
                <Drilldown.Option
                  id="groupOption03"
                  value="item3"
                  data-value="item3"
                >
                  Option
                </Drilldown.Option>
              </Drilldown.Group>
            </Drilldown.Page>
          </Drilldown>
        )

        const drilldown = await DrilldownLocator.find()
        const options = await drilldown.findAllOptions()

        await checkSelectedValues(options, ['item1'])

        await options[1].click()

        await checkSelectedValues(options, ['item2'])
      })
    })
  })

  describe('themeOverride prop', async () => {
    it('should be passed to the Options component', async () => {
      await mount(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Group
              id="group0"
              renderGroupTitle="Group label"
              themeOverride={{ labelColor: 'rgb(100, 0, 0)' }}
            >
              <Drilldown.Option id="groupOption01">Option</Drilldown.Option>
              <Drilldown.Option id="groupOption02">Option</Drilldown.Option>
            </Drilldown.Group>
          </Drilldown.Page>
        </Drilldown>
      )

      const drilldown = await DrilldownLocator.find()
      const groupLabels = await drilldown.findAllGroupLabels()

      const groupLabelStyle = getComputedStyle(groupLabels[0].getDOMNode())

      expect(groupLabelStyle.color).to.equal('rgb(100, 0, 0)')
    })
  })
})
