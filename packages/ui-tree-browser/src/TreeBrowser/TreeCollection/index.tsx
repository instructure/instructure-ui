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
/** @jsxFrag React.Fragment */
// eslint-disable-next-line no-unused-vars
import React, { Children, Component, ReactElement, SyntheticEvent } from 'react'

import { testable } from '@instructure/ui-testable'
import { withStyle, jsx } from '@instructure/emotion'
import { safeCloneElement } from '@instructure/ui-react-utils'

import { TreeButton } from '../TreeButton'

import generateStyles from './styles'
import generateComponentTheme from './theme'
import type { TreeBrowserCollectionProps, TreeCollectionState } from './props'
import { allowedProps, propTypes } from './props'
import { CollectionItem, CollectionProps, CollectionData } from '../props'

type AriaSelectedType = { 'aria-selected'?: boolean }

/**
---
parent: TreeBrowser
id: TreeBrowser.Collection
---
@tsProps
**/
@withStyle(generateStyles, generateComponentTheme)
@testable()
class TreeCollection extends Component<
  TreeBrowserCollectionProps,
  TreeCollectionState
> {
  static readonly componentId = 'TreeBrowser.Collection'

  static allowedProps = allowedProps
  static propTypes = propTypes

  static defaultProps = {
    collections: [],
    items: [],
    expanded: false,
    selection: '',
    size: 'medium',
    variant: 'folderTree',
    getItemProps: (props: unknown) => props,
    getCollectionProps: (props: unknown) => props,
    isCollectionFlattened: false
  }

  ref: Element | null = null

  constructor(props: TreeBrowserCollectionProps) {
    super(props)
    this.state = { focused: '' }
  }

  componentDidMount() {
    this.props.makeStyles?.()
  }
  componentDidUpdate() {
    this.props.makeStyles?.()
  }

  get itemsLevel() {
    const { level, isCollectionFlattened } = this.props
    return isCollectionFlattened ? level : level + 1
  }

  handleFocus = (e: SyntheticEvent, item: CollectionData) => {
    e.stopPropagation()
    this.setState({ focused: `${item.type}_${item.id}` })
  }

  handleBlur = (e: SyntheticEvent, _item: CollectionData) => {
    e.stopPropagation()
    this.setState({ focused: '' })
  }

  handleCollectionClick = (e: React.MouseEvent) => {
    const { id, onCollectionClick, expanded } = this.props
    const collection = {
      id,
      expanded: !expanded,
      type: 'collection' as const
    }
    if (onCollectionClick && typeof onCollectionClick === 'function') {
      onCollectionClick(e, collection)
    }
  }

  handleCollectionKeyDown = (e: React.KeyboardEvent) => {
    const { id, onKeyDown, expanded } = this.props
    const collection = {
      id,
      expanded: !expanded,
      type: 'collection' as const
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
  sortingChildren() {
    const { collections, items, compareFunc } = this.props
    if (!compareFunc) return []
    const collections_ = collections
      ? collections.map((collection) => {
          return { ...collection, type: 'collection' }
        })
      : []
    const items_ = items
      ? items.map((item) => {
          return { ...item, type: 'item' }
        })
      : []
    const renderQueue = collections_.concat(items_)
    renderQueue.sort(compareFunc)
    return renderQueue
  }
  renderChildren() {
    const {
      collections,
      items,
      id,
      renderBeforeItems,
      renderAfterItems,
      compareFunc
    } = this.props

    let position = 1
    const sortedChildren = this.sortingChildren()
    return (
      <>
        {renderBeforeItems &&
          this.renderCollectionChildren(
            id,
            renderBeforeItems,
            position++,
            'before'
          )}
        {!compareFunc &&
          collections!.map((collection) => {
            return this.renderCollectionNode(collection, position++)
          })}
        {!compareFunc &&
          items!.map((item) => {
            return this.renderItemNode(item, position++)
          })}
        {compareFunc &&
          sortedChildren.map((child) => {
            if (child.type === 'collection') {
              return this.renderCollectionNode(
                child as CollectionProps,
                position++
              )
            } else {
              return this.renderItemNode(child as CollectionItem, position++)
            }
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

  renderCollectionChildren(
    collectionId: string | number | undefined,
    child: ReactElement,
    position: number,
    keyword: 'before' | 'after'
  ) {
    const { selection, onKeyDown, getItemProps, styles } = this.props
    const key = `${collectionId}_${keyword}`
    const ariaSelected: AriaSelectedType = {}
    if (selection) {
      ariaSelected['aria-selected'] = selection === `child_${key}`
    }

    const itemHash: CollectionData = { id: key, type: 'child' }

    const itemProps = getItemProps!({
      key: key,
      selected: selection === `child_${key}`,
      focused: this.state.focused === `child_${key}`,
      level: this.itemsLevel
    })

    return (
      <li
        id={key}
        role="treeitem"
        css={styles?.item}
        tabIndex={-1}
        key={key}
        aria-posinset={position}
        aria-setsize={this.childCount}
        aria-level={this.itemsLevel}
        {...ariaSelected}
        // @ts-expect-error ts-migrate(2322) FIXME: Type '(e: any, n: any) => void' is not assignable ... Remove this comment to see the full error message
        onClick={(e, n) => {
          if (typeof child.props.onClick === 'function') {
            child.props.onClick(e, n)
          } else {
            e.stopPropagation()
          }
        }}
        onFocus={(e) => this.handleFocus(e, itemHash)}
        // @ts-expect-error ts-migrate(2322) FIXME: Type '(e: any, n: any) => void' is not assignable ... Remove this comment to see the full error message
        onKeyDown={(e, n) => {
          if (typeof child.props.onKeyDown === 'function') {
            child.props.onKeyDown(e, n)
          } else {
            onKeyDown?.(e, itemHash)
          }
        }}
        onBlur={(e) => this.handleBlur(e, itemHash)}
      >
        {safeCloneElement(child, itemProps)}
      </li>
    )
  }

  renderCollectionNode(collection: CollectionProps, position: number) {
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
        compareFunc={collection.compareFunc}
      />
    )
  }

  renderItemNode(item: CollectionItem, position: number) {
    const { selection, onItemClick, onKeyDown, getItemProps, styles } =
      this.props

    const ariaSelected: AriaSelectedType = {}

    if (selection) {
      ariaSelected['aria-selected'] = selection === `item_${item.id}`
    }

    const itemHash: CollectionData = { id: item.id, type: 'item' }

    const itemProps = getItemProps!({
      ...this.getCommonButtonProps(),
      id: item.id,
      name: item.name,
      descriptor: item.descriptor,
      thumbnail: item.thumbnail,
      selected: selection === `item_${item.id}`,
      focused: this.state.focused === `item_${item.id}`,
      type: 'item' as const
    })

    return (
      <li
        key={`i${position}`}
        tabIndex={-1}
        role="treeitem"
        aria-label={item.name}
        css={styles?.item}
        aria-level={this.itemsLevel}
        aria-posinset={position}
        aria-setsize={this.childCount}
        onClick={(e) => onItemClick?.(e, itemHash)}
        onKeyDown={(e) => onKeyDown?.(e, itemHash)}
        onFocus={(e) => this.handleFocus(e, itemHash)}
        onBlur={(e) => this.handleBlur(e, itemHash)}
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
      level: this.itemsLevel,
      renderContent: this.props.renderContent
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
      getCollectionProps,
      level,
      position,
      styles
    } = this.props

    const collectionProps = getCollectionProps!({
      ...this.getCommonButtonProps(),
      expanded: expanded,
      collectionIcon: collectionIcon,
      collectionIconExpanded: collectionIconExpanded,
      type: 'collection' as const,
      containerRef: this.props.containerRef,
      selected: this.props.selection === `collection_${id}`,
      focused: this.state.focused === `collection_${id}`,
      level
    })

    const ariaSelected: AriaSelectedType = {}
    if (this.props.selection)
      ariaSelected['aria-selected'] =
        this.props.selection === `collection_${id}`

    return isCollectionFlattened ? (
      this.renderChildren()
    ) : (
      <li
        ref={(el) => {
          this.ref = el
        }}
        css={styles?.treeCollection}
        tabIndex={-1}
        role="treeitem"
        aria-label={this.props.name}
        aria-level={level}
        aria-posinset={position}
        aria-setsize={this.props.numChildren}
        aria-expanded={expanded}
        onClick={this.handleCollectionClick}
        onKeyDown={this.handleCollectionKeyDown}
        onFocus={(e) => this.handleFocus(e, { id: id, type: 'collection' })}
        onBlur={(e) => this.handleBlur(e, { id: id, type: 'collection' })}
        {...ariaSelected}
      >
        <TreeButton {...collectionProps} />
        {expanded && this.childCount > 0 && (
          <ul aria-label={name} css={styles?.list} role="group">
            {this.renderChildren()}
          </ul>
        )}
      </li>
    )
  }
}

export default TreeCollection
export { TreeCollection }
