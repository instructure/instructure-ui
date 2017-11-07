import React, { Children, Component } from 'react'
import PropTypes from 'prop-types'

import CustomPropTypes from '@instructure/ui-utils/lib/react/CustomPropTypes'
import safeCloneElement from '@instructure/ui-utils/lib/react/safeCloneElement'
import matchComponentTypes from '@instructure/ui-utils/lib/react/matchComponentTypes'
import { pickProps, omitProps } from '@instructure/ui-utils/lib/react/passthroughProps'
import uid from '@instructure/ui-utils/lib/uid'

import RadioInput from '../RadioInput'

import FormFieldGroup from '../FormFieldGroup'

/**
---
category: components/forms
---
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

    this._messagesId = `RadioInputGroup__messages-${uid()}`
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
