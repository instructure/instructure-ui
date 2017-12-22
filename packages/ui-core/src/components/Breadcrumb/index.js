import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import IconArrowOpenRight from '@instructure/ui-icons/lib/Solid/IconArrowOpenRight'
import themeable from '@instructure/ui-themeable'
import CustomPropTypes from '@instructure/ui-utils/lib/react/CustomPropTypes'

import BreadcrumbLink from './BreadcrumbLink'
import Container from '../Container'

import styles from './styles.css'
import theme from './theme'

/**
---
category: components/navigation
---
**/

@themeable(theme, styles)
export default class Breadcrumb extends Component {
  /* eslint-disable react/require-default-props */
  static propTypes = {
    /**
    * children of type BreadcrumbLink
    */
    children: CustomPropTypes.Children.oneOf([BreadcrumbLink]),
    /**
    * An accessible label for the navigation
    */
    label: PropTypes.string.isRequired,
    /**
    * Sets the font-size of the breadcrumb text
    */
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    /**
    * Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`,
    * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
    * familiar CSS-like shorthand. For example: `margin="small auto large"`.
    */
    margin: CustomPropTypes.spacing
  }
  /* eslint-enable react/require-default-props */

  static defaultProps = {
    size: 'medium'
  }

  renderChildren () {
    const numChildren = this.props.children ? this.props.children.length : 0
    const style = {
      maxWidth: `${Math.floor(100 / numChildren)}%`
    }
    return React.Children.map(this.props.children,
      (child, index) => {
        return (
          <li className={styles.crumb} style={style}>
            {child}
            {index < (numChildren - 1) && <IconArrowOpenRight className={styles.separator} />}
          </li>
        )
      }
    )
  }

  render () {
    const classes = {
      [styles.root]: true,
      [styles[this.props.size]]: true
    }
    return (
      <Container
        role="navigation"
        as="div"
        margin={this.props.margin}
      >
        <ol className={classnames(classes)} aria-label={this.props.label}>
          {this.renderChildren()}
        </ol>
      </Container>
    )
  }
}

export { default as BreadcrumbLink } from './BreadcrumbLink'
