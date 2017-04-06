import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'
import themeable from '../../themeable'
import CustomPropTypes from '../../util/CustomPropTypes'
import getElementType from '../../util/getElementType'
import { omitProps } from '../../util/passthroughProps'
import isActiveElement from '../../util/dom/isActiveElement'
import Container from '../Container'

import styles from './styles.css'
import theme from './theme.js'

/**
---
category: navigation
---
  A Link component

  ```jsx_example
    <Link href="example.html">I'm a link</Link>
  ```

  ```jsx_example
    <Link>I'm a button that looks like a link because I have no href prop</Link>
  ```

  ### Adding margin
  Use the `margin` prop to add space to the left or right of the Link. Because
  Link displays `inline`, top and bottom margin will not work. If you need
  to add margin to the top or bottom of Link, wrap it inside a `<Container />`.

  ```jsx_example
    <Link href="example.html" margin="0 0 0 large">I'm a link with left margin</Link>
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
    as: CustomPropTypes.elementType,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    /**
    * truncates the text to fit within the parent element (also changes display to block).
    */
    ellipsis: PropTypes.bool,
    /**
    * Valid values are `0`, `none`, `auto`, `xxxSmall`, `xxSmall`, `xSmall`,
    * `small`, `medium`, `large`, `xLarge`, `xxLarge`. Apply these values via
    * familiar CSS-like shorthand. For example: `margin="small auto large"`.
    */
    margin: CustomPropTypes.spacing
  }

  static defaultProps = {
    as: 'button',
    linkRef: function (link) {},
    ellipsis: false
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
    return isActiveElement(this._link)
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
      href,
      margin,
      ellipsis
    } = this.props

    const ElementType = getElementType(Link, this.props)

    const classes = {
      [styles.link]: true,
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
      role: (onClick && this.props.as) ? 'button' : null,
      tabIndex: (onClick && this.props.as) ? '0' : null,
      onClick: this.handleClick
    }

    const text = ellipsis ? <span className={styles.text}>{children}</span> : children

    return (
      <Container
        as="span"
        margin={margin}
        display={null}
        className={styles.root}
      >
        <ElementType {...props}>{text}</ElementType>
      </Container>
    )
  }
}

export default Link
