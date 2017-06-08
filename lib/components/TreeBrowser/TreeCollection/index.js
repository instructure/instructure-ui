import React, { Component } from 'react'
import PropTypes from 'prop-types'
import themeable from '../../../themeable'
import classnames from 'classnames'

import TreeButton from '../TreeButton'

import styles from './styles.css'
import theme from './theme.js'

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
        key={'c' + i}
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
      <li key={'i' + i}
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

    const classes = {
      [styles.root]: true,
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
