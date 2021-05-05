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

import { InPlaceEdit } from '../index'

const noop = () => {}
const renderViewer = () => <div id="viewer">text</div>
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'editorRef' implicitly has an 'any... Remove this comment to see the full error message
const renderEditor = ({ editorRef, onBlur }) => {
  // eslint-disable-line react/prop-types
  return (
    <input
      id="editor"
      ref={editorRef}
      onBlur={onBlur}
      defaultValue="textvalue"
    />
  )
}
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
const renderEditButton = (props) => {
  return InPlaceEdit.renderDefaultEditButton({ label: 'Edit', ...props })
}

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('<InPlaceEdit />', async () => {
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should render view mode', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    const subject = await mount(
      <InPlaceEdit
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ id: string; mode: "view"; onChangeMode: ()... Remove this comment to see the full error message
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

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should render view mode with string button label', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
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

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should render edit mode', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
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

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should render a custom edit button', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
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

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should switch mode to edit via props, and focus the editor', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
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

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should switch mode to view via props, and focus the edit button', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
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

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should meet a11y standards', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
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
