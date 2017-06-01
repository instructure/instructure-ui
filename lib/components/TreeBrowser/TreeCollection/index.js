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
    const { expanded, collections, items } = this.props
    return expanded && this.hasChildren &&
      <ul className={styles.list}>
        {collections.map((collection) => {
          return this.renderCollectionNode(collection)
        })}
        {items.map((item) => {
          return this.renderItemNode(item)
        })}
      </ul>
  }

  renderCollectionNode (collection) {
    return (
      <li key={`collection-${collection.id}`} className={styles.item}>
        <TreeCollection
          {...this.props}
          id={collection.id}
          name={collection.name}
          descriptor={collection.descriptor}
          expanded={collection.expanded}
          items={collection.items}
          collections={collection.collections}
        />
      </li>
    )
  }

  renderItemNode (item) {
    const {
      size,
      variant,
      itemIcon,
      onItemClick
    } = this.props

    return (
      <li key={`item-${item.id}`} className={styles.item}>
        <TreeButton
          id={'item_' + item.id}
          name={item.name}
          descriptor={item.descriptor}
          type="item"
          size={size}
          variant={variant}
          itemIcon={itemIcon}
          onClick={onItemClick}
        />
      </li>
    )
  }

  render () {
    const {
      id,
      name,
      descriptor,
      size,
      variant,
      collectionIcon,
      collectionIconExpanded,
      itemIcon,
      expanded
    } = this.props

    const classes = {
      [styles.root]: true,
      [styles[size]]: true,
      [styles[variant]]: true,
      [styles.expanded]: expanded
    }

    return (
      <div className={classnames(classes)}>
        <TreeButton
          id={'collection_' + id}
          name={name}
          descriptor={descriptor}
          expanded={expanded}
          type="collection"
          size={size}
          variant={variant}
          collectionIcon={collectionIcon}
          collectionIconExpanded={collectionIconExpanded}
          itemIcon={itemIcon}
          onClick={this.handleCollectionClick}
        />
        {this.renderChildren()}
      </div>
    )
  }
}
