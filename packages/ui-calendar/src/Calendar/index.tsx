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
import PropTypes from 'prop-types'

import { View } from '@instructure/ui-view'
import {
  safeCloneElement,
  callRenderProp,
  omitProps
} from '@instructure/ui-react-utils'
import { createChainedFunction } from '@instructure/ui-utils'
import { logError as error } from '@instructure/console'
import { Children as ChildrenPropTypes } from '@instructure/ui-prop-types'
import { uid } from '@instructure/uid'

import testable from '@instructure/ui-testable'

import { withStyle, jsx } from '@instructure/emotion'

import generateStyle from './styles'
import generateComponentTheme from './theme'
import { Day } from './Day'

type Props = {
  makeStyles?: (...args: any[]) => any
  styles?: any
  renderNextMonthButton?: React.ReactNode | ((...args: any[]) => any)
  renderPrevMonthButton?: React.ReactNode | ((...args: any[]) => any)
  renderNavigationLabel?: React.ReactNode | ((...args: any[]) => any)
  renderWeekdayLabels: (React.ReactNode | ((...args: any[]) => any))[]
  onRequestRenderNextMonth?: (...args: any[]) => any
  onRequestRenderPrevMonth?: (...args: any[]) => any
  as?: React.ReactElement
  role?: 'table' | 'listbox'
}

/**
---
category: components
---
**/
@withStyle(generateStyle, generateComponentTheme)
@testable()
class Calendar extends Component<Props> {
  static componentId = 'Calendar'

  static Day = Day
  static DAY_COUNT = 42 // 6 weeks visible

  static propTypes = {
    // eslint-disable-next-line react/require-default-props
    makeStyles: PropTypes.func,
    // eslint-disable-next-line react/require-default-props
    styles: PropTypes.object,
    /**
     * children of type `<Calendar.Day />` There should be exactly 42 provided (6
     * weeks).
     */
    children: ChildrenPropTypes.oneOf([Day]),
    /**
     * A button to render in the navigation header. The recommendation is to
     * compose it with the [IconButton](#IconButton) component by setting the `size`
     * prop to `small`, `withBorder` and `withBackground` to `false`, and setting
     * `renderIcon` to [IconArrowOpenEnd](#iconography).
     */
    renderNextMonthButton: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.func
    ]),
    /**
     * A button to render in the navigation header. The recommendation is to
     * compose it with the [IconButton](#Button) component by setting the `size`
     * prop to `small`, `withBorder` and `withBackground` to `false`, and setting
     * `renderIcon` to [IconArrowOpenStart](#iconography).
     */
    renderPrevMonthButton: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.func
    ]),
    /**
     * Content to render in the navigation header. The recommendation is to include
     * the name of the current rendered month along with the year.
     */
    renderNavigationLabel: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.func
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
      PropTypes.oneOfType([PropTypes.node, PropTypes.func])
    ).isRequired,
    /**
     * Callback fired when the next month button is clicked in the navigation
     * header, requesting to render the next month.
     */
    onRequestRenderNextMonth: PropTypes.func,
    /**
     * Callback fired when the previous month button is clicked in the navigation
     * header, requesting to render the previous month.
     */
    onRequestRenderPrevMonth: PropTypes.func,
    /**
     * The element to render as the `Calendar` root, `span` by default
     */
    as: PropTypes.elementType,
    /**
     * The role of the underlying table. This can be set to 'listbox' when
     * assistive technologies need to read the `<Calendar.Day />` children as a list.
     */
    role: PropTypes.oneOf(['table', 'listbox'])
  }

  static defaultProps = {
    children: null,
    renderNextMonthButton: undefined,
    renderPrevMonthButton: undefined,
    renderNavigationLabel: undefined,
    onRequestRenderNextMonth: () => {},
    onRequestRenderPrevMonth: () => {},
    as: 'span',
    role: 'table'
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
      styles.navigation,
      ...(prevButton || nextButton ? [styles.navigationWithButtons] : [])
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
              css={styles.weekdayHeader}
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
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'omitViewProps' does not exist on type 't... Remove this comment to see the full error message
    const passthroughProps = View.omitViewProps(
      omitProps(this.props, Calendar.propTypes),
      Calendar
    )

    return (
      <View
        {...passthroughProps}
        as={this.props.as}
        display="inline-block"
        padding="small"
        background="primary"
      >
        {this.renderHeader()}
        {this.renderBody()}
      </View>
    )
  }
}

export default Calendar
export { Calendar }
