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

import FocusManager from '../focusManager'

describe('focusManager', () => {
  const focusManager = new FocusManager()
  let container
  let handleWindowFocus

  beforeEach(() => {
    container = document.createElement('div')
    container.innerHTML = `
      <input class="focusManager--ONE" />
      <input class="focusManager--TWO" />
    `

    document.body.appendChild(container)
  })

  afterEach(() => {
    if (container && container.parentNode) {
      container.parentNode.removeChild(container)
    }

    focusManager.teardownScopedFocus()
    window.removeEventListener('focus', handleWindowFocus)
  })

  it('should manage focus', () => {
    const one = document.querySelector('.focusManager--ONE')
    const two = document.querySelector('.focusManager--TWO')

    one.focus()

    expect(document.activeElement).to.equal(one)

    focusManager.markForFocusLater()

    two.focus()

    expect(document.activeElement).to.equal(two)

    focusManager.returnFocus()

    expect(document.activeElement).to.equal(one)
  })

  // TODO Need to figure out how to properly trigger window.focus/blur
  // it('should scope focus after window blur', function (done) {
  //   const one = document.querySelector('.focusManager--ONE')
  //
  //   focusManager.setupScopedFocus(container)
  //
  //   window.blur()
  //
  //   expect(document.activeElement).to.equal(document.body)
  //
  //   handleWindowFocus = function () {
  //     setTimeout(function () {
  //       expect(document.activeElement).to.equal(one)
  //       done()
  //     }, 0)
  //   }
  //
  //   window.addEventListener('focus', handleWindowFocus)
  //   window.focus()
  // })
})
