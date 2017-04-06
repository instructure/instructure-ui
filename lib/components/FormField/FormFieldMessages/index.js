import React, { Component, PropTypes } from 'react'
import CustomPropTypes from '../../../util/CustomPropTypes'
import themeable from '../../../themeable'
import { omitProps } from '../../../util/passthroughProps'

import styles from './styles.css'
import theme from './theme.js'

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
@themeable(theme, styles)
export default class FormFieldMessages extends Component {
  static propTypes = {
    /**
    * object with shape: `{
    * text: PropTypes.string,
    * type: PropTypes.oneOf(['error', 'hint', 'success', 'screenreader-only'])
    *   }`
    */
    messages: PropTypes.arrayOf(CustomPropTypes.message)
  };

  render () {
    const {messages} = this.props
    return messages && messages.length > 0 ? (
      <span className={styles.root} {...omitProps(this.props, FormFieldMessages.propTypes)}>
        {
          messages.map((msg, i) => {
            return (
              <span key={'error' + i} className={styles.message}>
                <FormFieldMessage variant={msg.type}>
                  {msg.text}
                </FormFieldMessage>
              </span>
            )
          })
        }
      </span>
    ) : null
  }
}
