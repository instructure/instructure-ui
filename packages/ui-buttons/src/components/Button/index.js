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
import keycode from 'keycode'

import themeable from '@instructure/ui-themeable'
import CustomPropTypes from '@instructure/ui-utils/lib/react/CustomPropTypes'
import ThemeablePropTypes from '@instructure/ui-themeable/lib/utils/ThemeablePropTypes'
import { omitProps } from '@instructure/ui-utils/lib/react/passthroughProps'
import getElementType from '@instructure/ui-utils/lib/react/getElementType'
import isActiveElement from '@instructure/ui-utils/lib/dom/isActiveElement'
import findDOMNode from '@instructure/ui-utils/lib/dom/findDOMNode'
import hasVisibleChildren from '@instructure/ui-a11y/lib/utils/hasVisibleChildren'
import warning from '@instructure/ui-utils/lib/warning'

import View from '@instructure/ui-layout/lib/components/View'
import Flex, { FlexItem } from '@instructure/ui-layout/lib/components/Flex'

import styles from './styles.css'
import theme from './theme'

const circleVariants = [
  'circle-primary',
  'circle-danger',
  'circle-default'
]

const squareVariants = [
  'circle-default',
  'circle-primary',
  'circle-danger',
  'icon',
  'icon-inverse'
]

/**
---
category: components
---
**/

@themeable(theme, styles)
class Button extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
    variant: PropTypes.oneOf([
      'default',
      'primary',
      'success',
      'danger',
      'light',
      'ghost',
      'ghost-inverse',
      'link',
      'link-inverse',
      'circle-default',
      'circle-primary',
      'circle-danger',
      'icon',
      'icon-inverse'
    ]),
    /**
    * provides a reference to the underlying focusable (`button` or `a`) element
    */
    buttonRef: PropTypes.func,
    /**
    * the element type to render as (will be `<a>` if href is provided)
    */
    as: CustomPropTypes.elementType,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    /**
    * should the `<Button/>` fill the width of its container
    */
    fluidWidth: PropTypes.bool,
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,
    href: PropTypes.string,
    onClick: PropTypes.func,
    /**
    * Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`,
    * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
    * familiar CSS-like shorthand. For example: `margin="small auto large"`.
    */
    margin: ThemeablePropTypes.spacing,
    /**
    * Add an SVG icon to the button. Do not add icons directly as
    * children.
    */
    icon: PropTypes.oneOfType([PropTypes.func, PropTypes.element])
  }

  static defaultProps = {
    as: 'button',
    type: 'button',
    variant: 'default',
    size: 'medium',
    margin: '0',
    fluidWidth: false,
    buttonRef: function (button) {}
  }

  handleClick = e => {
    const { disabled, readOnly, onClick } = this.props

    if (disabled || readOnly) {
      e.preventDefault()
      e.stopPropagation()
    } else if (typeof onClick === 'function') {
      onClick(e)
    }
  }

  handleKeyDown = e => {
    const { disabled, readOnly, onClick, href } = this.props

    // behave like a button when space key is pressed
    if (this.elementType !== 'button' && (e.keyCode === keycode.codes.space || e.keyCode === keycode.codes.enter)) {
      e.preventDefault()
      e.stopPropagation()

      if ((typeof onClick === 'function') && !disabled && !readOnly) {
        onClick(e)
      }
      if (href) {
        findDOMNode(this._button).click() // eslint-disable-line react/no-find-dom-node
      }
    }
  }

  get elementType () {
    return getElementType(Button, this.props)
  }

  get focused () {
    return isActiveElement(this._button)
  }

  focus () {
    findDOMNode(this._button).focus() // eslint-disable-line react/no-find-dom-node
  }

  renderIcon () {
    const Icon = this.props.icon
    if (typeof this.props.icon === 'function') {
      return <span className={styles.iconSVG}><Icon inline={false} /></span>
    } else if (Icon) {
      return <span className={styles.iconSVG}>{Icon}</span>
    } else {
      return null
    }
  }

  buttonBorderRadius () {
    if (circleVariants.includes(this.props.variant)) {
      return 'circle'
    } else {
      return 'rounded'
    }
  }

  buttonWidth (hasOnlyIcon) {
    const {
      variant,
      fluidWidth
    } = this.props

    if (hasOnlyIcon || squareVariants.includes(variant)) {
      return 'icon'
    } else if (fluidWidth) {
      return 'fluid'
    } else {
      return 'auto'
    }
  }

  render () {
    const {
      as,
      buttonRef,
      children,
      disabled,
      href,
      icon,
      margin,
      onClick,
      readOnly,
      size,
      type,
      variant
    } = this.props

    const IHaveVisibleChildren = hasVisibleChildren(this.props.children)
    const hasTextAndIcon = IHaveVisibleChildren && this.props.icon // any button with an icon + text label
    const hasOnlyIcon = !IHaveVisibleChildren && this.props.icon // any button with just an icon visible

    if (process.env.NODE_ENV !== 'production') {
      // show warning if icon is added as a child
      if (this.hasVisibleChildren) {
        React.Children.forEach(children, (child) => {
          const icon = child && child.type && typeof child.type.glyphName !== 'undefined'
          warning(
            !icon,
            `Adding icons to Button as children is deprecated. Please use the icon prop instead.`
          )
        })
      }
    }



    return (
      <View
        {...omitProps(this.props, { ...Button.propTypes, ...View.propTypes })}
        className={classnames({
          [styles.root]: true,
          [styles[variant]]: true,
          [styles[size]]: size,
          [styles[`width--${this.buttonWidth(hasOnlyIcon)}`]]: true,
          [styles[`borderRadius--${this.buttonBorderRadius()}`]]: true,
          [styles.disabled]: disabled,
          [styles['has-icon']]: icon
        })}
        disabled={disabled || readOnly}
        aria-disabled={disabled || readOnly ? 'true' : null}
        onClick={this.handleClick}
        onKeyDown={this.handleKeyDown}
        href={href}
        type={href ? null : type}
        role={onClick && as ? 'button' : null}
        tabIndex={onClick && as ? '0' : null}
        elementRef={c => {
          this._button = c
          if (typeof buttonRef === 'function') buttonRef(c)
        }}
        display={null}
        as={this.elementType}
        margin={margin}
      >
        {hasTextAndIcon ? (
          <Flex height="100%" width="100%">
            <FlexItem padding="0 x-small 0 0">{this.renderIcon()}</FlexItem>
            <FlexItem grow shrink>
              <span className={styles.content}>{children}</span>
            </FlexItem>
          </Flex>
        ) : (
          // all other button layouts (icon only and text only)
          <span className={styles.content}>
            {icon && this.renderIcon()}
            {children}
          </span>
        )}
      </View>
    )
  }
}

export default Button
