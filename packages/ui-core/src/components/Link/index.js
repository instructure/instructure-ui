import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import themeable from '@instructure/ui-themeable'
import CustomPropTypes from '@instructure/ui-utils/lib/react/CustomPropTypes'
import getElementType from '@instructure/ui-utils/lib/react/getElementType'
import { omitProps } from '@instructure/ui-utils/lib/react/passthroughProps'
import isActiveElement from '@instructure/ui-utils/lib/dom/isActiveElement'
import findDOMNode from '@instructure/ui-utils/lib/dom/findDOMNode'

import Container from '../Container'

import styles from './styles.css'
import theme from './theme'

/**
---
category: components/navigation
---
**/
@themeable(theme, styles)
class Link extends Component {
  /* eslint-disable react/require-default-props */
  static propTypes = {
    href: PropTypes.string,
    children: PropTypes.node.isRequired,
    variant: PropTypes.oneOf(['default', 'inverse']),
    /**
    * provides a reference to the underlying focusable (`button` or `a`) element
    */
    linkRef: PropTypes.func,
    /**
    * the element type to render as (will default to `<a>` if href is provided)
    */
    as: CustomPropTypes.elementType,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    /**
    * truncates the text to fit within the parent element (also changes display to block).
    */
    ellipsis: PropTypes.bool,
    /**
    * Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`,
    * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
    * familiar CSS-like shorthand. For example: `margin="small auto large"`.
    */
    margin: CustomPropTypes.spacing
  }
  /* eslint-enable react/require-default-props */

  static defaultProps = {
    variant: 'default',
    as: 'button',
    linkRef: function (link) {},
    ellipsis: false
  }

  handleClick = e => {
    const { disabled, onClick } = this.props

    if (disabled) {
      e.preventDefault()
      e.stopPropagation()
    } else if (typeof onClick === 'function') {
      onClick(e)
    }
  }

  get focused () {
    return isActiveElement(this._link)
  }

  focus () {
    findDOMNode(this._link).focus() // eslint-disable-line react/no-find-dom-node
  }

  render () {
    const { children, disabled, onClick, variant, linkRef, href, margin, ellipsis } = this.props

    const ElementType = getElementType(Link, this.props)

    const classes = {
      [styles.link]: true,
      [styles[variant]]: true,
      [styles.ellipsis]: ellipsis
    }

    const props = {
      ref: (c, ...args) => {
        this._link = c
        linkRef.apply(this, [c].concat(args))
      },
      ...omitProps(this.props, Link.propTypes),
      className: classnames(classes),
      href: href,
      type: href ? null : 'button',
      'aria-disabled': disabled ? 'true' : null,
      role: onClick && this.props.as ? 'button' : null,
      tabIndex: onClick && this.props.as ? '0' : null,
      onClick: this.handleClick
    }

    const text = ellipsis
      ? (<span className={styles.text}>
        {children}
      </span>)
      : children

    return (
      <Container margin={margin} className={styles.root}>
        <ElementType {...props}>
          {text}
        </ElementType>
      </Container>
    )
  }
}

export default Link
