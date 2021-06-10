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

import { View } from '@instructure/ui-view'
import { AccessibleContent } from '@instructure/ui-a11y-content'
import {
  omitProps,
  callRenderProp,
  getElementType
} from '@instructure/ui-react-utils'
import { I18nPropTypes } from '@instructure/ui-i18n'

import testable from '@instructure/ui-testable'

import { withStyle, jsx } from '@instructure/emotion'

import generateStyle from './styles'
import generateComponentTheme from './theme'

type Props = {
  makeStyles?: (...args: any[]) => any
  styles?: any
  date: any // TODO: I18nPropTypes.iso8601
  label: string
  interaction?: 'enabled' | 'disabled'
  isSelected?: boolean
  isToday?: boolean
  isOutsideMonth?: boolean
  onClick?: (...args: any[]) => any
  onKeyDown?: (...args: any[]) => any
  elementRef?: (...args: any[]) => any
  as?: React.ReactElement
}

/**
---
parent: Calendar
id: Calendar.Day
---
**/
@withStyle(generateStyle, generateComponentTheme)
@testable()
class Day extends Component<Props> {
  static componentId = 'Calendar.Day'

  static propTypes = {
    // eslint-disable-next-line react/require-default-props
    makeStyles: PropTypes.func,
    // eslint-disable-next-line react/require-default-props
    styles: PropTypes.object,
    /**
     * The rendered representation of the corresponding date.
     */
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    /**
     * An ISO 8601 formatted string representing the date corresponding to
     * this `<Calendar.Day />`
     */
    //@ts-expect-error FIXME:
    date: I18nPropTypes.iso8601.isRequired,
    /**
     * Accessible label to provide more context for the date to assistive
     * technologies. This should consist of more than just a numerical date value.
     * It should also include the month and the year. Ex. instead of just `1`,
     * provide `1 August 2019`.
     */
    label: PropTypes.string.isRequired,
    /**
     * Is the `<Calendar.Day />` disabled
     */
    interaction: PropTypes.oneOf(['enabled', 'disabled']),
    /**
     * Is the `<Calendar.Day />` selected
     */
    isSelected: PropTypes.bool,
    /**
     * Is the `<Calendar.Day />` today
     */
    isToday: PropTypes.bool,
    /**
     * Is the `<Calendar.Day />` located outside the current rendered month
     */
    isOutsideMonth: PropTypes.bool,
    /**
     * Callback fired on click.
     * @param {Object} event - the click event
     * @param {Object} data - additional data
     * @param data.date - the date of the corresponding `<Calendar.Day />`
     */
    onClick: PropTypes.func,
    /**
     * Callback fired on key down.
     * @param {Object} event - the key down event
     * @param {Object} data - additional data
     * @param data.date - the date of the corresponding `<Calendar.Day />`
     */
    onKeyDown: PropTypes.func,
    /**
     * A ref function for the underlying DOM element.
     */
    elementRef: PropTypes.func,
    /**
     * the element type to render as
     */
    as: PropTypes.elementType // eslint-disable-line react/require-default-props
  }

  static defaultProps = {
    interaction: 'enabled',
    isSelected: false,
    isToday: false,
    isOutsideMonth: false,
    // @ts-expect-error ts-migrate(6133) FIXME: 'el' is declared but its value is never read.
    elementRef: (el) => {},
    onClick: undefined,
    onKeyDown: undefined,
    children: null
  }

  componentDidMount() {
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.makeStyles(this.makeStylesVariables)
  }

  // @ts-expect-error ts-migrate(6133) FIXME: 'prevProps' is declared but its value is never rea... Remove this comment to see the full error message
  componentDidUpdate(prevProps, prevState, snapshot) {
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.makeStyles(this.makeStylesVariables)
  }

  get makeStylesVariables() {
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

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'omitViewProps' does not exist on type 't... Remove this comment to see the full error message
    const passthroughProps = View.omitViewProps(
      omitProps(props, Day.propTypes),
      Day
    )

    return (
      <View
        {...passthroughProps}
        as={elementType}
        css={styles.calendarDay}
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
        aria-current={isToday ? 'date' : null}
        aria-selected={
          this.shouldApplyAriaSelected()
            ? isSelected
              ? 'true'
              : 'false'
            : null
        }
        onClick={onClick && this.handleClick}
        onKeyDown={onKeyDown && this.handleKeyDown}
        elementRef={this.handleElementRef}
      >
        <span css={styles.day}>
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
