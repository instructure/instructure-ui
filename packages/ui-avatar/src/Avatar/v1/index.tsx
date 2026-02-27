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

import { useStyleLegacy as useStyle } from '@instructure/emotion'
import {
  useState,
  SyntheticEvent,
  useEffect,
  forwardRef,
  ForwardedRef,
  useRef
} from 'react'

import { View } from '@instructure/ui-view/v11_5'
import { callRenderProp, passthroughProps } from '@instructure/ui-react-utils'
import type { AvatarProps } from './props'

import generateStyle from './styles'
import generateComponentTheme from './theme'

/**
---
category: components
---
**/
const Avatar = forwardRef(
  (
    {
      size = 'medium',
      color = 'default',
      hasInverseColor = false,
      showBorder = 'auto',
      shape = 'circle',
      display = 'inline-block',
      onImageLoaded,
      src,
      name,
      renderIcon,
      alt,
      as,
      margin,
      themeOverride,
      elementRef,
      ...rest
    }: AvatarProps,
    ref: ForwardedRef<View>
  ) => {
    const imgRef = useRef<HTMLImageElement>(null)
    const [loaded, setLoaded] = useState(false)

    const styles = useStyle({
      generateStyle,
      generateComponentTheme,
      params: {
        loaded,
        size,
        color,
        hasInverseColor,
        shape,
        src,
        showBorder,
        themeOverride
      },
      componentId: 'Avatar',
      displayName: 'Avatar'
    })

    useEffect(() => {
      // in case the image is unset in an update, show icons/initials again
      if (loaded && !src) {
        setLoaded(false)
      }
      // Image already loaded (common in SSR)
      if (src && !loaded && imgRef.current && imgRef.current.complete) {
        setLoaded(true)
        onImageLoaded?.()
      }
    }, [loaded, src])

    const makeInitialsFromName = () => {
      if (!name || typeof name !== 'string') {
        return
      }
      const currentName = name.trim()
      if (currentName.length === 0) {
        return
      }

      if (currentName.match(/\s+/)) {
        const names = currentName.split(/\s+/)
        return (names[0][0] + names[names.length - 1][0]).toUpperCase()
      } else {
        return currentName[0].toUpperCase()
      }
    }

    const handleImageLoaded = (event: SyntheticEvent) => {
      setLoaded(true)
      onImageLoaded?.(event)
    }

    const renderInitials = () => {
      return (
        <span css={styles?.initials} aria-hidden="true">
          {makeInitialsFromName()}
        </span>
      )
    }

    const renderContent = () => {
      if (!renderIcon) {
        return renderInitials()
      }

      return <span css={styles?.iconSVG}>{callRenderProp(renderIcon)}</span>
    }

    return (
      <View
        {...passthroughProps({
          size,
          color,
          hasInverseColor,
          showBorder,
          shape,
          display,
          src,
          name,
          renderIcon,
          alt,
          as,
          margin,
          ...rest
        })}
        ref={ref}
        aria-label={alt ? alt : undefined}
        role={alt ? 'img' : undefined}
        as={as}
        elementRef={elementRef}
        margin={margin}
        css={styles?.avatar}
        display={display}
      >
        <img // This is visually hidden and is here for loading purposes only
          src={src}
          ref={imgRef}
          css={styles?.loadImage}
          alt={alt}
          onLoad={handleImageLoaded}
          aria-hidden="true"
        />
        {!loaded && renderContent()}
      </View>
    )
  }
)
Avatar.displayName = 'Avatar'

// TODO - why is this needed?
Avatar.displayName = 'Avatar'

export default Avatar
export { Avatar }
