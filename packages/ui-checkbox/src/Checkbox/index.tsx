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
import keycode from 'keycode'

import { FormFieldMessages } from '@instructure/ui-form-field'
import { createChainedFunction } from '@instructure/ui-utils'
import { logError as error } from '@instructure/console'
import { uid } from '@instructure/uid'
import { isActiveElement } from '@instructure/ui-dom-utils'
import { omitProps } from '@instructure/ui-react-utils'
import { View } from '@instructure/ui-view'
import { testable } from '@instructure/ui-testable'

import { withStyle, jsx } from '@instructure/emotion'

import { CheckboxFacade } from './CheckboxFacade'
import { ToggleFacade } from './ToggleFacade'

import generateStyle from './styles'

import { propTypes, allowedProps } from './props'
import type { CheckboxProps } from './props'

/**
---
category: components
tags: toggle, switch
---
**/

@withStyle(generateStyle, null)
@testable()
class Checkbox extends Component<CheckboxProps> {
  static readonly componentId = 'Checkbox'

  static propTypes = propTypes
  static allowedProps = allowedProps
  static defaultProps = {
    size: 'medium',
    variant: 'simple',
    disabled: false,
    inline: false,
    indeterminate: false,
    readOnly: false,
    labelPlacement: 'end'
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
  constructor(props) {
    super(props)

    this.state = {
      focused: false,
      hovered: false
    }

    if (typeof props.checked === 'undefined') {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'checked' does not exist on type 'Readonl... Remove this comment to see the full error message
      this.state.checked = !!props.defaultChecked
    }

    // @ts-expect-error ts-migrate(2339) FIXME: Property '_defaultId' does not exist on type 'Chec... Remove this comment to see the full error message
    this._defaultId = uid('Checkbox')
  }

  componentDidMount() {
    // see https://github.com/facebook/react/issues/1798
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_input' does not exist on type 'Checkbox... Remove this comment to see the full error message
    this._input.indeterminate = this.props.indeterminate

    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.makeStyles()
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'prevProps' implicitly has an 'any' type... Remove this comment to see the full error message
  componentDidUpdate(prevProps) {
    // see https://github.com/facebook/react/issues/1798
    if (prevProps.indeterminate !== this.props.indeterminate) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property '_input' does not exist on type 'Checkbox... Remove this comment to see the full error message
      this._input.indeterminate = this.props.indeterminate
    }

    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.makeStyles()
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'e' implicitly has an 'any' type.
  handleChange = (e) => {
    const { onChange, disabled, checked, readOnly } = this.props

    if (disabled || readOnly) {
      e.preventDefault()
      return
    }

    if (typeof checked === 'undefined') {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'checked' does not exist on type 'Readonl... Remove this comment to see the full error message
      this.setState({ checked: !this.state.checked })
    }

    if (typeof onChange === 'function') {
      onChange(e)
    }
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'e' implicitly has an 'any' type.
  handleKeyDown = (e) => {
    if (
      this.props.variant === 'toggle' &&
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'return' does not exist on type 'CodesMap... Remove this comment to see the full error message
      (e.keyCode === keycode.codes.enter || e.keyCode === keycode.codes.return)
    ) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property '_input' does not exist on type 'Checkbox... Remove this comment to see the full error message
      this._input.click()
      e.preventDefault()
    }
  }

  // @ts-expect-error ts-migrate(6133) FIXME: 'e' is declared but its value is never read.
  handleFocus = (e) => {
    this.setState({
      focused: true
    })
  }

  // @ts-expect-error ts-migrate(6133) FIXME: 'e' is declared but its value is never read.
  handleBlur = (e) => {
    this.setState({
      focused: false
    })
  }

  // @ts-expect-error ts-migrate(6133) FIXME: 'e' is declared but its value is never read.
  handleMouseOver = (e) => {
    this.setState({
      hovered: true
    })
  }

  // @ts-expect-error ts-migrate(6133) FIXME: 'e' is declared but its value is never read.
  handleMouseOut = (e) => {
    this.setState({
      hovered: false
    })
  }

  get id() {
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_defaultId' does not exist on type 'Chec... Remove this comment to see the full error message
    return this.props.id || this._defaultId
  }

  get checked() {
    return typeof this.props.checked === 'undefined'
      ? // @ts-expect-error ts-migrate(2339) FIXME: Property 'checked' does not exist on type 'Readonl... Remove this comment to see the full error message
        this.state.checked
      : this.props.checked
  }

  get focused() {
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_input' does not exist on type 'Checkbox... Remove this comment to see the full error message
    return isActiveElement(this._input)
  }

  focus() {
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_input' does not exist on type 'Checkbox... Remove this comment to see the full error message
    this._input && this._input.focus()
  }

  renderFacade() {
    const {
      size,
      disabled,
      variant,
      label,
      readOnly,
      indeterminate,
      labelPlacement,
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'themeOverride' does not exist on type 'R... Remove this comment to see the full error message
      // eslint-disable-next-line react/prop-types
      themeOverride
    } = this.props

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'hovered' does not exist on type 'Readonl... Remove this comment to see the full error message
    const { hovered, focused } = this.state

    error(
      !(variant === 'simple' && labelPlacement !== 'end'),
      `[Checkbox] The \`simple\` variant does not support the \`labelPlacement\` property.  Use the \`toggle\` variant instead.`
    )

    if (variant === 'toggle') {
      return (
        <ToggleFacade
          disabled={disabled}
          size={size}
          // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
          hovered={hovered}
          focused={focused}
          checked={this.checked}
          readOnly={readOnly}
          labelPlacement={labelPlacement}
          themeOverride={themeOverride}
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
          indeterminate={indeterminate}
          // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
          themeOverride={themeOverride}
        >
          {label}
        </CheckboxFacade>
      )
    }
  }

  renderMessages() {
    const { messages } = this.props

    return messages && messages.length > 0 ? (
      <View display="block" margin="small 0 0">
        <FormFieldMessages messages={messages} />
      </View>
    ) : null
  }

  render() {
    const {
      disabled,
      readOnly,
      value,
      onKeyDown,
      onFocus,
      onBlur,
      onMouseOver,
      onMouseOut,
      indeterminate,
      variant,
      styles
    } = this.props

    const props = omitProps(this.props, Checkbox.propTypes)

    error(
      !(variant === 'toggle' && indeterminate),
      `[Checkbox] The \`toggle\` variant does not support the \`indeterminate\` property. Use the \`simple\` variant instead.`
    )

    /* eslint-disable jsx-a11y/mouse-events-have-key-events */

    return (
      <div
        css={styles?.checkbox}
        onMouseOver={createChainedFunction(onMouseOver, this.handleMouseOver)}
        onMouseOut={createChainedFunction(onMouseOut, this.handleMouseOut)}
      >
        <input
          {...props}
          id={this.id}
          value={value}
          type="checkbox"
          ref={(c) => {
            // @ts-expect-error ts-migrate(2339) FIXME: Property '_input' does not exist on type 'Checkbox... Remove this comment to see the full error message
            this._input = c
          }}
          disabled={disabled || readOnly}
          aria-checked={indeterminate ? 'mixed' : undefined}
          css={styles?.input}
          onChange={this.handleChange}
          onKeyDown={createChainedFunction(onKeyDown, this.handleKeyDown)}
          onFocus={createChainedFunction(onFocus, this.handleFocus)}
          onBlur={createChainedFunction(onBlur, this.handleBlur)}
          checked={this.checked}
        />
        <label htmlFor={this.id} css={styles?.control}>
          {this.renderFacade()}
          {this.renderMessages()}
        </label>
      </div>
    )

    /* eslint-enable jsx-a11y/mouse-events-have-key-events */
  }
}

export default Checkbox
export { Checkbox, CheckboxFacade, ToggleFacade }
