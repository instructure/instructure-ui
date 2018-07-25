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
import IconFolder from '@instructure/ui-icons/lib/Solid/IconFolder'
import IconDocument from '@instructure/ui-icons/lib/Solid/IconDocument'
import IconPlus from '@instructure/ui-icons/lib/Solid/IconPlus'
import TreeBrowser from '../index'

describe('<TreeBrowser /> in ui-core', () => {
  const testbed = new Testbed(<TreeBrowser
    collections={{
      2: {
        id: 2,
        name: 'Root Directory',
        collections: [3, 4],
        items: [1]
      },
      3: {
        id: 3,
        name: 'Sub Root 1',
        collections: [5]
      },
      4: {
        id: 4,
        name: 'Sub Root 2'
      },
      5: {
        id: 5,
        name: 'Nested Sub Collection'
      }
    }}
    items={{
      1: {
        id: 1,
        name: 'Item 1'
      }
    }}
    rootId={2}
  />)

  it('should render a tree', () => {
    const tree = testbed.render()
    expect(tree).to.be.present()
  })

  it('should be accessible', (done) => {
    const tree = testbed.render()
    tree.should.be.accessible(done, {
      ignores: []
    })
  })

  it('should render subcollections', () => {
    const tree = testbed.render()
    expect(tree.find('button').length).to.equal(1)
    tree.find('button').simulate('click')
    expect(tree.find('button').length).to.equal(4)
  })

  it('should not show the first keyed collection if showRootCollection is false', () => {
    const tree = testbed.render({showRootCollection: false})
    expect(tree.find('button').length).to.equal(2)
  })

  it('should render first keyed collection if showRootCollection is true and rootId specified', () => {
    const tree = testbed.render()
    expect(tree.find('button').length).to.equal(1)
    expect(tree.find('li').first().getAttribute('title')).to.equal('Root Directory')
  })

  it('should render all collections at top level if showRootCollection is true and rootId is undefined', () => {
    const tree = testbed.render({rootId: undefined}) // eslint-disable-line no-undefined
    expect(tree.find('button').length).to.equal(4)
  })

  describe('expanded', () => {
    it('expanded state is empty without defaultExpanded prop', () => {
      const tree = testbed.render()
      expect(tree.instance().state.expanded.length).to.equal(0)
    })

    it('accepts an array of default expanded collections and sets state', () => {
      const tree = testbed.render({defaultExpanded: [2, 3]})
      expect(tree.instance().state.expanded).to.include(2, 3)
      expect(tree.find('button').length).to.equal(5)
    })

    it('updates expanded state on handleCollectionClick', () => {
      const tree = testbed.render()
      tree.find('button').simulate('click')
      expect(tree.instance().state.expanded).to.include(2)
    })

    it('calls onCollectionClick when expanding and collapsing', () => {
      const onCollectionClick = testbed.stub()
      const tree = testbed.render({onCollectionClick})
      tree.find('button').simulate('click')
      expect(onCollectionClick).to.have.been.called()
    })

    it('persists the state of expanded children when parent collapsed', () => {
      const tree = testbed.render()
      const rootCollection = tree.find('button')
      rootCollection.simulate('click')
      expect(tree.find('button').length).to.equal(4)
      tree.find('[title="Sub Root 1"]').simulate('click')
      expect(tree.find('button').length).to.equal(5)
      rootCollection.simulate('click')
      expect(tree.find('button').length).to.equal(1)
      rootCollection.simulate('click')
      expect(tree.find('button').length).to.equal(5)
    })

    it('should not update expanded on click when set as explicit prop', () => {
      const tree = testbed.render({expanded: [2]})
      expect(tree.find('button').length).to.equal(4)
      tree.find('button').first().simulate('click')
      expect(tree.find('button').length).to.equal(4)
      tree.find('[title="Sub Root 1"]').simulate('click')
      expect(tree.find('button').length).to.equal(4)
      expect(tree.instance().state.expanded).to.not.exist()
      expect(tree.instance().props.expanded).to.include(2)
    })
  })

  describe('selected', () => {
    it('does not show the selection if selectionType is "none"', () => {
      const tree = testbed.render()
      tree.find('button').simulate('click')
      expect(tree.instance().state.selection).to.equal('')
    })

    it('shows the selection indicator on last clicked collection or item', () => {
      const tree = testbed.render({selectionType: 'single'})
      tree.find('button').simulate('click')
      expect(tree.instance().state.selection).to.equal('collection_2')
      tree.find('[title="Item 1"]').simulate('click')
      expect(tree.instance().state.selection).to.equal('item_1')
      tree.find('[title="Item 1"]').simulate('click')
      expect(tree.instance().state.selection).to.equal('item_1')
    })
  })

  describe('collections', () => {
    it('renders a folder icon by default', () => {
      const tree = testbed.render()
      const svg = tree.find(IconFolder)
      expect(svg.length).to.equal(1)
    })

    it('renders a custom icon when passed', () => {
      const tree = testbed.render({collectionIcon: IconPlus})
      const svg = tree.find(IconPlus)
      expect(svg.length).to.equal(1)
    })

    it('renders without an icon if collection icon explicitly set to null', () => {
      const tree = testbed.render({collectionIcon: null})
      const svg = tree.find(IconFolder)
      expect(svg.length).to.equal(0)
    })

    it('properly expands and collapses', () => {
      const tree = testbed.render()
      const button = tree.find('button')
      expect(tree.find('li')).to.have.length(1)
      button.simulate('click')
      expect(tree.find('li')).to.have.length(4)
    })

    it('renders icons properly', () => {
      const tree = testbed.render({
        collectionIconExpanded: IconDocument
      })
      const button = tree.find('button')
      expect(button.find(IconFolder).length).to.equal(1)
      expect(button.find(IconDocument).length).to.equal(0)
      button.simulate('click')
      expect(button.find(IconFolder).length).to.equal(0)
      expect(button.find(IconDocument).length).to.equal(1)
      button.simulate('click')
      expect(button.find(IconFolder).length).to.equal(1)
      expect(button.find(IconDocument).length).to.equal(0)
    })
  })

  describe('items', () => {
    it('renders a document icon by default', () => {
      const tree = testbed.render()
      tree.find('button').simulate('click')
      const svg = tree.find(IconDocument)
      expect(svg.length).to.equal(1)
    })

    it('renders a custom icon when passed', () => {
      const tree = testbed.render({itemIcon: IconPlus})
      tree.find('button').simulate('click')
      const svg = tree.find(IconPlus)
      expect(svg.length).to.equal(1)
    })

    it('renders without an icon if item icon explicitly set to null', () => {
      const tree = testbed.render({itemIcon: null})
      const svg = tree.find(IconDocument)
      expect(svg.length).to.equal(0)
    })
  })

  describe('for a11y', () => {
    it('accepts a treeLabel prop', () => {
      const tree = testbed.render({treeLabel: 'test'})
      expect(tree.getAttribute('aria-label')).to.eq('test')
    })

    it('toggles aria-expanded', () => {
      const tree = testbed.render()
      const li = tree.find('li')
      const button = li.find('button')
      expect(li.getAttribute('aria-expanded')).to.eq('false')
      button.simulate('click')
      expect(li.getAttribute('aria-expanded')).to.eq('true')
    })

    it('uses aria-selected when selectionType is not "none"', () => {
      const tree = testbed.render({selectionType: 'single', defaultExanded: [2]})
      const li = tree.find('li')
      const button = li.find('button')
      expect(li.getAttribute('aria-selected')).to.eq(null)
      button.simulate('click')
      expect(li.getAttribute('aria-selected')).to.eq('true')
      expect(tree.find('li').at(1).getAttribute('aria-selected')).to.eq('false')
    })

    it('updates tabindex on keyboard nav', () => {
      const tree = testbed.render({defaultExpanded: [2]})
      const button = tree.find('li').first()
      button.node.focus()
      button.keyDown('down')
      const b2 = tree.node.getNavigableNodes()[1]
      expect(button.node.getAttribute('tabindex')).to.eq('-1')
      expect(b2.getAttribute('tabindex')).to.eq('0')
    })

    it('should move focus down when down key is pressed', () => {
      const tree = testbed.render({defaultExpanded: [2]})
      const button = tree.find('li').first()
      button.node.focus()
      button.keyDown('down')
      const b2 = tree.node.getNavigableNodes()[1]
      expect(b2 === document.activeElement).to.be.true()
    })

    it('should move focus down when down "J" is pressed', () => {
      const tree = testbed.render({defaultExpanded: [2]})
      const button = tree.find('li').first()
      button.node.focus()
      button.keyDown('j')
      const b2 = tree.node.getNavigableNodes()[1]
      expect(b2 === document.activeElement).to.be.true()
    })

    it('should move focus up when up key is pressed', () => {
      const tree = testbed.render({defaultExpanded: [2]})
      const button = tree.find('li').first()
      const subButton = tree.find('li').at(1)
      subButton.focus()

      subButton.keyDown('up')
      expect(button.node === document.activeElement).be.true()
    })

    it('should move focus up when down "K" is pressed', () => {
      const tree = testbed.render({defaultExpanded: [2]})
      const button = tree.find('li').first()
      const subButton = tree.find('li').at(1)
      subButton.focus()
      subButton.keyDown('k')
      expect(button.node === document.activeElement).to.be.true()
    })

    it('should open collapsed collection when right arrow is pressed', () => {
      const tree = testbed.render()
      const button = tree.find('li').first()
      expect(tree.find('button').length).to.equal(1)
      button.focus()
      button.keyDown('right')
      expect(tree.find('button').length).to.equal(4)
      expect(button.node === document.activeElement).to.be.true()
    })

    it('should move focus down when right arrow is pressed on expanded collection', () => {
      const tree = testbed.render({defaultExpanded: [2]})
      const button = tree.find('li').first()
      const subButton = tree.find('li').at(1)
      expect(tree.find('button').length).to.equal(4)
      button.focus()
      button.keyDown('right')
      expect(tree.find('button').length).to.equal(4)
      expect(subButton.node === document.activeElement).to.be.true()
    })

    it('should collapse expanded collection when left arrow is pressed', () => {
      const tree = testbed.render({defaultExpanded: [2]})
      const button = tree.find('li').first()
      expect(tree.find('button').length).to.equal(4)
      button.focus()
      button.keyDown('left')
      expect(tree.find('button').length).to.equal(1)
      expect(button.node === document.activeElement).to.be.true()
    })

    it('should move focus up when left arrow is pressed on collapsed collection', () => {
      const tree = testbed.render({defaultExpanded: [2]})
      const button = tree.find('li').first()
      const subButton = tree.find('li').at(1)
      expect(tree.find('button').length).to.equal(4)
      subButton.focus()
      subButton.keyDown('left')
      expect(tree.find('button').length).to.equal(4)
      expect(button.node === document.activeElement).to.be.true()
    })

    it('should select the node on enter or space if selectionType is not "none"', () => {
      const tree = testbed.render({selectionType: 'single', defaultExpanded: [2]})
      const button = tree.find('li').first()
      const subButton = tree.find('li').at(1)
      button.focus()
      button.keyDown('enter')
      expect(tree.instance().state.selection).to.equal('collection_2')
      subButton.focus()
      subButton.keyDown('space')
      expect(tree.instance().state.selection).to.equal('collection_3')
    })

    it('if selectionType is not "none" it should not expand the node on enter or space', () => {
      const tree = testbed.render({selectionType: 'single', defaultExpanded: [2]})
      const button = tree.find('li').first()
      expect(tree.find('button').length).to.equal(4)
      button.focus()
      button.keyDown('enter')
      expect(tree.instance().state.selection).to.equal('collection_2')
      expect(tree.find('button').length).to.equal(4)
    })

    it('should move to the top node without expanding/collapsing anything when home is pressed', () => {
      const tree = testbed.render({defaultExpanded: [2]})
      const button = tree.find('li').first()
      const lastButton = tree.find('li').last()
      expect(tree.find('button').length).to.equal(4)
      lastButton.focus()
      button.keyDown('home')
      expect(tree.find('button').length).to.equal(4)
      expect(button.node === document.activeElement)
    })

    it('should move to the bottom node without expanding/collapsing anything when end is pressed', () => {
      const tree = testbed.render({defaultExpanded: [2]})
      const button = tree.find('li').first()
      const lastButton = tree.find('li').last()
      expect(tree.find('button').length).to.equal(4)
      button.focus()
      button.keyDown('end')
      expect(tree.find('button').length).to.equal(4)
      expect(lastButton.node === document.activeElement)
    })
  })
})
