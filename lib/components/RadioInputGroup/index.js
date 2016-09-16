import React, { Children, Component, PropTypes } from 'react'
import CustomPropTypes from '../../util/CustomPropTypes'
import classnames from 'classnames'
import themeable from '../../util/themeable'
import safeCloneElement from '../../util/safeCloneElement'
import createChainedFunction from '../../util/createChainedFunction'
import matchComponentTypes from '../../util/matchComponentTypes'
import RadioInput from '../RadioInput'

import FormFieldGroup from '../FormFieldGroup'

import styles from './styles.css'
import theme from './theme.js'

/**
  A RadioInputGroup is a group of RadioInput components. It will handle setting
  the name property on the RadioInput components for you and will set the selected item
  based on the `value` property.

  ```jsx_example
  function Example () {
    const inputs = [
      {value: 'foo', label: lorem.sentence() },
      {value: 'bar', label: lorem.sentence() },
      {value: 'baz', label: lorem.sentence() }
    ]
    return (
      <RadioInputGroup name="example" defaultValue="foo" description="Select something">
        {inputs.map(input => <RadioInput key={input.value} value={input.value} label={input.label} />)}
      </RadioInputGroup>
    )
  }

  <Example />
  ```

  Set the `variant` prop to `toggle` to have the RadioInputGroup display as a toggle switch.
  If the `variant` prop is set to `toggle`, you can set the `size` prop to produce toggles of
  different sizes. As with the [Button](#Button) component and the input components, `medium` is the default.

  ```jsx_example
  <div>
   <RadioInputGroup
      name="featuresm"
      defaultValue="off"
      description="Small-size"
      variant="toggle"
      size="small">
      <RadioInput label="Off" value="off" />
      <RadioInput label="Allow" value="allow" />
      <RadioInput label="On" value="on" />
    </RadioInputGroup>
    <RadioInputGroup
      name="featuremed"
      defaultValue="off"
      description="Medium-size (default)"
      variant="toggle">
      <RadioInput label="Off" value="off" />
      <RadioInput label="Allow" value="allow" />
      <RadioInput label="On" value="on" />
    </RadioInputGroup>
    <RadioInputGroup
      name="featurelg"
      defaultValue="off"
      description="Large-size"
      variant="toggle"
      size="large">
      <RadioInput label="Off" value="off" />
      <RadioInput label="Allow" value="allow" />
      <RadioInput label="On" value="on" />
    </RadioInputGroup>
  </div>
  ```

  Use the `context` prop on individual RadioInput components to encourage
  users to make good decisions - or simply as an additional way to convey to sighted
  users that a feature is on/active through color. Also note that toggles have a max-width: If your
  options have walls of text, please use the default RadioInputGroup variant.

  ```jsx_example
  <RadioInputGroup name="security" defaultValue="none" description="Security settings" variant="toggle">
    <RadioInput label="None" value="none" context="danger" />
    <RadioInput label="Password" value="password" />
    <RadioInput label="Two-factor authentication" value="auth" context="success" />
  </RadioInputGroup>
  ```

  Setting the `disabled` prop to `true` will disable the entire RadioInputGroup.

  ```jsx_example
  <RadioInputGroup
    name="fruits"
    description="Fruits"
    defaultValue="orange"
    disabled
  >
    <RadioInput label="Apple" value="apple" />
    <RadioInput label="Orange" value="orange" />
    <RadioInput label="Banana" value="banana" />
  </RadioInputGroup>
  ```

  ```jsx_example
  <RadioInputGroup name="feature" defaultValue="off" description="Super-awesome feature" variant="toggle" disabled>
    <RadioInput label="Off" value="off" />
    <RadioInput label="Allow" value="allow" />
    <RadioInput label="On" value="on" />
  </RadioInputGroup>
  ```

  Or disable an individual RadioInput component via its `disabled` prop.

  ```jsx_example
  <RadioInputGroup
    name="fruits"
    defaultValue="banana"
    description="Fruits"
  >
    <RadioInput label="Apple" value="apple" />
    <RadioInput label="Orange" value="orange" disabled />
    <RadioInput label="Banana" value="banana" />
  </RadioInputGroup>
  ```

  ```jsx_example
  <RadioInputGroup name="feature" defaultValue="off" description="Super-awesome feature" variant="toggle">
    <RadioInput label="Off" value="off" />
    <RadioInput label="Allow" value="allow" />
    <RadioInput label="On" value="on" disabled />
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

  ```jsx_example
  <RadioInputGroup name="fruit" defaultValue="banana" description="A list of fruits (select your favorite)">
      <RadioInput isBlock={false} value="Apple" label={
          <ScreenReaderContent>Apple</ScreenReaderContent>
        }
      />
      <TextInput isBlock={false} label={
        <ScreenReaderContent>Edit fruit</ScreenReaderContent>
        } defaultValue="Apple"
      />

      <br/>

      <RadioInput isBlock={false} value="orange" label={
          <ScreenReaderContent>Orange</ScreenReaderContent>
        }
      />
      <TextInput isBlock={false} label={
        <ScreenReaderContent>Edit fruit</ScreenReaderContent>
        } defaultValue="Orange"
      />

      <br/>

      <RadioInput isBlock={false} value="banana" label={
          <ScreenReaderContent>Banana</ScreenReaderContent>
        }
      />
      <TextInput isBlock={false} label={
        <ScreenReaderContent>Edit fruit</ScreenReaderContent>
        } defaultValue="Banana"
      />
  </RadioInputGroup>
  ```
**/

