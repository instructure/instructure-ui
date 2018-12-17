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

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import keycode from 'keycode'
import IconFolder from '@instructure/ui-icons/lib/Line/IconFolder'
import IconDocument from '@instructure/ui-icons/lib/Line/IconDocument'

import themeable from '@instructure/ui-themeable'
import { pickProps } from '@instructure/ui-utils/lib/react/passthroughProps'
import CustomPropTypes from '@instructure/ui-utils/lib/react/CustomPropTypes'
import testable from '@instructure/ui-testable'

import TreeCollection from './TreeCollection'

import styles from './styles.css'
import theme from './theme'

/**
---
category: components
---
**/
@testable()
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
    * a hash of items, keyed by id, that contain an :id, :name,
    * optional :descriptor text, and optional :thumbnail url
    */
    items: PropTypes.object.isRequired,
    /**
    * specifies the id of the root level collection, if present.
    * if no root is specified, all collections will be rendered
    * at the top level
    **/
    rootId: PropTypes.number,
    /**
    * an array of expanded collection ids, must be accompanied by an 'onCollectionToggle' prop
    */
    expanded: CustomPropTypes.controllable(
      PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
      'onCollectionToggle'
    ),
    /**
    * an array of collection ids to expand by default
    */
    defaultExpanded: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
    // There are 2 types of tree selection:  single and multi.
    // This is set up to allow for "multi" in the future without having to deprecate the old API.
    selectionType: PropTypes.oneOf(['none', 'single']),
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
    onCollectionToggle: PropTypes.func,
    onItemClick: PropTypes.func,
    /**
    * An optional label to assist visually impaired users
    */
    treeLabel: PropTypes.string
  }

  static defaultProps = {
    size: 'medium',
    variant: 'folderTree',
    showRootCollection: true,
    collectionIcon: IconFolder,
    collectionIconExpanded: IconFolder,
    itemIcon: IconDocument,
    defaultExpanded: [],
    selectionType: 'none',
    onItemClick: function (item) {},
    onCollectionClick: function (id, collection) {},
    onCollectionToggle: function (collection) {}
  }

  constructor (props) {
    super(props)

    this.state = {selection: ''}

    if (typeof this.props.expanded === 'undefined') {
      this.state.expanded = props.defaultExpanded
    }
  }

  handleCollectionClick = (e, collection, expand=true) => {
    e.stopPropagation()
    const { onCollectionClick } = this.props

    if (expand) this.expandOrCollapseNode(collection)
    onCollectionClick(collection.id, collection) // TODO: this should pass the event as the first arg
    this.handleSelection(collection.id, 'collection')
  }

  handleItemClick = (e, item) => {
    e.stopPropagation()
    const { onItemClick } = this.props
    onItemClick(item)
    this.handleSelection(item.id, 'item') // TODO: this should pass the event as the first arg
  }

  handleKeyDown = (event, node) => {
    event.stopPropagation()
    switch (event.keyCode) {
      case keycode.codes.down:
      case keycode.codes.j:
        this.moveFocus(1)
        break
      case keycode.codes.up:
      case keycode.codes.k:
        this.moveFocus(-1)
        break
      case keycode.codes.home:
      case keycode.codes.end:
        this.homeOrEnd(event.keyCode)
        break
      case keycode.codes.left:
      case keycode.codes.right:
        this.handleLeftOrRightArrow(event.keyCode, node)
        break
      case keycode.codes.enter:
      case keycode.codes.space:
        this.handleActivation(event, node)
        break
      default:
        return
    }
    event.preventDefault()
  }

  get collections () {
    const { collections, rootId, showRootCollection } = this.props

    if (typeof rootId !== 'undefined' && showRootCollection) {
      return [collections[rootId]]
    } else if (typeof rootId !== 'undefined') {
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
    return (typeof props.expanded === 'undefined') ? state.expanded : props.expanded
  }

  expandOrCollapseNode (collection) {
    this.props.onCollectionToggle(collection)
    if (typeof this.props.expanded === 'undefined') {
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
  }

  handleSelection (id, type) {
    const { selectionType } = this.props
    selectionType === 'single' && this.setState((state) => {
      const selection = `${type}_${id}`
      if (state.selection !== selection) {
        return { selection }
      } else {
        return state
      }
    })
  }

  getNavigableNodes () {
    return [].slice.call(this._root.querySelectorAll('[role="treeitem"]'))
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
    nodes.forEach((n) => { n.setAttribute('tabindex', '-1') })
    nodes[next].setAttribute('tabindex', '0')
    nodes[next].focus()
  }

  homeOrEnd (keyCode) {
    const length = this.getNavigableNodes().length
    if (keyCode === keycode.codes.home) {
      this.moveFocus(1 - length)
    } else {
      this.moveFocus(length - 1)
    }
  }

  handleLeftOrRightArrow (keyCode, node) {
    const ltr = !(this._root.parentElement.dir === 'rtl' || document.dir === 'rtl')
    if ((ltr && keyCode === keycode.codes.left) || (!ltr && keyCode == keycode.codes.right)) {
      this.handleCloseOrPrevious(node)
    } else {
      this.handleOpenOrNext(node)
    }
  }

  handleOpenOrNext(node) {
    if (node && !this.expanded.includes(node.id) && node.type === 'collection') {
      this.expandOrCollapseNode(node)
    } else {
      this.moveFocus(1)
    }
  }

  handleCloseOrPrevious(node) {
    if (node && this.expanded.includes(node.id) && node.type === 'collection') {
      this.expandOrCollapseNode(node)
    } else {
      this.moveFocus(-1)
    }
  }

  handleActivation (event, node) {
    if (node == null) return
    if (node.type === 'collection') {
      this.handleCollectionClick(event, node, this.props.selectionType === 'none')
    } else {
      this.handleItemClick(event, node)
    }
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
    return expanded.findIndex((expanded) => (String(expanded) === String(id)))
  }

  renderRoot () {
    return this.collections.map((collection, i) => (
      <TreeCollection
        key={i}
        {...pickProps(this.props, TreeCollection.propTypes)}
        {...this.getCollectionProps(collection)}
        selection={this.state.selection}
        onItemClick={this.handleItemClick}
        onCollectionClick={this.handleCollectionClick}
        onKeyDown={this.handleKeyDown}
        numChildren={this.collections.length}
        level={1}
        position={1}
      />
    ))
  }

  render () {
    return (
      <ul
        className={styles.list}
        tabIndex={0} role="tree"
        onKeyDown={this.handleKeyDown}
        ref={(el) => { this._root = el }}
        aria-label={this.props.treeLabel}
      >
        {this.renderRoot()}
      </ul>
    )
  }
}
