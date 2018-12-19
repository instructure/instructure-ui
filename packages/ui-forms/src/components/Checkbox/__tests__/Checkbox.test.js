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
import Checkbox from '../index'

describe('<Checkbox />', async () => {
  it('renders an input with type "checkbox"', async () => {
    const subject = await mount(
      <Checkbox
        label="fake label"
        defaultChecked
        value="someValue"
        name="someName"
      />
    )

    const checkbox = within(subject.getDOMNode())
    const input = await checkbox.find('input')
    expect(input.getDOMNode().type).to.equal('checkbox')
  })

  it('`simple` variant only displays a checkmark when checked', async () => {
    const subject = await mount(
      <Checkbox
        label="fake label"
        variant="simple"
        defaultChecked={false}
        value="someValue"
        name="someName"
      />
    )

    const checkbox = within(subject.getDOMNode())
    expect(await checkbox.find('svg', { expectEmpty: true })).to.not.exist()
  })

  it('`simple` variant supports indeterminate/mixed state', async () => {
    const subject = await mount(
      <Checkbox
        label="fake label"
        variant="simple"
        defaultChecked
        indeterminate
        value="someValue"
        name="someName"
      />
    )

    const checkbox = within(subject.getDOMNode())
    const input = await checkbox.find('input')
    expect(input.getAttribute('aria-checked')).to.equal('mixed')
  })

  describe('events', async () => {
    it('when clicked, fires onClick and onChange events', async () => {
      const onClick = stub()
      const onChange = stub()

      const subject = await mount(
        <Checkbox
          label="fake label"
          defaultChecked
          value="someValue"
          name="someName"
          onClick={onClick}
          onChange={onChange}
        />
      )

      const checkbox = within(subject.getDOMNode())
      const input = await checkbox.find('input')
      await input.click()

      expect(onClick).to.have.been.called()
      expect(onChange).to.have.been.called()
    })

    it('when clicked, does not call onClick or onChange when disabled', async () => {
      const onClick = stub()
      const onChange = stub()

      const subject = await mount(
        <Checkbox
          label="fake label"
          defaultChecked
          value="someValue"
          name="someName"
          onClick={onClick}
          onChange={onChange}
          disabled
        />
      )

      const checkbox = within(subject.getDOMNode())
      const input = await checkbox.find('input')
      await input.click(null, { clickable: false })

      expect(onClick).to.not.have.been.called()
      expect(onChange).to.not.have.been.called()
    })

    it('when clicked, does not call onClick or onChange when readOnly', async () => {
      const onClick = stub()
      const onChange = stub()

      const subject = await mount(
        <Checkbox
          label="fake label"
          defaultChecked
          value="someValue"
          name="someName"
          onClick={onClick}
          onChange={onChange}
          readOnly
        />
      )

      const checkbox = within(subject.getDOMNode())
      const input = await checkbox.find('input')
      await input.click()

      expect(onClick).to.not.have.been.called()
      expect(onChange).to.not.have.been.called()
    })

    it('calls onChange when enter key is pressed', async () => {
      const onChange = stub()

      const subject = await mount(
        <Checkbox
          label="fake label"
          defaultChecked
          value="someValue"
          name="someName"
          variant="toggle"
          onChange={onChange}
        />
      )

      const checkbox = within(subject.getDOMNode())
      const input = await checkbox.find('input')
      await input.keyDown('enter')

      expect(onChange).to.have.been.called()
    })

    it('responds to onBlur event', async () => {
      const onBlur = stub()

      const subject = await mount(
        <Checkbox
          label="fake label"
          defaultChecked
          value="someValue"
          name="someName"
          onBlur={onBlur}
        />
      )

      const checkbox = within(subject.getDOMNode())
      const input = await checkbox.find('input')
      await input.blur()

      expect(onBlur).to.have.been.called()
    })

    it('responds to onFocus event', async () => {
      const onFocus = stub()

      const subject = await mount(
        <Checkbox
          label="fake label"
          defaultChecked
          value="someValue"
          name="someName"
          onFocus={onFocus}
        />
      )

      const checkbox = within(subject.getDOMNode())
      const input = await checkbox.find('input')
      await input.focus()

      expect(onFocus).to.have.been.called()
    })

    it('focuses with the focus helper', async () => {
      let checkboxRef = null

      const subject = await mount(
        <Checkbox
          label="fake label"
          defaultChecked
          value="someValue"
          name="someName"
          componentRef={(el) => { checkboxRef = el }}
        />
      )

      expect(checkboxRef.focused).to.be.false()

      checkboxRef.focus()

      expect(checkboxRef.focused).to.be.true()

      const checkbox = within(subject.getDOMNode())
      const input = await checkbox.find('input')
      expect(input.focused()).to.be.true()
    })

    it('calls onMouseOver', async () => {
      const onMouseOver = stub()

      /* eslint-disable jsx-a11y/mouse-events-have-key-events */
      const subject = await mount(
        <Checkbox
          label="fake label"
          defaultChecked
          value="someValue"
          name="someName"
          onMouseOver={onMouseOver}
        />
      )
      /* eslint-enable jsx-a11y/mouse-events-have-key-events */

      const checkbox = within(subject.getDOMNode())

      await checkbox.mouseOver()

      expect(onMouseOver).to.have.been.called()
    })

    it('calls onMouseOut', async () => {
      const onMouseOut = stub()

      /* eslint-disable jsx-a11y/mouse-events-have-key-events */
      const subject = await mount(
        <Checkbox
          label="fake label"
          defaultChecked
          value="someValue"
          name="someName"
          onMouseOut={onMouseOut}
        />
      )
      /* eslint-enable jsx-a11y/mouse-events-have-key-events */

      const checkbox = within(subject.getDOMNode())

      await checkbox.mouseOut()

      expect(onMouseOut).to.have.been.called()
    })
  })

  describe('for a11y', () => {
    it('`simple` variant should meet standards', async () => {
      const subject = await mount(
        <Checkbox
          label="fake label"
          defaultChecked
          value="someValue"
          name="someName"
          variant="simple"
        />
      )
      const checkbox = within(subject.getDOMNode())
      expect(await checkbox.accessible()).to.be.true()
    })

    it('`toggle` variant should meet standards', async () => {
      const subject = await mount(
        <Checkbox
          label="fake label"
          defaultChecked
          value="someValue"
          name="someName"
          variant="toggle"
        />
      )
      const checkbox = within(subject.getDOMNode())
      expect(await checkbox.accessible()).to.be.true()
    })

    it('should require a label', async () => {
      const consoleError = stub(console, 'error')

      await mount(
        <Checkbox
          defaultChecked
          value="someValue"
          name="someName"
        />
      )

      expect(consoleError).to.have.been.calledWithMatch(
        'prop `label` is marked as required in `Checkbox`'
      )
    })
  })
})
