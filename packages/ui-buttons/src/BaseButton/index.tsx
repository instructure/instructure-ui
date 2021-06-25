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

/** @jsx jsx */
import { Component } from 'react'
import PropTypes from 'prop-types'
import keycode from 'keycode'

import { testable } from '@instructure/ui-testable'
import {
  getElementType,
  getInteraction,
  passthroughProps,
  callRenderProp,
  InteractionType
} from '@instructure/ui-react-utils'
import { isActiveElement } from '@instructure/ui-dom-utils'
import { hasVisibleChildren } from '@instructure/ui-a11y-utils'
import { View } from '@instructure/ui-view'

import {
  withStyle,
  jsx,
  ThemeablePropTypes,
  Spacing
} from '@instructure/emotion'

import generateStyles from './styles'
import generateComponentTheme from './theme'

type Props = {
  makeStyles?: (...args: any[]) => any
  styles?: any
  type?: 'button' | 'submit' | 'reset'
  size?: 'small' | 'medium' | 'large'
  elementRef?: (...args: any[]) => any
  as?: React.ReactElement | string
  interaction?: InteractionType
  color?: 'primary' | 'primary-inverse' | 'secondary' | 'success' | 'danger'
  focusColor?: 'info' | 'inverse'
  display?: 'inline-block' | 'block'
  textAlign?: 'start' | 'center'
  shape?: 'rectangle' | 'circle'
  withBackground?: boolean
  withBorder?: boolean
  isCondensed?: boolean
  margin?: Spacing
  cursor?: string
  href?: string
  onClick?: (...args: any[]) => any
  onKeyDown?: (...args: any[]) => any
  renderIcon?: React.ReactNode | ((...args: any[]) => any)
  tabIndex?: number | string
}

/**
---
category: components/utilities
---
**/

@withStyle(generateStyles, generateComponentTheme)
@testable()
class BaseButton extends Component<Props> {
  static componentId = 'BaseButton'

  static propTypes = {
    // eslint-disable-next-line react/require-default-props
    makeStyles: PropTypes.func,
    // eslint-disable-next-line react/require-default-props
    styles: PropTypes.object,
    /**
     * Specifies the `Button` children.
     */
    children: PropTypes.node,
    /**
     * Specifies the type of the `Button`'s underlying html element.
     */
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
    /**
     * The size of the `Button`
     */
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    /**
     * Provides a reference to the `Button`'s underlying html element.
     */
    elementRef: PropTypes.func,
    /**
     * The element to render as the component root, `Button` by default.
     */
    as: PropTypes.elementType,
    /**
     * Specifies if interaction with the `Button` is enabled, disabled, or readonly.
     */
    interaction: PropTypes.oneOf(['enabled', 'disabled', 'readonly']),
    /**
     * Specifies the color for the `Button`.
     */
    color: PropTypes.oneOf([
      'primary',
      'primary-inverse',
      'secondary',
      'success',
      'danger'
    ]),
    /**
     * Override the `Button`'s default focus outline color.
     */
    focusColor: PropTypes.oneOf(['info', 'inverse']),
    /**
     * The `Button` display property. When set to `inline-block`, the `Button` displays inline with other elements.
     * When set to block, the `Button` expands to fill the width of the container.
     */
    display: PropTypes.oneOf(['inline-block', 'block']),
    /**
     * Sets the alignment of the `Button` children and/or icon.
     */
    textAlign: PropTypes.oneOf(['start', 'center']),
    /**
     * Specifies if the `Button` shape should be a circle or rectangle.
     */
    shape: PropTypes.oneOf(['rectangle', 'circle']),
    /**
     * Specifies if the `Button` should render with a solid background. When false, the background is transparent.
     */
    withBackground: PropTypes.bool,
    /**
     * Specifies if the `Button` should render with a border.
     */
    withBorder: PropTypes.bool,
    /**
     * Designates if the `Button` should render without padding. This option should only be set when `withBorder` and
     * `withBackground` are also set to false.
     */
    isCondensed: PropTypes.bool,
    /**
     * Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`,
     * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
     * familiar CSS-like shorthand. For example: `margin="small auto large"`.
     */
    margin: ThemeablePropTypes.spacing,
    /**
     * Specify a mouse cursor to use when hovering over the button.
     * The `pointer` cursor is used by default.
     */
    cursor: PropTypes.string,
    /**
     * Specifies an href attribute for the `Button`'s underlying html element.
     */
    href: PropTypes.string,
    /**
     * Callback fired when the `Button` is clicked.
     */
    onClick: PropTypes.func,
    /**
     * Callback fired when the `Button` receives a keydown event.
     */
    onKeyDown: PropTypes.func,
    /**
     * An icon, or function that returns an icon.
     */
    renderIcon: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    /**
     * Specifies the tabindex of the `Button`.
     */
    tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  }

  static defaultProps = {
    children: null,
    type: 'button',
    size: 'medium',
    // @ts-expect-error ts-migrate(6133) FIXME: 'el' is declared but its value is never read.
    elementRef: (el) => {},
    as: 'button',
    // Leave interaction default undefined so that `disabled` and `readOnly` can also be supplied
    interaction: undefined,
    color: 'secondary',
    focusColor: undefined,
    shape: 'rectangle',
    display: 'inline-block',
    textAlign: 'start',
    withBackground: true,
    withBorder: true,
    isCondensed: false,
    margin: '0',
    cursor: 'pointer',
    href: undefined,
    onClick: undefined,
    // @ts-expect-error ts-migrate(6133) FIXME: 'event' is declared but its value is never read.
    onKeyDown: (event) => {},
    renderIcon: undefined,
    tabIndex: undefined
  }

