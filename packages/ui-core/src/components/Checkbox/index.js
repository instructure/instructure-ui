import React, { Component } from 'react'
import PropTypes from 'prop-types'
import keycode from 'keycode'
import classnames from 'classnames'
import shortid from 'shortid'

import CustomPropTypes from '@instructure/ui-utils/lib/react/CustomPropTypes'
import { omitProps } from '@instructure/ui-utils/lib/react/passthroughProps'
import createChainedFunction from '@instructure/ui-utils/lib/createChainedFunction'
import isActiveElement from '@instructure/ui-utils/lib/dom/isActiveElement'
import themeable from '@instructure/ui-themeable'

import { FormFieldMessages } from '../FormField'

import CheckboxFacade from './CheckboxFacade'
import ToggleFacade from './ToggleFacade'

import styles from './styles.css'
import theme from './theme'

/**
---
category: components/forms
---
**/

@themeable(theme, styles)
class Checkbox extends Component {
  /* eslint-disable react/require-default-props */
  static propTypes = {
    label: PropTypes.node.isRequired,
    id: PropTypes.string,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    /**
    * object with shape: `{
    * text: PropTypes.string,
    * type: PropTypes.oneOf(['error', 'hint', 'success', 'screenreader-only'])
    *   }`
    */
    messages: PropTypes.arrayOf(CustomPropTypes.message),
    /* whether to set the input to checked or not on initial render */
    defaultChecked: PropTypes.bool,
    /**
    * whether the input is checked or not (must be accompanied by an `onChange` prop)
    */
    checked: CustomPropTypes.controllable(PropTypes.bool, 'onChange', 'defaultChecked'),
    /**
    * when used with the `checked` prop, the component will not control its own state
    */
    onChange: PropTypes.func,
    onKeyDown: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onMouseOver: PropTypes.func,
    onMouseOut: PropTypes.func,
    disabled: PropTypes.bool,
    /** works exactly like disabled except the styling makes it look active */
    readOnly: PropTypes.bool,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    variant: PropTypes.oneOf(['simple', 'toggle']),
    inline: PropTypes.bool
  }
  /* eslint-enable react/require-default-props */

  static defaultProps = {
    size: 'medium',
    variant: 'simple',
    disabled: false,
    inline: false
  }

  constructor (props) {
    super(props)

    this.state = {
      focused: false,
      hovered: false
    }

    if (props.checked === undefined) {
      this.state.checked = !!props.defaultChecked
    }

    this._defaultId = `Checkbox__${shortid.generate()}`
  }

  handleChange = (e) => {
    const { onChange, disabled, checked, readOnly } = this.props

    if (disabled || readOnly) {
      e.preventDefault()
      return
    }

    if (checked === undefined) {
      this.setState({ checked: !this.state.checked })
    }

    if (typeof onChange === 'function') {
      onChange(e)
    }
  }

  handleKeyDown = (e) => {
    if (this.props.variant === 'toggle' &&
      (e.keyCode === keycode.codes.enter || e.keyCode === keycode.codes.return)) {
      this._input.click()
      e.preventDefault()
    }
  }

  handleFocus = (e) => {
    this.setState({
      focused: true
    })
  }

  handleBlur = (e) => {
    this.setState({
      focused: false
    })
  }

  handleMouseOver = (e) => {
    this.setState({
      hovered: true
    })
  }

  handleMouseOut = (e) => {
    this.setState({
      hovered: false
    })
  }

  get id () {
    return this.props.id || this._defaultId
  }

  get checked () {
    return (this.props.checked === undefined) ? this.state.checked : this.props.checked
  }

  get focused () {
    return isActiveElement(this._input)
  }

  focus () {
    this._input.focus()
  }

  renderFacade () {
    const {
      size,
      disabled,
      variant,
      label,
      readOnly
    } = this.props

    const {
      hovered,
      focused
    } = this.state

    if (variant === 'toggle') {
      return (
        <ToggleFacade
          disabled={disabled}
          size={size}
          hovered={hovered}
          focused={focused}
          checked={this.checked}
          readOnly={readOnly}
        >
          {label}
        </ToggleFacade>
      )
    } else {
      return (
        <CheckboxFacade
          size={size}
          hovered={hovered}
          focused={focused}
          checked={this.checked}
        >
          {label}
        </CheckboxFacade>
      )
    }
  }

  render () {
    const {
      inline,
      disabled,
      messages,
      value,
      onKeyDown,
      onFocus,
      onBlur,
      onMouseOver,
      onMouseOut,
      readOnly
    } = this.props

    const props = omitProps(this.props, Checkbox.propTypes)

    const classes = {
      [styles.root]: true,
      [styles.disabled]: disabled && !readOnly,
      [styles.inline]: inline
    }

    /* eslint-disable jsx-a11y/mouse-events-have-key-events */

    return (
      <label
        className={classnames(classes)}
        htmlFor={this.id}
        onMouseOver={createChainedFunction(onMouseOver, this.handleMouseOver)}
        onMouseOut={createChainedFunction(onMouseOut, this.handleMouseOut)}
      >
        <input
          {...props}
          id={this.id}
          value={value}
          type="checkbox"
          ref={(c) => { this._input = c }}
          aria-disabled={disabled || readOnly ? 'true' : null}
          className={styles.input}
          onChange={this.handleChange}
          onKeyDown={createChainedFunction(onKeyDown, this.handleKeyDown)}
          onFocus={createChainedFunction(onFocus, this.handleFocus)}
          onBlur={createChainedFunction(onBlur, this.handleBlur)}
          checked={this.checked}
        />
        { this.renderFacade() }
        <FormFieldMessages messages={messages} />
      </label>
    )

     /* eslint-enable jsx-a11y/mouse-events-have-key-events */
  }
}

export default Checkbox
export { default as CheckboxFacade } from './CheckboxFacade'
export { default as ToggleFacade } from './ToggleFacade'
