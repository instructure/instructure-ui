import React, { Children, Component } from 'react'
import PropTypes from 'prop-types'

import uid from '@instructure/ui-utils/lib/uid'
import CustomPropTypes from '@instructure/ui-utils/lib/react/CustomPropTypes'
import safeCloneElement from '@instructure/ui-utils/lib/react/safeCloneElement'
import { pickProps, omitProps } from '@instructure/ui-utils/lib/react/passthroughProps'
import matchComponentTypes from '@instructure/ui-utils/lib/react/matchComponentTypes'

import Checkbox from '../Checkbox'
import FormFieldGroup from '../FormFieldGroup'

/**
---
category: components/forms
---
  A `<CheckboxGroup/>` is a group of [Checkbox](#Checkbox) components that share the same name. You can
  set an array `value` for the entire group and it will handle setting the `checked` and `name` props for you.
  The Checkbox components can be rendered vertically or horizontally using the `layout` property.
  ```jsx_example
  <FormFieldGroup description={<ScreenReaderContent>CheckboxGroup examples</ScreenReaderContent>}>
    <CheckboxGroup name="sports"
      onChange={function (value) { console.log(value) }}
      defaultValue={['football', 'volleyball']}
      description="Select your favorite sports">
      <Checkbox label="Football" value="football" />
      <Checkbox label="Basketball" value="basketball" />
      <Checkbox label="Volleyball" value="volleyball" />
      <Checkbox label="Other" value="other" />
    </CheckboxGroup>
    <CheckboxGroup name="sports" size="small"
      layout="columns"
      onChange={function (value) { console.log(value) }}
      defaultValue={['football', 'volleyball']}
      description="Select your favorite sports">
      <Checkbox label="Football" value="football" />
      <Checkbox label="Basketball" value="basketball" />
      <Checkbox label="Volleyball" value="volleyball" />
      <Checkbox label="Other" value="other" />
    </CheckboxGroup>
  </FormFieldGroup>
  ```

  The `toggle` variant with `layout` prop set to `inline` and an error message:
  ```jsx_example
  <CheckboxGroup
    name="sports2"
    layout="inline"
    messages={[
      { text: 'Invalid name', type: 'error' }
    ]}
    onChange={function (value) { console.log(value) }}
    defaultValue={['soccer', 'volleyball']}
    description="I wish to receive score alerts for">
    <Checkbox label="Football" value="football" variant="toggle" />
    <Checkbox label="Basketball" value="basketball" variant="toggle" />
    <Checkbox label="Volleyball" value="volleyball" variant="toggle" />
    <Checkbox label="Soccer" value="soccer" variant="toggle" />
  </CheckboxGroup>
  ```

  You can set disable/readonly on a group and it works much the same way as a RadioInputGroup

  ReadOnly:
  ```jsx_example
    <CheckboxGroup
    name="sports3"
    onChange={function (value) { console.log(value) }}
    defaultValue={['soccer', 'volleyball']}
    description="I wish to receive score alerts for"
    readOnly
  >
    <Checkbox label="Football" value="football" variant="toggle" />
    <Checkbox label="Basketball" value="basketball" variant="toggle" />
    <Checkbox label="Volleyball" value="volleyball" variant="toggle" />
    <Checkbox label="Soccer" value="soccer" variant="toggle" />
  </CheckboxGroup>
  ```
  Disabled:
  ```jsx_example
    <CheckboxGroup
    name="sports4"
    onChange={function (value) { console.log(value) }}
    defaultValue={['soccer', 'volleyball']}
    description="I wish to receive score alerts for"
    disabled
  >
    <Checkbox label="Football" value="football" variant="toggle" />
    <Checkbox label="Basketball" value="basketball" variant="toggle" />
    <Checkbox label="Volleyball" value="volleyball" variant="toggle" />
    <Checkbox label="Soccer" value="soccer" variant="toggle" />
  </CheckboxGroup>
  ```
**/
export default class CheckboxGroup extends Component {
  /* eslint-disable react/require-default-props */
  static propTypes = {
    name: PropTypes.string.isRequired,
    description: PropTypes.node.isRequired,
    /**
    * value to set on initial render
    */
    defaultValue: PropTypes.array, // eslint-disable-line react/forbid-prop-types
    /**
    * the selected values (must be accompanied by an `onChange` prop)
    */
    value: CustomPropTypes.controllable(PropTypes.array),
    /**
    * when used with the `value` prop, the component will not control its own state
    */
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,
    /**
    * object with shape: `{
    text: PropTypes.string,
    type: PropTypes.oneOf(['error', 'hint', 'success', 'screenreader-only'])
      }`
    */
    messages: PropTypes.arrayOf(CustomPropTypes.message),
    /**
    * children of type `Checkbox`
    */
    children: CustomPropTypes.Children.oneOf([Checkbox]),
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    layout: PropTypes.oneOf([
      'stacked',
      'columns',
      'inline'
    ])
  };
  /* eslint-enable react/require-default-props */

  static defaultProps = {
    disabled: false,
    readOnly: false,
    size: 'medium',
    layout: 'stacked'
  };

  constructor (props) {
    super()

    if (props.value === undefined) {
      this.state = {
        value: props.defaultValue
      }
    }

    this._messagesId = `CheckboxGroup__messages-${uid()}`
  }

  get hasMessages () {
    return this.props.messages && (this.props.messages.length > 0)
  }

  handleChange = (e) => {
    const newValue = this.value || []

    if (this.props.disabled || this.props.readOnly) {
      e.preventDefault()
      return
    }

    if (e.target.checked) {
      newValue.push(e.target.value)
    } else {
      newValue.splice(newValue.indexOf(e.target.value), 1)
    }

    if (this.props.value === undefined) {
      this.setState({value: newValue})
    }

    if (typeof this.props.onChange === 'function') {
      this.props.onChange(newValue)
    }
  };

  get value () {
    if (this.props.value === undefined && this.state.value === undefined) {
      return []
    } else {
      return (this.props.value === undefined) ? [...this.state.value] : [...this.props.value]
    }
  }

  renderChildren () {
    const {
      children,
      name,
      size,
      disabled,
      readOnly
    } = this.props

    return Children.map(children, (child, index) => {
      if (matchComponentTypes(child, [Checkbox])) {
        return safeCloneElement(child, {
          key: `${child.props.name}`,
          name,
          disabled: (disabled || child.props.disabled),
          readOnly: (readOnly || child.props.readOnly),
          size,
          checked: (this.value.indexOf(child.props.value) > -1),
          onChange: this.handleChange,
          width: child.props.width || 'auto',
          'aria-describedby': this.hasMessages && this._messagesId
        })
      } else {
        return child
      }
    })
  }

  render () {
    return (
      <FormFieldGroup
        {...omitProps(this.props, CheckboxGroup.propTypes)}
        {...pickProps(this.props, FormFieldGroup.propTypes)}
        rowSpacing="small"
        vAlign="top"
        messagesId={this._messagesId}
      >
        {this.renderChildren()}
      </FormFieldGroup>
    )
  }
}
