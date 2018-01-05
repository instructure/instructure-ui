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
import FileDrop, { getEventFiles, accepts } from '../index'

describe('<FileDrop />', () => {
  const testbed = new Testbed(<FileDrop label="fake label" />)

  it('should render', () => {
    const subject = testbed.render()

    expect(subject).to.be.present
  })

  it('should meet a11y standards', (done) => {
    const subject = testbed.render()

    subject.should.be.accessible(done)
  })

  describe('file-type checking when onDrop', () => {
    const onDrop = testbed.stub()
    const onDropAccepted = testbed.stub()
    const onDropRejected = testbed.stub()

    beforeEach(() => {
      onDrop.reset()
      onDropAccepted.reset()
      onDropRejected.reset()
    })

    const imageDropEvent = {
      dataTransfer: {
        files: [{
          type: 'image/jpeg',
          name: 'napoleon.jpg',
          size: 3000
        }]
      }
    }

    const docDropEvent = {
      dataTransfer: {
        files: [{
          type: 'application/pdf',
          name: 'napoleon.pdf',
          size: 3000
        }]
      }
    }

    it('responds to drop event', () => {
      const subject = testbed.render({ onDrop })
      subject.find('label').simulate('drop')

      expect(onDrop).to.have.been.called
    })

    it('responds to change event', () => {
      const subject = testbed.render({ onDrop })
      subject.find('input').simulate('change')

      expect(onDrop).to.have.been.called
    })

    it('accepts correct files using mymetypes', () => {
      const subject = testbed.render({
        accept: 'image/*',
        onDrop,
        onDropAccepted,
        onDropRejected
      })
      subject.find('label').simulate('drop', imageDropEvent)

      expect(onDrop).to.have.been.calledWith(imageDropEvent.dataTransfer.files, [])
      expect(onDropAccepted).to.have.been.called
      expect(onDropRejected).to.not.have.been.called
    })

    it('accepts correct files using extensions', () => {
      const subject = testbed.render({
        accept: '.jpg',
        onDrop,
        onDropAccepted,
        onDropRejected
      })
      subject.find('label').simulate('drop', imageDropEvent)

      expect(onDrop).to.have.been.calledWith(imageDropEvent.dataTransfer.files, [])
      expect(onDropAccepted).to.have.been.called
      expect(onDropRejected).to.not.have.been.called
    })

    it('rejects incorrect files using mymetypes', () => {
      const subject = testbed.render({
        accept: 'image/*',
        onDrop,
        onDropAccepted,
        onDropRejected
      })
      subject.find('label').simulate('drop', docDropEvent)

      expect(onDrop).to.have.been.calledWith([], docDropEvent.dataTransfer.files)
      expect(onDropAccepted).to.not.have.been.called
      expect(onDropRejected).to.have.been.called
    })

    it('rejects incorrect files using extensions', () => {
      const subject = testbed.render({
        accept: '.jpg',
        onDrop,
        onDropAccepted,
        onDropRejected
      })
      subject.find('label').simulate('drop', docDropEvent)

      expect(onDrop).to.have.been.calledWith([], docDropEvent.dataTransfer.files)
      expect(onDropAccepted).to.not.have.been.called
      expect(onDropRejected).to.have.been.called
    })
  })

  describe('label handling', () => {
    it('renders element label directly', () => {
      const label = (
        <section id="test-id">
          This is an element label
        </section>
      )

      const subject = testbed.render({ label })
      expect(subject.find('#test-id')).to.be.present
    })

    it('renders component label', () => {
      const label = () => (
        <section id="test-id">
          This is a component label
        </section>
      )

      const subject = testbed.render({ label })
      expect(subject.find('#test-id')).to.be.present
    })

    it('passes isDragAccepted and isDragRejected boolean props to component label', () => {
      const label = ({ isDragAccepted, isDragRejected }) => {
        expect(typeof isDragAccepted === 'boolean').to.be.true
        expect(typeof isDragRejected === 'boolean').to.be.true
        return null
      }

      testbed.render({ label })
    })

    it(`label component's props are false by default`, () => {
      const label = ({ isDragAccepted, isDragRejected }) => {
        expect(isDragAccepted).to.be.false
        expect(isDragRejected).to.be.false
        return null
      }

      testbed.render({ label })
    })
  })

  describe('onDrag events', () => {
    it('responds to onDragEnter event', () => {
      const onDragEnter = testbed.stub()

      const subject = testbed.render({ onDragEnter })
      subject.find('label').simulate('dragenter')

      expect(onDragEnter).to.have.been.called
    })

    it('responds to onDragOver event', () => {
      const onDragOver = testbed.stub()

      const subject = testbed.render({ onDragOver })
      subject.find('label').simulate('dragover')

      expect(onDragOver).to.have.been.called
    })

    it('responds to onDragLeave event', () => {
      const onDragLeave = testbed.stub()

      const subject = testbed.render({ onDragLeave })
      subject.find('label').simulate('dragleave')

      expect(onDragLeave).to.have.been.called
    })
  })

  describe('FileDrop.getEventFiles', () => {
    const chromeDragEnter = {
      dataTransfer: {
        dropEffect: 'none',
        effectAllowed: 'all',
        files: [],
        items: [{
          kind: 'file',
          type: 'image/jpeg'
        }],
        types: ['Files']
      }
    }

    const firefoxDragEnter = {
      dataTransfer: {
        dropEffect: 'move',
        effectAllowed: 'uninitialized',
        files: [],
        items: [{
          kind: 'file',
          type: 'application/x-moz-file'
        }],
        types: ['application/x-moz-file', 'Files']
      }
    }

    const safariDragEnter = {
      dataTransfer: {
        dropEffect: 'none',
        effectAllowed: 'all',
        files: [],
        types: []
      }
    }

    it('should return items on chrome dragenter event', () => {
      expect(getEventFiles(chromeDragEnter)).to.be.equal(chromeDragEnter.dataTransfer.items)
    })

    it('should return items on a firefox dragenter event', () => {
      expect(getEventFiles(firefoxDragEnter)).to.be.equal(firefoxDragEnter.dataTransfer.items)
    })

    it('should return empty array on a safari dragenter event', () => {
      expect(getEventFiles(safariDragEnter).length).to.be.equal(0)
    })
  })

  describe('FileDrop.accepts', () => {
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

    it('should take image/* to mean any image type', () => {
      expect(accepts(dropImage, 'image/*')).to.be.true
    })

    it('should reject anything that is not an image, given image/*', () => {
      expect(accepts(dropFile, 'image/*')).to.be.false
    })

    it('should match the exact file extensions given', () => {
      expect(accepts(dropImage, '.jpg')).to.be.true
      expect(accepts(dropImage, '.jpg, .png')).to.be.true
      expect(accepts(dropImage, '.png')).to.be.false
      expect(accepts(dropFile, '.jpg, .pdf')).to.be.true
      expect(accepts(dropFile, '.jpg, .pdf')).to.be.true
    })

    it('should handle chrome dragenter file data', () => {
      expect(accepts(chromeDragEnterFile, 'image/*')).to.be.true
      expect(accepts(chromeDragEnterFile, '.jpeg')).to.be.true
      expect(accepts(chromeDragEnterFile, '.png')).to.not.be.true
      expect(accepts(chromeDragEnterFile, '.pdf')).to.not.be.true
    })

    it(`should always be true for firefox's dragenter file data`, () => {
      expect(accepts(firefoxDragEnterFile, 'image/*')).to.be.true
      expect(accepts(firefoxDragEnterFile, '.jpeg')).to.be.true
      expect(accepts(firefoxDragEnterFile, '.png')).to.be.true
      expect(accepts(firefoxDragEnterFile, '.pdf')).to.be.true
    })

    it('allows extensions without leading dot', () => {
      expect(accepts(dropImage, 'jpg, png')).to.be.true
    })
  })
})
