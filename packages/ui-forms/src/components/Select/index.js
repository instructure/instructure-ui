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
import deepEqual from 'deep-equal'

import { omitProps } from '@instructure/ui-utils/lib/react/passthroughProps'
import CustomPropTypes from '@instructure/ui-utils/lib/react/CustomPropTypes'

import SelectSingle from './SelectSingle'
import SelectMultiple from './SelectMultiple'
import parseOptions from './utils/parseOptions'

/**
---
category: components/forms
---
**/
class Select extends Component {
  static propTypes = {
    /**
     * Determines wether Select allows multiple values
     */
    multiple: PropTypes.bool,
    /**
    * Determines whether the user can type in the input
    */
    editable: PropTypes.bool,
    /**
    * Each children must be an option element.
    */
    children: CustomPropTypes.Children.oneOf(['option', 'optgroup']),
    /**
    * a function that provides a reference to the internal input element
    */
    inputRef: PropTypes.func,
    value: PropTypes.string,
    /**
    * the selected value (must be accompanied by an `onChange` prop)
    */
    selectedOption: CustomPropTypes.controllable(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
          label: PropTypes.string.isRequired,
          value: PropTypes.string.isRequired,
          id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
          children: PropTypes.node,
          disabled: PropTypes.bool,
          icon: PropTypes.func,
          groupLabel: PropTypes.bool
        }),
        PropTypes.arrayOf(
          PropTypes.oneOfType([
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
          ])
        )
      ]),
      'onChange',
      'defaultOption'
    ),
    /**
    * value to set on initial render, meant for an uncontrolled component
    */
    defaultOption: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        children: PropTypes.node,
        disabled: PropTypes.bool,
        icon: PropTypes.func,
        groupLabel: PropTypes.bool
      }),
      PropTypes.arrayOf(
        PropTypes.oneOfType([
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
        ])
      )
    ]),
    /**
    * for not multiple Select, allows the user to empty selection
    */
    allowEmpty: PropTypes.bool,

    id: PropTypes.string,

    /**
     * The placement of the content in relation to the trigger, passed down to Position
     */
    placement: CustomPropTypes.placement,
    messages: PropTypes.arrayOf(CustomPropTypes.message),
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    layout: PropTypes.oneOf(['stacked', 'inline']),
    /**
     * Options dropdown can be wider than input if optionsMaxWidth is provided
     */
    optionsMaxWidth: PropTypes.string,
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
     * The amount of options that are visible without scrolling
     */
    visibleOptionsCount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /**
     * Custom text to be read by the screenreader when Select is focused
     */
    assistiveText: PropTypes.string,
    /**
     * The filter function applied to the options when writing on the input
     */
    filter: PropTypes.func,
    /**
     * The format function called for each Tag to render its contents
     */
    formatSelectedOption: PropTypes.func,
    /**
     * Callback fired when `<Position />` content has been rendered
     */
    onPositioned: PropTypes.func,
    /**
     * Callback fired when the menu is opened
     */
    onOpen: PropTypes.func,
    /**
     * Callback fired when the menu is closed
     */
    onClose: PropTypes.func,
    /**
     * Callback fired when one of the menu options gets selected. Second parameter is the selected option.
     */
    onChange: PropTypes.func,
    /**
     * Callback fired when on the onChange of the internal input.
     */
    onInputChange: PropTypes.func,
    /**
     * Callback fired when on the onBlur of the internal input
     */
    onBlur: PropTypes.func,
    /**
     * Callback fired when on the onClick of the internal input
     */
    onClick: PropTypes.func,
    /**
    * should the menu be closed when a selection happens
    */
    closeOnSelect: PropTypes.bool
  }

  static defaultProps = {
    editable: false,
    allowEmpty: true,
    emptyOption: '---',
    selectedOption: null,
    size: 'medium',
    loadingText: null,
    visibleOptionsCount: 8,
    optionsMaxWidth: null,
    inputRef: function (node) {},
    filter: (options, filterText) => {
      return options.filter(option => option.label.toLowerCase().startsWith(filterText.toLowerCase()))
    },
    formatSelectedOption: tag => tag.label || tag.children,
    closeOnSelect: true
  }

  constructor (props) {
    super(props)
    const options = parseOptions(props.children)

    this.state = { options }
  }

  _input = null

  get focused () {
    return this._subComponent && this._subComponent.focused
  }

  get invalid () {
    return !!this.props.messages && this.props.messages.findIndex(message => message.type === 'error') >= 0
  }

  get value () {
    return this._subComponent && this._subComponent.value
  }

  focus = () => {
    this._subComponent && this._subComponent.focus()
  }

  componentWillReceiveProps (nextProps) {
    const options = parseOptions(nextProps.children)

    if (!deepEqual(this.state.options, options)) {
      this.setState({ options })
    }
  }

  handleRef = node => {
    this._subComponent = node
  }

  render () {
    const Component = this.props.multiple ? SelectMultiple : SelectSingle
    let defaultSelectedOption = this.props.defaultOption || this.props.value

    // select first non-disabled option for standard select components
    if (!this.props.editable &&
        !this.props.multiple &&
        typeof defaultSelectedOption === 'undefined'
    ) {
      for (let i = 0; this.state.options.length; i++) {
        const option = this.state.options[i]
        if (!option.disabled) {
          defaultSelectedOption = option
          break
        }
      }
    }

    return (
      <Component
        ref={this.handleRef}
        {...omitProps(this.props, {}, [
          'multiple',
          'defaultOption',
          !this.props.multiple ? 'formatSelectedOption' : ''
        ])}
        options={this.state.options}
        defaultSelectedOption={defaultSelectedOption}
        closeOnSelect={this.props.closeOnSelect}
      />
    )
  }
}

export default Select
