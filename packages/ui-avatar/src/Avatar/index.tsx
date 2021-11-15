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
import { Component, SyntheticEvent } from 'react'

import { View } from '@instructure/ui-view'
import { callRenderProp, passthroughProps } from '@instructure/ui-react-utils'
import { testable } from '@instructure/ui-testable'

import { withStyle, jsx } from '@instructure/emotion'

import generateStyle from './styles'
import generateComponentTheme from './theme'

import { propTypes, allowedProps } from './props'
import type { AvatarProps, AvatarState } from './props'

/**
---
category: components
---
@tsProps
**/
@withStyle(generateStyle, generateComponentTheme)
@testable()
class Avatar extends Component<AvatarProps, AvatarState> {
  static readonly componentId = 'Avatar'

  static propTypes = propTypes
  static allowedProps = allowedProps
  static defaultProps = {
    size: 'medium',
    color: 'default',
    hasInverseColor: false,
    shape: 'circle',
    display: 'inline-block',
    onImageLoaded: (_event: SyntheticEvent) => {}
  } as const

  state = { loaded: false }

  ref: Element | null = null

  handleRef = (el: Element | null) => {
    const { elementRef } = this.props

    this.ref = el

    if (typeof elementRef === 'function') {
      elementRef(el)
    }
  }

  componentDidMount() {
    this.props.makeStyles?.(this.state)
  }

  componentDidUpdate() {
    this.props.makeStyles?.(this.state)

    // in case the image is unset in an update, show icons/initials again
    if (this.state.loaded && !this.props.src) {
      this.setState({ loaded: false })
    }
  }

  makeInitialsFromName() {
    let name = this.props.name

    if (!name || typeof name !== 'string') {
      return
    }
    name = name.trim()
    if (name.length === 0) {
      return
    }

    if (name.match(/\s+/)) {
      const names = name.split(/\s+/)
      return (names[0][0] + names[names.length - 1][0]).toUpperCase()
    } else {
      return name[0].toUpperCase()
    }
  }

  handleImageLoaded = (event: SyntheticEvent) => {
    this.setState({ loaded: true })
    this.props.onImageLoaded(event)
  }

  renderInitials() {
    return (
      <span css={this.props.styles?.initials} aria-hidden="true">
        {this.makeInitialsFromName()}
      </span>
    )
  }

  renderContent() {
    const { renderIcon, styles } = this.props

    if (!renderIcon) {
      return this.renderInitials()
    }

    return <span css={styles?.iconSVG}>{callRenderProp(renderIcon)}</span>
  }

  render() {
    const { onImageLoaded, styles, ...props } = this.props

    return (
      <View
        {...passthroughProps(props)}
        aria-label={this.props.alt ? this.props.alt : undefined}
        role={this.props.alt ? 'img' : undefined}
        as={this.props.as}
        elementRef={this.handleRef}
        margin={this.props.margin}
        css={styles?.avatar}
        display={this.props.display}
      >
        <img // This is visually hidden and is here for loading purposes only
          src={this.props.src}
          css={this.props.styles?.loadImage}
          alt={this.props.alt}
          onLoad={this.handleImageLoaded}
          aria-hidden="true"
        />
        {!this.state.loaded && this.renderContent()}
      </View>
    )
  }
}

export default Avatar
export { Avatar }
