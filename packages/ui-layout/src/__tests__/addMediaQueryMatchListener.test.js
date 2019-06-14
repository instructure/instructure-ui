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

import { expect } from '@instructure/ui-test-utils'

import MediaQueryListProxy from './__testfixtures__/MediaQueryListProxy.fixture'

import { addMediaQueryMatchListener } from '../addMediaQueryMatchListener'

describe('addMediaQueryMatchListener', () => {
  let matches = []
  let resizeWindowFuncs = []

  const updateMatches = (queryMatches) => {
    matches = queryMatches
  }

  const listenerCallback = (resize) => {
    resizeWindowFuncs.push(resize)
  }

  const addListener = (query, initialSize = { width: 0, height: 0 }) => {
    return addMediaQueryMatchListener(query, null, updateMatches,
      (query) => new MediaQueryListProxy(query, listenerCallback, initialSize)
    )
  }

  const resizeWindow = (width, height) => {
    resizeWindowFuncs.forEach((resizeWindow) => {
      resizeWindow(width, height)
    })
  }

  afterEach(() => {
    matches = []
    resizeWindowFuncs = []
  })

  it('should initialize with the correct queries matched', () => {
    const query = {
      wide: { minWidth: 100 },
      thin: { maxWidth: 200 },
      tall: { minHeight: 200 },
      short: { maxHeight: 300 }
    }

    addListener(query, { width: 250, height: 350 })

    expect(matches.includes('wide')).to.be.true()
    expect(matches.includes('thin')).to.be.false()
    expect(matches.includes('tall')).to.be.true()
    expect(matches.includes('short')).to.be.false()
  })

  it('should update matches correctly on window resize', () => {
    const query = {
      wide: { minWidth: 1200 },
      thin: { maxWidth: 720 },
      tall: { minHeight: 960 },
      short: { maxHeight: 200 }
    }

    addListener(query)

    expect(matches.includes('wide')).to.be.false()
    expect(matches.includes('thin')).to.be.true()
    expect(matches.includes('tall')).to.be.false()
    expect(matches.includes('short')).to.be.true()

    resizeWindow(800, 500)
    expect(matches.includes('wide')).to.be.false()
    expect(matches.includes('thin')).to.be.false()
    expect(matches.includes('tall')).to.be.false()
    expect(matches.includes('short')).to.be.false()

    resizeWindow(1200, 960)
    expect(matches.includes('wide')).to.be.true()
    expect(matches.includes('thin')).to.be.false()
    expect(matches.includes('tall')).to.be.true()
    expect(matches.includes('short')).to.be.false()
  })

  it('should handle overlapping queries', () => {
    const query = {
      one: { minWidth: 250 },
      two: { minWidth: 350 },
      three: { maxWidth: 300 },
      four: { maxWidth: 500 },
      five: { maxHeight: 700 },
      six: { maxHeight: 800 }
    }

    addListener(query)

    resizeWindow(100, 100)
    expect(matches.includes('one')).to.be.false()
    expect(matches.includes('two')).to.be.false()
    expect(matches.includes('three')).to.be.true()
    expect(matches.includes('four')).to.be.true()
    expect(matches.includes('five')).to.be.true()
    expect(matches.includes('six')).to.be.true()

    resizeWindow(250, 701)
    expect(matches.includes('one')).to.be.true()
    expect(matches.includes('two')).to.be.false()
    expect(matches.includes('three')).to.be.true()
    expect(matches.includes('four')).to.be.true()
    expect(matches.includes('five')).to.be.false()
    expect(matches.includes('six')).to.be.true()

    resizeWindow(350, 801)
    expect(matches.includes('one')).to.be.true()
    expect(matches.includes('two')).to.be.true()
    expect(matches.includes('three')).to.be.false()
    expect(matches.includes('four')).to.be.true()
    expect(matches.includes('five')).to.be.false()
    expect(matches.includes('six')).to.be.false()

    resizeWindow(501, 100)
    expect(matches.includes('one')).to.be.true()
    expect(matches.includes('two')).to.be.true()
    expect(matches.includes('three')).to.be.false()
    expect(matches.includes('four')).to.be.false()
    expect(matches.includes('five')).to.be.true()
    expect(matches.includes('six')).to.be.true()
  })
})

