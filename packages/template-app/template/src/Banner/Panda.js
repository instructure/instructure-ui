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
import { InlineSVG } from '@instructure/ui-svg-images'

const baseStyles = {
  stroke: '#1f2930',
  strokeWidth: '3',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  strokeMiterlimit: '10'
}

const wireframeStyles = {
  ...baseStyles,
  fill: 'none',
  strokeDasharray: '10'
}

const shadingStyle1 = {
  ...baseStyles,
  fill: '#57626A'
}

const shadingStyle2 = {
  ...baseStyles,
  fill: '#C0C4C7'
}

const shadingStyle3 = {
  ...baseStyles,
  fill: '#ABB1B5'
}

const shadingStyle4 = {
  ...baseStyles,
  fill: '#969DA2'
}

const Panda = () => (
  <InlineSVG
    title="Instructure UI logo"
    viewBox="0 0 600 567"
    width="16rem"
    height="16rem"
  >
    <g>
      <line style={wireframeStyles} x1="298.6" y1="47.3" x2="163.7" y2="78.4" />
      <path style={wireframeStyles} d="M298.6 558" />
      <line style={wireframeStyles} x1="163.7" y1="78.4" x2="298.6" y2="218.1" />
      <path style={wireframeStyles} d="M67.7 399" />
      <path style={wireframeStyles} d="M168.7 434.6" />
      <polyline style={wireframeStyles} points="67.7 399 69 467.4 149.9 497.6 168.9 435.5" />
      <polyline style={wireframeStyles} points="177.6 378.6 144.7 421.7 130.9 438.9 8.1 361.3" />
      <line style={wireframeStyles} x1="8.1" y1="361.3" x2="177.6" y2="378.6" />
      <line style={wireframeStyles} x1="163.7" y1="78.4" x2="125.7" y2="188.8" />
      <line style={wireframeStyles} x1="125.7" y1="188.8" x2="212.1" y2="128.4" />
      <path style={wireframeStyles} d="M155.1 247.4" />
      <line style={wireframeStyles} x1="177.6" y1="378.6" x2="177.6" y2="378.6" />
      <path style={wireframeStyles} d="M177.6 378.6" />
      <polyline style={wireframeStyles} points="155.1 247.4 125.7 188.8 68.6 157.7 8.1 361.3" />
      <polyline style={wireframeStyles} points="125.7 188.8 189.7 199.1 250.2 209.5 282.5 243.3 298.6 218.1" />
      <path style={wireframeStyles} d="M298.6 218.1" />
      <polyline style={wireframeStyles} points="136.1 80 151.6 43.9 104.9 9.4 41 54.2 60 99.1 86.5 120.5" />
      <line style={wireframeStyles} x1="149.9" y1="497.6" x2="229.4" y2="558" />
      <path style={wireframeStyles} d="M149.9 497.6" />
      <polyline style={wireframeStyles} points="298.6 558 229.4 558 267.4 497.6 298.6 497.6" />
      <polyline style={wireframeStyles} points="168.9 435.5 224.2 406.2 298.6 451" />
      <polyline style={wireframeStyles} points="224.2 406.2 245 380.3 298.6 392.4" />
      <polyline style={wireframeStyles} points="267.4 497.6 234.6 497.6 169 435.4 144.9 421.6" />
      <path style={wireframeStyles} d="M250.2 209.5" />
      <polyline style={wireframeStyles} points="189.7 199.1 125.7 288.9 137.8 349.2 177.6 378.6 234.6 318.2 282.5 243.3" />
      <polyline style={wireframeStyles} points="68.6 157.7 104.9 81.8 163.7 78.4" />
    </g>
    <g>
      <polygon style={shadingStyle1} points="362.5 318.1 314.6 243.2 346.9 209.4 407.5 199 471.5 288.8 459.4 349.2 419.6 378.5" />
      <polygon style={shadingStyle2} points="298.5 218 298.5 47.2 433.4 78.2" />
      <polygon style={shadingStyle2} points="471.5 188.7 528.6 157.6 492.2 81.7 433.4 78.2" />
      <polygon style={shadingStyle3} points="346.9 209.4 314.6 243.2 298.5 218 385 128.3 471.5 188.7 407.5 199" />
      <polygon style={shadingStyle2} points="362.5 318.1 419.6 378.5 452.5 421.7 428.2 435.5 372.9 406.1 352.1 380.2 298.5 392.3 298.5 218" />
      <polygon style={shadingStyle1} points="372.9 406.1 352.1 380.2 298.5 392.3 298.5 451" />
      <polygon style={shadingStyle4} points="298.5 497.6 362.5 497.6 428.2 435.5 372.9 406.1 298.5 451" />
      <polygon style={shadingStyle1} points="329.6 497.6 298.5 497.6 298.5 558 367.7 558" />
      <polygon style={shadingStyle3} points="428.2 435.5 447.3 497.6 367.7 558 329.6 497.6 362.5 497.6" />
      <polygon style={shadingStyle4} points="466.5 438.7 529.5 399.4 528.2 467.4 447.3 497.6 428.2 435.5 452.5 421.7" />
      <polygon style={shadingStyle3} points="419.6 378.5 452.5 421.7 466.5 438.7 589.1 361.3" />
      <polygon style={shadingStyle2} points="528.6 157.6 589.1 361.3 419.6 378.5 459.4 349.2 471.5 288.8 442.1 247.4 471.5 188.7" />
      <polygon style={shadingStyle1} points="492.2 81.7 461.1 79.9 445.5 43.7 492.2 9.2 556.3 54.1 537.2 99 510.7 120.3" />
      <polygon style={shadingStyle2} points="442.1 247.4 471.5 188.7 407.5 199" />
      <polygon style={shadingStyle2} points="471.5 188.7 385 128.3 433.4 78.2" />
    </g>
  </InlineSVG>
)

export default Panda
