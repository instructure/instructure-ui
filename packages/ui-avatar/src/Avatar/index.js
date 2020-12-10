/* eslint-disable react/prop-types */
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

import { View } from '@instructure/ui-view'
import { ThemeablePropTypes } from '@instructure/ui-themeable'
import { passthroughProps } from '@instructure/ui-react-utils'
import { testable } from '@instructure/ui-testable'
import { withStyle, jsx } from '@instructure/emotion'

import generateStyles from './styles'

/**
---
category: components
---
**/

@withStyle(generateStyles)
@testable()
class Avatar extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    /*
     * URL of the image to display as the background image
     */
    src: PropTypes.string,
    /*
     * Accessible label
     */
    alt: PropTypes.string,
    size: PropTypes.oneOf([
      'auto',
      'x-small',
      'small',
      'medium',
      'large',
      'x-large'
    ]),
    shape: PropTypes.oneOf(['circle', 'rectangle']),
    /**
     * Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`,
     * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
     * familiar CSS-like shorthand. For example: `margin="small auto large"`.
     */
    margin: ThemeablePropTypes.spacing,
    display: PropTypes.oneOf(['inline-block', 'block']),
    /**
     * Callback fired when the avatar image has loaded
     */
    onImageLoaded: PropTypes.func,
    /**
     * the element type to render as
     */
    as: PropTypes.elementType, // eslint-disable-line react/require-default-props
    /**
     * provides a reference to the underlying html element
     */
    elementRef: PropTypes.func,
    // eslint-disable-next-line react/require-default-props
    makeStyles: PropTypes.func,
    // eslint-disable-next-line react/require-default-props
    styles: PropTypes.object
  }

  static defaultProps = {
    src: undefined,
    alt: undefined,
    margin: undefined,
    elementRef: undefined,
    size: 'medium',
    shape: 'circle',
    display: 'inline-block',
    onImageLoaded: (event) => {}
  }

  state = { loaded: false }

  componentDidMount() {
    this.props.makeStyles(this.state)
  }

  componentDidUpdate() {
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

  handleImageLoaded = (event) => {
    this.setState({ loaded: true })
    this.props.onImageLoaded(event)
  }

  renderLoadImage(styles) {
    // This image element is visually hidden and is here for loading purposes only
    return (
      <img
        src={this.props.src}
        css={styles.loadImage}
        alt={this.props.alt}
        onLoad={this.handleImageLoaded}
        aria-hidden="true"
      />
    )
  }

  renderInitials(styles) {
    return (
      <span css={styles.initials} aria-hidden="true">
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
        css={styles.root}
        display={
          this.props.display === 'block' || this.props.inline === false
            ? 'block'
            : 'inline-block'
        }
      >
        {this.renderLoadImage(styles)}
        {!this.state.loaded && this.renderInitials(styles)}
      </View>
    )
  }
}
export default Avatar
export { Avatar }
