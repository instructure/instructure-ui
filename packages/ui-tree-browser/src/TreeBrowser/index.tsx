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
import PropTypes from 'prop-types'
import keycode from 'keycode'

import { IconFolderLine, IconDocumentLine } from '@instructure/ui-icons'

import { pickProps, omitProps } from '@instructure/ui-react-utils'
import { controllable } from '@instructure/ui-prop-types'
import { testable } from '@instructure/ui-testable'
import { withStyle, jsx } from '@instructure/emotion'

import { TreeCollection } from './TreeCollection'
import { TreeButton } from './TreeButton'
import { TreeNode } from './TreeNode'

import generateStyles from './styles'
import generateComponentTheme from './theme'

type Props = {
  makeStyles?: (...args: any[]) => any
  styles?: any
  collections: any
  items: any
  rootId?: string | number
  expanded?: any // TODO: controllable( PropTypes.arrayOf( PropTypes.oneOfType([PropTypes.string, PropTypes.number]) ), 'onCollectionToggle' )
  defaultExpanded?: (string | number)[]
  selectionType?: 'none' | 'single'
  size?: 'small' | 'medium' | 'large'
  variant?: 'folderTree' | 'indent'
  collectionIcon?: React.ReactNode | ((...args: any[]) => any)
  collectionIconExpanded?: React.ReactNode | ((...args: any[]) => any)
  itemIcon?: React.ReactNode | ((...args: any[]) => any)
  getItemProps?: (...args: any[]) => any
  getCollectionProps?: (...args: any[]) => any
  showRootCollection?: boolean
  onCollectionClick?: (...args: any[]) => any
  onCollectionToggle?: (...args: any[]) => any
  onItemClick?: (...args: any[]) => any
  treeLabel?: string
  renderContent?: (...args: any[]) => any
}

/**
---
category: components
---
**/
@withStyle(generateStyles, generateComponentTheme)
@testable()
class TreeBrowser extends Component<Props> {
  static componentId = 'TreeBrowser'

  static propTypes = {
    // eslint-disable-next-line react/require-default-props
    makeStyles: PropTypes.func,
    // eslint-disable-next-line react/require-default-props
    styles: PropTypes.object,
    /**
     * a normalized hash of collections, keyed by id, that contain an
     * :id, :name, :items (an array of item ids), :collections (an array of
     * collection ids), optional :descriptor text, optional :containerRef function,
     * an optional :renderBeforeItems TreeNode, and an optional :renderAfterItems TreeNode.
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
    rootId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /**
     * an array of expanded collection ids, must be accompanied by an 'onCollectionToggle' prop
     */
    expanded: controllable(
      PropTypes.arrayOf(
        PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      ),
      'onCollectionToggle'
    ),
    /**
     * an array of collection ids to expand by default
     */
    defaultExpanded: PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    ),
    // There are 2 types of tree selection:  single and multi.
    // This is set up to allow for "multi" in the future without having to deprecate the old API.
    selectionType: PropTypes.oneOf(['none', 'single']),
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    variant: PropTypes.oneOf(['folderTree', 'indent']),
    collectionIcon: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    collectionIconExpanded: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.func
    ]),
    itemIcon: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    /**
     * A function called with each item's props as an argument. The return value of this function is a
     * props object which will be passed to the item when it is rendered. This is useful for situations where
     * you need to render the item differently depending on it's props. For example, if you would like to
     * display a different icon for items with a certain name.
     */
    getItemProps: PropTypes.func,
    /**
     * A function called with each collection's props as an argument. The return value of this function is a
     * props object which will be passed to the collection when it is rendered. This is useful for situations where
     * you need to render the collection differently depending on it's props. For example, if you would like to
     * display a different icon for collections with a certain name.
     */
    getCollectionProps: PropTypes.func,
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
    treeLabel: PropTypes.string,
    /**
     * A function that can be used to customize content in TreeNodes. It gets called for every node
     * on every render if not null. It should accept 1 parameter that contains the props passed to this node
     * and return the JSX that should be rendered.
     */
    renderContent: PropTypes.func
  }

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
    rootId: undefined,
    expanded: undefined,
    treeLabel: undefined,
    renderContent: undefined
  }

  static Node = TreeNode
  static Collection = TreeCollection
  static Button = TreeButton

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
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.makeStyles()
  }
  componentDidUpdate() {
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.makeStyles()
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
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_root' does not exist on type 'TreeBrows... Remove this comment to see the full error message
    return Array.from(this._root.querySelectorAll('[role="treeitem"]'))
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'delta' implicitly has an 'any' type.
  moveFocus(delta) {
    const nodes = this.getNavigableNodes()
    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
    const closest = window.document.activeElement.closest('[role="treeitem"]')
    const active = nodes.indexOf(closest)
    let next = active + delta
    if (next < 0) {
      next = 0
    } else if (next >= nodes.length) {
      next = nodes.length - 1
    }
    nodes.forEach((n) => {
      // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
      n.setAttribute('tabindex', '-1')
    })
    // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
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
      // @ts-expect-error ts-migrate(2339) FIXME: Property '_root' does not exist on type 'TreeBrows... Remove this comment to see the full error message
      (this._root.parentElement.dir === 'rtl' || document.dir === 'rtl')
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
    return this.collections.map((collection, i) => (
      <TreeCollection
        key={i}
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
        {...pickProps(omitProps(this.props), TreeCollection.propTypes)}
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
        css={styles.treeBrowser}
        tabIndex={0}
        role="tree"
        // @ts-expect-error ts-migrate(2322) FIXME: Type '(event: any, node: any) => void' is not assi... Remove this comment to see the full error message
        onKeyDown={this.handleKeyDown}
        ref={(el) => {
          // @ts-expect-error ts-migrate(2339) FIXME: Property '_root' does not exist on type 'TreeBrows... Remove this comment to see the full error message
          this._root = el
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
