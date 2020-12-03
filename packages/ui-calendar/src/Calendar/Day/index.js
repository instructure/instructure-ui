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

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { View } from '@instructure/ui-view'
import { AccessibleContent } from '@instructure/ui-a11y-content'
import {
  omitProps,
  callRenderProp,
  getElementType
} from '@instructure/ui-react-utils'
import { I18nPropTypes } from '@instructure/ui-i18n'

import testable from '@instructure/ui-testable'
import themeable from '@instructure/ui-themeable'

import styles from './styles.css'
import theme from './theme'

/**
---
parent: Calendar
id: Calendar.Day
---
**/
@testable()
@themeable(theme, styles)
class Day extends Component {
  static propTypes = {
    /**
     * The rendered representation of the corresponding date.
     */
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    /**
     * An ISO 8601 formatted string representing the date corresponding to
     * this `<Calendar.Day />`
     */
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
    elementRef: (el) => {},
    onClick: undefined,
    onKeyDown: undefined,
    children: null
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
    const { role } = this.props // eslint-disable-line react/prop-types
    return ['option', 'gridcell'].indexOf(role) > -1
  }

  handleClick = (event) => {
    const { onClick, date } = this.props
    if (typeof onClick === 'function') {
      onClick(event, { date })
    }
  }

  handleKeyDown = (event) => {
    const { onKeyDown, date } = this.props
    if (typeof onKeyDown === 'function') {
      onKeyDown(event, { date })
    }
  }

  handleElementRef = (el) => {
    const { elementRef } = this.props
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
      ...props
    } = this.props

    const { elementType, isDisabled } = this

    const classes = classnames({
      [styles.day]: true,
      [styles.outsideMonth]: isOutsideMonth,
      [styles.selected]: isSelected,
      [styles.today]: isToday && !isSelected,
      [styles.disabled]: isDisabled
    })

    const passthroughProps = View.omitViewProps(
      omitProps(props, Day.propTypes),
      Day
    )

    return (
      <View
        {...passthroughProps}
        as={elementType}
        className={styles.root}
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
        <span className={classes}>
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
