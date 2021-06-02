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

type Props = {
  makeStyles?: (...args: any[]) => any
  styles?: any
  id?: string | number
  name?: string
  descriptor?: string
  items?: any[]
  collections?: any[]
  expanded?: boolean
  selection?: string
  size?: 'small' | 'medium' | 'large'
  variant?: 'folderTree' | 'indent'
  collectionIcon?: React.ReactNode | ((...args: any[]) => any)
  collectionIconExpanded?: React.ReactNode | ((...args: any[]) => any)
  itemIcon?: React.ReactNode | ((...args: any[]) => any)
  getItemProps?: (...args: any[]) => any
  getCollectionProps?: (...args: any[]) => any
  onItemClick?: (...args: any[]) => any
  onCollectionClick?: (...args: any[]) => any
  onKeyDown?: (...args: any[]) => any
  numChildren?: number
  level?: number
  position?: number
  renderBeforeItems?: any // TODO: Children.oneOf([TreeNode])
  renderAfterItems?: any // TODO: Children.oneOf([TreeNode])
  containerRef?: (...args: any[]) => any
  isCollectionFlattened?: boolean
  renderContent?: (...args: any[]) => any
}

/**
---
parent: TreeBrowser
id: TreeBrowser.Collection
---
**/

@withStyle(generateStyles, generateComponentTheme, ['size', 'variant'])
@testable()
class TreeCollection extends Component<Props> {
  static componentId = 'TreeBrowser.Collection'

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
    getCollectionProps: PropTypes.func,
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
    isCollectionFlattened: PropTypes.bool,
    renderContent: PropTypes.func
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
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
    getItemProps: (props) => props,
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
    getCollectionProps: (props) => props,
    numChildren: undefined,
    level: undefined,
    position: undefined,
    renderBeforeItems: null,
    renderAfterItems: null,
    containerRef: function () {},
    isCollectionFlattened: false,
    renderContent: undefined
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
  constructor(props) {
    super(props)

    this.state = { focused: '' }
  }

  componentDidMount() {
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.makeStyles()
  }
  componentDidUpdate() {
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.makeStyles()
  }

