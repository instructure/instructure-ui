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

import { omitProps, getElementType } from '@instructure/ui-react-utils'
import { withStyle } from '@instructure/emotion'

import generateStyle from './styles'
import generateComponentTheme from './theme'

import { allowedProps } from './props'
import type { FormFieldLabelProps } from './props'

/**
---
parent: FormField
---

This is a helper component that is used by most of the custom form
components. In most cases it shouldn't be used directly.

```js
---
type: example
---
<FormFieldLabel>Hello</FormFieldLabel>
```

 @deprecated since version 10. This is an internal component that will be
 removed in the future
**/
@withStyle(generateStyle, generateComponentTheme)
class FormFieldLabel extends Component<FormFieldLabelProps> {
  static readonly componentId = 'FormFieldLabel'

  static allowedProps = allowedProps
  static defaultProps = {
    as: 'span'
  } as const

  ref: Element | null = null

  handleRef = (el: Element | null) => {
    this.ref = el
  }

  componentDidMount() {
    this.props.makeStyles?.()
  }

  componentDidUpdate() {
    this.props.makeStyles?.()
  }

  render() {
    const ElementType = getElementType(FormFieldLabel, this.props)

    const { styles, children } = this.props

    return (
      <ElementType
        {...omitProps(this.props, FormFieldLabel.allowedProps)}
        css={styles?.formFieldLabel}
        ref={this.handleRef}
      >
        {children}
      </ElementType>
    )
  }
}

export default FormFieldLabel
export { FormFieldLabel }
