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

import { jsx, withStyle } from '@instructure/emotion'
import { omitProps } from '@instructure/ui-react-utils'

import { View } from '../View'

import generateStyle from './styles'
import generateComponentTheme from './theme'
import { propTypes, allowedProps } from './props'
import type { ContextViewProps } from './props'

/**
---
category: components
---
@tsProps
**/

@withStyle(generateStyle, generateComponentTheme)
class ContextView extends Component<ContextViewProps> {
  static readonly componentId = 'ContextView'
  static allowedProps = allowedProps
  static propTypes = propTypes
  static defaultProps = {
    as: 'span',
    elementRef: () => {},
    debug: false,
    width: 'auto',
    height: 'auto',
    children: null,
    textAlign: 'start',
    background: 'default',
    shadow: 'resting',
    placement: 'center end'
  }

  componentDidMount() {
    this.props.makeStyles?.()
  }

  componentDidUpdate() {
    this.props.makeStyles?.()
  }

  ref: Element | null = null

  handleRef = (el: Element | null) => {
    const { elementRef } = this.props

    this.ref = el

    if (typeof elementRef === 'function') {
      elementRef(el)
    }
  }

  render() {
    const {
      as,
      background,
      children,
      debug,
      height,
      width,
      maxHeight,
      maxWidth,
      minHeight,
      minWidth,
      margin,
      padding,
      shadow,
      stacking,
      style,
      textAlign,
      styles
    } = this.props

    return (
      <View
        {...omitProps(this.props, ContextView.allowedProps)}
        css={styles?.contextView}
        style={style}
        borderWidth="none"
        display="inline-block"
        as={as}
        withVisualDebug={debug}
        elementRef={this.handleRef}
        margin={margin}
        stacking={stacking}
      >
        <View
          css={styles?.contextView__content}
          display="block"
          borderRadius="medium"
          borderWidth="small"
          borderColor={background === 'default' ? 'primary' : 'transparent'}
          background={background === 'default' ? 'primary' : 'primary-inverse'}
          withVisualDebug={debug}
          height={height}
          width={width}
          maxHeight={maxHeight}
          maxWidth={maxWidth}
          minHeight={minHeight}
          minWidth={minWidth}
          padding={padding}
          shadow={shadow}
          textAlign={textAlign}
        >
          <span css={styles?.contextView__arrow} />
          {children}
        </View>
      </View>
    )
  }
}

export default ContextView
export { ContextView }
