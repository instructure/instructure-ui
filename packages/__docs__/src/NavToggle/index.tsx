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

import { Component } from 'react'

import { ToggleDetails } from '@instructure/ui-toggle-details'
import { Text } from '@instructure/ui-text'
import { View } from '@instructure/ui-view'
import { InstUISettingsProvider } from '@instructure/emotion'
import type { NavToggleProps } from './props'
import { propTypes, allowedProps } from './props'

class NavToggle extends Component<NavToggleProps> {
  static propTypes = propTypes
  static allowedProps = allowedProps
  static defaultProps = {
    variant: 'section',
    children: null,
    shouldBlur: false
  }
  private _toggle: ToggleDetails | null = null

  focus() {
    this._toggle?.focus()
  }

  blurNavToggle = () => {
    const { shouldBlur } = this.props
    if (shouldBlur && document.activeElement instanceof HTMLElement) {
      document.activeElement.blur()
    }
  }

  render() {
    const { summary, variant, shouldBlur, ...props } = this.props

    const isSection = variant === 'section'

    const summaryContent = (
      <View display="block">
        <Text
          transform="capitalize"
          size="medium"
          color="primary"
          lineHeight="fit"
        >
          {summary}
        </Text>
      </View>
    )

    return (
      <View
        display="block"
        padding="x-small none"
        margin={isSection ? 'none' : 'none none none x-small'}
        onClick={this.blurNavToggle}
        as={'div'}
      >
        <InstUISettingsProvider>
          <ToggleDetails
            ref={(c: ToggleDetails) => {
              this._toggle = c
            }}
            fluidWidth
            {...props}
            summary={summaryContent}
          />
        </InstUISettingsProvider>
      </View>
    )
  }
}

export default NavToggle
export { NavToggle }
