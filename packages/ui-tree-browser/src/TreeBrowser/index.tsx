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

import { Component } from 'react'
import keycode from 'keycode'

import { IconFolderLine, IconDocumentLine } from '@instructure/ui-icons'

import { pickProps, omitProps } from '@instructure/ui-react-utils'
import { testable } from '@instructure/ui-testable'
import { withStyle, jsx } from '@instructure/emotion'

import { TreeCollection } from './TreeCollection'
import { TreeButton } from './TreeButton'
import { TreeNode } from './TreeNode'

import generateStyles from './styles'
import generateComponentTheme from './theme'
import type { TreeBrowserProps } from './props'
import { allowedProps, propTypes } from './props'

/**
---
category: components
---
**/
@withStyle(generateStyles, generateComponentTheme)
@testable()
class TreeBrowser extends Component<TreeBrowserProps> {
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
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
    getItemProps: (props) => props,
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
    getCollectionProps: (props) => props,
    defaultExpanded: [],
    selectionType: 'none',
    // @ts-expect-error ts-migrate(6133) FIXME: 'item' is declared but its value is never read.
    onItemClick: function (item) {},
    // @ts-expect-error ts-migrate(6133) FIXME: 'id' is declared but its value is never read.
    onCollectionClick: function (id, collection) {},
    // @ts-expect-error ts-migrate(6133) FIXME: 'collection' is declared but its value is never re... Remove this comment to see the full error message
    onCollectionToggle: function (collection) {},
    // @ts-expect-error ts-migrate(6133) FIXME: 'foo' and 'bar' are declared but their values are never read.
    sortOrder: function (foo: any, bar: any) {
      return 0
    }
  }

  static Node = TreeNode
  static Collection = TreeCollection
  static Button = TreeButton
  ref: Element | null = null

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
  constructor(props) {
    super(props)

    this.state = { selection: '' }

    if (typeof this.props.expanded === 'undefined') {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'expanded' does not exist on type 'Readon... Remove this comment to see the full error message
      this.state.expanded = props.defaultExpanded
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

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'e' implicitly has an 'any' type.
  handleCollectionClick = (e, collection, expand = true) => {
    e.stopPropagation()
    const { onCollectionClick } = this.props

    if (expand) this.expandOrCollapseNode(collection)
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    onCollectionClick(collection.id, collection) // TODO: this should pass the event as the first arg
    this.handleSelection(collection.id, 'collection')
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'e' implicitly has an 'any' type.
  handleItemClick = (e, item) => {
    e.stopPropagation()
    const { onItemClick } = this.props
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    onItemClick(item)
    this.handleSelection(item.id, 'item') // TODO: this should pass the event as the first arg
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
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

  get sortOrder() {
    return this.props.sortOrder
  }
  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'state' implicitly has an 'any' type.
  getExpanded(state, props) {
    return typeof props.expanded === 'undefined'
      ? state.expanded
      : props.expanded
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'collection' implicitly has an 'any' typ... Remove this comment to see the full error message
  expandOrCollapseNode(collection) {
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.onCollectionToggle(collection)
    if (typeof this.props.expanded === 'undefined') {
      this.setState((state, props) => {
        const expanded = [].concat(this.getExpanded(state, props))

        const expandedIndex = this.getExpandedIndex(expanded, collection.id)

        if (collection.expanded && expandedIndex < 0) {
          // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'any' is not assignable to parame... Remove this comment to see the full error message
          expanded.push(collection.id)
        } else if (expandedIndex >= 0) {
          expanded.splice(expandedIndex, 1)
        }

        return { expanded }
      })
    }
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'id' implicitly has an 'any' type.
  handleSelection(id, type) {
    const { selectionType } = this.props
    selectionType === 'single' &&
      this.setState((state) => {
        const selection = `${type}_${id}`
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'selection' does not exist on type 'Reado... Remove this comment to see the full error message
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

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'delta' implicitly has an 'any' type.
  moveFocus(delta) {
    const nodes = this.getNavigableNodes()
    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
    const closest = window.document.activeElement.closest('[role="treeitem"]')
    const active = nodes.indexOf(closest!)
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
    // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
    nodes[next].focus()
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'keyCode' implicitly has an 'any' type.
  homeOrEnd(keyCode) {
    const length = this.getNavigableNodes().length
    if (keyCode === keycode.codes.home) {
      this.moveFocus(1 - length)
    } else {
      this.moveFocus(length - 1)
    }
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'keyCode' implicitly has an 'any' type.
  handleLeftOrRightArrow(keyCode, node) {
    const ltr = !(
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'ref' is possibly null
      (this.ref.parentElement.dir === 'rtl' || document.dir === 'rtl')
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

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'node' implicitly has an 'any' type.
  handleOpenOrNext(node) {
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

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'node' implicitly has an 'any' type.
  handleCloseOrPrevious(node) {
    if (node && this.expanded.includes(node.id) && node.type === 'collection') {
      this.expandOrCollapseNode(node)
    } else {
      this.moveFocus(-1)
    }
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
  handleActivation(event, node) {
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

  // @ts-expect-error ts-migrate(7023) FIXME: 'getSubCollections' implicitly has return type 'an... Remove this comment to see the full error message
  getSubCollections(collection) {
    const collections = [].concat(collection.collections || [])

    return collections
      .map((id) => this.getCollectionProps(this.props.collections[id]))
      .filter((collection) => collection != null)
      .sort(this.sortOrder)
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'collection' implicitly has an 'any' typ... Remove this comment to see the full error message
  getItems(collection) {
    if (collection.items) {
      const items = [].concat(collection.items)

      return items
        .map((id) => {
          return { ...this.props.items[id] }
        })
        .filter((item) => item != null)
        .sort(this.sortOrder)
    } else {
      return []
    }
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'collection' implicitly has an 'any' typ... Remove this comment to see the full error message
  getIsFlattened = (collection) => {
    const { rootId, showRootCollection } = this.props
    return (
      !showRootCollection &&
      typeof rootId !== 'undefined' &&
      collection.id === rootId
    )
  }

  // @ts-expect-error ts-migrate(7023) FIXME: 'getCollectionProps' implicitly has return type 'a... Remove this comment to see the full error message
  getCollectionProps(collection) {
    return {
      id: collection.id,
      name: collection.name,
      descriptor: collection.descriptor,
      expanded: this.getExpandedIndex(this.expanded, collection.id) >= 0,
      items: this.getItems(collection),
      collections: this.getSubCollections(collection),
      renderBeforeItems: collection.renderBeforeItems,
      renderAfterItems: collection.renderAfterItems,
      containerRef: collection.containerRef,
      isCollectionFlattened: this.getIsFlattened(collection)
    }
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'expanded' implicitly has an 'any' type.
  getExpandedIndex(expanded, id) {
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'expanded' implicitly has an 'any' type.
    return expanded.findIndex((expanded) => String(expanded) === String(id))
  }

  renderRoot() {
    return this.collections.sort(this.sortOrder).map((collection, i) => (
      <TreeCollection
        key={i}
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
        {...pickProps(omitProps(this.props), TreeCollection.allowedProps)}
        {...this.getCollectionProps(collection)}
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'selection' does not exist on type 'Reado... Remove this comment to see the full error message
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
      <ul
        css={styles?.treeBrowser}
        tabIndex={0}
        role="tree"
        // @ts-expect-error ts-migrate(2322) FIXME: Type '(event: any, node: any) => void' is not assi... Remove this comment to see the full error message
        onKeyDown={this.handleKeyDown}
        ref={(el) => {
          this.ref = el
        }}
        aria-label={this.props.treeLabel}
      >
        {this.renderRoot()}
      </ul>
    )
  }
}

export default TreeBrowser
export { TreeBrowser }
