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

import View from '@instructure/ui-layout/lib/components/View'
import RangeInput from '@instructure/ui-forms/lib/components/RangeInput'

import { SEEK_VOLUME_INTERVAL } from '../../../VideoPlayer'

/**
---
private: true
---
**/
class VolumeSlider extends Component {
  static propTypes = {
    value: PropTypes.number.isRequired,
    onKeyDown: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.element.isRequired,
    handleShowControls: PropTypes.func.isRequired
  }

  formatValue = (volume) => parseInt(volume * 100)

  handleOnMouseMove = () => {
    this.props.handleShowControls()
  }

  render() {
    const { value, onKeyDown, onChange, label } = this.props

    return (
      <View
        padding="medium"
        as="div"
        onMouseMove={this.handleOnMouseMove}>
        <RangeInput
          defaultValue={1}
          value={value}
          max={1}
          min={0}
          step={SEEK_VOLUME_INTERVAL}
          onKeyDown={onKeyDown}
          onChange={onChange}
          formatValue={this.formatValue}
          displayValue={false}
          label={label}
        />
      </View>
    )
  }
}

export default VolumeSlider
