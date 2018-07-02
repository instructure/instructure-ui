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
import Img from '../index'
import styles from '../styles.css'

describe('<Img />', () => {
  // eslint-disable-next-line max-len
  const image = 'data:image/gif;base64,R0lGODlhFAAUAJEAAP/9/fYQEPytrflWViH5BAAAAAAALAAAAAAUABQAQAJKhI+pGe09lnhBnEETfodatVHNh1BR+ZzH9LAOCYrVYpiAfWWJOxrC/5MASbyZT4d6AUIBlUYGoR1FsAXUuTN5YhxAEYbrpKRkQwEAOw=='

  const testbed = new Testbed(<Img src={image} />)

  describe('for a11y', () => {
    it('should meet standards', (done) => {
      const subject = testbed.render()

      subject.should.be.accessible(done)
    })

    it('should render an empty alt attribute by default', () => {
      const subject = testbed.render()

      expect(subject.find('[alt=""]')).to.be.present
    })

    it('should render the provided alt attribute', () => {
      const subject = testbed.render({ alt: 'Foo' })

      expect(subject.find('[alt="Foo"]')).to.be.present
    })
  })

  it('should render an overlay color', () => {
    const subject = testbed.render({
      overlay: {color: '#ff0000', opacity: 7}
    })
    const overlay = subject.find(`.${styles.overlay}`)
    expect(overlay).to.be.present
  })

  it('should render a blur filter', () => {
    const subject = testbed.render({
      blur: true
    })
    expect(subject.getComputedStyle().getPropertyValue('filter')).to.contain('blur')
  })

  it('should render a grayscale filter', () => {
    const subject = testbed.render({
      grayscale: true
    })
    expect(subject.getComputedStyle().getPropertyValue('filter')).to.contain('grayscale')
  })

  // If component renders as simple image
  it('should display block-level when inline is false', () => {
    const image = testbed.render({ inline: false })
    expect(image.getComputedStyle().getPropertyValue('display')).to.contain('block')
  })

  // If component has an overlay and renders as image inside containing element
  it('should display block-level with overlay when inline is false', () => {
    const imageWithOverlay = testbed.render({
      inline: false,
      overlay: {color: 'tomato', opacity: 7}
    })
    expect(imageWithOverlay.find(View).props().display).to.equal('block')
    const imageInsideOverlay = imageWithOverlay.find('img')
    expect(imageInsideOverlay.getComputedStyle().getPropertyValue('display')).to.contain('block')
  })

  it('should apply CSS object-fit: cover when cover is true', () => {
    const subject = testbed.render({ cover: true })
    const objectFit = subject.getComputedStyle().getPropertyValue('object-fit')
    expect(objectFit).to.equal('cover')
  })

  it('should apply CSS object-fit: cover when constrain="cover"', () => {
    const subject = testbed.render({ constrain: "cover" })
    const objectFit = subject.getComputedStyle().getPropertyValue('object-fit')
    expect(objectFit).to.equal('cover')
  })

  it('should apply CSS object-fit: contain when constrain="contain"', () => {
    const subject = testbed.render({ constrain: "contain" })
    const objectFit = subject.getComputedStyle().getPropertyValue('object-fit')
    expect(objectFit).to.equal('contain')
  })

  it('applies the container--has-cover class when the cover property is used with overlay', () => {
    const subject = testbed.render({
      alt: 'testing123',
      cover: true,
      overlay: {color: '#ff0000', opacity: 7}
    })
    expect(subject.hasClass(styles['container--has-cover'])).to.be.true
    expect(subject.find('[alt="testing123"]')).to.be.present
  })

  it('applies the container--has-cover class when constrain="cover" is used with overlay', () => {
    const subject = testbed.render({
      alt: 'testing123',
      constrain: "cover",
      overlay: {color: '#ff0000', opacity: 7}
    })
    expect(subject.hasClass(styles['container--has-cover'])).to.be.true
    expect(subject.find('[alt="testing123"]')).to.be.present
  })

  it('applies the container--has-contain class when constrain="contain" is used with overlay', () => {
    const subject = testbed.render({
      alt: 'testing123',
      constrain: "contain",
      overlay: {color: '#ff0000', opacity: 7}
    })
    expect(subject.hasClass(styles['container--has-contain'])).to.be.true
    expect(subject.find('[alt="testing123"]')).to.be.present
  })

  describe('when passing down props to View', () => {
    const allowedProps = {
      margin: 'small',
      elementRef: () => {},
      as: 'img',
      display: 'inline-block',
      width: 100,
      height: 200
    }

    Object.keys(View.propTypes)
      .filter(prop => prop !== 'theme' && prop !== 'children')
      .forEach((prop) => {
        if (Object.keys(allowedProps).indexOf(prop) < 0) {
          it(`should NOT allow the '${prop}' prop`, () => {
            const subject = testbed.render({
              [prop]: 'foo'
            })
            expect(subject.find(View).props()[prop]).to.not.exist
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

    it(`should set the 'display' prop based on the 'inline' prop`, () => {
      const subject = testbed.render({
        inline: true
      })
      expect(subject.find(View).props().display).to.equal('inline-block')
    })

    it(`should not allow overriding the 'as' prop`, () => {
      const subject = testbed.render({ as: 'div' })
      expect(subject.find(View).props().as).to.equal('img')
    })
  })
})
