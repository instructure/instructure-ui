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
import PropTypes from 'prop-types'
import addElementQueryMatchListener from '../addElementQueryMatchListener'

class ElementComponent extends React.Component {
  static propTypes = {
    width: PropTypes.string,
    height: PropTypes.string
  }

  static defaultProps = {
    width: '300px',
    height: '200px'
  }

  render () {
    const style = {
      width: this.props.width,
      height: this.props.height,
      backgroundColor: 'yellow'
    }
    return <div style={style}>Hello World</div>
  }
}

describe('@addElementQueryMatchListener', (done) => {
  let matches
  const testbed = new Testbed(<ElementComponent />)

  const updateMatches = (queryMatches) => {
    matches = queryMatches
  }

  const addListener = (query, node) => {
    return addElementQueryMatchListener(query, node, updateMatches)
  }

  afterEach(() => {
    matches = []
  })

  it('should initialize with the correct queries matched', () => {
    const subject = testbed.render()
    const query = {
      wide: { minWidth: 220 },
      thin: { maxWidth: 100 },
      tall: { minHeight: 150 },
      short: { maxHeight: 50 }
    }

    const listener = addListener(query, subject.getDOMNode())

    expect(matches.includes('wide')).to.be.true()
    expect(matches.includes('thin')).to.be.false()
    expect(matches.includes('tall')).to.be.true()
    expect(matches.includes('short')).to.be.false()

    listener.remove()
  })

  it('should update matches correctly on element resize', (done) => {
    const subject = testbed.render()
    const query = {
      wide: { minWidth: 600 },
      thin: { maxWidth: 200 },
      tall: { minHeight: 400 },
      short: { maxHeight: 300 }
    }

    const listener = addListener(query, subject.getDOMNode())

    expect(matches.includes('wide')).to.be.false()
    expect(matches.includes('thin')).to.be.false()
    expect(matches.includes('tall')).to.be.false()
    expect(matches.includes('short')).to.be.true()

    subject.setProps({
      width: '200px',
      height: '400px'
    }, () => {
      testbed.raf() // for the listener
      testbed.tick() // for the debounce

      expect(matches.includes('wide')).to.be.false()
      expect(matches.includes('thin')).to.be.true()
      expect(matches.includes('tall')).to.be.true()
      expect(matches.includes('short')).to.be.false()

      subject.setProps({
        width: '600px',
        height: '350px'
      }, () => {
        testbed.raf()
        testbed.tick()

        expect(matches.includes('wide')).to.be.true()
        expect(matches.includes('thin')).to.be.false()
        expect(matches.includes('tall')).to.be.false()
        expect(matches.includes('short')).to.be.false()

        listener.remove()
        done()
      })
    })
  })

  it('should handle overlapping queries', (done) => {
    const subject = testbed.render()
    const query = {
      one: { minWidth: 220 },
      two: { minWidth: 230 }
    }

    const listener = addListener(query, subject.getDOMNode())

    subject.setProps({
      width: '219px',
    }, () => {
      testbed.raf() // for the listener
      testbed.tick() // for the debounce

      expect(matches.includes('one')).to.be.false()
      expect(matches.includes('two')).to.be.false()

      subject.setProps({
        width: '220px'
      }, () => {
        testbed.raf()
        testbed.tick()

        expect(matches.includes('one')).to.be.true()
        expect(matches.includes('two')).to.be.false()

        subject.setProps({
          width: '230px'
        }, () => {
          testbed.raf()
          testbed.tick()

          expect(matches.includes('one')).to.be.true()
          expect(matches.includes('two')).to.be.true()
          listener.remove()
          done()
        })
      })
    })
  })
})
