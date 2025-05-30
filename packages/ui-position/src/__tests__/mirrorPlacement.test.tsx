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

import { mirrorPlacement } from '../mirrorPlacement'
import {
  PlacementPropValues,
  placementPropValues,
  PlacementValueArray
} from '../PositionPropTypes'
import '@testing-library/jest-dom'

const mirrorVertiallyAsArrayMap = [
  ['bottom'],
  ['top'],
  ['end'],
  ['start'],
  ['bottom', 'start'],
  ['bottom', 'center'],
  ['bottom', 'end'],
  ['bottom', 'stretch'],
  ['top', 'start'],
  ['top', 'center'],
  ['top', 'end'],
  ['top', 'stretch'],
  ['end', 'top'],
  ['end', 'center'],
  ['end', 'bottom'],
  ['end', 'stretch'],
  ['start', 'top'],
  ['start', 'center'],
  ['start', 'bottom'],
  ['start', 'stretch'],
  ['center', 'start'],
  ['center', 'end'],
  ['offscreen']
]

describe('mirrorPlacement', () => {
  describe('when string is passed', () => {
    describe('without delimiter should return mirrored values as array', () => {
      placementPropValues.forEach((placement, idx) => {
        it(placement, () => {
          const mirrored = mirrorPlacement(placement as PlacementPropValues)

          expect(mirrored[0]).toEqual(mirrorVertiallyAsArrayMap[idx][0])
          expect(mirrored[1]).toEqual(mirrorVertiallyAsArrayMap[idx][1])
        })
      })
    })

    describe('with delimiter should return mirrored values as string', () => {
      placementPropValues.forEach((placement, idx) => {
        it(placement, () => {
          const mirrored = mirrorPlacement(
            placement as PlacementPropValues,
            ' '
          )

          expect(mirrored).toEqual(mirrorVertiallyAsArrayMap[idx].join(' '))
        })
      })
    })
  })

  describe('when array is passed', () => {
    describe('without delimiter should return mirrored values as array', () => {
      placementPropValues.forEach((placement, idx) => {
        it(placement, () => {
          const mirrored = mirrorPlacement(
            placement.split(' ') as PlacementValueArray
          )

          expect(mirrored[0]).toEqual(mirrorVertiallyAsArrayMap[idx][0])
          expect(mirrored[1]).toEqual(mirrorVertiallyAsArrayMap[idx][1])
        })
      })
    })

    describe('with delimiter should return mirrored values as string', () => {
      placementPropValues.forEach((placement, idx) => {
        it(placement, () => {
          const mirrored = mirrorPlacement(
            placement.split(' ') as PlacementValueArray,
            ' '
          )

          expect(mirrored).toEqual(mirrorVertiallyAsArrayMap[idx].join(' '))
        })
      })
    })
  })
})