  get itemsLevel() {
    const { level, isCollectionFlattened } = this.props
    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    return isCollectionFlattened ? level : level + 1
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'e' implicitly has an 'any' type.
  handleFocus = (e, item) => {
    e.stopPropagation()
    this.setState({ focused: `${item.type}_${item.id}` })
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'e' implicitly has an 'any' type.
  handleBlur = (e, item) => {
    e.stopPropagation()
    this.setState({ focused: '' })
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'e' implicitly has an 'any' type.
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

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'e' implicitly has an 'any' type.
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
    const { collections, items, id, renderBeforeItems, renderAfterItems } =
      this.props

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
        {/* @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'. */}
        {collections.map((collection) => {
          return this.renderCollectionNode(collection, position++)
        })}
        {/* @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'. */}
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

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'collectionId' implicitly has an 'any' t... Remove this comment to see the full error message
  renderCollectionChildren(collectionId, child, position, keyword) {
    const { selection, onKeyDown, getItemProps, styles } = this.props
    const key = `${collectionId}_${keyword}`
    const ariaSelected = {}
    if (selection) {
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      ariaSelected['aria-selected'] = selection === `child_${key}`
    }

    const itemHash = { id: key, type: 'child' }

    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    const itemProps = getItemProps({
      key: key,
      selected: selection === `child_${key}`,
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'focused' does not exist on type 'Readonl... Remove this comment to see the full error message
      focused: this.state.focused === `child_${key}`,
      level: this.itemsLevel
    })

    return (
      <li
        id={key}
        role="treeitem"
        css={styles.item}
        // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'number | ... Remove this comment to see the full error message
        tabIndex="-1"
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
        // @ts-expect-error ts-migrate(2322) FIXME: Type '(e: any, n: any) => void' is not assignable ... Remove this comment to see the full error message
        onFocus={(e, n) => this.handleFocus(e, itemHash)}
        // @ts-expect-error ts-migrate(2322) FIXME: Type '(e: any, n: any) => void' is not assignable ... Remove this comment to see the full error message
        onKeyDown={(e, n) => {
          if (typeof child.props.onKeyDown === 'function') {
            child.props.onKeyDown(e, n)
          } else {
            // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
            onKeyDown(e, itemHash)
          }
        }}
        // @ts-expect-error ts-migrate(2322) FIXME: Type '(e: any, n: any) => void' is not assignable ... Remove this comment to see the full error message
        onBlur={(e, n) => this.handleBlur(e, itemHash)}
      >
        {safeCloneElement(child, itemProps)}
      </li>
    )
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'collection' implicitly has an 'any' typ... Remove this comment to see the full error message
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

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'item' implicitly has an 'any' type.
  renderItemNode(item, position) {
    const { selection, onItemClick, onKeyDown, getItemProps, styles } =
      this.props

    const ariaSelected = {}

    if (selection) {
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      ariaSelected['aria-selected'] = selection === `item_${item.id}`
    }

    const itemHash = { id: item.id, type: 'item' }

    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    const itemProps = getItemProps({
      ...this.getCommonButtonProps(),
      id: item.id,
      name: item.name,
      descriptor: item.descriptor,
      thumbnail: item.thumbnail,
      selected: selection === `item_${item.id}`,
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'focused' does not exist on type 'Readonl... Remove this comment to see the full error message
      focused: this.state.focused === `item_${item.id}`,
      type: 'item'
    })

    return (
      <li
        key={`i${position}`}
        // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'number | ... Remove this comment to see the full error message
        tabIndex="-1"
        role="treeitem"
        aria-label={item.name}
        css={styles.item}
        aria-level={this.itemsLevel}
        aria-posinset={position}
        aria-setsize={this.childCount}
        // @ts-expect-error ts-migrate(2322) FIXME: Type '(e: any, n: any) => any' is not assignable t... Remove this comment to see the full error message
        onClick={(e, n) => onItemClick(e, itemHash)}
        // @ts-expect-error ts-migrate(2322) FIXME: Type '(e: any, n: any) => any' is not assignable t... Remove this comment to see the full error message
        onKeyDown={(e, n) => onKeyDown(e, itemHash)}
        // @ts-expect-error ts-migrate(2322) FIXME: Type '(e: any, n: any) => void' is not assignable ... Remove this comment to see the full error message
        onFocus={(e, n) => this.handleFocus(e, itemHash)}
        // @ts-expect-error ts-migrate(2322) FIXME: Type '(e: any, n: any) => void' is not assignable ... Remove this comment to see the full error message
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

    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    const collectionProps = getCollectionProps({
      ...this.getCommonButtonProps(),
      expanded: expanded,
      collectionIcon: collectionIcon,
      collectionIconExpanded: collectionIconExpanded,
      type: 'collection',
      containerRef: this.props.containerRef,
      selected: this.props.selection === `collection_${id}`,
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'focused' does not exist on type 'Readonl... Remove this comment to see the full error message
      focused: this.state.focused === `collection_${id}`,
      level
    })

    const ariaSelected = {}
    if (this.props.selection)
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      ariaSelected['aria-selected'] =
        this.props.selection === `collection_${id}`

    return isCollectionFlattened ? (
      this.renderChildren()
    ) : (
      <li
        css={styles.treeCollection}
        // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'number | ... Remove this comment to see the full error message
        tabIndex="-1"
        role="treeitem"
        aria-label={this.props.name}
        aria-level={level}
        aria-posinset={position}
        aria-setsize={this.props.numChildren}
        aria-expanded={expanded}
        onClick={this.handleCollectionClick}
        onKeyDown={this.handleCollectionKeyDown}
        // @ts-expect-error ts-migrate(2322) FIXME: Type '(e: any, n: any) => void' is not assignable ... Remove this comment to see the full error message
        onFocus={(e, n) => this.handleFocus(e, { id: id, type: 'collection' })}
        // @ts-expect-error ts-migrate(2322) FIXME: Type '(e: any, n: any) => void' is not assignable ... Remove this comment to see the full error message
        onBlur={(e, n) => this.handleBlur(e, { id: id, type: 'collection' })}
        {...ariaSelected}
      >
        <TreeButton {...collectionProps} />
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
