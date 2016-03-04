import React, { Children, Component, PropTypes } from 'react'
import CustomPropTypes from '../../util/CustomPropTypes'
import styles from './RadioInputGroup.css'
import RadioInput from './RadioInput'

/**
  A RadioInputGroup is a group of RadioInput components. It will handle setting
  the name property on the RadioInput components for you and will set the selected item
  based on the value property.

  ```jsx_example
  <RadioInputGroup name="fruit" defaultValue="banana" description="Select a fruit">
    <RadioInput label="Apple" value="apple" />
    <RadioInput label="Orange" value="orange" />
    <RadioInput label="Banana" value="banana" />
  </RadioInputGroup>
  ```

  If you would like to make the description visible only to screen readers you can use the
  [ScreenReaderContent](#ScreenReaderContent) component.

  ```jsx_example
  <RadioInputGroup name="fruit" defaultValue="banana" description={
    <ScreenReaderContent>Select a fruit</ScreenReaderContent>
    }>
    <RadioInput label="Apple" value="apple" />
    <RadioInput label="Orange" value="orange" />
    <RadioInput label="Banana" value="banana" />
  </RadioInputGroup>
  ```

  To render a RadioInput with a screen reader only label you can use the [ScreenReaderContent](#ScreenReaderContent)
  component. Then you can pass additional content (that is not linked to the input as a label) as children.

  ```jsx_example
  <RadioInputGroup name="fruit" defaultValue="banana" description="Select a fruit">
    <RadioInput value="apple" label={
      <ScreenReaderContent>This label is not visible</ScreenReaderContent>
      }>
      Apple
    </RadioInput>
  </RadioInputGroup>
  ```
**/

export default class RadioInputGroup extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    description: PropTypes.node.isRequired,
    /**
    * value to set on initial render
    */
    defaultValue: PropTypes.string,
    /**
    * the selected value (must be accompanied by an `onChange` prop)
    */
    value: CustomPropTypes.controlledValue(PropTypes.string),
    /**
    * when used with the `value` prop, the component will not control its own state
    */
    onChange: PropTypes.func,
    errors: PropTypes.array,
    /**
    * children of type `RadioInput`
    */
    children: CustomPropTypes.validChildren([RadioInput])
  };

  constructor (props) {
    super()

    if (!this.isControlled(props)) {
      this.state = {
        value: props.defaultValue
      }
    }
  }

  handleChange = (e) => {
    const value = e.target.value
    if (!this.isControlled(this.props)) {
      this.setState({value})
    }
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(value)
    }
  };

  // controlled components don't control their own state
  isControlled (props) {
    return props.value
  }

  getValue () {
    if (this.isControlled(this.props)) {
      return this.props.value
    } else {
      return this.state.value
    }
  }

  renderChildren () {
    const {
      children,
      name
    } = this.props

    // This adds the passed in name property to each RadioInput component
    // and checks the input whose value matches the value property
    return Children.map(children, (child) => {
      if (child && child.type === RadioInput) {
        return (
          <RadioInput {...child.props}
            name={name}
            checked={this.getValue() === child.props.value}
            onChange={this.handleChange} />
        )
      } else {
        return child // PropType validation should handle errors
      }
    })
  }

  renderErrors () {
    const {errors} = this.props
    if (errors) {
      return errors.map((msg, i) => {
        return <div key={'error' + i} className={styles.errors}>{msg}</div>
      })
    }
  }

  renderDescription () {
    const {description} = this.props
    if (description) {
      return <div className={styles.description}>{description}</div>
    }
  }

  render () {
    return (
      <fieldset className={styles.root}>
        <legend>
          {this.renderDescription()}
          {this.renderErrors()}
        </legend>
        {this.renderChildren()}
      </fieldset>
    )
  }
}
