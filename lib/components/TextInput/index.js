import React, { Component, PropTypes } from 'react'
import styles from './TextInput.css'
import CustomPropTypes from '../../util/CustomPropTypes'
import classnames from 'classnames'
import shortid from 'shortid'
import themeable from '../../util/themeable'

import themeVariables from './theme/TextInput'
import themeStyles from './theme/TextInput.css'

import ScreenReaderContent from '../ScreenReaderContent'

/**
  A standard text input field

  ```jsx_example
  <TextInput label="Name" />
  ```

  A text input field with errors

  ```jsx_example
  <TextInput errors={['Invalid name']} label="Name" />
  ```

  A text input field with a screenreader only label

  ```jsx_example
  <TextInput label={
    <ScreenReaderContent>Age</ScreenReaderContent>
    } placeholder="hello world"/>
  ```

  A password input field

  ```jsx_example
  <TextInput label="Password" type="password" />
  ```

  A text input field next to a [Button](#Button). Note: Form layout components
  are coming soon. Please ignore the inline styles in the example.

  ```jsx_example
  <div>
    <div style={{display: 'flex', alignItems: 'flex-end'}}>
      <div>
        <TextInput label="Default-size input and button" />
      </div>
      <div style={{ paddingLeft: '0.5em' }}>
        <Button>Click me</Button>
      </div>
    </div>
    <div style={{display: 'flex', alignItems: 'flex-end', marginTop: '1em'}}>
      <div>
        <TextInput size="small" label="Small-size input and button" />
      </div>
      <div style={{ paddingLeft: '0.5em' }}>
        <Button size="small">Click me</Button>
      </div>
    </div>
    <div style={{display: 'flex', alignItems: 'flex-end', marginTop: '1em'}}>
      <div>
        <TextInput size="large" label="Large-size input and button" />
      </div>
      <div style={{ paddingLeft: '0.5em' }}>
        <Button size="large">Click me</Button>
      </div>
    </div>
  </div>
  ```
**/
@themeable(themeVariables, themeStyles)
export default class TextInput extends Component {
  static propTypes = {
    type: PropTypes.oneOf(['text', 'email', 'url', 'tel', 'search', 'password']),
    label: PropTypes.node.isRequired,
    errors: PropTypes.array,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    /**
    * Html placeholder text to display when the input has no value. This should be hint text, not a label
    * replacement.
    */
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    required: PropTypes.bool,
    /**
    * value to set on initial render
    */
    defaultValue: PropTypes.string,
    /**
    * the selected value (must be accompanied by an `onChange` prop)
    */
    value: CustomPropTypes.controllable(PropTypes.string),
    /**
    * when used with the `value` prop, the component will not control its own state
    */
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func
  };

  static defaultProps = {
    type: 'text',
    size: 'medium'
  };

  constructor (props) {
    super()

    this.inputId = 'TextInput_' + shortid.generate()
    this.descriptionId = 'TextInputDescription_' + shortid.generate()
  }

  renderErrors () {
    const {errors} = this.props
    if (errors) {
      const messages = errors.map((msg, i) => {
        return <li key={'error' + i} className={styles.errorMsg}>{msg}</li>
      })

      return (
        <ul className={styles.errors} id={this.errorsId}>
          {messages}
        </ul>
      )
    }
  }

  renderPlaceholder () {
    const { placeholder } = this.props
    return (placeholder) ? (
      <ScreenReaderContent>{placeholder}</ScreenReaderContent>
    ) : null
  }

  renderDescription () {
    const {
      placeholder,
      errors
    } = this.props

    return ((errors && errors.length > 0) || placeholder) ? (
      <div id={this.descriptionId}>
        {this.renderPlaceholder()}
        {this.renderErrors()}
      </div>
    ) : null
  }

  render () {
    const {
      type,
      label,
      errors,
      size,
      ...props
    } = this.props

    const hasErrors = errors && errors.length > 0

    const classes = {
      [styles.root]: true,
      [styles.disabled]: props.disabled,
      [styles.required]: props.required,
      [styles[size]]: size
    }

    return (
      <div className={classnames(classes)}>
        <label
          htmlFor={this.inputId}
          className={styles.label}>
            {label}
        </label>
        <input
          type={type}
          id={this.inputId}
          aria-describedby={hasErrors || props.placeholder ? this.descriptionId : null}
          aria-invalid={hasErrors ? 'true' : null}
          className={styles.input}
          {...props} />
        {this.renderDescription()}
      </div>
    )
  }
}
