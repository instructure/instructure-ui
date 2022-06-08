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
import React, { Component } from 'react'
import { withStyle, jsx } from '@instructure/emotion'
import { ScreenReaderContent } from '@instructure/ui-a11y-content'
import { TextInput } from '@instructure/ui-text-input'
import shallowCompare from '../utils/shallowCompare'
import type { RGBAInputProps, RGBAInputState } from './props'
import generateStyle from './styles'
import generateComponentTheme from './theme'

/**
 * ---
 * private: true
 * ---
 * @tsProps
 **/
@withStyle(generateStyle, generateComponentTheme)
class RGBAInput extends Component<RGBAInputProps, RGBAInputState> {
  constructor(props: RGBAInputProps) {
    super(props)
    this.state = {
      value: props.value
    }
  }

  static defaultProps = {
    withAlpha: false
  }

  ref: HTMLDivElement | null = null

  handleRef = (el: HTMLDivElement | null) => {
    const { elementRef } = this.props

    this.ref = el

    if (typeof elementRef === 'function') {
      elementRef(el)
    }
  }

  componentDidMount() {
    this.props.makeStyles?.()
  }

  componentDidUpdate(prevProps: RGBAInputProps) {
    this.props.makeStyles?.()
    if (
      shallowCompare(prevProps.value, this.props.value) ||
      shallowCompare(this.state.value, this.props.value)
    ) {
      this.setState({
        value: this.props.value
      })
    }
  }

  handleChange(type: string, e: React.ChangeEvent<HTMLInputElement>) {
    const upperLimit = type === 'a' ? 100 : 255
    const newValue =
      type === 'a' ? Number(e.target.value) / 100 : Number(e.target.value)
    const newColor = { ...this.props.value, [type]: newValue }

    if (!isNaN(Number(newValue)) && newValue >= 0 && newValue <= upperLimit) {
      this.setState({ value: newColor })
      this.props.onChange(newColor)
      return
    }
  }

  render() {
    const { styles, disabled, label, withAlpha } = this.props
    return (
      <div ref={this.handleRef} css={styles?.RGBAInput}>
        {label && <div css={styles?.label}>{label}</div>}
        <div css={styles?.inputContainer}>
          <span css={styles?.rgbInput}>
            <TextInput
              disabled={disabled}
              value={`${this.state.value.r}`}
              onChange={(e) => this.handleChange('r', e)}
              renderLabel={
                <ScreenReaderContent>
                  {this.props.rgbRedInputScreenReaderLabel}
                </ScreenReaderContent>
              }
            />
          </span>
          <span css={styles?.rgbInput}>
            <TextInput
              disabled={disabled}
              value={`${this.state.value.g}`}
              onChange={(e) => this.handleChange('g', e)}
              renderLabel={
                <ScreenReaderContent>
                  {this.props.rgbGreenInputScreenReaderLabel}
                </ScreenReaderContent>
              }
            />
          </span>
          <span css={styles?.rgbInput}>
            <TextInput
              disabled={disabled}
              value={`${this.state.value.b}`}
              onChange={(e) => this.handleChange('b', e)}
              renderLabel={
                <ScreenReaderContent>
                  {this.props.rgbBlueInputScreenReaderLabel}
                </ScreenReaderContent>
              }
            />
          </span>
          {withAlpha && (
            <span css={styles?.aInput}>
              <TextInput
                disabled={disabled}
                value={`${Math.round(this.state.value.a * 100)}`}
                onChange={(e) => this.handleChange('a', e)}
                renderAfterInput="%"
                renderLabel={
                  <ScreenReaderContent>
                    {this.props.rgbAlphaInputScreenReaderLabel}
                  </ScreenReaderContent>
                }
              />
            </span>
          )}
        </div>
      </div>
    )
  }
}

export default RGBAInput
