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

import { Component, SyntheticEvent } from 'react'
import keycode from 'keycode'

import { IconFolderLine, IconDocumentLine } from '@instructure/ui-icons'

import { omitProps, pickProps } from '@instructure/ui-react-utils'
import { testable } from '@instructure/ui-testable'
import { withStyle } from '@instructure/emotion'

import { TreeCollection } from './TreeCollection'
import { TreeButton } from './TreeButton'
import { TreeNode } from './TreeNode'

import generateStyles from './styles'
import generateComponentTheme from './theme'
import type {
  Collection,
  CollectionData,
  CollectionProps,
  TreeBrowserProps,
  TreeBrowserState
} from './props'
import { allowedProps, propTypes } from './props'
import TreeBrowserContext from './TreeBrowserContext'

/**
---
category: components
---
**/
@withStyle(generateStyles, generateComponentTheme)
@testable()
class TreeBrowser extends Component<TreeBrowserProps, TreeBrowserState> {
  static readonly componentId = 'TreeBrowser'

  static allowedProps = allowedProps
  static propTypes = propTypes

  static defaultProps = {
    size: 'medium',
    variant: 'folderTree',
    showRootCollection: true,
    collectionIcon: IconFolderLine,
    collectionIconExpanded: IconFolderLine,
    itemIcon: IconDocumentLine,
    getItemProps: (props: unknown) => props,
    getCollectionProps: (props: unknown) => props,
    defaultExpanded: [],
    selectionType: 'none',
    sortOrder: function () {
      return 0
    },
    animation: true
  }

  static Node = TreeNode
  static Collection = TreeCollection
  static Button = TreeButton

  ref: Element | null = null

  constructor(props: TreeBrowserProps) {
    super(props)
    if (typeof this.props.expanded === 'undefined') {
      this.state = { expanded: this.props.defaultExpanded, selection: '' }
    } else {
      this.state = { selection: '' }
    }
  }

  componentDidMount() {
    this.props.makeStyles?.()
  }

  componentDidUpdate() {
    this.props.makeStyles?.()
  }

  get _root() {
    console.warn(
      '_root property is deprecated and will be removed in v9, please use ref instead'
    )
    return this.ref
  }

  handleCollectionClick = (
    e: SyntheticEvent,
    collection: CollectionData,
    expand = true
  ) => {
    e.stopPropagation()
    const { onCollectionClick } = this.props

    if (expand) this.expandOrCollapseNode(collection)
    onCollectionClick?.(collection.id as any, collection) // TODO: this should pass the event as the first arg
    this.handleSelection(collection.id, 'collection')
  }

  handleItemClick = (e: SyntheticEvent, item: CollectionData) => {
    e.stopPropagation()
    this.props.onItemClick?.(item)
    this.handleSelection(item.id, 'item')
  }

  handleKeyDown = (event: React.KeyboardEvent, node?: CollectionData) => {
    switch (event.keyCode) {
      case keycode.codes.down:
      case keycode.codes.j:
        event.stopPropagation()
        this.moveFocus(1)
        break
      case keycode.codes.up:
      case keycode.codes.k:
        event.stopPropagation()
        this.moveFocus(-1)
        break
      case keycode.codes.home:
      case keycode.codes.end:
        event.stopPropagation()
        this.homeOrEnd(event.keyCode)
        break
      case keycode.codes.left:
      case keycode.codes.right:
        event.stopPropagation()
        this.handleLeftOrRightArrow(event.keyCode, node)
        break
      case keycode.codes.enter:
      case keycode.codes.space:
        event.stopPropagation()
        this.handleActivation(event, node)
        break
      default:
        return
    }
    event.preventDefault()
  }

  get collections() {
    const { collections, rootId } = this.props
    if (typeof rootId !== 'undefined') {
      return [collections[rootId]]
    } else {
      return Object.keys(collections)
        .map((id) => collections[id])
        .filter((collection) => collection != null)
    }
  }

  get expanded() {
    return this.getExpanded(this.state, this.props)
  }

  getExpanded(state: TreeBrowserState, props: TreeBrowserProps) {
    return typeof props.expanded === 'undefined'
      ? state.expanded!
      : props.expanded
  }

