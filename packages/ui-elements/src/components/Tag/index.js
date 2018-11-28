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
import classNames from 'classnames'
import IconX from '@instructure/ui-icons/lib/Solid/IconX'

import View from '@instructure/ui-layout/lib/components/View'

import themeable from '@instructure/ui-themeable'
import ThemeablePropTypes from '@instructure/ui-themeable/lib/utils/ThemeablePropTypes'
import { omitProps } from '@instructure/ui-utils/lib/react/passthroughProps'
import isActiveElement from '@instructure/ui-utils/lib/dom/isActiveElement'
import testable from '@instructure/ui-testable'

import styles from './styles.css'
import theme from './theme'

/**
---
category: components
---
**/

@testable()
@themeable(theme, styles)
class Tag extends Component {
  static propTypes = {
    className: PropTypes.string,
    text: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
    title: PropTypes.string,
    /**
     * Whether or not to disable the tag
     */
    disabled: PropTypes.bool,
    /**
     * Works just like disabled but keeps the same styles as if it were active
     */
    readOnly: PropTypes.bool,
    dismissible: PropTypes.bool,
    /**
    * Valid values are `0`, `none`, `auto`, `xxxx-small`, `xx-small`, `x-small`,
    * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
    * familiar CSS-like shorthand. For example: `margin="small auto large"`.
    */
    margin: ThemeablePropTypes.spacing,
    /**
    * If you add an onClick prop, Tag renders as a clickable button
    */
    onClick: PropTypes.func,
    /**
    * Provides a reference to the underlying html root element
    */
    elementRef: PropTypes.func,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    variant: PropTypes.oneOf(['default', 'inline'])
  }

  static defaultProps = {
    size: 'medium',
    dismissible: false,
    variant: 'default'
  }

  get focused () {
    return isActiveElement(this._container)
  }

  focus = () => {
    this._container && this._container.focus()
  }

  handleClick = (e) => {
    const { disabled, readOnly, onClick } = this.props

    if (disabled || readOnly) {
      e.preventDefault()
      e.stopPropagation()
    } else if (typeof onClick === 'function') {
      onClick(e)
    }
  }

  handleRef = (node) => {
    this._container = node
  }

  render () {
    const {
      className,
      dismissible,
      disabled,
      readOnly,
      size,
      text,
      title,
      onClick,
      margin,
      variant
    } = this.props

    const classes = {
      [styles.root]: true,
      [styles[variant]]: true,
      [styles[size]]: size,
      [styles.dismissible]: dismissible,
      [styles.button]: onClick,
      [styles.disabled]: disabled
    }

    const passthroughProps = View.omitViewProps(
      omitProps(this.props, Tag.propTypes),
      Tag
    )

    return (
      <View
        {...passthroughProps}
        ref={this.handleRef}
        elementRef={this.props.elementRef}
        className={classNames(className, classes)}
        as={(onClick) ? 'button' : 'span'}
        margin={margin}
        type={(onClick) ? 'button' : null}
        onClick={(onClick) ? this.handleClick : null}
        disabled={disabled || readOnly}
        display={null}
        title={title || ((typeof text === 'string') ? text : null)}
      >
        <span className={styles.text}>
          {text}
        </span>
        {(onClick && dismissible)
          ? <IconX className={styles.icon} /> : null
        }
      </View>
    )
  }
}

export default Tag
