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
import { GridCol, GridRow } from '../index'

const text1 = 'Occaecat quis qui anim quis cillum eu. Exercitation consectetur aute dolore adipisicing consectetur consectetur aliquip.'
const text2 = 'Fugiat nisi Lorem non irure sunt ipsum excepteur. Incididunt in id culpa id reprehenderit minim. Cillum est occaecat proident qui sit laboris proident in voluptate minim amet deserunt. Laboris cupidatat nulla consequat nostrud Lorem.'

const regular = (
  <GridRow>
    <GridCol>{text1}</GridCol>
    <GridCol>{text2}</GridCol>
    <GridCol>{text1}</GridCol>
  </GridRow>
)

const widths = (
  <GridRow>
    <GridCol width={2}>{text1}</GridCol>
    <GridCol width={4}>{text2}</GridCol>
    <GridCol width={2}>{text1}</GridCol>
  </GridRow>
)

export default {
  propValues: {
    children: [
      regular,
      widths
    ],
    hAlign: [ 'start', 'center', 'end', 'space-around', 'space-between' ],
    vAlign: [ 'top', 'middle', 'bottom' ]
  },
  filter: (props) => {
    return props.startAt ||
      props.visualDebug ||
      (props.rowSpacing && props.rowSpacing !== 'medium') ||
      (props.colSpacing && props.colSpacing !== 'small')
  }
}
