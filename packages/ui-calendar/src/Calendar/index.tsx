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

import { View } from '@instructure/ui-view'
import {
  safeCloneElement,
  callRenderProp,
  omitProps
} from '@instructure/ui-react-utils'
import { createChainedFunction } from '@instructure/ui-utils'
import { logError as error } from '@instructure/console'
import { uid } from '@instructure/uid'

import { testable } from '@instructure/ui-testable'

import { withStyle, jsx } from '@instructure/emotion'

import generateStyle from './styles'
import generateComponentTheme from './theme'

import { Day } from './Day'

import { propTypes, allowedProps } from './props'
import type { CalendarProps } from './props'

/**
---
category: components
---
@tsProps
**/
@withStyle(generateStyle, generateComponentTheme)
@testable()
class Calendar extends Component<CalendarProps> {
  static readonly componentId = 'Calendar'

  static Day = Day
  static DAY_COUNT = 42 // 6 weeks visible

  static propTypes = propTypes
  static allowedProps = allowedProps
  static defaultProps = {
    as: 'span',
    role: 'table'
  }

  ref: Element | null = null
  private _weekdayHeaderIds = this.props.renderWeekdayLabels.reduce(
    (ids: Record<number, string>, _label, i) => {
      return { ...ids, [i]: uid(`weekday-header-${i}`) }
    },
    {}
  )

  handleRef = (el: Element | null) => {
    this.ref = el
  }

  componentDidMount() {
    this.props.makeStyles?.()
  }

  componentDidUpdate() {
    this.props.makeStyles?.()
  }

  get role() {
    return this.props.role === 'listbox' ? this.props.role : undefined
  }

  renderHeader() {
    const {
      renderNextMonthButton,
      renderPrevMonthButton,
      renderNavigationLabel,
      onRequestRenderNextMonth,
      onRequestRenderPrevMonth,
      styles
    } = this.props

    const nextButton: ReactElement = callRenderProp(renderNextMonthButton)
    const prevButton: ReactElement = callRenderProp(renderPrevMonthButton)
    const cloneButton = (button: ReactElement, onClick?: (e?: Event) => void) =>
      safeCloneElement(button, {
        onClick: createChainedFunction(button.props.onClick, onClick)
      })

    const style = [
      styles?.navigation,
      ...(prevButton || nextButton ? [styles?.navigationWithButtons] : [])
    ]

    return (
      <div css={style}>
        {prevButton && cloneButton(prevButton, onRequestRenderPrevMonth)}
        {callRenderProp(renderNavigationLabel)}
        {nextButton && cloneButton(nextButton, onRequestRenderNextMonth)}
      </div>
    )
  }

  renderBody() {
    return (
      <table role={this.role}>
        <thead>{this.renderWeekdayHeaders()}</thead>
        <tbody>{this.renderDays()}</tbody>
      </table>
    )
  }

  renderWeekdayHeaders() {
    const { renderWeekdayLabels, styles } = this.props
    const { length } = renderWeekdayLabels

    error(
      length === 7,
      `[Calendar] \`renderWeekdayLabels\` should be an array with 7 labels (one for each weekday). ${length} provided.`
    )
    return (
      <tr>
        {renderWeekdayLabels.map((label, i) => {
          return (
            <th
              key={i}
              scope="col"
              css={styles?.weekdayHeader}
              id={this._weekdayHeaderIds[i]}
            >
              {callRenderProp(label)}
            </th>
          )
        })}
      </tr>
    )
  }

  renderDays() {
    const children = Children.toArray(this.props.children) as ReactElement[]
    const { length } = children
    const role = this.role === 'listbox' ? 'presentation' : undefined

    error(
      length === Calendar.DAY_COUNT,
      `[Calendar] should have exactly ${Calendar.DAY_COUNT} children. ${length} provided.`
    )

    return children
      .reduce((days: ReactElement[][], day, i) => {
        const index = Math.floor(i / 7)
        if (!days[index]) days.push([])
        days[index].push(day)
        return days // 7xN 2D array of `Day`s
      }, [])
      .map((row) => (
        <tr key={`row${row[0].props.date}`} role={role}>
          {row.map((day, i) => (
            <td key={day.props.date} role={role}>
              {role === 'presentation'
                ? safeCloneElement(day, {
                    'aria-describedby': this._weekdayHeaderIds[i]
                  })
                : day}
            </td>
          ))}
        </tr>
      ))
  }

  render() {
    const passthroughProps = View.omitViewProps(
      omitProps(this.props, Calendar.allowedProps),
      Calendar
    )

    return (
      <View
        {...passthroughProps}
        as={this.props.as}
        display="inline-block"
        padding="small"
        background="primary"
        elementRef={this.handleRef}
      >
        {this.renderHeader()}
        {this.renderBody()}
      </View>
    )
  }
}

export default Calendar
export { Calendar }
