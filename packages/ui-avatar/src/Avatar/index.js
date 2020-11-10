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
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useStyle, jsx  } from "@instructure/emotion"
import { ThemeablePropTypes } from '@instructure/ui-themeable'
import { View } from '@instructure/ui-view'
import { withTestable } from '@instructure/ui-testable'
import { useDeprecated, passthroughProps } from '@instructure/ui-react-utils'
import generateStyle from "./styles"

/**
---
category: components
---
**/

const Avatar = (props) => {
  useDeprecated({ componentName: Avatar.name, version: '8.0', oldProps: {
  inline: 'display',
  variant: 'shape'
  }, props })

  const [loaded, setLoaded] = useState(false)
  const { onImageLoaded, ...restProps } = props

  const styles = useStyle(Avatar.name, generateStyle, props, { loaded })

  const renderLoadImage =  () => {
    // This image element is visually hidden and is here for loading purposes only
    return (
      <img
        src={props.src}
        css={styles.loadImage}
        alt={props.alt}
        onLoad={handleImageLoaded}
        aria-hidden="true"
      />
    )
  }

  const handleImageLoaded = (event) => {
    setLoaded(true)
    onImageLoaded(event)
  }

  const renderInitials = () => {
    return (
      <span css={styles.initials} aria-hidden="true">
        {makeInitialsFromName()}
      </span>
    )
  }

 const makeInitialsFromName = () => {
    let nameForInitials = props.name

    if (!nameForInitials || typeof nameForInitials !== 'string') {
      return
    }
    nameForInitials = nameForInitials.trim()
    if (nameForInitials.length === 0) {
      return
    }

    if (nameForInitials.match(/\s+/)) {
      const names = nameForInitials.split(/\s+/)
      return (names[0][0] + names[names.length - 1][0]).toUpperCase()
    } else {
      return nameForInitials[0].toUpperCase()
    }
  }

 return (
      <View
        {...passthroughProps(restProps)}
        css={styles.root}
        aria-label={props.alt ? props.alt : null}
        role={props.alt ? 'img' : null}
        as={props.as}
        elementRef={props.elementRef}
        margin={props.margin}
        display={(props.display === 'block' || props.inline === false) ? 'block' : 'inline-block'}
      >
        {renderLoadImage()}
        {!loaded && renderInitials()}
      </View>
    )
}

Avatar.propTypes = {
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
  /* eslint-disable react/require-default-props */
  /**
  * __Deprecated - use `display`__
  */
  inline: PropTypes.bool,
  /**
   * __Deprecated - use `shape`__
   */
  variant: PropTypes.oneOf(['circle', 'rectangle']),
  /* eslint-enable react/require-default-props */
  themeOverride: PropTypes.object
}

Avatar.defaultProps = {
    src: undefined,
    alt: undefined,
    margin: undefined,
    elementRef: undefined,
    size: 'medium',
    shape: 'circle',
    display: 'inline-block',
    onImageLoaded: () => {},
    themeOverride: {}
}

//TODO: remove this HOC call when we implement a new testing solution
const Avatar__Testable = withTestable(Avatar)

export default Avatar__Testable
export { Avatar__Testable as Avatar }
