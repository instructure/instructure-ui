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
import React, { Component } from 'react'

import { getElementType, omitProps } from '@instructure/ui-react-utils'
import { testable } from '@instructure/ui-testable'

import { withStyle, jsx } from '@instructure/emotion'

import { ScreenReaderContent } from '@instructure/ui-a11y-content'
import { View } from '@instructure/ui-view'

import { TopNavBarContext } from '../TopNavBarContext'

import generateStyle from './styles'
import generateComponentTheme from './theme'

import { propTypes, allowedProps } from './props'
import type { TopNavBarBrandProps, TopNavBarBrandStyleProps } from './props'

/**
---
parent: TopNavBar
id: TopNavBar.Brand
---
@module TopNavBarBrand
@tsProps
**/
@withStyle(generateStyle, generateComponentTheme)
@testable()
class TopNavBarBrand extends Component<TopNavBarBrandProps> {
  static readonly componentId = 'TopNavBar.Brand'
  // TODO: add to the docs: making it static on parent and jsdocs parent/module settings, dont export child on its own

  static propTypes = propTypes
  static allowedProps = allowedProps
  static defaultProps = {}

  declare context: React.ContextType<typeof TopNavBarContext>
  static contextType = TopNavBarContext

  ref: HTMLDivElement | null = null

  handleRef = (el: HTMLDivElement | null) => {
    const { elementRef } = this.props

    this.ref = el

    if (typeof elementRef === 'function') {
      elementRef(el)
    }
  }

  componentDidMount() {
    this.props.makeStyles?.(this.makeStylesVariables)
  }

  componentDidUpdate() {
    this.props.makeStyles?.(this.makeStylesVariables)
  }

  get makeStylesVariables(): TopNavBarBrandStyleProps {
    return {
      layout: this.context.layout
    }
  }

  render() {
    const { screenReaderLabel, renderName, renderIcon, href, onClick, styles } =
      this.props

    const ElementType = getElementType(TopNavBarBrand, this.props)

    return (
      <div ref={this.handleRef} css={styles?.topNavBarBrand}>
        {(renderIcon || renderName) && (
          <View
            {...omitProps(this.props, allowedProps)}
            css={styles?.container}
            as={ElementType}
            href={href}
            onClick={onClick}
            position="relative"
            focusColor={this.context.inverseColor ? 'info' : 'inverse'}
            focusPosition="inset"
            borderRadius="medium"
            themeOverride={{ focusOutlineInset: styles?.focusOutlineInset }}
          >
            <ScreenReaderContent>{screenReaderLabel}</ScreenReaderContent>
            {renderIcon && this.context.layout !== 'smallViewport' && (
              <div
                css={styles?.iconContainer}
                role="presentation"
                aria-hidden="true"
              >
                {renderIcon}
              </div>
            )}
            {renderName && (
              <div
                css={styles?.nameContainer}
                role="presentation"
                aria-hidden="true"
              >
                {renderName}
              </div>
            )}
          </View>
        )}
      </div>
    )
  }
}

export { TopNavBarBrand }
export default TopNavBarBrand
