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
import { expect, mount } from '@instructure/ui-test-utils'

import measureText from '../measureText'

describe('measureText', async () => {
  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'root' implicitly has an 'any' type.
  const getNodes = (root) =>
    Array.from(root.childNodes).filter(
      // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
      (node) => node.nodeType === 1 || node.nodeType === 3
    )

  it('should calculate width', async () => {
    let stage
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <div
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ children: (string | Element)[]; componentR... Remove this comment to see the full error message
        componentRef={(el) => {
          stage = el
        }}
      >
        Lorem ipsum <span>DOLOR SIT AMET.</span>
      </div>
    )

    const nodes = getNodes(stage)

    const width = measureText(nodes, stage)
    expect(width).to.not.equal(0)
  })

  it('should account for different nodes', async () => {
    let stage
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    const subject = await mount(
      <div
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ children: (string | Element)[]; componentR... Remove this comment to see the full error message
        componentRef={(el) => {
          stage = el
        }}
      >
        Lorem ipsum <span>DOLOR SIT AMET.</span>
      </div>
    )

    const nodes = getNodes(stage)

    const width = measureText(nodes, stage)

    await subject.setProps({
      children: 'Lorem ipsum DOLOR SIT AMET.'
    })

    const nodes2 = getNodes(stage)
    const width2 = measureText(nodes2, stage)

    expect(Math.floor(width)).to.equal(Math.floor(width2))
  })

  it('should account for font size styles', async () => {
    let stage
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    const subject = await mount(
      <div
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ children: (string | Element)[]; componentR... Remove this comment to see the full error message
        componentRef={(el) => {
          stage = el
        }}
      >
        Lorem ipsum <span>DOLOR SIT AMET.</span>
      </div>
    )

    const nodes = getNodes(stage)
    const width = measureText(nodes, stage)

    await subject.setProps({
      style: { fontSize: '24px' }
    })

    const width2 = measureText(nodes, stage)
    expect(width).to.not.equal(width2)
  })

  it('should account for letter spacing styles', async () => {
    let stage
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    const subject = await mount(
      <div
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ children: (string | Element)[]; componentR... Remove this comment to see the full error message
        componentRef={(el) => {
          stage = el
        }}
      >
        Lorem ipsum <span>DOLOR SIT AMET.</span>
      </div>
    )

    const nodes = getNodes(stage)
    const width = measureText(nodes, stage)

    await subject.setProps({
      style: { letterSpacing: '5px' }
    })

    const width2 = measureText(nodes, stage)
    expect(width).to.not.equal(width2)
  })
})
