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
import TextArea from '../index'

describe('TextArea', () => {
  const testbed = new Testbed(<TextArea label="Name" autoGrow={false} />)

  it('should accept a default value', () => {
    const subject = testbed.render({
      defaultValue: 'Tom Servo'
    })

    testbed.raf()
    testbed.tick()

    expect(subject.find('textarea').unwrap().value).to.equal('Tom Servo')
  })

  it('should include a label', () => {
    const subject = testbed.render()

    expect(subject.find('label').length).to.equal(1)
  })

  it('should set an initial height', () => {
    const subject = testbed.render({
      height: '100px'
    })
    expect(subject.find('textarea').getComputedStyle().getPropertyValue('height')).to.contain('100px')
  })

  it('should resize if autoGrow is true', () => {
    const subject = testbed.render({
      autoGrow: true,
      onChange: testbed.stub()
    })

    testbed.raf()
    testbed.tick()

    const textarea = subject.find('textarea')
    const initialHeight = parseInt(textarea.getComputedStyle().getPropertyValue('height'), 10)

    /* eslint-disable max-len */
    subject.setProps({value: 'Chartreuse celiac thundercats, distillery snackwave glossier pork belly tacos venmo fanny pack paleo portland. Migas 3 wolf moon typewriter, meditation pitchfork meh narwhal copper mug gluten-free vegan next level. Succulents keytar cronut, fanny pack kitsch hammock sustainable skateboard gochujang poutine la croix ennui cred quinoa. Fap copper mug pitchfork small batch hell of vice. Kickstarter small batch hexagon, scenester bushwick tacos cliche. Pickled flannel PBR&B, chartreuse next level vinyl echo park chambray pitchfork selfies actually tattooed blue bottle 3 wolf moon. Raw denim enamel pin tumeric retro fam scenester.'})
    /* eslint-enable max-len */

    testbed.raf()
    testbed.tick()

    const resizedHeight = parseInt(textarea.getComputedStyle().getPropertyValue('height'), 10)
    expect(resizedHeight).to.be.above(initialHeight)
  })

  it('should set a maxHeight', () => {
    const subject = testbed.render({
      maxHeight: '100px',
      autoGrow: true
    })
    expect(subject.find('textarea').getComputedStyle().getPropertyValue('max-height')).to.contain('100px')
  })

  it('should focus the textarea when focus is called', () => {
    const subject = testbed.render()

    subject.instance().focus()

    expect(subject.find('textarea').focused()).to.be.true
  })

  it('provides a focused getter', () => {
    const subject = testbed.render()

    subject.instance().focus()

    expect(subject.instance().focused).to.be.true
  })

  it('should provide an textareaRef prop', () => {
    const textareaRef = testbed.stub()
    const subject = testbed.render({
      textareaRef
    })

    expect(textareaRef).to.have.been.calledWith(subject.find('textarea').unwrap())
  })

  it('should provide a value getter', () => {
    const subject = testbed.render({
      defaultValue: 'bar'
    })

    expect(subject.instance().value).to.equal('bar')
  })

  describe('events', () => {
    it('responds to onChange event', () => {
      const onChange = testbed.stub()

      const subject = testbed.render({
        onChange
      })

      subject.find('textarea').simulate('change')

      expect(onChange).to.have.been.called
    })

    it('does not respond to onChange event when disabled', () => {
      const onChange = testbed.stub()

      const subject = testbed.render({
        disabled: true,
        onChange
      })

      subject.find('textarea').simulate('change')

      expect(onChange).to.not.have.been.called
    })

    it('does not respond to onChange event when readOnly', () => {
      const onChange = testbed.stub()

      const subject = testbed.render({
        readOnly: true,
        onChange
      })

      subject.find('textarea').simulate('change')

      expect(onChange).to.not.have.been.called
    })

    it('responds to onBlur event', () => {
      const onBlur = testbed.stub()

      const subject = testbed.render({
        onBlur
      })

      subject.find('textarea').simulate('blur')

      expect(onBlur).to.have.been.called
    })

    it('responds to onFocus event', () => {
      const onFocus = testbed.stub()

      const subject = testbed.render({
        onFocus
      })

      subject.find('textarea').simulate('focus')

      expect(onFocus).to.have.been.called
    })
  })

  describe('for a11y', () => {
    it('should meet standards', done => {
      const subject = testbed.render()

      subject.should.be.accessible(done)
    })

    it('should set aria-invalid when errors prop is set', () => {
      const subject = testbed.render({
        messages: [{ type: 'error', text: 'some error message' }]
      })

      expect(subject.find('textarea').getAttribute('aria-invalid')).to.exist
    })
  })
})
