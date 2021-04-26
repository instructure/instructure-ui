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
import { expect, mount, stub, within } from '@instructure/ui-test-utils'

import { TextInput } from '../index'

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('<TextInput/>', async () => {
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should include a label', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(<TextInput renderLabel="Name" />)
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'find'.
    const label = await find('label')
    expect(label).to.exist()
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should focus the input when focus is called', async () => {
    let ref
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    const subject = await mount(
      // @ts-expect-error ts-migrate(2322) FIXME: Type '{ renderLabel: string; componentRef: (el: an... Remove this comment to see the full error message
      <TextInput renderLabel="Name" componentRef={(el) => (ref = el)} />
    )
    const textInput = within(subject.getDOMNode())
    const input = await textInput.find('input')

    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    ref.focus()
    expect(input.focused()).to.be.true()
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should provide an inputRef prop', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
    const inputRef = stub()
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    const subject = await mount(
      <TextInput renderLabel="Name" inputRef={inputRef} />
    )
    const textInput = within(subject.getDOMNode())
    const input = await textInput.find('input')

    expect(inputRef).to.have.been.calledWith(input.getDOMNode())
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should prepend and append content', async () => {
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

    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
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

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should provide a value getter', async () => {
    let ref
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <TextInput
        renderLabel="Name"
        defaultValue="bar"
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ renderLabel: string; defaultValue: string;... Remove this comment to see the full error message
        componentRef={(el) => (ref = el)}
      />
    )

    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    expect(ref.value).to.equal('bar')
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should provide messageId to FormField', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    const subject = await mount(
      <TextInput
        renderLabel="Name"
        messages={[
          {
            text: 'yup',
            type: 'error'
          }
        ]}
      />
    )
    const textInput = within(subject.getDOMNode())
    const input = await textInput.find('input')

    expect(input.getAttribute('aria-describedby')).to.exist()
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should have equal messagesId and aria-describedby values', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    const subject = await mount(
      <TextInput
        renderLabel="Name"
        messages={[
          {
            text: 'yup',
            type: 'error'
          }
        ]}
      />
    )
    const textInput = within(subject.getDOMNode())
    const input = await textInput.find('input')

    const id = input.getAttribute('aria-describedby')
    const messages = await textInput.find(`[id="${id}"]`)

    expect(messages).to.exist()
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should handle multiple aria-describedby ids', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    const subject = await mount(
      <TextInput
        renderLabel="Name"
        aria-describedby="assistive-id"
        messages={[
          {
            text: 'yup',
            type: 'error'
          }
        ]}
      />
    )
    const textInput = within(subject.getDOMNode())
    const input = await textInput.find('input')
    const ids = input.getAttribute('aria-describedby')

    expect(ids).to.startWith('assistive-id TextInput-messages')
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('events', async () => {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('responds to onChange event', async () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
      const onChange = stub()
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      const subject = await mount(
        <TextInput renderLabel="Name" onChange={onChange} />
      )
      const textInput = within(subject.getDOMNode())
      const input = await textInput.find('input')

      await input.change({ target: { value: 'foo' } })
      expect(onChange).to.have.been.called()
    })

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('responds to onBlur event', async () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
      const onBlur = stub()
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      const subject = await mount(
        <TextInput renderLabel="Name" onBlur={onBlur} />
      )
      const textInput = within(subject.getDOMNode())
      const input = await textInput.find('input')

      await input.blur()
      expect(onBlur).to.have.been.called()
    })

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('responds to onFocus event', async () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
      const onFocus = stub()
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      const subject = await mount(
        <TextInput renderLabel="Name" onFocus={onFocus} />
      )
      const textInput = within(subject.getDOMNode())
      const input = await textInput.find('input')

      await input.focus()
      expect(onFocus).to.have.been.called()
    })
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('interaction', async () => {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should set the disabled attribute when `interaction` is disabled', async () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      const subject = await mount(
        <TextInput renderLabel="Name" interaction="disabled" />
      )
      const textInput = within(subject.getDOMNode())
      expect(await textInput.find('input[disabled]')).to.exist()
    })

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should set the disabled attribute when `disabled` is set', async () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      const subject = await mount(<TextInput renderLabel="Name" disabled />)
      const textInput = within(subject.getDOMNode())
      expect(await textInput.find('input[disabled]')).to.exist()
    })

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should set the readonly attribute when `interaction` is readonly', async () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      const subject = await mount(
        <TextInput renderLabel="Name" interaction="readonly" />
      )
      const textInput = within(subject.getDOMNode())
      expect(await textInput.find('input[readonly]')).to.exist()
    })

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should set the readonly attribute when `readOnly` is set', async () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      const subject = await mount(<TextInput renderLabel="Name" readOnly />)
      const textInput = within(subject.getDOMNode())
      expect(await textInput.find('input[readonly]')).to.exist()
    })
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('for a11y', async () => {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should meet standards', async () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      const subject = await mount(<TextInput renderLabel="Name" />)
      const textInput = within(subject.getDOMNode())
      expect(await textInput.accessible()).to.be.true()
    })

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should set aria-invalid when errors prop is set', async () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
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
