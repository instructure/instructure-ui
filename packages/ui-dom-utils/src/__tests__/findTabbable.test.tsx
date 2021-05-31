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
import { findTabbable } from '../findTabbable'

describe('findTabbable', async () => {
  describe('tabbable content', async () => {
    it('should find tabbable descendants', async () => {
      /* eslint-disable jsx-a11y/anchor-is-valid */
      /* eslint-disable jsx-a11y/tabindex-no-positive */
      /* eslint-disable jsx-a11y/no-noninteractive-tabindex */

      const subject = await mount(
        <div>
          <a href="#">Yep</a>
          <div>Nope</div>
          {/* @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'number | ... Remove this comment to see the full error message */}
          <div tabIndex="1">Yep</div>
          <input type="text" value="Yep" readOnly />
          <div>
            <button>Yep</button>
            <button style={{ display: 'none' }}>Nope</button>
          </div>
          <div style={{ width: 0, height: 0 }}>
            <button>Nope</button>
          </div>
        </div>
      )
      /* eslint-enable jsx-a11y/no-noninteractive-tabindex */
      /* eslint-enable jsx-a11y/tabindex-no-positive */
      /* eslint-enable jsx-a11y/anchor-is-valid */

      expect(findTabbable(subject.getDOMNode()).length).to.equal(4)
    })
  })

  describe('tabbable root', async () => {
    it('should search the root node when shouldSearchRootNode is set', async () => {
      const subject = await mount(
        <button>
          <span>hello</span>
        </button>
      )
      expect(findTabbable(subject.getDOMNode()).length).to.equal(0)
      expect(findTabbable(subject.getDOMNode(), true).length).to.equal(1)
    })
  })

  it('should gracefully handle null', async () => {
    expect(findTabbable(null).length).to.equal(0)
  })
})
