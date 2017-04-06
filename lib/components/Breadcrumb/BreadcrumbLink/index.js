import React, { PropTypes, Component } from 'react'
import themeable from '../../../themeable'
import classnames from 'classnames'
import { omitProps } from '../../../util/passthroughProps'

import Link from '../../Link'

import styles from './styles.css'
import theme from './theme.js'

@themeable(theme, styles)
export default class BreadcrumbLink extends Component {
  static propTypes = {
    /**
    * Content to render as the crumb, generally should be text.
    */
    children: PropTypes.node.isRequired,
    /**
    * Link the crumb should direct to, if provided the crumb will be a link
    */
    href: PropTypes.string,
    /**
    * Sets the font-size of the breadcrumb text
    */
    size: PropTypes.oneOf(['small', 'medium', 'large'])
  }

  render () {
    const {
      children,
      href
    } = this.props

    const props = omitProps(this.props, BreadcrumbLink.propTypes)

    const classes = {
      [styles.root]: true
    }

    const text = <span className={styles.ellipsis}>{children}</span>

    return (
      <span className={classnames(classes)}>
        {(href)
          ? <Link href={href} title={children} ellipsis {...props}>{children}</Link>
          : <span className={styles.text}>{text}</span>
        }
      </span>
    )
  }
}
