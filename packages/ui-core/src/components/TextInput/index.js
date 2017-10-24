import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import shortid from 'shortid'
import CustomPropTypes from '@instructure/ui-utils/lib/react/CustomPropTypes'
import themeable from '@instructure/ui-themeable'
import isActiveElement from '@instructure/ui-utils/lib/dom/isActiveElement'
import { pickProps, omitProps } from '@instructure/ui-utils/lib/react/passthroughProps'

import styles from './styles.css'
import theme from './theme'

import FormField from '../FormField'

/**
---
category: components/forms
---
**/
@themeable(theme, styles)
class TextInput extends Component {
  /* eslint-disable react/require-default-props */
  static propTypes = {
    type: PropTypes.oneOf(['text', 'email', 'url', 'tel', 'search', 'password']),
    label: PropTypes.node.isRequired,
    id: PropTypes.string,
    /**
    * object with shape: `{
    * text: PropTypes.string,
    * type: PropTypes.oneOf(['error', 'hint', 'success', 'screenreader-only'])
    *   }`
    */
    messages: PropTypes.arrayOf(CustomPropTypes.message),
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    layout: PropTypes.oneOf(['stacked', 'inline']),
    width: PropTypes.string,
    inline: PropTypes.bool,
    /**
    * Html placeholder text to display when the input has no value. This should be hint text, not a label
    * replacement.
    */
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    required: PropTypes.bool,
    /**
    * a function that provides a reference to the actual input element
    */
    inputRef: PropTypes.func,
    /**
    * value to set on initial render
    */
    defaultValue: PropTypes.string,
    /**
    * the selected value (must be accompanied by an `onChange` prop)
    */
    value: CustomPropTypes.controllable(PropTypes.string),
    /**
    * An icon to display within the input
    */
    icon: PropTypes.func
  };
  /* eslint-enable react/require-default-props */

  static defaultProps = {
    inline: false,
    type: 'text',
    size: 'medium',
    messages: [],
    disabled: false,
    inputRef: function (input) {},
    layout: 'stacked'
  };

  constructor (props) {
    super()

    this._defaultId = `TextInput_${shortid.generate()}`
    this._messagesId = `TextInput__messages-${shortid.generate()}`
  }

  /**
  * focus the input element
  */
  focus () {
    this._input.focus()
  }

  get hasMessages () {
    return this.props.messages && (this.props.messages.length > 0)
  }

  get invalid () {
    return this.props.messages && this.props.messages.findIndex((message) => { return message.type === 'error' }) >= 0
  }

  get id () {
    return this.props.id || this._defaultId
  }

  get focused () {
    return isActiveElement(this._input)
  }

  get value () {
    return this._input.value
  }

  renderIcon () {
    const Icon = this.props.icon

    if (typeof Icon === 'function') {
      return (
        <span className={styles.icon} aria-hidden="true">
          <Icon />
        </span>
      )
    } else {
      return null
    }
  }

  render () {
    const {
      type,
      size,
      placeholder,
      value,
      defaultValue,
      disabled,
      required,
      width,
      inputRef,
      icon
    } = this.props

    const props = omitProps(this.props, TextInput.propTypes)

    const classes = {
      [styles.input]: true,
      [styles[size]]: size,
      [styles.hasIcon]: icon
    }

    const style = width ? { width } : null

    return (
      <FormField
        {...pickProps(this.props, FormField.propTypes)}
        id={this.id}
        messagesId={this._messagesId}
      >
        <span className={styles.layout}>
          <input
            {...props}
            value={value}
            style={style}
            defaultValue={defaultValue}
            placeholder={placeholder}
            ref={(input, ...args) => {
              this._input = input
              inputRef.apply(this, [input].concat(args))
            }}
            type={type}
            id={this.id}
            required={required}
            aria-required={required}
            aria-invalid={this.invalid ? 'true' : null}
            disabled={disabled}
            aria-disabled={disabled ? 'true' : null}
            className={classnames(classes)}
            aria-describedby={this.hasMessages ? this._messagesId : null}
          />
          {this.renderIcon()}
        </span>
      </FormField>
    )
  }
}

export default TextInput
