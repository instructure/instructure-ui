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
import { expect, mount, stub, wait } from '@instructure/ui-test-utils'
import { TreeBrowser } from '../index'

import { TreeBrowserLocator } from '../TreeBrowserLocator'

const COLLECTIONS_DATA = {
  2: { id: 2, name: 'Root Directory', collections: [3, 4], items: [1] },
  3: { id: 3, name: 'Sub Root 1', collections: [5] },
  4: { id: 4, name: 'Sub Root 2' },
  5: { id: 5, name: 'Nested Sub Collection' }
}

const ITEMS_DATA = {
  1: { id: 1, name: 'Item 1' }
}

describe('<TreeBrowser />', async () => {
  it('should render a tree', async () => {
    await mount(
      <TreeBrowser
        collections={COLLECTIONS_DATA}
        items={ITEMS_DATA}
        rootId={2}
      />
    )
    const tree = await TreeBrowserLocator.find()
    expect(tree).to.exist()
  })

  it('should render subcollections', async () => {
    await mount(
      <TreeBrowser
        collections={COLLECTIONS_DATA}
        items={ITEMS_DATA}
        rootId={2}
      />
    )

    const tree = await TreeBrowserLocator.find()
    const items = await tree.findAllItems()

    expect(items.length).to.equal(1)

    await items[0].click()

    const itemsAfterClick = await tree.findAllItems()

    expect(itemsAfterClick.length).to.equal(4)
  })

  it('should render all collections at top level if showRootCollection is true and rootId is undefined', async () => {
    await mount(
      <TreeBrowser
        collections={COLLECTIONS_DATA}
        items={ITEMS_DATA}
        rootId={undefined}
      />
    )

    const tree = await TreeBrowserLocator.find()
    const items = await tree.findAllItems()

    expect(items.length).to.equal(4)
  })

  describe('expanded', async () => {
    it('should not expand collections or items without defaultExpanded prop', async () => {
      await mount(
        <TreeBrowser
          collections={COLLECTIONS_DATA}
          items={ITEMS_DATA}
          rootId={2}
        />
      )
      const tree = await TreeBrowserLocator.find()
      const items = await tree.findAllItems()

      await wait(() => {
        expect(items.length).to.equal(1)
        expect(items[0]).to.have.text('Root Directory')
      })
    })

    it('should accept an array of default expanded collections', async () => {
      await mount(
        <TreeBrowser
          collections={COLLECTIONS_DATA}
          items={ITEMS_DATA}
          rootId={2}
          defaultExpanded={[2, 3]}
        />
      )
      const tree = await TreeBrowserLocator.find()
      const items = await tree.findAllItems()

      expect(items.length).to.equal(5)

      expect(await tree.findItem(':label(Sub Root 2)')).to.exist()
      expect(await tree.findItem(':label(Nested Sub Collection)')).to.exist()
    })

    it('should persist the state of expanded children when parent collapsed', async () => {
      await mount(
        <TreeBrowser
          collections={COLLECTIONS_DATA}
          items={ITEMS_DATA}
          rootId={2}
        />
      )

      const tree = await TreeBrowserLocator.find()
      const items = await tree.findAllItems()

      const rootCollection = items[0]

      await rootCollection.click()

      expect((await tree.findAllItems()).length).to.equal(4)

      const subCollection = await tree.findItem(':label(Sub Root 1)')

      await subCollection.click()

      expect((await tree.findAllItems()).length).to.equal(5)

      await rootCollection.click()

      expect((await tree.findAllItems()).length).to.equal(1)

      await rootCollection.click()

      expect((await tree.findAllItems()).length).to.equal(5)
    })

    it('should not update expanded on click when set as explicit prop', async () => {
      await mount(
        <TreeBrowser
          collections={COLLECTIONS_DATA}
          items={ITEMS_DATA}
          rootId={2}
          expanded={[2]}
        />
      )

      const tree = await TreeBrowserLocator.find()
      const items = await tree.findAllItems()

      expect(items.length).to.equal(4)

      await items[0].click()

      expect((await tree.findAllItems()).length).to.equal(4)

      await (await tree.findItem(':label(Sub Root 1)')).click()

      expect((await tree.findAllItems()).length).to.equal(4)

      expect(await tree.findItem(':label(Nested Sub Collection)', { expectEmpty: true }))
        .to.not.exist()
    })
  })

  describe('selected', async () => {
    it('should not show the selection if selectionType is none', async () => {
      await mount(
        <TreeBrowser
          collections={COLLECTIONS_DATA}
          items={ITEMS_DATA}
          rootId={2}
        />
      )
      const tree = await TreeBrowserLocator.find()

      const item = await tree.findItem()

      item.click()

      await wait(() => {
        expect(item).to.not.have.attribute('aria-selected')
      })
    })

    it('should show the selection indicator on last clicked collection or item', async () => {
      await mount(
        <TreeBrowser
          collections={COLLECTIONS_DATA}
          items={ITEMS_DATA}
          rootId={2}
          selectionType="single"
        />
      )

      const tree = await TreeBrowserLocator.find()

      const item = await tree.findItem(':label(Root Directory)')

      await item.click()

      await wait(() => {
        expect(item).to.have.attribute('aria-selected')
      })

      const nestedItem = await tree.findItem(':label(Item 1)')

      await nestedItem.click()

      await wait(() => {
        expect(nestedItem).to.have.attribute('aria-selected')
      })
    })
  })

  describe('collections', async () => {
    it('should not show the first keyed collection if showRootCollection is false', async () => {
      await mount(
        <TreeBrowser
          collections={COLLECTIONS_DATA}
          items={ITEMS_DATA}
          rootId={2}
          showRootCollection={false}
        />
      )

      const tree = await TreeBrowserLocator.find()

      const items = await tree.findAllItems()

      expect(items.length).to.equal(2)
    })

    it('should render first keyed collection if showRootCollection is true and rootId specified', async () => {
      await mount(
        <TreeBrowser
          collections={COLLECTIONS_DATA}
          items={ITEMS_DATA}
          rootId={2}
        />
      )
      const tree = await TreeBrowserLocator.find()

      const item = await tree.findItem(':label(Root Directory)')

      expect(item).to.exist()
    })

    it('should render a folder icon by default', async () => {
      await mount(
        <TreeBrowser
          collections={COLLECTIONS_DATA}
          items={ITEMS_DATA}
          rootId={2}
        />
      )
      const tree = await TreeBrowserLocator.find()

      const iconFolder = await tree.findAll('[name="IconFolder"]')

      expect(iconFolder.length).to.equal(1)
    })

    it('should render a custom icon', async () => {
      const IconCustom = (
        <svg height="100" width="100">
          <title>Custom icon</title>
          <circle cx="50" cy="50" r="40" />
        </svg>
      )

      await mount(
        <TreeBrowser
          collections={COLLECTIONS_DATA}
          items={ITEMS_DATA}
          rootId={2}
          collectionIcon={() => IconCustom}
        />
      )
      const tree = await TreeBrowserLocator.find()
      const item = await tree.findItem(':label(Root Directory)')
      const icons = await item.findAll('svg:title(Custom icon)')

      expect(icons.length).to.equal(1)
    })

    it('should render without icon if set to null', async () => {
      await mount(
        <TreeBrowser
          collections={COLLECTIONS_DATA}
          items={ITEMS_DATA}
          rootId={2}
          collectionIcon={null}
        />
      )
      const tree = await TreeBrowserLocator.find()

      expect(await tree.find('svg', { expectEmpty: true })).to.not.exist()
    })

    it('should call onCollectionToggle when expanding and collapsing with mouse', async () => {
      const onCollectionToggle = stub()
      await mount(
        <TreeBrowser
          collections={COLLECTIONS_DATA}
          items={ITEMS_DATA}
          rootId={2}
          onCollectionToggle={onCollectionToggle}
        />
      )
      const tree = await TreeBrowserLocator.find()
      const item = await tree.findItem()

      await item.click()

      await wait(() => {
        expect(onCollectionToggle).to.have.been.called()
      })
    })

    it('should call onCollectionToggle on arrow key expansion or collapse', async () => {
      const onCollectionToggle = stub()
      await mount(
        <TreeBrowser
          collections={COLLECTIONS_DATA}
          items={ITEMS_DATA}
          rootId={2}
          onCollectionToggle={onCollectionToggle}
        />
      )

      const tree = await TreeBrowserLocator.find()
      const item = await tree.find(':label(Root Directory)')

      await item.focus()

      await wait(() => {
        expect(item).to.contain.focus()
      })

      await item.keyDown('right')
      await item.keyDown('left')
      await item.keyDown('left')

      await wait(() => {
        expect(onCollectionToggle).to.have.been.calledTwice()
      })
    })

    it('should call onCollectionClick on button activation (space/enter or click)', async () => {
      const onCollectionClick = stub()
      await mount(
        <TreeBrowser
          collections={COLLECTIONS_DATA}
          items={ITEMS_DATA}
          rootId={2}
          onCollectionClick={onCollectionClick}
        />
      )
      const tree = await TreeBrowserLocator.find()

      const item = await tree.findItem(':label(Root Directory)')

      await item.click()
      await item.keyDown('space')
      await item.keyDown('enter')

      await wait(() => {
        expect(onCollectionClick).to.have.been.calledThrice()
      })
    })
  })

  describe('items', async () => {
    it('should render a document icon by default', async () => {
      await mount(
        <TreeBrowser
          collections={COLLECTIONS_DATA}
          items={ITEMS_DATA}
          rootId={2}
          defaultExpanded={[2]}
        />
      )

      const tree = await TreeBrowserLocator.find()
      const iconDoc = await tree.findAll('[name="IconDocument"]')

      expect(iconDoc.length).to.equal(1)
    })

    it('should render a custom icon', async () => {
      const IconCustom = (
        <svg height="100" width="100">
          <title>Custom icon</title>
          <circle cx="50" cy="50" r="40" />
        </svg>
      )

      await mount(
        <TreeBrowser
          collections={COLLECTIONS_DATA}
          items={ITEMS_DATA}
          rootId={2}
          defaultExpanded={[2]}
          itemIcon={() => IconCustom}
        />
      )

      const tree = await TreeBrowserLocator.find()
      const item = await tree.findItem(':label(Item 1)')
      const icons = await item.findAll('svg:title(Custom icon)')

      expect(icons.length).to.equal(1)
    })

    it('should render without icon if set to null', async () => {
      await mount(
        <TreeBrowser
          collections={COLLECTIONS_DATA}
          items={ITEMS_DATA}
          rootId={2}
        />
      )
      const tree = await TreeBrowserLocator.find()
      const icon = await tree.find('[name="IconDocument"]', { expectEmpty: true })

      expect(icon).to.not.exist()
    })
  })

  describe('for a11y', async () => {
    it('should meet a11y standards', async () => {
      await mount(
        <TreeBrowser
          collections={COLLECTIONS_DATA}
          items={ITEMS_DATA}
          rootId={2}
        />
      )
      const tree = await TreeBrowserLocator.find()
      expect(await tree.accessible()).to.be.true()
    })

    it('should accept a treeLabel prop', async () => {
      await mount(
        <TreeBrowser
          collections={COLLECTIONS_DATA}
          items={ITEMS_DATA}
          rootId={2}
          treeLabel="Test treeLabel"
        />
      )
      const tree = await TreeBrowserLocator.find(':label(Test treeLabel)')
      expect(tree).to.exist()
    })

    it('should toggle aria-expanded', async () => {
      await mount(
        <TreeBrowser
          collections={COLLECTIONS_DATA}
          items={ITEMS_DATA}
          rootId={2}
        />
      )
      const tree = await TreeBrowserLocator.find()
      const item = await tree.findItem()

      await wait(() => {
        expect(item).to.have.attribute('aria-expanded', 'false')
      })

      await item.click()

      await wait(() => {
        expect(item).to.have.attribute('aria-expanded', 'true')
      })
    })

    it('should use aria-selected when selectionType is not none', async () => {
      await mount(
        <TreeBrowser
          collections={COLLECTIONS_DATA}
          items={ITEMS_DATA}
          rootId={2}
          selectionType="single"
        />
      )
      const tree = await TreeBrowserLocator.find()
      const item = await tree.findItem()

      expect(item).to.not.have.attribute('aria-selected')

      await item.click()

      await wait(() => {
        expect(item).to.have.attribute('aria-selected', 'true')
      })

      const nestedItem = await tree.findItem(':label(Sub Root 1)')

      await wait(() => {
        expect(nestedItem).to.have.attribute('aria-selected', 'false')
      })
    })

    it('should move focus with the up/down arrow keys', async () => {
      await mount(
        <TreeBrowser
          collections={COLLECTIONS_DATA}
          items={ITEMS_DATA}
          rootId={2}
          defaultExpanded={[2]}
        />
      )

      const tree = await TreeBrowserLocator.find(':focusable')
      const items = await tree.findAllItems()

      await tree.focus()

      await wait(() => {
        expect(tree.focused()).to.be.true()
      })

      await tree.keyDown('down')

      await wait(() => {
        expect(items[0].focused()).to.be.true()
      })

      await tree.keyDown('down')

      await wait(() => {
        expect(items[0].focused()).to.be.false()
        expect(items[1].focused()).to.be.true()
      })

      await tree.keyDown('up')

      await wait(() => {
        expect(items[0].focused()).to.be.true()
      })
    })

    it('should move focus via keyboard shortcuts', async () => {
      await mount(
        <TreeBrowser
          collections={COLLECTIONS_DATA}
          items={ITEMS_DATA}
          rootId={2}
          defaultExpanded={[2]}
        />
      )

      const tree = await TreeBrowserLocator.find()
      const items = await tree.findAllItems()

      await tree.focus()

      await wait(() => {
        expect(tree.focused()).to.be.true()
      })

      await tree.keyDown('j')

      await wait(() => {
        expect(items[0].focused()).to.be.true()
      })

      await tree.keyDown('j')

      await wait(() => {
        expect(items[0].focused()).to.be.false()
        expect(items[1].focused()).to.be.true()
      })

      await tree.keyDown('k')

      await wait(() => {
        expect(items[0].focused()).to.be.true()
      })
    })

    it('should open collapsed collection with right arrow', async () => {
      await mount(
        <TreeBrowser
          collections={COLLECTIONS_DATA}
          items={ITEMS_DATA}
          rootId={2}
        />
      )

      const tree = await TreeBrowserLocator.find()
      const items = await tree.findAllItems()

      expect(items.length).to.equal(1)

      await items[0].focus()

      await wait(() => {
        expect(items[0].focused()).to.be.true()
      })

      await items[0].keyDown('right')

      expect((await tree.findAllItems()).length)
        .to.equal(4)
    })

    it('should move focus down when right arrow is pressed on expanded collection', async () => {
      await mount(
        <TreeBrowser
          collections={COLLECTIONS_DATA}
          items={ITEMS_DATA}
          rootId={2}
          defaultExpanded={[2]}
        />
      )

      const tree = await TreeBrowserLocator.find()
      const items = await tree.findAllItems()

      expect(items.length).to.equal(4)

      await items[0].focus()

      await wait(() => {
        expect(items[0].focused()).to.be.true()
      })

      await items[0].keyDown('right')

      await wait(() => {
        expect(items[1].focused()).to.be.true()
      })

      expect((await tree.findAllItems()).length).to.equal(4)
    })

    it('should collapse expanded collection when left arrow is pressed', async () => {
      await mount(
        <TreeBrowser
          collections={COLLECTIONS_DATA}
          items={ITEMS_DATA}
          rootId={2}
          defaultExpanded={[2]}
        />
      )

      const tree = await TreeBrowserLocator.find()
      const items = await tree.findAllItems()

      expect(items.length).to.equal(4)

      await items[0].focus()
      await items[0].keyDown('left')

      await wait(() => {
        expect(items[0].focused()).to.be.true()
      })

      expect((await tree.findAllItems()).length).to.equal(1)
    })

    it('should move focus up when left arrow is pressed on collapsed collection', async () => {
      await mount(
        <TreeBrowser
          collections={COLLECTIONS_DATA}
          items={ITEMS_DATA}
          rootId={2}
          defaultExpanded={[2]}
        />
      )

      const tree = await TreeBrowserLocator.find()
      const items = await tree.findAllItems()

      expect(items.length).to.equal(4)

      const firstItem = items[0]
      const secondItem = items[1]

      await secondItem.focus()
      await secondItem.keyDown('left')

      await wait(() => {
        expect(firstItem.focused()).to.be.true()
      })

      expect((await tree.findAllItems()).length)
        .to.equal(4)
    })

    it('should select the node on enter or space if selectionType is not "none"', async () => {
      await mount(
        <TreeBrowser
          collections={COLLECTIONS_DATA}
          items={ITEMS_DATA}
          rootId={2}
          defaultExpanded={[2]}
          selectionType="single"
        />
      )

      const tree = await TreeBrowserLocator.find()
      const items = await tree.findAllItems()

      const firstItem = items[0]
      const secondItem = items[1]

      await firstItem.focus()
      await firstItem.keyDown('enter')

      await wait(() => {
        expect(firstItem).to.have.attribute('aria-selected', 'true')
      })

      await secondItem.focus()
      await secondItem.keyDown('space')

      await wait(() => {
        expect(secondItem).to.have.attribute('aria-selected', 'true')
      })
    })

    it('should not expand the node on enter or space if selectionType is not "none"', async () => {
      await mount(
        <TreeBrowser
          collections={COLLECTIONS_DATA}
          items={ITEMS_DATA}
          rootId={2}
          selectionType="single"
        />
      )

      const tree = await TreeBrowserLocator.find()
      const items = await tree.findAllItems()

      expect(items.length).to.equal(1)

      const firstItem = items[0]

      await firstItem.focus()

      await firstItem.keyDown('enter')

      expect((await tree.findAllItems()).length).to.equal(1)
    })

    it('should move to the top node without expanding/collapsing anything when home is pressed', async () => {
      await mount(
        <TreeBrowser
          collections={COLLECTIONS_DATA}
          items={ITEMS_DATA}
          rootId={2}
          defaultExpanded={[2]}
        />
      )

      const tree = await TreeBrowserLocator.find()
      const items = await tree.findAllItems()

      expect(items.length).to.equal(4)

      const firstItem = items[0]
      const lastItem = items[3]

      await lastItem.focus()
      await firstItem.keyDown('home')

      expect(firstItem.focused()).to.be.true()

      expect((await tree.findAllItems()).length).to.equal(4)
    })

    it('should move to the bottom node without expanding/collapsing anything when end is pressed', async () => {
      await mount(
        <TreeBrowser
          collections={COLLECTIONS_DATA}
          items={ITEMS_DATA}
          rootId={2}
          defaultExpanded={[2]}
        />
      )

      const tree = await TreeBrowserLocator.find()
      const items = await tree.findAllItems()

      const firstItem = items[0]
      const lastItem = items[3]

      await firstItem.focus()

      await firstItem.keyDown('end')

      expect(lastItem.focused()).to.be.true()

      expect((await tree.findAllItems()).length).to.equal(4)
    })
  })
})
