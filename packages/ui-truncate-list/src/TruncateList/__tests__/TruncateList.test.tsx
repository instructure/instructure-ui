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

import {
  expect,
  mount,
  wait,
  spy,
  accessible,
  generateA11yTests
} from '@instructure/ui-test-utils'

import { TruncateList } from '../index'
import { TruncateListLocator } from '../TruncateListLocator'
import TruncateListExamples from '../__examples__/TruncateList.examples'

describe('<TruncateList />', async () => {
  it('should return ref with elementRef prop', async () => {
    const elementRef = spy()
    await mount(
      <TruncateList elementRef={elementRef}>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </TruncateList>
    )
    const component = await TruncateListLocator.find()

    expect(elementRef).to.have.been.calledWith(component.getDOMNode())
  })

  it('should render <ul> and <li> items', async () => {
    await mount(
      <TruncateList>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </TruncateList>
    )
    const component = await TruncateListLocator.find()
    const items = await component.findAllListItems()

    expect(component.getTagName()).to.equal('ul')
    expect(items.length).to.equal(3)
    items.forEach((item) => {
      expect(item.getTagName()).to.equal('li')
    })
  })

  it('should render only `visibleItemsCount` items', async () => {
    await mount(
      <TruncateList visibleItemsCount={2}>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </TruncateList>
    )
    const component = await TruncateListLocator.find()
    const items = await component.findAllListItems()

    expect(items.length).to.equal(2)
    items.forEach((item) => {
      expect(item.getTextContent()).to.not.equal('Item 3')
    })
  })

  it('should pass how many items should be visible with `onUpdate` prop', async () => {
    const onUpdate = spy()
    await mount(
      <TruncateList onUpdate={onUpdate} style={{ width: '100px' }}>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </TruncateList>
    )
    const component = await TruncateListLocator.find()
    const items = await component.findAllListItems()

    expect(items.length).to.equal(3)
    expect(onUpdate).to.have.been.calledWith({
      visibleItemsCount: 2
    })
  })

  it('should behave controlled', async () => {
    let visibleItems = 2

    const subject = await mount(
      <TruncateList
        onUpdate={({ visibleItemsCount }) => {
          visibleItems = visibleItemsCount
        }}
        visibleItemsCount={visibleItems}
        style={{ width: '400px' }}
      >
        {Array.from(Array(15)).map((_item, idx) => (
          <div key={idx}>Item {idx + 1}</div>
        ))}
      </TruncateList>
    )
    const component = await TruncateListLocator.find()
    let items = await component.findAllListItems()

    expect(items.length).to.equal(2)

    await subject.setProps({ visibleItemsCount: visibleItems })

    items = await component.findAllListItems()

    expect(items.length).to.equal(9)
  })

  describe('renderHiddenItemMenu', async () => {
    it('should return hidden children', async () => {
      const renderHiddenItemMenu = spy()
      await mount(
        <TruncateList
          style={{ width: '100px' }}
          visibleItemsCount={2}
          renderHiddenItemMenu={renderHiddenItemMenu}
        >
          <div>Item 1</div>
          <div>Item 2</div>
          <div>Item 3</div>
          <div>Item 4</div>
          <div>Item 3</div>
        </TruncateList>
      )

      const hiddenItemsArg = renderHiddenItemMenu.lastCall
        .args[0] as React.ReactElement[]

      expect(hiddenItemsArg.length).to.equal(3)
      hiddenItemsArg.forEach((item) => {
        expect(item.props.children).to.be.oneOf(['Item 3', 'Item 4', 'Item 5'])
      })
    })

    it('should render element', async () => {
      await mount(
        <TruncateList
          visibleItemsCount={2}
          renderHiddenItemMenu={() => <div id="trigger">trigger label</div>}
        >
          <div>Item 1</div>
          <div>Item 2</div>
          <div>Item 3</div>
          <div>Item 4</div>
          <div>Item 3</div>
        </TruncateList>
      )

      const component = await TruncateListLocator.find()
      const menuTriggerItem = await component.findMenuTriggerItem()
      const trigger = await menuTriggerItem.find('#trigger')

      expect(trigger.getTextContent()).to.equal('trigger label')
    })
  })

  describe('itemSpacing prop', async () => {
    it('should have no item spacing by default', async () => {
      await mount(
        <TruncateList>
          <div>Item 1</div>
          <div>Item 2</div>
          <div>Item 3</div>
          <div>Item 4</div>
          <div>Item 5</div>
        </TruncateList>
      )

      const component = await TruncateListLocator.find()
      const items = await component.findAllListItems()

      items.forEach((item) => {
        const { padding, margin } = getComputedStyle(item.getDOMNode())

        expect(margin).to.equal('0px')
        expect(padding).to.equal('0px')
      })
    })

    it('should add itemSpacing', async () => {
      await mount(
        <TruncateList
          itemSpacing={'1rem'}
          visibleItemsCount={3}
          renderHiddenItemMenu={() => <div id="trigger">trigger label</div>}
        >
          <div>Item 1</div>
          <div>Item 2</div>
          <div>Item 3</div>
          <div>Item 4</div>
          <div>Item 5</div>
        </TruncateList>
      )

      const component = await TruncateListLocator.find()
      const items = await component.findAllListItems()

      expect(items.length).to.equal(4) // 3 + trigger

      items.forEach((item, idx) => {
        const { padding, margin } = getComputedStyle(item.getDOMNode())

        expect(margin).to.equal('0px')
        expect(padding).to.equal(idx === 0 ? '0px' : '0px 0px 0px 16px')
      })
    })

    it('when it is changed in runtime, should resize list', async () => {
      let visibleItems = 2

      const subject = await mount(
        <TruncateList
          onUpdate={({ visibleItemsCount }) => {
            visibleItems = visibleItemsCount
          }}
          visibleItemsCount={visibleItems}
          renderHiddenItemMenu={() => <div id="trigger">trigger label</div>}
          itemSpacing="1rem"
          style={{ width: '40rem' }}
        >
          {Array.from(Array(15)).map((_item, idx) => (
            <div key={idx}>Item {idx + 1}</div>
          ))}
        </TruncateList>
      )
      const component = await TruncateListLocator.find()
      let items = await component.findAllListItems()

      expect(items.length).to.equal(3) // 2 + trigger

      await subject.setProps({ visibleItemsCount: visibleItems })

      items = await component.findAllListItems()

      expect(items.length).to.equal(10)
      items.forEach((item, idx) => {
        const { padding, margin } = getComputedStyle(item.getDOMNode())

        expect(margin).to.equal('0px')
        expect(padding).to.equal(idx === 0 ? '0px' : '0px 0px 0px 16px')
      })

      await subject.setProps({ itemSpacing: '2rem' })

      // wait until onUpdate runs
      await wait(() => {
        expect(visibleItems).to.not.equal(9)
      })

      await subject.setProps({ visibleItemsCount: visibleItems })

      items = await component.findAllListItems()

      expect(items.length).to.equal(8)
      items.forEach((item, idx) => {
        const { padding, margin } = getComputedStyle(item.getDOMNode())

        expect(margin).to.equal('0px')
        expect(padding).to.equal(idx === 0 ? '0px' : '0px 0px 0px 32px')
      })
    })
  })

  describe('fixMenuTriggerWidth prop', async () => {
    it('should add fix width to the trigger li item', async () => {
      await mount(
        <TruncateList
          visibleItemsCount={1}
          renderHiddenItemMenu={() => <div id="trigger">trigger label</div>}
          fixMenuTriggerWidth="20rem"
        >
          <div>Item 1</div>
          <div>Item 2</div>
          <div>Item 3</div>
          <div>Item 4</div>
          <div>Item 5</div>
        </TruncateList>
      )

      const component = await TruncateListLocator.find()
      const menuTriggerItem = await component.findMenuTriggerItem()

      expect(getComputedStyle(menuTriggerItem.getDOMNode()).width).to.equal(
        '320px'
      )
    })

    it('when not set, should be the width of its content', async () => {
      await mount(
        <TruncateList
          visibleItemsCount={1}
          renderHiddenItemMenu={() => (
            <div style={{ width: '80px' }} id="trigger">
              trigger label
            </div>
          )}
        >
          <div>Item 1</div>
          <div>Item 2</div>
          <div>Item 3</div>
        </TruncateList>
      )

      const component = await TruncateListLocator.find()
      const menuTriggerItem = await component.findMenuTriggerItem()

      expect(getComputedStyle(menuTriggerItem.getDOMNode()).width).to.equal(
        '80px'
      )
    })

    it('when it is changed in runtime, should resize list', async () => {
      let visibleItems = 2

      const subject = await mount(
        <TruncateList
          onUpdate={({ visibleItemsCount }) => {
            visibleItems = visibleItemsCount
          }}
          visibleItemsCount={visibleItems}
          renderHiddenItemMenu={() => <div id="trigger">trigger label</div>}
          fixMenuTriggerWidth="20rem"
          style={{ width: '40rem' }}
        >
          {Array.from(Array(15)).map((_item, idx) => (
            <div key={idx}>Item {idx + 1}</div>
          ))}
        </TruncateList>
      )
      const component = await TruncateListLocator.find()
      let items = await component.findAllListItems()

      expect(items.length).to.equal(3) // 2 + trigger

      await subject.setProps({ visibleItemsCount: visibleItems })

      items = await component.findAllListItems()
      let menuTriggerItem = await component.findMenuTriggerItem()

      expect(items.length).to.equal(8)
      expect(getComputedStyle(menuTriggerItem.getDOMNode()).width).to.equal(
        '320px'
      )

      await subject.setProps({ fixMenuTriggerWidth: '15rem' })

      // wait until onUpdate runs
      await wait(() => {
        expect(visibleItems).to.not.equal(7)
      })

      await subject.setProps({ visibleItemsCount: visibleItems })

      items = await component.findAllListItems()
      menuTriggerItem = await component.findMenuTriggerItem()

      expect(items.length).to.equal(10)
      expect(getComputedStyle(menuTriggerItem.getDOMNode()).width).to.equal(
        '240px'
      )
    })
  })

  describe('should be accessible', async () => {
    generateA11yTests(TruncateList, TruncateListExamples)

    it('a11y', async () => {
      await mount(<TruncateList />)

      expect(await accessible()).to.be.true()
    })
  })
})
