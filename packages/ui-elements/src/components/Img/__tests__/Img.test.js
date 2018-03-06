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
import Container from '@instructure/ui-container/lib/components/Container'
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

    it('should respect width and height attributes', () => {
      const subject = testbed.render({ width: '100', height: '100' })
      const offsetHeight = subject.getComputedStyle().getPropertyValue('height')
      expect(offsetHeight).to.equal('100px')
    })

    it('should not allow padding to be added as a property', () => {
      const subject = testbed.render({
        padding: 'small medium large small'
      })
      expect(subject.find(Container).props().padding).to.not.exist
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
      expect(imageWithOverlay.find(Container).props().display).to.equal('block')
      const imageInsideOverlay = imageWithOverlay.find('img')
      expect(imageInsideOverlay.getComputedStyle().getPropertyValue('display')).to.contain('block')
    })

    it('should apply CSS object-fit: cover when cover is true', () => {
      const subject = testbed.render({ cover: true })
      const objectFit = subject.getComputedStyle().getPropertyValue('object-fit')
      expect(objectFit).to.equal('cover')
    })

    it('should set overlay container height and width to 100% when cover is true', () => {
      const subject = testbed.render({
        alt: 'testing123',
        cover: true,
        overlay: {color: '#ff0000', opacity: 7}
      })
      expect(subject.hasClass(styles['container--has-cover'])).to.be.true
      expect(subject.find('[alt="testing123"]')).to.be.present
    })
  })
})
