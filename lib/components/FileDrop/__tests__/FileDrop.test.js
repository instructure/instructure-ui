import React from 'react'
import FileDrop, { getEventFiles, accepts } from '../index'

describe('<FileDrop />', function () {
  const testbed = new Testbed(<FileDrop label="fake label" />)

  it('should render', function () {
    const subject = testbed.render()

    expect(subject).to.be.present
  })

  it('should meet a11y standards', function (done) {
    const subject = testbed.render()

    subject.should.be.accessible(done)
  })

  describe('file-type checking when onDrop', function () {
    const onDrop = testbed.sandbox.stub()
    const onDropAccepted = testbed.sandbox.stub()
    const onDropRejected = testbed.sandbox.stub()

    beforeEach(function () {
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

    it('responds to onDrop event', function () {
      const subject = testbed.render({ onDrop })
      subject.find('input').simulate('drop')

      expect(onDrop).to.have.been.called
    })

    it('accepts correct files using mymetypes', function () {
      const subject = testbed.render({
        accept: 'image/*',
        onDrop,
        onDropAccepted,
        onDropRejected
      })
      subject.find('input').simulate('drop', imageDropEvent)

      expect(onDrop).to.have.been.calledWith(imageDropEvent.dataTransfer.files, [])
      expect(onDropAccepted).to.have.been.called
      expect(onDropRejected).to.not.have.been.called
    })

    it('accepts correct files using extensions', function () {
      const subject = testbed.render({
        accept: '.jpg',
        onDrop,
        onDropAccepted,
        onDropRejected
      })
      subject.find('input').simulate('drop', imageDropEvent)

      expect(onDrop).to.have.been.calledWith(imageDropEvent.dataTransfer.files, [])
      expect(onDropAccepted).to.have.been.called
      expect(onDropRejected).to.not.have.been.called
    })

    it('rejects incorrect files using mymetypes', function () {
      const subject = testbed.render({
        accept: 'image/*',
        onDrop,
        onDropAccepted,
        onDropRejected
      })
      subject.find('input').simulate('drop', docDropEvent)

      expect(onDrop).to.have.been.calledWith([], docDropEvent.dataTransfer.files)
      expect(onDropAccepted).to.not.have.been.called
      expect(onDropRejected).to.have.been.called
    })

    it('rejects incorrect files using extensions', function () {
      const subject = testbed.render({
        accept: '.jpg',
        onDrop,
        onDropAccepted,
        onDropRejected
      })
      subject.find('input').simulate('drop', docDropEvent)

      expect(onDrop).to.have.been.calledWith([], docDropEvent.dataTransfer.files)
      expect(onDropAccepted).to.not.have.been.called
      expect(onDropRejected).to.have.been.called
    })
  })

  describe('label handling', function () {
    it('renders element label directly', function () {
      const label = (
        <section id="test-id">
          This is an element label
        </section>
      )

      const subject = testbed.render({ label })
      expect(subject.find('#test-id')).to.be.present
    })

    it('renders component label', function () {
      const label = () => (
        <section id="test-id">
          This is a component label
        </section>
      )

      const subject = testbed.render({ label })
      expect(subject.find('#test-id')).to.be.present
    })

    it('passes isDragAccepted and isDragRejected boolean props to component label', function () {
      const label = ({ isDragAccepted, isDragRejected }) => {
        expect(typeof isDragAccepted === 'boolean').to.be.true
        expect(typeof isDragRejected === 'boolean').to.be.true
        return null
      }

      testbed.render({ label })
    })

    it(`label component's props are false by default`, function () {
      const label = ({ isDragAccepted, isDragRejected }) => {
        expect(isDragAccepted).to.be.false
        expect(isDragRejected).to.be.false
        return null
      }

      testbed.render({ label })
    })
  })

  describe('onDrag events', function () {
    it('responds to onDragEnter event', function () {
      const onDragEnter = testbed.sandbox.stub()

      const subject = testbed.render({ onDragEnter })
      subject.find('input').simulate('dragenter')

      expect(onDragEnter).to.have.been.called
    })

    it('responds to onDragOver event', function () {
      const onDragOver = testbed.sandbox.stub()

      const subject = testbed.render({ onDragOver })
      subject.find('input').simulate('dragover')

      expect(onDragOver).to.have.been.called
    })

    it('responds to onDragLeave event', function () {
      const onDragLeave = testbed.sandbox.stub()

      const subject = testbed.render({ onDragLeave })
      subject.find('input').simulate('dragleave')

      expect(onDragLeave).to.have.been.called
    })
  })

  describe('FileDrop.getEventFiles', function () {
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

    it('should return items on chrome dragenter event', function () {
      expect(getEventFiles(chromeDragEnter)).to.be.equal(chromeDragEnter.dataTransfer.items)
    })

    it('should return items on a firefox dragenter event', function () {
      expect(getEventFiles(firefoxDragEnter)).to.be.equal(firefoxDragEnter.dataTransfer.items)
    })

    it('should return empty array on a safari dragenter event', function () {
      expect(getEventFiles(safariDragEnter).length).to.be.equal(0)
    })
  })

  describe('FileDrop.accepts', function () {
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

    it('should take image/* to mean any image type', function () {
      expect(accepts(dropImage, 'image/*')).to.be.true
    })

    it('should reject anything that is not an image, given image/*', function () {
      expect(accepts(dropFile, 'image/*')).to.be.false
    })

    it('should match the exact file extensions given', function () {
      expect(accepts(dropImage, '.jpg')).to.be.true
      expect(accepts(dropImage, '.jpg, .png')).to.be.true
      expect(accepts(dropImage, '.png')).to.be.false
      expect(accepts(dropFile, '.jpg, .pdf')).to.be.true
      expect(accepts(dropFile, '.jpg, .pdf')).to.be.true
    })

    it('should handle chrome dragenter file data', function () {
      expect(accepts(chromeDragEnterFile, 'image/*')).to.be.true
      expect(accepts(chromeDragEnterFile, '.jpeg')).to.be.true
      expect(accepts(chromeDragEnterFile, '.png')).to.not.be.true
      expect(accepts(chromeDragEnterFile, '.pdf')).to.not.be.true
    })

    it(`should always be true for firefox's dragenter file data`, function () {
      expect(accepts(firefoxDragEnterFile, 'image/*')).to.be.true
      expect(accepts(firefoxDragEnterFile, '.jpeg')).to.be.true
      expect(accepts(firefoxDragEnterFile, '.png')).to.be.true
      expect(accepts(firefoxDragEnterFile, '.pdf')).to.be.true
    })
  })
})
