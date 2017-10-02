import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import themeable from '@instructure/ui-themeable'
import { omitProps } from '@instructure/ui-utils/lib/react/passthroughProps'

import styles from './styles.css'
import theme from './theme'

@themeable(theme, styles)
export default class ListItem extends Component {
  /* eslint-disable react/require-default-props */
  static propTypes = {
    children: PropTypes.node.isRequired,
    variant: PropTypes.oneOf(['default', 'unstyled', 'pipe']),
    size: PropTypes.oneOf(['small', 'medium', 'large'])
  };
  /* eslint-enable react/require-default-props */

  render () {
    const props = omitProps(this.props, ListItem.propTypes)

    const classes = {
      [styles.root]: true,
      [styles[this.props.variant]]: this.props.variant,
      [styles[this.props.size]]: this.props.size &&
        this.props.variant !== 'pipe'
    }

    return (
      <li
        {...props}
        className={classnames(classes)}
      >
        {this.props.children}
      </li>
    )
  }
}
