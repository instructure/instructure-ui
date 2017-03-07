import React, { Component, PropTypes } from 'react'
import CustomPropTypes from '../../../util/CustomPropTypes'
import themeable from '../../../util/themeable'
import classnames from 'classnames'

import TreeButton from '../TreeButton'

import styles from './styles.css'
import theme from './theme.js'

@themeable(theme, styles)
export default class TreeCollection extends Component {
  static propTypes = {
    collection: PropTypes.shape({
      id: PropTypes.integer,
      name: PropTypes.string,
      descriptor: PropTypes.string,
      collections: PropTypes.array,
      items: PropTypes.array
    }).isRequired,
    descriptor: PropTypes.string,
    collections: PropTypes.object,
    items: PropTypes.object,
    expanded: CustomPropTypes.controllable(PropTypes.bool, 'onToggle'),
    loading: PropTypes.bool,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    variant: PropTypes.oneOf(['folderTree', 'indent']),
    collectionIcon: PropTypes.func,
    collectionIconExpanded: PropTypes.func,
    itemIcon: PropTypes.func,
    onItemClick: PropTypes.func,
    onCollectionClick: PropTypes.func
  }

  static defaultProps = {
    collection: {},
    collections: {},
    items: {},
    size: 'medium',
    variant: 'folderTree',
    onClick: function () {},
    onItemClick: function () {},
    onCollectionClick: function () {}
  }

  constructor (props) {
    super(props)

    this.state = {}
    if (props.expanded === undefined) {
      this.state.expanded = false
    }
  }

  handleClick = () => {
    this.props.onCollectionClick()
    this.setState({ expanded: !this.expanded })
  }

  get expanded () {
    const { expanded } = this.props
    return (expanded === undefined) ? this.state.expanded : expanded
  }

  items (collection) {
    if (collection.rootLevel || !collection.items) {
      return []
    } else {
      return collection.items.map(itemId => this.props.items[itemId])
    }
  }

  subTrees (subCollections) {
    if (subCollections) {
      return subCollections.map(id => this.props.collections[id])
        .filter(collection => collection != null)
    } else {
      return []
    }
  }

  expandedWithChildren (collection) {
    const hasItems = collection.items && collection.items.length > 0
    const hasCollections = collection.collections && collection.collections.length > 0
    return this.expanded && (hasCollections || hasItems)
  }

  renderChildren () {
    const { collection } = this.props
    const children = this.expandedWithChildren(collection) &&
      <ul className={styles.list}>
        {this.subTrees(collection.collections).map((subCollection) => {
          return this.renderCollectionNode(subCollection)
        })}
        {this.items(collection).map((item) => {
          return this.renderItemNode(item)
        })}
      </ul>
    return children
  }

  renderCollectionNode (subCollection) {
    const {
      collections,
      items,
      size,
      variant,
      collectionIcon,
      collectionIconExpanded,
      itemIcon,
      onItemClick,
      onCollectionClick
    } = this.props
    return (
      <li key={`collection-${subCollection.id}`} className={styles.item}>
        <TreeCollection
          collection={subCollection}
          collections={collections}
          items={items}
          size={size}
          variant={variant}
          descriptor={subCollection.descriptor}
          collectionIcon={collectionIcon}
          collectionIconExpanded={collectionIconExpanded}
          itemIcon={itemIcon}
          onItemClick={onItemClick}
          onCollectionClick={onCollectionClick}
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
      collection,
      size,
      variant,
      collectionIcon,
      collectionIconExpanded,
      itemIcon
    } = this.props
    const {
      id,
      name,
      descriptor
    } = collection
    const classes = {
      [styles.root]: true,
      [styles[size]]: true,
      [styles[variant]]: true,
      [styles.expanded]: this.expanded
    }
    return (
      <div className={classnames(classes)}>
        <TreeButton
          id={'collection_' + id}
          name={name}
          descriptor={descriptor}
          type="collection"
          size={size}
          variant={variant}
          expanded={this.state.expanded}
          collectionIcon={collectionIcon}
          collectionIconExpanded={collectionIconExpanded}
          itemIcon={itemIcon}
          onClick={this.handleClick}
        />
        {this.renderChildren()}
      </div>
    )
  }
}
