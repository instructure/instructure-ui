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
import { expect, match, mount, stub } from '@instructure/ui-test-utils'

import { IconCheckSolid } from '@instructure/ui-icons'

import { Drilldown } from '../../index'
import { DrilldownLocator } from '../../DrilldownLocator'

describe('<Drilldown.Option />', async () => {
  describe('id prop', async () => {
    it('should throw warning the id is not provided', async () => {
      stub(console, 'error')
      const consoleWarning = stub(console, 'warn')

      await mount(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            {/* @ts-expect-error we want this to fail*/}
            <Drilldown.Option>Option1</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      expect(consoleWarning).to.have.been.calledWith(
        "Warning: Drilldown.Option without id won't be rendered. It is needed to internally track the options."
      )
    })

    it('should throw warning the id is duplicated', async () => {
      const consoleWarning = stub(console, 'warn')

      await mount(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option1">Option1</Drilldown.Option>
            <Drilldown.Option id="option1">Option2</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      expect(consoleWarning).to.have.been.calledWith(
        'Warning: Duplicate id: "option1"! Make sure all options have unique ids, otherwise they won\'t be rendered.'
      )
    })

    it('should not render the options with duplicated id', async () => {
      stub(console, 'warn')

      await mount(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option1">Option1</Drilldown.Option>
            <Drilldown.Option id="option1">Option2</Drilldown.Option>
            <Drilldown.Option id="option1">Option3</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      const drilldown = await DrilldownLocator.find()
      const allOptions = await drilldown.findAllOptions({ expectEmpty: true })

      expect(allOptions.length).to.equal(0)
    })
  })

  describe('children function prop', async () => {
    it('should throw warning if it returns nothing', async () => {
      const consoleWarning = stub(console, 'warn')

      await mount(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option1">{() => null}</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      expect(consoleWarning).to.have.been.calledWith(
        'Warning: There are no "children" prop provided for option with id: "option1", so it won\'t be rendered.'
      )
    })

    it('should provide props as parameters', async () => {
      const childrenFunction = stub()
      childrenFunction.returns('Option')

      await mount(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option1">{childrenFunction}</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      expect(childrenFunction).to.have.been.calledWith({
        id: 'option1',
        variant: 'default',
        isSelected: false
      })
    })
  })

  describe('elementRef prop', async () => {
    it('should give back to ref for the option wrapper (Options.Item)', async () => {
      const elementRef = stub(console, 'warn')
      await mount(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option1" elementRef={elementRef}>
              Option
            </Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      const drilldown = await DrilldownLocator.find()
      const wrapper = await drilldown.findOptionWrapperByOptionId('option1')

      expect(elementRef).to.have.been.calledWith(wrapper.getDOMNode())
    })
  })

  describe('subPageId prop', async () => {
    it('should display arrow icon', async () => {
      await mount(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option1" subPageId="page1">
              Option
            </Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      const drilldown = await DrilldownLocator.find()
      const wrapper = await drilldown.findOptionWrapperByOptionId('option1')
      const icon = await wrapper.find('[name="IconArrowOpenEnd"]')

      expect(icon).to.exist()
    })

    it('should indicate subpage fo SR', async () => {
      await mount(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option1" subPageId="page1">
              Option
            </Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      const drilldown = await DrilldownLocator.find()
      const option = await drilldown.find('#option1')

      expect(option.getAttribute('aria-haspopup')).to.equal('true')
      expect(option.getAttribute('role')).to.equal('button')
    })

    it('should navigate to subPage on select', async () => {
      await mount(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option01" subPageId="page1">
              Option
            </Drilldown.Option>
          </Drilldown.Page>
          <Drilldown.Page id="page1">
            <Drilldown.Option id="option11">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      const drilldown = await DrilldownLocator.find()
      const option = await drilldown.find('#option01')

      await option.click()

      const option2 = await drilldown.find('#option11')

      expect(option2).to.be.visible()
    })
  })

  describe('disabled prop', async () => {
    it('should mark option as disabled for SR', async () => {
      await mount(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option1" disabled>
              Option
            </Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      const drilldown = await DrilldownLocator.find()
      const option = await drilldown.find('#option1')

      expect(option.getAttribute('aria-disabled')).to.equal('true')
    })

    it('should apply disabled css style', async () => {
      await mount(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option1" disabled>
              Option
            </Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      const drilldown = await DrilldownLocator.find()
      const option = await drilldown.find('#option1')
      const style = getComputedStyle(option.getDOMNode())

      expect(style.color).to.equal('rgb(45, 59, 69)')
      expect(style.cursor).to.equal('not-allowed')
    })
  })

  describe('href prop', async () => {
    it('should display option as link', async () => {
      await mount(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option1" href="/helloWorld">
              Option
            </Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      const drilldown = await DrilldownLocator.find()
      const option = await drilldown.find('#option1')

      expect(option.getTagName()).to.equal('a')
      expect(option.getAttribute('href')).to.equal('/helloWorld')
    })

    it('should navigate to url on Focus + Space', async () => {
      await mount(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option1" href="#helloWorld">
              Option
            </Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      const drilldown = await DrilldownLocator.find()
      const option = await drilldown.find('#option1')

      await option.focus()
      await option.keyDown('space')

      expect(window.location.hash).to.equal('#helloWorld')
      // reset hash
      window.location.hash = ''
    })

    it('should navigate to url on Click', async () => {
      await mount(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option1" href="#helloWorld">
              Option
            </Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      const drilldown = await DrilldownLocator.find()
      const option = await drilldown.find('#option1')

      await option.click()

      expect(window.location.hash).to.equal('#helloWorld')
      // reset hash
      window.location.hash = ''
    })

    it("shouldn't navigate to url, if disabled", async () => {
      await mount(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option1" href="#helloWorld" disabled>
              Option
            </Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      const drilldown = await DrilldownLocator.find()
      const option = await drilldown.find('#option1')

      // reset hash
      window.location.hash = ''

      await option.click()

      expect(window.location.hash).to.equal('')
    })

    it('should throw warning if subPageId is provided too', async () => {
      const consoleWarning = stub(console, 'warn')
      await mount(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option1" href="/helloWorld" subPageId="page1">
              Option
            </Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      const drilldown = await DrilldownLocator.find()
      const option = await drilldown.find('#option1')

      expect(option.getTagName()).to.not.equal('a')
      expect(option.getAttribute('href')).to.equal(null)
      expect(consoleWarning).to.have.been.calledWith(
        'Warning: Drilldown.Option with id "option1" has subPageId, so it will ignore the "href" property.'
      )
    })

    it('should throw warning if option is in selectable group', async () => {
      const consoleWarning = stub(console, 'warn')
      await mount(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Group id="group0" selectableType="multiple">
              <Drilldown.Option id="groupOption01" href="/helloWorld">
                Option
              </Drilldown.Option>
            </Drilldown.Group>
          </Drilldown.Page>
        </Drilldown>
      )

      const drilldown = await DrilldownLocator.find()
      const option = await drilldown.find('#groupOption01')

      expect(option.getTagName()).to.not.equal('a')
      expect(option.getAttribute('href')).to.equal(null)
      expect(consoleWarning).to.have.been.calledWith(
        'Warning: Drilldown.Option with id "groupOption01" is in a selectable group, so it will ignore the "href" property.'
      )
    })
  })

  describe('as prop', async () => {
    it('should render option as `li` by default', async () => {
      await mount(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option1">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      const drilldown = await DrilldownLocator.find()
      const wrapper = await drilldown.findOptionWrapperByOptionId('option1')

      expect(wrapper.getDOMNode()).to.have.tagName('li')
    })

    it('should force option to be `li` while the parent is "ul" or "ol"', async () => {
      await mount(
        <Drilldown rootPageId="page0" as="ol">
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option1" as="div">
              Option
            </Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      const drilldown = await DrilldownLocator.find()
      const wrapper = await drilldown.findOptionWrapperByOptionId('option1')

      expect(wrapper.getDOMNode()).to.have.tagName('li')
    })

    it('should render option as specified html element, when the parent in non-list element', async () => {
      await mount(
        <Drilldown rootPageId="page0" as="div">
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option1" as="div">
              Option
            </Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      const drilldown = await DrilldownLocator.find()
      const wrapper = await drilldown.findOptionWrapperByOptionId('option1')

      expect(wrapper.getDOMNode()).to.have.tagName('div')
    })
  })

  describe('role prop', async () => {
    it('should be "menuitem" by default', async () => {
      await mount(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option1">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      const drilldown = await DrilldownLocator.find()
      const option = await drilldown.find('#option1')

      expect(option.getAttribute('role')).to.equal('menuitem')
    })

    it('should be applied on prop', async () => {
      await mount(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option1" role="presentation">
              Option
            </Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      const drilldown = await DrilldownLocator.find()
      const option = await drilldown.find('#option1')

      expect(option.getAttribute('role')).to.equal('presentation')
    })
  })

  describe('renderLabelInfo prop', async () => {
    it('should display tag next to the label', async () => {
      await mount(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option1" renderLabelInfo="Info">
              Option
            </Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      const drilldown = await DrilldownLocator.find()
      const tag = await drilldown.findLabelInfo()

      expect(tag).to.exist()
    })

    it('as function should have option props as params', async () => {
      const infoFunction = stub()
      infoFunction.returns('Info')

      await mount(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option1" renderLabelInfo={infoFunction}>
              Option
            </Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      expect(infoFunction).to.have.been.calledWith({
        variant: 'default',
        vAlign: 'start',
        as: 'li',
        role: 'menuitem',
        isSelected: false
      })
    })

    it('should be affected by afterLabelContentVAlign prop', async () => {
      await mount(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Option
              id="option1"
              renderLabelInfo="Info"
              afterLabelContentVAlign="end"
            >
              Option
            </Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      const drilldown = await DrilldownLocator.find()
      const tag = await drilldown.findLabelInfo()

      expect(getComputedStyle(tag.getDOMNode()).alignSelf).to.equal('flex-end')
    })
  })

  describe('renderBeforeLabel prop', async () => {
    it('should display icon before the label', async () => {
      await mount(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Option
              id="option1"
              renderBeforeLabel={<IconCheckSolid />}
            >
              Option
            </Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      const drilldown = await DrilldownLocator.find()
      const wrapper = await drilldown.findOptionWrapperByOptionId('option1')
      const icon = await wrapper.find('[name="IconCheck"]')

      expect(icon).to.exist()
    })

    it('as function should have option props as params', async () => {
      const beforeLabelFunction = stub()
      beforeLabelFunction.returns(<IconCheckSolid />)

      await mount(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Option
              id="option1"
              renderBeforeLabel={beforeLabelFunction}
            >
              Option
            </Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      expect(beforeLabelFunction).to.have.been.calledWith({
        variant: 'default',
        vAlign: 'start',
        as: 'li',
        role: 'menuitem',
        isSelected: false
      })
    })

    it('should throw warning if it is in selectable group', async () => {
      const consoleWarning = stub(console, 'warn')

      await mount(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Group id="group1" selectableType="multiple">
              <Drilldown.Option id="groupOption1" renderBeforeLabel="Before">
                Option
              </Drilldown.Option>
            </Drilldown.Group>
          </Drilldown.Page>
        </Drilldown>
      )

      expect(consoleWarning).to.have.been.calledWith(
        'Warning: The prop "renderBeforeLabel" is reserved on item with id: "groupOption1". When this option is a selectable member of a Drilldown.Group, selection indicator will render before the label.'
      )
    })
  })

  describe('renderAfterLabel prop', async () => {
    it('should display icon before the label', async () => {
      await mount(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Option
              id="option1"
              renderAfterLabel={<IconCheckSolid />}
            >
              Option
            </Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      const drilldown = await DrilldownLocator.find()
      const wrapper = await drilldown.findOptionWrapperByOptionId('option1')
      const icon = await wrapper.find('[name="IconCheck"]')

      expect(icon).to.exist()
    })

    it('as function should have option props as params', async () => {
      const beforeLabelFunction = stub()
      beforeLabelFunction.returns(<IconCheckSolid />)

      await mount(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Option
              id="option1"
              renderAfterLabel={beforeLabelFunction}
            >
              Option
            </Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      expect(beforeLabelFunction).to.have.been.calledWith({
        variant: 'default',
        vAlign: 'start',
        as: 'li',
        role: 'menuitem',
        isSelected: false
      })
    })

    it('should throw warning if it has subPageId', async () => {
      const consoleWarning = stub(console, 'warn')
      await mount(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Option
              id="option1"
              subPageId="page1"
              renderAfterLabel="after"
            >
              Option
            </Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      expect(consoleWarning).to.have.been.calledWith(
        'Warning: The prop "renderAfterLabel" is reserved on item with id: "option1". When it has "subPageId" provided, a navigation arrow will render after the label.'
      )
    })
  })

  describe('description prop', async () => {
    it('should display description under the option', async () => {
      await mount(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option1" description="This is a description.">
              Option
            </Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      const drilldown = await DrilldownLocator.find()
      const description = await drilldown.findDescription()

      expect(description).to.have.text('This is a description.')
    })

    it('as a function should display description under the option', async () => {
      await mount(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Option
              id="option1"
              description={() => 'This is a description.'}
            >
              Option
            </Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      const drilldown = await DrilldownLocator.find()
      const description = await drilldown.findDescription()

      expect(description).to.have.text('This is a description.')
    })
  })

  describe('descriptionRole prop', async () => {
    it('should set the role of description', async () => {
      await mount(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Option
              id="option1"
              description="This is a description."
              descriptionRole="button"
            >
              Option
            </Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      const drilldown = await DrilldownLocator.find()
      const description = await drilldown.findDescription()

      expect(description.getAttribute('role')).to.equal('button')
    })
  })

  describe('onOptionClick callback', async () => {
    it('should fire on click with correct params', async () => {
      const onOptionClick = stub()
      await mount(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option1" onOptionClick={onOptionClick}>
              Option
            </Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      const drilldown = await DrilldownLocator.find()
      const option = await drilldown.find('#option1')

      await option.click()

      expect(onOptionClick).to.have.been.calledWithMatch(match.object, {
        optionId: 'option1',
        drilldown: match.object,
        pageHistory: ['page0'],
        goToPage: match.func,
        goToPreviousPage: match.func
      })
    })

    describe('should provide goToPreviousPage method', async () => {
      it('that goes back to the previous page', async () => {
        await mount(
          <Drilldown rootPageId="page0">
            <Drilldown.Page id="page0">
              <Drilldown.Option id="option01" subPageId="page1">
                Option
              </Drilldown.Option>
            </Drilldown.Page>

            <Drilldown.Page id="page1">
              <Drilldown.Option
                id="option11"
                onOptionClick={(_e, { goToPreviousPage }) => {
                  goToPreviousPage()
                }}
              >
                Option
              </Drilldown.Option>
            </Drilldown.Page>
          </Drilldown>
        )

        const drilldown = await DrilldownLocator.find()
        const page0Option = await drilldown.find('#option01')

        await page0Option.click()

        const page1Option = await drilldown.find('#option11')

        await page1Option.click()

        const page0Option2 = await drilldown.find('#option01')

        expect(page0Option2).to.be.visible()
      })

      it('that throws a warning, if there is no previous page', async () => {
        const consoleWarning = stub(console, 'warn')
        await mount(
          <Drilldown rootPageId="page0">
            <Drilldown.Page id="page0">
              <Drilldown.Option
                id="option01"
                onOptionClick={(_e, { goToPreviousPage }) => {
                  goToPreviousPage()
                }}
              >
                Option
              </Drilldown.Option>
            </Drilldown.Page>
          </Drilldown>
        )

        const drilldown = await DrilldownLocator.find()
        const page0Option = await drilldown.find('#option01')

        await page0Option.click()

        expect(consoleWarning).to.have.been.calledWith(
          'Warning: There is no previous page to go to. The current page history is: [page0].'
        )
      })
    })

    describe('should provide goToPage method', async () => {
      it('that can be used to go back a page', async () => {
        await mount(
          <Drilldown rootPageId="page0">
            <Drilldown.Page id="page0">
              <Drilldown.Option id="option01" subPageId="page1">
                Option
              </Drilldown.Option>
            </Drilldown.Page>

            <Drilldown.Page id="page1">
              <Drilldown.Option
                id="option11"
                onOptionClick={(_e, { pageHistory, goToPage }) => {
                  goToPage(pageHistory[0])
                }}
              >
                Option
              </Drilldown.Option>
            </Drilldown.Page>
          </Drilldown>
        )

        const drilldown = await DrilldownLocator.find()
        const page0Option = await drilldown.find('#option01')

        await page0Option.click()

        const page1Option = await drilldown.find('#option11')

        await page1Option.click()

        const page0Option2 = await drilldown.find('#option01')

        expect(page0Option2).to.be.visible()
      })

      it('that can be used to go to a new, existing page', async () => {
        await mount(
          <Drilldown rootPageId="page0">
            <Drilldown.Page id="page0">
              <Drilldown.Option
                id="option01"
                onOptionClick={(_e, { goToPage }) => {
                  goToPage('page1')
                }}
              >
                Option
              </Drilldown.Option>
            </Drilldown.Page>

            <Drilldown.Page id="page1">
              <Drilldown.Option id="option11">Option</Drilldown.Option>
            </Drilldown.Page>
          </Drilldown>
        )

        const drilldown = await DrilldownLocator.find()
        const page0Option = await drilldown.find('#option01')

        await page0Option.click()

        const page1Option = await drilldown.find('#option11')

        expect(page1Option).to.be.visible()
      })

      describe('that throws warning', async () => {
        it("if page doesn't exist", async () => {
          const consoleWarning = stub(console, 'warn')
          await mount(
            <Drilldown rootPageId="page0">
              <Drilldown.Page id="page0">
                <Drilldown.Option
                  id="option01"
                  onOptionClick={(_e, { goToPage }) => {
                    goToPage('page1')
                  }}
                >
                  Option
                </Drilldown.Option>
              </Drilldown.Page>
            </Drilldown>
          )

          const drilldown = await DrilldownLocator.find()
          const page0Option = await drilldown.find('#option01')

          await page0Option.click()

          expect(consoleWarning).to.have.been.calledWith(
            'Warning: Cannot go to page because page with id: "page1" doesn\'t exist.'
          )
        })

        it('if if no page id is provided', async () => {
          const consoleWarning = stub(console, 'warn')
          await mount(
            <Drilldown rootPageId="page0">
              <Drilldown.Page id="page0">
                <Drilldown.Option
                  id="option01"
                  onOptionClick={(_e, { goToPage }) => {
                    // @ts-expect-error we want this to fail
                    goToPage()
                  }}
                >
                  Option
                </Drilldown.Option>
              </Drilldown.Page>
            </Drilldown>
          )

          const drilldown = await DrilldownLocator.find()
          const page0Option = await drilldown.find('#option01')

          await page0Option.click()

          expect(consoleWarning).to.have.been.calledWith(
            'Warning: Cannot go to page because there was no page id provided.'
          )
        })

        it('if parameter is not string', async () => {
          const consoleWarning = stub(console, 'warn')
          await mount(
            <Drilldown rootPageId="page0">
              <Drilldown.Page id="page0">
                <Drilldown.Option
                  id="option01"
                  onOptionClick={(_e, { goToPage }) => {
                    // @ts-expect-error we want this to fail
                    goToPage({ page: 'page1' })
                  }}
                >
                  Option
                </Drilldown.Option>
              </Drilldown.Page>
            </Drilldown>
          )

          const drilldown = await DrilldownLocator.find()
          const page0Option = await drilldown.find('#option01')

          await page0Option.click()

          expect(consoleWarning).to.have.been.calledWith(
            'Warning: Cannot go to page because parameter newPageId has to be string (valid page id). Current newPageId is "object".'
          )
        })
      })
    })
  })

  describe('themeOverride prop', async () => {
    it('should be passed to the Options.Item component', async () => {
      await mount(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Option
              id="option01"
              themeOverride={{
                color: 'rgb(0, 0, 100)',
                background: 'rgb(200, 200, 200)'
              }}
            >
              Option
            </Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      const drilldown = await DrilldownLocator.find()
      const optionWrapper = await drilldown.findOptionWrapperByOptionId(
        'option01'
      )
      const groupLabelStyle = getComputedStyle(optionWrapper.getDOMNode())

      expect(groupLabelStyle.color).to.equal('rgb(0, 0, 100)')
      expect(groupLabelStyle.backgroundColor).to.equal('rgb(200, 200, 200)')
    })
  })
})
