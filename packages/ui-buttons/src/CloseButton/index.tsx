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
import { ScreenReaderContent } from '@instructure/ui-a11y-content'
import { testable } from '@instructure/ui-testable'
import { getInteraction, passthroughProps } from '@instructure/ui-react-utils'

import { withStyle, jsx } from '@instructure/emotion'

import generateStyle from './styles'
import generateComponentTheme from './theme'
import { BaseButton } from '../BaseButton'

import { propTypes, defaultProps, allowedProps } from './props'
import type { CloseButtonProps } from './props'

/**
---
category: components
---
**/
@withStyle(generateStyle, generateComponentTheme)
@testable()
class CloseButton extends Component<CloseButtonProps> {
  static readonly componentId = 'CloseButton'

  static propTypes = propTypes
  static allowedProps = allowedProps
  static defaultProps = defaultProps

  componentDidMount() {
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.makeStyles()
  }

  componentDidUpdate() {
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.makeStyles()
  }

  get interaction() {
    return getInteraction({ props: this.props })
  }

  get color() {
    const { color } = this.props

    return color === 'primary' ? 'secondary' : color
  }

  render() {
    const {
      screenReaderLabel,
      elementRef,
      size,
      onClick,
      margin,
      placement,
      offset,
      type,
      as,
      href,
      cursor,
      tabIndex,
      styles,
      ...props
    } = this.props

    return (
      <span {...passthroughProps(props)} css={styles?.closeButton}>
        <BaseButton
          renderIcon={IconXSolid}
          elementRef={elementRef}
          interaction={this.interaction}
          type={type}
          color={this.color}
          size={size}
          onClick={onClick}
          margin={margin}
          withBorder={false}
          withBackground={false}
          as={as}
          href={href}
          cursor={cursor}
          tabIndex={tabIndex}
        >
          <ScreenReaderContent>{screenReaderLabel}</ScreenReaderContent>
        </BaseButton>
      </span>
    )
  }
}

export default CloseButton
export { CloseButton }
