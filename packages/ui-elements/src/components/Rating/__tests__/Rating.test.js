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
import IconStar from '@instructure/ui-icons/lib/Solid/IconStar'
import IconStarLight from '@instructure/ui-icons/lib/Solid/IconStarLight'
import View from '@instructure/ui-layout/lib/components/View'
import Rating from '../index'
import RatingIcon from '../RatingIcon'

describe('<Rating />', () => {
  const testbed = new Testbed(
    <Rating label="Course rating" />
  )

  it('should render the correct number of icons', () => {
    const subject = testbed.render({
      iconCount: 5
    })
    const svg = subject.find(IconStarLight)
    expect(svg.length).to.equal(5)
  })

  it('should handle a valueMax of zero', () => {
    const subject = testbed.render({
      valueMax: 0
    })
    const svg = subject.find(IconStarLight)
    expect(svg.length).to.equal(3)
  })

  it('transitions when animateFill is set', () => {
    const subject = testbed.render({
      iconCount: 5,
      animateFill: true,
      valueNow: 100,
      valueMax: 100
    })

    expect(subject.find(RatingIcon).at(4).props().animateFill).to.be.true()
  })

  it('should fill the correct number of icons', () => {
    const subject = testbed.render({
      iconCount: 5,
      valueNow: 89,
      valueMax: 100
    })
    const svg = subject.find(IconStar)
    expect(svg.length).to.equal(4)
  })

  it('never renders more than `iconCount` icons', () => {
    const subject = testbed.render({
      iconCount: 5,
      valueNow: 110,
      valueMax: 100
    })
    const svg = subject.find(IconStar)
    expect(svg.length).to.equal(5)
  })

  describe('when passing down props to View', () => {
    const allowedProps = {
      margin: 'small',
      display: 'inline-block'
    }

    Object.keys(View.propTypes)
      .filter(prop => prop !== 'theme' && prop !== 'children')
      .forEach((prop) => {
        if (Object.keys(allowedProps).indexOf(prop) < 0) {
          it(`should NOT allow the '${prop}' prop`, () => {
            const subject = testbed.render({
              [prop]: 'foo'
            })
            expect(subject.find(View).props()[prop]).to.not.exist()
          })
        } else {
          it(`should pass down the '${prop}' prop and set it to '${allowedProps[prop]}'`, () => {
            const subject = testbed.render({
              [prop]: allowedProps[prop]
            })
            expect(subject.find(View).props()[prop]).to.equal(allowedProps[prop])
          })
        }
    })
    it(`should not allow overriding the display prop`, () => {
      const subject = testbed.render({
        display: 'auto'
      })
      expect(subject.find(View).props().display).to.equal('inline-block')
    })
  })

  it('should set the required aria attribute values', () => {
    const subject = testbed.render({
      label: 'Course rating',
      formatValueText: function (current, max) {
        return `${current} out of ${max}`
      },
      iconCount: 5,
      valueNow: 89,
      valueMax: 100
    })
    // see https://www.w3.org/TR/wai-aria-1.1/#slider
    expect(subject.getAttribute('role')).to.equal('slider')
    expect(subject.getAttribute('aria-readonly')).to.equal('true')
    expect(subject.getAttribute('aria-label')).to.equal('Course rating')
    expect(subject.getAttribute('aria-valuenow')).to.equal('4')
    expect(subject.getAttribute('aria-valuemax')).to.equal('5')
    expect(subject.getAttribute('aria-valuemin')).to.equal('0')
    expect(subject.getAttribute('aria-valuetext')).to.equal('4 out of 5')
  })

  it('should meet a11y standards', (done) => {
    const subject = testbed.render()
    // this will keep failing erroneously until the next release of axe-core
    // https://github.com/dequelabs/axe-core/pull/964/commits/0a54a2380fc81a2da75ce2da18b184b8ebba1368
    // so we'll test the attributes above and ignore that rule for now
    subject.should.be.accessible(done, {
      // TODO: remove this ignore when we upgrade axe-core
      ignores: ['aria-allowed-attr']
    })
  })
})
