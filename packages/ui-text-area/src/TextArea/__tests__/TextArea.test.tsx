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

import { TextArea } from '../index'

import { TextAreaLocator } from '../TextAreaLocator'

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('TextArea', async () => {
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should accept a default value', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <TextArea label="Name" autoGrow={false} defaultValue="Tom Servo" />
    )
    const textArea = await TextAreaLocator.find()
    const input = await textArea.findInput()

    expect(input).to.have.value('Tom Servo')
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should include a label', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(<TextArea label="Name" autoGrow={false} />)
    const textArea = await TextAreaLocator.find(':label(Name)')
    expect(textArea).to.exist()
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should set an initial height', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(<TextArea label="Name" autoGrow={false} height="100px" />)
    const textArea = await TextAreaLocator.find()
    const input = await textArea.findInput()

    expect(input.getComputedStyle().height).to.contain('100px')
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should resize if autoGrow is true', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    const subject = await mount(
      <TextArea label="Name" autoGrow={true} width="500px" onChange={stub} />
    )
    const textArea = await TextAreaLocator.find()
    const input = await textArea.findInput()
    const initialHeight = parseInt(input.getComputedStyle().height, 10)

    // eslint-disable max-len
    await subject.setProps({
      value:
        'Chartreuse celiac thundercats, distillery snackwave glossier pork belly tacos venmo fanny pack paleo portland. Migas 3 wolf moon typewriter, meditation pitchfork meh narwhal copper mug gluten-free vegan next level. Succulents keytar cronut, fanny pack kitsch hammock sustainable skateboard gochujang poutine la croix ennui cred quinoa. Fap copper mug pitchfork small batch hell of vice. Kickstarter small batch hexagon, scenester bushwick tacos cliche. Pickled flannel PBR&B, chartreuse next level vinyl echo park chambray pitchfork selfies actually tattooed blue bottle 3 wolf moon. Raw denim enamel pin tumeric retro fam scenester.'
    })
    // eslint-enable max-len

    let resizedHeight
    await wait(() => {
      resizedHeight = parseInt(input.getComputedStyle().height, 10)
      expect(resizedHeight).to.be.above(initialHeight)
    })

    // Ensure minHeight that matches input height is being applied to container
    const layout = await textArea.find('[class$=-textArea__layout]')
    const layoutMinHeight = parseInt(
      layout.getComputedStyle().getPropertyValue('min-height'),
      10
    )
    expect(resizedHeight).to.equal(layoutMinHeight)
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should set a maxHeight', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <TextArea
        label="Name"
        autoGrow={true}
        maxHeight="10rem"
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
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
    const textArea = await TextAreaLocator.find()
    const input = await textArea.findInput()

    expect(input.getComputedStyle().getPropertyValue('max-height')).to.contain(
      '160px'
    )
    // ensure maxHeight is being applied to input container and not exceeded by minHeight style
    const layout = await textArea.find('[class$=-textArea__layout]')
    const layoutMaxHeight = parseInt(
      layout.getComputedStyle().getPropertyValue('max-height'),
      10
    )
    const layoutMinHeight = parseInt(
      layout.getComputedStyle().getPropertyValue('min-height'),
      10
    )
    expect(layoutMaxHeight).to.equal(160)
    expect(layoutMaxHeight).to.be.above(layoutMinHeight)
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should focus the textarea when focus is called', async () => {
    let ref
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <TextArea
        label="Name"
        autoGrow={false}
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ label: string; autoGrow: false; componentR... Remove this comment to see the full error message
        componentRef={(el) => (ref = el)}
      />
    )
    const textArea = await TextAreaLocator.find()
    const input = await textArea.findInput()

    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    ref.focus()
    expect(input.focused()).to.be.true()
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('provides a focused getter', async () => {
    let ref
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <TextArea
        label="Name"
        autoGrow={false}
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ label: string; autoGrow: false; componentR... Remove this comment to see the full error message
        componentRef={(el) => (ref = el)}
      />
    )

    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    ref.focus()
    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    expect(ref.focused).to.be.true()
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should provide an textareaRef prop', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
    const textareaRef = stub()
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <TextArea label="Name" autoGrow={false} textareaRef={textareaRef} />
    )
    const textArea = await TextAreaLocator.find()
    const input = await textArea.findInput()

    expect(textareaRef).to.have.been.calledWith(input.getDOMNode())
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should provide a value getter', async () => {
    let ref
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <TextArea
        label="Name"
        autoGrow={false}
        defaultValue="bar"
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ label: string; autoGrow: false; defaultVal... Remove this comment to see the full error message
        componentRef={(el) => (ref = el)}
      />
    )

    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    expect(ref.value).to.equal('bar')
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('events', async () => {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('responds to onChange event', async () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
      const onChange = stub()
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      await mount(
        <TextArea label="Name" autoGrow={false} onChange={onChange} />
      )
      const textArea = await TextAreaLocator.find()
      const input = await textArea.findInput()

      await input.change({ target: { value: 'foo' } })

      expect(onChange).to.have.been.called()
    })

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('does not respond to onChange event when disabled', async () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
      const onChange = stub()
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      await mount(
        <TextArea disabled label="Name" autoGrow={false} onChange={onChange} />
      )
      const textArea = await TextAreaLocator.find()
      const input = await textArea.findInput()

      await input.change({ target: { value: 'foo' } })

      expect(onChange).to.not.have.been.called()
    })

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('does not respond to onChange event when readOnly', async () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
      const onChange = stub()
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      await mount(
        <TextArea readOnly label="Name" autoGrow={false} onChange={onChange} />
      )
      const textArea = await TextAreaLocator.find()
      const input = await textArea.findInput()

      await input.change({ target: { value: 'foo' } })
      expect(onChange).to.not.have.been.called()
    })

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('responds to onBlur event', async () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
      const onBlur = stub()
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      await mount(<TextArea label="Name" autoGrow={false} onBlur={onBlur} />)
      const textArea = await TextAreaLocator.find()
      const input = await textArea.findInput()

      await input.blur()

      expect(onBlur).to.have.been.called()
    })

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('responds to onFocus event', async () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
      const onFocus = stub()
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      await mount(<TextArea label="Name" autoGrow={false} onFocus={onFocus} />)
      const textArea = await TextAreaLocator.find()
      const input = await textArea.findInput()

      await input.focus()

      expect(onFocus).to.have.been.called()
    })
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('for a11y', async () => {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should meet standards', async () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      await mount(<TextArea label="Name" autoGrow={false} />)
      const textArea = await TextAreaLocator.find()
      expect(await textArea.accessible()).to.be.true()
    })

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should set aria-invalid when errors prop is set', async () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      await mount(
        <TextArea
          label="Name"
          autoGrow={false}
          messages={[{ type: 'error', text: 'some error message' }]}
        />
      )
      const textArea = await TextAreaLocator.find()
      const input = await textArea.findInput()

      expect(input.getAttribute('aria-invalid')).to.exist()
    })
  })
})
