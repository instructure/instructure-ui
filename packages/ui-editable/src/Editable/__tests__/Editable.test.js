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
import { expect, mount, spy, within, wait } from '@instructure/ui-test-utils'

import { Editable } from '../index'

const noop = () => {}
const render = ({
  mode,
  getContainerProps,
  getViewerProps,
  getEditorProps,
  getEditButtonProps
}) => {
  const { isVisible, buttonRef, ...buttonProps } = getEditButtonProps()
  const { onBlur, editorRef } = getEditorProps()
  return (
    <div
      {...getContainerProps()}
    >
      { mode === 'view' && <div {...getViewerProps()}>text</div>}
      { mode === 'edit' && <input ref={editorRef} onBlur={onBlur} defaultValue="textvalue" /> }
      { <button {...buttonProps}>edit</button> }
    </div>
  )
}

describe('<Editable />', async () => {
  it('should render view mode', async () => {
    const renderSpy = spy(render)
    await mount(
      <Editable
        mode="view"
        onChangeMode={noop}
        render={renderSpy}
      />
    )
    const args = renderSpy.lastCall.args[0]
    expect(args.mode).to.equal('view')
  })

  it('should render edit mode', async () => {
    const renderSpy = spy(render)
    await mount(
      <Editable
        mode="edit"
        onChangeMode={noop}
        render={renderSpy}
      />
    )
    const args = renderSpy.lastCall.args[0]
    expect(args.mode).to.equal('edit')
  })

  it('should change to edit mode on button click', async () => {
    const renderSpy = spy(render)
    const onChangeModeSpy = spy((newMode) => {})
    const subject = await mount(
      <Editable
        mode="view"
        onChangeMode={onChangeModeSpy}
        render={renderSpy}
      />
    )
    let args = renderSpy.lastCall.args[0]
    expect(args.mode).to.equal('view')

    const editable = within(subject.getDOMNode())

    const editButton = await editable.find('button:withLabel(edit)')
    await editButton.focus()
    await editButton.click()

    args = onChangeModeSpy.lastCall.args[0]
    expect(args).to.equal('edit')
  })

  it('should change to edit mode on component click', async () => {
    const onChangeModeSpy = spy((newMode) => {})
    const renderSpy = spy(render)
    const subject = await mount(
      <Editable
        mode="view"
        onChangeMode={onChangeModeSpy}
        render={renderSpy}
      />
    )
    const renderProps = renderSpy.lastCall.args[0]
    expect(renderProps.mode).to.equal('view')

    const container = within(subject.getDOMNode())

    await container.mouseDown({ buttons: 1 })

    await wait(() => expect(onChangeModeSpy.lastCall.args[0]).to.equal('edit'))
  })

  it('should set the button to visible on mouse over', async () => {
    const onChangeModeSpy = spy((newMode) => {})
    const renderSpy = spy(render)
    const subject = await mount(
      <Editable
        mode="view"
        onChangeMode={onChangeModeSpy}
        render={renderSpy}
      />
    )

    let props = renderSpy.lastCall.args[0].getEditButtonProps()
    expect(props.isVisible).to.be.false()

    const editable = within(subject.getDOMNode())
    await editable.mouseOver()

    props = renderSpy.lastCall.args[0].getEditButtonProps()

    expect(props.isVisible).to.be.true()

    await editable.mouseOut()

    props = renderSpy.lastCall.args[0].getEditButtonProps()

    expect(props.isVisible).to.be.false()
  })

  it('should change to view mode on editor blur', async () => {
    const onChangeModeSpy = spy((newMode) => {})
    const renderSpy = spy(render)
    const subject = await mount(
      <Editable
        mode="edit"
        onChangeMode={onChangeModeSpy}
        render={renderSpy}
      />
    )
    let args = renderSpy.lastCall.args[0]
    expect(args.mode).to.equal('edit')

    const editable = within(subject.getDOMNode())

    const input = await editable.find('input[value="textvalue"]')
    await input.focus()
    const editButton = await editable.find('button:contains(edit)')
    await editButton.focus()

    args = onChangeModeSpy.lastCall.args[0]
    expect(args).to.equal('view')
  })

  it('should change to view mode on escape', async () => {
    const onChangeModeSpy = spy((newMode) => {})
    const subject = await mount(
      <Editable
        mode="edit"
        onChangeMode={onChangeModeSpy}
        render={render}
      />
    )
    const editable = within(subject.getDOMNode())

    await editable.keyUp('Escape', {
      defaultPrevented: false,
      bubbles: true,
      button: 0
    })

    const args = onChangeModeSpy.lastCall.args[0]
    expect(args).to.equal('view')
  })

  it('should call onChange when the user is finished editing', async () => {
    const onChangeSpy = spy((newValue) => {})
    const renderSpy = spy(render)
    const subject = await mount(
      <Editable
        mode="edit"
        onChangeMode={noop}
        render={renderSpy}
        value="foo"
        onChange={onChangeSpy}
      />
    )

    await subject.setProps({value: 'bar'})

    expect(onChangeSpy).not.to.have.been.called()

    await subject.setProps({mode: "view"})

    const arg = onChangeSpy.lastCall.args[0]
    expect(arg).to.equal('bar')
  })

  it('should warn if readOnly + mode="edit"', async () => {
    const warning = spy(console, 'warn')

    await mount(
      <Editable
        mode="edit"
        onChangeMode={noop}
        render={render}
        value="foo"
        readOnly
      />
    )

    const args = warning.firstCall.args[0]
    expect(args).to.include('When readOnly is true, mode must be "view"')
  })
})
