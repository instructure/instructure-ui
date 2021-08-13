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
import PropTypes from 'prop-types'

import { View } from '@instructure/ui-view'
import { passthroughProps } from '@instructure/ui-react-utils'
import { testable } from '@instructure/ui-testable'
import { AsElementType } from '@instructure/shared-types'

import {
  withStyle,
  jsx,
  ThemeablePropTypes,
  Spacing
} from '@instructure/emotion'

import generateStyle from './styles'
import generateComponentTheme from './theme'

type Props = {
  makeStyles?: (...args: any[]) => any
  styles?: any
  /**
   * The name to display. It will be automatically converted to initials.
   */
  name: string
  /**
   * URL of the image to display as the background image
   */
  src?: string
  /**
   * Accessible label
   */
  alt?: string
  size:
    | 'auto'
    | 'xx-small'
    | 'x-small'
    | 'small'
    | 'medium'
    | 'large'
    | 'x-large'
    | 'xx-large'
  color:
    | 'default' // = brand
    | 'shamrock'
    | 'barney'
    | 'crimson'
    | 'fire'
    | 'licorice'
    | 'ash'
  shape: 'circle' | 'rectangle'
  display: 'inline-block' | 'block'
  /**
   * Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`,
   * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
   * familiar CSS-like shorthand. For example: `margin="small auto large"`.
   */
  margin?: Spacing
  /**
   * Callback fired when the avatar image has loaded
   */
  onImageLoaded: (event: SyntheticEvent) => void
  /**
   * The element type to render as
   */
  as?: AsElementType
  /**
   * Provides a reference to the underlying html element
   */
  elementRef?: (element: HTMLElement | null) => void
}

/**
---
category: components
---
@tsProps
**/
@withStyle(generateStyle, generateComponentTheme)
@testable()
class Avatar extends Component<Props> {
  static readonly componentId = 'Avatar'

  static propTypes = {
    // eslint-disable-next-line react/require-default-props
    makeStyles: PropTypes.func,
    // eslint-disable-next-line react/require-default-props
    styles: PropTypes.object,
    name: PropTypes.string.isRequired,
    src: PropTypes.string,
    alt: PropTypes.string,
    size: PropTypes.oneOf([
      'auto',
      'xx-small',
      'x-small',
      'small',
      'medium',
      'large',
      'x-large',
      'xx-large'
    ]),
    color: PropTypes.oneOf([
      'default',
      'shamrock',
      'barney',
      'crimson',
      'fire',
      'licorice',
      'ash'
    ]),
    shape: PropTypes.oneOf(['circle', 'rectangle']),
    margin: ThemeablePropTypes.spacing,
    display: PropTypes.oneOf(['inline-block', 'block']),
    onImageLoaded: PropTypes.func,
    as: PropTypes.elementType, // eslint-disable-line react/require-default-props
    elementRef: PropTypes.func
  }

  static defaultProps = {
    src: undefined,
    alt: undefined,
    margin: undefined,
    elementRef: undefined,
    size: 'medium',
    color: 'default',
    shape: 'circle',
    display: 'inline-block',
    onImageLoaded: (_event: SyntheticEvent) => {}
  }

  state = { loaded: false }

  componentDidMount() {
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.makeStyles(this.state)
  }

  componentDidUpdate() {
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.makeStyles(this.state)
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
      <span css={this.props.styles.initials} aria-hidden="true">
        {this.makeInitialsFromName()}
      </span>
    )
  }

  render() {
    const { onImageLoaded, styles, ...props } = this.props

    return (
      <View
        {...passthroughProps(props)}
        aria-label={this.props.alt ? this.props.alt : null}
        role={this.props.alt ? 'img' : null}
        as={this.props.as}
        elementRef={this.props.elementRef}
        margin={this.props.margin}
        css={styles.avatar}
        display={this.props.display}
      >
        <img // This is visually hidden and is here for loading purposes only
          src={this.props.src}
          css={this.props.styles.loadImage}
          alt={this.props.alt}
          onLoad={this.handleImageLoaded}
          aria-hidden="true"
        />
        {!this.state.loaded && this.renderInitials()}
      </View>
    )
  }
}

export default Avatar
export { Avatar }
