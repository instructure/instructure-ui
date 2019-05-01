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
import { expect, mount, stub } from '@instructure/ui-test-utils'

import { Tabs } from '../index'
import TabsLocator from '../locator'

describe('<Tabs />', async () => {
  it('should render the correct number of panels', async () => {
    await mount(
      <Tabs>
        <Tabs.Panel title="First Tab">Tab 1 content</Tabs.Panel>
        <Tabs.Panel title="Second Tab">Tab 2 content</Tabs.Panel>
        <Tabs.Panel title="Third Tab" disabled>Tab 3 content</Tabs.Panel>
      </Tabs>
    )

    const tabs = await TabsLocator.find()
    const panels = await tabs.findAllTabPanels()

    expect(panels).to.have.length(3)
  })

  it('should render with null children', async () => {
    await mount(
      <Tabs>
        <Tabs.Panel title="First Tab">Tab 1 content</Tabs.Panel>
        <Tabs.Panel title="Second Tab">Tab 2 content</Tabs.Panel>
        <Tabs.Panel title="Third Tab" disabled>Tab 3 content</Tabs.Panel>
        {null}
      </Tabs>
    )

    const tabs = await TabsLocator.find()
    const panels = await tabs.findAllTabPanels()

    expect(panels).to.have.length(3)
  })

  it('should render screen reader only tabs', async () => {
    await mount(
      <Tabs>
        <Tabs.Panel title="First Tab">Tab 1 content</Tabs.Panel>
        <Tabs.Panel title="Second Tab">Tab 2 content</Tabs.Panel>
        <Tabs.Panel title="Third Tab" disabled>Tab 3 content</Tabs.Panel>
      </Tabs>
    )

    const tabs = await TabsLocator.find()
    const screenReaderOnlyTabs = await tabs.findAllTabs('[role="tab"]')

    expect(screenReaderOnlyTabs).to.have.length(3)
  })

  it('should render presentational only tabs', async () => {
    await mount(
      <Tabs>
        <Tabs.Panel title="First Tab">Tab 1 content</Tabs.Panel>
        <Tabs.Panel title="Second Tab">Tab 2 content</Tabs.Panel>
        <Tabs.Panel title="Third Tab" disabled>Tab 3 content</Tabs.Panel>
      </Tabs>
    )

    const tabs = await TabsLocator.find()
    const presentationTabs = await tabs.findAllTabs('[role="presentation"]')

    expect(presentationTabs).to.have.length(2)
  })

  it('should render correct number of tabs', async () => {
    await mount(
      <Tabs>
        <Tabs.Panel title="First Tab">Tab 1 content</Tabs.Panel>
        <Tabs.Panel title="Second Tab">Tab 2 content</Tabs.Panel>
        <Tabs.Panel title="Third Tab" disabled>Tab 3 content</Tabs.Panel>
      </Tabs>
    )

    const tabs = await TabsLocator.find()
    const tabButtons = await tabs.findAllTabs()

    // there should be 2 extra tabs for screen readers
    expect(tabButtons.length).to.equal(5)
  })

  it('should be okay with rendering without any children', async () => {
    let error = false
    try {
      await mount(
        <Tabs></Tabs>
      )
    } catch (e) {
      error = true
    }

    expect(error).to.be.false()
  })

  it('should not allow invalid children', async () => {
    let error = false
    try {
      await mount(
        <Tabs><div>foo</div></Tabs>
      )
    } catch (e) {
      error = true
    }

    expect(error).to.be.true()
  })

  it('should preserve Tab.Panel keys', async () => {
    let tabs

    const subject = await mount(
      <Tabs componentRef={(el) => { tabs = el }}>
        <Tabs.Panel title="foo" key="foo" />
      </Tabs>
    )

    const verifyChildKeys = ({ children }) => {
      const childrenArray = Array.isArray(children) ? children : [children]
      childrenArray.forEach((child) => {
        expect(child.props.title).to.equal(child.key)
      })
    }

    verifyChildKeys(tabs.props)

    await subject.setProps({
      children: [
        <Tabs.Panel title="foo" key="foo" />,
        <Tabs.Panel title="bar" key="bar" />
      ]
    })

    verifyChildKeys(tabs.props)
  })

  it('requires an `onChange` prop with a `selectedIndex` prop', async () => {
    let error = false
    try {
      await mount(
        <Tabs selectedIndex={1}>
          <Tabs.Panel title="First Tab">Tab 1 content</Tabs.Panel>
          <Tabs.Panel title="Second Tab">Tab 2 content</Tabs.Panel>
          <Tabs.Panel title="Third Tab" disabled>Tab 3 content</Tabs.Panel>
        </Tabs>
      )
    } catch (e) {
      error = true
    }

    expect(error).to.be.true()
  })

  it('should default to selectedIndex being 0', async () => {
    await mount(
      <Tabs>
        <Tabs.Panel title="First Tab">Tab 1 content</Tabs.Panel>
        <Tabs.Panel title="Second Tab">Tab 2 content</Tabs.Panel>
        <Tabs.Panel title="Third Tab" disabled>Tab 3 content</Tabs.Panel>
      </Tabs>
    )

    const tabs = await TabsLocator.find()

    expect(await tabs.findSelectedTab(':contains(First Tab)')).to.exist()
    const selectedTabsPanel = await tabs.findTabPanel(':contains(Tab 1 content)')
    expect(selectedTabsPanel.getAttribute('aria-hidden')).to.not.exist()
  })

  it('should honor the defaultSelectedIndex prop', async () => {
    await mount(
      <Tabs defaultSelectedIndex={1}>
        <Tabs.Panel title="First Tab">Tab 1 content</Tabs.Panel>
        <Tabs.Panel title="Second Tab">Tab 2 content</Tabs.Panel>
        <Tabs.Panel title="Third Tab" disabled>Tab 3 content</Tabs.Panel>
      </Tabs>
    )

    const tabs = await TabsLocator.find()

    expect(await tabs.findSelectedTab(':contains(Second Tab)')).to.exist()
    const secondPanel = await tabs.findTabPanel(':contains(Tab 2 content)')
    expect(secondPanel.getAttribute('aria-hidden')).to.not.exist()
  })

  it('should not allow selecting a disabled tab', async () => {
    await mount(
      <Tabs defaultSelectedIndex={2}>
        <Tabs.Panel title="First Tab">Tab 1 content</Tabs.Panel>
        <Tabs.Panel title="Second Tab">Tab 2 content</Tabs.Panel>
        <Tabs.Panel title="Third Tab" disabled>Tab 3 content</Tabs.Panel>
      </Tabs>
    )

    const tabs = await TabsLocator.find()

    expect(await tabs.findSelectedTab(':contains(Third Tab)', {
      expectEmpty: true
    })).to.not.exist()

    const panels = await tabs.findAllTabPanels()
    expect(panels[2].getAttribute('aria-hidden')).to.equal('true')
  })

  it('should call onChange when selection changes', async () => {
    const onChange = stub()

    await mount(
      <Tabs selectedIndex={0} onChange={onChange}>
        <Tabs.Panel title="First Tab">Tab 1 content</Tabs.Panel>
        <Tabs.Panel title="Second Tab">Tab 2 content</Tabs.Panel>
        <Tabs.Panel title="Third Tab" disabled>Tab 3 content</Tabs.Panel>
      </Tabs>
    )

    const tabs = await TabsLocator.find()
    const secondTab = await tabs.findTab(':contains(Second Tab)[role="presentation"]')

    await secondTab.click()

    expect(onChange).to.have.been.calledWith(1, 0)
  })

  it('should not update the selected tab when selectedIndex is set', async () => {
    const onChange = stub()

    await mount(
      <Tabs selectedIndex={0} onChange={onChange}>
        <Tabs.Panel title="First Tab">Tab 1 content</Tabs.Panel>
        <Tabs.Panel title="Second Tab">Tab 2 content</Tabs.Panel>
        <Tabs.Panel title="Third Tab" disabled>Tab 3 content</Tabs.Panel>
      </Tabs>
    )

    const tabs = await TabsLocator.find()

    const secondTab = await tabs.findTab(':contains(Second Tab)[role="presentation"]')

    await secondTab.click()

    expect(await tabs.findSelectedTab(':contains(First Tab)')).to.exist()
  })

  it('should focus the defaultSelectedIndex tab when focus is set', async () => {
    await mount(
      <Tabs defaultSelectedIndex={1} focus>
        <Tabs.Panel title="First Tab">Tab 1 content</Tabs.Panel>
        <Tabs.Panel title="Second Tab">Tab 2 content</Tabs.Panel>
        <Tabs.Panel title="Third Tab" disabled>Tab 3 content</Tabs.Panel>
      </Tabs>
    )

    const tabs = await TabsLocator.find()
    const secondTab = await tabs.findSelectedTab(':contains(Second Tab)')
    expect(secondTab.focused()).to.be.true()
  })

  it('should focus the selectedIndex tab when focus is set', async () => {
    const subject = await mount(
      <Tabs selectedIndex={1} onChange={() => {}} focus>
        <Tabs.Panel title="First Tab">Tab 1 content</Tabs.Panel>
        <Tabs.Panel title="Second Tab">Tab 2 content</Tabs.Panel>
        <Tabs.Panel title="Third Tab" disabled>Tab 3 content</Tabs.Panel>
      </Tabs>
    )

    const tabs = await TabsLocator.find()
    const secondTab = await tabs.findSelectedTab(':contains(Second Tab)')
    expect(secondTab.focused()).to.be.true()

    await subject.setProps({ selectedIndex: 0 })

    const firstTab = await tabs.findSelectedTab(':contains(First Tab)')
    expect(firstTab.focused()).to.be.true()
  })

  it('should update the selected tab via keyboard arrow keys', async () => {
    await mount(
      <Tabs>
        <Tabs.Panel title="First Tab">Tab 1 content</Tabs.Panel>
        <Tabs.Panel title="Second Tab">Tab 2 content</Tabs.Panel>
        <Tabs.Panel title="Third Tab" disabled>Tab 3 content</Tabs.Panel>
      </Tabs>
    )

    const tabs = await TabsLocator.find()
    let selectedTab = await tabs.findSelectedTab()

    await selectedTab.keyDown('left')

    selectedTab = await tabs.findSelectedTab()

    expect(selectedTab.getTextContent()).to.equal('Second Tab')

    let selectedTabPanel = await tabs.findTabPanel(':contains(Tab 2 content)')
    expect(selectedTabPanel.getAttribute('aria-hidden')).to.not.exist()

    selectedTab = await tabs.findSelectedTab()

    await selectedTab.keyDown('right')

    selectedTab = await tabs.findSelectedTab()
    expect(selectedTab.getTextContent()).to.equal('First Tab')

    selectedTabPanel = await tabs.findTabPanel(':contains(Tab 1 content)')
    expect(selectedTabPanel.getAttribute('aria-hidden')).to.not.exist()

    await selectedTab.keyDown('down')

    selectedTab = await tabs.findSelectedTab()
    expect(selectedTab.getTextContent()).to.equal('Second Tab')

    selectedTabPanel = await tabs.findTabPanel(':contains(Tab 2 content)')
    expect(selectedTabPanel.getAttribute('aria-hidden')).to.not.exist()
  })

  it('should update the selected tab via keyboard ENTER keys on screen reader tabs', async () => {
    await mount(
      <Tabs>
        <Tabs.Panel title="First Tab">Tab 1 content</Tabs.Panel>
        <Tabs.Panel title="Second Tab">Tab 2 content</Tabs.Panel>
        <Tabs.Panel title="Third Tab" disabled>Tab 3 content</Tabs.Panel>
      </Tabs>
    )

    const tabs = await TabsLocator.find()
    const tabButton = await tabs.findTab(':contains(Second Tab)[role="tab"]')

    await tabButton.keyDown('enter')

    let selectedTab = await tabs.findSelectedTab()

    expect(selectedTab.getTextContent()).to.equal('Second Tab')

    const tabPanels = await tabs.findAllTabPanels()
    expect(tabPanels[0].getAttribute('aria-hidden')).to.equal('true')
    expect(tabPanels[1].getAttribute('aria-hidden')).to.not.exist()
  })

  it('should update the selected tab when clicked', async () => {
    await mount(
      <Tabs>
        <Tabs.Panel title="First Tab">Tab 1 content</Tabs.Panel>
        <Tabs.Panel title="Second Tab">Tab 2 content</Tabs.Panel>
        <Tabs.Panel title="Third Tab" disabled>Tab 3 content</Tabs.Panel>
      </Tabs>
    )

    const tabs = await TabsLocator.find()
    const secondTab = await tabs.findTab('[role="presentation"]:contains(Second Tab)')

    await secondTab.click()

    const selectedTab = await tabs.findSelectedTab()

    expect(selectedTab.getTextContent()).to.equal('Second Tab')

    const tabPanels = await tabs.findAllTabPanels()
    expect(tabPanels[0].getAttribute('aria-hidden')).to.equal('true')
    expect(tabPanels[1].getAttribute('aria-hidden')).to.not.exist()
  })

  it('should not change selectedIndex when clicking a disabled tab', async () => {
    const onChange = stub()
    await mount(
      <Tabs onChange={onChange}>
        <Tabs.Panel title="First Tab">Tab 1 content</Tabs.Panel>
        <Tabs.Panel title="Second Tab">Tab 2 content</Tabs.Panel>
        <Tabs.Panel title="Third Tab" disabled>Tab 3 content</Tabs.Panel>
      </Tabs>
    )

    const tabs = await TabsLocator.find()
    const thirdTab = await tabs.findTab(':contains(Third Tab)[role="presentation"]')

    await thirdTab.click()

    expect(onChange).to.not.have.been.called()

    const selectedTab = await tabs.findSelectedTab()

    expect(selectedTab.getTextContent()).to.equal('First Tab')

    const tabsPanels = await tabs.findAllTabPanels()
    expect(tabsPanels[0].getAttribute('aria-hidden')).to.not.exist()
    expect(tabsPanels[2].getAttribute('aria-hidden')).to.equal('true')
  })

  it('should meet a11y standards when set to the secondary variant', async () => {
    await mount(
      <Tabs variant="secondary">
        <Tabs.Panel title="First Tab">Tab 1 content</Tabs.Panel>
        <Tabs.Panel title="Second Tab">Tab 2 content</Tabs.Panel>
        <Tabs.Panel title="Third Tab" disabled>Tab 3 content</Tabs.Panel>
      </Tabs>
    )

    const tabs = await TabsLocator.find()
    expect(await tabs.accessible()).to.be.true()
  })

  it('should meet a11y standards when set to the default variant', async () => {
    await mount(
      <Tabs variant="default">
        <Tabs.Panel title="First Tab">Tab 1 content</Tabs.Panel>
        <Tabs.Panel title="Second Tab">Tab 2 content</Tabs.Panel>
        <Tabs.Panel title="Third Tab" disabled>Tab 3 content</Tabs.Panel>
      </Tabs>
    )

    const tabs = await TabsLocator.find()
    expect(await tabs.accessible()).to.be.true()
  })

  it('should have appropriate aria attributes', async () => {
    await mount(
      <Tabs>
        <Tabs.Panel title="First Tab">Tab 1 content</Tabs.Panel>
        <Tabs.Panel title="Second Tab">Tab 2 content</Tabs.Panel>
        <Tabs.Panel title="Third Tab" disabled>Tab 3 content</Tabs.Panel>
      </Tabs>
    )

    const tabs = await TabsLocator.find()

    expect(tabs.getAttribute('role')).to.equal('tablist')
  })

  it('should link tabs with the corresponding panels via ids', async () => {
    await mount(
      <Tabs>
        <Tabs.Panel title="First Tab">Tab 1 content</Tabs.Panel>
        <Tabs.Panel title="Second Tab">Tab 2 content</Tabs.Panel>
        <Tabs.Panel title="Third Tab" disabled>Tab 3 content</Tabs.Panel>
      </Tabs>
    )

    const tabs = await TabsLocator.find()
    const firstTab = await tabs.findTab(':contains(First Tab)[role="tab"]')

    const firstPanel = await tabs.findTabPanel(':contains(Tab 1 content)')

    expect(firstTab.getAttribute('aria-controls'))
      .to.equal(firstPanel.getAttribute('id'))

    expect(firstPanel.getAttribute('aria-labelledby'))
      .to.equal(firstTab.getAttribute('id'))
  })


  describe('with duplicate-named tabs', async () => {
    it('should still render the correct number of panels', async () => {
      await mount(
        <Tabs>
          <Tabs.Panel title="A Tab">Contents of first tab.</Tabs.Panel>
          <Tabs.Panel title="A Tab">Contents of second tab.</Tabs.Panel>
          <Tabs.Panel title="A Tab" disabled>Contents of third tab.</Tabs.Panel>
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
          <Tabs.Panel title={<div/>}>Contents of first tab.</Tabs.Panel>
          <Tabs.Panel title={<span/>}>Contents of second tab.</Tabs.Panel>
          <Tabs.Panel title={<img alt='example'/>} disabled>Contents of third tab.</Tabs.Panel>
        </Tabs>
      )
      const tabs = await TabsLocator.find()
      const tabPanels = await tabs.findAllTabPanels()
      expect(tabPanels).to.have.length(3)
    })
  })
})