  expandOrCollapseNode(collection: CollectionData) {
    this.props.onCollectionToggle?.(collection)
    if (typeof this.props.expanded === 'undefined') {
      this.setState((state, props) => {
        const expanded = [...this.getExpanded(state, props)]
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

  handleSelection(id: string | number | undefined, type: string) {
    const { selectionType } = this.props
    selectionType === 'single' &&
      this.setState((state) => {
        const selection = `${type}_${id}`
        if (state.selection !== selection) {
          return { selection }
        } else {
          return state
        }
      })
  }

  getNavigableNodes() {
    return Array.from(this.ref!.querySelectorAll('[role="treeitem"]'))
  }

  moveFocus(delta: number) {
    const nodes = this.getNavigableNodes()
    const closest = window.document.activeElement!.closest('[role="treeitem"]')!
    const active = nodes.indexOf(closest)
    let next = active + delta
    if (next < 0) {
      next = 0
    } else if (next >= nodes.length) {
      next = nodes.length - 1
    }
    nodes.forEach((n) => {
      n.setAttribute('tabindex', '-1')
    })
    nodes[next].setAttribute('tabindex', '0')
    ;(nodes[next] as any).focus()
  }

  homeOrEnd(keyCode: number) {
    const length = this.getNavigableNodes().length
    if (keyCode === keycode.codes.home) {
      this.moveFocus(1 - length)
    } else {
      this.moveFocus(length - 1)
    }
  }

  handleLeftOrRightArrow(keyCode: number, node?: CollectionData) {
    const ltr = !(
      this.ref!.parentElement!.dir === 'rtl' || document.dir === 'rtl'
    )
    if (
      (ltr && keyCode === keycode.codes.left) ||
      (!ltr && keyCode == keycode.codes.right)
    ) {
      this.handleCloseOrPrevious(node)
    } else {
      this.handleOpenOrNext(node)
    }
  }

  handleOpenOrNext(node?: CollectionData) {
    if (
      node &&
      !this.expanded.includes(node.id) &&
      node.type === 'collection'
    ) {
      this.expandOrCollapseNode(node)
    } else {
      this.moveFocus(1)
    }
  }

  handleCloseOrPrevious(node?: CollectionData) {
    if (node && this.expanded.includes(node.id) && node.type === 'collection') {
      this.expandOrCollapseNode(node)
    } else {
      this.moveFocus(-1)
    }
  }

  handleActivation(event: React.KeyboardEvent, node?: CollectionData) {
    if (node == null) return
    if (node.type === 'collection') {
      this.handleCollectionClick(
        event,
        node,
        this.props.selectionType === 'none'
      )
    } else {
      this.handleItemClick(event, node)
    }
  }

  getSubCollections(collection: Collection) {
    const collections = collection.collections
      ? [...collection.collections]
      : []
    return collections
      .map((id) => this.getCollectionProps(this.props.collections[id]))
      .filter((collection) => collection != null)
      .sort(this.props.sortOrder)
  }

  getItems(collection: Collection) {
    if (collection.items) {
      const items = collection.items ? [...collection.items] : []
      return items
        .map((id) => {
          return { ...this.props.items[id] }
        })
        .filter((item) => item != null)
        .sort(this.props.sortOrder)
    } else {
      return []
    }
  }

  getIsFlattened = (collection: Collection) => {
    const { rootId, showRootCollection } = this.props
    return (
      !showRootCollection &&
      typeof rootId !== 'undefined' &&
      collection.id === rootId
    )
  }

  getCollectionProps(collection: Collection): CollectionProps {
    return {
      id: collection.id,
      name: collection.name,
      collections: this.getSubCollections(collection),
      items: this.getItems(collection),
      descriptor: collection.descriptor,
      containerRef: collection.containerRef,
      renderBeforeItems: collection.renderBeforeItems,
      renderAfterItems: collection.renderAfterItems,
      expanded: this.getExpandedIndex(this.expanded, collection.id) >= 0,
      isCollectionFlattened: this.getIsFlattened(collection),
      compareFunc: collection.compareFunc
    }
  }

  getExpandedIndex(
    expanded: (string | number | undefined)[],
    id?: string | number
  ) {
    return expanded.findIndex((expanded) => String(expanded) === String(id))
  }

  renderRoot() {
    return this.collections
      .sort(this.props.sortOrder)
      .map((collection, i) => (
        <TreeCollection
          key={i}
          {...pickProps(omitProps(this.props), TreeCollection.allowedProps)}
          {...this.getCollectionProps(collection)}
          selection={this.state.selection}
          onItemClick={this.handleItemClick}
          onCollectionClick={this.handleCollectionClick}
          onKeyDown={this.handleKeyDown}
          numChildren={this.collections.length}
          level={1}
          position={1}
          renderContent={this.props.renderContent}
        />
      ))
  }

  render() {
    const { styles } = this.props

    return (
      <TreeBrowserContext.Provider
        value={{
          animation: this.props.animation
        }}
      >
        <ul
          css={styles?.treeBrowser}
          tabIndex={0}
          role="tree"
          onKeyDown={this.handleKeyDown}
          ref={(el) => {
            this.ref = el
          }}
          aria-label={this.props.treeLabel}
        >
          {this.renderRoot()}
        </ul>
      </TreeBrowserContext.Provider>
    )
  }
}

export default TreeBrowser
export { TreeBrowser }
