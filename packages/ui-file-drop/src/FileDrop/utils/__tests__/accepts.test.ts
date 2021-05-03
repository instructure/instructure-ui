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
import { accepts } from '../accepts'

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('accepts', () => {
  const dropImage = {
    lastModified: 1489419040000,
    name: 'whale whale whale.jpg',
    size: 4419800,
    type: 'image/jpeg'
  }
  const dropFile = {
    lastModified: 1489419040000,
    name: 'whale oil production.pdf',
    size: 44198009,
    type: 'application/pdf'
  }
  const chromeDragEnterFile = {
    kind: 'file',
    type: 'image/jpeg'
  }
  const firefoxDragEnterFile = {
    kind: 'file',
    type: 'application/x-moz-file'
  }

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should take image/* to mean any image type', () => {
    expect(accepts(dropImage, 'image/*')).to.be.true()
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should reject anything that is not an image, given image/*', () => {
    expect(accepts(dropFile, 'image/*')).to.be.false()
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should match the exact file extensions given', () => {
    expect(accepts(dropImage, '.jpg')).to.be.true()
    expect(accepts(dropImage, '.jpg, .png')).to.be.true()
    expect(accepts(dropImage, '.png')).to.be.false()
    expect(accepts(dropFile, '.jpg, .pdf')).to.be.true()
    expect(accepts(dropFile, '.jpg, .pdf')).to.be.true()
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should handle chrome dragenter file data', () => {
    expect(accepts(chromeDragEnterFile, 'image/*')).to.be.true()
    expect(accepts(chromeDragEnterFile, '.jpeg')).to.be.true()
    expect(accepts(chromeDragEnterFile, '.png')).to.not.be.true()
    expect(accepts(chromeDragEnterFile, '.pdf')).to.not.be.true()
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it(`should always be true for firefox's dragenter file data`, () => {
    expect(accepts(firefoxDragEnterFile, 'image/*')).to.be.true()
    expect(accepts(firefoxDragEnterFile, '.jpeg')).to.be.true()
    expect(accepts(firefoxDragEnterFile, '.png')).to.be.true()
    expect(accepts(firefoxDragEnterFile, '.pdf')).to.be.true()
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('allows extensions without leading dot', () => {
    expect(accepts(dropImage, 'jpg, png')).to.be.true()
  })
})
