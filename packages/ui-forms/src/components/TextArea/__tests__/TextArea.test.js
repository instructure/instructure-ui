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
import { expect, mount, stub, within, wait, find } from '@instructure/ui-test-utils'
import TextArea from '../index'
import styles from '../styles.css'

describe('TextArea', async () => {
  it('should accept a default value', async () => {
    const subject = await mount(
      <TextArea
        label="Name"
        autoGrow={false}
        defaultValue="Tom Servo"
      />
    )
    const label = within(subject.getDOMNode())
    const textarea = await label.find('textarea')

    expect(textarea.getDOMNode().value).to.equal('Tom Servo')
  })

  it('should include a label', async () => {
    await mount(
      <TextArea
        label="Name"
        autoGrow={false}
      />
    )
    const label = await find('label')
    expect(label).to.exist()
  })

  it('should set an initial height', async () => {
    const subject = await mount(
      <TextArea
        label="Name"
        autoGrow={false}
        height="100px"
      />
    )
    const label = within(subject.getDOMNode())
    const textarea = await label.find('textarea')

    expect(textarea.getComputedStyle().height).to.contain('100px')
  })

  it('should resize if autoGrow is true', async () => {
    const subject = await mount(
      <TextArea
        label="Name"
        autoGrow={true}
        width="500px"
        onChange={stub}
      />
    )
    const label = within(subject.getDOMNode())
    const textarea = await label.find('textarea')
    const initialHeight = parseInt(textarea.getComputedStyle().height, 10)

    /* eslint-disable max-len */
    await subject.setProps({value: 'Chartreuse celiac thundercats, distillery snackwave glossier pork belly tacos venmo fanny pack paleo portland. Migas 3 wolf moon typewriter, meditation pitchfork meh narwhal copper mug gluten-free vegan next level. Succulents keytar cronut, fanny pack kitsch hammock sustainable skateboard gochujang poutine la croix ennui cred quinoa. Fap copper mug pitchfork small batch hell of vice. Kickstarter small batch hexagon, scenester bushwick tacos cliche. Pickled flannel PBR&B, chartreuse next level vinyl echo park chambray pitchfork selfies actually tattooed blue bottle 3 wolf moon. Raw denim enamel pin tumeric retro fam scenester.'})
    /* eslint-enable max-len */

    let resizedHeight
    await wait(() => {
      resizedHeight = parseInt(textarea.getComputedStyle().height, 10)
      expect(resizedHeight).to.be.above(initialHeight)
    })

    /* Ensure minHeight that matches input height is being applied to container */
    const layout = await label.find(`.${styles.layout}`)
    const layoutMinHeight = parseInt(layout.getComputedStyle().getPropertyValue('min-height'), 10)
    expect(resizedHeight).to.equal(layoutMinHeight)
  })

  it('should set a maxHeight', async () => {
    const subject = await mount(
      <TextArea
        label="Name"
        autoGrow={true}
        maxHeight="10rem"
        onChange={stub()}
        value={`Chartreuse celiac thundercats, distillery snackwave glossier
        pork belly tacos venmo fanny pack paleo portland. Migas 3 wolf moon typewriter,
        meditation pitchfork meh narwhal copper mug gluten-free vegan next level.
        Succulents keytar cronut, fanny pack kitsch hammock sustainable skateboard
        gochujang poutine la croix ennui cred quinoa. Fap copper mug pitchfork small
        batch hell of vice. Kickstarter small batch hexagon, scenester bushwick tacos
        cliche. Pickled flannel PBR&B, chartreuse next level vinyl echo park chambray
        pitchfork selfies actually tattooed blue bottle 3 wolf moon. Raw denim enamel
        pin tumeric retro fam scenester. Succulents keytar cronut, fanny pack kitsch
        hammock sustainable skateboard gochujang poutine la croix ennui cred quinoa.
        Fap copper mug pitchfork small batch hell of vice. Kickstarter small batch
        hexagon, scenester bushwick tacos
        Chartreuse celiac thundercats, distillery snackwave glossier
        pork belly tacos venmo fanny pack paleo portland. Migas 3 wolf moon typewriter,
        meditation pitchfork meh narwhal copper mug gluten-free vegan next level.
        Succulents keytar cronut, fanny pack kitsch hammock sustainable skateboard
        gochujang poutine la croix ennui cred quinoa. Fap copper mug pitchfork small
        batch hell of vice. Kickstarter small batch hexagon, scenester bushwick tacos
        cliche. Pickled flannel PBR&B, chartreuse next level vinyl echo park chambray
        pitchfork selfies actually tattooed blue bottle 3 wolf moon. Raw denim enamel
        pin tumeric retro fam scenester. Succulents keytar cronut, fanny pack kitsch
        hammock sustainable skateboard gochujang poutine la croix ennui cred quinoa.
        Fap copper mug pitchfork small batch hell of vice. Kickstarter small batch
        hexagon, scenester bushwick tacos`}
      />
    )
    const label = within(subject.getDOMNode())
    const textarea = await label.find('textarea')

    expect(textarea.getComputedStyle().getPropertyValue('max-height')).to.contain('160px')
    /* ensure maxHeight is being applied to input container and not exceeded by minHeight style */
    const layout = await label.find(`.${styles.layout}`)
    const layoutMaxHeight = parseInt(layout.getComputedStyle().getPropertyValue('max-height'), 10)
    const layoutMinHeight = parseInt(layout.getComputedStyle().getPropertyValue('min-height'), 10)
    expect(layoutMaxHeight).to.equal(160)
    expect(layoutMaxHeight).to.be.above(layoutMinHeight)
  })

  it('should focus the textarea when focus is called', async () => {
    let ref
    const subject = await mount(
      <TextArea
        label="Name"
        autoGrow={false}
        componentRef={el => ref = el}
      />
    )
    const label = within(subject.getDOMNode())
    const textarea = await label.find('textarea')

    ref.focus()
    expect(textarea.focused()).to.be.true()
  })

  it('provides a focused getter', async () => {
    let ref
    await mount(
      <TextArea
        label="Name"
        autoGrow={false}
        componentRef={el => ref = el}
      />
    )

    ref.focus()
    expect(ref.focused).to.be.true()
  })

  it('should provide an textareaRef prop', async () => {
    const textareaRef = stub()
    const subject = await mount(
      <TextArea
        label="Name"
        autoGrow={false}
        textareaRef={textareaRef}
      />
    )
    const label = within(subject.getDOMNode())
    const textarea = await label.find('textarea')

    expect(textareaRef).to.have.been.calledWith(textarea.getDOMNode())
  })

  it('should provide a value getter', async () => {
    let ref
    await mount(
      <TextArea
        label="Name"
        autoGrow={false}
        defaultValue="bar"
        componentRef={el => ref = el}
      />
    )

    expect(ref.value).to.equal('bar')
  })

  describe('events', async () => {
    it('responds to onChange event', async () => {
      const onChange = stub()
      const subject = await mount(
        <TextArea
          label="Name"
          autoGrow={false}
          onChange={onChange}
        />
      )
      const label = within(subject.getDOMNode())
      const textarea = await label.find('textarea')

      await textarea.change({ target: { value: 'foo' } })
      expect(onChange).to.have.been.called()
    })

    it('does not respond to onChange event when disabled', async () => {
      const onChange = stub()
      const subject = await mount(
        <TextArea
          disabled
          label="Name"
          autoGrow={false}
          onChange={onChange}
        />
      )
      const label = within(subject.getDOMNode())
      const textarea = await label.find('textarea')

      await textarea.change({ target: { value: 'foo' } })
      expect(onChange).to.not.have.been.called()
    })

    it('does not respond to onChange event when readOnly', async () => {
      const onChange = stub()
      const subject = await mount(
        <TextArea
          readOnly
          label="Name"
          autoGrow={false}
          onChange={onChange}
        />
      )
      const label = within(subject.getDOMNode())
      const textarea = await label.find('textarea')

      await textarea.change({ target: { value: 'foo' } })
      expect(onChange).to.not.have.been.called()
    })

    it('responds to onBlur event', async () => {
      const onBlur = stub()
      const subject = await mount(
        <TextArea
          label="Name"
          autoGrow={false}
          onBlur={onBlur}
        />
      )
      const label = within(subject.getDOMNode())
      const textarea = await label.find('textarea')

      await textarea.blur()
      expect(onBlur).to.have.been.called()
    })

    it('responds to onFocus event', async () => {
      const onFocus = stub()
      const subject = await mount(
        <TextArea
          label="Name"
          autoGrow={false}
          onFocus={onFocus}
        />
      )
      const label = within(subject.getDOMNode())
      const textarea = await label.find('textarea')

      await textarea.focus()
      expect(onFocus).to.have.been.called()
    })
  })

  describe('for a11y', async () => {
    it('should meet standards', async () => {
      const subject = await mount(
        <TextArea
          label="Name"
          autoGrow={false}
        />
      )
      const label = within(subject.getDOMNode())
      expect(await label.accessible()).to.be.true()
    })

    it('should set aria-invalid when errors prop is set', async () => {
      const subject = await mount(
        <TextArea
          label="Name"
          autoGrow={false}
          messages={[{ type: 'error', text: 'some error message' }]}
        />
      )
      const label = within(subject.getDOMNode())
      const textarea = await label.find('textarea')
      expect(textarea.getAttribute('aria-invalid')).to.exist()
    })
  })
})
