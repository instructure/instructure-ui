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
import { expect } from 'vitest'
import { accepts } from '../accepts'

describe('accepts', () => {
  const dropImage = new File([], 'whale whale whale.jpg', {
    type: 'image/jpeg'
  })
  const dropFile = new File([], 'whale oil production.pdf', {
    type: 'application/pdf'
  })
  const chromeDragEnterFile = new File([], '', { type: 'image/jpeg' })
  const firefoxDragEnterFile = new File([], '', {
    type: 'application/x-moz-file'
  })

  it('should take image/* to mean any image type', () => {
    expect(accepts(dropImage, 'image/*')).toBe(true)
  })

  it('should reject anything that is not an image, given image/*', () => {
    expect(accepts(dropFile, 'image/*')).toBe(false)
  })

  it('should match the exact file extensions given', () => {
    expect(accepts(dropImage, '.jpg')).toBe(true)
    expect(accepts(dropImage, '.jpg, .png')).toBe(true)
    expect(accepts(dropImage, '.png')).toBe(false)
    expect(accepts(dropFile, '.jpg, .pdf')).toBe(true)
    expect(accepts(dropFile, '.jpg, .pdf')).toBe(true)
  })

  it('should handle chrome dragenter file data', () => {
    expect(accepts(chromeDragEnterFile, 'image/*')).toBe(true)
    expect(accepts(chromeDragEnterFile, '.jpeg')).toBe(true)
    expect(accepts(chromeDragEnterFile, '.png')).not.toBe(true)
    expect(accepts(chromeDragEnterFile, '.pdf')).not.toBe(true)
  })

  it(`should always be true for firefox's dragenter file data`, () => {
    expect(accepts(firefoxDragEnterFile, 'image/*')).toBe(true)
    expect(accepts(firefoxDragEnterFile, '.jpeg')).toBe(true)
    expect(accepts(firefoxDragEnterFile, '.png')).toBe(true)
    expect(accepts(firefoxDragEnterFile, '.pdf')).toBe(true)
  })

  it('allows extensions without leading dot', () => {
    expect(accepts(dropImage, 'jpg, png')).toBe(true)
  })
})
