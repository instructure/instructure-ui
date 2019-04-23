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
import View from '../../View'

import { PositionTarget, PositionContent } from '../index'

export default {
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
    const xStretch = props.placement == 'top stretch' || props.placement === 'bottom stretch'
    const yStretch = props.placement == 'end stretch' || props.placement === 'start stretch'
    const contentProps = {
      as: 'div',
      width: contentSize,
      height: contentSize,
      borderWidth: 'small',
      textAlign: 'center',
      background: 'light'
    }
    const text = (
      <span style={{fontSize: '12px'}}>
        {props.placement}
      </span>
    )

    return {
      constrain: 'none',
      trackPosition: false,
      insertAt: 'bottom',
      over: xStretch || yStretch,
      offsetX: yStretch ? -parseInt(targetSize) : 0,
      offsetY: xStretch ? -parseInt(targetSize) : 0,
      children: xStretch || yStretch ? [
        <PositionTarget key="0">
          <View
            as="div"
            width={xStretch ? '100%' : targetSize}
            height={xStretch ? targetSize : '100%'}
            background="inverse" />
        </PositionTarget>,
        <PositionContent key="1">
          <View
            {...contentProps}
            width={xStretch ? null : contentSize}
            height={xStretch ? contentSize : null}
          >
            {text}
          </View>
        </PositionContent>
      ] : [
        <PositionTarget key="0">
          <View
            as="div"
            width={targetSize}
            height={targetSize}
            background="inverse"
          />
        </PositionTarget>,
        <PositionContent key="1">
          <View {...contentProps}>
            {text}
          </View>
        </PositionContent>
      ]
    }
  },
  getExampleProps: (props) => {
    const xStretch = props.placement == 'top stretch' || props.placement === 'bottom stretch'
    const yStretch = props.placement == 'end stretch' || props.placement === 'start stretch'
    const paddingRegular = 'x-large'
    const paddingXStretch = 'x-large none'
    const paddingYStretch = 'none x-large'
    return {
      as: 'div',
      width: '99px',
      height: '99px',
      margin: 'small',
      textAlign: 'center',
      padding: yStretch ? paddingYStretch : xStretch ? paddingXStretch : paddingRegular,
      debug: true
    }
  }
}
