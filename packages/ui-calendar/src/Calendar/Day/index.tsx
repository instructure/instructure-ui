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

import { View } from '@instructure/ui-view'
import { AccessibleContent } from '@instructure/ui-a11y-content'
import {
  omitProps,
  callRenderProp,
  getElementType
} from '@instructure/ui-react-utils'

import testable from '@instructure/ui-testable'

import { withStyle, jsx } from '@instructure/emotion'

import generateStyle from './styles'
import generateComponentTheme from './theme'

import { propTypes, allowedProps } from './props'
import type { CalendarDayProps, CalendarDayStyleProps } from './props'

/**
---
parent: Calendar
id: Calendar.Day
---
**/
@withStyle(generateStyle, generateComponentTheme)
@testable()
class Day extends Component<CalendarDayProps> {
  static readonly componentId = 'Calendar.Day'

  static propTypes = propTypes
  static allowedProps = allowedProps
  static defaultProps = {
    interaction: 'enabled',
    isSelected: false,
    isToday: false,
    isOutsideMonth: false,
    // @ts-expect-error ts-migrate(6133) FIXME: 'el' is declared but its value is never read.
    elementRef: (el) => {},
    children: null
  } as const

  componentDidMount() {
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.makeStyles(this.makeStylesVariables)
  }

  // @ts-expect-error ts-migrate(6133) FIXME: 'prevProps' is declared but its value is never rea... Remove this comment to see the full error message
  componentDidUpdate(prevProps, prevState, snapshot) {
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.makeStyles(this.makeStylesVariables)
  }

  get makeStylesVariables(): CalendarDayStyleProps {
    return { isDisabled: this.isDisabled }
  }

  get isDisabled() {
    const { interaction } = this.props
    return interaction === 'disabled'
  }

  get elementType() {
    const { as } = this.props
    return as || getElementType(Day, this.props)
  }

  shouldApplyAriaSelected() {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'role' does not exist on type 'Readonly<P... Remove this comment to see the full error message
    const { role } = this.props // eslint-disable-line react/prop-types
    return ['option', 'gridcell'].indexOf(role) > -1
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
  handleClick = (event) => {
    const { onClick, date } = this.props
    if (typeof onClick === 'function') {
      onClick(event, { date })
    }
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
  handleKeyDown = (event) => {
    const { onKeyDown, date } = this.props
    if (typeof onKeyDown === 'function') {
      onKeyDown(event, { date })
    }
  }

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'el' implicitly has an 'any' type.
  handleElementRef = (el) => {
    const { elementRef } = this.props
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    elementRef(el)
  }

  render() {
    const {
      children,
      label,
      interaction,
      isOutsideMonth,
      isSelected,
      isToday,
      onClick,
      onKeyDown,
      as,
      styles,
      ...props
    } = this.props

    const { elementType, isDisabled } = this

    const passthroughProps = View.omitViewProps(
      omitProps(props, Day.allowedProps),
      Day
    )

    return (
      <View
        {...passthroughProps}
        as={elementType}
        css={styles?.calendarDay}
        display="inline-block"
        margin="xxx-small"
        borderWidth="none"
        borderColor="transparent"
        background="transparent"
        cursor={
          elementType === 'button' || elementType === 'a'
            ? isDisabled
              ? 'not-allowed'
              : 'pointer'
            : 'auto'
        }
        disabled={isDisabled}
        aria-current={isToday ? 'date' : undefined}
        aria-selected={
          this.shouldApplyAriaSelected()
            ? isSelected
              ? 'true'
              : 'false'
            : undefined
        }
        onClick={onClick && this.handleClick}
        onKeyDown={onKeyDown && this.handleKeyDown}
        elementRef={this.handleElementRef}
      >
        <span css={styles?.day}>
          <AccessibleContent alt={label}>
            {callRenderProp(children)}
          </AccessibleContent>
        </span>
      </View>
    )
  }
}

export default Day
export { Day }
