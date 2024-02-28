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

import { Component } from 'react'

import { testable } from '@instructure/ui-testable'
import { withStyle } from '@instructure/emotion'
import { NumberInput } from '@instructure/ui-number-input'
import { ScreenReaderContent } from '@instructure/ui-a11y-content'

import generateStyle from './styles'
import generateComponentTheme from './theme'

import { propTypes, allowedProps } from './props'
import type {
  PaginationPageInputProps,
  PaginationPageInputState
} from './props'

/**
---
parent: Pagination
id: Pagination.PageInput
---
**/
@withStyle(generateStyle, generateComponentTheme)
@testable()
class PaginationPageInput extends Component<
  PaginationPageInputProps,
  PaginationPageInputState
> {
  static readonly componentId = 'Pagination.PageInput'

  static propTypes = propTypes
  static allowedProps = allowedProps
  static defaultProps = {
    disabled: false
  }

  ref: HTMLSpanElement | null = null

  constructor(props: PaginationPageInputProps) {
    super(props)

    this.state = this.initialState
  }

  get currentPage() {
    return this.props.currentPageIndex + 1
  }

  get initialState() {
    return {
      number: this.currentPage,
      value: `${this.currentPage}`
    }
  }

  get MIN() {
    return 1
  }

  get MAX() {
    return this.props.numberOfPages
  }

  componentDidMount() {
    this.props.makeStyles?.()
  }

  componentDidUpdate(prevProps: PaginationPageInputProps) {
    this.props.makeStyles?.()

    // when the current page changes from outside (e.g.: from arrow buttons),
    // we update the initial state
    if (this.props.currentPageIndex !== prevProps.currentPageIndex) {
      this.resetInitialState()
    }
  }

  resetInitialState() {
    this.setState(this.initialState)
  }

  handleRef = (el: HTMLSpanElement | null) => {
    this.ref = el
  }

  handleInputRef = (el: HTMLInputElement | null) => {
    if (typeof this.props.inputRef === 'function') {
      this.props.inputRef(el)
    }
  }

  handleChange = (
    _event: React.ChangeEvent<HTMLInputElement>,
    value: string
  ) => {
    let newValue = value

    // if the last character was not a number, don't accept it
    if (value.length > 0 && isNaN(value.slice(-1) as any)) {
      newValue = value.slice(0, -1)
    }

    this.setState({
      number: newValue ? Number(newValue) : this.MIN,
      value: newValue
    })
  }

  handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    const { key } = event

    if (key.toLowerCase() === 'enter') {
      const { value, number } = this.state

      // If it is invalid, we reset the input to the current page
      if (value === '' || isNaN(value as any)) {
        this.resetInitialState()
        return
      }

      this.setNewPage(event, number)
    }
  }

  handleDecrement = (
    event:
      | React.KeyboardEvent<HTMLInputElement>
      | React.MouseEvent<HTMLButtonElement>
  ) => {
    this.setNewPage(event, Math.floor(this.currentPage - 1))
  }

  handleIncrement = (
    event:
      | React.KeyboardEvent<HTMLInputElement>
      | React.MouseEvent<HTMLButtonElement>
  ) => {
    this.setNewPage(event, Math.floor(this.currentPage + 1))
  }

  handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    this.setNewPage(event, Math.round(this.state.number))
  }

  getNumberWithinRange(n: number) {
    if (n < this.MIN) return this.MIN
    if (n > this.MAX) return this.MAX
    return n
  }

  setNewPage(
    event:
      | React.KeyboardEvent<HTMLInputElement>
      | React.MouseEvent<HTMLButtonElement>
      | React.FocusEvent<HTMLInputElement>,
    n: number
  ) {
    const number = this.getNumberWithinRange(n)

    this.setState({
      number,
      value: `${number}`
    })

    this.props.onChange(event, number - 1)
  }

  renderLabel() {
    const { label, numberOfPages, styles } = this.props

    return typeof label === 'function' && label(numberOfPages) ? (
      <span css={styles?.inputLabel}>{label(numberOfPages)}</span>
    ) : null
  }

  renderScreenReaderLabel() {
    const { screenReaderLabel, numberOfPages } = this.props
    return (
      <ScreenReaderContent>
        {screenReaderLabel(this.currentPage, numberOfPages)}
      </ScreenReaderContent>
    )
  }

  render() {
    const { styles, disabled } = this.props

    return (
      <span css={styles?.paginationPageInput} ref={this.handleRef}>
        <span css={styles?.numberInput}>
          <NumberInput
            renderLabel={this.renderScreenReaderLabel()}
            onBlur={this.handleBlur}
            onChange={this.handleChange}
            onDecrement={this.handleDecrement}
            onIncrement={this.handleIncrement}
            onKeyDown={this.handleKeyDown.bind(this)}
            interaction={disabled ? 'disabled' : 'enabled'}
            showArrows={false}
            value={this.state.value}
            width="100%"
            textAlign="center"
            inputRef={this.handleInputRef}
          />
        </span>
        {this.renderLabel()}
      </span>
    )
  }
}

export default PaginationPageInput
export { PaginationPageInput }
