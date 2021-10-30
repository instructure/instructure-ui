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
import type { ComponentStyle, WithStyleProps } from '@instructure/emotion'
import type { Colors, PropValidators } from '@instructure/shared-types'
import PropTypes from 'prop-types'
import React from 'react'

type HeroOwnProps = {
  name: string
  repository: string
  version: string
  layout: 'small' | 'medium' | 'large' | 'x-large'
  description: string
  docs: React.ReactNode
}

type PropKeys = keyof HeroOwnProps

type AllowedPropKeys = Readonly<Array<PropKeys>>

type HeroProps = HeroOwnProps & WithStyleProps<HeroTheme, HeroStyle>

const propTypes: PropValidators<PropKeys> = {
  name: PropTypes.string.isRequired,
  repository: PropTypes.string.isRequired,
  version: PropTypes.string.isRequired,
  layout: PropTypes.oneOf(['small', 'medium', 'large', 'x-large']).isRequired,
  description: PropTypes.string,
  docs: PropTypes.object
}

const allowedProps: AllowedPropKeys = [
  'description',
  'docs',
  'layout',
  'name',
  'repository',
  'version'
]
type HeroStyle = ComponentStyle<
  'backgroundColor' | 'overlayLayout' | 'contentLayout' | 'content'
>

type HeroTheme = {
  backgroundColor: Colors['backgroundBrand']
}
export type { HeroStyle, HeroTheme }
export type { HeroProps }
export { allowedProps, propTypes }
