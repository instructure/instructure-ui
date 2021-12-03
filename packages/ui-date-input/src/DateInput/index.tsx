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
import { Children, Component, ReactElement } from 'react'

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
  passthroughProps
} from '@instructure/ui-react-utils'
import { testable } from '@instructure/ui-testable'

import { withStyle, jsx } from '@instructure/emotion'

import generateStyle from './styles'

import { propTypes, allowedProps } from './props'
import type { DateInputProps } from './props'

/**
---
category: components
---
**/
@withStyle(generateStyle, null)
@testable()
class DateInput extends Component<DateInputProps> {
  static readonly componentId = 'DateInput'

  static Day = Calendar.Day

  static propTypes = propTypes
  static allowedProps = allowedProps
  static defaultProps = {
    value: '',
    size: 'medium',
    placeholder: null,
    // @ts-expect-error ts-migrate(6133) FIXME: 'event' is declared but its value is never read.
    onChange: (event) => {},
    // @ts-expect-error ts-migrate(6133) FIXME: 'event' is declared but its value is never read.
    onBlur: (event) => {},
    // Leave interaction default undefined so that `disabled` and `readOnly` can also be supplied
    isRequired: false,
    isInline: false,
    layout: 'stacked',
    width: null,
    display: 'inline-block',
    // @ts-expect-error ts-migrate(6133) FIXME: 'el' is declared but its value is never read.
    inputRef: (el) => {},
    placement: 'bottom center',
    isShowingCalendar: false,
    // @ts-expect-error ts-migrate(6133) FIXME: 'event' is declared but its value is never read.
    onRequestValidateDate: (event) => {},
    // @ts-expect-error ts-migrate(6133) FIXME: 'event' is declared but its value is never read.
    onRequestShowCalendar: (event) => {},
    // @ts-expect-error ts-migrate(6133) FIXME: 'event' is declared but its value is never read.
    onRequestHideCalendar: (event) => {},
    // @ts-expect-error ts-migrate(6133) FIXME: 'event' is declared but its value is never read.
    onRequestSelectNextDay: (event) => {},
    // @ts-expect-error ts-migrate(6133) FIXME: 'event' is declared but its value is never read.
    onRequestSelectPrevDay: (event) => {},
    // @ts-expect-error ts-migrate(6133) FIXME: 'event' is declared but its value is never read.
    onRequestRenderNextMonth: (event) => {},
    // @ts-expect-error ts-migrate(6133) FIXME: 'event' is declared but its value is never read.
    onRequestRenderPrevMonth: (event) => {},
    renderNavigationLabel: null,
    renderNextMonthButton: null,
    renderPrevMonthButton: null,
    children: null
  }

  componentDidMount() {
    this.props.makeStyles?.()
  }

  componentDidUpdate() {
    this.props.makeStyles?.()
  }

  state = {
    hasInputRef: false
  }

  _input = undefined

  ref: Element | null = null

  handleRef = (el: Element | null) => {
    this.ref = el
  }

  get selectedDateId() {
    let selectedDateId

    Children.toArray(this.props.children).forEach((day) => {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'props' does not exist on type 'string | ... Remove this comment to see the full error message
      const { date, isSelected } = day.props
      if (isSelected) selectedDateId = this.formatDateId(date)
    })

    return selectedDateId
  }

  get interaction() {
    return getInteraction({ props: this.props })
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'date' implicitly has an 'any' type.
  formatDateId = (date) => {
    // ISO8601 strings may contain a space. Remove any spaces before using the
    // date as the id.
    return date.replace(/\s/g, '')
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'el' implicitly has an 'any' type.
  handleInputRef = (el) => {
    const { inputRef } = this.props
    const { hasInputRef } = this.state

    // Ensures that we position the Calendar with respect to the input correctly
    // if the Calendar is open on mount
    if (!hasInputRef) {
      this.setState({ hasInputRef: true })
    }

    this._input = el
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    inputRef(el)
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
  handleInputChange = (event, value) => {
    const { onChange } = this.props
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    onChange(event, { value })
    this.handleShowCalendar(event)
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
  handleShowCalendar = (event) => {
    const { onRequestShowCalendar } = this.props
    const { interaction } = this

    if (interaction === 'enabled') {
      // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
      onRequestShowCalendar(event)
    }
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
  handleHideCalendar = (event) => {
    const { onRequestHideCalendar, onRequestValidateDate } = this.props
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    onRequestValidateDate(event)
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    onRequestHideCalendar(event)
  }

  handleHighlightOption = (
    event: React.SyntheticEvent,
    { direction }: { direction?: number }
  ) => {
    const { onRequestSelectNextDay, onRequestSelectPrevDay } = this.props
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    if (direction === -1) onRequestSelectPrevDay(event)
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    if (direction === 1) onRequestSelectNextDay(event)
  }

  renderMonthNavigationButton(type = 'prev') {
    const { renderPrevMonthButton, renderNextMonthButton } = this.props
    const button =
      type === 'prev' ? renderPrevMonthButton : renderNextMonthButton
    return button && safeCloneElement(callRenderProp(button), { tabIndex: -1 })
  }

  // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'getOptionProps' implicitly has an... Remove this comment to see the full error message
  renderDays({ getOptionProps }) {
    const { children } = this.props

    return Children.map(children, (day) => {
      // @ts-expect-error ts-migrate(2533) FIXME: Object is possibly 'null' or 'undefined'.
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

      return safeCloneElement(day as ReactElement, props)
    })
  }

  // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'getListProps' implicitly has an '... Remove this comment to see the full error message
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

  // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'getInputProps' implicitly has an ... Remove this comment to see the full error message
  renderInput({ getInputProps, getTriggerProps }) {
    const {
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
          renderLabel: callRenderProp(renderLabel),
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
        elementRef={this.handleRef}
      />
    )
  }

  render() {
    const { placement, isShowingCalendar, assistiveText, styles } = this.props

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
          <span {...getRootProps({ css: styles?.dateInput })}>
            {this.renderInput({ getInputProps, getTriggerProps })}
            <span {...getDescriptionProps()} css={styles?.assistiveText}>
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
