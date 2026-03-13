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

import { omitProps } from '@instructure/ui-react-utils'

import { withStyle } from '@instructure/emotion'

import { FormFieldMessage } from '../../FormFieldMessage/v2'

import generateStyle from './styles'

import { allowedProps } from './props'
import type { FormFieldMessagesProps } from './props'

/**
---
parent: FormField
---

A FormFieldMessages component

```js
---
type: example
---
<FormFieldMessages messages={[
  { text: 'Invalid name', type: 'error' },
  { text: 'Good job!', type: 'success' },
  { text: 'Full name, first and last', type: 'hint' },
]} />
```
**/
@withStyle(generateStyle)
class FormFieldMessages extends Component<FormFieldMessagesProps> {
  static readonly componentId = 'FormFieldMessages'

  static allowedProps = allowedProps
  static defaultProps = {}

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
    const { messages, styles } = this.props

    return messages && messages.length > 0 ? (
      <div
        css={styles?.formFieldMessages}
        {...omitProps(this.props, FormFieldMessages.allowedProps)}
        ref={this.handleRef}
      >
        {messages.map((msg, i) => {
          return (
            <span key={`error${i}`} css={styles?.message}>
              <FormFieldMessage variant={msg.type}>{msg.text}</FormFieldMessage>
            </span>
          )
        })}
      </div>
    ) : null
  }
}

export default FormFieldMessages
export { FormFieldMessages }
