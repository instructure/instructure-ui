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
import React, { Children, Component, ReactElement } from 'react'

import { Calendar } from '@instructure/ui-calendar'
import type { CalendarProps, CalendarDayProps } from '@instructure/ui-calendar'
import { IconCalendarMonthLine } from '@instructure/ui-icons'
import { Popover } from '@instructure/ui-popover'
import { Selectable } from '@instructure/ui-selectable'
import type {
  SelectableProps,
  SelectableRender
} from '@instructure/ui-selectable'
import { TextInput } from '@instructure/ui-text-input'
import type { TextInputProps } from '@instructure/ui-text-input'
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
The `DateInput` component provides a visual interface for inputting date data.
See <https://instructure.design/#DateInput/>
@tsProps
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
    onBlur: () => {}, // must have a default so createChainedFunction works
    isRequired: false,
    isInline: false,
    layout: 'stacked',
    display: 'inline-block',
    placement: 'bottom center',
    isShowingCalendar: false
  }

  state = { hasInputRef: false }
  _input?: HTMLInputElement | null = undefined
  ref: Element | null = null

  componentDidMount() {
    this.props.makeStyles?.()
  }

  componentDidUpdate() {
    this.props.makeStyles?.()
  }

  get selectedDateId() {
    let selectedDateId: string | undefined
    Children.toArray(this.props.children).forEach((day) => {
      const { date, isSelected } = (day as ReactElement<CalendarDayProps>).props
      if (isSelected) {
        selectedDateId = this.formatDateId(date)
      }
    })
    return selectedDateId
  }

  get interaction() {
    return getInteraction({ props: this.props })
  }

  formatDateId = (date: string) => {
    // ISO8601 strings may contain a space. Remove any spaces before using the
    // date as the id.
    return date.replace(/\s/g, '')
  }

  handleInputRef: TextInputProps['inputRef'] = (el) => {
    // Ensures that we position the Calendar with respect to the input correctly
    // if the Calendar is open on mount
    if (!this.state.hasInputRef) {
      this.setState({ hasInputRef: true })
    }
    this._input = el
    this.props.inputRef?.(el)
  }

  handleInputChange: TextInputProps['onChange'] = (event, value) => {
    this.props.onChange?.(event, { value })
    this.handleShowCalendar(event)
  }

  handleShowCalendar = (event: React.SyntheticEvent) => {
    if (this.interaction === 'enabled') {
      this.props.onRequestShowCalendar?.(event)
    }
  }

  handleHideCalendar = (event: React.SyntheticEvent) => {
    this.props.onRequestValidateDate?.(event)
    this.props.onRequestHideCalendar?.(event)
  }

  handleHighlightOption: SelectableProps['onRequestHighlightOption'] = (
    event,
    { direction }
  ) => {
    const { onRequestSelectNextDay, onRequestSelectPrevDay } = this.props
    if (direction === -1) onRequestSelectPrevDay?.(event)
    if (direction === 1) onRequestSelectNextDay?.(event)
  }

  renderMonthNavigationButton(type = 'prev') {
    const { renderPrevMonthButton, renderNextMonthButton } = this.props
    const button =
      type === 'prev' ? renderPrevMonthButton : renderNextMonthButton
    return button && safeCloneElement(callRenderProp(button), { tabIndex: -1 })
  }

  renderDays(getOptionProps: SelectableRender['getOptionProps']) {
    const children = this.props.children as ReactElement<CalendarDayProps>

    return Children.map(children, (day) => {
      const { date, isOutsideMonth } = day.props
      const props = { tabIndex: -1, id: this.formatDateId(date) }
      const optionProps = getOptionProps(props)

      const propsAdded = isOutsideMonth
        ? {
            ...props,
            onClick: optionProps.onClick,
            role: 'presentation'
          }
        : optionProps

      return safeCloneElement(day, propsAdded)
    })
  }

  renderCalendar({
    getListProps,
    getOptionProps
  }: {
    getListProps: SelectableRender['getListProps']
    getOptionProps: SelectableRender['getOptionProps']
  }) {
    const {
      onRequestRenderNextMonth,
      onRequestRenderPrevMonth,
      renderNavigationLabel,
      renderWeekdayLabels
    } = this.props
    return (
      <Calendar
        {...(getListProps({
          onRequestRenderNextMonth,
          onRequestRenderPrevMonth,
          renderNavigationLabel,
          renderWeekdayLabels,
          renderNextMonthButton: this.renderMonthNavigationButton('next'),
          renderPrevMonthButton: this.renderMonthNavigationButton('prev')
        }) as CalendarProps)}
      >
        {this.renderDays(getOptionProps)}
      </Calendar>
    )
  }

  renderInput({
    getInputProps,
    getTriggerProps
  }: {
    getInputProps: SelectableRender['getInputProps']
    getTriggerProps: SelectableRender['getInputProps']
  }) {
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
      />
    )
  }

  render() {
    const { placement, isShowingCalendar, assistiveText, styles } = this.props

    return (
      <Selectable
        isShowingOptions={isShowingCalendar}
        onRequestShowOptions={this.handleShowCalendar}
        onRequestHideOptions={this.handleHideCalendar}
        onRequestHighlightOption={this.handleHighlightOption}
        onRequestSelectOption={this.handleHideCalendar}
        selectedOptionId={this.selectedDateId}
        highlightedOptionId={this.selectedDateId}
      >
        {({
          getRootProps,
          getInputProps,
          getTriggerProps,
          getListProps,
          getOptionProps,
          getDescriptionProps
        }) => (
          <span
            {...getRootProps({ css: styles?.dateInput })}
            ref={(el) => (this.ref = el)}
          >
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
