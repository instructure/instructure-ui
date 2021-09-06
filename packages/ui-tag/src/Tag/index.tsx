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

import { IconXSolid } from '@instructure/ui-icons'
import { View } from '@instructure/ui-view'
import { omitProps } from '@instructure/ui-react-utils'
import { isActiveElement } from '@instructure/ui-dom-utils'
import { testable } from '@instructure/ui-testable'
import { withStyle, jsx } from '@instructure/emotion'

import generateStyle from './styles'
import generateComponentTheme from './theme'
import type { TagProps } from './props'
import { allowedProps, propTypes } from './props'

/**
---
category: components
---
**/

@withStyle(generateStyle, generateComponentTheme)
@testable()
class Tag extends Component<TagProps> {
  static readonly componentId = 'Tag'

  static allowedProps = allowedProps
  static propTypes = propTypes
  static defaultProps = {
    size: 'medium',
    dismissible: false,
    variant: 'default',
    disabled: false,
    readOnly: false
  }

  componentDidMount() {
    this.props.makeStyles?.()
  }

  // @ts-expect-error ts-migrate(6133) FIXME: 'prevProps' is declared but its value is never rea... Remove this comment to see the full error message
  componentDidUpdate(prevProps, prevState, snapshot) {
    this.props.makeStyles?.()
  }

  get focused() {
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_container' does not exist on type 'Tag'... Remove this comment to see the full error message
    return isActiveElement(this._container)
  }

  focus = () => {
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_container' does not exist on type 'Tag'... Remove this comment to see the full error message
    this._container && this._container.focus()
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'e' implicitly has an 'any' type.
  handleClick = (e) => {
    const { disabled, readOnly, onClick } = this.props

    if (disabled || readOnly) {
      e.preventDefault()
      e.stopPropagation()
    } else if (typeof onClick === 'function') {
      onClick(e)
    }
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'node' implicitly has an 'any' type.
  handleRef = (node) => {
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_container' does not exist on type 'Tag'... Remove this comment to see the full error message
    this._container = node
  }

  render() {
    const {
      className,
      dismissible,
      disabled,
      readOnly,
      text,
      title,
      onClick,
      margin,
      styles
    } = this.props

    const passthroughProps = View.omitViewProps(
      omitProps(this.props, Tag.propTypes),
      Tag
    )

    return (
      <View
        {...passthroughProps}
        ref={this.handleRef}
        elementRef={this.props.elementRef}
        css={styles?.tag}
        className={className}
        as={onClick ? 'button' : 'span'}
        margin={margin}
        type={onClick ? 'button' : undefined}
        onClick={onClick ?? this.handleClick}
        disabled={disabled || readOnly}
        display={undefined}
        title={title || (typeof text === 'string' ? text : undefined)}
      >
        <span css={styles?.text}>{text}</span>
        {onClick && dismissible ? <IconXSolid css={styles?.icon} /> : null}
      </View>
    )
  }
}

export default Tag
export { Tag }
