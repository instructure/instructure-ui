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

import { TabList, TabPanel } from '../index'
import TabListLocator from '../locator'

describe('<TabList />', async () => {
  it('should render the correct number of panels', async () => {
    await mount(
      <TabList>
        <TabPanel title="First Tab">Tab 1 content</TabPanel>
        <TabPanel title="Second Tab">Tab 2 content</TabPanel>
        <TabPanel title="Third Tab" disabled>Tab 3 content</TabPanel>
      </TabList>
    )

    const tablist = await TabListLocator.find()
    const panels = await tablist.findAllTabPanels()

    expect(panels).to.have.length(3)
  })

  it('should render with null children', async () => {
    await mount(
      <TabList>
        <TabPanel title="First Tab">Tab 1 content</TabPanel>
        <TabPanel title="Second Tab">Tab 2 content</TabPanel>
        <TabPanel title="Third Tab" disabled>Tab 3 content</TabPanel>
        {null}
      </TabList>
    )

    const tablist = await TabListLocator.find()
    const panels = await tablist.findAllTabPanels()

    expect(panels).to.have.length(3)
  })

  it('should render screen reader only tabs', async () => {
    await mount(
      <TabList>
        <TabPanel title="First Tab">Tab 1 content</TabPanel>
        <TabPanel title="Second Tab">Tab 2 content</TabPanel>
        <TabPanel title="Third Tab" disabled>Tab 3 content</TabPanel>
      </TabList>
    )

    const tablist = await TabListLocator.find()
    const screenReaderOnlyTabs = await tablist.findAllTabs('[role="tab"]')

    expect(screenReaderOnlyTabs).to.have.length(3)
  })

  it('should render presentational only tabs', async () => {
    await mount(
      <TabList>
        <TabPanel title="First Tab">Tab 1 content</TabPanel>
        <TabPanel title="Second Tab">Tab 2 content</TabPanel>
        <TabPanel title="Third Tab" disabled>Tab 3 content</TabPanel>
      </TabList>
    )

    const tablist = await TabListLocator.find()
    const presentationTabs = await tablist.findAllTabs('[role="presentation"]')

    expect(presentationTabs).to.have.length(2)
  })

  it('should render correct number of tabs', async () => {
    await mount(
      <TabList>
        <TabPanel title="First Tab">Tab 1 content</TabPanel>
        <TabPanel title="Second Tab">Tab 2 content</TabPanel>
        <TabPanel title="Third Tab" disabled>Tab 3 content</TabPanel>
      </TabList>
    )

    const tablist = await TabListLocator.find()
    const tabs = await tablist.findAllTabs()

    // there should be 2 extra tabs for screen readers
    expect(tabs.length).to.equal(5)
  })

  it('should be okay with rendering without any children', async () => {
    let error = false
    try {
      await mount(
        <TabList></TabList>
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
        <TabList><div>foo</div></TabList>
      )
    } catch (e) {
      error = true
    }

    expect(error).to.be.true()
  })

  it('should preserve TabPanel keys', async () => {
    let tabList

    const subject = await mount(
      <TabList componentRef={(el) => { tabList = el }}>
        <TabPanel title="foo" key="foo" />
      </TabList>
    )

    const verifyChildKeys = ({ children }) => {
      const childrenArray = Array.isArray(children) ? children : [children]
      childrenArray.forEach((child) => {
        expect(child.props.title).to.equal(child.key)
      })
    }

    verifyChildKeys(tabList.props)

    await subject.setProps({
      children: [
        <TabPanel title="foo" key="foo" />,
        <TabPanel title="bar" key="bar" />
      ]
    })

    verifyChildKeys(tabList.props)
  })

  it('requires an `onChange` prop with a `selectedIndex` prop', async () => {
    let error = false
    try {
      await mount(
        <TabList selectedIndex={1}>
          <TabPanel title="First Tab">Tab 1 content</TabPanel>
          <TabPanel title="Second Tab">Tab 2 content</TabPanel>
          <TabPanel title="Third Tab" disabled>Tab 3 content</TabPanel>
        </TabList>
      )
    } catch (e) {
      error = true
    }

    expect(error).to.be.true()
  })

  it('should default to selectedIndex being 0', async () => {
    await mount(
      <TabList>
        <TabPanel title="First Tab">Tab 1 content</TabPanel>
        <TabPanel title="Second Tab">Tab 2 content</TabPanel>
        <TabPanel title="Third Tab" disabled>Tab 3 content</TabPanel>
      </TabList>
    )

    const tabList = await TabListLocator.find()

    expect(await tabList.findSelectedTab(':contains(First Tab)')).to.exist()
    const selectedTabPanel = await tabList.findTabPanel(':contains(Tab 1 content)')
    expect(selectedTabPanel.getAttribute('aria-hidden')).to.not.exist()
  })

  it('should honor the defaultSelectedIndex prop', async () => {
    await mount(
      <TabList defaultSelectedIndex={1}>
        <TabPanel title="First Tab">Tab 1 content</TabPanel>
        <TabPanel title="Second Tab">Tab 2 content</TabPanel>
        <TabPanel title="Third Tab" disabled>Tab 3 content</TabPanel>
      </TabList>
    )

    const tabList = await TabListLocator.find()

    expect(await tabList.findSelectedTab(':contains(Second Tab)')).to.exist()
    const secondPanel = await tabList.findTabPanel(':contains(Tab 2 content)')
    expect(secondPanel.getAttribute('aria-hidden')).to.not.exist()
  })

  it('should not allow selecting a disabled tab', async () => {
    await mount(
      <TabList defaultSelectedIndex={2}>
        <TabPanel title="First Tab">Tab 1 content</TabPanel>
        <TabPanel title="Second Tab">Tab 2 content</TabPanel>
        <TabPanel title="Third Tab" disabled>Tab 3 content</TabPanel>
      </TabList>
    )

    const tabList = await TabListLocator.find()

    expect(await tabList.findSelectedTab(':contains(Third Tab)', {
      expectEmpty: true
    })).to.not.exist()

    const panels = await tabList.findAllTabPanels()
    expect(panels[2].getAttribute('aria-hidden')).to.equal('true')
  })

  it('should call onChange when selection changes', async () => {
    const onChange = stub()

    await mount(
      <TabList selectedIndex={0} onChange={onChange}>
        <TabPanel title="First Tab">Tab 1 content</TabPanel>
        <TabPanel title="Second Tab">Tab 2 content</TabPanel>
        <TabPanel title="Third Tab" disabled>Tab 3 content</TabPanel>
      </TabList>
    )

    const tabList = await TabListLocator.find()
    const secondTab = await tabList.findTab(':contains(Second Tab)[role="presentation"]')

    await secondTab.click()

    expect(onChange).to.have.been.calledWith(1, 0)
  })

  it('should not update the selected tab when selectedIndex is set', async () => {
    const onChange = stub()

    await mount(
      <TabList selectedIndex={0} onChange={onChange}>
        <TabPanel title="First Tab">Tab 1 content</TabPanel>
        <TabPanel title="Second Tab">Tab 2 content</TabPanel>
        <TabPanel title="Third Tab" disabled>Tab 3 content</TabPanel>
      </TabList>
    )

    const tabList = await TabListLocator.find()

    const secondTab = await tabList.findTab(':contains(Second Tab)[role="presentation"]')

    await secondTab.click()

    expect(await tabList.findSelectedTab(':contains(First Tab)')).to.exist()
  })

  it('should focus the defaultSelectedIndex tab when focus is set', async () => {
    await mount(
      <TabList defaultSelectedIndex={1} focus>
        <TabPanel title="First Tab">Tab 1 content</TabPanel>
        <TabPanel title="Second Tab">Tab 2 content</TabPanel>
        <TabPanel title="Third Tab" disabled>Tab 3 content</TabPanel>
      </TabList>
    )

    const tabList = await TabListLocator.find()
    const secondTab = await tabList.findSelectedTab(':contains(Second Tab)')
    expect(secondTab.focused()).to.be.true()
  })

  it('should focus the selectedIndex tab when focus is set', async () => {
    const subject = await mount(
      <TabList selectedIndex={1} onChange={() => {}} focus>
        <TabPanel title="First Tab">Tab 1 content</TabPanel>
        <TabPanel title="Second Tab">Tab 2 content</TabPanel>
        <TabPanel title="Third Tab" disabled>Tab 3 content</TabPanel>
      </TabList>
    )

    const tabList = await TabListLocator.find()
    const secondTab = await tabList.findSelectedTab(':contains(Second Tab)')
    expect(secondTab.focused()).to.be.true()

    await subject.setProps({ selectedIndex: 0 })

    const firstTab = await tabList.findSelectedTab(':contains(First Tab)')
    expect(firstTab.focused()).to.be.true()
  })

  it('should update the selected tab via keyboard arrow keys', async () => {
    await mount(
      <TabList>
        <TabPanel title="First Tab">Tab 1 content</TabPanel>
        <TabPanel title="Second Tab">Tab 2 content</TabPanel>
        <TabPanel title="Third Tab" disabled>Tab 3 content</TabPanel>
      </TabList>
    )

    const tabList = await TabListLocator.find()
    let selectedTab = await tabList.findSelectedTab()

    await selectedTab.keyDown('left')

    selectedTab = await tabList.findSelectedTab()

    expect(selectedTab.getTextContent()).to.equal('Second Tab')

    let selectedTabPanel = await tabList.findTabPanel(':contains(Tab 2 content)')
    expect(selectedTabPanel.getAttribute('aria-hidden')).to.not.exist()

    selectedTab = await tabList.findSelectedTab()

    await selectedTab.keyDown('right')

    selectedTab = await tabList.findSelectedTab()
    expect(selectedTab.getTextContent()).to.equal('First Tab')

    selectedTabPanel = await tabList.findTabPanel(':contains(Tab 1 content)')
    expect(selectedTabPanel.getAttribute('aria-hidden')).to.not.exist()

    await selectedTab.keyDown('down')

    selectedTab = await tabList.findSelectedTab()
    expect(selectedTab.getTextContent()).to.equal('Second Tab')

    selectedTabPanel = await tabList.findTabPanel(':contains(Tab 2 content)')
    expect(selectedTabPanel.getAttribute('aria-hidden')).to.not.exist()
  })

  it('should update the selected tab via keyboard ENTER keys on screen reader tabs', async () => {
    await mount(
      <TabList>
        <TabPanel title="First Tab">Tab 1 content</TabPanel>
        <TabPanel title="Second Tab">Tab 2 content</TabPanel>
        <TabPanel title="Third Tab" disabled>Tab 3 content</TabPanel>
      </TabList>
    )

    const tabList = await TabListLocator.find()
    const tab = await tabList.findTab(':contains(Second Tab)[role="tab"]')

    await tab.keyDown('enter')

    let selectedTab = await tabList.findSelectedTab()

    expect(selectedTab.getTextContent()).to.equal('Second Tab')

    const tabPanels = await tabList.findAllTabPanels()
    expect(tabPanels[0].getAttribute('aria-hidden')).to.equal('true')
    expect(tabPanels[1].getAttribute('aria-hidden')).to.not.exist()
  })

  it('should update the selected tab when clicked', async () => {
    await mount(
      <TabList>
        <TabPanel title="First Tab">Tab 1 content</TabPanel>
        <TabPanel title="Second Tab">Tab 2 content</TabPanel>
        <TabPanel title="Third Tab" disabled>Tab 3 content</TabPanel>
      </TabList>
    )

    const tabList = await TabListLocator.find()
    const secondTab = await tabList.findTab('[role="presentation"]:contains(Second Tab)')

    await secondTab.click()

    const selectedTab = await tabList.findSelectedTab()

    expect(selectedTab.getTextContent()).to.equal('Second Tab')

    const tabPanels = await tabList.findAllTabPanels()
    expect(tabPanels[0].getAttribute('aria-hidden')).to.equal('true')
    expect(tabPanels[1].getAttribute('aria-hidden')).to.not.exist()
  })

  it('should not change selectedIndex when clicking a disabled tab', async () => {
    const onChange = stub()
    await mount(
      <TabList onChange={onChange}>
        <TabPanel title="First Tab">Tab 1 content</TabPanel>
        <TabPanel title="Second Tab">Tab 2 content</TabPanel>
        <TabPanel title="Third Tab" disabled>Tab 3 content</TabPanel>
      </TabList>
    )

    const tabList = await TabListLocator.find()
    const thirdTab = await tabList.findTab(':contains(Third Tab)[role="presentation"]')

    await thirdTab.click()

    expect(onChange).to.not.have.been.called()

    const selectedTab = await tabList.findSelectedTab()

    expect(selectedTab.getTextContent()).to.equal('First Tab')

    const tabPanels = await tabList.findAllTabPanels()
    expect(tabPanels[0].getAttribute('aria-hidden')).to.not.exist()
    expect(tabPanels[2].getAttribute('aria-hidden')).to.equal('true')
  })

  it('should meet a11y standards when set to the simple variant', async () => {
    await mount(
      <TabList variant="simple">
        <TabPanel title="First Tab">Tab 1 content</TabPanel>
        <TabPanel title="Second Tab">Tab 2 content</TabPanel>
        <TabPanel title="Third Tab" disabled>Tab 3 content</TabPanel>
      </TabList>
    )

    const tabList = await TabListLocator.find()
    expect(await tabList.accessible()).to.be.true()
  })

  it('should meet a11y standards when set to the minimal variant', async () => {
    await mount(
      <TabList variant="minimal">
        <TabPanel title="First Tab">Tab 1 content</TabPanel>
        <TabPanel title="Second Tab">Tab 2 content</TabPanel>
        <TabPanel title="Third Tab" disabled>Tab 3 content</TabPanel>
      </TabList>
    )

    const tabList = await TabListLocator.find()
    expect(await tabList.accessible()).to.be.true()
  })

  it('should have appropriate aria attributes', async () => {
    await mount(
      <TabList variant="minimal">
        <TabPanel title="First Tab">Tab 1 content</TabPanel>
        <TabPanel title="Second Tab">Tab 2 content</TabPanel>
        <TabPanel title="Third Tab" disabled>Tab 3 content</TabPanel>
      </TabList>
    )

    const tabList = await TabListLocator.find()

    expect(tabList.getAttribute('role')).to.equal('tablist')
  })

  it('should link tabs with the corresponding panels via ids', async () => {
    await mount(
      <TabList>
        <TabPanel title="First Tab">Tab 1 content</TabPanel>
        <TabPanel title="Second Tab">Tab 2 content</TabPanel>
        <TabPanel title="Third Tab" disabled>Tab 3 content</TabPanel>
      </TabList>
    )

    const tabList = await TabListLocator.find()
    const firstTab = await tabList.findTab(':contains(First Tab)[role="tab"]')

    const firstPanel = await tabList.findTabPanel(':contains(Tab 1 content)')

    expect(firstTab.getAttribute('aria-controls'))
      .to.equal(firstPanel.getAttribute('id'))

    expect(firstPanel.getAttribute('aria-labelledby'))
      .to.equal(firstTab.getAttribute('id'))
  })


  describe('with duplicate-named tabs', async () => {
    it('should still render the correct number of panels', async () => {
      await mount(
        <TabList>
          <TabPanel title="A Tab">Contents of first tab.</TabPanel>
          <TabPanel title="A Tab">Contents of second tab.</TabPanel>
          <TabPanel title="A Tab" disabled>Contents of third tab.</TabPanel>
        </TabList>
      )
      const tabList = await TabListLocator.find()
      const panels = await tabList.findAllTabPanels()
      expect(panels).to.have.length(3)
    })
  })


  describe('with nodes as tab titles', async () => {
    it('should still render the correct number of panels', async () => {
      await mount(
        <TabList>
          <TabPanel title={<div/>}>Contents of first tab.</TabPanel>
          <TabPanel title={<span/>}>Contents of second tab.</TabPanel>
          <TabPanel title={<img alt='example'/>} disabled>Contents of third tab.</TabPanel>
        </TabList>
      )
      const tabList = await TabListLocator.find()
      const panels = await tabList.findAllTabPanels()
      expect(panels).to.have.length(3)
    })
  })
})
