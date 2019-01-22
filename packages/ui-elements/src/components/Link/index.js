/*
* The MIT License (MIT)
*
* Copyright (c) 2015 - present Instructure, Inc.
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import View from '@instructure/ui-layout/lib/components/View'

import themeable from '@instructure/ui-themeable'
import CustomPropTypes from '@instructure/ui-utils/lib/react/CustomPropTypes'
import ThemeablePropTypes from '@instructure/ui-themeable/lib/utils/ThemeablePropTypes'
import findFocusable from '@instructure/ui-a11y/lib/utils/findFocusable'
import getElementType from '@instructure/ui-utils/lib/react/getElementType'
import matchComponentTypes from '@instructure/ui-utils/lib/react/matchComponentTypes'
import { omitProps } from '@instructure/ui-utils/lib/react/passthroughProps'
import isActiveElement from '@instructure/ui-utils/lib/dom/isActiveElement'
import findDOMNode from '@instructure/ui-utils/lib/dom/findDOMNode'
import hasVisibleChildren from '@instructure/ui-a11y/lib/utils/hasVisibleChildren'
import deprecated from '@instructure/ui-utils/lib/react/deprecated'
import warning from '@instructure/ui-utils/lib/warning'
import testable from '@instructure/ui-testable'

import styles from './styles.css'
import theme from './theme'

/**
---
category: components
---
**/
@testable()
@deprecated('5.40.0', { ellipsis: '<Link><TruncateText /></Link>' })
@themeable(theme, styles)
class Link extends Component {
  static propTypes = {
    href: PropTypes.string,
    children: PropTypes.node.isRequired,
    variant: PropTypes.oneOf(['default', 'inverse']),
    /**
    * provides a reference to the underlying focusable (`button` or `a`) element
    */
    linkRef: PropTypes.func,
    /**
    * provides a reference to the underlying html element
    */
    elementRef: PropTypes.func,
    /**
    * the element type to render as (will default to `<a>` if href is provided)
    */
    as: CustomPropTypes.elementType,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    /**
    * __DEPRECATED (5.40.0)__ Use `<Link><TruncateText /></Link>` instead.
    */
    ellipsis: PropTypes.bool,
    /**
    * Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`,
    * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
    * familiar CSS-like shorthand. For example: `margin="small auto large"`.
    */
    margin: ThemeablePropTypes.spacing,
    /**
    * Add an SVG icon to the Link. Do not add icons directly as
    * children.
    */
    icon: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
    /**
    * Place the icon before or after the text in the Link.
    */
    iconPlacement: PropTypes.oneOf(['start', 'end']),
    /**
    * Set the CSS display property of the Link element. 'auto' sets no display property.
    */
    display: PropTypes.oneOf(['auto', 'block', 'inline-block', 'flex', 'inline-flex'])
  }

  static defaultProps = {
    variant: 'default',
    as: 'button',
    linkRef: function (link) {},
    iconPlacement: 'start'
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

  get display () {
    if (this.props.display) {
      return this.props.display // user-entered display property
    }

    if (this.props.ellipsis) {
      return 'block' // can delete this block when ellipsis is removed
    }

    if (this.props.icon) {
      if (this.containsTruncateText) {
        return 'flex' // TruncateText displays block, so avoid icon getting bumped
      } else {
        return 'inline-block' // avoid irregularly shaped focus outline
      }
    } else if (this.containsTruncateText) {
      return 'block' // TruncateText displays block, so container needs to as well
    } else {
      return 'auto'
    }
  }

  get hasVisibleChildren () {
    return hasVisibleChildren(this.props.children)
  }

  get element () {
    return getElementType(Link, this.props)
  }

  get focused () {
    return isActiveElement(this._link)
  }

  get focusable () {
    return findFocusable(this._link)
  }

  get containsTruncateText () {
    let truncateText = false

    React.Children.forEach(this.props.children, (child) => {
      if (child && matchComponentTypes(child, ['TruncateText'])) {
        truncateText = true
      }
    })

    if (truncateText) {
      warning( // if display prop is used, warn about icon or TruncateText
        this.props.display === undefined, // eslint-disable-line no-undefined
        '[Link] Using the display property with TruncateText may cause layout issues.'
      )
    }

    return truncateText
  }

  focus () {
    findDOMNode(this._link).focus() // eslint-disable-line react/no-find-dom-node
  }

  renderIcon () {
    const Icon = this.props.icon
    warning( // if display prop is used, warn about icon or TruncateText
      this.props.display === undefined, // eslint-disable-line no-undefined
      '[Link] Using the display property with an icon may cause layout issues.'
    )

    if (typeof this.props.icon === 'function') {
      return <span className={styles.icon}><Icon /></span>
    } else if (Icon) {
      return <span className={styles.icon}>{Icon}</span>
    } else {
      return null
    }
  }

  render () {
    const {
      disabled,
      children,
      onClick,
      variant,
      href,
      margin,
      ellipsis,
      icon,
      iconPlacement,
      linkRef,
      elementRef
    } = this.props

    const classes = {
      [styles.root]: true,
      [styles.inverse]: variant === 'inverse',
      [styles[`iconPlacement--${iconPlacement}`]]: icon && this.hasVisibleChildren,
      [styles.truncates]: this.containsTruncateText,
      [styles.ellipsis]: ellipsis
    }

    const role = onClick && this.element !== 'button' ? 'button' : null
    const type = onClick || this.element === 'button' ? 'button' : null
    const tabIndex = (role === 'button' && !disabled) ? '0' : null

    const passthroughProps = View.omitViewProps(
      omitProps(this.props, Link.propTypes),
      Link
    )

    const props = {
      ...passthroughProps,
      elementRef: (el) => {
        this._link = el
        if (typeof linkRef === 'function') linkRef(el)
        if (typeof elementRef === 'function') elementRef(el)
      },
      as: this.element,
      display: this.display,
      margin: margin,
      className: classnames(classes),
      href: href,
      onClick: this.handleClick,
      'aria-disabled': disabled ? 'true' : null,
      role,
      type,
      tabIndex
    }

    return (
      <View {...props}>
        {(icon && iconPlacement === 'start') && this.renderIcon()}
        {children}
        {(icon && iconPlacement === 'end') && this.renderIcon()}
      </View>
    )
  }
}

export default Link
