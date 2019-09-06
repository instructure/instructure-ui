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
import classnames from 'classnames'

import { themeable } from '@instructure/ui-themeable'
import { testable } from '@instructure/ui-testable'

// remove when Edge sorts out styles-on-pseudo-elements issues:
// https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/11495448/
import { isEdge } from '@instructure/ui-utils'

import { TreeButton } from '../TreeButton'

import styles from './styles.css'
import theme from './theme'

/**
---
parent: TreeBrowser
---
**/

@testable()
@themeable(theme, styles)
class TreeCollection extends Component {
  static propTypes = {
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    name: PropTypes.string,
    descriptor: PropTypes.string,
    items: PropTypes.array,
    collections: PropTypes.array,
    expanded: PropTypes.bool,
    selection: PropTypes.string,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    variant: PropTypes.oneOf(['folderTree', 'indent']),
    collectionIcon: PropTypes.func,
    collectionIconExpanded: PropTypes.func,
    itemIcon: PropTypes.func,
    onItemClick: PropTypes.func,
    onCollectionClick: PropTypes.func,
    onKeyDown: PropTypes.func,
    numChildren: PropTypes.number,
    level: PropTypes.number,
    position: PropTypes.number
  }

  static defaultProps = {
    collections: [],
    items: [],
    expanded: false,
    selection: '',
    size: 'medium',
    variant: 'folderTree',
    onItemClick: function () {},
    onCollectionClick: function () {},
    onKeyDown: function () {},
    id: undefined,
    name: undefined,
    descriptor: undefined,
    collectionIconExpanded: undefined,
    collectionIcon: undefined,
    itemIcon: undefined,
    numChildren: undefined,
    level: undefined,
    position: undefined
  }

  constructor (props) {
    super(props)

    this.state = {focused: ''}
  }

  handleFocus = (e, item) => {
    e.stopPropagation()
    this.setState({focused: `${item.type}_${item.id}`})
  }

  handleBlur = (e, item) => {
    e.stopPropagation()
    this.setState({focused: ''})
  }

  handleCollectionClick = (e) => {
    const { id, onCollectionClick, expanded } = this.props
    const collection = {
      id,
      expanded: !expanded,
      type: 'collection'
    }

    if (onCollectionClick && typeof onCollectionClick === 'function') {
      onCollectionClick(e, collection)
    }
  }

  handleCollectionKeyDown = (e) => {
    const { id, onKeyDown, expanded } = this.props
    const collection = {
      id,
      expanded: !expanded,
      type: 'collection'
    }

    if (onKeyDown && typeof onKeyDown === 'function') {
      onKeyDown(e, collection)
    }
  }

  get collectionsCount () {
    const collections = this.props.collections
    return (collections && collections.length > 0) ? collections.length : 0
  }

  get itemsCount () {
    const items = this.props.items
    return (items && items.length > 0) ? items.length : 0
  }

  get childCount () {
    return this.collectionsCount + this.itemsCount
  }

  renderChildren () {
    const { expanded, collections, items, name } = this.props

    return expanded && (this.childCount > 0) &&
      <ul aria-label={name} className={styles.list} role="group">
        {collections.map((collection, i) => {
          return this.renderCollectionNode(collection, i, this.childCount)
        })}
        {items.map((item, i) => {
          return this.renderItemNode(item, i, this.childCount, this.collectionsCount)
        })}
      </ul>
  }

  renderCollectionNode (collection, i, childCount) {
    return (
      <TreeCollection
        {...this.props}
        key={`c${i}`}
        id={collection.id}
        name={collection.name}
        descriptor={collection.descriptor}
        expanded={collection.expanded}
        items={collection.items}
        collections={collection.collections}
        numChildren={childCount}
        level={this.props.level + 1}
        position={i + 1}
      />
    )
  }

  renderItemNode (item, i, numChildren, numCollections) {
    const ariaSelected = {}
    if (this.props.selection) ariaSelected['aria-selected'] = (this.props.selection === `item_${item.id}`)
    const itemHash = {id: item.id, type: 'item'}
    return (
      <li
        key={`i${i}`}
        tabIndex="-1"
        role="treeitem"
        aria-label={item.name}
        className={styles.item}
        aria-level={this.props.level + 1}
        aria-posinset={(i + 1) + numCollections}
        aria-setsize={numChildren}
        onClick={(e, n) => this.props.onItemClick(e, itemHash)}
        onKeyDown={(e, n) => this.props.onKeyDown(e, itemHash)}
        onFocus={(e, n) => this.handleFocus(e, itemHash)}
        onBlur={(e, n) => this.handleBlur(e, itemHash)}
        {...ariaSelected}
      >
        <TreeButton
          {...this.getCommonButtonProps()}
          id={item.id}
          name={item.name}
          descriptor={item.descriptor}
          thumbnail={item.thumbnail}
          selected={this.props.selection === `item_${item.id}`}
          focused={this.state.focused === `item_${item.id}`}
          type="item"
        />
      </li>
    )
  }

  getCommonButtonProps () {
    return {
      id: this.props.id,
      name: this.props.name,
      descriptor: this.props.descriptor,
      size: this.props.size,
      variant: this.props.variant,
      itemIcon: this.props.itemIcon
    }
  }

  render () {
    const {
      id,
      size,
      variant,
      expanded,
      collectionIcon,
      collectionIconExpanded,
      level,
      position
    } = this.props

    const classes = {
      [styles.root]: true,
      [styles.edge]: isEdge,
      [styles[size]]: true,
      [styles[variant]]: true,
      [styles.expanded]: expanded,
      [styles.node]: true
    }
    const ariaSelected = {}
    if (this.props.selection) ariaSelected['aria-selected'] = (this.props.selection === `collection_${id}`)

    return (
      <li
        className={classnames(classes)}
        tabIndex="-1"
        role="treeitem"
        aria-label={this.props.name}
        aria-level={level}
        aria-posinset={position}
        aria-setsize={this.props.numChildren}
        aria-expanded={expanded}
        onClick={this.handleCollectionClick}
        onKeyDown={this.handleCollectionKeyDown}
        onFocus={(e, n) => this.handleFocus(e, {id: id, type: 'collection'})}
        onBlur={(e, n) => this.handleBlur(e, {id: id, type: 'collection'})}
        {...ariaSelected}
      >
        <TreeButton
          {...this.getCommonButtonProps()}
          expanded={expanded}
          collectionIcon={collectionIcon}
          collectionIconExpanded={collectionIconExpanded}
          type="collection"
          selected={this.props.selection === `collection_${id}`}
          focused={this.state.focused === `collection_${id}`}
        />
        {this.renderChildren()}
      </li>
    )
  }
}

export default TreeCollection
export { TreeCollection }
