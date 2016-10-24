import React, { Component, PropTypes } from 'react'
import CustomPropTypes from '../../util/CustomPropTypes'
import themeable from '../../util/themeable'

import { FormFieldLabel, FormFieldMessages } from '../FormField'

import styles from './styles.css'
import theme from './theme.js'

/**
  This is a helper component that is used by most of the custom form
  components. In most cases it shouldn't be used directly.

  ```jsx_example
  <FormFieldGroup description="Please enter your full name">
    <TextInput label="First" />
    <TextInput label="Middle" />
    <TextInput label="Last" />
  </FormFieldGroup>
  ```
**/
@themeable(theme, styles)
export default class FormFieldGroup extends Component {
  static propTypes = {
    description: PropTypes.node.isRequired,
    /**
    * object with shape: `{
    * text: PropTypes.string,
    * type: PropTypes.oneOf(['error', 'hint', 'success', 'screenreader-only'])
    *   }`
    */
    messages: PropTypes.arrayOf(CustomPropTypes.formFieldMessage),
    disabled: PropTypes.bool,
    children: PropTypes.node
  }

  static defaultProps = {
    disabled: false
  }

  render () {
    return (
      <fieldset className={styles.root} aria-disabled={this.props.disabled ? 'true' : null}>
        <legend className={styles.legend}>
          <FormFieldLabel>{this.props.description}</FormFieldLabel>
          <FormFieldMessages messages={this.props.messages} />
        </legend>
        <div className={styles.fields}>
          {this.props.children}
        </div>
      </fieldset>
    )
  }
}
