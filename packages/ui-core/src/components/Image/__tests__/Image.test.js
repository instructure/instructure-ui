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
import Image from '../index'

describe('<Image />', () => {
  // eslint-disable-next-line max-len
  const image = 'data:image/gif;base64,R0lGODlhFAAUAJEAAP/9/fYQEPytrflWViH5BAAAAAAALAAAAAAUABQAQAJKhI+pGe09lnhBnEETfodatVHNh1BR+ZzH9LAOCYrVYpiAfWWJOxrC/5MASbyZT4d6AUIBlUYGoR1FsAXUuTN5YhxAEYbrpKRkQwEAOw=='

  const testbed = new Testbed(<Image src={image} />)

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

    it('should not allow padding to be added as a property', () => {
      const subject = testbed.render({
        padding: 'small medium large small'
      })
      expect(subject.find(View).props().padding).to.not.exist
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
  })
})
