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
import classnames from 'classnames'
import keycode from 'keycode'

import themeable from '@instructure/ui-themeable'
import { Children, controllable } from '@instructure/ui-prop-types'
import { pickProps, omitProps } from '@instructure/ui-utils/lib/react/passthroughProps'
import isActiveElement from '@instructure/ui-utils/lib/dom/isActiveElement'
import IconArrowOpenDown from '@instructure/ui-icons/lib/Solid/IconArrowOpenDown'
import uid from '@instructure/uid'
import deprecated, { changedPackageWarning } from '@instructure/ui-utils/lib/react/deprecated'

import FormField from '@instructure/ui-forms/lib/components/FormField'
import FormPropTypes from '@instructure/ui-forms/lib/utils/FormPropTypes'

import styles from './styles.css'
import theme from './theme'

@deprecated('5.0.0', null, changedPackageWarning(
  'ui-core',
  'ui-forms'
))
@themeable(theme, styles)
class Select extends Component {
  static propTypes = {
    /**
    * Children must be option tags.
    */
    children: Children.oneOf(['option']),
    label: PropTypes.node.isRequired,
    disabled: PropTypes.bool,
    /**
    * object with shape: `{
    * text: PropTypes.string,
    * type: PropTypes.oneOf(['error', 'hint', 'success', 'screenreader-only'])
    *   }`
    */
    messages: PropTypes.arrayOf(FormPropTypes.message),
    id: PropTypes.string,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    layout: PropTypes.oneOf(['stacked', 'inline']),
    required: PropTypes.bool,
    inline: PropTypes.bool,
    width: PropTypes.string,
    /**
    * a function that provides a reference to the actual select element
    */
    selectRef: PropTypes.func,
    /**
    * value to set on initial render
    */
    defaultValue: PropTypes.string,
    /**
    * the selected value (must be accompanied by an `onChange` prop)
    */
    value: controllable(PropTypes.string),
    /**
    * when used with the `value` prop, the component will not control its own state
    */
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onKeyDown: PropTypes.func
  }

  static defaultProps = {
    inline: false,
    type: 'text',
    size: 'medium',
    layout: 'stacked',
    messages: [],
    disabled: false,
    selectRef: function (select) {}
  }

  constructor (props) {
    super()

    this._defaultId = uid('Select')
  }

  get id () {
    return this.props.id || this._defaultId
  }

  get invalid () {
    return this.props.messages && this.props.messages.findIndex((message) => { return message.type === 'error' }) >= 0
  }

  get focused () {
    return isActiveElement(this._select)
  }

  get value () {
    return this._select.value
  }

  focus () {
    this._select.focus()
  }

  handleChange = (e) => {
    const { onChange, disabled } = this.props

    if (disabled) {
      e.preventDefault()
      return
    }

    if (typeof onChange === 'function') {
      onChange(e)
    }
  }

  handleKeyDown = (e) => {
    const { onKeyDown, disabled } = this.props

    const keycodes = [
      keycode.codes.space,
      keycode.codes.up,
      keycode.codes.down
    ]

    if (disabled && (keycodes.includes(e.keyCode) ||
      (e.keyCode >= 48 && e.keyCode <= 57) || // 0 - 9
      (e.keyCode >= 65 && e.keyCode <= 90) || // A - Z
      (e.keyCode >= 96 && e.keyCode <= 105) // numpad 0 - 9
    )) {
      e.preventDefault()
      return
    }

    if (typeof onKeyDown === 'function') {
      onKeyDown(e)
    }
  }

  render () {
    const {
      size,
      children,
      width,
      layout,
      selectRef,
      onBlur,
      required,
      disabled,
      value,
      defaultValue
    } = this.props

    const props = omitProps(this.props, Select.propTypes)

    const classes = {
      [styles.root]: true,
      [styles[size]]: size,
      [styles.disabled]: disabled
    }

    const style = width ? { width } : null

    return (
      <FormField
        {...pickProps(this.props, FormField.propTypes)}
        layout={layout}
        id={this.id}
      >
        <span className={classnames(classes)} style={style}>
          <select
            {...props}
            id={this.id}
            ref={(select, ...args) => {
              this._select = select
              selectRef.apply(this, [select].concat(args))
            }}
            value={value}
            defaultValue={defaultValue}
            onBlur={onBlur}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
            className={styles.select}
            required={required}
            aria-required={required}
            aria-invalid={this.invalid ? 'true' : null}
            aria-disabled={disabled ? 'true' : null}
            disabled={disabled}
          >
            {children}
          </select>
          <IconArrowOpenDown className={styles.arrow} />
        </span>
      </FormField>
    )
  }
}

export default Select
