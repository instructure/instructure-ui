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
import IconArrowOpenUp from '@instructure/ui-icons/lib/Line/IconArrowOpenUp'
import IconArrowOpenDown from '@instructure/ui-icons/lib/Line/IconArrowOpenDown'
import NumberInput, { cleanValue } from '../index'
import styles from '../styles.css'

describe('<NumberInput />', () => {
  const testbed = new Testbed(<NumberInput label="Name" />)

  describe('NumberInput.cleanValue', () => {
    it('should clean letter characters', () => {
      const value = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
      expect(cleanValue(value)).to.equal('')
    })

    it('should reject all symbols except for - and the locale decimal delimiter', () => {
      // locale is set to 'en' so the decimal delimiter is '.'
      const value = '!"·$%&/()=?¿\'|-@#¢∞¬÷“”≠´`+´ç,^*¨Ç;:_[.]{}„…'
      expect(cleanValue(value)).to.equal('-.')
    })

    it('should allow only one minus sign when it is not behind numbers', () => {
      expect(cleanValue('6-')).to.equal('6')
      expect(cleanValue('-6')).to.equal('-6')
      expect(cleanValue('-')).to.equal('-')
      expect(cleanValue('--')).to.equal('-')
      expect(cleanValue('-----dfghj5678')).to.equal('-5678')
      expect(cleanValue('-dfghj----5678')).to.equal('-5678')
      expect(cleanValue('-dfghj-5678---')).to.equal('-5678')
      expect(cleanValue('-dfghj5678----')).to.equal('-5678')
      expect(cleanValue('dfghj5678----')).to.equal('5678')
      expect(cleanValue('dfghj567----8')).to.equal('5678')
      expect(cleanValue('dfghj5-678')).to.equal('5678')
    })

    it('should allow only one decimal delimiter', () => {
      // locale is set to 'en' so the decimal delimiter is '.'
      expect(cleanValue('6.')).to.equal('6.')
      expect(cleanValue('.6')).to.equal('.6')
      expect(cleanValue('6.6.6')).to.equal('6.66')
      expect(cleanValue('66..6')).to.equal('66.6')
      expect(cleanValue('.')).to.equal('.')
      expect(cleanValue('..')).to.equal('.')
      expect(cleanValue('.....dfghj5678')).to.equal('.5678')
      expect(cleanValue('.dfghj....5678')).to.equal('.5678')
      expect(cleanValue('.dfghj.5678...')).to.equal('.5678')
      expect(cleanValue('.dfghj5678....')).to.equal('.5678')
      expect(cleanValue('dfghj5678....')).to.equal('5678.')
      expect(cleanValue('dfghj567....8')).to.equal('567.8')
      expect(cleanValue('dfghj5.678')).to.equal('5.678')
    })
  })

  describe('NumberInput.applyStep', () => {
    it('should add steps', () => {
      const subject = testbed.render({ defaultValue: '0', step: '1' })
      expect(subject.instance().applyStep(1)).to.equal('1')
    })

    it('should subtract steps', () => {
      const subject = testbed.render({ defaultValue: '0', step: '1' })
      expect(subject.instance().applyStep(-1)).to.equal('-1')
    })

    it('should support fractional steps', () => {
      const subject = testbed.render({ defaultValue: '3', step: '1.5' })
      expect(subject.instance().applyStep(-1)).to.equal('1.5')
    })

    describe('with large numbers', () => {
      it('should add steps', () => {
        const subject = testbed.render({ defaultValue: '123456789012345678901', step: '1' })
        expect(subject.instance().applyStep(1)).to.equal('123456789012345678902')
      })

      it('should substract steps', () => {
        const subject = testbed.render({ defaultValue: '1234567890123456789012345', step: '1' })
        expect(subject.instance().applyStep(-1)).to.equal('1234567890123456789012344')
      })

      it('should not use scientific notation', () => {
        const subject = testbed.render({ defaultValue: '123456789012345678901234567890', step: '5' })
        expect(subject.instance().applyStep(1)).to.equal('123456789012345678901234567895')
      })
    })

    describe('when the input is empty', () => {
      it('should assume value is 0 web adding steps', () => {
        const subject = testbed.render({ defaultValue: '', step: '123' })
        expect(subject.instance().applyStep(1)).to.equal('123')
      })

      it('should assume value is 0 when subtracting steps', () => {
        const subject = testbed.render({ defaultValue: '', step: '123' })
        expect(subject.instance().applyStep(-1)).to.equal('-123')
      })
    })

    describe('with a min prop', () => {
      it('should limit min if given', () => {
        const subject = testbed.render({ defaultValue: '-9', step: '1', min: '-10' })
        expect(subject.instance().applyStep(-1)).to.equal('-10')
      })

      it('should limit min if given', () => {
        const subject = testbed.render({ defaultValue: '-10', step: '1', min: '-10' })
        expect(subject.instance().applyStep(-1)).to.equal('-10')
      })

      it('should limit min if given', () => {
        const subject = testbed.render({ defaultValue: '0', step: '1', min: '0' })
        expect(subject.instance().applyStep('0', '1', -1, '0')).to.equal('0')
      })
    })

    it('should limit min if given', () => {
      const subject = testbed.render({ defaultValue: '-9', step: '1', min: '-10' })
      expect(subject.instance().applyStep(-1)).to.equal('-10')

      subject.setProps({ defaultValue: '-10', step: '1', min: '-10' })
      expect(subject.instance().applyStep(-1)).to.equal('-10')

      subject.setProps({ defaultValue: '0', step: '1', min: '0' })
      expect(subject.instance().applyStep('0', '1', -1, '0')).to.equal('0')
    })

    it('should limit min if given', () => {
      const subject = testbed.render({ defaultValue: '-9', step: '1', min: '-10' })
      expect(subject.instance().applyStep(-1)).to.equal('-10')

      subject.setProps({ defaultValue: '-10', step: '1', min: '-10' })
      expect(subject.instance().applyStep(-1)).to.equal('-10')

      subject.setProps({ defaultValue: '0', step: '1', min: '0' })
      expect(subject.instance().applyStep('0', '1', -1, '0')).to.equal('0')
    })

    it('should limit min if given', () => {
      const subject = testbed.render({ defaultValue: '-9', step: '1', min: '-10' })
      expect(subject.instance().applyStep(-1)).to.equal('-10')

      subject.setProps({ defaultValue: '-10', step: '1', min: '-10' })
      expect(subject.instance().applyStep(-1)).to.equal('-10')

      subject.setProps({ defaultValue: '0', step: '1', min: '0' })
      expect(subject.instance().applyStep('0', '1', -1, '0')).to.equal('0')
    })

    it("should snap to the next step when value doesn't match the step increments", () => {
      const subject = testbed.render({ defaultValue: '2.5', step: '1', min: null })
      expect(subject.instance().applyStep(1)).to.equal('3')

      subject.setProps({ defaultValue: '2.5', step: '1', min: null })
      expect(subject.instance().applyStep(-1)).to.equal('2')
    })

    it('should not change if value is already smaller than min and dir is -1', () => {
      const subject = testbed.render({ defaultValue: '-99', step: '1', min: '-10' })
      expect(subject.instance().applyStep(-1)).to.equal('-99')
    })

    it('should snap value to min when it is already smaller than min and dir is 1', () => {
      const subject = testbed.render({ defaultValue: '-99', step: '1', min: '-10' })
      expect(subject.instance().applyStep(1)).to.equal('-10')
    })

    it('should limit max if given', () => {
      const subject = testbed.render({ defaultValue: '6', step: '1', min: null, max: '7' })
      expect(subject.instance().applyStep(1)).to.equal('7')

      subject.setProps({ defaultValue: '7', step: '1', min: null, max: '7' })
      expect(subject.instance().applyStep(1)).to.equal('7')
    })

    it('should not change if value is already greater than max and dir is 1', () => {
      const subject = testbed.render({ defaultValue: '99', step: '1', min: null, max: '10' })
      expect(subject.instance().applyStep(1)).to.equal('99')
    })

    it('should snap value to max when it is already greater than max and dir is -1', () => {
      const subject = testbed.render({ defaultValue: '99', step: '1', min: null, max: '10' })
      expect(subject.instance().applyStep(-1)).to.equal('10')
    })

    it('should use min when given as the base for step', () => {
      const subject = testbed.render({ value: '1', step: '0.11', min: '1' })
      expect(subject.instance().applyStep(1)).to.equal('1.11')

      subject.setProps({ value: '0', step: '0.11', min: '0' })
      expect(subject.instance().applyStep(1)).to.equal('0.11')

      subject.setProps({ value: '-1', step: '0.3', min: '-1' })
      expect(subject.instance().applyStep(1)).to.equal('-0.7')

      subject.setProps({ value: '5.25', step: '1', min: '-2.75' })
      expect(subject.instance().applyStep(-1)).to.equal('4.25')
    })

    it("should not pass over max it when the last step doesn't match", () => {
      const subject = testbed.render({ value: '2', step: '1', min: null, max: '2.75' })
      expect(subject.instance().applyStep(1)).to.equal('2')

      subject.setProps({ value: '3.4', step: '0.4', min: '3', max: '3.6' })
      expect(subject.instance().applyStep(1)).to.equal('3.4')
    })
  })

  describe('internationalization', () => {
    it('can be passed a locale prop', () => {
      const subject = testbed.render({ locale: 'de' })
      expect(subject.instance().locale).to.equal('de')
    })

    it('uses the context locale if no locale prop is passed', () => {
      const context = { locale: 'de' }
      const subject = testbed.render({}, context)
      expect(subject.instance().locale).to.equal('de')
    })

    it('uses the prop if locale is passed as a prop and locale is available on the context', () => {
      const context = { locale: 'en-au' }
      const subject = testbed.render({ locale: 'de' }, context)
      expect(subject.instance().locale).to.equal('de')
    })

    it('formats default values in accordance with the locale', () => {
      const subject = testbed.render({ defaultValue: '2.5', locale: 'de' })
      expect(subject.find('input').node.value).to.equal('2,5')
    })

    it('updates the input value if the locale changes', done => {
      const subject = testbed.render({ defaultValue: '2.5' })
      expect(subject.find('input').node.value).to.equal('2.5')
      subject.setProps({ locale: 'de' }, () => {
        expect(subject.find('input').node.value).to.equal('2,5')
        done()
      })
    })

    it('increments the number in the appropriate locale when the up arrow is pressed', () => {
      const subject = testbed.render({ defaultValue: '2.5', step: '0.1', locale: 'de' })
      subject.find(IconArrowOpenUp).simulate('click')
      expect(subject.find('input').node.value).to.equal('2,6')
    })

    it('decrements the number in the appropriate locale when the down arrow is pressed', () => {
      const subject = testbed.render({ defaultValue: '2.5', step: '0.1', locale: 'de' })
      subject.find(IconArrowOpenDown).simulate('click')
      expect(subject.find('input').node.value).to.equal('2,4')
    })

    it('allows entering "." if the locale uses "." as a decimal delimiter', () => {
      const subject = testbed.render()
      subject.find('input').simulate('change', { target: { value: '2.' } })
      expect(subject.find('input').node.value).to.equal('2.')
    })

    it('disallows entering "," if the locale uses "." as a decimal delimiter', () => {
      const subject = testbed.render()
      subject.find('input').simulate('change', { target: { value: '2,' } })
      expect(subject.find('input').node.value).to.equal('2')
    })

    it('allows entering "," if the locale uses "," as a decimal delimiter', () => {
      const subject = testbed.render({ locale: 'de' })
      subject.find('input').simulate('change', { target: { value: '2,' } })
      expect(subject.find('input').node.value).to.equal('2,')
    })

    it('disallows entering "." if the locale uses "," as a decimal delimiter', () => {
      const subject = testbed.render({ locale: 'de' })
      subject.find('input').simulate('change', { target: { value: '2.' } })
      expect(subject.find('input').node.value).to.equal('2')
    })
  })

  it('should accept a default value', () => {
    const subject = testbed.render({
      defaultValue: '7'
    })

    expect(subject.find('input').getDOMNode().value).to.equal('7')
  })

  it('should include a label', () => {
    const subject = testbed.render()

    expect(subject.find('label').length).to.equal(1)
  })

  it('should focus the input when focus is called', () => {
    const subject = testbed.render()

    subject.instance().focus()

    expect(subject.find('input').focused()).to.be.true
  })

  it('should provide an inputRef prop', () => {
    const inputRef = testbed.stub()
    const subject = testbed.render({
      inputRef
    })

    expect(inputRef).to.have.been.calledWith(subject.find('input').unwrap())
  })

  it('should provide a value getter', () => {
    const subject = testbed.render({
      defaultValue: '9.7'
    })

    expect(subject.instance().value).to.equal('9.7')
  })

  describe('events', () => {
    it('up arrow responds to clicks', () => {
      const onChange = testbed.stub()

      const subject = testbed.render({
        onChange
      })

      subject.find(`.${styles.arrow}`).first().simulate('click')

      expect(onChange).to.have.been.called
      expect(onChange.firstCall.args[1]).to.equal('1')
      expect(subject.find('input').getDOMNode().value).to.equal('1')
    })

    it('down arrow responds to clicks', () => {
      const onChange = testbed.stub()

      const subject = testbed.render({
        onChange
      })

      subject.find(`.${styles.arrow}`).last().simulate('click')

      expect(onChange).to.have.been.called
      expect(subject.find('input').getDOMNode().value).to.equal('-1')
    })

    it('responds to onChange event', () => {
      const onChange = testbed.stub()

      const subject = testbed.render({
        onChange
      })

      subject.find('input').simulate('change')

      expect(onChange).to.have.been.called
    })

    it('responds to onKeyDown event', () => {
      const onKeyDown = testbed.stub()

      const subject = testbed.render({
        onKeyDown
      })

      subject.find('input').simulate('keydown', { key: 'ArrowUp' })

      expect(onKeyDown).to.have.been.called
    })

    it('responds to onBlur event', () => {
      const onBlur = testbed.stub()

      const subject = testbed.render({
        onBlur
      })

      subject.find('input').simulate('blur')

      expect(onBlur).to.have.been.called
    })

    it('responds to onFocus event', () => {
      const onFocus = testbed.stub()

      const subject = testbed.render({
        onFocus
      })

      subject.find('input').simulate('focus')

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

      expect(subject.find('input').getAttribute('aria-invalid')).to.exist
    })
  })
})
