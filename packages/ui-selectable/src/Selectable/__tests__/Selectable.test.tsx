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
import {
  expect,
  mount,
  spy,
  stub,
  find,
  findAll,
  within,
  findWithLabel,
  findWithText
} from '@instructure/ui-test-utils'

import { Selectable } from '../index'

/* eslint-disable jsx-a11y/label-has-associated-control */
describe('<Selectable />', async () => {
  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'spy' implicitly has an 'any' type.
  const lastCall = (spy) => spy.lastCall.args
  const defaultOptions = ['foo', 'bar', 'baz']
  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'selectable' implicitly has an 'any' typ... Remove this comment to see the full error message
  const getSelectable = (selectable) => (
    <span {...selectable.getRootProps()}>
      <label {...selectable.getLabelProps()}>Selectable</label>
      <input
        type="text"
        {...selectable.getTriggerProps()}
        {...selectable.getInputProps()}
      />
      <ul {...selectable.getListProps()}>
        {defaultOptions.map((opt) => (
          <li key={opt} {...selectable.getOptionProps({ id: opt })}>
            {opt}
          </li>
        ))}
      </ul>
    </span>
  )

  it('should focus trigger when root is clicked', async () => {
    const subject = await mount(
      <Selectable>
        {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'selectable' implicitly has an 'any' typ... Remove this comment to see the full error message */}
        {(selectable) => (
          <span {...selectable.getRootProps()}>
            <label {...selectable.getLabelProps()}>Selectable</label>
            <input
              type="text"
              {...selectable.getTriggerProps()}
              {...selectable.getInputProps()}
            />
            <ul {...selectable.getListProps()}>
              {defaultOptions.map((opt) => (
                <li key={opt} {...selectable.getOptionProps({ id: opt })}>
                  {opt}
                </li>
              ))}
            </ul>
          </span>
        )}
      </Selectable>
    )
    const root = within(subject.getDOMNode())
    const input = await find('input')

    expect(input.focused()).to.be.false()

    await root.click()
    expect(input.focused()).to.be.true()
  })

  it('should not blur trigger when root is clicked', async () => {
    const onFocus = stub()

    const onBlur = stub()

    const subject = await mount(
      <Selectable>
        {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'selectable' implicitly has an 'any' typ... Remove this comment to see the full error message */}
        {(selectable) => (
          <span {...selectable.getRootProps()}>
            <label {...selectable.getLabelProps()}>Selectable</label>
            <input
              type="text"
              {...selectable.getTriggerProps()}
              {...selectable.getInputProps()}
              onBlur={onBlur}
              onFocus={onFocus}
            />
            <ul {...selectable.getListProps()}>
              {defaultOptions.map((opt) => (
                <li key={opt} {...selectable.getOptionProps({ id: opt })}>
                  {opt}
                </li>
              ))}
            </ul>
          </span>
        )}
      </Selectable>
    )
    const root = within(subject.getDOMNode())
    const input = await find('input')

    expect(input.focused()).to.be.false()

    await root.click()
    await root.mouseDown()
    await root.click()

    expect(onFocus).to.have.been.calledOnce()
    expect(onBlur).to.not.have.been.called()
  })

  it('should not hide options when list is clicked', async () => {
    const onClick = stub()

    const onMouseDown = stub()

    const onRequestHideOptions = stub()
    await mount(
      <Selectable
        isShowingOptions={true}
        onRequestHideOptions={onRequestHideOptions}
      >
        {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'selectable' implicitly has an 'any' typ... Remove this comment to see the full error message */}
        {(selectable) => (
          <span {...selectable.getRootProps()}>
            <label {...selectable.getLabelProps()}>Selectable</label>
            <input
              type="text"
              {...selectable.getTriggerProps()}
              {...selectable.getInputProps()}
            />
            <ul {...selectable.getListProps({ onClick, onMouseDown })}>
              {defaultOptions.map((opt) => (
                <li key={opt} {...selectable.getOptionProps({ id: opt })}>
                  {opt}
                </li>
              ))}
            </ul>
          </span>
        )}
      </Selectable>
    )
    const input = await find('input')
    const list = await find('ul')

    await input.focus()
    await list.click()
    await list.mouseDown()

    expect(input.focused()).to.be.true()
    expect(onClick).to.have.been.calledOnce()
    expect(onMouseDown).to.have.been.calledOnce()
    expect(onRequestHideOptions).to.not.have.been.called()
  })

  it('should not hide options when an option is clicked', async () => {
    const onClick = stub()

    const onMouseDown = stub()

    const onRequestHideOptions = stub()
    await mount(
      <Selectable
        isShowingOptions={true}
        onRequestHideOptions={onRequestHideOptions}
      >
        {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'selectable' implicitly has an 'any' typ... Remove this comment to see the full error message */}
        {(selectable) => (
          <span {...selectable.getRootProps()}>
            <label {...selectable.getLabelProps()}>Selectable</label>
            <input
              type="text"
              {...selectable.getTriggerProps()}
              {...selectable.getInputProps()}
            />
            <ul {...selectable.getListProps()}>
              {defaultOptions.map((opt) => (
                <li
                  key={opt}
                  {...selectable.getOptionProps({
                    id: opt,
                    onClick,
                    onMouseDown
                  })}
                >
                  {opt}
                </li>
              ))}
            </ul>
          </span>
        )}
      </Selectable>
    )
    const input = await find('input')
    const option = await find('li')

    await input.focus()
    await option.click()
    await option.mouseDown()

    expect(input.focused()).to.be.true()
    expect(onClick).to.have.been.calledOnce()
    expect(onMouseDown).to.have.been.calledOnce()
    expect(onRequestHideOptions).to.not.have.been.called()
  })

  it('should not prevent events on other children', async () => {
    const onMouseDown = stub()

    const onClick = stub()

    const onKeyDown = stub()
    await mount(
      <Selectable>
        {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'selectable' implicitly has an 'any' typ... Remove this comment to see the full error message */}
        {(selectable) => (
          <span {...selectable.getRootProps()}>
            <label {...selectable.getLabelProps()}>Selectable</label>
            <button
              onMouseDown={onMouseDown}
              onClick={onClick}
              onKeyDown={onKeyDown}
            >
              Selected
            </button>
            <input
              type="text"
              {...selectable.getTriggerProps()}
              {...selectable.getInputProps()}
            />
            <ul {...selectable.getListProps()}>
              {defaultOptions.map((opt) => (
                <li key={opt} {...selectable.getOptionProps({ id: opt })}>
                  {opt}
                </li>
              ))}
            </ul>
          </span>
        )}
      </Selectable>
    )
    const button = await findWithLabel('Selected')

    await button.mouseDown()
    await button.click()
    await button.keyDown('enter')

    expect(onMouseDown).to.have.been.called()
    expect(onClick).to.have.been.called()
    expect(onKeyDown).to.have.been.called()
  })

  describe('with callbacks', async () => {
    describe('should fire onRequestShowOptions', async () => {
      it('when root is clicked', async () => {
        const onRequestShowOptions = stub()

        const subject = await mount(
          <Selectable
            isShowingOptions={false}
            onRequestShowOptions={onRequestShowOptions}
          >
            {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'selectable' implicitly has an 'any' typ... Remove this comment to see the full error message */}
            {(selectable) => getSelectable(selectable)}
          </Selectable>
        )
        const root = within(subject.getDOMNode())

        await root.click()
        expect(onRequestShowOptions).to.have.been.calledOnce()

        await subject.setProps({ isShowingOptions: true })

        await root.click()
        expect(onRequestShowOptions).to.have.been.calledOnce()
      })

      it('when input is clicked', async () => {
        const onRequestShowOptions = stub()

        const subject = await mount(
          <Selectable
            isShowingOptions={false}
            onRequestShowOptions={onRequestShowOptions}
          >
            {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'selectable' implicitly has an 'any' typ... Remove this comment to see the full error message */}
            {(selectable) => getSelectable(selectable)}
          </Selectable>
        )
        const input = await find('input')

        await input.click()
        expect(onRequestShowOptions).to.have.been.calledOnce()

        await subject.setProps({ isShowingOptions: true })

        await input.click()
        expect(onRequestShowOptions).to.have.been.calledOnce()
      })

      it('when up/down arrows are pressed', async () => {
        const onRequestShowOptions = stub()

        await mount(
          <Selectable
            isShowingOptions={false}
            onRequestShowOptions={onRequestShowOptions}
          >
            {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'selectable' implicitly has an 'any' typ... Remove this comment to see the full error message */}
            {(selectable) => getSelectable(selectable)}
          </Selectable>
        )
        const input = await find('input')

        await input.keyDown('down')
        expect(onRequestShowOptions).to.have.been.calledOnce()

        await input.keyDown('up')
        expect(onRequestShowOptions).to.have.been.calledTwice()
      })

      it('when space is pressed', async () => {
        const onRequestShowOptions = stub()

        const subject = await mount(
          <Selectable onRequestShowOptions={onRequestShowOptions}>
            {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'selectable' implicitly has an 'any' typ... Remove this comment to see the full error message */}
            {(selectable) => getSelectable(selectable)}
          </Selectable>
        )
        const input = await find('input')

        await input.keyDown('space')
        await subject.setProps({ isShowingOptions: true })
        await input.keyDown('space')

        expect(onRequestShowOptions).to.have.been.calledOnce()
      })
    })

    describe('should fire onRequestHideOptions', async () => {
      it('when root is clicked', async () => {
        const onRequestHideOptions = stub()

        const subject = await mount(
          <Selectable
            isShowingOptions={true}
            onRequestHideOptions={onRequestHideOptions}
          >
            {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'selectable' implicitly has an 'any' typ... Remove this comment to see the full error message */}
            {(selectable) => getSelectable(selectable)}
          </Selectable>
        )
        const root = within(subject.getDOMNode())

        await root.click()
        expect(onRequestHideOptions).to.have.been.calledOnce()

        await subject.setProps({ isShowingOptions: false })

        await root.click()
        expect(onRequestHideOptions).to.have.been.calledOnce()
      })

      it('when input is clicked', async () => {
        const onRequestHideOptions = stub()

        const subject = await mount(
          <Selectable
            isShowingOptions={true}
            onRequestHideOptions={onRequestHideOptions}
          >
            {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'selectable' implicitly has an 'any' typ... Remove this comment to see the full error message */}
            {(selectable) => getSelectable(selectable)}
          </Selectable>
        )
        const input = await find('input')

        await input.click()
        expect(onRequestHideOptions).to.have.been.calledOnce()

        await subject.setProps({ isShowingOptions: false })

        await input.click()
        expect(onRequestHideOptions).to.have.been.calledOnce()
      })

      it('when escape is pressed', async () => {
        const onRequestHideOptions = stub()
        let defaultPrevented = false

        await mount(
          /* eslint-disable-next-line jsx-a11y/no-static-element-interactions */
          <div
            onKeyUp={(e) => {
              defaultPrevented = e.defaultPrevented
            }}
          >
            <Selectable
              isShowingOptions={true}
              onRequestHideOptions={onRequestHideOptions}
            >
              {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'selectable' implicitly has an 'any' typ... Remove this comment to see the full error message */}
              {(selectable) => getSelectable(selectable)}
            </Selectable>
          </div>
        )
        const input = await find('input')
        await input.keyUp('esc')

        expect(onRequestHideOptions).to.have.been.calledOnce()
        expect(defaultPrevented).to.be.true()
      })
    })

    describe('should fire onRequestHighlightOption', async () => {
      it('when options are hovered', async () => {
        const onRequestHighlightOption = stub()

        await mount(
          <Selectable onRequestHighlightOption={onRequestHighlightOption}>
            {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'selectable' implicitly has an 'any' typ... Remove this comment to see the full error message */}
            {(selectable) => getSelectable(selectable)}
          </Selectable>
        )
        const options = await findAll('li')

        await options[0].mouseOver()
        expect(lastCall(onRequestHighlightOption)[1].direction).to.not.exist()
        expect(lastCall(onRequestHighlightOption)[1].id).to.equal(
          defaultOptions[0]
        )

        await options[1].mouseOver()
        expect(lastCall(onRequestHighlightOption)[1].direction).to.not.exist()
        expect(lastCall(onRequestHighlightOption)[1].id).to.equal(
          defaultOptions[1]
        )
      })

      it('when up/down arrows are pressed', async () => {
        const onRequestShowOptions = stub()

        const onRequestHighlightOption = stub()

        const subject = await mount(
          <Selectable
            isShowingOptions={false}
            onRequestShowOptions={onRequestShowOptions}
            onRequestHighlightOption={onRequestHighlightOption}
          >
            {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'selectable' implicitly has an 'any' typ... Remove this comment to see the full error message */}
            {(selectable) => getSelectable(selectable)}
          </Selectable>
        )
        const input = await find('input')

        await input.keyDown('down')
        expect(onRequestShowOptions).to.have.been.calledOnce()
        expect(onRequestHighlightOption).to.not.have.been.called()

        await subject.setProps({
          isShowingOptions: true,
          highlightedOptionId: defaultOptions[0]
        })

        await input.keyDown('down')
        expect(lastCall(onRequestHighlightOption)[1].id).to.not.exist()
        expect(lastCall(onRequestHighlightOption)[1].direction).to.equal(1)

        await subject.setProps({
          highlightedOptionId: defaultOptions[1]
        })

        await input.keyDown('up')
        expect(lastCall(onRequestHighlightOption)[1].id).to.not.exist()
        expect(lastCall(onRequestHighlightOption)[1].direction).to.equal(-1)
      })

      it('when home/end is pressed', async () => {
        const onRequestHighlightOption = stub()

        const onRequestHighlightFirstOption = stub()

        const onRequestHighlightLastOption = stub()

        await mount(
          <Selectable
            isShowingOptions={true}
            highlightedOptionId={defaultOptions[1]}
            onRequestHighlightOption={onRequestHighlightOption}
            onRequestHighlightFirstOption={onRequestHighlightFirstOption}
            onRequestHighlightLastOption={onRequestHighlightLastOption}
          >
            {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'selectable' implicitly has an 'any' typ... Remove this comment to see the full error message */}
            {(selectable) => getSelectable(selectable)}
          </Selectable>
        )
        const input = await find('input')

        await input.keyDown('home')
        await input.keyDown('end')

        expect(onRequestHighlightFirstOption).to.have.been.calledOnce()
        expect(onRequestHighlightLastOption).to.have.been.calledOnce()
        expect(onRequestHighlightOption).to.not.have.been.called()
      })
    })

    describe('should fire onRequestSelectOption', async () => {
      it('when enter is pressed', async () => {
        const onRequestSelectOption = stub()

        await mount(
          <Selectable
            isShowingOptions={true}
            highlightedOptionId={defaultOptions[1]}
            onRequestSelectOption={onRequestSelectOption}
          >
            {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'selectable' implicitly has an 'any' typ... Remove this comment to see the full error message */}
            {(selectable) => getSelectable(selectable)}
          </Selectable>
        )
        const input = await find('input')

        await input.keyDown('enter')
        expect(lastCall(onRequestSelectOption)[1].id).to.equal(
          defaultOptions[1]
        )
      })

      it('when options are clicked', async () => {
        const onRequestSelectOption = stub()

        await mount(
          <Selectable
            isShowingOptions={true}
            onRequestSelectOption={onRequestSelectOption}
          >
            {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'selectable' implicitly has an 'any' typ... Remove this comment to see the full error message */}
            {(selectable) => getSelectable(selectable)}
          </Selectable>
        )
        const options = await findAll('li')

        await options[1].click()
        expect(lastCall(onRequestSelectOption)[1].id).to.equal(
          defaultOptions[1]
        )
      })
    })
  })

  describe('getRootProps()', async () => {
    it('should provide prop getter for root element', async () => {
      const renderSpy = spy()

      await mount(
        <Selectable>
          {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'selectable' implicitly has an 'any' typ... Remove this comment to see the full error message */}
          {(selectable) => {
            renderSpy(selectable)
            return null
          }}
        </Selectable>
      )
      expect(lastCall(renderSpy)[0].getRootProps).to.exist()
    })

    it('should allow custom props to pass through', async () => {
      const subject = await mount(
        <Selectable>
          {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'selectable' implicitly has an 'any' typ... Remove this comment to see the full error message */}
          {(selectable) => (
            <span
              {...selectable.getRootProps({
                'data-custom-attr': true,
                className: 'customClass',
                style: { color: 'red' }
              })}
            >
              <label {...selectable.getLabelProps()}>Selectable</label>
              <input
                type="text"
                {...selectable.getTriggerProps()}
                {...selectable.getInputProps()}
              />
            </span>
          )}
        </Selectable>
      )
      const root = within(subject.getDOMNode())

      expect(root.getAttribute('data-custom-attr')).to.equal('true')
      expect(root.hasClass('customClass')).to.be.true()
      expect(root.getComputedStyle().color).to.equal('rgb(255, 0, 0)')
    })

    it('should allow supplemental onClick behavior', async () => {
      const onClick = stub()

      const onRequestShowOptions = stub()

      await mount(
        <Selectable onRequestShowOptions={onRequestShowOptions}>
          {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'selectable' implicitly has an 'any' typ... Remove this comment to see the full error message */}
          {(selectable) => (
            <span {...selectable.getRootProps({ onClick })}>
              <input
                type="text"
                {...selectable.getTriggerProps()}
                {...selectable.getInputProps()}
              />
            </span>
          )}
        </Selectable>
      )
      const input = await find('input')

      await input.click()
      expect(onClick).to.have.been.calledOnce()
      expect(onRequestShowOptions).to.have.been.calledOnce()
    })

    it('should allow supplemental onKeyDown behavior', async () => {
      const onKeyDown = stub()

      const onRequestHighlightOption = stub()

      await mount(
        <Selectable
          isShowingOptions={true}
          highlightedOptionId={defaultOptions[1]}
          onRequestHighlightOption={onRequestHighlightOption}
        >
          {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'selectable' implicitly has an 'any' typ... Remove this comment to see the full error message */}
          {(selectable) => (
            <span {...selectable.getRootProps({ onKeyDown })}>
              <input
                type="text"
                {...selectable.getTriggerProps()}
                {...selectable.getInputProps()}
              />
            </span>
          )}
        </Selectable>
      )
      const input = await find('input')

      await input.keyDown('down')
      await input.keyDown('up')

      expect(onRequestHighlightOption).to.have.been.calledTwice()
      expect(onKeyDown).to.have.been.calledTwice()
    })
  })

  describe('getLabelProps()', async () => {
    it('should provide prop getter for label element', async () => {
      const renderSpy = spy()

      await mount(
        <Selectable>
          {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'selectable' implicitly has an 'any' typ... Remove this comment to see the full error message */}
          {(selectable) => {
            renderSpy(selectable)
            return null
          }}
        </Selectable>
      )
      expect(lastCall(renderSpy)[0].getLabelProps).to.exist()
    })

    it('should set htmlFor prop', async () => {
      await mount(
        <Selectable>
          {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'selectable' implicitly has an 'any' typ... Remove this comment to see the full error message */}
          {(selectable) => (
            <span>
              <label {...selectable.getLabelProps()}>Selectable</label>
              <input
                type="text"
                {...selectable.getTriggerProps()}
                {...selectable.getInputProps()}
              />
            </span>
          )}
        </Selectable>
      )
      const label = await find('label')
      const input = await find('input')

      expect(label.getAttribute('for')).to.equal(input.getAttribute('id'))
    })

    it('should set htmlFor prop with custom defined id', async () => {
      const id = 'CustomSelect'

      await mount(
        <Selectable id={id}>
          {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'selectable' implicitly has an 'any' typ... Remove this comment to see the full error message */}
          {(selectable) => (
            <span>
              <label {...selectable.getLabelProps()}>Selectable</label>
              <input
                type="text"
                {...selectable.getTriggerProps()}
                {...selectable.getInputProps()}
              />
            </span>
          )}
        </Selectable>
      )
      const label = await find('label')
      const input = await find('input')

      expect(input.getAttribute('id')).to.equal(id)
      expect(label.getAttribute('for')).to.equal(id)
    })

    it('should allow custom props to pass through', async () => {
      await mount(
        <Selectable>
          {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'selectable' implicitly has an 'any' typ... Remove this comment to see the full error message */}
          {(selectable) => (
            <span>
              <label
                {...selectable.getLabelProps({
                  'data-custom-attr': true,
                  className: 'customClass',
                  style: { color: 'red' }
                })}
              >
                Selectable
              </label>
              <input
                type="text"
                {...selectable.getTriggerProps()}
                {...selectable.getInputProps()}
              />
            </span>
          )}
        </Selectable>
      )
      const label = await find('label')

      expect(label.getAttribute('data-custom-attr')).to.equal('true')
      expect(label.hasClass('customClass')).to.be.true()
      expect(label.getComputedStyle().color).to.equal('rgb(255, 0, 0)')
    })
  })

  describe('getTriggerProps()', async () => {
    it('should provide prop getter for trigger element', async () => {
      const renderSpy = spy()

      await mount(
        <Selectable>
          {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'selectable' implicitly has an 'any' typ... Remove this comment to see the full error message */}
          {(selectable) => {
            renderSpy(selectable)
            return null
          }}
        </Selectable>
      )
      expect(lastCall(renderSpy)[0].getTriggerProps).to.exist()
    })

    it('should set appropriate prop defaults', async () => {
      await mount(
        <Selectable>
          {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'selectable' implicitly has an 'any' typ... Remove this comment to see the full error message */}
          {(selectable) => (
            <span>
              <input type="text" {...selectable.getTriggerProps()} />
              <span {...selectable.getDescriptionProps()}>description</span>
            </span>
          )}
        </Selectable>
      )
      const input = await find('input')
      const desc = await findWithText('description')

      expect(input.getAttribute('aria-haspopup')).to.equal('listbox')
      expect(input.getAttribute('aria-describedby')).to.equal(
        desc.getAttribute('id')
      )
      expect(input.getAttribute('id')).to.exist()
    })

    it('should set appropriate props based on isShowingOptions', async () => {
      const subject = await mount(
        <Selectable isShowingOptions={false}>
          {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'selectable' implicitly has an 'any' typ... Remove this comment to see the full error message */}
          {(selectable) => (
            <span>
              <input type="text" {...selectable.getTriggerProps()} />
              <ul {...selectable.getListProps()}></ul>
            </span>
          )}
        </Selectable>
      )
      const input = await find('input')
      const list = await find('ul')

      expect(input.getAttribute('aria-expanded')).to.equal('false')
      expect(input.getAttribute('aria-controls')).to.not.exist()
      expect(input.getAttribute('aria-owns')).to.not.exist()

      await subject.setProps({ isShowingOptions: true })
      expect(input.getAttribute('aria-expanded')).to.equal('true')
      expect(input.getAttribute('aria-controls')).to.equal(
        list.getAttribute('id')
      )
      expect(input.getAttribute('aria-owns')).to.equal(list.getAttribute('id'))
    })

    it('should set appropriate props based on highlightedOptionId', async () => {
      const subject = await mount(
        <Selectable isShowingOptions={true}>
          {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'selectable' implicitly has an 'any' typ... Remove this comment to see the full error message */}
          {(selectable) => (
            <span>
              <input type="text" {...selectable.getTriggerProps()} />
              <ul {...selectable.getListProps()}>
                {defaultOptions.map((opt) => (
                  <li key={opt} {...selectable.getOptionProps({ id: opt })} />
                ))}
              </ul>
            </span>
          )}
        </Selectable>
      )
      const input = await find('input')
      const options = await findAll('li')

      expect(input.getAttribute('aria-activedescendant')).to.not.exist()

      await subject.setProps({ highlightedOptionId: defaultOptions[0] })
      expect(input.getAttribute('aria-activedescendant')).to.equal(
        options[0].getAttribute('id')
      )

      await subject.setProps({ highlightedOptionId: defaultOptions[1] })
      expect(input.getAttribute('aria-activedescendant')).to.equal(
        options[1].getAttribute('id')
      )

      await subject.setProps({ isShowingOptions: false })
      expect(input.getAttribute('aria-activedescendant')).to.not.exist()
    })

    it('should allow custom props to pass through', async () => {
      await mount(
        <Selectable>
          {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'selectable' implicitly has an 'any' typ... Remove this comment to see the full error message */}
          {(selectable) => (
            <span>
              <input
                type="text"
                {...selectable.getTriggerProps({
                  'data-custom-attr': true,
                  className: 'customClass',
                  style: { color: 'red' }
                })}
              />
            </span>
          )}
        </Selectable>
      )
      const input = await find('input')
      expect(input.getAttribute('data-custom-attr')).to.equal('true')
      expect(input.hasClass('customClass')).to.be.true()
      expect(input.getComputedStyle().color).to.equal('rgb(255, 0, 0)')
    })

    it('should allow props to be overridden', async () => {
      await mount(
        <Selectable>
          {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'selectable' implicitly has an 'any' typ... Remove this comment to see the full error message */}
          {(selectable) => (
            <span>
              <input
                type="text"
                {...selectable.getTriggerProps({
                  'aria-haspopup': 'menu',
                  'aria-controls': 'customId'
                })}
              />
            </span>
          )}
        </Selectable>
      )
      const input = await find('input')
      expect(input.getAttribute('aria-haspopup')).to.equal('menu')
      expect(input.getAttribute('aria-controls')).to.equal('customId')
    })

    it('should provide a ref to the text input', async () => {
      const inputRef = stub()

      await mount(
        <Selectable>
          {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'selectable' implicitly has an 'any' typ... Remove this comment to see the full error message */}
          {(selectable) => (
            <span>
              <input
                type="text"
                {...selectable.getTriggerProps({
                  ref: inputRef
                })}
              />
            </span>
          )}
        </Selectable>
      )
      const input = await find('input')
      expect(inputRef).to.have.been.calledWith(input.getDOMNode())
    })

    it('should allow custom props to pass through', async () => {
      await mount(
        <Selectable>
          {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'selectable' implicitly has an 'any' typ... Remove this comment to see the full error message */}
          {(selectable) => (
            <span>
              <input
                type="text"
                {...selectable.getTriggerProps({
                  'data-custom-attr': true,
                  placeholder: 'Type to enter text',
                  className: 'customClass',
                  style: { color: 'red' }
                })}
              />
            </span>
          )}
        </Selectable>
      )
      const input = await find('input')
      expect(input.getAttribute('data-custom-attr')).to.equal('true')
      expect(input.getAttribute('placeholder')).to.exist()
      expect(input.hasClass('customClass')).to.be.true()
      expect(input.getComputedStyle().color).to.equal('rgb(255, 0, 0)')
    })

    it('should allow props to be overridden', async () => {
      await mount(
        <Selectable>
          {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'selectable' implicitly has an 'any' typ... Remove this comment to see the full error message */}
          {(selectable) => (
            <span>
              <input
                type="text"
                {...selectable.getTriggerProps({
                  role: 'textbox',
                  'aria-autocomplete': 'list'
                })}
              />
            </span>
          )}
        </Selectable>
      )
      const input = await find('input')
      expect(input.getAttribute('role')).to.equal('textbox')
      expect(input.getAttribute('aria-autocomplete')).to.equal('list')
    })

    it('should allow supplemental onClick behavior', async () => {
      const onClick = stub()

      const onRequestShowOptions = stub()

      await mount(
        <Selectable onRequestShowOptions={onRequestShowOptions}>
          {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'selectable' implicitly has an 'any' typ... Remove this comment to see the full error message */}
          {(selectable) => (
            <span {...selectable.getRootProps()}>
              <input
                type="text"
                {...selectable.getTriggerProps({ onClick })}
                {...selectable.getInputProps()}
              />
            </span>
          )}
        </Selectable>
      )
      const input = await find('input')

      await input.click()
      expect(onClick).to.have.been.calledOnce()
      expect(onRequestShowOptions).to.have.been.calledOnce()
    })

    it('should allow supplemental onKeyDown behavior', async () => {
      const onKeyDown = stub()

      const onRequestHighlightOption = stub()

      await mount(
        <Selectable
          isShowingOptions={true}
          highlightedOptionId={defaultOptions[1]}
          onRequestHighlightOption={onRequestHighlightOption}
        >
          {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'selectable' implicitly has an 'any' typ... Remove this comment to see the full error message */}
          {(selectable) => (
            <span {...selectable.getRootProps()}>
              <input
                type="text"
                {...selectable.getTriggerProps({ onKeyDown })}
                {...selectable.getInputProps()}
              />
            </span>
          )}
        </Selectable>
      )
      const input = await find('input')

      await input.keyDown('down')
      await input.keyDown('up')
      await input.keyDown('a')

      expect(onRequestHighlightOption).to.have.been.calledTwice()
      expect(onKeyDown).to.have.been.calledThrice()
    })
  })

  describe('getInputProps()', async () => {
    it('should provide prop getter for trigger element', async () => {
      const renderSpy = spy()

      await mount(
        <Selectable>
          {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'selectable' implicitly has an 'any' typ... Remove this comment to see the full error message */}
          {(selectable) => {
            renderSpy(selectable)
            return null
          }}
        </Selectable>
      )
      expect(lastCall(renderSpy)[0].getInputProps).to.exist()
    })

    it('should set appropriate prop defaults', async () => {
      await mount(
        <Selectable>
          {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'selectable' implicitly has an 'any' typ... Remove this comment to see the full error message */}
          {(selectable) => (
            <span>
              <input type="text" {...selectable.getInputProps()} />
            </span>
          )}
        </Selectable>
      )
      const input = await find('input')

      expect(input.getAttribute('role')).to.equal('combobox')
      expect(input.getAttribute('aria-autocomplete')).to.equal('both')
      expect(input.getAttribute('autocomplete')).to.equal('off')
    })

    it('should set appropriate props when readOnly', async () => {
      await mount(
        <Selectable>
          {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'selectable' implicitly has an 'any' typ... Remove this comment to see the full error message */}
          {(selectable) => (
            <span>
              <input
                type="text"
                {...selectable.getInputProps({ readOnly: true })}
              />
            </span>
          )}
        </Selectable>
      )
      const input = await find('input')

      expect(input.getAttribute('aria-autocomplete')).to.equal('none')
      expect(input.getAttribute('readOnly')).to.exist()
      expect(input.getAttribute('disabled')).to.not.exist()
    })

    it('should allow props to be overridden', async () => {
      await mount(
        <Selectable>
          {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'selectable' implicitly has an 'any' typ... Remove this comment to see the full error message */}
          {(selectable) => (
            <span>
              <input
                type="text"
                {...selectable.getInputProps({
                  role: 'textbox',
                  'aria-autocomplete': 'inline'
                })}
              />
            </span>
          )}
        </Selectable>
      )
      const input = await find('input')
      expect(input.getAttribute('role')).to.equal('textbox')
      expect(input.getAttribute('aria-autocomplete')).to.equal('inline')
    })

    it('should allow custom props to pass through', async () => {
      await mount(
        <Selectable>
          {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'selectable' implicitly has an 'any' typ... Remove this comment to see the full error message */}
          {(selectable) => (
            <span>
              <input
                type="text"
                {...selectable.getInputProps({
                  'data-custom-attr': true,
                  placeholder: 'Type to enter text',
                  className: 'customClass',
                  style: { color: 'red' }
                })}
              />
            </span>
          )}
        </Selectable>
      )
      const input = await find('input')
      expect(input.getAttribute('data-custom-attr')).to.equal('true')
      expect(input.getAttribute('placeholder')).to.exist()
      expect(input.hasClass('customClass')).to.be.true()
      expect(input.getComputedStyle().color).to.equal('rgb(255, 0, 0)')
    })
  })

  describe('getListProps()', async () => {
    it('should provide prop getter for list element', async () => {
      const renderSpy = spy()

      await mount(
        <Selectable>
          {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'selectable' implicitly has an 'any' typ... Remove this comment to see the full error message */}
          {(selectable) => {
            renderSpy(selectable)
            return null
          }}
        </Selectable>
      )
      expect(lastCall(renderSpy)[0].getListProps).to.exist()
    })

    it('should set appropriate prop defaults', async () => {
      await mount(
        <Selectable isShowingOptions={true}>
          {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'selectable' implicitly has an 'any' typ... Remove this comment to see the full error message */}
          {(selectable) => (
            <span {...selectable.getRootProps()}>
              <input type="text" {...selectable.getTriggerProps()} />
              <ul {...selectable.getListProps()}></ul>
            </span>
          )}
        </Selectable>
      )
      const list = await find('ul')

      expect(list.getAttribute('id')).to.exist()
      expect(list.getAttribute('role')).to.equal('listbox')
    })

    it('should allow custom props to pass through', async () => {
      await mount(
        <Selectable isShowingOptions={true}>
          {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'selectable' implicitly has an 'any' typ... Remove this comment to see the full error message */}
          {(selectable) => (
            <span {...selectable.getRootProps()}>
              <input type="text" {...selectable.getTriggerProps()} />
              <ul
                {...selectable.getListProps({
                  'data-custom-attr': true,
                  className: 'customClass',
                  style: { color: 'red' }
                })}
              ></ul>
            </span>
          )}
        </Selectable>
      )
      const list = await find('ul')

      expect(list.getAttribute('data-custom-attr')).to.equal('true')
      expect(list.hasClass('customClass')).to.be.true()
      expect(list.getComputedStyle().color).to.equal('rgb(255, 0, 0)')
    })
  })

  describe('getOptionProps()', async () => {
    it('should provide prop getter for option element', async () => {
      const renderSpy = spy()

      await mount(
        <Selectable>
          {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'selectable' implicitly has an 'any' typ... Remove this comment to see the full error message */}
          {(selectable) => {
            renderSpy(selectable)
            return null
          }}
        </Selectable>
      )
      expect(lastCall(renderSpy)[0].getOptionProps).to.exist()
    })

    it('should set appropriate prop defaults', async () => {
      await mount(
        <Selectable>
          {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'selectable' implicitly has an 'any' typ... Remove this comment to see the full error message */}
          {(selectable) => (
            <span>
              <input type="text" {...selectable.getTriggerProps()} />
              <ul {...selectable.getListProps()}>
                {defaultOptions.map((opt) => (
                  <li key={opt} {...selectable.getOptionProps({ id: opt })}>
                    {opt}
                  </li>
                ))}
              </ul>
            </span>
          )}
        </Selectable>
      )
      const option = await find('li')

      expect(option.getAttribute('role')).to.equal('option')
      expect(option.getAttribute('aria-selected')).to.equal('false')
    })

    it('should set aria-selected based on selectedOptionId', async () => {
      const subject = await mount(
        <Selectable selectedOptionId={defaultOptions[1]}>
          {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'selectable' implicitly has an 'any' typ... Remove this comment to see the full error message */}
          {(selectable) => (
            <span>
              <input type="text" {...selectable.getTriggerProps()} />
              <ul {...selectable.getListProps()}>
                {defaultOptions.map((opt) => (
                  <li key={opt} {...selectable.getOptionProps({ id: opt })}>
                    {opt}
                  </li>
                ))}
              </ul>
            </span>
          )}
        </Selectable>
      )
      const options = await findAll('li')

      expect(options[0].getAttribute('aria-selected')).to.equal('false')
      expect(options[1].getAttribute('aria-selected')).to.equal('true')
      expect(options[2].getAttribute('aria-selected')).to.equal('false')

      await subject.setProps({
        selectedOptionId: [defaultOptions[0], defaultOptions[1]]
      })

      expect(options[0].getAttribute('aria-selected')).to.equal('true')
      expect(options[1].getAttribute('aria-selected')).to.equal('true')
      expect(options[2].getAttribute('aria-selected')).to.equal('false')
    })

    it('should allow custom props to pass through', async () => {
      await mount(
        <Selectable>
          {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'selectable' implicitly has an 'any' typ... Remove this comment to see the full error message */}
          {(selectable) => (
            <span>
              <input type="text" {...selectable.getTriggerProps()} />
              <ul {...selectable.getListProps()}>
                {defaultOptions.map((opt) => (
                  <li
                    key={opt}
                    {...selectable.getOptionProps({
                      id: opt,
                      'data-custom-attr': true,
                      className: 'customClass',
                      style: { color: 'red' }
                    })}
                  >
                    {opt}
                  </li>
                ))}
              </ul>
            </span>
          )}
        </Selectable>
      )
      const option = await find('li')

      expect(option.getAttribute('data-custom-attr')).to.equal('true')
      expect(option.hasClass('customClass')).to.be.true()
      expect(option.getComputedStyle().color).to.equal('rgb(255, 0, 0)')
    })

    it('should allow supplemental onMouseOver behavior', async () => {
      const onMouseOver = stub()

      const onRequestHighlightOption = stub()

      await mount(
        <Selectable
          isShowingOptions={true}
          onRequestHighlightOption={onRequestHighlightOption}
        >
          {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'selectable' implicitly has an 'any' typ... Remove this comment to see the full error message */}
          {(selectable) => (
            <span>
              <input type="text" {...selectable.getInputProps()} />
              <ul {...selectable.getListProps()}>
                {defaultOptions.map((opt) => (
                  <li
                    key={opt}
                    {...selectable.getOptionProps({ id: opt, onMouseOver })}
                  >
                    {opt}
                  </li>
                ))}
              </ul>
            </span>
          )}
        </Selectable>
      )
      const options = await findAll('li')

      await options[0].mouseOver()
      await options[1].mouseOver()

      expect(onMouseOver).to.have.been.calledTwice()
      expect(onRequestHighlightOption).to.have.been.calledTwice()
    })

    it('should allow supplemental onClick behavior', async () => {
      const onClick = stub()

      const onRequestSelectOption = stub()

      await mount(
        <Selectable
          isShowingOptions={true}
          onRequestSelectOption={onRequestSelectOption}
        >
          {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'selectable' implicitly has an 'any' typ... Remove this comment to see the full error message */}
          {(selectable) => (
            <span>
              <input type="text" {...selectable.getInputProps()} />
              <ul {...selectable.getListProps()}>
                {defaultOptions.map((opt) => (
                  <li
                    key={opt}
                    {...selectable.getOptionProps({ id: opt, onClick })}
                  >
                    {opt}
                  </li>
                ))}
              </ul>
            </span>
          )}
        </Selectable>
      )
      const options = await findAll('li')

      await options[0].click()
      await options[1].click()

      expect(onClick).to.have.been.calledTwice()
      expect(onRequestSelectOption).to.have.been.calledTwice()
    })
  })

  describe('getDisabledOptionProps()', async () => {
    it('should provide prop getter for disabled option element', async () => {
      const renderSpy = spy()

      await mount(
        <Selectable>
          {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'selectable' implicitly has an 'any' typ... Remove this comment to see the full error message */}
          {(selectable) => {
            renderSpy(selectable)
            return null
          }}
        </Selectable>
      )
      expect(lastCall(renderSpy)[0].getDisabledOptionProps).to.exist()
    })

    it('should set aria-disabled prop', async () => {
      await mount(
        <Selectable>
          {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'selectable' implicitly has an 'any' typ... Remove this comment to see the full error message */}
          {(selectable) => (
            <span>
              <input
                type="text"
                {...selectable.getTriggerProps()}
                {...selectable.getInputProps()}
              />
              <ul {...selectable.getListProps()}>
                {defaultOptions.map((opt) => (
                  <li
                    key={opt}
                    {...selectable.getOptionProps({ id: opt })}
                    {...selectable.getDisabledOptionProps()}
                  >
                    {opt}
                  </li>
                ))}
              </ul>
            </span>
          )}
        </Selectable>
      )
      const option = await find('li')
      expect(option.getAttribute('aria-disabled')).to.equal('true')
    })
  })

  describe('getDisabledOptionProps()', async () => {
    it('should provide prop getter for disabled option element', async () => {
      const renderSpy = spy()

      await mount(
        <Selectable>
          {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'selectable' implicitly has an 'any' typ... Remove this comment to see the full error message */}
          {(selectable) => {
            renderSpy(selectable)
            return null
          }}
        </Selectable>
      )
      expect(lastCall(renderSpy)[0].getDisabledOptionProps).to.exist()
    })

    it('should set aria-disabled prop', async () => {
      await mount(
        <Selectable>
          {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'selectable' implicitly has an 'any' typ... Remove this comment to see the full error message */}
          {(selectable) => (
            <span>
              <input
                type="text"
                {...selectable.getTriggerProps()}
                {...selectable.getInputProps()}
              />
              <ul {...selectable.getListProps()}>
                {defaultOptions.map((opt) => (
                  <li
                    key={opt}
                    {...selectable.getOptionProps({ id: opt })}
                    {...selectable.getDisabledOptionProps()}
                  >
                    {opt}
                  </li>
                ))}
              </ul>
            </span>
          )}
        </Selectable>
      )
      const option = await find('li')
      expect(option.getAttribute('aria-disabled')).to.equal('true')
    })
  })

  describe('getDescriptionProps()', async () => {
    it('should provide prop getter for description element', async () => {
      const renderSpy = spy()

      await mount(
        <Selectable>
          {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'selectable' implicitly has an 'any' typ... Remove this comment to see the full error message */}
          {(selectable) => {
            renderSpy(selectable)
            return null
          }}
        </Selectable>
      )
      expect(lastCall(renderSpy)[0].getDescriptionProps).to.exist()
    })
  })
})
/* eslint-enable jsx-a11y/label-has-associated-control */