@themeable(theme, styles)
export default class RadioInputGroup extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    description: PropTypes.node.isRequired,
    /**
    * value to set on initial render
    */
    defaultValue: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    /**
    * the selected value (must be accompanied by an `onChange` prop)
    */
    value: CustomPropTypes.controllable(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ])),
    /**
    * when used with the `value` prop, the component will not control its own state
    */
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    /**
    * object with shape: `{
    * text: PropTypes.string,
    * type: PropTypes.oneOf(['error', 'hint', 'success', 'screenreader-only'])
    *   }`
    */
    messages: PropTypes.arrayOf(CustomPropTypes.formFieldMessage),
    /**
    * children of type `RadioInput`
    */
    children: PropTypes.node,
    variant: PropTypes.oneOf(['simple', 'toggle']),
    size: PropTypes.oneOf(['small', 'medium', 'large'])
  };

  static defaultProps = {
    disabled: false,
    variant: 'simple',
    size: 'medium'
  };

  constructor (props) {
    super()

    if (props.value === undefined) {
      this.state = {
        value: props.defaultValue
      }
    }
  }

  handleChange = (e) => {
    const value = e.target.value

    if (this.props.disabled) {
      e.preventDefault()
      return
    }

    if (this.props.value === undefined) {
      this.setState({value})
    }

    if (typeof this.props.onChange === 'function') {
      this.props.onChange(value)
    }
  };

  get value () {
    return (this.props.value === undefined) ? this.state.value : this.props.value
  }

  getCheckedInput () {
    let checked

    Children.forEach(this.props.children, (child, index) => {
      if (matchComponentTypes(child, [RadioInput]) && this.value === child.props.value) {
        checked = child
      }
    })

    return checked
  }

  renderChildren () {
    const {
      children,
      name,
      variant,
      size,
      disabled
    } = this.props

    // This adds the passed in name property to each RadioInput component
    // and checks the input whose value matches the value property
    return Children.map(children, (child) => {
      if (matchComponentTypes(child, [RadioInput])) {
        const { onChange } = child.props
        return safeCloneElement(child, {
          ...child.props,
          name,
          disabled: (disabled || child.props.disabled),
          variant,
          size,
          checked: this.value === child.props.value,
          onChange: createChainedFunction(onChange, this.handleChange)
        })
      } else {
        return child // ignore (but preserve) children that aren't RadioInput
      }
    })
  }

  render () {
    const checkedInput = this.getCheckedInput()
    const context = checkedInput && checkedInput.props.context
    const classes = {
      [styles.root]: true,
      [styles[this.props.variant]]: true,
      [styles[context]]: context
    }

    return (
      <FormFieldGroup
        description={this.props.description}
        messages={this.props.messages}
        disabled={this.props.disabled}
      >
        <div className={classnames(classes)}>
          {this.renderChildren()}
        </div>
      </FormFieldGroup>
    )
  }
}