  _rootElement = null

  componentDidMount() {
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.makeStyles(this.makeStylesVariables)
  }

  // @ts-expect-error ts-migrate(6133) FIXME: 'prevProps' is declared but its value is never rea... Remove this comment to see the full error message
  componentDidUpdate(prevProps, prevState, snapshot) {
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.makeStyles(this.makeStylesVariables)
  }

  get makeStylesVariables() {
    return {
      isDisabled: this.isDisabled,
      hasOnlyIconVisible: this.hasOnlyIconVisible
    }
  }

  get hasOnlyIconVisible() {
    const { children, renderIcon } = this.props
    return renderIcon && !hasVisibleChildren(children)
  }

  get elementType() {
    return getElementType(BaseButton, this.props)
  }

  get interaction() {
    return getInteraction({ props: this.props })
  }

  get isDisabled() {
    return this.interaction === 'disabled'
  }

  get isReadOnly() {
    return this.interaction === 'readonly'
  }

  get isEnabled() {
    return this.interaction === 'enabled'
  }

  get focusColor() {
    const { color, focusColor, withBackground } = this.props

    // Give user specified focusColor preference
    if (focusColor) {
      return focusColor
    }

    // The `primary-inverse` background has an info focus outline
    // by default since it is replacing the `light` button variant.
    // Override the focus color with info even though it is
    // an inverse color
    if (color === 'primary-inverse' && withBackground) {
      return 'info'
    }

    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    return color.includes('inverse') ? 'inverse' : 'info'
  }

  get focused() {
    return isActiveElement(this._rootElement)
  }

  focus() {
    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
    this._rootElement && this._rootElement.focus()
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'el' implicitly has an 'any' type.
  handleElementRef = (el) => {
    this._rootElement = el
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.elementRef(el)
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
  handleClick = (event) => {
    const { onClick } = this.props
    const { interaction } = this

    if (interaction !== 'enabled') {
      event.preventDefault()
      event.stopPropagation()
      return
    }

    if (typeof onClick === 'function') {
      onClick(event)
    }
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
  handleKeyDown = (event) => {
    const { onClick, onKeyDown, href } = this.props
    const { interaction } = this

    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    onKeyDown(event)

    // behave like a button when space key is pressed
    const { space, enter } = keycode.codes

    if (
      this.elementType !== 'button' &&
      [space, enter].includes(event.keyCode)
    ) {
      event.preventDefault()
      event.stopPropagation()

      if (typeof onClick === 'function' && interaction === 'enabled') {
        onClick(event)
      }

      if (href) {
        // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
        this._rootElement && this._rootElement.click()
      }
    }
  }

  renderChildren() {
    const { renderIcon, children, styles } = this.props

    const wrappedChildren = <span css={styles.children}>{children}</span>

    if (!renderIcon) {
      return wrappedChildren
    }

    const { hasOnlyIconVisible } = this
    const wrappedIcon = (
      <span css={styles.iconSVG}>{callRenderProp(renderIcon)}</span>
    )

    const flexChildren = hasOnlyIconVisible ? (
      <span css={styles.iconOnly}>
        {wrappedIcon}
        {children}
      </span>
    ) : (
      [
        <span key="icon" css={styles.iconWrapper}>
          {wrappedIcon}
        </span>,
        <span key="children" css={styles.childrenWrapper}>
          {wrappedChildren}
        </span>
      ]
    )
    return <span css={styles.childrenLayout}>{flexChildren}</span>
  }

  render() {
    const {
      type,
      size,
      elementRef,
      as,
      href,
      color,
      focusColor,
      textAlign,
      shape,
      display,
      withBackground,
      withBorder,
      isCondensed,
      margin,
      cursor,
      onClick,
      renderIcon,
      tabIndex,
      styles,
      makeStyles,
      ...props
    } = this.props

    const { isDisabled, isEnabled, isReadOnly } = this

    return (
      <View
        {...passthroughProps(props)}
        as={this.elementType}
        focusColor={this.focusColor}
        position="relative"
        display={display}
        width={display === 'block' ? '100%' : 'auto'}
        borderRadius={shape === 'circle' ? 'circle' : 'medium'}
        background="transparent"
        padding="none"
        borderWidth="none"
        margin={margin}
        cursor={isDisabled ? 'not-allowed' : cursor}
        href={href}
        type={href ? null : type}
        elementRef={this.handleElementRef}
        onClick={this.handleClick}
        onKeyDown={this.handleKeyDown}
        role={onClick && as !== 'button' ? 'button' : null}
        tabIndex={onClick && as ? tabIndex || '0' : tabIndex}
        disabled={isDisabled || isReadOnly}
        css={isEnabled ? styles.baseButton : null}
      >
        <span css={styles.content}>{this.renderChildren()}</span>
      </View>
    )
  }
}

export { BaseButton }
export default BaseButton
