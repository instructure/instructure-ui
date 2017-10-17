import React, { Component } from 'react'
import PropTypes from 'prop-types'

import CustomPropTypes from '@instructure/ui-utils/lib/react/CustomPropTypes'
import { pickProps } from '@instructure/ui-utils/lib/react/passthroughProps'

import FormFieldLayout from './FormFieldLayout'

/**
---
category: components/forms
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
  /* eslint-disable react/require-default-props */
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
    messagesId: PropTypes.string,
    children: PropTypes.node,
    inline: PropTypes.bool,
    layout: PropTypes.oneOf(['stacked', 'inline']),
    vAlign: PropTypes.oneOf(['top', 'middle', 'bottom'])
  };
  /* eslint-enable react/require-default-props */

  static defaultProps = {
    inline: false,
    layout: 'stacked',
    messagesId: undefined,
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
