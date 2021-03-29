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

/** @jsx jsx */
import { Component } from 'react'
import PropTypes from 'prop-types'

import { uid } from '@instructure/uid'
import { testable } from '@instructure/ui-testable'
import { omitProps } from '@instructure/ui-react-utils'
import { isActiveElement } from '@instructure/ui-dom-utils'

import { withStyle, jsx } from '@instructure/emotion'

import generateStyle from './styles'
import generateComponentTheme from './theme'
/**
---
category: components
---
**/
@withStyle(generateStyle, generateComponentTheme)
@testable()
class RadioInput extends Component {
  static propTypes = {
    // eslint-disable-next-line react/require-default-props
    makeStyles: PropTypes.func,
    // eslint-disable-next-line react/require-default-props
    styles: PropTypes.object,
    label: PropTypes.node.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    id: PropTypes.string,
    name: PropTypes.string,
    checked: PropTypes.bool,
    /**
     * Whether or not to disable the input
     */
    disabled: PropTypes.bool,
    /**
     * Works just like disabled but keeps the same styles as if it were active
     */
    readOnly: PropTypes.bool,
    variant: PropTypes.oneOf(['simple', 'toggle']),
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    context: PropTypes.oneOf(['success', 'warning', 'danger', 'off']),
    inline: PropTypes.bool,
    onClick: PropTypes.func,
    onChange: PropTypes.func
  }

  static defaultProps = {
    onClick: function (event) {},
    onChange: function (event) {},
    variant: 'simple',
    size: 'medium',
    disabled: false,
    inline: false,
    context: 'success',
    readOnly: false,
    checked: undefined,
    id: undefined,
    name: undefined,
    value: undefined
  }

  constructor(props) {
    super(props)

    this.state = {}

    if (typeof props.checked === 'undefined') {
      this.state.checked = false
    }

    this._defaultId = uid('RadioInput')
  }

  componentDidMount() {
    this.props.makeStyles()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.props.makeStyles()
  }

  handleClick = (e) => {
    if (this.props.disabled || this.props.readOnly) {
      e.preventDefault()
      return
    }

    this.props.onClick(e)
  }

  handleChange = (e) => {
    if (this.props.disabled || this.props.readOnly) {
      e.preventDefault()
      return
    }

    if (typeof this.props.checked === 'undefined') {
      this.setState({ checked: !this.state.checked })
    }

    this.props.onChange(e)
  }

  focus() {
    this._input.focus()
  }

  get id() {
    return this.props.id || this._defaultId
  }

  get focused() {
    return isActiveElement(this._input)
  }

  get checked() {
    return typeof this.props.checked === 'undefined'
      ? this.state.checked
      : this.props.checked
  }

  render() {
    const { disabled, readOnly, label, value, name, styles } = this.props

    const props = omitProps(this.props, RadioInput.propTypes)

    return (
      <div css={styles.radioInput}>
        <input
          {...props}
          id={this.id}
          ref={(c) => {
            this._input = c
          }}
          value={value}
          name={name}
          checked={this.checked}
          type="radio"
          css={styles.input}
          disabled={disabled || readOnly}
          aria-disabled={disabled || readOnly ? 'true' : null}
          onChange={this.handleChange}
          onClick={this.handleClick}
        />
        <label css={styles.control} htmlFor={this.id}>
          <span css={styles.facade} aria-hidden="true" />
          <span css={styles.label}>{label}</span>
        </label>
      </div>
    )
  }
}

export default RadioInput
export { RadioInput }
