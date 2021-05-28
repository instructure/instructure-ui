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
import { expect, mount, spy, stub, wait } from '@instructure/ui-test-utils'

import { Tabs } from '../index'
import { TabsLocator } from '../TabsLocator'

describe('<Tabs />', async () => {
  it('should render the correct number of panels', async () => {
    await mount(
      <Tabs>
        <Tabs.Panel renderTitle="First Tab">Tab 1 content</Tabs.Panel>
        <Tabs.Panel renderTitle="Second Tab">Tab 2 content</Tabs.Panel>
        <Tabs.Panel renderTitle="Third Tab" isDisabled>
          Tab 3 content
        </Tabs.Panel>
      </Tabs>
    )

    const tabs = await TabsLocator.find()
    const panels = await tabs.findAllTabPanels()

    expect(panels).to.have.length(3)
  })

  it('should render with null children', async () => {
    await mount(
      <Tabs>
        <Tabs.Panel renderTitle="First Tab">Tab 1 content</Tabs.Panel>
        <Tabs.Panel renderTitle="Second Tab">Tab 2 content</Tabs.Panel>
        <Tabs.Panel renderTitle="Third Tab" isDisabled>
          Tab 3 content
        </Tabs.Panel>
        {null}
      </Tabs>
    )

    const tabs = await TabsLocator.find()
    const panels = await tabs.findAllTabPanels()

    expect(panels).to.have.length(3)
  })

  it('should render correct number of tabs', async () => {
    await mount(
      <Tabs>
        <Tabs.Panel renderTitle="First Tab">Tab 1 content</Tabs.Panel>
        <Tabs.Panel renderTitle="Second Tab">Tab 2 content</Tabs.Panel>
        <Tabs.Panel renderTitle="Third Tab" isDisabled>
          Tab 3 content
        </Tabs.Panel>
      </Tabs>
    )

    const tabs = await TabsLocator.find()
    const tabButtons = await tabs.findAllTabs()

    expect(tabButtons.length).to.equal(3)
  })

  it('should be okay with rendering without any children', async () => {
    stub(console, 'warn') // suppress Focusable warnings
    let error = false
    try {
      await mount(<Tabs></Tabs>)
    } catch (e) {
      error = true
    }

    expect(error).to.be.false()
  })

  it('should not allow invalid children', async () => {
    const cs = spy(console, 'error')
    const warning =
      "Failed prop type: Expected one of Panel,  in Tabs but found 'div'"

    await mount(
      <Tabs>
        <div>foo</div>
      </Tabs>
    )

    expect(cs).to.have.been.calledWithMatch(warning)
  })

  it('should preserve Tab.Panel keys', async () => {
    let tabs

    const subject = await mount(
      <Tabs
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ children: Element; componentRef: (el: any)... Remove this comment to see the full error message
        componentRef={(el) => {
          tabs = el
        }}
      >
        <Tabs.Panel renderTitle="foo" key="foo" />
      </Tabs>
    )

    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'children' implicitly has an 'any'... Remove this comment to see the full error message
    const verifyChildKeys = ({ children }) => {
      const childrenArray = Array.isArray(children) ? children : [children]
      childrenArray.forEach((child) => {
        expect(child.props.renderTitle).to.equal(child.key)
      })
    }

    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    verifyChildKeys(tabs.props)

    await subject.setProps({
      children: [
        <Tabs.Panel renderTitle="foo" key="foo" />,
        <Tabs.Panel renderTitle="bar" key="bar" />
      ]
    })

    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    verifyChildKeys(tabs.props)
  })

  it('should default to selecting the first tab', async () => {
    await mount(
      <Tabs>
        <Tabs.Panel renderTitle="First Tab">Tab 1 content</Tabs.Panel>
        <Tabs.Panel renderTitle="Second Tab">Tab 2 content</Tabs.Panel>
        <Tabs.Panel renderTitle="Third Tab" isDisabled>
          Tab 3 content
        </Tabs.Panel>
      </Tabs>
    )

    const tabs = await TabsLocator.find()

    expect(await tabs.findSelectedTab(':contains(First Tab)')).to.exist()
    const selectedTabsPanel = await tabs.findTabPanel(
      ':contains(Tab 1 content)'
    )
    expect(selectedTabsPanel.getAttribute('aria-hidden')).to.not.exist()
  })

  it('should honor the isSelected prop', async () => {
    await mount(
      <Tabs>
        <Tabs.Panel renderTitle="First Tab">Tab 1 content</Tabs.Panel>
        <Tabs.Panel renderTitle="Second Tab" isSelected>
          Tab 2 content
        </Tabs.Panel>
        <Tabs.Panel renderTitle="Third Tab" isDisabled>
          Tab 3 content
        </Tabs.Panel>
      </Tabs>
    )

    const tabs = await TabsLocator.find()

    expect(await tabs.findSelectedTab(':contains(Second Tab)')).to.exist()
    const secondPanel = await tabs.findTabPanel(':contains(Tab 2 content)')
    expect(secondPanel.getAttribute('aria-hidden')).to.not.exist()
  })

  it('should not allow selecting a disabled tab', async () => {
    await mount(
      <Tabs>
        <Tabs.Panel renderTitle="First Tab">Tab 1 content</Tabs.Panel>
        <Tabs.Panel renderTitle="Second Tab">Tab 2 content</Tabs.Panel>
        <Tabs.Panel renderTitle="Third Tab" isDisabled isSelected>
          Tab 3 content
        </Tabs.Panel>
      </Tabs>
    )

    const tabs = await TabsLocator.find()

    expect(
      await tabs.findSelectedTab(':contains(Third Tab)', {
        expectEmpty: true
      })
    ).to.not.exist()

    expect(await tabs.findSelectedTab(':contains(First Tab)')).to.exist()

    const panels = await tabs.findAllTabPanels()
    expect(panels[2].getAttribute('aria-hidden')).to.equal('true')
  })

  it('should call onRequestTabChange when selection changes via click', async () => {
    const onChange = stub()

    await mount(
      <Tabs onRequestTabChange={onChange}>
        <Tabs.Panel renderTitle="First Tab" isSelected id="one">
          Tab 1 content
        </Tabs.Panel>
        <Tabs.Panel renderTitle="Second Tab" id="two">
          Tab 2 content
        </Tabs.Panel>
        <Tabs.Panel renderTitle="Third Tab" isDisabled id="three">
          Tab 3 content
        </Tabs.Panel>
      </Tabs>
    )

    const tabs = await TabsLocator.find()
    const secondTab = await tabs.findTab(':contains(Second Tab)')

    await secondTab.click()

    await wait(() => {
      expect(onChange).to.have.been.called()
      expect(onChange.getCall(0).args[1].index).to.equal(1)
      expect(onChange.getCall(0).args[1].id).to.equal('two')
    })
  })

  it('should focus the selected tab when shouldFocusOnRender is set', async () => {
    await mount(
      <Tabs shouldFocusOnRender>
        <Tabs.Panel renderTitle="First Tab">Tab 1 content</Tabs.Panel>
        <Tabs.Panel renderTitle="Second Tab" isSelected>
          Tab 2 content
        </Tabs.Panel>
        <Tabs.Panel renderTitle="Third Tab" isDisabled>
          Tab 3 content
        </Tabs.Panel>
      </Tabs>
    )

    const tabs = await TabsLocator.find()
    const secondTab = await tabs.findSelectedTab(':contains(Second Tab)')

    await wait(() => {
      expect(secondTab).to.be.focused()
    })
  })

  it('should call onRequestTabChange with keyboard arrow keys', async () => {
    const onChange = stub()

    await mount(
      <Tabs onRequestTabChange={onChange}>
        <Tabs.Panel renderTitle="First Tab">Tab 1 content</Tabs.Panel>
        <Tabs.Panel renderTitle="Second Tab">Tab 2 content</Tabs.Panel>
        <Tabs.Panel renderTitle="Third Tab" isDisabled>
          Tab 3 content
        </Tabs.Panel>
      </Tabs>
    )

    const tabs = await TabsLocator.find()
    const selectedTab = await tabs.findSelectedTab()

    await selectedTab.keyDown('left')

    await wait(() => {
      expect(onChange).to.have.been.calledOnce()
      expect(onChange.getCall(0).args[1].index).to.equal(1)
    })

    onChange.resetHistory()

    await selectedTab.keyDown('right')

    await wait(() => {
      expect(onChange).to.have.been.calledOnce()
      expect(onChange.getCall(0).args[1].index).to.equal(1)
    })

    onChange.resetHistory()

    await selectedTab.keyDown('up')

    await wait(() => {
      expect(onChange).to.have.been.calledOnce()
      expect(onChange.getCall(0).args[1].index).to.equal(1)
    })

    onChange.resetHistory()

    await selectedTab.keyDown('down')

    await wait(() => {
      expect(onChange).to.have.been.calledOnce()
      expect(onChange.getCall(0).args[1].index).to.equal(1)
    })
  })

  it('should update the selected tab when clicked', async () => {
    const onChange = stub()
    await mount(
      <Tabs onRequestTabChange={onChange}>
        <Tabs.Panel renderTitle="First Tab">Tab 1 content</Tabs.Panel>
        <Tabs.Panel renderTitle="Second Tab">Tab 2 content</Tabs.Panel>
        <Tabs.Panel renderTitle="Third Tab" isDisabled>
          Tab 3 content
        </Tabs.Panel>
      </Tabs>
    )

    const tabs = await TabsLocator.find()
    const secondTab = await tabs.findTab(':contains(Second Tab)')

    await secondTab.click()

    await wait(() => {
      expect(onChange).to.have.been.called()
      expect(onChange.getCall(0).args[1].index).to.equal(1)
    })
  })

  it('should not call onRequestTabChange when clicking a disabled tab', async () => {
    const onChange = stub()
    await mount(
      <Tabs onRequestTabChange={onChange}>
        <Tabs.Panel renderTitle="First Tab">Tab 1 content</Tabs.Panel>
        <Tabs.Panel renderTitle="Second Tab">Tab 2 content</Tabs.Panel>
        <Tabs.Panel renderTitle="Third Tab" isDisabled>
          Tab 3 content
        </Tabs.Panel>
      </Tabs>
    )

    const tabs = await TabsLocator.find()
    const thirdTab = await tabs.findTab(':contains(Third Tab)')

    await thirdTab.click()

    expect(onChange).to.not.have.been.called()
  })

  it('should meet a11y standards when set to the secondary variant', async () => {
    await mount(
      <Tabs variant="secondary">
        <Tabs.Panel renderTitle="First Tab">Tab 1 content</Tabs.Panel>
        <Tabs.Panel renderTitle="Second Tab">Tab 2 content</Tabs.Panel>
        <Tabs.Panel renderTitle="Third Tab" isDisabled>
          Tab 3 content
        </Tabs.Panel>
      </Tabs>
    )

    const tabs = await TabsLocator.find()
    expect(await tabs.accessible()).to.be.true()
  })

  it('should meet a11y standards when set to the default variant', async () => {
    await mount(
      <Tabs variant="default">
        <Tabs.Panel renderTitle="First Tab">Tab 1 content</Tabs.Panel>
        <Tabs.Panel renderTitle="Second Tab">Tab 2 content</Tabs.Panel>
        <Tabs.Panel renderTitle="Third Tab" isDisabled>
          Tab 3 content
        </Tabs.Panel>
      </Tabs>
    )

    const tabs = await TabsLocator.find()
    expect(await tabs.accessible()).to.be.true()
  })

  it('should link tabs with the corresponding panels via ids', async () => {
    await mount(
      <Tabs>
        <Tabs.Panel renderTitle="First Tab">Tab 1 content</Tabs.Panel>
        <Tabs.Panel renderTitle="Second Tab">Tab 2 content</Tabs.Panel>
        <Tabs.Panel renderTitle="Third Tab" isDisabled>
          Tab 3 content
        </Tabs.Panel>
      </Tabs>
    )

    const tabs = await TabsLocator.find()
    const firstTab = await tabs.findTab(':contains(First Tab)')

    const firstPanel = await tabs.findTabPanel(':contains(Tab 1 content)')

    expect(firstTab.getAttribute('aria-controls')).to.equal(
      firstPanel.getAttribute('id')
    )

    expect(firstPanel.getAttribute('aria-labelledby')).to.equal(
      firstTab.getAttribute('id')
    )
  })

  describe('with duplicate-named tabs', async () => {
    it('should still render the correct number of panels', async () => {
      await mount(
        <Tabs>
          <Tabs.Panel renderTitle="A Tab">Contents of first tab.</Tabs.Panel>
          <Tabs.Panel renderTitle="A Tab">Contents of second tab.</Tabs.Panel>
          <Tabs.Panel renderTitle="A Tab" isDisabled>
            Contents of third tab.
          </Tabs.Panel>
        </Tabs>
      )
      const tabs = await TabsLocator.find()
      const tabPanels = await tabs.findAllTabPanels()
      expect(tabPanels).to.have.length(3)
    })
  })

  describe('with nodes as tab titles', async () => {
    it('should still render the correct number of panels', async () => {
      await mount(
        <Tabs>
          <Tabs.Panel renderTitle={<div />}>Contents of first tab.</Tabs.Panel>
          <Tabs.Panel renderTitle={<span />}>
            Contents of second tab.
          </Tabs.Panel>
          <Tabs.Panel renderTitle={<img alt="example" />} isDisabled>
            Contents of third tab.
          </Tabs.Panel>
        </Tabs>
      )
      const tabs = await TabsLocator.find()
      const tabPanels = await tabs.findAllTabPanels()
      expect(tabPanels).to.have.length(3)
    })
  })

  describe('with tabOverflow set to scroll', async () => {
    it('should render a fade-out gradient when Tabs overflow', async () => {
      // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'width' implicitly has an 'any' ty... Remove this comment to see the full error message
      const Example = ({ width }) => (
        <div style={{ width }}>
          <Tabs tabOverflow="scroll">
            <Tabs.Panel renderTitle="Tab1">Contents of panel</Tabs.Panel>
            <Tabs.Panel renderTitle="Tab2">Contents of panel</Tabs.Panel>
            <Tabs.Panel renderTitle="Tab3">Contents of panel</Tabs.Panel>
            <Tabs.Panel renderTitle="Tab4">Contents of panel</Tabs.Panel>
            <Tabs.Panel renderTitle="Tab5">Contents of panel</Tabs.Panel>
          </Tabs>
        </div>
      )

      const subject = await mount(<Example width="150px" />)
      const tabs = await TabsLocator.find()

      expect(await tabs.find('[class$="-tabs__scrollOverlay"]')).to.exist()
      expect(await tabs.find('[class$="-tabs__scrollSpacer"]')).to.exist()

      await subject.setProps({ width: '550px' })

      expect(
        await tabs.find('[class$="-tabs__scrollOverlay"]', {
          expectEmpty: true
        })
      ).to.not.exist()
      expect(
        await tabs.find('[class$="-tabs__scrollSpacer"]', {
          expectEmpty: true
        })
      ).to.not.exist()
    })
  })
})
