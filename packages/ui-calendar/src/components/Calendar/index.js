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
import classnames from 'classnames'

import View from '@instructure/ui-layout/lib/View'

import safeCloneElement from '@instructure/ui-react-utils/lib/safeCloneElement'
import createChainedFunction from '@instructure/ui-utils/lib/createChainedFunction'
import { error } from '@instructure/console/macro'
import callRenderProp from '@instructure/ui-react-utils/lib/callRenderProp'
import { omitProps } from '@instructure/ui-react-utils/lib/omitProps'
import { Children as ChildrenPropTypes } from '@instructure/ui-prop-types'

import uid from '@instructure/uid/lib/uid'

import themeable from '@instructure/ui-themeable'
import testable from '@instructure/ui-testable'

import Day from './Day'

import styles from './styles.css'
import theme from './theme'

/**
---
category: components
---
**/
@testable()
@themeable(theme, styles)
class Calendar extends Component {
  static Day = Day
  static DAY_COUNT = 42 // 6 weeks visible

  static propTypes = {
    /**
    * children of type `<Calendar.Day />` There should be exactly 42 provided (6
    * weeks).
    */
    children: ChildrenPropTypes.oneOf([Day]),
    /**
    * A button to render in the navigation header. The recommendation is to
    * compose it with the [Button](#Button) component, setting the `variant` prop
    * to `icon`, the `size` prop to `small`, and setting the `icon` prop to
    * [IconArrowOpenEnd](#iconography).
    */
    renderNextMonthButton: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    /**
    * A button to render in the navigation header. The recommendation is to
    * compose it with the [Button](#Button) component, setting the `variant` prop
    * to `icon`, the `size` prop to `small`, and setting the `icon` prop to
    * [IconArrowOpenStart](#iconography).
    */
    renderPrevMonthButton: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    /**
    * Content to render in the navigation header. The recommendation is to include
    * the name of the current rendered month along with the year.
    */
    renderNavigationLabel: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    /**
    * An array of labels containing the name of each day of the week. The visible
    * portion of the label should be abbreviated (no longer than three characters).
    * Note that screen readers will read this content preceding each date as the
    * `<Calendar />` is navigated. Consider using
    * [AccessibleContent](#AccessibleContent) with the `alt` prop containing the
    * full day name for assistive technologies and the children containing the
    * abbreviation. ex. `[<AccessibleContent alt="Sunday">Sun</AccessibleContent>, ...]`
    */
    renderWeekdayLabels: PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.func
    ])).isRequired,
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
    onRequestRenderNextMonth: (event) => {},
    onRequestRenderPrevMonth: (event) => {},
    as: 'span',
    role: 'table'
  }

  _weekdayHeaderIds = this.props.renderWeekdayLabels.reduce((ids, label, i) => {
    return { ...ids, [i]: uid(`weekday-header-${i}`) }
  }, {})

  get role () {
    const { role } = this.props
    return role === 'listbox' ? role : null
  }

  renderHeader () {
    const {
      renderNextMonthButton,
      renderPrevMonthButton,
      renderNavigationLabel,
      onRequestRenderNextMonth,
      onRequestRenderPrevMonth
    } = this.props

    const nextButton = callRenderProp(renderNextMonthButton)
    const prevButton = callRenderProp(renderPrevMonthButton)

    const cloneButton = (button, onClick) => safeCloneElement(button, {
      onClick: createChainedFunction(button.props.onClick, onClick)
    })

    const classes = classnames({
      [styles.navigation]: true,
      [styles.withNavigationButtons]: prevButton || nextButton
    })

    return (
      <div className={classes}>
        {prevButton && cloneButton(prevButton, onRequestRenderPrevMonth)}
        {callRenderProp(renderNavigationLabel)}
        {nextButton && cloneButton(nextButton, onRequestRenderNextMonth)}
      </div>
    )
  }

  renderBody () {
    return (
      <table role={this.role}>
        <thead>
          {this.renderWeekdayHeaders()}
        </thead>
        <tbody>
          {this.renderDays()}
        </tbody>
      </table>
    )
  }

  renderWeekdayHeaders () {
    const { renderWeekdayLabels } = this.props
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
              className={styles.weekdayHeader}
              id={this._weekdayHeaderIds[i]}
            >
              {callRenderProp(label)}
            </th>
          )
        })}
      </tr>
    )
  }

  renderDays () {
    const children = Children.toArray(this.props.children)
    const { length } = children
    const role = this.role === 'listbox' ? 'presentation' : null

    error(
      length === Calendar.DAY_COUNT,
      `[Calendar] should have exactly ${Calendar.DAY_COUNT} children. ${length} provided.`
    )

    return children.reduce((days, day, i) => {
      const index = Math.floor(i / 7)

      if (!days[index]) days.push([])

      days[index].push(day)
      return days
    }, []).map((row) => (
        <tr
          key={`row${row[0].props.date}`}
          role={role}
        >
          {row.map((day, i) => (
            <td
              key={day.props.date}
              role={role}
            >
              {role === 'presentation'
                ? safeCloneElement(day, { 'aria-describedby': this._weekdayHeaderIds[i] })
                : day
              }
            </td>
          ))}
        </tr>
      )
    )
  }

  render () {
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
        background="default"
      >
        {this.renderHeader()}
        {this.renderBody()}
      </View>
    )
  }
}

export default Calendar
