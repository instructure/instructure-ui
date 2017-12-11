import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import themeable from '@instructure/ui-themeable'
import CustomPropTypes from '@instructure/ui-utils/lib/react/CustomPropTypes'
import { omitProps } from '@instructure/ui-utils/lib/react/passthroughProps'

import styles from './styles.css'
import theme from './theme'

/**
---
parent: List
---
**/
@themeable(theme, styles)
export default class ListItem extends Component {
  /* eslint-disable react/require-default-props */
  static propTypes = {
    children: PropTypes.node.isRequired,
    variant: CustomPropTypes.deprecatedVariant(
      PropTypes.oneOf(['default', 'unstyled', 'pipe', 'inline']),
      'pipe',
      'For the same functionality, use `inline` on the `variant` prop and set the `delimiter` prop to `pipe`.'
    ),
    delimiter: PropTypes.oneOf(['none', 'pipe', 'slash', 'arrow']),
    size: PropTypes.oneOf(['small', 'medium', 'large'])
  };
  /* eslint-enable react/require-default-props */

  render () {
    const props = omitProps(this.props, ListItem.propTypes)
    const delimiter = this.props.variant === 'pipe' ? 'pipe' : this.props.delimiter
    const variant = this.props.variant === 'pipe' ? 'inline' : this.props.variant
    const size = this.props.variant === 'pipe' ? 'small' : this.props.size

    const classes = {
      [styles.root]: true,
      [styles[variant]]: variant,
      [styles[size]]: size,
      [styles[`delimiter--${delimiter}`]]: true
    }

    return (
      <li
        {...props}
        className={classnames(classes)}
      >
        {this.props.children}
        <span
          className={styles.delimiter}
          aria-hidden="true"
        />
      </li>
    )
  }
}
