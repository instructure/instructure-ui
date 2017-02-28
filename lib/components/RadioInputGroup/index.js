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

  ```js_example
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
  Passing `isBlock={false}` to RadioInput will make it display inline. (Note that
  for the time being, you still need to add a wrapper around each RadioInput, if
  you want to add margin between inputs.)

  ```js_example
  function Example () {
    const inputs = [
      {value: 'foo', label: lorem.sentence() },
      {value: 'bar', label: lorem.sentence() },
      {value: 'baz', label: lorem.sentence() }
    ]
    return (
      <RadioInputGroup name="example" defaultValue="foo" description="Select something">
        {inputs.map(input =>
          <RadioInput
            isBlock={false}
            key={input.value}
            value={input.value}
            label={input.label}
          />
        )}
      </RadioInputGroup>
    )
  }

  <Example />
  ```

  Set the `variant` prop to `toggle` to have the RadioInputGroup display as a toggle switch.
  If the `variant` prop is set to `toggle`, you can set the `size` prop to produce toggles of
  different sizes. As with the [Button](#Button) component and the input components,
  `medium` is the default.

  ```jsx_example
  <div>
   <RadioInputGroup
      name="featuresm"
      defaultValue="off"
      description="Small-size"
      variant="toggle"
      size="small">
      <RadioInput label="Off" value="off" context="off" />
      <RadioInput label="Allow" value="allow" />
      <RadioInput label="On" value="on" />
    </RadioInputGroup>
    <RadioInputGroup
      name="featuremed"
      defaultValue="allow"
      description="Medium-size (default)"
      variant="toggle">
      <RadioInput label="Off" value="off" context="off" />
      <RadioInput label="Allow" value="allow" />
      <RadioInput label="On" value="on" />
    </RadioInputGroup>
    <RadioInputGroup
      name="featurelg"
      defaultValue="on"
      description="Large-size"
      variant="toggle"
      size="large">
      <RadioInput label="Off" value="off" context="off" />
      <RadioInput label="Allow" value="allow" />
      <RadioInput label="On" value="on" />
    </RadioInputGroup>
  </div>
  ```

  Set the `context` prop on each `<RadioInput>` to convey context via the toggle's
  background color. Default context is `success`.

  ```jsx_example
  <RadioInputGroup
    name="context"
    defaultValue="danger"
    description="Contexts"
    variant="toggle">
    <RadioInput
      label={
        <span>
          <PlaceholderIcon />
          <ScreenReaderContent>
            This option makes something inactive
          </ScreenReaderContent>
        </span>
      }
      value="off"
      context="off"
    />
    <RadioInput
      label={
        <span>
          <PlaceholderIcon />
          <ScreenReaderContent>
            This option is an inadvisable choice
          </ScreenReaderContent>
        </span>
      }
      value="warning"
      context="warning"
    />
    <RadioInput
      label={
        <span>
          <PlaceholderIcon />
          <ScreenReaderContent>
            This option is a bad choice
          </ScreenReaderContent>
        </span>
      }
      value="danger"
      context="danger"
    />
    <RadioInput
      label={
        <span>
          <PlaceholderIcon />
          <ScreenReaderContent>
            This option is a good choice
          </ScreenReaderContent>
        </span>
      }
      value="success"
      context="success"
    />
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
    <RadioInput label="Off" value="off" context="off" />
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
  <RadioInputGroup name="feature" defaultValue="none" description="Super-awesome feature" variant="toggle">
    <RadioInput label="None" value="none" context="off" />
    <RadioInput label="Some" value="some" />
    <RadioInput label="All" value="all" disabled />
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
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    layout: PropTypes.oneOf(['stacked', 'inline'])
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
    const classes = {
      [styles.root]: true,
      [styles[this.props.variant]]: true
    }

    return (
      <FormFieldGroup
        description={this.props.description}
        messages={this.props.messages}
        disabled={this.props.disabled}
        layout={this.props.layout}
        rowSpacing="small"
      >
        <div className={classnames(classes)}>
          {this.renderChildren()}
        </div>
      </FormFieldGroup>
    )
  }
}
