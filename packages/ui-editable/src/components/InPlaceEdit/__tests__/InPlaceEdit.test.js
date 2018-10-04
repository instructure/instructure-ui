/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2018 - present Instructure, Inc.
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
import { expect, mount, within, wait } from '@instructure/ui-test-utils'

import InPlaceEdit from '../index'

const noop = () => {}
const renderViewer = () => <div id="viewer">text</div>
const renderEditor = ({editorRef, onBlur}) => { // eslint-disable-line react/prop-types
  return <input id="editor" ref={editorRef} onBlur={onBlur} defaultValue="textvalue" />
}
const renderEditButton = (props) => {
  return InPlaceEdit.renderDefaultEditButton({ label: 'Edit', ...props })
}

describe('<InPlaceEdit />', async () => {
  it('should render view mode', async () => {
    const subject =  await mount(
      <InPlaceEdit
        id="foos"
        mode="view"
        onChangeMode={noop}
        renderViewer={renderViewer}
        renderEditor={renderEditor}
        renderEditButton={renderEditButton}
      />
    )

    const ipeditor = within(subject.getDOMNode())
    const view = await ipeditor.find('#viewer')
    const editButton = await ipeditor.find('button:contains(Edit)')

    expect(view.getDOMNode()).to.exist()
    expect(editButton.getDOMNode()).to.exist()
  })

  it('should render view mode with string button label', async () => {
    const subject = await mount(
      <InPlaceEdit
        mode="view"
        onChangeMode={noop}
        renderViewer={renderViewer}
        renderEditor={renderEditor}
        renderEditButton={renderEditButton}
      />
    )
    const ipeditor = within(subject.getDOMNode())
    const view = await ipeditor.find('#viewer')
    const editButton = await ipeditor.find('button:contains(Edit)')

    expect(ipeditor.getDOMNode()).to.exist()
    expect(view.getDOMNode()).to.exist()
    expect(editButton.getDOMNode()).to.exist()
  })

  it('should render edit mode', async () => {
    const subject = await mount(
      <InPlaceEdit
        mode="edit"
        onChangeMode={noop}
        renderViewer={renderViewer}
        renderEditor={renderEditor}
        renderEditButton={renderEditButton}
      />
    )
    const ipeditor = within(subject.getDOMNode())
    const input = await ipeditor.find('input#editor')

    expect(ipeditor.getDOMNode()).to.exist()
    expect(input.getDOMNode()).to.exist()
    await wait(() => expect(ipeditor.containsFocus()).to.be.true())
  })

  it('should render a custom edit button', async () => {
    const subject = await mount(
      <InPlaceEdit
        mode="view"
        onChangeMode={noop}
        renderViewer={renderViewer}
        renderEditor={renderEditor}
        renderEditButton={() => {
          return <button id="custom_button">Custom</button>
        }}
      />
    )
    const ipeditor = within(subject.getDOMNode())
    const view = await ipeditor.find('#viewer')
    const editButton = await ipeditor.find('button:contains(Custom)')

    expect(ipeditor.getDOMNode()).to.exist()
    expect(view.getDOMNode()).to.exist()
    expect(editButton.getDOMNode()).to.exist()
  })

  it('should switch mode to edit via props, and focus the editor', async () => {
    const subject = await mount(
      <InPlaceEdit
        mode="view"
        onChangeMode={noop}
        renderViewer={renderViewer}
        renderEditor={renderEditor}
        renderEditButton={renderEditButton}
      />
    )

    await subject.setProps({ mode: 'edit' })

    const ipeditor = within(subject.getDOMNode())

    await wait(() => expect(ipeditor.containsFocus()).to.be.true())
  })

  it('should switch mode to view via props, and focus the edit button', async () => {
    const subject = await mount(
      <InPlaceEdit
        mode="edit"
        onChangeMode={noop}
        renderViewer={renderViewer}
        renderEditor={renderEditor}
        renderEditButton={renderEditButton}
      />
    )

    await subject.setProps({ mode: 'view' })

    const ipeditor = within(subject.getDOMNode())

    const editButton = await ipeditor.find('button:contains(Edit)')

    await wait(() => expect(editButton.containsFocus()).to.be.true())
  })

  it('should meet a11y standards', async () => {
    const subject = await mount(
      <InPlaceEdit
        mode="view"
        onChangeMode={noop}
        renderViewer={renderViewer}
        renderEditor={renderEditor}
        renderEditButton={renderEditButton}
      />
    )
    const ipeditor = within(subject.getDOMNode())
    expect(await ipeditor.accessible()).to.be.true()
  })
})
