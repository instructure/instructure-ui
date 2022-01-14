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
import { optionsItemThemeGenerator } from '@instructure/ui-options'

import { propTypes, allowedProps } from './props'
import type { DrilldownOptionProps } from './props'

/**
---
parent: Drilldown
id: Drilldown.Option
---
@module DrilldownOption
@tsProps
**/
// needed for listing the available theme variables on docs page,
// we pass the themeOverrides to Options.Item
@withStyle(null, optionsItemThemeGenerator)
class DrilldownOption extends Component<DrilldownOptionProps> {
  static readonly componentId = 'Drilldown.Option'

  static propTypes = propTypes
  static allowedProps = allowedProps

  static defaultProps = {
    isDisabled: false,
    defaultSelected: false,
    beforeLabelContentVAlign: 'start',
    afterLabelContentVAlign: 'start',
    descriptionRole: 'note',
    as: 'span',
    role: 'listitem'
  }

  render() {
    // this component is only used for prop validation. Drilldown.Option children
    // are parsed in Drilldown and rendered as Options.Item components
    return null
  }
}

export default DrilldownOption
export { DrilldownOption }
