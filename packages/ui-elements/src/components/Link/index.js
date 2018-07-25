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
import getElementType from '@instructure/ui-utils/lib/react/getElementType'
import { omitProps } from '@instructure/ui-utils/lib/react/passthroughProps'
import isActiveElement from '@instructure/ui-utils/lib/dom/isActiveElement'
import findDOMNode from '@instructure/ui-utils/lib/dom/findDOMNode'
import hasVisibleChildren from '@instructure/ui-a11y/lib/utils/hasVisibleChildren'

import styles from './styles.css'
import theme from './theme'

/**
---
category: components/navigation
---
**/
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
    margin: ThemeablePropTypes.spacing,
    /**
    * Add an SVG icon to the Link. Do not add icons directly as
    * children.
    */
    icon: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
    /**
    * Place the icon before or after the text in the Link.
    */
    iconPlacement: PropTypes.oneOf(['start', 'end'])
  }

  static defaultProps = {
    variant: 'default',
    as: 'button',
    linkRef: function (link) {},
    ellipsis: false,
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

  get focused () {
    return isActiveElement(this._link)
  }

  get hasVisibleChildren () {
    return hasVisibleChildren(this.props.children)
  }

  focus () {
    findDOMNode(this._link).focus() // eslint-disable-line react/no-find-dom-node
  }

  renderIcon () {
    const Icon = this.props.icon
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
      linkRef,
      href,
      margin,
      ellipsis,
      elementRef,
      icon,
      iconPlacement
    } = this.props

    const ElementType = getElementType(Link, this.props)

    const classes = {
      [styles.link]: true,
      [styles.inverse]: variant === 'inverse',
      [styles.ellipsis]: ellipsis,
      [styles[`iconPlacement--${iconPlacement}`]]: icon && this.hasVisibleChildren,
      [styles.iconOnly]: icon && !this.hasVisibleChildren
    }

    const layoutClasses = {
      [styles.layout]: true,
      [styles.text]: ellipsis
    }

    const props = {
      ref: (c, ...args) => {
        this._link = c
        linkRef.apply(this, [c].concat(args))
      },
      ...omitProps(this.props, {...Link.propTypes, ...View.propTypes}),
      className: classnames(classes),
      href: href,
      type: href ? null : 'button',
      'aria-disabled': disabled ? 'true' : null,
      role: onClick && this.props.as ? 'button' : null,
      tabIndex: onClick && this.props.as ? '0' : null,
      onClick: this.handleClick
    }

    return (
      <View
        margin={margin}
        className={styles.root}
        elementRef={elementRef}
      >
        <ElementType {...props}>
          <span className={classnames(layoutClasses)}>
            {(icon && iconPlacement === 'start') && this.renderIcon()}
            {children}
            {(icon && iconPlacement === 'end') && this.renderIcon()}
          </span>
        </ElementType>
      </View>
    )
  }
}

export default Link
