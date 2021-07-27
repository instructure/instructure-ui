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
import keycode from 'keycode'

import { controllable } from '@instructure/ui-prop-types'
import {
  FormPropTypes,
  FormFieldMessages,
  FormMessage
} from '@instructure/ui-form-field'
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
import generateComponentTheme from './theme'

type Props = {
  makeStyles?: (...args: any[]) => any
  styles?: any
  label: React.ReactNode
  id?: string
  value?: string | number
  messages?: FormMessage[]
  defaultChecked?: boolean
  checked?: any // TODO: controllable(PropTypes.bool, 'onChange', 'defaultChecked')
  onChange?: (...args: any[]) => any
  onKeyDown?: (...args: any[]) => any
  onFocus?: (...args: any[]) => any
  onBlur?: (...args: any[]) => any
  onMouseOver?: (...args: any[]) => any
  onMouseOut?: (...args: any[]) => any
  disabled?: boolean
  readOnly?: boolean
  indeterminate?: boolean
  size?: 'small' | 'medium' | 'large'
  variant?: 'simple' | 'toggle'
  inline?: boolean
  labelPlacement?: 'top' | 'start' | 'end'
}

/**
---
category: components
---
**/

@withStyle(generateStyle, generateComponentTheme)
@testable()
class Checkbox extends Component<Props> {
  static readonly componentId = 'Checkbox'

  static propTypes = {
    // eslint-disable-next-line react/require-default-props
    makeStyles: PropTypes.func,
    // eslint-disable-next-line react/require-default-props
    styles: PropTypes.object,
    label: PropTypes.node.isRequired,
    id: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
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
    checked: controllable(PropTypes.bool, 'onChange', 'defaultChecked'),
    /**
     * when used with the `checked` prop, the component will not control its own state
     */
    onChange: PropTypes.func,
    onKeyDown: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onMouseOver: PropTypes.func,
    onMouseOut: PropTypes.func,
    /**
     * Whether or not to disable the checkbox
     */
    disabled: PropTypes.bool,
    /**
     * Works just like disabled but keeps the same styles as if it were active
     */
    readOnly: PropTypes.bool,
    /**
     * Visual state showing that child checkboxes are a combination of checked and unchecked
     */
    indeterminate: PropTypes.bool,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    variant: PropTypes.oneOf(['simple', 'toggle']),
    inline: PropTypes.bool,
    labelPlacement: PropTypes.oneOf(['top', 'start', 'end'])
  }

  static defaultProps = {
    size: 'medium',
    variant: 'simple',
    disabled: false,
    inline: false,
    indeterminate: false,
    readOnly: false,
    onChange: undefined,
    onKeyDown: undefined,
    onFocus: undefined,
    onBlur: undefined,
    onMouseOut: undefined,
    onMouseOver: undefined,
    checked: undefined,
    defaultChecked: undefined,
    messages: undefined,
    id: undefined,
    value: undefined,
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
        css={styles.checkbox}
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
          // @ts-expect-error ts-migrate(2322) FIXME: Type '"mixed" | null' is not assignable to type 'b... Remove this comment to see the full error message
          aria-checked={indeterminate ? 'mixed' : null}
          css={styles.input}
          onChange={this.handleChange}
          onKeyDown={createChainedFunction(onKeyDown, this.handleKeyDown)}
          onFocus={createChainedFunction(onFocus, this.handleFocus)}
          onBlur={createChainedFunction(onBlur, this.handleBlur)}
          checked={this.checked}
        />
        <label htmlFor={this.id} css={styles.control}>
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
