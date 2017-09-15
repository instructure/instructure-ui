import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import themeable from '../../../themeable'

import styles from './styles.css'
import theme from './theme'

@themeable(theme, styles)

export default class TreeButton extends Component {
  /* eslint-disable react/require-default-props */
  static propTypes = {
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    name: PropTypes.string,
    descriptor: PropTypes.string,
    type: PropTypes.string,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    variant: PropTypes.oneOf(['folderTree', 'indent']),
    expanded: PropTypes.bool,
    collectionIcon: PropTypes.func,
    collectionIconExpanded: PropTypes.func,
    itemIcon: PropTypes.func,
    onClick: PropTypes.func
  }
  /* eslint-enable react/require-default-props */

  static defaultProps = {
    type: 'treeButton',
    size: 'medium',
    variant: 'folderTree',
    onClick: function () {}
  }

  renderIcon () {
    const { type } = this.props
    switch (type) {
      case 'collection':
        return this.renderCollectionIcon()
      case 'item':
        return this.renderItemIcon()
      default:
        break
    }
  }

  renderCollectionIcon () {
    const Icon = this.props.expanded
      ? this.props.collectionIconExpanded : this.props.collectionIcon
    if (Icon) {
      return <Icon className={styles.icon} />
    }
  }

  renderItemIcon () {
    const Icon = this.props.itemIcon
    if (Icon) {
      return <Icon className={styles.icon} />
    }
  }

  handleClick = () => {
    const { onClick, id, type } = this.props
    if (onClick && typeof onClick === 'function') {
      onClick({id, type}) // TODO: this should pass the event as the first argument
    }
  }

  render () {
    const {
      name,
      descriptor,
      expanded,
      variant,
      size
    } = this.props

    const classes = {
      [styles.root]: true,
      [styles[size]]: true,
      [styles[variant]]: true,
      [styles.expanded]: this.expanded
    }

    return (
      <button
        tabIndex={-1}
        type="button"
        aria-expanded={expanded}
        className={classnames(classes)}
        onClick={this.handleClick}
        title={name}
      >
        <span className={styles.layout}>
          {this.renderIcon()}
          <span className={styles.text}>
            <span className={styles.textName}>
              {name}
            </span>
            {(descriptor)
              ? <span
                className={styles.textDescriptor}
                title={descriptor}
              >
                {descriptor}
              </span> : null
            }
          </span>
        </span>
      </button>
    )
  }
}
