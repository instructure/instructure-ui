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

/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { testable } from '@instructure/ui-testable'
import { withStyle, jsx } from '@instructure/emotion'
import { safeCloneElement } from '@instructure/ui-react-utils'
import { Children } from '@instructure/ui-prop-types'

import { TreeButton } from '../TreeButton'
import { TreeNode } from '../TreeNode'

import generateStyles from './styles'
import generateComponentTheme from './theme'

/**
---
parent: TreeBrowser
id: TreeBrowser.Collection
---
**/

@withStyle(generateStyles, generateComponentTheme)
@testable()
class TreeCollection extends Component {
  static propTypes = {
    // eslint-disable-next-line react/require-default-props
    makeStyles: PropTypes.func,
    // eslint-disable-next-line react/require-default-props
    styles: PropTypes.object,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    descriptor: PropTypes.string,
    items: PropTypes.array,
    collections: PropTypes.array,
    expanded: PropTypes.bool,
    selection: PropTypes.string,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    variant: PropTypes.oneOf(['folderTree', 'indent']),
    collectionIcon: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    collectionIconExpanded: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.func
    ]),
    itemIcon: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    getItemProps: PropTypes.func,
    onItemClick: PropTypes.func,
    onCollectionClick: PropTypes.func,
    onKeyDown: PropTypes.func,
    numChildren: PropTypes.number,
    level: PropTypes.number,
    position: PropTypes.number,
    /**
     * children of type TreeNode
     */
    renderBeforeItems: Children.oneOf([TreeNode]),
    /**
     * children of type TreeNode
     */
    renderAfterItems: Children.oneOf([TreeNode]),
    containerRef: PropTypes.func,
    isCollectionFlattened: PropTypes.bool
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
    getItemProps: (props) => props,
    numChildren: undefined,
    level: undefined,
    position: undefined,
    renderBeforeItems: null,
    renderAfterItems: null,
    containerRef: function () {},
    isCollectionFlattened: false
  }

  constructor(props) {
    super(props)

    this.state = { focused: '' }
  }

  componentDidMount() {
    this.props.makeStyles()
  }
  componentDidUpdate() {
    this.props.makeStyles()
  }

  get itemsLevel() {
    const { level, isCollectionFlattened } = this.props
    return isCollectionFlattened ? level : level + 1
  }

  handleFocus = (e, item) => {
    e.stopPropagation()
    this.setState({ focused: `${item.type}_${item.id}` })
  }

  handleBlur = (e, item) => {
    e.stopPropagation()
    this.setState({ focused: '' })
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

  get collectionsCount() {
    const collections = this.props.collections
    return collections && collections.length > 0 ? collections.length : 0
  }

  get itemsCount() {
    const items = this.props.items
    return items && items.length > 0 ? items.length : 0
  }

  get childCount() {
    return (
      this.collectionsCount +
      this.itemsCount +
      (this.props.renderBeforeItems ? 1 : 0) +
      (this.props.renderAfterItems ? 1 : 0)
    )
  }

  renderChildren() {
    const {
      collections,
      items,
      id,
      renderBeforeItems,
      renderAfterItems
    } = this.props

    let position = 1
    return (
      <>
        {renderBeforeItems &&
          this.renderCollectionChildren(
            id,
            renderBeforeItems,
            position++,
            'before'
          )}
        {collections.map((collection) => {
          return this.renderCollectionNode(collection, position++)
        })}
        {items.map((item) => {
          return this.renderItemNode(item, position++)
        })}
        {renderAfterItems &&
          this.renderCollectionChildren(
            id,
            renderAfterItems,
            position++,
            'after'
          )}
      </>
    )
  }

  renderCollectionChildren(collectionId, child, position, keyword) {
    const { selection, onKeyDown, getItemProps, styles } = this.props
    const key = `${collectionId}_${keyword}`
    const ariaSelected = {}
    if (selection) {
      ariaSelected['aria-selected'] = selection === `child_${key}`
    }

    const itemHash = { id: key, type: 'child' }

    const itemProps = getItemProps({
      key: key,
      selected: selection === `child_${key}`,
      focused: this.state.focused === `child_${key}`,
      level: this.itemsLevel
    })

    return (
      <li
        id={key}
        role="treeitem"
        css={styles.item}
        tabIndex="-1"
        key={key}
        aria-posinset={position}
        aria-setsize={this.childCount}
        aria-level={this.itemsLevel}
        {...ariaSelected}
        onClick={(e, n) => {
          if (typeof child.props.onClick === 'function') {
            child.props.onClick(e, n)
          } else {
            e.stopPropagation()
          }
        }}
        onFocus={(e, n) => this.handleFocus(e, itemHash)}
        onKeyDown={(e, n) => {
          if (typeof child.props.onKeyDown === 'function') {
            child.props.onKeyDown(e, n)
          } else {
            onKeyDown(e, itemHash)
          }
        }}
        onBlur={(e, n) => this.handleBlur(e, itemHash)}
      >
        {safeCloneElement(child, itemProps)}
      </li>
    )
  }

  renderCollectionNode(collection, position) {
    return (
      <TreeCollection
        {...this.props}
        key={`c${position}`}
        id={collection.id}
        name={collection.name}
        descriptor={collection.descriptor}
        expanded={collection.expanded}
        items={collection.items}
        collections={collection.collections}
        numChildren={this.childCount}
        level={this.itemsLevel}
        containerRef={collection.containerRef}
        position={position}
        renderBeforeItems={collection.renderBeforeItems}
        renderAfterItems={collection.renderAfterItems}
        isCollectionFlattened={false} // only the root needs to be flattened
      />
    )
  }

  renderItemNode(item, position) {
    const {
      selection,
      onItemClick,
      onKeyDown,
      getItemProps,
      styles
    } = this.props

    const ariaSelected = {}

    if (selection) {
      ariaSelected['aria-selected'] = selection === `item_${item.id}`
    }

    const itemHash = { id: item.id, type: 'item' }

    const itemProps = getItemProps({
      ...this.getCommonButtonProps(),
      id: item.id,
      name: item.name,
      descriptor: item.descriptor,
      thumbnail: item.thumbnail,
      selected: selection === `item_${item.id}`,
      focused: this.state.focused === `item_${item.id}`,
      type: 'item'
    })

    return (
      <li
        key={`i${position}`}
        tabIndex="-1"
        role="treeitem"
        aria-label={item.name}
        css={styles.item}
        aria-level={this.itemsLevel}
        aria-posinset={position}
        aria-setsize={this.childCount}
        onClick={(e, n) => onItemClick(e, itemHash)}
        onKeyDown={(e, n) => onKeyDown(e, itemHash)}
        onFocus={(e, n) => this.handleFocus(e, itemHash)}
        onBlur={(e, n) => this.handleBlur(e, itemHash)}
        {...ariaSelected}
      >
        <TreeButton {...itemProps} />
      </li>
    )
  }

  getCommonButtonProps() {
    return {
      id: this.props.id,
      name: this.props.name,
      descriptor: this.props.descriptor,
      size: this.props.size,
      variant: this.props.variant,
      itemIcon: this.props.itemIcon,
      level: this.itemsLevel
    }
  }

  render() {
    const {
      id,
      name,
      expanded,
      collectionIcon,
      collectionIconExpanded,
      isCollectionFlattened,
      level,
      position,
      styles
    } = this.props

    const ariaSelected = {}
    if (this.props.selection)
      ariaSelected['aria-selected'] =
        this.props.selection === `collection_${id}`

    return isCollectionFlattened ? (
      this.renderChildren()
    ) : (
      <li
        css={styles.treeCollection}
        tabIndex="-1"
        role="treeitem"
        aria-label={this.props.name}
        aria-level={level}
        aria-posinset={position}
        aria-setsize={this.props.numChildren}
        aria-expanded={expanded}
        onClick={this.handleCollectionClick}
        onKeyDown={this.handleCollectionKeyDown}
        onFocus={(e, n) => this.handleFocus(e, { id: id, type: 'collection' })}
        onBlur={(e, n) => this.handleBlur(e, { id: id, type: 'collection' })}
        {...ariaSelected}
      >
        <TreeButton
          {...this.getCommonButtonProps()}
          expanded={expanded}
          collectionIcon={collectionIcon}
          collectionIconExpanded={collectionIconExpanded}
          type="collection"
          containerRef={this.props.containerRef}
          selected={this.props.selection === `collection_${id}`}
          focused={this.state.focused === `collection_${id}`}
          level={level}
        />
        {expanded && this.childCount > 0 && (
          <ul aria-label={name} css={styles.list} role="group">
            {this.renderChildren()}
          </ul>
        )}
      </li>
    )
  }
}

export default TreeCollection
export { TreeCollection }
