import React, { Component } from 'react'
import PropTypes from 'prop-types'

import CustomPropTypes from '@instructure/ui-utils/lib/react/CustomPropTypes'
import themeable from '@instructure/ui-themeable'
import { omitProps } from '@instructure/ui-utils/lib/react/passthroughProps'

import styles from './styles.css'
import theme from './theme'

import FormFieldMessage from '../FormFieldMessage'

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
@themeable(theme, styles)
export default class FormFieldMessages extends Component {
  /* eslint-disable react/require-default-props */
  static propTypes = {
    /**
    * object with shape: `{
    * text: PropTypes.string,
    * type: PropTypes.oneOf(['error', 'hint', 'success', 'screenreader-only'])
    *   }`
    */
    messages: PropTypes.arrayOf(CustomPropTypes.message)
  };
  /* eslint-enable react/require-default-props */

  render () {
    const {messages} = this.props
    /* eslint-disable react/no-array-index-key */
    return messages && messages.length > 0 ? (
      <span className={styles.root} {...omitProps(this.props, FormFieldMessages.propTypes)}>
        {
          messages.map((msg, i) => {
            return (
              <span key={`error${i}`} className={styles.message}>
                <FormFieldMessage variant={msg.type}>
                  {msg.text}
                </FormFieldMessage>
              </span>
            )
          })
        }
      </span>
    ) : null
    /* eslint-enable react/no-array-index-key */
  }
}
