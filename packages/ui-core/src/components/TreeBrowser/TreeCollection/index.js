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
import themeable from '@instructure/ui-themeable'
import Browser from '@instructure/ui-utils/lib/Browser'

import TreeButton from '../TreeButton'

import styles from './styles.css'
import theme from './theme'

/**
---
parent: TreeBrowser
---
**/
@themeable(theme, styles)
export default class TreeCollection extends Component {
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
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    variant: PropTypes.oneOf(['folderTree', 'indent']),
    collectionIcon: PropTypes.func,
    collectionIconExpanded: PropTypes.func,
    itemIcon: PropTypes.func,
    onItemClick: PropTypes.func,
    onCollectionClick: PropTypes.func
  }

  static defaultProps = {
    collections: [],
    items: [],
    expanded: false,
    size: 'medium',
    variant: 'folderTree',
    onItemClick: function () {},
    onCollectionClick: function () {}
  }

  handleCollectionClick = (e) => {
    const { id, onCollectionClick, expanded } = this.props
    const collection = {
      id,
      expanded: !expanded
    }

    if (onCollectionClick && typeof onCollectionClick === 'function') {
      onCollectionClick(collection) // TODO: this should pass the event as the first arg
    }
  }

  get hasChildren () {
    const {
      collections,
      items
    } = this.props

    const hasItems = items && items.length > 0
    const hasCollections = collections && collections.length > 0

    return (hasCollections || hasItems)
  }

  renderChildren () {
    const { expanded, collections, items, name } = this.props
    return expanded && this.hasChildren &&
      <ul aria-label={name} className={styles.list} >
        {collections.map((collection, i) => {
          return this.renderCollectionNode(collection, i)
        })}
        {items.map((item, i) => {
          return this.renderItemNode(item, i)
        })}
      </ul>
  }

  renderCollectionNode (collection, i) {
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
      />
    )
  }

  renderItemNode (item, i) {
    return (
      <li
        key={`i${i}`}
        className={styles.item}
      >
        <TreeButton
          {...this.getCommonButtonProps()}
          id={item.id}
          name={item.name}
          descriptor={item.descriptor}
          type="item"
          onClick={this.props.onItemClick}
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
      size,
      variant,
      expanded,
      collectionIcon,
      collectionIconExpanded
    } = this.props

    // remove when Edge sorts out styles-on-pseudo-elements issues:
    // https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/11495448/
    const edge15Up = Browser.msedge && Browser.version >= 15

    const classes = {
      [styles.root]: true,
      [styles.edge]: edge15Up,
      [styles[size]]: true,
      [styles[variant]]: true,
      [styles.expanded]: expanded,
      [styles.node]: true
    }

    return (
      <li className={classnames(classes)}>
        <TreeButton
          {...this.getCommonButtonProps()}
          expanded={expanded}
          collectionIcon={collectionIcon}
          collectionIconExpanded={collectionIconExpanded}
          type="collection"
          onClick={this.handleCollectionClick}
        />
        {this.renderChildren()}
      </li>
    )
  }
}
