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
import PropTypes from 'prop-types'

import { mergeDeep } from '@instructure/ui-utils'
import { warn } from '@instructure/console/macro'
import { ensureSingleChild } from '@instructure/ui-react-utils'

import { ThemeContext } from '../ThemeContext'
import { themeable } from '../themeable'

/**
---
category: components/utilities
---
**/
class ApplyTheme extends Component {
  static propTypes = {
    /**
    * set theme variables to override the defaults
    */
    theme: PropTypes.object,
    /**
     * the theme key identifying the theme in the global theme registry
     */
    themeKey: PropTypes.string,
    /**
    * accepts only one child (children must be wrapped in a single component/element)
    */
    children: PropTypes.node,
    /**
    * Prevent overriding this theme via a child ApplyTheme component or theme props
    */
    immutable: PropTypes.bool
  }

  static defaultProps = {
    theme: undefined,
    themeKey: null,
    children: null,
    immutable: false
  }

  static childContextTypes = ThemeContext.types

  static contextTypes = ThemeContext.types

  static generateTheme = themeable.generateTheme

  getChildContext () {
    let theme = this.props.theme || {}
    const { themeKey } = this.props

    const parentThemeContext = ThemeContext.getThemeContext(this.context) || {}

    if (parentThemeContext.immutable && parentThemeContext.theme) {
      warn(
        !this.props.theme,
        '[ApplyTheme] Parent theme is immutable. Cannot apply theme: %O',
        this.props.theme
      )
      theme = parentThemeContext.theme
    } else if (parentThemeContext.theme) {
      theme = mergeDeep(parentThemeContext.theme, theme)
    }

    return ThemeContext.makeThemeContext(theme, themeKey, parentThemeContext.immutable || this.props.immutable)
  }

  render () {
    return ensureSingleChild(this.props.children)
  }
}

export default ApplyTheme
export { ApplyTheme }
