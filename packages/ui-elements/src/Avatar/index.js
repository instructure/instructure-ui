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

import { View } from '@instructure/ui-view'
import { themeable, ThemeablePropTypes } from '@instructure/ui-themeable'
import { omitProps, deprecated } from '@instructure/ui-react-utils'
import { testable } from '@instructure/ui-testable'

import styles from './styles.css'
import theme from './theme'

/**
---
category: components/deprecated
id: DeprecatedAvatar
---
**/

@deprecated('7.0.0', null, 'Use Avatar from ui-avatar instead')
@testable()
@themeable(theme, styles)
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
    size: PropTypes.oneOf(['auto', 'x-small', 'small', 'medium', 'large', 'x-large']),
    variant: PropTypes.oneOf(['circle', 'rectangle']),
    /**
    * Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`,
    * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
    * familiar CSS-like shorthand. For example: `margin="small auto large"`.
    */
    margin: ThemeablePropTypes.spacing,
    inline: PropTypes.bool,
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
    elementRef: PropTypes.func
  }

  static defaultProps = {
    src: undefined,
    alt: undefined,
    margin: undefined,
    elementRef: undefined,
    size: 'medium',
    variant: 'circle',
    inline: true,
    onImageLoaded: (event) => {}
  }

  state = { loaded: false }

  makeInitialsFromName () {
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

  renderLoadImage () {
    // This image element is visually hidden and is here for loading purposes only
    return (
      <img
        src={this.props.src}
        className={styles.loadImage}
        alt={this.props.alt}
        onLoad={this.handleImageLoaded}
        aria-hidden="true"
      />
    )
  }

  renderInitials () {
    return (
      <span className={styles.initials} aria-hidden="true">
        {this.makeInitialsFromName()}
      </span>
    )
  }

  render () {
    const passthroughProps = View.omitViewProps(
      omitProps(this.props, Avatar.propTypes),
      Avatar
    )

    return (
      <View
        {...passthroughProps}
        style={{
          backgroundImage: this.state.loaded ? `url('${this.props.src}')` : undefined
        }}
        className={classnames({
          [styles.root]: true,
          [styles[this.props.size]]: true,
          [styles[this.props.variant]]: true
        })}
        aria-label={this.props.alt ? this.props.alt : null}
        role={this.props.alt ? 'img' : null}
        as={this.props.as}
        elementRef={this.props.elementRef}
        margin={this.props.margin}
        display={this.props.inline ? 'inline-block' : 'block'}
      >
        {this.renderLoadImage()}
        {!this.state.loaded && this.renderInitials()}
      </View>
    )
  }
}

export default Avatar
export { Avatar }
