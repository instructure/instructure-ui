import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import themeable from '../../util/themeable'
import keycode from 'keycode'
import TreeCollection from './TreeCollection'
import IconFolderSolid from 'instructure-icons/lib/Solid/IconFolderSolid'
import IconDocumentSolid from 'instructure-icons/lib/Solid/IconDocumentSolid'

import styles from './styles.css'
import theme from './theme.js'

/**
  The `<TreeBrowser/>` component provides a keyboard accessible tree structure. The component expects
  to receive a normalized data structure, examples can be seen at https://github.com/paularmstrong/normalizr.

  ```jsx_example
      <TreeBrowser
        collections={{
          1: {
            id: 1,
            name: "English Literacy Standards",
            collections: [2,3],
            descriptor: "2 Groups | 127 Outcomes"
          },
          2: { id: 2, name: "Reading Literature", collections: [4], items: [3] },
          3: { id: 3, name: "Kindergarten", collections: [], items: [1,2] },
          4: { id: 4, name: "Advanced Readers", collections: [], items: [] }
        }}
        items={{
          1: { id: 1, name: "Can recognize letter sounds", rootLevel: true },
          2: { id: 2, name: "Can form most letters", descriptor: "Optional in most states" },
          3: { id: 3, name: "Can identify at least 10 books" }
        }}
      />
  ```
  ```jsx_example
    <TreeBrowser
      variant="indent"
      collectionIcon={IconPlus}
      collectionIconExpanded={IconX}
      itemIcon={PlaceholderIcon}
      collections={{
        1: { id: 1, name: "Grade 1", collections: [2,3,6] },
        2: { id: 2, name: "Math Outcomes", collections: [4], items: [3,4], descriptor: "1 Group | 2 Outcomes" },
        3: { id: 3, name: "Reading Outcomes", collections: [5], items: [1,2], descriptor: "1 Group | 2 Outcomes" },
        4: { id: 4, name: "Advanced Math", collections: [7], items: [6], descriptor: "1 Outcome" },
        5: { id: 5, name: "Advanced Reading", collections: [7], items: [5], descriptor: "1 Group | 2 Outcomes" },
        6: { id: 6, name: "Advanced Outcomes", items: [5,6], descriptor: "2 Outcomes" },
        7: { id: 7, name: "Shared Empty Group", descriptor: "a shared unused group"}
      }}
      items={{
        1: { id: 1, name: "Can read" },
        2: { id: 2, name: "Can write" },
        3: { id: 3, name: "Can add" },
        4: { id: 4, name: "Can subtract" },
        5: { id: 5, name: "Can read Shakespeare" },
        6: { id: 6, name: "Can do quantum physics" }
      }}
      showRootCollection={false}
    />
  ```
**/
@themeable(theme, styles)
export default class TreeBrowser extends Component {

  static propTypes = {
    /**
    * a normalized hash of collections, keyed by id, that contain an
    * :id, :name, :items (an array of item ids), :collections (an array of
    * collection ids), and optional :descriptor text.
    * The first keyed collection is assumed to be the root level
    */
    collections: PropTypes.object.isRequired,
    /**
    * a hash of items, keyed by id ,that contain an :id, :name,
    * and optional :descriptor text
    */
    items: PropTypes.object.isRequired,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    variant: PropTypes.oneOf(['folderTree', 'indent']),
    collectionIcon: PropTypes.func,
    collectionIconExpanded: PropTypes.func,
    itemIcon: PropTypes.func,
    /**
    * whether or not to show the first keyed collection or
    * to begin with its immediate subcollections instead
    */
    showRootCollection: PropTypes.bool,
    onToggle: PropTypes.func,
    onSelect: PropTypes.func,
    onCollectionClick: PropTypes.func,
    onItemClick: PropTypes.func
  }

  static defaultProps = {
    size: 'medium',
    variant: 'folderTree',
    showRootCollection: true,
    collectionIcon: IconFolderSolid,
    collectionIconExpanded: IconFolderSolid,
    itemIcon: IconDocumentSolid,
    onToggle: function () {},
    onSelect: function () {},
    onItemClick: function () {},
    onCollectionClick: function () {}
  }

  handleKeyDown = (event) => {
    switch (event.keyCode) {
      case keycode.codes.down:
      case keycode.codes.j:
        this.moveFocus(1)
        break
      case keycode.codes.up:
      case keycode.codes.k:
        this.moveFocus(-1)
        break
      default:
        return
    }
    event.preventDefault()
  }

  getNavigableNodes () {
    return Array.from(ReactDOM.findDOMNode(this).querySelectorAll('button'))
  }

  moveFocus (delta) {
    const nodes = this.getNavigableNodes()
    const active = nodes.indexOf(window.document.activeElement)
    let next = active + delta
    if (next < 0) {
      next = 0
    } else if (next >= nodes.length) {
      next = nodes.length - 1
    }
    nodes[next].focus()
  }

  rootLevel () {
    const rootCollection = this.props.collections[1]
    if (this.props.showRootCollection) {
      return [rootCollection]
    } else {
      return rootCollection.collections
        .map(id => this.props.collections[id])
        .filter(collection => collection != null)
    }
  }

  renderRoot () {
    const treeRoot = this.rootLevel()
    return treeRoot.map((collection) =>
      <TreeCollection
        key={'collection-' + collection.id}
        descriptor={collection.descriptor}
        collection={collection}
        {...this.props}
      />
    )
  }

  render () {
    return (
      <div onKeyDown={this.handleKeyDown}>
        {this.renderRoot()}
      </div>
    )
  }
}

export { default as TreeCollection } from './TreeCollection'
