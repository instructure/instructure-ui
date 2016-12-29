import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import themeable from '../../util/themeable'

import CustomPropTypes from '../../util/CustomPropTypes'
import getElementType from '../../util/getElementType'
import { omitProps } from '../../util/passthroughProps'

import styles from './styles.css'
import theme from './theme.js'

/**
  A Link component

  ```jsx_example
    <Link href="example.html">I'm a link</Link>
  ```

  ```jsx_example
    <Link>I'm a button that looks like a link because I have no href prop</Link>
  ```
 **/
@themeable(theme, styles)
class Link extends Component {
  static propTypes = {
    href: PropTypes.string,
    children: PropTypes.node.isRequired,
    /**
    * provides a reference to the underlying focusable (`button` or `a`) element
    */
    linkRef: PropTypes.func,
    /**
    * the element type to render as (will default to `<a>` if href is provided)
    */
    as: CustomPropTypes.elementType(),
    disabled: PropTypes.bool,
    onClick: PropTypes.func
  }

  static defaultProps = {
    as: 'button',
    linkRef: function (link) {}
  }

  handleClick = (e) => {
    const {
      disabled,
      onClick
    } = this.props

    if (disabled) {
      e.preventDefault()
      e.stopPropagation()
    } else if (typeof onClick === 'function') {
      onClick(e)
    }
  }

  get focused () {
    return (document.activeElement === ReactDOM.findDOMNode(this._link))
  }

  focus () {
    ReactDOM.findDOMNode(this._link).focus()
  }

  render () {
    const {
      children,
      disabled,
      onClick,
      linkRef,
      href
    } = this.props

    const ElementType = getElementType(Link, this.props)

    const props = {
      ref: (c, ...args) => {
        this._link = c
        linkRef.apply(this, [c].concat(args))
      },
      ...omitProps(this.props, Link.propTypes),
      className: styles.link,
      href: href,
      type: href ? null : 'button',
      'aria-disabled': disabled ? 'true' : null,
      role: (onClick && this.props.as) ? 'button' : null,
      tabIndex: (onClick && this.props.as) ? '0' : null,
      onClick: this.handleClick
    }

    return (
      <span className={styles.root}>
        <ElementType {...props}>{children}</ElementType>
      </span>
    )
  }
}

export default Link
