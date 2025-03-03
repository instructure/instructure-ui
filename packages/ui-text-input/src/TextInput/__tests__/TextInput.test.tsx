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
import ReactDOM from 'react-dom'
import ReactTestUtils from 'react-dom/test-utils'
import { expect, mount, stub, within, find } from '@instructure/ui-test-utils'

import { TextInput } from '../index'

const contentBeforeSVG = (
  <svg height="24" width="24">
    <title>Content before</title>
    <circle cx="50" cy="50" r="40" />
  </svg>
)

const contentAfterSVG = (
  <svg height="24" width="24">
    <title>Content after</title>
    <circle cx="50" cy="50" r="40" />
  </svg>
)

class WrapperComponent extends React.Component {
  render() {
    return (
      <div>
        <TextInput />
      </div>
    )
  }
}

describe('<TextInput/>', async () => {
  it('can be found and tested with ReactTestUtils', async () => {
    const rootNode = document.createElement('div')
    document.body.appendChild(rootNode)

    // eslint-disable-next-line react/no-render-return-value
    const rendered = ReactDOM.render(<WrapperComponent />, rootNode)
    ReactTestUtils.findRenderedComponentWithType(
      rendered as any,
      (TextInput as any).originalType
    )
  })

  it('should include a label', async () => {
    await mount(<TextInput renderLabel="Name" />)
    const label = await find('label')
    expect(label).to.exist()
  })

  it('should focus the input when focus is called', async () => {
    let ref: TextInput | undefined

    const subject = await mount(
      <TextInput
        renderLabel="Name"
        //@ts-expect-error TODO this is coming from ReactComponentWrapper
        componentRef={(el: TextInput) => (ref = el)}
      />
    )
    const textInput = within(subject.getDOMNode())
    const input = await textInput.find('input')

    ref?.focus()
    expect(input.focused()).to.be.true()
  })

  it('should provide an inputRef prop', async () => {
    const inputRef = stub()

    const subject = await mount(
      <TextInput renderLabel="Name" inputRef={inputRef} />
    )
    const textInput = within(subject.getDOMNode())
    const input = await textInput.find('input')

    expect(inputRef).to.have.been.calledWith(input.getDOMNode())
  })

  it('should prepend and append content', async () => {
    const subject = await mount(
      <TextInput
        renderLabel="Name"
        renderBeforeInput={() => contentBeforeSVG}
      />
    )

    const textInput = within(subject.getDOMNode())
    const contentBefore = await textInput.find('svg:withTitle(Content before)')
    expect(contentBefore).to.exist()

    await subject.setProps({
      renderAfterInput: () => contentAfterSVG
    })
    const contentAfter = await textInput.find('svg:withTitle(Content after)')
    expect(contentAfter).to.exist()

    const allContent = await textInput.findAll('svg')
    expect(allContent.length).to.equal(2)
  })

  it('should have no padding on empty before/after content', async () => {
    const subject = await mount(
      <TextInput
        renderLabel="Name"
        renderBeforeInput={<span id="before"></span>}
        renderAfterInput={<span id="after"></span>}
      />
    )

    const textInput = within(subject.getDOMNode())
    let contentBefore = await textInput.find('[class$=__beforeElement]')
    let contentAfter = await textInput.find('[class$=__afterElement]')

    let contentBeforePadding = getComputedStyle(
      contentBefore.getDOMNode()
    ).paddingInlineStart
    let contentAfterPadding = getComputedStyle(
      contentAfter.getDOMNode()
    ).paddingInlineEnd

    expect(contentBeforePadding).to.equal('0px')
    expect(contentAfterPadding).to.equal('0px')

    await subject.setProps({
      renderBeforeInput: () => contentBeforeSVG,
      renderAfterInput: () => contentAfterSVG
    })

    contentBefore = await textInput.find('[class$=__beforeElement]')
    contentAfter = await textInput.find('[class$=__afterElement]')

    contentBeforePadding = getComputedStyle(
      contentBefore.getDOMNode()
    ).paddingInlineStart
    contentAfterPadding = getComputedStyle(
      contentAfter.getDOMNode()
    ).paddingInlineEnd

    expect(contentBeforePadding).to.equal('12px')
    expect(contentAfterPadding).to.equal('12px')
  })

  it('should provide a value getter', async () => {
    let ref: TextInput | undefined

    await mount(
      <TextInput
        renderLabel="Name"
        defaultValue="bar"
        //@ts-expect-error TODO this is coming from ReactComponentWrapper
        componentRef={(el: TextInput) => (ref = el)}
      />
    )

    expect(ref?.value).to.equal('bar')
  })

  describe('events', async () => {
    it('responds to onChange event', async () => {
      const onChange = stub()

      const subject = await mount(
        <TextInput renderLabel="Name" onChange={onChange} />
      )
      const textInput = within(subject.getDOMNode())
      const input = await textInput.find('input')

      await input.change({ target: { value: 'foo' } })
      expect(onChange).to.have.been.called()
    })

    it('responds to onBlur event', async () => {
      const onBlur = stub()

      const subject = await mount(
        <TextInput renderLabel="Name" onBlur={onBlur} />
      )
      const textInput = within(subject.getDOMNode())
      const input = await textInput.find('input')

      await input.focusOut()
      expect(onBlur).to.have.been.called()
    })

    it('responds to onFocus event', async () => {
      const onFocus = stub()

      const subject = await mount(
        <TextInput renderLabel="Name" onFocus={onFocus} />
      )
      const textInput = within(subject.getDOMNode())
      const input = await textInput.find('input')

      await input.focus()
      expect(onFocus).to.have.been.called()
    })
  })

  describe('interaction', async () => {
    it('should set the disabled attribute when `interaction` is disabled', async () => {
      const subject = await mount(
        <TextInput renderLabel="Name" interaction="disabled" />
      )
      const textInput = within(subject.getDOMNode())
      expect(await textInput.find('input[disabled]')).to.exist()
    })

    it('should set the disabled attribute when `disabled` is set', async () => {
      const subject = await mount(<TextInput renderLabel="Name" disabled />)
      const textInput = within(subject.getDOMNode())
      expect(await textInput.find('input[disabled]')).to.exist()
    })

    it('should set the readonly attribute when `interaction` is readonly', async () => {
      const subject = await mount(
        <TextInput renderLabel="Name" interaction="readonly" />
      )
      const textInput = within(subject.getDOMNode())
      expect(await textInput.find('input[readonly]')).to.exist()
    })

    it('should set the readonly attribute when `readOnly` is set', async () => {
      const subject = await mount(<TextInput renderLabel="Name" readOnly />)
      const textInput = within(subject.getDOMNode())
      expect(await textInput.find('input[readonly]')).to.exist()
    })
  })

  describe('for a11y', async () => {
    it('should meet standards', async () => {
      const subject = await mount(<TextInput renderLabel="Name" />)
      const textInput = within(subject.getDOMNode())
      expect(await textInput.accessible()).to.be.true()
    })

    it('should set aria-invalid when errors prop is set', async () => {
      const subject = await mount(
        <TextInput
          renderLabel="Name"
          messages={[{ type: 'error', text: 'some error message' }]}
        />
      )
      const textInput = within(subject.getDOMNode())
      const input = await textInput.find('input')
      expect(input.getAttribute('aria-invalid')).to.exist()
    })
  })
})
