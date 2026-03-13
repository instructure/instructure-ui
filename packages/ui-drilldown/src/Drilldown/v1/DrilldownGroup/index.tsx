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

import { withStyleLegacy as withStyle } from '@instructure/emotion'
import { optionsThemeGenerator } from '@instructure/ui-options'

import { allowedProps } from './props'
import type { DrilldownGroupProps } from './props'
import { isMac, isFirefox } from '@instructure/ui-utils'

/**
---
parent: Drilldown
id: Drilldown.Group
---
@module DrilldownGroup
**/
// needed for listing the available theme variables on docs page,
// we pass the themeOverrides to Options
@withStyle(null, optionsThemeGenerator)
class DrilldownGroup extends Component<DrilldownGroupProps> {
  static readonly componentId = 'Drilldown.Group'

  static allowedProps = allowedProps
  static defaultProps = {
    disabled: false,
    withoutSeparators: false,
    // Firefox with NVDA does not read Drilldown.Group with role="group" correctly
    // but setting role="menu" on all other platforms results in Drilldown.Group label not being read
    role: !isMac() && isFirefox() ? 'menu' : 'group'
  }

  render() {
    // this component is only used for prop validation.
    // Drilldown.Group is parsed in Drilldown as an Options component.
    return null
  }
}

export default DrilldownGroup
export { DrilldownGroup }
