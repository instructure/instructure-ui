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
import { Children, Component } from 'react'

import { View } from '@instructure/ui-view'
import {
  safeCloneElement,
  callRenderProp,
  omitProps
} from '@instructure/ui-react-utils'
import { createChainedFunction } from '@instructure/ui-utils'
import { logError as error } from '@instructure/console'
// @ts-expect-error ts-migrate(6133) FIXME: 'uid' is declared but its value is never read.
import { uid } from '@instructure/uid'

import testable from '@instructure/ui-testable'

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
    children: null,
    onRequestRenderNextMonth: () => {},
    onRequestRenderPrevMonth: () => {},
    as: 'span',
    role: 'table'
  }

  ref: Element | null = null

  handleRef = (el: Element | null) => {
    this.ref = el
  }

  componentDidMount() {
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.makeStyles()
  }

  // @ts-expect-error ts-migrate(6133) FIXME: 'prevProps' is declared but its value is never rea... Remove this comment to see the full error message
  componentDidUpdate(prevProps, prevState, snapshot) {
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.makeStyles()
  }

  // @ts-expect-error ts-migrate(6133) FIXME: 'label' is declared but its value is never read.
  _weekdayHeaderIds = this.props.renderWeekdayLabels.reduce((ids, label, i) => {
    // @ts-expect-error ts-migrate(2698) FIXME: Spread types may only be created from object types... Remove this comment to see the full error message
    return { ...ids, [i]: uid(`weekday-header-${i}`) }
  }, {})

  get role() {
    const { role } = this.props
    return role === 'listbox' ? role : null
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

    const nextButton = callRenderProp(renderNextMonthButton)
    const prevButton = callRenderProp(renderPrevMonthButton)

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'button' implicitly has an 'any' type.
    const cloneButton = (button, onClick) =>
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
      // @ts-expect-error ts-migrate(2322) FIXME: Type '"listbox" | null' is not assignable to type ... Remove this comment to see the full error message
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
              // @ts-expect-error ts-migrate(2533) FIXME: Object is possibly 'null' or 'undefined'.
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
    const children = Children.toArray(this.props.children)
    const { length } = children
    const role = this.role === 'listbox' ? 'presentation' : null

    error(
      length === Calendar.DAY_COUNT,
      `[Calendar] should have exactly ${Calendar.DAY_COUNT} children. ${length} provided.`
    )

    return (
      children
        .reduce((days, day, i) => {
          const index = Math.floor(i / 7)

          // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          if (!days[index]) days.push([])

          // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          days[index].push(day)
          return days
        }, [])
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'map' does not exist on type 'string | nu... Remove this comment to see the full error message
        .map((row) => (
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'string | null' is not assignable to type 'st... Remove this comment to see the full error message
          <tr key={`row${row[0].props.date}`} role={role}>
            {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'day' implicitly has an 'any' type. */}
            {row.map((day, i) => (
              // @ts-expect-error ts-migrate(2322) FIXME: Type 'string | null' is not assignable to type 'st... Remove this comment to see the full error message
              <td key={day.props.date} role={role}>
                {role === 'presentation'
                  ? safeCloneElement(day, {
                      // @ts-expect-error ts-migrate(2533) FIXME: Object is possibly 'null' or 'undefined'.
                      'aria-describedby': this._weekdayHeaderIds[i]
                    })
                  : day}
              </td>
            ))}
          </tr>
        ))
    )
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
