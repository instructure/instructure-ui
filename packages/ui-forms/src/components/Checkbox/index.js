/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 - present Instructure, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import keycode from 'keycode'
import classnames from 'classnames'

import CustomPropTypes from '@instructure/ui-utils/lib/react/CustomPropTypes'
import { omitProps } from '@instructure/ui-utils/lib/react/passthroughProps'
import createChainedFunction from '@instructure/ui-utils/lib/createChainedFunction'
import isActiveElement from '@instructure/ui-utils/lib/dom/isActiveElement'
import themeable from '@instructure/ui-themeable'
import generateElementId from '@instructure/ui-utils/lib/dom/generateElementId'

import { FormFieldMessages } from '../FormField'
import FormPropTypes from '../../utils/FormPropTypes'

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
    messages: PropTypes.arrayOf(FormPropTypes.message),
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

    this._defaultId = generateElementId('Checkbox')
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
      <div
        className={classnames(classes)}
        onMouseOver={createChainedFunction(onMouseOver, this.handleMouseOver)}
        onMouseOut={createChainedFunction(onMouseOut, this.handleMouseOut)}
      >
        <input
          {...props}
          id={this.id}
          value={value}
          type="checkbox"
          ref={(c) => { this._input = c }}
          disabled={disabled || readOnly ? 'true' : null}
          aria-disabled={disabled || readOnly ? 'true' : null}
          className={styles.input}
          onChange={this.handleChange}
          onKeyDown={createChainedFunction(onKeyDown, this.handleKeyDown)}
          onFocus={createChainedFunction(onFocus, this.handleFocus)}
          onBlur={createChainedFunction(onBlur, this.handleBlur)}
          checked={this.checked}
        />
        <label htmlFor={this.id} className={styles.control}>
          { this.renderFacade() }
          <FormFieldMessages messages={messages} />
        </label>
      </div>
    )

     /* eslint-enable jsx-a11y/mouse-events-have-key-events */
  }
}

export default Checkbox
export { default as CheckboxFacade } from './CheckboxFacade'
export { default as ToggleFacade } from './ToggleFacade'
