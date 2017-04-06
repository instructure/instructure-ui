import React, { Component, PropTypes } from 'react'
import CustomPropTypes from '../../util/CustomPropTypes'
import { pickProps } from '../../util/passthroughProps'
import FormFieldLayout from './FormFieldLayout'

/**
---
category: forms
---
  This is a helper component that is used by most of the custom form
  components. In most cases it shouldn't be used directly.

  ```jsx_example
  <FormField id="foo" label="Opacity">
    <input id="foo" type="range"/>
  </FormField>
  ```
**/
class FormField extends Component {
  static propTypes = {
    label: PropTypes.node.isRequired,
    /**
    * the id of the input (to link it to its label for a11y)
    */
    id: PropTypes.string.isRequired,
    /**
    * object with shape: `{
    * text: PropTypes.string,
    * type: PropTypes.oneOf(['error', 'hint', 'success', 'screenreader-only'])
    *   }`
    */
    messages: PropTypes.arrayOf(CustomPropTypes.message),
    children: PropTypes.node,
    isBlock: PropTypes.bool,
    layout: PropTypes.oneOf(['stacked', 'inline']),
    vAlign: PropTypes.oneOf(['top', 'middle', 'bottom'])
  };

  static defaultProps = {
    isBlock: true,
    layout: 'stacked',
    vAlign: 'middle'
  };

  render () {
    return (
      <FormFieldLayout
        {...pickProps(this.props, FormFieldLayout.propTypes)}
        vAlign={this.props.vAlign}
        as="label"
        htmlFor={this.props.id}
      />
    )
  }
}

export default FormField
export { default as FormFieldLayout } from './FormFieldLayout'
export { default as FormFieldLabel } from './FormFieldLabel'
export { default as FormFieldMessage } from './FormFieldMessage'
export { default as FormFieldMessages } from './FormFieldMessages'
