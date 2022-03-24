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
import { TextInput } from '@instructure/ui-text-input'
import { FormFieldGroup } from '@instructure/ui-form-field'
import shallowCompare from '../utils/shallowCompare'
import type { RGBType } from '../props'
import { RGBAInputProps, RGBAInputState } from './props'
import generateStyle from './styles'

@withStyle(generateStyle)
class RGBAInput extends Component<RGBAInputProps, RGBAInputState> {
  constructor(props: RGBAInputProps) {
    super(props)
    this.state = {
      value: props.value
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
    const newValue = Number(e.target.value)
    const newColor = { ...this.props.value, [type]: Number(e.target.value) }
    if (!isNaN(Number(newValue)) && newValue >= 0 && newValue <= upperLimit) {
      this.setState({ value: newColor })
      this.props.onChange(newColor)
      return
    }
  }
  rgbToHex(rgb: RGBType) {
    const { r, g, b } = rgb
    return [r, g, b]
      .map((x) => {
        const hex = x.toString(16)
        return hex.length === 1 ? '0' + hex : hex
      })
      .join('')
  }
  isValidHex(hex: string) {
    const reg = /^([0-9a-f]{3}){1,2}$/i
    return reg.test(hex)
  }
  render() {
    return (
      <div css={this.props?.styles?.RGBAInput}>
        <FormFieldGroup
          description="RGBA"
          layout="columns"
          vAlign="top"
          width="500px"
        >
          <TextInput
            value={`${this.state.value.r}`}
            onChange={(e) => this.handleChange('r', e)}
            width="54px"
            renderLabel=""
          />
          <TextInput
            value={`${this.state.value.g}`}
            onChange={(e) => this.handleChange('g', e)}
            width="54px"
            renderLabel=""
          />
          <TextInput
            value={`${this.state.value.b}`}
            onChange={(e) => this.handleChange('b', e)}
            width="54px"
            renderLabel=""
          />
          <TextInput
            value={`${this.state.value.a}`}
            onChange={(e) => this.handleChange('a', e)}
            renderAfterInput="%"
            width="70px"
            renderLabel=""
          />
        </FormFieldGroup>
      </div>
    )
  }
}

export default RGBAInput
