import React, { Component, PropTypes } from 'react'
import styles from './RadioInput.css'

/**
  A RadioInput component would generally be used in a [RadioInputGroup](#RadioInputGroup), but can be used on its own.

  ```jsx_example
  <RadioInput label="Apple" value="apple" name="fruit" />
  ```

  To render a RadioInput with a screen reader only label you can use the [ScreenReaderContent](#ScreenReaderContent)
  component. Then you can pass additional content (that is not linked to the input as a label) as children.

  ```jsx_example
  <fieldset>
    <RadioInput label={

      <ScreenReaderContent>This label is not visible</ScreenReaderContent>

      } value="apple" name="fruit">
      Apple
    </RadioInput>
    <RadioInput label="Orange" value="orange" name="fruit" />
    <RadioInput label="Banana" value="banana" name="fruit" />
  </fieldset>
  ```
**/

export default class RadioInput extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    label: PropTypes.node.isRequired,
    name: PropTypes.string,
    checked: PropTypes.bool,
    onChange: PropTypes.func,
    id: PropTypes.string,
    children: PropTypes.node
  };

  render () {
    const { children, label, ...props } = this.props
    return (
      <div className={styles.root}>
        <label className={styles.label}>
          <input type="radio" {...props} />
          {label}
        </label>
        {children}
      </div>
    )
  }
}
