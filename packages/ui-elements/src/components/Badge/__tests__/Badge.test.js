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
import View from '@instructure/ui-layout/lib/components/View'
import Badge from '../index'
import styles from '../styles.css'

describe('<Badge />', () => {
  const testbed = new Testbed(
    <Badge count={100}>
      <button type="button">Inbox</button>
    </Badge>
  )

  it('should show the count', () => {
    const subject = testbed.render()

    const badge = subject.find(`.${styles.badge}`)
    expect(badge.findText('100').length).to.equal(1)
  })

  it('should truncate the count via countUntil', () => {
    const subject = testbed.render({countUntil: 100})

    const badge = subject.find(`.${styles.badge}`)
    expect(badge.findText('99 +').length).to.equal(1)
  })

  it('should change postion based on the placement prop', () => {
    const subject = testbed.render({placement: 'bottom start'})

    const badgeBottom = subject.find(`span.${styles['positioned--bottom']}`)
    expect(badgeBottom).to.be.present()

    const badgeStart = subject.find(`span.${styles['positioned--start']}`)
    expect(badgeStart).to.be.present()
  })

  it('should not render a wrapper for a standalone Badge', () => {
    const subject = testbed.render({standalone: true})

    expect(subject.find(`.${styles.wrapper}`).length).to.equal(0)
  })

  it('should change its output via the formatOutput prop', () => {
    const subject = testbed.render({
      count: 15,
      formatOutput: function (formattedCount) {
        return `My count is ${formattedCount}`
      }
    })

    const badge = subject.find(`.${styles.badge}`)
    expect(badge.findText('My count is 15').length).to.equal(1)
  })

  describe('when passing down props to View', () => {
    const allowedProps = {
      as: 'span',
      margin: 'small',
      elementRef: (el) => {},
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
            expect(subject.find(View).first().props()[prop]).to.not.exist()
          })
        } else {
          it(`should allow the '${prop}' prop and set it to '${allowedProps[prop]}'`, () => {
            const subject = testbed.render({
              [prop]: allowedProps[prop]
            })
            expect(subject.find(View).first().props()[prop]).to.equal(allowedProps[prop])
          })
        }
    })

    it(`should not allow overriding the display prop by default`, () => {
      const subject = testbed.render({
        display: 'block'
      })
      expect(subject.find(View).at(0).props().display).to.equal('inline-block')
      expect(subject.find(View).at(1).props().display).to.equal('block')
    })

    it(`should not allow overriding the display prop when standalone`, () => {
      const subject = testbed.render({
        standalone: true,
        display: 'block'
      })
      expect(subject.find(View).first().props().display).to.equal('inline-block')
    })
  })

  it('should meet a11y standards', (done) => {
    const subject = testbed.render()

    subject.should.be.accessible(done, {
      ignores: [  /* add a11y standards rules to ignore here (https://dequeuniversity.com/rules/axe) */ ]
    })
  })
})
