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
import {ThemeContextTypes, makeThemeContext, getThemeContext} from '@instructure/ui-themeable/lib/ThemeContextTypes'
import mergeDeep from '@instructure/ui-utils/lib/mergeDeep'
import warning from '@instructure/ui-utils/lib/warning'
import themeable from '@instructure/ui-themeable'
import ensureSingleChild from '@instructure/ui-utils/lib/react/ensureSingleChild'

/**
---
category: components/utilities
---
**/
export default class ApplyTheme extends Component {
  static propTypes = {
    /**
    * set theme variables to override the defaults
    */
    theme: PropTypes.object,
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
    immutable: false
  }

  static childContextTypes = ThemeContextTypes;

  static contextTypes = ThemeContextTypes;

  static generateTheme = themeable.generateTheme;

  getChildContext () {
    let theme = this.props.theme || {}

    const parentThemeContext = getThemeContext(this.context) || {}

    if (parentThemeContext.immutable && parentThemeContext.theme) {
      warning(
        !this.props.theme,
        '[ApplyTheme] Parent theme is immutable. Cannot apply theme: %O',
        this.props.theme
      )
      theme = parentThemeContext.theme
    } else if (parentThemeContext.theme) {
      theme = mergeDeep(parentThemeContext.theme, theme)
    }

    return makeThemeContext(theme, parentThemeContext.immutable || this.props.immutable)
  }

  render () {
    return ensureSingleChild(this.props.children)
  }
}
