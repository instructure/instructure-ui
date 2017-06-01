import React, { Component } from 'react'
import PropTypes from 'prop-types'
import themeable from '../../themeable'
import keycode from 'keycode'
import TreeCollection from './TreeCollection'
import IconFolderSolid from 'instructure-icons/lib/Solid/IconFolderSolid'
import IconDocumentSolid from 'instructure-icons/lib/Solid/IconDocumentSolid'
import { pickProps } from '../../util/passthroughProps'
import CustomPropTypes from '../../util/CustomPropTypes'

import styles from './styles.css'
import theme from './theme.js'

/**
---
category: navigation
---
  The `<TreeBrowser/>` component provides a keyboard accessible tree structure. The component expects
  to receive a normalized data structure, examples can be seen at https://github.com/paularmstrong/normalizr.

  ```jsx_example
      <TreeBrowser
        collections={{
          1: {
            id: 1,
            name: "Assignments",
            collections: [2,3],
            items: [3],
            descriptor: "Class Assignments"
          },
          2: { id: 2, name: "English Assignments", collections: [4], items: [] },
          3: { id: 3, name: "Math Assignments", collections: [5], items: [1,2] },
          4: { id: 4, name: "Reading Assignments", collections: [], items: [4] },
          5: { id: 5, name: "Advanced Math Assignments", items: [5]}
        }}
        items={{
          1: { id: 1, name: "Addition Worksheet"},
          2: { id: 2, name: "Subtraction Worksheet"},
          3: { id: 3, name: "General Questions" },
          4: { id: 4, name: "Vogon Poetry"},
          5: { id: 5, name: "Bistromath", description: "Explain the Bistromathic Drive" }
        }}
        defaultExpanded={[1, 3]}
        rootId={1}
      />
  ```

  An example of a 'controlled' `<TreeBrowser />` with custom icons:

  ```js_example
    class Example extends React.Component {
      constructor (props) {
        super(props)
        this.state = {
          expanded: [2]
        }
      }

      handleCollectionClick = (id, collection) => {
        this.setState((state) => {
          const expanded = [...state.expanded]
          const index = expanded.indexOf(collection.id)

          if (!collection.expanded) {
            expanded.splice(index, 1)
          } else if (index < 0) {
            expanded.push(collection.id)
          }

          return { expanded }
        })
      };

      render () {
        return (
          <TreeBrowser
            variant="indent"
            collectionIcon={IconPlus}
            collectionIconExpanded={IconX}
            itemIcon={PlaceholderIcon}
            collections={{
              1: { id: 1, name: "Grade 1", collections: [2,3,6] },
              2: { id: 2, name: "Math Outcomes", collections: [4], items: [3,4], descriptor: "1 Group | 2 Outcomes" },
              3: { id: 3, name: "Reading Outcome", collections: [5], items: [1,2], descriptor: "1 Group | 2 Outcomes" },
              4: { id: 4, name: "Advanced Math", items: [6], descriptor: "1 Outcome" },
              5: { id: 5, name: "Advanced Reading", items: [5], descriptor: "1 Group | 2 Outcomes" },
              6: { id: 6, name: "Advanced Outcomes", items: [5,6], descriptor: "2 Outcomes" },
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
            rootId={1}
            expanded={this.state.expanded}
            onCollectionClick={this.handleCollectionClick}
          />
        )
      }

    }

    <Example/>
  ```
**/
@themeable(theme, styles)
export default class TreeBrowser extends Component {
  static propTypes = {
    /**
    * a normalized hash of collections, keyed by id, that contain an
    * :id, :name, :items (an array of item ids), :collections (an array of
    * collection ids), and optional :descriptor text.
    * Each collection must have a unique id.
    */
    collections: PropTypes.object.isRequired,
    /**
    * a hash of items, keyed by id ,that contain an :id, :name,
    * and optional :descriptor text
    */
    items: PropTypes.object.isRequired,
    /**
    * specifies the id of the root level collection, if present.
    * if no root is specified, all collections will be rendered
    * at the top level
    **/
    rootId: PropTypes.number,
    /**
    * an array of expanded collection ids, must be accompanied by an 'onCollectionClick' prop
    */
    expanded: CustomPropTypes.controllable(
      PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
      'onCollectionClick'
    ),
    /**
    * an array of collection ids to expand by default
    */
    defaultExpanded: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    variant: PropTypes.oneOf(['folderTree', 'indent']),
    collectionIcon: PropTypes.func,
    collectionIconExpanded: PropTypes.func,
    itemIcon: PropTypes.func,
    /**
    * whether or not to show the root collection specified in rootId prop or
    * to begin with its immediate subcollections and items instead
    */
    showRootCollection: PropTypes.bool,
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
    defaultExpanded: [],
    onItemClick: function () {},
    onCollectionClick: function () {}
  }

  constructor (props) {
    super(props)

    this.state = {}

    if (this.props.expanded === undefined) {
      this.state.expanded = props.defaultExpanded
    }
  }

  handleCollectionClick = (collection) => {
    const { onCollectionClick } = this.props

    if (this.props.expanded === undefined) {
      this.setState((state, props) => {
        const expanded = [].concat(this.getExpanded(state, props))

        const expandedIndex = this.getExpandedIndex(expanded, collection.id)

        if (collection.expanded && expandedIndex < 0) {
          expanded.push(collection.id)
        } else if (expandedIndex >= 0) {
          expanded.splice(expandedIndex, 1)
        }

        return { expanded }
      })
    }

    onCollectionClick(collection.id, collection) // TODO: this should pass the event as the first arg
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

  get collections () {
    const { collections, rootId, showRootCollection } = this.props

    if (rootId && showRootCollection) {
      return [collections[rootId]]
    } else if (rootId) {
      return collections[rootId].collections
        .map(id => collections[id])
        .filter(collection => collection != null)
    } else {
      return Object.keys(collections)
        .map(id => collections[id])
        .filter(collection => collection != null)
    }
  }

  get expanded () {
    return this.getExpanded(this.state, this.props)
  }

  getExpanded (state, props) {
    return (props.expanded === undefined) ? state.expanded : props.expanded
  }

  getNavigableNodes () {
    return [].slice.call(this._root.querySelectorAll('button'))
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

  getSubCollections (collection) {
    const collections = [].concat(collection.collections || [])

    return collections.map((id) => this.getCollectionProps(this.props.collections[id]))
      .filter(collection => collection != null)
  }

  getItems (collection) {
    if (collection.items) {
      const items = [].concat(collection.items)

      return items.map(id => {
        return { ...this.props.items[id] }
      })
      .filter(item => item != null)
    } else {
      return []
    }
  }

  getCollectionProps (collection) {
    const props = {
      id: collection.id,
      name: collection.name,
      descriptor: collection.descriptor,
      expanded: (this.getExpandedIndex(this.expanded, collection.id) >= 0),
      items: this.getItems(collection),
      collections: this.getSubCollections(collection)
    }

    return props
  }

  getExpandedIndex (expanded, id) {
    return expanded.findIndex((expanded) => (expanded + '' === id + ''))
  }

  renderRoot () {
    return this.collections.map((collection) =>
      <TreeCollection
        key={'collection-' + collection.id}
        {...pickProps(this.props, TreeCollection.propTypes)}
        {...this.getCollectionProps(collection)}
        onCollectionClick={this.handleCollectionClick}
      />
    )
  }

  render () {
    return (
      <div onKeyDown={this.handleKeyDown} ref={(el) => { this._root = el }}>
        {this.renderRoot()}
      </div>
    )
  }
}

export { default as TreeCollection } from './TreeCollection'
