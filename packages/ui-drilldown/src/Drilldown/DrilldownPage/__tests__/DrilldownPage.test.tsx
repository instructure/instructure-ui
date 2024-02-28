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

import { expect, mount, find, stub, wait } from '@instructure/ui-test-utils'

import { Drilldown } from '../../index'
import { DrilldownLocator } from '../../DrilldownLocator'

describe('<Drilldown.Page />', async () => {
  it("shouldn't render non-DrilldownPage children", async () => {
    stub(console, 'error')
    await mount(
      <Drilldown rootPageId="page0">
        <Drilldown.Page id="page0">
          <div id="testDiv">Div</div>
        </Drilldown.Page>
      </Drilldown>
    )

    const div = await find('#testDiv', { expectEmpty: true })

    expect(div).to.not.exist()
  })

  describe('header title', async () => {
    it('should be displayed in the header', async () => {
      await mount(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0" renderTitle="HeaderTitleString">
            <Drilldown.Option id="option1">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      const drilldown = await DrilldownLocator.find()
      const headerTitleOption = await drilldown.findHeaderTitle()

      expect(
        await headerTitleOption.find(':contains(HeaderTitleString)')
      ).to.exist()
    })

    it('should be displayed when function is passed', async () => {
      await mount(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0" renderTitle={() => 'HeaderTitleFunction'}>
            <Drilldown.Option id="option1">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      const drilldown = await DrilldownLocator.find()
      const headerTitleOption = await drilldown.findHeaderTitle()

      expect(
        await headerTitleOption.find(':contains(HeaderTitleFunction)')
      ).to.exist()
    })

    it("shouldn't be displayed when function has no return value", async () => {
      await mount(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0" renderTitle={() => null}>
            <Drilldown.Option id="option1">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      const drilldown = await DrilldownLocator.find()
      const allOptions = await drilldown.findAllOptions()

      // it should only contain the 1 item but not the header
      expect(allOptions.length).to.equal(1)
    })
  })

  describe('header action label', async () => {
    it('should be displayed in the header', async () => {
      await mount(
        <Drilldown rootPageId="page0">
          <Drilldown.Page
            id="page0"
            renderActionLabel="HeaderActionLabelString"
          >
            <Drilldown.Option id="option1">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      const drilldown = await DrilldownLocator.find()
      const headerActionOption = await drilldown.findHeaderActionOption()

      expect(
        await headerActionOption.find(':contains(HeaderActionLabelString)')
      ).to.exist()
    })

    it('should be displayed when function is passed', async () => {
      await mount(
        <Drilldown rootPageId="page0">
          <Drilldown.Page
            id="page0"
            renderActionLabel={() => 'HeaderActionLabelFunction'}
          >
            <Drilldown.Option id="option1">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      const drilldown = await DrilldownLocator.find()
      const headerActionOption = await drilldown.findHeaderActionOption()

      expect(
        await headerActionOption.find(':contains(HeaderActionLabelFunction)')
      ).to.exist()
    })

    it("shouldn't be displayed when function has no return value", async () => {
      await mount(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0" renderActionLabel={() => null}>
            <Drilldown.Option id="option1">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      const drilldown = await DrilldownLocator.find()
      const allOptions = await drilldown.findAllOptions()

      // it should only contain the 1 item but not the header
      expect(allOptions.length).to.equal(1)
    })

    it('should fire header action callback', async () => {
      const actionCallback = stub()
      await mount(
        <Drilldown rootPageId="page0">
          <Drilldown.Page
            id="page0"
            renderActionLabel="ActionWithCallback"
            onHeaderActionClicked={actionCallback}
          >
            <Drilldown.Option id="option1">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      const drilldown = await DrilldownLocator.find()
      const actionOption = await drilldown.findHeaderActionOption()

      await actionOption.click()

      await wait(() => {
        expect(actionCallback).to.have.been.called()
      })
    })
  })

  describe('header back navigation', async () => {
    it('should not be displayed on root page', async () => {
      await mount(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0" renderBackButtonLabel="HeaderBackString">
            <Drilldown.Option id="option1">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      const drilldown = await DrilldownLocator.find()
      const headerBackOption = await drilldown.findHeaderBackOption({
        expectEmpty: true
      })

      expect(headerBackOption).to.not.exist()
    })

    it('should be displayed on subpages', async () => {
      await mount(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option1" subPageId="page2">
              Option
            </Drilldown.Option>
          </Drilldown.Page>
          <Drilldown.Page id="page2" renderBackButtonLabel="HeaderBackString">
            <Drilldown.Option id="option2">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      const drilldown = await DrilldownLocator.find()
      const subPageOption = await drilldown.find('#option1')

      await subPageOption.click()

      const headerBackOption = await drilldown.findHeaderBackOption()

      expect(
        await headerBackOption.find(':contains(HeaderBackString)')
      ).to.exist()
    })

    it('should be displayed when function is passed, and can use former page title', async () => {
      await mount(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0" renderTitle="Page Title">
            <Drilldown.Option id="option1" subPageId="page2">
              Option
            </Drilldown.Option>
          </Drilldown.Page>
          <Drilldown.Page
            id="page2"
            renderBackButtonLabel={(prevPageTitle) =>
              `Back to ${prevPageTitle}`
            }
          >
            <Drilldown.Option id="option2">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      const drilldown = await DrilldownLocator.find()
      const subPageOption = await drilldown.find('#option1')

      await subPageOption.click()

      const headerBackOption = await drilldown.findHeaderBackOption()

      expect(
        await headerBackOption.find(':contains(Back to Page Title)')
      ).to.exist()
    })

    it('should have a back arrow', async () => {
      await mount(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option1" subPageId="page2">
              Option
            </Drilldown.Option>
          </Drilldown.Page>
          <Drilldown.Page id="page2" renderBackButtonLabel="HeaderBackString">
            <Drilldown.Option id="option2">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      const drilldown = await DrilldownLocator.find()
      const subPageOption = await drilldown.find('#option1')

      await subPageOption.click()

      const headerBackOption = await drilldown.findHeaderBackOption()
      const headerBackOptionContainer = await headerBackOption.getParentNode()!

      expect(
        await headerBackOptionContainer.querySelector(
          'svg[name="IconArrowOpenStart"]'
        )
      ).to.exist()
    })

    it('should still display the back icon, even if function has no return value', async () => {
      await mount(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0" renderTitle="Page Title">
            <Drilldown.Option id="option1" subPageId="page2">
              Option
            </Drilldown.Option>
          </Drilldown.Page>
          <Drilldown.Page id="page2" renderBackButtonLabel={() => null}>
            <Drilldown.Option id="option2">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      const drilldown = await DrilldownLocator.find()
      const subPageOption = await drilldown.find('#option1')

      await subPageOption.click()

      const headerBackOption = await drilldown.findHeaderBackOption()
      const headerBackOptionContainer = await headerBackOption.getParentNode()!

      expect(
        await headerBackOptionContainer.querySelector(
          'svg[name="IconArrowOpenStart"]'
        )
      ).to.exist()
    })

    it('should fire onBackButtonClicked on click', async () => {
      const backNavCallback = stub()
      await mount(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0" renderTitle="Page Title">
            <Drilldown.Option id="option1" subPageId="page2">
              Option
            </Drilldown.Option>
          </Drilldown.Page>
          <Drilldown.Page id="page2" onBackButtonClicked={backNavCallback}>
            <Drilldown.Option id="option2">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      const drilldown = await DrilldownLocator.find()
      const subPageOption = await drilldown.find('#option1')

      await subPageOption.click()

      const headerBackOption = await drilldown.findHeaderBackOption()

      await headerBackOption.click()

      await wait(() => {
        expect(backNavCallback).to.have.been.called()
      })
    })

    it('should go back one page on click', async () => {
      await mount(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0" renderTitle="Page Title">
            <Drilldown.Option id="option1" subPageId="page2">
              Option
            </Drilldown.Option>
          </Drilldown.Page>
          <Drilldown.Page id="page2">
            <Drilldown.Option id="option2">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      const drilldown = await DrilldownLocator.find()
      const subPageOption = await drilldown.find('#option1')

      await subPageOption.click()

      const headerBackOption = await drilldown.findHeaderBackOption()

      await headerBackOption.click()

      const subPageOption2 = await drilldown.find('#option1')

      expect(subPageOption2).to.exist()
    })
  })

  describe('header separator', async () => {
    it('should not be displayed, if no item is on the header', async () => {
      await mount(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option1">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      const drilldown = await DrilldownLocator.find()
      const separator = await drilldown.findHeaderSeparator({
        expectEmpty: true
      })

      expect(separator).to.not.exist()
    })

    it('should be displayed, if there are items in the header', async () => {
      await mount(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0" renderTitle="Title">
            <Drilldown.Option id="option1">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      const drilldown = await DrilldownLocator.find()
      const separator = await drilldown.findHeaderSeparator()

      expect(separator).to.exist()
    })

    it('should be displayed, if withoutHeaderSeparator is set', async () => {
      await mount(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0" renderTitle="Title" withoutHeaderSeparator>
            <Drilldown.Option id="option1">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      const drilldown = await DrilldownLocator.find()
      const separator = await drilldown.findHeaderSeparator({
        expectEmpty: true
      })

      expect(separator).to.not.exist()
    })
  })

  describe('disabled prop', async () => {
    it('should make all options disabled', async () => {
      await mount(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0" renderActionLabel="Action Label" disabled>
            <Drilldown.Option id="option1">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      const drilldown = await DrilldownLocator.find()
      const allOptions = await drilldown.findAllOptions()

      allOptions.forEach((option) => {
        expect(option.getAttribute('aria-disabled')).to.equal('true')
      })
    })

    it("shouldn't make header Back options disabled", async () => {
      await mount(
        <Drilldown rootPageId="page0">
          <Drilldown.Page id="page0">
            <Drilldown.Option id="option1" subPageId="page2">
              Option
            </Drilldown.Option>
          </Drilldown.Page>
          <Drilldown.Page
            id="page2"
            disabled
            renderBackButtonLabel="HeaderBackString"
          >
            <Drilldown.Option id="option2">Option</Drilldown.Option>
          </Drilldown.Page>
        </Drilldown>
      )

      const drilldown = await DrilldownLocator.find()
      const subPageOption = await drilldown.find('#option1')

      await subPageOption.click()

      const allOptions = await drilldown.findAllOptions()

      allOptions.forEach((option) => {
        if (option.getAttribute('id')!.includes('DrilldownHeader-Back')) {
          expect(option.getAttribute('aria-disabled')).to.equal(null)
        } else {
          expect(option.getAttribute('aria-disabled')).to.equal('true')
        }
      })
    })
  })
})
