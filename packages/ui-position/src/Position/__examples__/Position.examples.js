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
import React from 'react'

export default {
  excludeProps: ['trackPosition', 'over'],
  propValues: {
    placement: [
      'top',
      'end',
      'bottom',
      'start',
      'top start',
      'start top',
      'start center',
      'start bottom',
      'bottom start',
      'bottom center',
      'bottom end',
      'end bottom',
      'end center',
      'end top',
      'top end',
      'top center',
      'center end',
      'center start',
      'top stretch',
      'bottom stretch',
      'end stretch',
      'start stretch'
    ]
  },
  getComponentProps: (props) => {
    const targetSize = '3px'
    const contentSize = '48px'
    const xStretch =
      props.placement == 'top stretch' || props.placement === 'bottom stretch'
    const yStretch =
      props.placement == 'end stretch' || props.placement === 'start stretch'

    const text = <span style={{ fontSize: '12px' }}>{props.placement}</span>

    return {
      constrain: 'none',
      shouldTrackPosition: false,
      insertAt: 'bottom',
      shouldPositionOverTarget: xStretch || yStretch,
      offsetX: yStretch ? -parseInt(targetSize) : 0,
      offsetY: xStretch ? -parseInt(targetSize) : 0,
      renderTarget:
        xStretch || yStretch ? (
          <div
            style={{
              width: xStretch ? '100%' : targetSize,
              height: xStretch ? targetSize : '100%',
              background: '#2d3b45'
            }}
          />
        ) : (
          <div
            style={{
              width: targetSize,
              height: targetSize,
              background: '#2d3b45'
            }}
          />
        ),
      children:
        xStretch || yStretch ? (
          <div
            style={{
              width: xStretch ? null : contentSize,
              height: xStretch ? contentSize : null,
              border: '0.0625rem solid #ccc',
              textAlign: 'center',
              background: '#eee'
            }}
          >
            {text}
          </div>
        ) : (
          <div
            style={{
              width: contentSize,
              height: contentSize,
              border: '0.0625rem solid #ccc',
              textAlign: 'center',
              background: '#eee'
            }}
          >
            {text}
          </div>
        )
    }
  },
  getExampleProps: (props) => {
    const xStretch =
      props.placement == 'top stretch' || props.placement === 'bottom stretch'
    const yStretch =
      props.placement == 'end stretch' || props.placement === 'start stretch'
    const paddingRegular = 'x-large'
    const paddingXStretch = 'x-large none'
    const paddingYStretch = 'none x-large'
    return {
      as: 'div',
      width: '99px',
      height: '99px',
      margin: 'small',
      textAlign: 'center',
      padding: yStretch
        ? paddingYStretch
        : xStretch
        ? paddingXStretch
        : paddingRegular,
      withVisualDebug: true
    }
  }
}
