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
import IconFolder from '@instructure/ui-icons/lib/Solid/IconFolder'
import IconDocument from '@instructure/ui-icons/lib/Solid/IconDocument'

import themeable from '@instructure/ui-themeable'
import { pickProps } from '@instructure/ui-utils/lib/react/passthroughProps'
import CustomPropTypes from '@instructure/ui-utils/lib/react/CustomPropTypes'

import TreeCollection from './TreeCollection'

import styles from './styles.css'
import theme from './theme'

/**
---
category: components
---
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
    onItemClick: function () {},
    onCollectionClick: function () {}
  }

  constructor (props) {
    super(props)

    this.state = {}

    if (typeof this.props.expanded === 'undefined') {
      this.state.expanded = props.defaultExpanded
    }
  }

  handleCollectionClick = (collection) => {
    const { onCollectionClick } = this.props

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
    nodes.forEach((n) => { n.setAttribute('tabindex', '-1') })
    nodes[next].setAttribute('tabindex', '0')
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
    return expanded.findIndex((expanded) => (String(expanded) === String(id)))
  }

  renderRoot () {
    return this.collections.map((collection, i) => (
      <TreeCollection
        key={i}
        {...pickProps(this.props, TreeCollection.propTypes)}
        {...this.getCollectionProps(collection)}
        onCollectionClick={this.handleCollectionClick}
        numChildren={1}
        level={1}
        position={1}
      />
    ))
  }

  render () {
    /* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/no-noninteractive-tabindex */
    return (
      <div
        onKeyDown={this.handleKeyDown}
        ref={(el) => { this._root = el }}
        aria-label={this.props.treeLabel}
      >
        <ul className={styles.list} tabIndex={0} role="tree">
          {this.renderRoot()}
        </ul>
      </div>
    )
    /* eslint-enable jsx-a11y/no-static-element-interactions, jsx-a11y/no-noninteractive-tabindex */
  }
}
