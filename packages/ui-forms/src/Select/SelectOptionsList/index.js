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

import { themeable } from '@instructure/ui-themeable'
import { testable } from '@instructure/ui-testable'

import { View } from '@instructure/ui-layout'
import { Spinner } from '@instructure/ui-elements'

import getOptionId from '../utils/getOptionId'

import styles from './styles.css'
import theme from './theme'

/**
---
parent: DeprecatedSelect
---
**/
@testable()
@themeable(theme, styles)
class SelectOptionsList extends Component {
  static propTypes = {
    /**
    * the selected value
    */
    selectedOption: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        children: PropTypes.node,
        disabled: PropTypes.bool,
        icon: PropTypes.func,
        groupLabel: PropTypes.bool
      })
    ]),
    options: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        children: PropTypes.node,
        disabled: PropTypes.bool,
        icon: PropTypes.func,
        groupLabel: PropTypes.bool
      })
    ),
    /**
     * id for options list element
     */
    optionsId: PropTypes.string,
    /**
    * a function that provides a reference to the internal options list element
    */
    menuRef: PropTypes.func,
    /**
     * The amount of options that are visible without scrolling
     */
    visibleOptionsCount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /**
     * Give the Spinner a title to be read by screenreaders. Disables menu
     * interaction and renders a Spinner in its place.
     */
    loadingText: PropTypes.string,
    /**
     * The menu content to render when no options are present or are filtered away
     */
    emptyOption: PropTypes.node,
    /**
     * Callback fired when an option gets highlighted
     */
    onHighlightOption: PropTypes.func,
    /**
     * Callback fired on the option selection
     */
    onSelect: PropTypes.func,
    onKeyDown: PropTypes.func,
    onKeyUp: PropTypes.func,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    /**
     * Options dropdown can be wider than input if maxWidth is provided
     */
    maxWidth: PropTypes.string,
    /**
     * Callback fired when the empty option is selected by click
     */
    onStaticClick: PropTypes.func,
    onBlur: PropTypes.func,
    highlightedIndex: PropTypes.number,
    expanded: PropTypes.bool,
    disabled: PropTypes.bool
  }

  static defaultProps = {
    selectedOption: null,
    options: [],
    visibleOptionsCount: 8,
    loadingText: null,
    emptyOption: '---',
    size: 'medium',
    expanded: false,
    menuRef: el => {},
    onHighlightOption: event => {},
    onSelect: (event, selectedOption) => {},
    onStaticClick: event => {},
    disabled: false,
    optionsId: undefined,
    highlightedIndex: undefined,
    maxWidth: undefined,
    onKeyDown: undefined,
    onKeyUp: undefined,
    onBlur: undefined
  }

  optionHeight = 5

  renderStaticOption (message) {
    const { size, onStaticClick } = this.props

    return (
      <li // eslint-disable-line
        tabIndex="-1"
        role="option"
        aria-disabled="true"
        aria-selected="false"
        className={classnames(styles.option, {
          [styles[size]]: size
        })}
        onClick={onStaticClick}
      >
        <span className={styles.label}>
          {message}
        </span>
      </li>
    )
  }

  renderIcon (icon) {
    if (typeof icon !== 'undefined' && icon !== null) {
      const Icon = icon
      return (
        <span className={styles.icon}>
          <Icon />
        </span>
      )
    }
  }

  handleClick = (event, option) => {
    if (option.disabled || option.groupLabel) {
      event.preventDefault()
      return
    }

    this.props.onSelect(event, option)
  }

  renderOptions () {
    const {
      options,
      optionsId,
      loadingText,
      emptyOption,
      selectedOption,
      onHighlightOption,
      size,
      highlightedIndex
    } = this.props

    if (loadingText) {
      return this.renderStaticOption(<Spinner size="x-small" renderTitle={loadingText} />)
    }

    if (options.length === 0) {
      return this.renderStaticOption(emptyOption)
    }

    return options.map((option, index) => {
      const { children, id, icon, groupLabel, groupItem } = option
      const selected = getOptionId(selectedOption) === id
      const disabled = option.disabled || groupLabel
      const handlers = {
        onMouseEnter: () => onHighlightOption(index),
        onClick: event => this.handleClick(event, option)
      }
      /* eslint-disable jsx-a11y/role-has-required-aria-props */
      return (
        <li
          {...handlers}
          role="option"
          key={id}
          id={`${optionsId}_${id}`}
          className={classnames(styles.option, {
            [styles.selected]: selected,
            [styles[size]]: size,
            [styles.highlighted]: index === highlightedIndex,
            [styles.disabled]: disabled,
            [styles.groupLabel]: groupLabel,
            [styles.groupItem]: groupItem
          })}
          tabIndex="-1"
          aria-selected={selected ? 'true' : 'false'}
          aria-disabled={disabled ? 'true' : null}
        >
          <span className={styles.label}>
            {icon && this.renderIcon(icon)}
            {children}
          </span>
        </li>
      )
      /* eslint-enable jsx-a11y/role-has-required-aria-props */
    })
  }

  render () {
    const { optionsId, menuRef, visibleOptionsCount, maxWidth, ...props } = this.props

    return (
      <View
        style={props.style} // must pass the style prop for positioning
        className={styles.container}
        maxWidth={maxWidth || 0}
        borderWidth="small"
        borderRadius="medium"
        shadow="resting"
        background="default"
      >
        {!!this.props.expanded && (
          <ul
            className={styles.optionsList}
            id={optionsId}
            onKeyDown={this.props.onKeyDown}
            onKeyUp={this.props.onKeyUp}
            onBlur={this.props.onBlur}
            onClick={event => {
              // prevent synthetic event from firing on the document
              // when select is in a dialog, this event could inadvertently close the dialog
              event.stopPropagation()
              event.nativeEvent.stopImmediatePropagation()
            }}
            tabIndex="-1"
            ref={el => {
              menuRef(el)
              if (el) {
                // store the height of the   options
                this.optionHeight = el.querySelector('li').clientHeight
              }
            }}
            role="listbox"
            style={{
              maxHeight: `${visibleOptionsCount * this.optionHeight}px`,
            }}
          >
            {this.renderOptions()}
          </ul>
        )}
      </View>
    )
  }
}

export default SelectOptionsList
export { SelectOptionsList }
