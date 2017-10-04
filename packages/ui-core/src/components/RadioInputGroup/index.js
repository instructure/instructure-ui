import React, { Children, Component } from 'react'
import PropTypes from 'prop-types'
import shortid from 'shortid'

import CustomPropTypes from '@instructure/ui-utils/lib/react/CustomPropTypes'
import safeCloneElement from '@instructure/ui-utils/lib/react/safeCloneElement'
import matchComponentTypes from '@instructure/ui-utils/lib/react/matchComponentTypes'
import { pickProps, omitProps } from '@instructure/ui-utils/lib/react/passthroughProps'

import RadioInput from '../RadioInput'

import FormFieldGroup from '../FormFieldGroup'

/**
---
category: forms
---
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
    const handleChange = function (value) {
      console.log(value)
    }
    return (
      <RadioInputGroup onChange={handleChange} name="example1" defaultValue="foo" description="Select something">
        {inputs.map(input => <RadioInput key={input.value} value={input.value} label={input.label} />)}
      </RadioInputGroup>
    )
  }
  <Example />
  ```
  With the `layout` prop set to `inline` to render the description in its own column at screens `medium` size
  and up (see [Grid](#Grid)).
  ```js_example
  function Example () {
    const inputs = [
      {value: 'foo', label: lorem.sentence() },
      {value: 'bar', label: lorem.sentence() },
      {value: 'baz', label: lorem.sentence() }
    ]
    return (
      <RadioInputGroup
        name="example2"
        defaultValue="foo"
        description="Select something"
        layout="inline">
        {inputs.map(input => <RadioInput key={input.value} value={input.value} label={input.label} />)}
      </RadioInputGroup>
    )
  }
  <Example />
  ```
  With the `layout` property set to `columns` the inputs will render horizontally at screens `medium` size
  and up (see [Grid](#Grid)).
  ```js_example
  function Example () {
    const inputs = [
      {value: 'foo', label: lorem.sentence() },
      {value: 'bar', label: lorem.sentence() },
      {value: 'baz', label: lorem.sentence() }
    ]
    return (
      <RadioInputGroup
        layout="columns"
        name="example3"
        defaultValue="foo"
        description="Select something"
      >
        {inputs.map(input =>
          <RadioInput
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
  <FormFieldGroup description={<ScreenReaderContent>Toggle examples</ScreenReaderContent>}>
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
  </FormFieldGroup>
  ```

  Set the `context` prop on each `<RadioInput>` to convey context via the toggle's
  background color. Default context is `success`.

  ```jsx_example
  <RadioInputGroup
    layout="inline"
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
    name="fruits1"
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
  <RadioInputGroup name="feature1" defaultValue="off" description="Super-awesome feature" variant="toggle" disabled>
    <RadioInput label="Off" value="off" context="off" />
    <RadioInput label="Allow" value="allow" />
    <RadioInput label="On" value="on" />
  </RadioInputGroup>
  ```

  Or disable an individual RadioInput component via its `disabled` prop.

  ```jsx_example
  <RadioInputGroup
    name="fruits2"
    defaultValue="banana"
    description="Fruits"
    layout="columns"
  >
    <RadioInput label="Apple" value="apple" />
    <RadioInput label="Orange" value="orange" disabled />
    <RadioInput label="Banana" value="banana" />
  </RadioInputGroup>
  ```

  ```jsx_example
  <RadioInputGroup name="feature2" defaultValue="none" description="Super-awesome feature" variant="toggle">
    <RadioInput label="None" value="none" context="off" />
    <RadioInput label="Some" value="some" />
    <RadioInput label="All" value="all" disabled />
  </RadioInputGroup>
  ```

  Use the readOnly prop to cause the same affect as disabled except the styling makes it look active.

  ```jsx_example
  <RadioInputGroup name="readonlyex" defaultValue="none" description="Super-awesome feature" variant="toggle" readOnly>
    <RadioInput label="None" value="none" context="off" />
    <RadioInput label="Some" value="some" />
    <RadioInput label="All" value="all" />
  </RadioInputGroup>
  ```

  If you would like to make the description visible only to screen readers you can use the
  [ScreenReaderContent](#ScreenReaderContent) component.

  ```jsx_example
  <RadioInputGroup
    name="fruit3"
    defaultValue="banana"
    description={
      <ScreenReaderContent>Select a fruit</ScreenReaderContent>
    }
    messages={[{ text: 'Invalid choice', type: 'error' }]}
  >
    <RadioInput label="Apple" value="apple" />
    <RadioInput label="Orange" value="orange" />
    <RadioInput label="Banana" value="banana" />
  </RadioInputGroup>
  ```
**/

export default class RadioInputGroup extends Component {
  /* eslint-disable react/require-default-props */
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
    /** works just like disabled but keeps the same styles as if it were active */
    readOnly: PropTypes.bool,
    /**
    * object with shape: `{
    * text: PropTypes.string,
    * type: PropTypes.oneOf(['error', 'hint', 'success', 'screenreader-only'])
    *   }`
    */
    messages: PropTypes.arrayOf(CustomPropTypes.message),
    /**
    * children of type `RadioInput`
    */
    children: CustomPropTypes.Children.oneOf([RadioInput]),
    variant: PropTypes.oneOf(['simple', 'toggle']), // TODO: split toggle out to its own component
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    /**
    * Note: `columns` will render as `stacked` when variant is `toggle`
    */
    layout: PropTypes.oneOf([
      'stacked',
      'columns',
      'inline'
    ])
  };
  /* eslint-enable react/require-default-props */

  static defaultProps = {
    disabled: false,
    variant: 'simple',
    size: 'medium',
    layout: 'stacked',
    readOnly: false
  };

  constructor (props) {
    super()

    if (props.value === undefined) {
      this.state = {
        value: props.defaultValue
      }
    }

    this._messagesId = `RadioInputGroup__messages-${shortid.generate()}`
  }

  get hasMessages () {
    return this.props.messages && (this.props.messages.length > 0)
  }

  handleChange = (e) => {
    const value = e.target.value

    if (this.props.disabled || this.props.readOnly) {
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
      disabled,
      readOnly
    } = this.props

    // This adds the passed in name property to each RadioInput component
    // and checks the input whose value matches the value property
    return Children.map(children, (child) => {
      if (matchComponentTypes(child, [RadioInput])) {
        return safeCloneElement(child, {
          name,
          disabled: (disabled || child.props.disabled),
          variant,
          size,
          checked: this.value === child.props.value,
          onChange: this.handleChange,
          readOnly: (readOnly || child.props.readOnly),
          width: child.props.width || 'auto',
          'aria-describedby': this.hasMessages && this._messagesId
        })
      } else {
        return child // ignore (but preserve) children that aren't RadioInput
      }
    })
  }

  render () {
    const {
      variant,
      layout
    } = this.props

    return (
      <FormFieldGroup
        {...omitProps(this.props, RadioInputGroup.propTypes)}
        {...pickProps(this.props, FormFieldGroup.propTypes)}
        // TODO: split out toggle variant into its own component
        layout={(variant === 'toggle') ? 'columns' : layout}
        vAlign={(variant === 'toggle') ? 'middle' : 'top'}
        rowSpacing={(variant === 'toggle') ? 'none' : 'small'}
        colSpacing={(variant === 'toggle') ? 'none' : 'small'}
        startAt={(variant === 'toggle') ? 'small' : undefined}
        messagesId={this._messagesId}
      >
        {this.renderChildren()}
      </FormFieldGroup>
    )
  }
}
