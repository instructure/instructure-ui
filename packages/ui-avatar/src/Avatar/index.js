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
import { jsx, css } from '@emotion/core'
import React, {useState} from 'react'
import { useStyle, EmotionThemeProvider } from "@instructure/emotion"
import generateStyle from "./styles"
import { View } from '@instructure/ui-view'

/**
---
category: components
---
**/

const Avatar = (props) => {
  const [loaded, setLoaded] = useState(false)
  const {
    themeOverride,
    src,
    display,
    onImageLoaded,
    name,
    inline,
    margin,
    elementRef,
    as,
    alt,
    } = props

  const styles = useStyle(Avatar.name,generateStyle, themeOverride, props, {loaded})
  const renderLoadImage =  () => {
    // This image element is visually hidden and is here for loading purposes only
    return (
      <img
        src={src}
        css={styles.loadImage}
        alt={alt}
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
    let nameForInitials = name

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
        css={styles.root}
        aria-label={alt ? alt : null}
        role={alt ? 'img' : null}
        as={as}
        elementRef={elementRef}
        margin={margin}
        display={(display === 'block' || inline === false) ? 'block' : 'inline-block'}
      >
        {renderLoadImage()}
        {!loaded && renderInitials()}
      </View>
    )
}

Avatar.defaultProps = {
  size:'medium',
  shape: 'circle',
  display: 'inline-block',
  onImageLoaded: (event) => {}
}


export default Avatar
export { Avatar }
