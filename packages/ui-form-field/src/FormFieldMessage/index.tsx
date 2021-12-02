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

import { ScreenReaderContent } from '@instructure/ui-a11y-content'

import { withStyle, jsx } from '@instructure/emotion'

import generateStyle from './styles'
import generateComponentTheme from './theme'

import { propTypes, allowedProps } from './props'
import type { FormFieldMessageProps } from './props'

/**
---
parent: FormField
---
@tsProps

This is a helper component that is used by most of the custom form
components. In most cases it shouldn't be used directly.

```js
---
example: true
---
<FormFieldMessage variant="error">Invalid value</FormFieldMessage>
```
**/
@withStyle(generateStyle, generateComponentTheme)
class FormFieldMessage extends Component<FormFieldMessageProps> {
  static readonly componentId = 'FormFieldMessage'

  static propTypes = propTypes
  static allowedProps = allowedProps
  static defaultProps = {
    variant: 'hint'
  }

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
    const { children, styles } = this.props

    return this.props.variant !== 'screenreader-only' ? (
      <span css={styles?.formFieldMessage} ref={this.handleRef}>
        {children}
      </span>
    ) : (
      <ScreenReaderContent elementRef={this.handleRef}>
        {children}
      </ScreenReaderContent>
    )
  }
}

export default FormFieldMessage
export { FormFieldMessage }
