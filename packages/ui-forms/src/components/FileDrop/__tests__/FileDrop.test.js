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
import { expect, mount, spy, stub } from '@instructure/ui-test-utils'
import FileDrop from '../index'
import FileDropLocator from '../locator'

describe('<FileDrop />', async () => {
  it('should render', async () => {
    await mount(<FileDrop label="fake label" />)

    const fileDrop = await FileDropLocator.find()
    expect(fileDrop).to.exist()
  })

  it('should meet a11y standards', async () => {
    await mount(<FileDrop label="fake label" />)

    const fileDrop = await FileDropLocator.find()
    expect(await fileDrop.accessible()).to.be.true()
  })

  describe('file-type checking when onDrop', async () => {
    it('responds to drop event', async () => {
      const onDrop = stub()

      await mount(<FileDrop label="fake label" onDrop={onDrop} />)

      const fileDrop = await FileDropLocator.find()
      const label = await fileDrop.find('label')

      await label.drop()

      expect(onDrop).to.have.been.called()
    })

    it('responds to change event', async () => {
      const onDrop = stub()

      await mount(<FileDrop label="fake label" onDrop={onDrop} />)

      const fileDrop = await FileDropLocator.find()
      const input = await fileDrop.find('input')
      await input.change()

      expect(onDrop).to.have.been.called()
    })

    it('accepts correct files using mymetypes', async () => {
      const onDrop = spy((acceptedFiles, rejectedFiles, e) => {
        e.persist()
      })
      const onDropAccepted = spy()
      const onDropRejected = spy()

      await mount(
        <FileDrop
          label="fake label"
          accept="image/*"
          onDrop={onDrop}
          onDropAccepted={onDropAccepted}
          onDropRejected={onDropRejected}
        />
      )

      const file = new File([''], 'napoleon.png', { type: 'image/png' })

      const dataTransfer = new DataTransfer()
      dataTransfer.items.add(file)

      const fileDrop = await FileDropLocator.find()
      const label = await fileDrop.find('label')
      await label.drop({ dataTransfer })

      const { args } = onDrop.lastCall
      expect(args[0]).to.deep.equal([file])
      expect(args[1]).to.deep.equal([])

      expect(onDropAccepted).to.have.been.called()
      expect(onDropRejected).to.not.have.been.called()
    })

    it('rejects incorrect files using mymetypes and enablePreview', async () => {
      const onDrop = spy((acceptedFiles, rejectedFiles, e) => {
        e.persist()
      })
      const onDropAccepted = spy()
      const onDropRejected = spy()

      await mount(
        <FileDrop
          label="fake label"
          enablePreview
          accept="image/*"
          onDrop={onDrop}
          onDropAccepted={onDropAccepted}
          onDropRejected={onDropRejected}
        />
      )

      const file = new File([''], 'napoleon.pdf', { type: 'application/pdf' })

      const dataTransfer = new DataTransfer()
      dataTransfer.items.add(file)

      const fileDrop = await FileDropLocator.find()
      const label = await fileDrop.find('label')
      await label.drop({ dataTransfer })

      const { args } = onDrop.lastCall
      expect(args[0]).to.deep.equal([])
      expect(args[1]).to.deep.equal([file])

      expect(onDropAccepted).to.not.have.been.called()
      expect(onDropRejected).to.have.been.called()
    })

    it('accepts correct files using mymetypes and enablePreview', async () => {
      const onDrop = spy((acceptedFiles, rejectedFiles, e) => {
        e.persist()
      })
      const onDropAccepted = spy()
      const onDropRejected = spy()

      await mount(
        <FileDrop
          label="fake label"
          accept="image/*"
          enablePreview
          onDrop={onDrop}
          onDropAccepted={onDropAccepted}
          onDropRejected={onDropRejected}
        />
      )

      const file = new File([''], 'napoleon.png', { type: 'image/png' })

      const dataTransfer = new DataTransfer()
      dataTransfer.items.add(file)

      const fileDrop = await FileDropLocator.find()
      const label = await fileDrop.find('label')
      await label.drop({ dataTransfer })

      const { args } = onDrop.lastCall
      expect(args[0]).to.deep.equal([file])
      expect(args[1]).to.deep.equal([])

      expect(onDropAccepted).to.have.been.called()
      expect(onDropRejected).to.not.have.been.called()
    })

    it('accepts correct files using extensions', async () => {
      const onDrop = spy((acceptedFiles, rejectedFiles, e) => {
        e.persist()
      })
      const onDropAccepted = spy()
      const onDropRejected = spy()

      await mount(
        <FileDrop
          label="fake label"
          accept="jpeg"
          onDrop={onDrop}
          onDropAccepted={onDropAccepted}
          onDropRejected={onDropRejected}
        />
      )

      const file = new File([''], 'napoleon.jpeg', { type: 'image/jpeg' })

      const dataTransfer = new DataTransfer()
      dataTransfer.items.add(file)

      const fileDrop = await FileDropLocator.find()
      const label = await fileDrop.find('label')
      await label.drop({ dataTransfer })

      const { args } = onDrop.lastCall
      expect(args[0]).to.deep.equal([file])
      expect(args[1]).to.deep.equal([])

      expect(onDropAccepted).to.have.been.called()
      expect(onDropRejected).to.not.have.been.called()
    })

    it('rejects incorrect files using mymetypes', async () => {
      const onDrop = spy((acceptedFiles, rejectedFiles, e) => {
        e.persist()
      })
      const onDropAccepted = spy()
      const onDropRejected = spy()

      await mount(
        <FileDrop
          label="fake label"
          accept="image/*"
          onDrop={onDrop}
          onDropAccepted={onDropAccepted}
          onDropRejected={onDropRejected}
        />
      )

      const file = new File([''], 'napoleon.pdf', { type: 'application/pdf' })

      const dataTransfer = new DataTransfer()
      dataTransfer.items.add(file)

      const fileDrop = await FileDropLocator.find()
      const label = await fileDrop.find('label')
      await label.drop({ dataTransfer })

      const { args } = onDrop.lastCall
      expect(args[0]).to.deep.equal([])
      expect(args[1]).to.deep.equal([file])

      expect(onDropAccepted).to.not.have.been.called()
      expect(onDropRejected).to.have.been.called()
    })

    it('rejects incorrect files using extensions', async () => {
      const onDrop = spy((acceptedFiles, rejectedFiles, e) => {
        e.persist()
      })
      const onDropAccepted = spy()
      const onDropRejected = spy()

      await mount(
        <FileDrop
          label="fake label"
          accept="jpeg"
          onDrop={onDrop}
          onDropAccepted={onDropAccepted}
          onDropRejected={onDropRejected}
        />
      )

      const file = new File([''], 'napoleon.pdf', { type: 'application/pdf' })

      const dataTransfer = new DataTransfer()
      dataTransfer.items.add(file)

      const fileDrop = await FileDropLocator.find()
      const label = await fileDrop.find('label')
      await label.drop({ dataTransfer })

      const { args } = onDrop.lastCall
      expect(args[0]).to.deep.equal([])
      expect(args[1]).to.deep.equal([file])

      expect(onDropAccepted).to.not.have.been.called()
      expect(onDropRejected).to.have.been.called()
    })
  })

  describe('label handling', async () => {
    it('renders element label directly', async () => {
      const label = (
        <section id="test-id">
          This is an element label
        </section>
      )

      await mount(<FileDrop label={label} />)

      const fileDrop = await FileDropLocator.find()
      expect(await fileDrop.find('section#test-id')).to.exist()
    })

    it('passes isDragAccepted and isDragRejected boolean props to component label', async () => {
      let result = {}

      const label = (props) => {
        result = {...props}
        return null
      }

      await mount(<FileDrop label={label} />)

      expect(typeof result.isDragAccepted === 'boolean').to.be.true()
      expect(typeof result.isDragRejected === 'boolean').to.be.true()
    })

    it(`label component's props are false by default`, async () => {
      let result = {}

      const label = (props) => {
        result = {...props}
        return null
      }

      await mount(<FileDrop label={label} />)

      expect(result.isDragAccepted).to.be.false()
      expect(result.isDragRejected).to.be.false()
    })
  })

  describe('onDrag events', async () => {
    it('responds to onDragEnter event', async () => {
      const onDragEnter = stub()
      await mount(<FileDrop label="fake label" onDragEnter={onDragEnter} />)

      const fileDrop = await FileDropLocator.find()
      const label = await fileDrop.find('label')
      await label.dragEnter()

      expect(onDragEnter).to.have.been.called()
    })

    it('responds to onDragOver event', async () => {
      const onDragOver = stub()
      await mount(<FileDrop label="fake label" onDragOver={onDragOver} />)

      const fileDrop = await FileDropLocator.find()
      const label = await fileDrop.find('label')
      await label.dragOver()

      expect(onDragOver).to.have.been.called()
    })

    it('responds to onDragLeave event', async () => {
      const onDragLeave = stub()
      await mount(<FileDrop label="fake label" onDragLeave={onDragLeave} />)

      const fileDrop = await FileDropLocator.find()
      const label = await fileDrop.find('label')
      await label.dragLeave()

      expect(onDragLeave).to.have.been.called()
    })
  })
})
