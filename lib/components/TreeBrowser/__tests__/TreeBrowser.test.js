import React from 'react'
import TreeBrowser from '../index'
import IconFolderSolid from 'instructure-icons/lib/Solid/IconFolderSolid'
import IconDocumentSolid from 'instructure-icons/lib/Solid/IconDocumentSolid'
import IconPlus from 'instructure-icons/lib/Solid/IconPlusSolid'

describe('<TreeBrowser />', function () {
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
        name: 'Sub Root 1'
      },
      4: {
        id: 4,
        name: 'Sub Root 2'
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

  it('should render a tree', function () {
    const tree = testbed.render()
    expect(tree).to.be.present
  })

  it('should render subcollections', function () {
    const tree = testbed.render()
    expect(tree.find('button').length).to.equal(1)
    tree.find('button').simulate('click')
    expect(tree.find('button').length).to.equal(4)
  })

  it('should not show the first keyed collection if showRootCollection is false', function () {
    const tree = testbed.render({showRootCollection: false})
    expect(tree.find('button').length).to.equal(2)
  })

  it('should render first keyed collection if showRootCollection is true and rootId specified', function () {
    const tree = testbed.render()
    expect(tree.find('#collection_2').node).to.exist
    expect(tree.find('button').length).to.equal(1)
  })

  it('should render collections at top level if showRootCollection is true and rootId is undefined', function () {
    const tree = testbed.render({rootId: undefined})
    expect(tree.find('button').length).to.equal(3)
  })

  describe('collections', function () {
    it('renders a folder icon by default', function () {
      const tree = testbed.render()
      const svg = tree.find(IconFolderSolid)
      expect(svg.length).to.equal(1)
    })

    it('renders a custom icon when passed', function () {
      const tree = testbed.render({collectionIcon: IconPlus})
      const svg = tree.find(IconPlus)
      expect(svg.length).to.equal(1)
    })

    it('renders without an icon if collection icon explicitly set to null', function () {
      const tree = testbed.render({collectionIcon: null})
      const svg = tree.find(IconFolderSolid)
      expect(svg.length).to.equal(0)
    })
  })

  describe('items', function () {
    it('renders a document icon by default', function () {
      const tree = testbed.render()
      tree.find('button').simulate('click')
      const svg = tree.find(IconDocumentSolid)
      expect(svg.length).to.equal(1)
    })

    it('renders a custom icon when passed', function () {
      const tree = testbed.render({itemIcon: IconPlus})
      tree.find('button').simulate('click')
      const svg = tree.find(IconPlus)
      expect(svg.length).to.equal(1)
    })

    it('renders without an icon if item icon explicitly set to null', function () {
      const tree = testbed.render({itemIcon: null})
      const svg = tree.find(IconDocumentSolid)
      expect(svg.length).to.equal(0)
    })
  })

  describe('for a11y', function () {
    it('should meet standards', function (done) {
      const tree = testbed.render()

      tree.should.be.accessible(done, {
        ignores: [
          'color-contrast' // brand color doesn't meet 4.5:1 contrast req
        ]
      })
    })

    it('should move focus down when down key is pressed', function () {
      const tree = testbed.render()
      const button = tree.find('button')
      button.node.focus()
      button.simulate('click')
      button.keyDown('down')
      const b2 = tree.node.getNavigableNodes()[1]
      expect(b2 === document.activeElement).be.true
    })

    it('should move focus down when down "J" is pressed', function () {
      const tree = testbed.render()
      const button = tree.find('button')
      button.node.focus()
      button.simulate('click')
      button.keyDown('j')
      const b2 = tree.node.getNavigableNodes()[1]
      expect(b2 === document.activeElement).be.true
    })

    it('should move focus up when up key is pressed', function () {
      const tree = testbed.render()
      const button = tree.find('button')
      button.simulate('click')
      const subButton = tree.node.getNavigableNodes()[1]
      subButton.focus()
      button.keyDown('up')
      expect(button.node === document.activeElement).be.true
    })

    it('should move focus up when down "K" is pressed', function () {
      const tree = testbed.render()
      const button = tree.find('button')
      button.simulate('click')
      const subButton = tree.node.getNavigableNodes()[1]
      subButton.focus()
      button.keyDown('k')
      expect(button.node === document.activeElement).be.true
    })
  })
})
