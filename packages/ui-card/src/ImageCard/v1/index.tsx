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
import { useEffect, useRef, useState } from 'react'
import { useStyleNew } from '@instructure/emotion'
import { passthroughProps } from '@instructure/ui-react-utils'
import { Heading } from '@instructure/ui-heading/latest'

import type { ImageCardProps } from './props.js'
import generateStyle from './styles.js'

const headingVariantsBySize: {
  sm: 'titleCardMini'
  md: 'titleCardRegular'
  lg: 'titleCardLarge'
} = {
  sm: 'titleCardMini',
  md: 'titleCardRegular',
  lg: 'titleCardLarge'
}

/**
---
category: components/Cards
---
**/
const ImageCard = ({
  children,
  src,
  alt,
  title,
  titleLevel = 'h3',
  themeOverride,
  ...rest
}: ImageCardProps) => {
  const styles = useStyleNew({
    generateStyle,
    themeOverride,
    componentId: 'ImageCard',
    displayName: 'ImageCard'
  })

  const [size, setSize] = useState<'sm' | 'md' | 'lg'>('md')

  const ref = useRef<HTMLDivElement>(null)

  const getBreakpointsInPx = (breakpointMd: any, breakpointLg: any) => {
    const fontSize = Number(
      getComputedStyle(document.documentElement).fontSize.slice(0, -2)
    )

    return {
      // assume <NUMBER>rem format every time
      breakpointMd: Number(breakpointMd.slice(0, -3)) * fontSize,
      breakpointLg: Number(breakpointLg.slice(0, -3)) * fontSize
    }
  }

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new ResizeObserver(([entry]) => {
      const { width } = entry.contentRect
      const { breakpointMd, breakpointLg } = getBreakpointsInPx(
        styles.breakpointMd,
        styles.breakpointLg
      )

      if (width < breakpointMd) {
        setSize('sm')
      } else if (width >= breakpointLg) {
        setSize('lg')
      } else {
        setSize('md')
      }
    })

    observer.observe(element)

    return () => observer.disconnect()
  }, [styles.breakpointMd, styles.breakpointLg])

  return (
    <div {...passthroughProps(rest)} css={styles?.card} ref={ref}>
      <div css={styles?.container}>
        <img src={src} alt={alt} css={styles?.img} />
        <Heading level={titleLevel} variant={headingVariantsBySize[size]}>
          {title}
        </Heading>
        <div css={styles?.content}>{children}</div>
      </div>
    </div>
  )
}

export default ImageCard
export { ImageCard }
