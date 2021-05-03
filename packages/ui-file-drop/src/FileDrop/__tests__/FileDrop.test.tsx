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
import { expect, mount, spy, stub, wait } from '@instructure/ui-test-utils'
import { FileDrop } from '../index'
import { FileDropLocator } from '../FileDropLocator'
// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('<FileDrop />', async () => {
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should render', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(<FileDrop renderLabel="fake label" />)
    const fileDrop = await FileDropLocator.find()
    expect(fileDrop).to.exist()
  })
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should meet a11y standards', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(<FileDrop renderLabel="fake label" />)
    const fileDrop = await FileDropLocator.find()
    expect(await fileDrop.accessible()).to.be.true()
  })
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('interactions', async () => {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should functionally disable the input if `interaction` is set to disabled', async () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      await mount(<FileDrop renderLabel="Some label" interaction="disabled" />)
      const fileDrop = await FileDropLocator.find()
      const input = await fileDrop.find('input')
      expect(input.getDOMNode().disabled).to.be.true()
    })
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should functionally disable the input if `disabled` is set', async () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      await mount(<FileDrop renderLabel="Some label" disabled />)
      const fileDrop = await FileDropLocator.find()
      const input = await fileDrop.find('input')
      expect(input.getDOMNode().disabled).to.be.true()
    })
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should functionally disable the input if `interaction` is set to readonly', async () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      await mount(<FileDrop renderLabel="Some label" interaction="readonly" />)
      const fileDrop = await FileDropLocator.find()
      const input = await fileDrop.find('input')
      expect(input.getDOMNode().disabled).to.be.true()
    })
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should functionally disable the input if `readOnly` is set', async () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      await mount(<FileDrop renderLabel="Some label" readOnly />)
      const fileDrop = await FileDropLocator.find()
      const input = await fileDrop.find('input')
      expect(input.getDOMNode().disabled).to.be.true()
    })
  })
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('file-type checking when onDrop', async () => {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('responds to drop event', async () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
      const onDrop = stub()
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      await mount(<FileDrop renderLabel="fake label" onDrop={onDrop} />)
      const fileDrop = await FileDropLocator.find()
      const label = await fileDrop.find('label')
      await label.drop()
      expect(onDrop).to.have.been.called()
    })
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('responds to change event', async () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
      const onDrop = stub()
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      await mount(<FileDrop renderLabel="fake label" onDrop={onDrop} />)
      const fileDrop = await FileDropLocator.find()
      const input = await fileDrop.find('input')
      await input.change()
      expect(onDrop).to.have.been.called()
    })
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('accepts correct files using mymetypes', async () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      const onDrop = spy((accepted: any, rejected: any, e: any) => {
        e.persist()
      })
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 0.
      const onDropAccepted = spy()
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 0.
      const onDropRejected = spy()
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      await mount(
        <FileDrop
          renderLabel="fake label"
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
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('rejects incorrect files using mymetypes and shouldEnablePreview', async () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      const onDrop = spy((accepted: any, rejected: any, e: any) => {
        e.persist()
      })
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 0.
      const onDropAccepted = spy()
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 0.
      const onDropRejected = spy()
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      await mount(
        <FileDrop
          renderLabel="fake label"
          shouldEnablePreview
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
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('accepts correct files using mymetypes and enablePreview', async () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      const onDrop = spy((accepted: any, rejected: any, e: any) => {
        e.persist()
      })
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 0.
      const onDropAccepted = spy()
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 0.
      const onDropRejected = spy()
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      await mount(
        <FileDrop
          renderLabel="fake label"
          accept="image/*"
          shouldEnablePreview
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
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('accepts correct files using extensions', async () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      const onDrop = spy((accepted: any, rejected: any, e: any) => {
        e.persist()
      })
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 0.
      const onDropAccepted = spy()
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 0.
      const onDropRejected = spy()
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      await mount(
        <FileDrop
          renderLabel="fake label"
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
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('rejects incorrect files using mymetypes', async () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      const onDrop = spy((accepted: any, rejected: any, e: any) => {
        e.persist()
      })
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 0.
      const onDropAccepted = spy()
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 0.
      const onDropRejected = spy()
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      await mount(
        <FileDrop
          renderLabel="fake label"
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
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('rejects incorrect files using extensions', async () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      const onDrop = spy((accepted: any, rejected: any, e: any) => {
        e.persist()
      })
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 0.
      const onDropAccepted = spy()
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 0.
      const onDropRejected = spy()
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      await mount(
        <FileDrop
          renderLabel="fake label"
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
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('label handling', async () => {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('renders element label directly', async () => {
      const label = <section id="test-id">This is an element label</section>
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      await mount(<FileDrop renderLabel={label} />)
      const fileDrop = await FileDropLocator.find()
      expect(await fileDrop.find('section#test-id')).to.exist()
    })
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('passes isDragAccepted and isDragRejected boolean props to component label', async () => {
      let result = {}
      const label = (props: any) => {
        result = { ...props }
        return null
      }
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      await mount(<FileDrop renderLabel={label} />)
      expect(typeof (result as any).isDragAccepted === 'boolean').to.be.true()
      expect(typeof (result as any).isDragRejected === 'boolean').to.be.true()
    })
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it(`label component's props are false by default`, async () => {
      let result = {}
      const label = (props: any) => {
        result = { ...props }
        return null
      }
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      await mount(<FileDrop renderLabel={label} />)
      expect((result as any).isDragAccepted).to.be.false()
      expect((result as any).isDragRejected).to.be.false()
    })
  })
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('onDrag events', async () => {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('responds to onDragEnter event', async () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
      const onDragEnter = stub()
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      await mount(
        <FileDrop renderLabel="fake label" onDragEnter={onDragEnter} />
      )
      const fileDrop = await FileDropLocator.find()
      const label = await fileDrop.find('label')
      await label.dragEnter()
      expect(onDragEnter).to.have.been.called()
    })
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('responds to onDragOver event', async () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
      const onDragOver = stub()
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      await mount(<FileDrop renderLabel="fake label" onDragOver={onDragOver} />)
      const fileDrop = await FileDropLocator.find()
      const label = await fileDrop.find('label')
      await label.dragOver()
      expect(onDragOver).to.have.been.called()
    })
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('responds to onDragLeave event', async () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
      const onDragLeave = stub()
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      await mount(
        <FileDrop renderLabel="fake label" onDragLeave={onDragLeave} />
      )
      const fileDrop = await FileDropLocator.find()
      const label = await fileDrop.find('label')
      await label.dragLeave()
      expect(onDragLeave).to.have.been.called()
    })
  })
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('stops propagation when the ESC key is released and file browser is open', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(<FileDrop renderLabel="fake label" />)
    const fileDrop = await FileDropLocator.find()
    await fileDrop.click()
    await wait(() => {
      expect(fileDrop).to.have.focus()
    })
    const event = await fileDrop.keyUp('escape')
    await wait(() => {
      expect(event.stopPropagation).to.have.been.called()
    })
  })
})
