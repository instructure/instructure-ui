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

import React, { Component, Children } from 'react'
import PropTypes from 'prop-types'

import { Select as UISelect } from '@instructure/ui-select'

class Select extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    renderLabel: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
    id: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    children: PropTypes.node
  }

  static defaultProps = {
    id: undefined,
    value: undefined,
    onChange: (event, data) => {},
    children: null
  }

  constructor (props) {
    super()

    this._options = this.getOptionData(props.children)
    const initialOption = this.getOptionByValue(props.value)

    this.state = {
      isShowing: false,
      inputValue: initialOption.label,
      highlightedValue: initialOption.value,
      selectedValue: initialOption.value
    }
  }

  getOptionByValue (value) {
    for (let i = 0; i < this._options.length; i++) {
      const option = this._options[i]
      if (option.value === value) {
        return option
      }
    }
  }

  getOptionData (options) {
    let data = []
    Children.forEach(options, (child) => {
      const { value, children, ...rest } = child.props
      data.push({ value, label: children, ...rest })
    })
    return data
  }

  render () {
    const {
      id,
      name,
      renderLabel,
      onChange,
      ...passthroughProps
    } = this.props

    const {
      highlightedValue,
      selectedValue,
      isShowing,
      inputValue
    } = this.state

    return (
      <UISelect
        {...passthroughProps}
        id={id}
        name={name}
        renderLabel={renderLabel}
        inputValue={inputValue}
        isShowingOptions={isShowing}
        onRequestShowOptions={(e) => {
          this.setState({ isShowing: true })
        }}
        onRequestHideOptions={(e) => {
          this.setState({
            isShowing: false,
            highlightedValue: selectedValue,
            inputValue: this.getOptionByValue(selectedValue).label
          })
        }}
        onRequestHighlightOption={(e, { id }) => {
          e.persist()
          this.setState({
            highlightedValue: id,
            inputValue: event.type === 'keydown'
              ? this.getOptionByValue(id).label
              : inputValue,
          })
        }}
        onRequestSelectOption={(e, { id }) => {
          this.setState({
            selectedValue: id,
            inputValue: this.getOptionByValue(id).label,
            isShowing: false
          }, () => {
            onChange(e, { value: id })
          })
        }}
      >
        {this._options.map(option => {
          const { value, label, ...rest } = option
          return (
            <UISelect.Option
              {...rest}
              id={value}
              key={value}
              isHighlighted={highlightedValue === value}
              isSelected={selectedValue === value}
            >
              { label }
            </UISelect.Option>
          )
        })}
      </UISelect>
    )
  }
}

export default Select
export { Select }
