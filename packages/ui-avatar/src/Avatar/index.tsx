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

import { useStyle, useTheme } from '@instructure/emotion'
import { useState, useEffect, forwardRef, SyntheticEvent } from 'react'

import {
  callRenderProp,
  passthroughProps,
  safeCloneElement
} from '@instructure/ui-react-utils'
import type { AvatarProps } from './props'

import generateStyle from './styles'

/**
---
category: components
---
**/
const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  (props: AvatarProps, ref) => {
    const {
      size = 'medium',
      color = 'accent1',
      hasInverseColor = false,
      showBorder = 'auto',
      shape = 'circle',
      display = 'inline',
      onImageLoaded = (_event: SyntheticEvent) => {},
      src,
      name,
      renderIcon,
      alt,
      themeOverride,
      margin
    } = props
    const [loaded, setLoaded] = useState(false)
    const theme = useTheme()
    const iconTokens = (theme as any).newTheme.components.Icon

    const styles = useStyle({
      generateStyle,
      themeOverride,
      params: {
        loaded,
        size,
        color,
        hasInverseColor,
        shape,
        src,
        showBorder,
        display,
        margin,
        iconTokens
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
      //TODO-rework make this work
      // if (src && !loaded && imgRef.current && imgRef.current.complete) {
      //   setLoaded(true)
      //   onImageLoaded?.()
      // }
    }, [loaded, src])

    const makeInitialsFromName = () => {
      if (!name || typeof name !== 'string' || name.trim().length === 0) {
        return
      }
      const currentName = name.trim()

      if (currentName.match(/\s+/)) {
        const names = currentName.split(/\s+/)
        return (names[0][0] + names[names.length - 1][0]).toUpperCase()
      } else {
        return currentName[0].toUpperCase()
      }
    }

    const renderInitials = () => {
      return <span aria-hidden="true">{makeInitialsFromName()}</span>
    }

    const renderImage = () => (
      <img
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          ...(loaded ? {} : { display: 'none' })
        }}
        src={src}
        alt={alt ? alt : ''}
        onLoad={(event: SyntheticEvent) => {
          setLoaded(true)
          onImageLoaded(event)
        }}
      />
    )

    const colorToIconMapping = {
      accent1: 'accentBlueColor',
      accent2: 'accentGreenColor',
      accent3: 'accentRedColor',
      accent4: 'accentOrangeColor',
      accent5: 'accentGreyColor',
      accent6: 'accentAshColor',
      ai: ''
    }

    const renderIconHandler = () =>
      safeCloneElement(callRenderProp(renderIcon), {
        color: colorToIconMapping[color]
      })

    const renderContent = () => {
      //image in avatar - prioritize image over icon
      if (src) {
        return (
          <>
            {renderImage()}
            {loaded ? null : renderInitials()}
          </>
        )
      }

      //icon in avatar
      //TODO-REWORK make the icon inherit the size prop of the Avatar when the icons have it
      if (renderIcon) {
        return renderIconHandler()
      }

      //initials in avatar
      return renderInitials()
    }

    return (
      <div
        {...passthroughProps({ ...props })}
        ref={ref}
        aria-label={alt ? alt : undefined}
        role={alt ? 'img' : undefined}
        css={styles?.avatar}
      >
        {renderContent()}
      </div>
    )
  }
)

Avatar.displayName = 'Avatar'

export default Avatar
export { Avatar }
