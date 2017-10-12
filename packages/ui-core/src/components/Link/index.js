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
  A Link component

  ```jsx_example
    <Link href="example.html">I'm a link</Link>
  ```

  ```jsx_example
    <Link>I'm a button that looks like a link because I have no href prop</Link>
  ```

  ```jsx_example
  ---
  inverse: true
  ---
  <Link variant="inverse">I'm an inverse link for use with dark backgrounds</Link>
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
