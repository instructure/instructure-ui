import React, { Component } from 'react'
import PropTypes from 'prop-types'
import themeable from '@instructure/ui-themeable'
import { omitProps } from '@instructure/ui-utils/lib/react/passthroughProps'

import Link from '../../Link'

import styles from './styles.css'
import theme from './theme'

/**
---
parent: Breadcrumb
---
**/
@themeable(theme, styles)
export default class BreadcrumbLink extends Component {
  /* eslint-disable react/require-default-props */
  static propTypes = {
    /**
    * Content to render as the crumb, generally should be text.
    */
    children: PropTypes.node.isRequired,
    /**
    * Link the crumb should direct to; if an href is provided, the crumb will render as a link
    */
    href: PropTypes.string,
    /**
    * If the BreadcrumbLink has an onClick prop (and no href), it will render as a button
    */
    onClick: PropTypes.func,
    /**
    * Sets the font-size of the breadcrumb text
    */
    size: PropTypes.oneOf(['small', 'medium', 'large'])
  }
  /* eslint-enable react/require-default-props */

  renderChildren () {
    const {
      children,
      href,
      onClick
    } = this.props

    const props = omitProps(this.props, BreadcrumbLink.propTypes)

    if (href || onClick) {
      return (
        <Link
          {...props}
          ellipsis
          href={href}
          onClick={onClick}
          title={children}
        >
          {children}
        </Link>
      )
    } else {
      return (
        <span className={styles.text}>
          <span className={styles.ellipsis}>{children}</span>
        </span>
      )
    }
  }

  render () {
    return (
      <span className={styles.root}>
        {this.renderChildren()}
      </span>
    )
  }
}
