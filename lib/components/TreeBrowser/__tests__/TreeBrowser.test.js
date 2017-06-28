import React from 'react'
import IconFolderSolid from 'instructure-icons/lib/Solid/IconFolderSolid'
import IconDocumentSolid from 'instructure-icons/lib/Solid/IconDocumentSolid'
import IconPlus from 'instructure-icons/lib/Solid/IconPlusSolid'
import TreeBrowser from '../index'

describe('<TreeBrowser />', () => {
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
    expect(tree).to.be.present
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
    expect(tree.find('button').first().getAttribute('title')).to.equal('Root Directory')
  })

  it('should render all collections at top level if showRootCollection is true and rootId is undefined', () => {
    const tree = testbed.render({rootId: undefined})
    expect(tree.find('button').length).to.equal(4)
  })

  describe('expanded', () => {
    it('does not set state without defaultExpanded prop', () => {
      const tree = testbed.render()
      expect(tree.instance().state).not.to.be_present
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
      expect(onCollectionClick).to.have.been.called
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
      expect(tree.instance().state).not.to.be_present
      expect(tree.instance().props.expanded).to.include(2)
    })
  })

  describe('collections', () => {
    it('renders a folder icon by default', () => {
      const tree = testbed.render()
      const svg = tree.find(IconFolderSolid)
      expect(svg.length).to.equal(1)
    })

    it('renders a custom icon when passed', () => {
      const tree = testbed.render({collectionIcon: IconPlus})
      const svg = tree.find(IconPlus)
      expect(svg.length).to.equal(1)
    })

    it('renders without an icon if collection icon explicitly set to null', () => {
      const tree = testbed.render({collectionIcon: null})
      const svg = tree.find(IconFolderSolid)
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
        collectionIconExpanded: IconDocumentSolid
      })
      const button = tree.find('button')
      expect(button.find(IconFolderSolid).length).to.equal(1)
      expect(button.find(IconDocumentSolid).length).to.equal(0)
      button.simulate('click')
      expect(button.find(IconFolderSolid).length).to.equal(0)
      expect(button.find(IconDocumentSolid).length).to.equal(1)
      button.simulate('click')
      expect(button.find(IconFolderSolid).length).to.equal(1)
      expect(button.find(IconDocumentSolid).length).to.equal(0)
    })
  })

  describe('items', () => {
    it('renders a document icon by default', () => {
      const tree = testbed.render()
      tree.find('button').simulate('click')
      const svg = tree.find(IconDocumentSolid)
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
      const svg = tree.find(IconDocumentSolid)
      expect(svg.length).to.equal(0)
    })
  })

  describe('for a11y', () => {
    it('should meet standards', (done) => {
      const tree = testbed.render()

      tree.should.be.accessible(done, {
        ignores: [
          'color-contrast' // brand color doesn't meet 4.5:1 contrast req
        ]
      })
    })

    it('accepts a treeLabel prop', () => {
      const tree = testbed.render({treeLabel: 'test'})
      expect(tree.getAttribute('aria-label')).to.eq('test')
    })

    it('toggles aria-expanded', () => {
      const tree = testbed.render()
      const button = tree.find('button')
      expect(button.getAttribute('aria-expanded')).to.eq('false')
      button.simulate('click')
      expect(button.getAttribute('aria-expanded')).to.eq('true')
    })

    it('updates tabindex on keyboard nav', () => {
      const tree = testbed.render({defaultExpanded: [2]})
      const button = tree.find('button').first()
      button.node.focus()
      button.keyDown('down')
      const b2 = tree.node.getNavigableNodes()[1]
      expect(button.node.getAttribute('tabindex')).to.eq('-1')
      expect(b2.getAttribute('tabindex')).to.eq('0')
    })

    it('should move focus down when down key is pressed', () => {
      const tree = testbed.render({defaultExpanded: [2]})
      const button = tree.find('button').first()
      button.node.focus()
      button.keyDown('down')
      const b2 = tree.node.getNavigableNodes()[1]
      expect(b2 === document.activeElement).be.true
    })

    it('should move focus down when down "J" is pressed', () => {
      const tree = testbed.render({defaultExpanded: [2]})
      const button = tree.find('button').first()
      button.node.focus()
      button.keyDown('j')
      const b2 = tree.node.getNavigableNodes()[1]
      expect(b2 === document.activeElement).be.true
    })

    it('should move focus up when up key is pressed', () => {
      const tree = testbed.render({defaultExpanded: [2]})
      const button = tree.find('button').first()
      const subButton = tree.node.getNavigableNodes()[1]
      subButton.focus()
      button.keyDown('up')
      expect(button.node === document.activeElement).be.true
    })

    it('should move focus up when down "K" is pressed', () => {
      const tree = testbed.render({defaultExpanded: [2]})
      const button = tree.find('button').first()
      const subButton = tree.node.getNavigableNodes()[1]
      subButton.focus()
      button.keyDown('k')
      expect(button.node === document.activeElement).be.true
    })
  })
})
