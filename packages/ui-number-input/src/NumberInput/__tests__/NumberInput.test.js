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

import { expect, mount, stub, generateA11yTests } from '@instructure/ui-test-utils'

import { NumberInput } from '../index'
import { NumberInputLocator } from '../NumberInputLocator'
import NumberInputExamples from '../__examples__/NumberInput.examples'

describe('<NumberInput />', () => {
  it('sets value on the input', async () => {
    await mount(
      <NumberInput
        renderLabel="Label"
        onChange={Function.prototype}
        value="42"
      />
    )
    const numberInput = await NumberInputLocator.find()
    const input = await numberInput.findInput()

    expect(input).to.have.value('42')
  })

  it('should accept a number for the value', async () => {
    await mount(
      <NumberInput
        renderLabel="Label"
        onChange={Function.prototype}
        value={42}
      />
    )
    const numberInput = await NumberInputLocator.find()
    const input = await numberInput.findInput()

    expect(input).to.have.value('42')
  })

  it('displays the label', async () => {
    await mount(
      <NumberInput renderLabel="Label" />
    )
    const numberInput = await NumberInputLocator.find()
    const input = await numberInput.findInput()

    expect(input).to.have.label('Label')
  })

  it('passes the input element to inputRef', async () => {
    const inputRef = stub()
    await mount(
      <NumberInput renderLabel="Label" inputRef={inputRef} />
    )

    const numberInput = await NumberInputLocator.find()
    const input = await numberInput.findInput()

    expect(inputRef).to.have.been.calledOnce()
    expect(inputRef).to.have.been.calledWith(input.getDOMNode())
  })

  it('passes change events to onChange handler', async () => {
    const onChange = stub().callsFake(event => {
      event.persist() // so we can make assertions about the event
    })

    await mount(
      <NumberInput renderLabel="Label" onChange={onChange} />
    )

    const numberInput = await NumberInputLocator.find()
    const input = await numberInput.findInput()

    const event = { target: { value: 'foo' } }
    await input.change(event)

    expect(onChange).to.have.been.calledOnce()
    expect(onChange).to.have.been.calledWithMatch(event)
    expect(onChange.lastCall.args[1]).to.equal('foo')
  })

  it('passes keyboard events to the onKeyDown handler', async () => {
    const onKeyDown = stub()
    await mount(
      <NumberInput renderLabel="Label" onKeyDown={onKeyDown} />
    )

    const numberInput = await NumberInputLocator.find()
    const input = await numberInput.findInput()

    await input.keyDown()

    expect(onKeyDown).to.have.been.calledOnce()
  })

  it('passes blur events to onBlur handler', async () => {
    const onBlur = stub()
    await mount(
      <NumberInput renderLabel="Label" onBlur={onBlur} />
    )

    const numberInput = await NumberInputLocator.find()
    const input = await numberInput.findInput()

    await input.blur()

    expect(onBlur).to.have.been.calledOnce()
  })

  it('passes focus events to onFocus handler', async () => {
    const onFocus = stub()
    await mount(
      <NumberInput renderLabel="Label" onFocus={onFocus} />
    )

    const numberInput = await NumberInputLocator.find()
    const input = await numberInput.findInput()

    await input.focus({ target: {} }) // this only works if we pass a target

    expect(onFocus).to.have.been.calledOnce()
  })

  it('shows arrow buttons by default', async () => {
    await mount(
      <NumberInput renderLabel="Label" />
    )

    const numberInput = await NumberInputLocator.find()
    const buttons = await numberInput.findArrowButtons()

    expect(buttons).to.have.length(2)
  })

  it('hides arrow buttons when showArrows is false', async () => {
    await mount(
      <NumberInput renderLabel="Label" showArrows={false} />
    )

    const numberInput = await NumberInputLocator.find()
    const buttons = await numberInput.findArrowButtons({ expectEmpty: true })

    expect(buttons).to.have.length(0)
  })

  it('calls onIncrement when up arrow is clicked', async () => {
    const onIncrement = stub()
    await mount(
      <NumberInput renderLabel="Label" onIncrement={onIncrement} />
    )

    const numberInput = await NumberInputLocator.find()
    const buttons = await numberInput.findArrowButtons()

    await buttons[0].mouseDown()

    expect(onIncrement).to.have.been.calledOnce()
  })

  it('does not call onIncrement when read only', async () => {
    const onIncrement = stub()
    await mount(
      <NumberInput renderLabel="Label" interaction="readonly" onIncrement={onIncrement} />
    )

    const numberInput = await NumberInputLocator.find()
    const buttons = await numberInput.findArrowButtons()

    await buttons[0].mouseDown()

    expect(onIncrement).not.to.have.been.called()
  })

  it('calls onDecrement when down arrow is clicked', async () => {
    const onDecrement = stub()
    await mount(
      <NumberInput renderLabel="Label" onDecrement={onDecrement} />
    )

    const numberInput = await NumberInputLocator.find()
    const buttons = await numberInput.findArrowButtons()

    await buttons[1].mouseDown()

    expect(onDecrement).to.have.been.calledOnce()
  })

  it('does not call onDecrement when read only', async () => {
    const onDecrement = stub()
    await mount(
      <NumberInput renderLabel="Label" interaction="readonly" onDecrement={onDecrement} />
    )

    const numberInput = await NumberInputLocator.find()
    const buttons = await numberInput.findArrowButtons()

    await buttons[1].mouseDown()

    expect(onDecrement).not.to.have.been.called()
  })

  it('focuses the input when up arrow is clicked', async () => {
    await mount(
      <NumberInput renderLabel="Label" />
    )

    const numberInput = await NumberInputLocator.find()
    const buttons = await numberInput.findArrowButtons()

    const event = await buttons[0].mouseDown()

    expect(event.preventDefault).to.have.been.calledOnce()

    const input = await numberInput.findInput()

    expect(input.focused()).to.be.true()
  })

  it('focuses the input when down arrow is clicked', async () => {
    await mount(
      <NumberInput renderLabel="Label" />
    )

    const numberInput = await NumberInputLocator.find()
    const buttons = await numberInput.findArrowButtons()

    const event = await buttons[1].mouseDown()

    expect(event.preventDefault).to.have.been.calledOnce()

    const input = await numberInput.findInput()

    expect(input.focused()).to.be.true()
  })

  it('calls onIncrement when up arrow key is pressed', async () => {
    const onIncrement = stub()
    await mount(
      <NumberInput renderLabel="Label" onIncrement={onIncrement} />
    )
    const numberInput = await NumberInputLocator.find()
    const input = await numberInput.findInput()

    await input.keyDown('up')

    expect(onIncrement).to.have.been.calledOnce()
  })

  it('calls onDecrement when down arrow key is pressed', async () => {
    const onDecrement = stub()
    await mount(
      <NumberInput renderLabel="Label" onDecrement={onDecrement} />
    )

    const numberInput = await NumberInputLocator.find()
    const input = await numberInput.findInput()

    await input.keyDown('down')

    expect(onDecrement).to.have.been.calledOnce()
  })

  it('does not move caret when up arrow key is pressed', async () => {
    await mount(
      <NumberInput renderLabel="Label" />
    )

    const numberInput = await NumberInputLocator.find()
    const input = await numberInput.findInput()

    const event = await input.keyDown('up')

    expect(event.preventDefault).to.have.been.calledOnce()
  })

  it('does not move caret when down arrow key is pressed', async () => {
    await mount(
      <NumberInput renderLabel="Label" />
    )

    const numberInput = await NumberInputLocator.find()
    const input = await numberInput.findInput()

    const event = await input.keyDown('down')

    expect(event.preventDefault).to.have.been.calledOnce()
  })

  it('handles other keyDown events normally', async () => {
    await mount(
      <NumberInput renderLabel="Label" />
    )

    const numberInput = await NumberInputLocator.find()
    const input = await numberInput.findInput()

    const event = await input.keyDown()

    expect(event.preventDefault).not.to.have.been.called()
  })

  describe('with generated examples', async () => {
    generateA11yTests(NumberInputExamples)
  })
})
