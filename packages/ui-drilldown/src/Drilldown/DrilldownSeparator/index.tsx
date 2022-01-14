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
import { Component } from 'react'

import { withStyle } from '@instructure/emotion'
import { optionsSeparatorThemeGenerator } from '@instructure/ui-options'

import { propTypes, allowedProps } from './props'
import type { DrilldownSeparatorProps } from './props'

/**
---
parent: Drilldown
id: Drilldown.Separator
---
@module DrilldownSeparator
@tsProps
**/
// needed for listing the available theme variables on docs page,
// we pass the themeOverrides to Options.Separator
@withStyle(null, optionsSeparatorThemeGenerator)
class DrilldownSeparator extends Component<DrilldownSeparatorProps> {
  static readonly componentId = 'Drilldown.Separator'

  static propTypes = propTypes
  static allowedProps = allowedProps
  static defaultProps = {}

  render() {
    // this component is only used for prop validation. Drilldown.Separator children
    // are parsed in Drilldown and rendered as Options.Separator components
    return null
  }
}

export default DrilldownSeparator
export { DrilldownSeparator }
