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

import React, { Children, Component } from 'react'
import PropTypes from 'prop-types'

import { Calendar } from '@instructure/ui-calendar'
import { IconCalendarMonthLine } from '@instructure/ui-icons'
import { Popover } from '@instructure/ui-popover'
import { Selectable } from '@instructure/ui-selectable'
import { TextInput } from '@instructure/ui-text-input'
import { createChainedFunction } from '@instructure/ui-utils'
import {
  getInteraction,
  callRenderProp,
  safeCloneElement,
  deprecated,
  passthroughProps
} from '@instructure/ui-react-utils'
import {
  Children as ChildrenPropTypes,
  controllable
} from '@instructure/ui-prop-types'
import { PositionPropTypes } from '@instructure/ui-position'
import { FormPropTypes } from '@instructure/ui-form-field'
import { testable } from '@instructure/ui-testable'
import { themeable } from '@instructure/ui-themeable'

import styles from './styles.css'

/**
---
category: components
---
**/
@deprecated('8.0.0', {
  label: 'renderLabel'
})
@testable()
@themeable(null, styles)
class DateInput extends Component {
  static Day = Calendar.Day

  static propTypes = {
    /**
     * Specifies the input label.
     */
    renderLabel: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
      .isRequired,
    /**
     * __Deprecated - use `renderLabel` instead__
     */
    label: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    /**
     * Specifies the input value.
     */
    value: controllable(PropTypes.string),
    /**
     * Specifies the input size.
     */
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    /**
     * Html placeholder text to display when the input has no value. This should
     * be hint text, not a label replacement.
     */
    placeholder: PropTypes.string,
    /**
     * Callback executed when the input fires a change event.
     * @param {Object} event - the event object
     * @param {Object} data - additional data
     * @param data.value - the new value
     */
    onChange: PropTypes.func,
    /**
     * Callback executed when the input fires a blur event.
     */
    onBlur: PropTypes.func,
    /**
     * Specifies if interaction with the input is enabled, disabled, or readonly.
     * When "disabled", the input changes visibly to indicate that it cannot
     * receive user interactions. When "readonly" the input still cannot receive
     * user interactions but it keeps the same styles as if it were enabled.
     */
    interaction: PropTypes.oneOf(['enabled', 'disabled', 'readonly']),
    /**
     * Specifies if the input is required.
     */
    isRequired: PropTypes.bool,
    /**
     * Controls whether the input is rendered inline with other elements or if it
     * is rendered as a block level element.
     */
    isInline: PropTypes.bool,
    /**
     * Additional helpful text to provide to screen readers about the operation
     * of the component.
     */
    assistiveText: PropTypes.string,
    /**
     * Controls the layout. When set to `stacked`, the label rests on top of the
     * input. When set to `inline` the label is next to the input.
     */
    layout: PropTypes.oneOf(['stacked', 'inline']),
    /**
     * Specifies the width of the input.
     */
    width: PropTypes.string,
    /**
     * Provides a ref to the underlying input element.
     */
    inputRef: PropTypes.func,
    /**
     * Displays messages and validation for the input. It should be an object
     * with the following shape:
     * `{
     *   text: PropTypes.string,
     *   type: PropTypes.oneOf(['error', 'hint', 'success', 'screenreader-only'])
     * }`
     */
    messages: PropTypes.arrayOf(FormPropTypes.message),
    /**
     * The placement of the calendar in relation to the input.
     */
    placement: PositionPropTypes.placement,
    /**
     * Controls whether or not the calendar is showing.
     */
    isShowingCalendar: PropTypes.bool,
    /**
     * Callback fired when the input is blurred. Feedback should be provided
     * to the user when this function is called if the selected date or input
     * value is not valid.
     */
    onRequestValidateDate: PropTypes.func,
    /**
     * Callback fired requesting the calendar be shown.
     */
    onRequestShowCalendar: PropTypes.func,
    /**
     * Callback fired requesting the calendar be hidden.
     */
    onRequestHideCalendar: PropTypes.func,
    /**
     * Callback fired requesting the next day be selected. If no date is currently
     * selected should default to the first day of the currently rendered month.
     */
    onRequestSelectNextDay: PropTypes.func,
    /**
     * Callback fired requesting the previous day be selected. If no date is currently
     * selected should default to the first day of the currently rendered month.
     */
    onRequestSelectPrevDay: PropTypes.func,
    /**
     * Callback fired requesting the next month be rendered.
     */
    onRequestRenderNextMonth: PropTypes.func,
    /**
     * Callback fired requesting the previous month be rendered.
     */
    onRequestRenderPrevMonth: PropTypes.func,
    /**
     * Content to render in the calendar navigation header. The recommendation is
     * to include the name of the current rendered month along with the year.
     */
    renderNavigationLabel: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.node
    ]),
    /**
     * An array of labels containing the name of each day of the week. The visible
     * portion of the label should be abbreviated (no longer than three characters).
     * Note that screen readers will read this content preceding each date as the
     * `<Calendar />` is navigated. Consider using
     * [AccessibleContent](#AccessibleContent) with the `alt` prop containing the
     * full day name for assistive technologies and the children containing the
     * abbreviation. ex. `[<AccessibleContent alt="Sunday">Sun</AccessibleContent>, ...]`
     */
    renderWeekdayLabels: PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.node])
    ).isRequired,
    /**
     * A button to render in the calendar navigation header. The recommendation is
     * to compose it with the [Button](#Button) component, setting the `variant`
     * prop to `icon`, the `size` prop to `small`, and setting the `icon` prop to
     * [IconArrowOpenEnd](#iconography).
     */
    renderNextMonthButton: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.node
    ]),
    /**
     * A button to render in the calendar navigation header. The recommendation is
     * to compose it with the [Button](#Button) component, setting the `variant`
     * prop to `icon`, the `size` prop to `small`, and setting the `icon` prop to
     * [IconArrowOpenStart](#iconography).
     */
    renderPrevMonthButton: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.node
    ]),
    /**
     * children of type `<DateInput.Day />` There should be exactly 42 provided (6
     * weeks).
     */
    children: ChildrenPropTypes.oneOf([Calendar.Day])
  }

  static defaultProps = {
    label: undefined,
    value: '',
    size: 'medium',
    placeholder: null,
    onChange: (event) => {},
    onBlur: (event) => {},
    // Leave interaction default undefined so that `disabled` and `readOnly` can also be supplied
    interaction: undefined,
    isRequired: false,
    isInline: false,
    assistiveText: undefined,
    layout: 'stacked',
    width: null,
    inputRef: (el) => {},
    messages: undefined,
    placement: 'bottom center',
    isShowingCalendar: false,
    onRequestValidateDate: (event) => {},
    onRequestShowCalendar: (event) => {},
    onRequestHideCalendar: (event) => {},
    onRequestSelectNextDay: (event) => {},
    onRequestSelectPrevDay: (event) => {},
    onRequestRenderNextMonth: (event) => {},
    onRequestRenderPrevMonth: (event) => {},
    renderNavigationLabel: null,
    renderNextMonthButton: null,
    renderPrevMonthButton: null,
    children: null
  }

  state = {
    hasInputRef: false
  }

  _input = null

  get selectedDateId() {
    let selectedDateId

    Children.toArray(this.props.children).forEach((day) => {
      const { date, isSelected } = day.props
      if (isSelected) selectedDateId = this.formatDateId(date)
    })

    return selectedDateId
  }

  get interaction() {
    return getInteraction({ props: this.props })
  }

  formatDateId = (date) => {
    // ISO8601 strings may contain a space. Remove any spaces before using the
    // date as the id.
    return date.replace(/\s/g, '')
  }

  handleInputRef = (el) => {
    const { inputRef } = this.props
    const { hasInputRef } = this.state

    // Ensures that we position the Calendar with respect to the input correctly
    // if the Calendar is open on mount
    if (!hasInputRef) {
      this.setState({ hasInputRef: true })
    }

    this._input = el
    inputRef(el)
  }

  handleInputChange = (event, value) => {
    const { onChange } = this.props
    onChange(event, { value })
    this.handleShowCalendar(event)
  }

  handleShowCalendar = (event) => {
    const { onRequestShowCalendar } = this.props
    const { interaction } = this

    if (interaction === 'enabled') {
      onRequestShowCalendar(event)
    }
  }

  handleHideCalendar = (event) => {
    const { onRequestHideCalendar, onRequestValidateDate } = this.props
    onRequestValidateDate(event)
    onRequestHideCalendar(event)
  }

  handleHighlightOption = (event, { direction }) => {
    const { onRequestSelectNextDay, onRequestSelectPrevDay } = this.props
    if (direction === -1) onRequestSelectPrevDay(event)
    if (direction === 1) onRequestSelectNextDay(event)
  }

  renderMonthNavigationButton(type = 'prev') {
    const { renderPrevMonthButton, renderNextMonthButton } = this.props
    const button =
      type === 'prev' ? renderPrevMonthButton : renderNextMonthButton
    return button && safeCloneElement(callRenderProp(button), { tabIndex: -1 })
  }

  renderDays({ getOptionProps }) {
    const { children } = this.props

    return Children.map(children, (day) => {
      const { date, isOutsideMonth } = day.props

      let props = { tabIndex: -1, id: this.formatDateId(date) }
      const optionProps = getOptionProps(props)

      props = isOutsideMonth
        ? {
            ...props,
            onClick: optionProps.onClick,
            role: 'presentation'
          }
        : optionProps

      return safeCloneElement(day, props)
    })
  }

  renderCalendar({ getListProps, getOptionProps }) {
    const {
      onRequestRenderNextMonth,
      onRequestRenderPrevMonth,
      renderNavigationLabel,
      renderWeekdayLabels
    } = this.props

    return (
      <Calendar
        {...getListProps({
          onRequestRenderNextMonth,
          onRequestRenderPrevMonth,
          renderNavigationLabel,
          renderWeekdayLabels,
          renderNextMonthButton: this.renderMonthNavigationButton('next'),
          renderPrevMonthButton: this.renderMonthNavigationButton('prev')
        })}
      >
        {this.renderDays({ getOptionProps })}
      </Calendar>
    )
  }

  renderInput({ getInputProps, getTriggerProps }) {
    const {
      label,
      renderLabel,
      value,
      placeholder,
      onBlur,
      isRequired,
      size,
      isInline,
      layout,
      width,
      messages,
      onRequestValidateDate,
      onRequestShowCalendar,
      onRequestHideCalendar,
      onRequestSelectNextDay,
      onRequestSelectPrevDay,
      onRequestRenderNextMonth,
      onRequestRenderPrevMonth,
      ...rest
    } = this.props

    const { interaction } = this

    const {
      ref, // Apply this to the actual inputRef
      ...triggerProps
    } = getTriggerProps()

    return (
      <TextInput
        {...triggerProps}
        {...passthroughProps(rest)}
        {...getInputProps({
          renderLabel: callRenderProp(renderLabel || label),
          value,
          placeholder,
          size,
          layout,
          width,
          messages,
          onChange: this.handleInputChange,
          onBlur: createChainedFunction(onBlur, this.handleHideCalendar),
          inputRef: createChainedFunction(ref, this.handleInputRef),
          interaction,
          isRequired,
          display: isInline ? 'inline-block' : 'block',
          renderAfterInput: <IconCalendarMonthLine inline={false} />
        })}
      />
    )
  }

  render() {
    const { placement, isShowingCalendar, assistiveText } = this.props

    const { selectedDateId } = this

    return (
      <Selectable
        isShowingOptions={isShowingCalendar}
        onRequestShowOptions={this.handleShowCalendar}
        onRequestHideOptions={this.handleHideCalendar}
        onRequestHighlightOption={this.handleHighlightOption}
        onRequestSelectOption={this.handleHideCalendar}
        selectedOptionId={selectedDateId}
        highlightedOptionId={selectedDateId}
      >
        {({
          getRootProps,
          getInputProps,
          getTriggerProps,
          getListProps,
          getOptionProps,
          getDescriptionProps
        }) => (
          <span {...getRootProps({ className: styles.root })}>
            {this.renderInput({ getInputProps, getTriggerProps })}
            <span {...getDescriptionProps()} className={styles.assistiveText}>
              {assistiveText}
            </span>
            <Popover
              placement={placement}
              isShowingContent={isShowingCalendar}
              positionTarget={this._input}
              shouldReturnFocus={false}
              shouldFocusContentOnTriggerBlur
            >
              {this.renderCalendar({ getListProps, getOptionProps })}
            </Popover>
          </span>
        )}
      </Selectable>
    )
  }
}

export default DateInput
export { DateInput }
