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
import PropTypes from 'prop-types'

import { omitProps } from '@instructure/ui-react-utils'

import { withStyle, jsx } from '@instructure/emotion'

import { FormPropTypes } from '../FormPropTypes'
import { FormFieldMessage } from '../FormFieldMessage'

import generateStyle from './styles'
import generateComponentTheme from './theme'

type Props = {
  makeStyles?: (...args: any[]) => any
  styles?: any
  messages?: any[] // TODO: FormPropTypes.message
}

/**
---
parent: FormField
---

A FormFieldMessages component

```js
---
example: true
---
<FormFieldMessages messages={[
  { text: 'Invalid name', type: 'error' },
  { text: 'Good job!', type: 'success' },
  { text: 'Full name, first and last', type: 'hint' },
]} />
```
**/
@withStyle(generateStyle, generateComponentTheme)
class FormFieldMessages extends Component<Props> {
  static componentId = 'FormFieldMessages'

  static propTypes = {
    // eslint-disable-next-line react/require-default-props
    makeStyles: PropTypes.func,
    // eslint-disable-next-line react/require-default-props
    styles: PropTypes.object,
    /**
     * object with shape: `{
     * text: PropTypes.string,
     * type: PropTypes.oneOf(['error', 'hint', 'success', 'screenreader-only'])
     *   }`
     */
    messages: PropTypes.arrayOf(FormPropTypes.message)
  }

  static defaultProps = {
    messages: undefined
  }

  componentDidMount() {
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.makeStyles()
  }

  // @ts-expect-error ts-migrate(6133) FIXME: 'prevProps' is declared but its value is never rea... Remove this comment to see the full error message
  componentDidUpdate(prevProps, prevState, snapshot) {
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.makeStyles()
  }

  render() {
    const { messages, styles } = this.props
    return messages && messages.length > 0 ? (
      <span
        css={styles.formFieldMessages}
        {...omitProps(this.props, FormFieldMessages.propTypes)}
      >
        {messages.map((msg, i) => {
          return (
            <span key={`error${i}`} css={styles.message}>
              <FormFieldMessage variant={msg.type}>{msg.text}</FormFieldMessage>
            </span>
          )
        })}
      </span>
    ) : null
  }
}

export default FormFieldMessages
export { FormFieldMessages }
