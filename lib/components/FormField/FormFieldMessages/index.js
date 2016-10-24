import React, { Component, PropTypes } from 'react'
import CustomPropTypes from '../../../util/CustomPropTypes'
import themeable from '../../../util/themeable'

import styles from './styles.css'

import FormFieldMessage from '../FormFieldMessage'

/**
  A FormFieldMessages component

  ```jsx_example
  <FormFieldMessages messages={[
    { text: 'Invalid name', type: 'error' },
    { text: 'Good job!', type: 'success' },
    { text: 'Full name, first and last', type: 'hint' },
  ]} />
  ```
**/
@themeable(null, styles)
export default class FormFieldMessages extends Component {
  static propTypes = {
    /**
    * object with shape: `{
    * text: PropTypes.string,
    * type: PropTypes.oneOf(['error', 'hint', 'success', 'screenreader-only'])
    *   }`
    */
    messages: PropTypes.arrayOf(CustomPropTypes.formFieldMessage)
  }

  render () {
    const {messages} = this.props
    return messages && messages.length > 0 ? (
      <ul className={styles.root} id={this.messageId}>
        {
          messages.map((msg, i) => {
            return (
              <li key={'error' + i} className={styles.message}>
                <FormFieldMessage variant={msg.type}>
                  {msg.text}
                </FormFieldMessage>
              </li>
            )
          })
        }
      </ul>
    ) : null
  }
}
