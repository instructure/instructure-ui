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
import { expect, mount, stub, wait } from '@instructure/ui-test-utils'

import { RadioInput } from '../index'
import { RadioInputLocator } from '../RadioInputLocator'

describe('<RadioInput />', async () => {
  it('renders an input with type "radio"', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <RadioInput label="fake label" value="someValue" name="someName" />
    )

    const radioInput = await RadioInputLocator.find()
    const input = await radioInput.find('input[type="radio"]')

    expect(input).to.exist()
  })

  describe('events', async () => {
    it('responds to onClick event', async () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
      const onClick = stub()
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      await mount(
        <RadioInput
          label="fake label"
          value="someValue"
          name="someName"
          onClick={onClick}
        />
      )

      const radioInput = await RadioInputLocator.find()
      const input = await radioInput.find('input[type="radio"]')

      await input.click()

      await wait(() => {
        expect(onClick).to.have.been.called()
      })
    })

    it('does not respond to onClick event when disabled', async () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
      const onClick = stub()
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      await mount(
        <RadioInput
          disabled
          label="fake label"
          value="someValue"
          name="someName"
          onClick={onClick}
        />
      )

      const radioInput = await RadioInputLocator.find()
      const input = await radioInput.find('input[type="radio"]')

      await input.click()

      await wait(() => {
        expect(onClick).to.not.have.been.called()
      })
    })

    it('does not respond to onClick event when readOnly', async () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
      const onClick = stub()
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      await mount(
        <RadioInput
          readOnly
          label="fake label"
          value="someValue"
          name="someName"
          onClick={onClick}
        />
      )

      const radioInput = await RadioInputLocator.find()
      const input = await radioInput.find('input[type="radio"]')

      await input.click()

      await wait(() => {
        expect(onClick).to.not.have.been.called()
      })
    })

    it('responds to onChange event', async () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
      const onChange = stub()
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      await mount(
        <RadioInput
          label="fake label"
          value="someValue"
          name="someName"
          onChange={onChange}
        />
      )

      const radioInput = await RadioInputLocator.find()
      const input = await radioInput.find('input[type="radio"]')

      await input.click()

      await wait(() => {
        expect(onChange).to.have.been.called()
      })
    })

    it('does not respond to onChange event when disabled', async () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
      const onChange = stub()
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      await mount(
        <RadioInput
          disabled
          label="fake label"
          value="someValue"
          name="someName"
          onChange={onChange}
        />
      )

      const radioInput = await RadioInputLocator.find()
      const input = await radioInput.find('input[type="radio"]')

      await input.click()

      await wait(() => {
        expect(onChange).to.not.have.been.called()
      })
    })

    it('does not respond to onChange event when readOnly', async () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
      const onChange = stub()
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      await mount(
        <RadioInput
          readOnly
          label="fake label"
          value="someValue"
          name="someName"
          onChange={onChange}
        />
      )

      const radioInput = await RadioInputLocator.find()
      const input = await radioInput.find('input[type="radio"]')

      await input.click()

      await wait(() => {
        expect(onChange).to.not.have.been.called()
      })
    })

    it('responds to onBlur event', async () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
      const onBlur = stub()
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      await mount(
        <RadioInput
          label="fake label"
          value="someValue"
          name="someName"
          // @ts-expect-error ts-migrate(2322) FIXME: Type '{ label: string; value: string; name: string... Remove this comment to see the full error message
          onBlur={onBlur}
        />
      )

      const radioInput = await RadioInputLocator.find()
      const input = await radioInput.find('input[type="radio"]')

      await input.blur()

      await wait(() => {
        expect(onBlur).to.have.been.called()
      })
    })

    it('responds to onFocus event', async () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
      const onFocus = stub()
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      await mount(
        <RadioInput
          label="fake label"
          value="someValue"
          name="someName"
          // @ts-expect-error ts-migrate(2322) FIXME: Type '{ label: string; value: string; name: string... Remove this comment to see the full error message
          onFocus={onFocus}
        />
      )

      const radioInput = await RadioInputLocator.find()
      const input = await radioInput.find('input[type="radio"]')

      await input.focus()

      await wait(() => {
        expect(onFocus).to.have.been.called()
      })
    })

    it('sets input to checked when selected', async () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      await mount(
        <RadioInput
          checked
          label="fake label"
          value="someValue"
          name="someName"
        />
      )

      const radioInput = await RadioInputLocator.find()
      const input = await radioInput.find('input[type="radio"]')

      await wait(() => {
        expect(input).to.be.checked()
      })
    })

    it('focuses with the focus helper', async () => {
      let ref
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      await mount(
        <RadioInput
          label="fake label"
          value="someValue"
          name="someName"
          // @ts-expect-error ts-migrate(2322) FIXME: Type '{ label: string; value: string; name: string... Remove this comment to see the full error message
          componentRef={(el) => (ref = el)}
        />
      )

      const radioInput = await RadioInputLocator.find()

      // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
      ref.focus()

      await wait(() => {
        expect(radioInput).to.contain.focus()
      })
    })
  })

  describe('for a11y', async () => {
    it('simple variant should meet standards', async () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      await mount(
        <RadioInput
          variant="simple"
          label="fake label"
          value="someValue"
          name="someName"
        />
      )

      const radioInput = await RadioInputLocator.find()

      expect(await radioInput.accessible())
    })

    it('should require a label', async () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
      const consoleError = stub(console, 'error')
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      await mount(
        <RadioInput
          variant="simple"
          label={null}
          value="someValue"
          name="someName"
        />
      )

      await wait(() => {
        expect(consoleError).to.have.been.calledWithMatch(
          'prop `label` is marked as required'
        )
      })
    })
  })
})
