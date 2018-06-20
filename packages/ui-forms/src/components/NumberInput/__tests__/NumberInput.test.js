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
import NumberInput from '../index'

describe('<NumberInput />', () => {
  const testbed = new Testbed(<NumberInput label="Name" />)

  describe('NumberInput.applyStep', () => {
    it('should add steps', () => {
      const subject = testbed.render({ defaultValue: '0', step: '1' })
      expect(subject.instance().applyStep(1).toString()).to.equal('1')
    })

    it('should subtract steps', () => {
      const subject = testbed.render({ defaultValue: '0', step: '1' })
      expect(subject.instance().applyStep(-1).toString()).to.equal('-1')
    })

    it('should support fractional steps', () => {
      const subject = testbed.render({ defaultValue: '3', step: '1.5' })
      expect(subject.instance().applyStep(-1).toString()).to.equal('1.5')
    })

    describe('with large numbers', () => {
      it('should add steps', () => {
        const subject = testbed.render({ defaultValue: '123456789012345678901', step: '1' })
        expect(subject.instance().applyStep(1).toString()).to.equal('123456789012345678902')
      })

      it('should substract steps', () => {
        const subject = testbed.render({ defaultValue: '1234567890123456789012345', step: '1' })
        expect(subject.instance().applyStep(-1).toString()).to.equal('1234567890123456789012344')
      })

      it('should not use scientific notation', () => {
        const subject = testbed.render({ defaultValue: '123456789012345678901234567890', step: '5' })
        expect(subject.instance().applyStep(1).toString()).to.equal('123456789012345678901234567895')
      })
    })

    describe('when the input is empty', () => {
      it('should assume value is 0 web adding steps', () => {
        const subject = testbed.render({ defaultValue: '', step: '123' })
        expect(subject.instance().applyStep(1).toString()).to.equal('123')
      })

      it('should assume value is 0 when subtracting steps', () => {
        const subject = testbed.render({ defaultValue: '', step: '123' })
        expect(subject.instance().applyStep(-1).toString()).to.equal('-123')
      })
    })

    describe('with a min prop', () => {
      it('should limit min if given', () => {
        const subject = testbed.render({ defaultValue: '-9', step: '1', min: '-10' })
        expect(subject.instance().applyStep(-1).toString()).to.equal('-10')
      })

      it('should limit min if given', () => {
        const subject = testbed.render({ defaultValue: '-10', step: '1', min: '-10' })
        expect(subject.instance().applyStep(-1).toString()).to.equal('-10')
      })

      it('should limit min if given', () => {
        const subject = testbed.render({ defaultValue: '0', step: '1', min: '0' })
        expect(subject.instance().applyStep('0', '1', -1, '0').toString()).to.equal('0')
      })
    })

    it('should limit min if given', () => {
      const subject = testbed.render({ defaultValue: '-9', step: '1', min: '-10' })
      expect(subject.instance().applyStep(-1).toString()).to.equal('-10')

      subject.setProps({ defaultValue: '-10', step: '1', min: '-10' })
      expect(subject.instance().applyStep(-1).toString()).to.equal('-10')

      subject.setProps({ defaultValue: '0', step: '1', min: '0' })
      expect(subject.instance().applyStep('0', '1', -1, '0').toString()).to.equal('0')
    })

    it('should limit min if given', () => {
      const subject = testbed.render({ defaultValue: '-9', step: '1', min: '-10' })
      expect(subject.instance().applyStep(-1).toString()).to.equal('-10')

      subject.setProps({ defaultValue: '-10', step: '1', min: '-10' })
      expect(subject.instance().applyStep(-1).toString()).to.equal('-10')

      subject.setProps({ defaultValue: '0', step: '1', min: '0' })
      expect(subject.instance().applyStep('0', '1', -1, '0').toString()).to.equal('0')
    })

    it('should limit min if given', () => {
      const subject = testbed.render({ defaultValue: '-9', step: '1', min: '-10' })
      expect(subject.instance().applyStep(-1).toString()).to.equal('-10')

      subject.setProps({ defaultValue: '-10', step: '1', min: '-10' })
      expect(subject.instance().applyStep(-1).toString()).to.equal('-10')

      subject.setProps({ defaultValue: '0', step: '1', min: '0' })
      expect(subject.instance().applyStep('0', '1', -1, '0').toString()).to.equal('0')
    })

    it("should snap to the next step when value doesn't match the step increments", () => {
      const subject = testbed.render({ defaultValue: '2.5', step: '1', min: null })
      expect(subject.instance().applyStep(1).toString()).to.equal('3')

      subject.setProps({ defaultValue: '2.5', step: '1', min: null })
      expect(subject.instance().applyStep(-1).toString()).to.equal('2')
    })

    it('should snap value to min if value is already smaller than min and dir is -1', () => {
      const subject = testbed.render({
        defaultValue: '-99',
        step: '1',
        min: '-10'
      })
      expect(subject.instance().applyStep(-1).toString()).to.equal('-10')
    })

    it('should snap value to min when it is already smaller than min and dir is 1', () => {
      const subject = testbed.render({
        defaultValue: '-99',
        step: '1',
        min: '-10'
      })
      expect(subject.instance().applyStep(1).toString()).to.equal('-10')
    })

    it('should limit max if given', () => {
      const subject = testbed.render({ defaultValue: '6', step: '1', min: null, max: '7' })
      expect(subject.instance().applyStep(1).toString()).to.equal('7')

      subject.setProps({ defaultValue: '7', step: '1', min: null, max: '7' })
      expect(subject.instance().applyStep(1).toString()).to.equal('7')
    })

    it('should snap value to max if value is already greater than max and dir is 1', () => {
      const subject = testbed.render({ defaultValue: '99', step: '1', min: null, max: '10' })
      expect(subject.instance().applyStep(1).toString()).to.equal('10')
    })

    it('should snap value to max when it is already greater than max and dir is -1', () => {
      const subject = testbed.render({ defaultValue: '99', step: '1', min: null, max: '10' })
      expect(subject.instance().applyStep(-1).toString()).to.equal('10')
    })

    it('should use min when given as the base for step', () => {
      const subject = testbed.render({ value: '1', step: '0.11', min: '1' })
      expect(subject.instance().applyStep(1).toString()).to.equal('1.1')

      subject.setProps({ value: '0', step: '0.11', min: '0' })
      expect(subject.instance().applyStep(1).toString()).to.equal('0.11')

      subject.setProps({ value: '-1', step: '0.3', min: '-1' })
      expect(subject.instance().applyStep(1).toString()).to.equal('-0.9')

      subject.setProps({ value: '5.25', step: '1', min: '-2.75' })
      expect(subject.instance().applyStep(-1).toString()).to.equal('5')
    })

    it("should not pass over max when the last step doesn't match", () => {
      const subject = testbed.render({ value: '2', step: '1', min: null, max: '2.75' })
      expect(subject.instance().applyStep(1).toString()).to.equal('2.75')

      subject.setProps({ value: '3.4', step: '0.4', min: '3', max: '3.6' })
      expect(subject.instance().applyStep(1).toString()).to.equal('3.6')
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
      const subject = testbed.render({
        defaultValue: 'a2.5',
        locale: 'de'
      })
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
      const subject = testbed.render({ defaultValue: 2.5, step: 0.1, locale: 'de' })
      subject.find(IconArrowOpenUp).simulate('mouseDown')
      expect(subject.find('input').node.value).to.equal('2,6')
    })

    it('decrements the number in the appropriate locale when the down arrow is pressed', () => {
      const subject = testbed.render({ defaultValue: 2.5, step: 0.1, locale: 'de' })
      subject.find(IconArrowOpenDown).simulate('mouseDown')
      expect(subject.find('input').node.value).to.equal('2,4')
    })

    it('allows entering "." if the locale uses "." as a decimal delimiter', () => {
      const subject = testbed.render()
      const input = subject.find('input')

      input.setValue('2.1')
      input.blur()

      expect(input.node.value).to.equal('2.1')
    })

    it('allows entering "," if the locale uses "," as a decimal delimiter', () => {
      const subject = testbed.render({ locale: 'de' })
      const input = subject.find('input')

      input.setValue('2,1')
      input.blur()

      expect(input.node.value).to.equal('2,1')
    })

    describe('conditionalFormat', () => {
      it('formats on render when a number value props is given', () => {
        const subject = testbed.render({ locale: 'fr', value: 7.3 })
        const input = subject.find('input')

        expect(input.node.value).to.equal('7,3')
      })

      it('does not format on render when a string value prop is given', () => {
        const subject = testbed.render({ locale: 'fr', value: 'foo' })
        const input = subject.find('input')

        expect(input.node.value).to.equal('foo')
      })

      it('does not format on render when value is falsey', () => {
        const subject = testbed.render({ locale: 'fr' })
        const input = subject.find('input')

        expect(input.node.value).to.equal('')
      })
    })
  })

  describe('onChange handler', () => {
    const onChangeArgs = (value, props = {}) => {
      const onChange = testbed.stub()
      const subject = testbed.render({ ...props, onChange })
      const input = subject.find('input')
      input.setValue(value)

      expect(onChange).to.have.been.called
      return onChange.lastCall.args
    }

    const baseProps = {
      decimalPrecision: 2,
      locale: 'de'
    }

    it('receives the raw string value of the input as the second argument', () => {
      const value = '-12.501,5'
      expect(onChangeArgs(value, baseProps)[1]).to.equal(value)
    })

    it('receives the normalized string value of the input as the third argument', () => {
      const value = '-12.501,5'
      expect(onChangeArgs(value, baseProps)[2]).to.equal('-12501.50')
    })

    it("receives null as the third argument if the value can't be parsed", () => {
      const value = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
      expect(onChangeArgs(value, baseProps)[2]).to.be.null
    })

    it('receives the min value as the third argument if value is less than min', () => {
      const min = 1
      const value = '0'
      expect(onChangeArgs(value, { ...baseProps, min })[2]).to.equal('1.00')
    })

    it('receives the max value as the third argument if value is greater than max', () => {
      const max = 99.9
      const value = '100'
      expect(onChangeArgs(value, { ...baseProps, max })[2]).to.equal('99.90')
    })

    context('when value is less precise than specified precision', () => {
      it('receives a third argument with trailing zeros', () => {
        expect(onChangeArgs('3.9', { significantDigits: 3 })[2]).to.equal('3.90')
      })
    })

    context('when value is more precise than specified precision', () => {
      it('receives a third argument rounded to the given decimal precision', () => {
        expect(onChangeArgs('9.99', { decimalPrecision: 1 })[2]).to.equal('10.0')
      })

      it('receives a third argument rounded to the given significant digits', () => {
        expect(onChangeArgs('9.175', { significantDigits: 3 })[2]).to.equal('9.18')
      })
    })
  })

  describe('onBlur formatting', () => {
    const inputValueOnBlur = (value, props) => {
      const subject = testbed.render(props)
      const input = subject.find('input')
      input.setValue(value)
      input.blur()
      return input.getDOMNode().value
    }

    it("should not clean values that can't be parsed into a number", () => {
      const value = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
      expect(inputValueOnBlur(value)).to.equal(value)
    })

    it('should reject all symbols except for - and the locale decimal delimiter', () => {
      // locale is set to 'en' so the decimal delimiter is '.'
      expect(inputValueOnBlur('-!"·$%&/()=?¿\'|@0#¢∞¬÷“”≠´`+´ç,^*¨Ç;:_[.]{}„…0')).to.equal('0')
    })

    it('should apply the locale specific thousands delimiter', () => {
      expect(inputValueOnBlur('1234567890', { locale: 'es' })).to.equal('1.234.567.890')
    })

    it('should remove leading zeros', () => {
      expect(inputValueOnBlur('aabb0.0.0.1', { locale: 'es' })).to.equal('1')
    })

    it('should leave only the last decimal delimiter', () => {
      expect(inputValueOnBlur(',1,,2,,,3,,4', { locale: 'fr' })).to.equal('123,4')
    })

    context('when value is less precise than specified precision', () => {
      it('adds trailing zeros', () => {
        expect(inputValueOnBlur('123', { decimalPrecision: 2 })).to.equal('123.00')
      })
    })

    context('when value is more precise than specified precision', () => {
      it('rounds to the given decimal precision', () => {
        expect(inputValueOnBlur('123.58', { decimalPrecision: 1 })).to.equal('123.6')
      })

      it('rounds to the given significant digits', () => {
        expect(inputValueOnBlur('123', { significantDigits: 2 })).to.equal('120')
      })
    })

    context('when the specified precision is 0', () => {
      it('rounds the decimal precision to 0', () => {
        expect(inputValueOnBlur('123.93', { decimalPrecision: 0 })).to.equal('124')
      })
    })

    context('when value is negative and min is 0', () => {
      it('sets the value to 0', () => {
        expect(inputValueOnBlur('-1', { min: 0 })).to.equal('0')
      })
    })

    context('when value is positive and max is 0', () => {
      it('sets the value to 0', () => {
        expect(inputValueOnBlur('1', { max: 0 })).to.equal('0')
      })
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

      subject.find(IconArrowOpenUp).simulate('mouseDown')

      expect(onChange).to.have.been.called
      expect(onChange.firstCall.args[1]).to.equal('1')
      expect(onChange.firstCall.args[2]).to.equal('1')
      expect(subject.find('input').getDOMNode().value).to.equal('1')
    })

    it('down arrow responds to clicks', () => {
      const onChange = testbed.stub()

      const subject = testbed.render({
        onChange
      })

      subject.find(IconArrowOpenDown).simulate('mouseDown')

      expect(onChange).to.have.been.called
      expect(onChange.firstCall.args[1]).to.equal('-1')
      expect(onChange.firstCall.args[2]).to.equal('-1')
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

      subject.find('input').keyDown('ArrowUp')

      expect(onKeyDown).to.have.been.called
    })

    it('responds to onBlur event', () => {
      const onBlur = testbed.stub()

      const subject = testbed.render({
        onBlur
      })

      subject.find('input').blur()

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

  context('when controlled', () => {
    class Example extends React.Component {
      state = { value: '' }

      handleChange = (event, value) => this.setState({ value })

      render () {
        return <NumberInput
          {...this.props}
          label="controlled"
          onChange={this.handleChange}
          value={this.state.value}
        />
      }
    }

    const controlledTestbed = new Testbed(<Example />)

    it('allows negative numbers to be typed into the input', () => {
      const subject = controlledTestbed.render()
      const input = subject.find('input')
      input.simulate('change', { target: { value: '-' } })
      expect(input.node.value).to.equal('-')
      input.simulate('change', { target: { value: '-1' } })
      expect(input.node.value).to.equal('-1')
    })

    it('allows periods to be typed into the input', () => {
      const subject = controlledTestbed.render()
      const input = subject.find('input')
      input.simulate('change', { target: { value: '.' } })
      expect(input.node.value).to.equal('.')
      input.simulate('change', { target: { value: '.5' } })
      expect(input.node.value).to.equal('.5')
    })

    it('allows commas to be typed into the input', () => {
      const subject = controlledTestbed.render()
      const input = subject.find('input')
      input.simulate('change', { target: { value: ',' } })
      expect(input.node.value).to.equal(',')
      input.simulate('change', { target: { value: ',5' } })
      expect(input.node.value).to.equal(',5')
    })

    it('formats the value according to the locale on blur', () => {
      const subject = controlledTestbed.render({ locale: 'de' })
      const input = subject.find('input')
      const value = '12345,6789'
      input.simulate('change', { target: { value } })
      expect(input.node.value).to.equal(value)
      input.simulate('blur')
      expect(input.node.value).to.equal('12.345,6789')
    })

    it('sets the value to the specified precision on blur', () => {
      const subject = controlledTestbed.render({ significantDigits: 2 })
      const input = subject.find('input')
      const value = '102'
      input.simulate('change', { target: { value } })
      expect(input.node.value).to.equal(value)
      input.simulate('blur')
      expect(input.node.value).to.equal('100')
    })
  })

  describe('componentWillReceiveProps', () => {
    it('updates value if locale changes', () => {
      const onChange = testbed.stub()
      const subject = testbed.render({ locale: 'en', onChange })
      const input = subject.find('input')
      input.node.value = '1234.5'
      subject.setProps({ locale: 'de' })
      expect(input.node.value).to.equal('1.234,5')
      expect(onChange.lastCall.args[1]).to.equal('1.234,5')
      expect(onChange.lastCall.args[2]).to.equal('1234.5')
    })

    it('updates value if precision changes', () => {
      const onChange = testbed.stub()
      const subject = testbed.render({ onChange, significantDigits: 3 })
      const input = subject.find('input')
      input.node.value = '12.5'
      subject.setProps({ decimalPrecision: 2, significantDigits: null })
      expect(input.node.value).to.equal('12.50')
      expect(onChange.lastCall.args[1]).to.equal('12.50')
      expect(onChange.lastCall.args[2]).to.equal('12.50')
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
