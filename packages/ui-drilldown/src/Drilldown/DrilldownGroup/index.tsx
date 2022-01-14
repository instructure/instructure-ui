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
import { optionsThemeGenerator } from '@instructure/ui-options'

import { propTypes, allowedProps } from './props'
import type { DrilldownGroupProps } from './props'

/**
---
parent: Drilldown
id: Drilldown.Group
---
@module DrilldownGroup
@tsProps
**/
// needed for listing the available theme variables on docs page,
// we pass the themeOverrides to Options
@withStyle(null, optionsThemeGenerator)
class DrilldownGroup extends Component<DrilldownGroupProps> {
  static readonly componentId = 'Drilldown.Group'

  static propTypes = propTypes
  static allowedProps = allowedProps
  static defaultProps = {
    isDisabled: false,
    withoutSeparators: false
  }

  render() {
    // this component is only used for prop validation.
    // Drilldown.Group is parsed in Drilldown as an Options component.
    return null
  }
}

export default DrilldownGroup
export { DrilldownGroup }
