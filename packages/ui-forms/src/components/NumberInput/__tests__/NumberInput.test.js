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
import { expect, mount, stub, find } from '@instructure/ui-test-utils'
import NumberInput from '../index'
import NumberInputLocator from '../locator'

describe('<NumberInput />', async () => {
  describe('NumberInput.applyStep', async () => {
    it('should add steps', async () => {
      await mount(
        <NumberInput
          label="Name"
          defaultValue="0"
          step="1"
        />
      )

      const numberInput = await NumberInputLocator.find()
      const input = await numberInput.find('input')
      const arrows = await numberInput.findArrowButtons()

      await arrows[0].mouseDown()
      expect(input.getDOMNode().value).to.equal('1')
    })

    it('should subtract steps', async () => {
      await mount(
        <NumberInput
          label="Name"
          defaultValue="1"
          step="1"
        />
      )

      const numberInput = await NumberInputLocator.find()
      const input = await numberInput.find('input')
      const arrows = await numberInput.findArrowButtons()

      await arrows[1].mouseDown()
      expect(input.getDOMNode().value).to.equal('0')
    })

    it('should support fractional steps', async () => {
      await mount(
        <NumberInput
          label="Name"
          defaultValue="3"
          step="1.5"
        />
      )

      const numberInput = await NumberInputLocator.find()
      const input = await numberInput.find('input')
      const arrows = await numberInput.findArrowButtons()

      await arrows[1].mouseDown()
      expect(input.getDOMNode().value).to.equal('1.5')
    })

    describe('with large numbers', async () => {
      it('should add steps', async () => {
        await mount(
          <NumberInput
            label="Name"
            defaultValue="123456789012345678901"
            step="1"
          />
        )

        const numberInput = await NumberInputLocator.find()
        const input = await numberInput.find('input')
        const arrows = await numberInput.findArrowButtons()

        await arrows[0].mouseDown()
        expect(input.getDOMNode().value).to.equal('123,456,789,012,345,678,902')
      })

      it('should substract steps', async () => {
        await mount(
          <NumberInput
            label="Name"
            defaultValue="1234567890123456789012345"
            step="1"
          />
        )

        const numberInput = await NumberInputLocator.find()
        const input = await numberInput.find('input')
        const arrows = await numberInput.findArrowButtons()

        await arrows[1].mouseDown()
        expect(input.getDOMNode().value).to.equal('1,234,567,890,123,456,789,012,344')
      })

      it('should not use scientific notation', async () => {
        await mount(
          <NumberInput
            label="Name"
            defaultValue="123456789012345678901234567890"
            step="5"
          />
        )

        const numberInput = await NumberInputLocator.find()
        const input = await numberInput.find('input')
        const arrows = await numberInput.findArrowButtons()

        await arrows[0].mouseDown()
        expect(input.getDOMNode().value).to.equal('123,456,789,012,345,678,901,234,567,895')
      })
    })

    describe('when the input is empty', () => {
      it('should assume value is 0 web adding steps', async () => {
        await mount(
          <NumberInput
            label="Name"
            defaultValue=""
            step="123"
          />
        )

        const numberInput = await NumberInputLocator.find()
        const input = await numberInput.find('input')
        const arrows = await numberInput.findArrowButtons()

        await arrows[0].mouseDown()
        expect(input.getDOMNode().value).to.equal('123')
      })

      it('should assume value is 0 when subtracting steps', async () => {
        await mount(
          <NumberInput
            label="Name"
            defaultValue=""
            step="123"
          />
        )

        const numberInput = await NumberInputLocator.find()
        const input = await numberInput.find('input')
        const arrows = await numberInput.findArrowButtons()

        await arrows[1].mouseDown()
        expect(input.getDOMNode().value).to.equal('-123')
      })
    })

    describe('with a min prop', async () => {
      it('should limit min if given', async () => {
        await mount(
          <NumberInput
            label="Name"
            defaultValue="-9"
            step="1"
            min="-10"
          />
        )

        const numberInput = await NumberInputLocator.find()
        const input = await numberInput.find('input')
        const arrows = await numberInput.findArrowButtons()

        await arrows[1].mouseDown()
        expect(input.getDOMNode().value).to.equal('-10')
      })

      it('should limit min if given', async () => {
        await mount(
          <NumberInput
            label="Name"
            defaultValue="-10"
            step="1"
            min="-10"
          />
        )

        const numberInput = await NumberInputLocator.find()
        const input = await numberInput.find('input')
        const arrows = await numberInput.findArrowButtons()

        await arrows[1].mouseDown()
        expect(input.getDOMNode().value).to.equal('-10')
      })

      it('should limit min if given', async () => {
        const subject = await mount(
          <NumberInput
            label="Name"
            defaultValue="-9"
            step="1"
            min="-10"
          />
        )

        const numberInput = await NumberInputLocator.find()
        const input = await numberInput.find('input')
        const arrows = await numberInput.findArrowButtons()

        await arrows[1].mouseDown()
        expect(input).to.have.value('-10')

        await subject.setProps({ defaultValue: '-10', step: '1', min: '-10' })
        await arrows[1].mouseDown()
        expect(input).to.have.value('-10')
      })
    })

    it("should snap to the next step when value doesn't match the step increments", async () => {
      it('should limit min if given', async () => {
        const subject = await mount(
          <NumberInput
            label="Name"
            defaultValue="2.5"
            step="1"
          />
        )

        const numberInput = await NumberInputLocator.find()
        const input = await numberInput.find('input')
        const arrows = await numberInput.findArrowButtons()

        await arrows[0].mouseDown()
        expect(input).to.have.value('3')

        subject.setProps({ defaultValue: '2.5', step: '1' })

        await arrows[1].mouseDown()
        expect(input).to.have.value('2')
      })
    })

    it('should snap value to min if value is already smaller than min and dir is -1', async () => {
      await mount(
        <NumberInput
          label="Name"
          defaultValue="-99"
          step="1"
          min="-10"
        />
      )

      const numberInput = await NumberInputLocator.find()
      const input = await numberInput.find('input')
      const arrows = await numberInput.findArrowButtons()

      await arrows[1].mouseDown()
      expect(input).to.have.value('-10')
    })

    it('should snap value to min when it is already smaller than min and dir is 1', async () => {
      await mount(
        <NumberInput
          label="Name"
          defaultValue="-99"
          step="1"
          min="-10"
        />
      )

      const numberInput = await NumberInputLocator.find()
      const input = await numberInput.find('input')
      const arrows = await numberInput.findArrowButtons()

      await arrows[0].mouseDown()
      expect(input).to.have.value('-10')
    })

    it('should limit max if given', async () => {
      await mount(
        <NumberInput
          label="Name"
          defaultValue="6"
          step="1"
          max="7"
        />
      )

      const numberInput = await NumberInputLocator.find()
      const input = await numberInput.find('input')
      const arrows = await numberInput.findArrowButtons()

      await arrows[0].mouseDown()
      expect(input).to.have.value('7')

      await arrows[0].mouseDown()
      expect(input).to.have.value('7')
    })

    it('should snap value to max if value is already greater than max and dir is 1', async () => {
      await mount(
        <NumberInput
          label="Name"
          defaultValue="99"
          step="1"
          max="10"
        />
      )

      const numberInput = await NumberInputLocator.find()
      const input = await numberInput.find('input')
      const arrows = await numberInput.findArrowButtons()

      await arrows[0].mouseDown()
      expect(input).to.have.value('10')
    })

    it('should snap value to max when it is already greater than max and dir is -1', async () => {
      await mount(
        <NumberInput
          label="Name"
          defaultValue="99"
          step="1"
          max="10"
        />
      )

      const numberInput = await NumberInputLocator.find()
      const input = await numberInput.find('input')
      const arrows = await numberInput.findArrowButtons()

      await arrows[1].mouseDown()
      expect(input).to.have.value('10')
    })

    it("should not pass over max when the last step doesn't match", async () => {
      await mount(
        <NumberInput
          label="Name"
          defaultValue="2"
          step="1"
          max="2.75"
        />
      )

      const numberInput = await NumberInputLocator.find()
      const input = await numberInput.find('input')
      const arrows = await numberInput.findArrowButtons()

      await arrows[0].mouseDown()
      expect(input).to.have.value('2.75')
    })
  })

  describe('internationalization', async () => {
    it('can be passed a locale prop', async () => {
      await mount(
        <NumberInput
          label="Name"
          defaultValue="0.5"
          step="0.5"
          locale="de"
        />
      )

      const numberInput = await NumberInputLocator.find()
      const input = await numberInput.find('input')

      expect(input).to.have.value('0,5')
    })

    it('uses the context locale if no locale prop is passed', async () => {
      await mount(
        <NumberInput
          label="Name"
          defaultValue="0.5"
          step="0.5"
          locale="de"
        />, {
          context: { locale: 'de' }
        })

      const numberInput = await NumberInputLocator.find()
      const input = await numberInput.find('input')

      expect(input).to.have.value('0,5')
    })

    it('uses the prop if locale is passed as a prop and locale is available on the context', async () => {
      await mount(
        <NumberInput
          label="Name"
          defaultValue="0.5"
          step="0.5"
          locale="de"
        />, {
          context: { locale: 'en-au' }
        })

      const numberInput = await NumberInputLocator.find()
      const input = await numberInput.find('input')

      expect(input).to.have.value('0,5')
    })

    it('formats default values in accordance with the locale', async () => {
      await mount(
        <NumberInput
          label="Name"
          defaultValue="a2.5"
          step="0.5"
          locale="de"
        />
      )

      const numberInput = await NumberInputLocator.find()
      const input = await numberInput.find('input')

      expect(input).to.have.value('2,5')
    })

    it('updates the input value if the locale changes', async () => {
      const subject = await mount(
        <NumberInput
          label="Name"
          defaultValue="a2.5"
          step="0.5"
        />
      )

      const numberInput = await NumberInputLocator.find()
      const input = await numberInput.find('input')

      expect(input).to.have.value('2.5')

      await subject.setProps({ locale: 'de'})
      expect(input).to.have.value('2,5')
    })

    it('increments the number in the appropriate locale when the up arrow is pressed', async () => {
      await mount(
        <NumberInput
          label="Name"
          defaultValue="2.5"
          step="0.1"
          locale="de"
        />
      )

      const numberInput = await NumberInputLocator.find()
      const input = await numberInput.find('input')
      const arrows = await numberInput.findArrowButtons()

      await arrows[0].mouseDown()
      expect(input).to.have.value('2,6')
    })

    it('decrements the number in the appropriate locale when the down arrow is pressed', async () => {
      await mount(
        <NumberInput
          label="Name"
          defaultValue="2.5"
          step="0.1"
          locale="de"
        />
      )

      const numberInput = await NumberInputLocator.find()
      const input = await numberInput.find('input')
      const arrows = await numberInput.findArrowButtons()

      await arrows[1].mouseDown()
      expect(input).to.have.value('2,4')
    })

    it('allows entering "." if the locale uses "." as a decimal delimiter', async () => {
      await mount(
        <NumberInput
          label="Name"
          defaultValue="0"
          step="1"
        />
      )

      const numberInput = await NumberInputLocator.find()
      const input = await numberInput.find('input')

      await input.typeIn('2.1')
      await input.blur()

      expect(input).to.have.value('2.1')
    })

    it('allows entering "," if the locale uses "," as a decimal delimiter', async () => {
      await mount(
        <NumberInput
          label="Name"
          defaultValue="0"
          step="1"
          locale="de"
        />
      )

      const numberInput = await NumberInputLocator.find()
      const input = await numberInput.find('input')

      await input.typeIn('2,1')
      await input.blur()

      expect(input).to.have.value('2,1')
    })

    describe('conditionalFormat', () => {
      it('formats on render when a number value props is given', async () => {
        await mount(
          <NumberInput
            label="Name"
            value={7.3}
            step="1"
            locale="fr"
          />
        )

        const numberInput = await NumberInputLocator.find()
        const input = await numberInput.find('input')

        expect(input).to.have.value('7,3')
      })

      it('does not format on render when a string value prop is given', async () => {
        await mount(
          <NumberInput
            label="Name"
            value="foo"
            step="1"
            locale="fr"
          />
        )

        const numberInput = await NumberInputLocator.find()
        const input = await numberInput.find('input')

        expect(input).to.have.value('foo')
      })

      it('does not format on render when value is falsey', async () => {
        await mount(
          <NumberInput
            label="Name"
            step="1"
            locale="fr"
          />
        )

        const numberInput = await NumberInputLocator.find()
        const input = await numberInput.find('input')

        expect(input).to.have.value('')
      })
    })
  })

  describe('onChange handler', async () => {
    it('receives the raw string value of the input as the second argument', async () => {
      const value = '-12.501,5'
      const onChange = stub()
      await mount(
        <NumberInput
          label="Name"
          defaultValue="0"
          step="1"
          decimalPrecision={2}
          locale="de"
          onChange={onChange}
        />
      )

      const numberInput = await NumberInputLocator.find()
      const input = await numberInput.find('input')

      await input.change({ target: { value } })

      expect(onChange).to.have.been.called()
      expect(onChange.lastCall.args[1]).to.equal(value)
    })

    it('receives the normalized string value of the input as the third argument', async () => {
      const value = '-12.501,5'
      const onChange = stub()
      await mount(
        <NumberInput
          label="Name"
          defaultValue="0"
          step="1"
          decimalPrecision={2}
          locale="de"
          onChange={onChange}
        />
      )

      const numberInput = await NumberInputLocator.find()
      const input = await numberInput.find('input')

      await input.change({ target: { value } })

      expect(onChange).to.have.been.called()
      expect(onChange.lastCall.args[2]).to.equal('-12501.50')
    })

    it("receives null as the third argument if the value can't be parsed", async () => {
      const value = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
      const onChange = stub()
      await mount(
        <NumberInput
          label="Name"
          defaultValue="0"
          step="1"
          decimalPrecision={2}
          locale="de"
          onChange={onChange}
        />
      )

      const numberInput = await NumberInputLocator.find()
      const input = await numberInput.find('input')

      await input.change({ target: { value } })

      expect(onChange).to.have.been.called()
      expect(onChange.lastCall.args[2]).to.be.null()
    })

    it('receives the min value as the third argument if value is less than min', async () => {
      const value = '0'
      const onChange = stub()
      await mount(
        <NumberInput
          label="Name"
          defaultValue="0"
          step="1"
          min={1}
          decimalPrecision={2}
          locale="de"
          onChange={onChange}
        />
      )

      const numberInput = await NumberInputLocator.find()
      const input = await numberInput.find('input')

      await input.change({ target: { value } })

      expect(onChange).to.have.been.called()
      expect(onChange.lastCall.args[2]).to.equal('1.00')
    })

    it('receives the max value as the third argument if value is greater than max', async () => {
      const value = '100'
      const onChange = stub()
      await mount(
        <NumberInput
          label="Name"
          defaultValue="0"
          step="1"
          max={99.9}
          decimalPrecision={2}
          locale="de"
          onChange={onChange}
        />
      )

      const numberInput = await NumberInputLocator.find()
      const input = await numberInput.find('input')

      await input.change({ target: { value } })

      expect(onChange).to.have.been.called()
      expect(onChange.lastCall.args[2]).to.equal('99.90')
    })

    context('when precision not specified', async () => {
      it('includes trailing zeros in third argument', async () => {
        const value = '5,00'
        const onChange = stub()
        await mount(
          <NumberInput
            label="Name"
            defaultValue="0"
            step="1"
            decimalPrecision={null}
            locale="de"
            onChange={onChange}
          />
        )

        const numberInput = await NumberInputLocator.find()
        const input = await numberInput.find('input')

        await input.change({ target: { value } })

        expect(onChange).to.have.been.called()
        expect(onChange.lastCall.args[2]).to.equal('5.00')
      })
    })

    context('when value is less precise than specified precision', async () => {
      it('receives a third argument with trailing zeros', async () => {
        const value = '3.9'
        const onChange = stub()
        await mount(
          <NumberInput
            label="Name"
            defaultValue="0"
            step="1"
            significantDigits={3}
            onChange={onChange}
          />
        )

        const numberInput = await NumberInputLocator.find()
        const input = await numberInput.find('input')

        await input.change({ target: { value } })

        expect(onChange).to.have.been.called()
        expect(onChange.lastCall.args[2]).to.equal('3.90')
      })
    })

    context('when value is more precise than specified precision', async () => {
      it('receives a third argument rounded to the given decimal precision', async () => {
        const value = '9.99'
        const onChange = stub()
        await mount(
          <NumberInput
            label="Name"
            defaultValue="0"
            step="1"
            decimalPrecision={1}
            onChange={onChange}
          />
        )

        const numberInput = await NumberInputLocator.find()
        const input = await numberInput.find('input')

        await input.change({ target: { value } })

        expect(onChange).to.have.been.called()
        expect(onChange.lastCall.args[2]).to.equal('10.0')
      })

      it('receives a third argument rounded to the given significant digits', async () => {
        const value = '9.175'
        const onChange = stub()
        await mount(
          <NumberInput
            label="Name"
            defaultValue="0"
            step="1"
            significantDigits={3}
            onChange={onChange}
          />
        )

        const numberInput = await NumberInputLocator.find()
        const input = await numberInput.find('input')

        await input.change({ target: { value } })

        expect(onChange).to.have.been.called()
        expect(onChange.lastCall.args[2]).to.equal('9.18')
      })
    })
  })

  describe('onBlur formatting', async () => {
    it("should not clean values that can't be parsed into a number", async () => {
      const value = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
      // expect(inputValueOnBlur(value)).to.equal(value)

      await mount(
        <NumberInput
          label="Name"
          defaultValue="0"
          step="1"
          significantDigits={3}
        />
      )

      const numberInput = await NumberInputLocator.find()
      const input = await numberInput.find('input')

      await input.change({ target: { value } })
      await input.blur()

      expect(input).to.have.value(value)
    })

    it('should reject all symbols except for - and the locale decimal delimiter', async () => {
      // locale is set to 'en' so the decimal delimiter is '.'
      const value = '-!"·$%&/()=?¿\'|@0#¢∞¬÷“”≠´`+´ç,^*¨Ç;:_[.]{}„…0'
      await mount(
        <NumberInput
          label="Name"
          defaultValue="0"
          step="1"
        />
      )

      const numberInput = await NumberInputLocator.find()
      const input = await numberInput.find('input')

      await input.change({ target: { value } })
      await input.blur()

      expect(input).to.have.value('0')
    })

    it('should apply the locale specific thousands delimiter', async () => {
      const value = '1234567890'
      await mount(
        <NumberInput
          label="Name"
          defaultValue="0"
          step="1"
          locale="es"
        />
      )

      const numberInput = await NumberInputLocator.find()
      const input = await numberInput.find('input')

      await input.change({ target: { value } })
      await input.blur()

      expect(input).to.have.value('1.234.567.890')
    })

    it('should remove leading zeros', async () => {
      const value = 'aabb0.0.0.1'
      await mount(
        <NumberInput
          label="Name"
          defaultValue="0"
          step="1"
          locale="es"
        />
      )

      const numberInput = await NumberInputLocator.find()
      const input = await numberInput.find('input')

      await input.change({ target: { value } })
      await input.blur()

      expect(input).to.have.value('1')
    })

    it('should leave only the last decimal delimiter', async () => {
      const value = ',1,,2,,,3,,4'
      await mount(
        <NumberInput
          label="Name"
          defaultValue="0"
          step="1"
          locale="fr"
        />
      )

      const numberInput = await NumberInputLocator.find()
      const input = await numberInput.find('input')

      await input.change({ target: { value } })
      await input.blur()

      expect(input).to.have.value('123,4')
    })

    it('should not strip trailing zeros', async () => {
      const value = '1.000'
      await mount(
        <NumberInput
          label="Name"
          defaultValue="0"
          step="1"
        />
      )

      const numberInput = await NumberInputLocator.find()
      const input = await numberInput.find('input')

      await input.change({ target: { value } })
      await input.blur()

      expect(input).to.have.value('1.000')
    })

    context('when value is less precise than specified precision', async () => {
      it('adds trailing zeros', async () => {
        const value = '123'
        await mount(
          <NumberInput
            label="Name"
            defaultValue="0"
            step="1"
            decimalPrecision={2}
          />
        )

        const numberInput = await NumberInputLocator.find()
        const input = await numberInput.find('input')

        await input.change({ target: { value } })
        await input.blur()

        expect(input).to.have.value('123.00')
      })
    })

    context('when value is more precise than specified precision', async () => {
      it('rounds to the given decimal precision', async () => {
        const value = '123.58'
        await mount(
          <NumberInput
            label="Name"
            defaultValue="0"
            step="1"
            decimalPrecision={1}
          />
        )

        const numberInput = await NumberInputLocator.find()
        const input = await numberInput.find('input')

        await input.change({ target: { value } })
        await input.blur()

        expect(input).to.have.value('123.6')
      })

      it('rounds to the given significant digits', async () => {
        const value = '123'
        await mount(
          <NumberInput
            label="Name"
            defaultValue="0"
            step="1"
            significantDigits={2}
          />
        )

        const numberInput = await NumberInputLocator.find()
        const input = await numberInput.find('input')

        await input.change({ target: { value } })
        await input.blur()

        expect(input).to.have.value('120')
      })
    })

    context('when the specified precision is 0', async () => {
      it('rounds the decimal precision to 0', async () => {
        const value = '123.93'
        await mount(
          <NumberInput
            label="Name"
            defaultValue="0"
            step="1"
            decimalPrecision={0}
          />
        )

        const numberInput = await NumberInputLocator.find()
        const input = await numberInput.find('input')

        await input.change({ target: { value } })
        await input.blur()

        expect(input).to.have.value('124')
      })
    })

    context('when value is negative and min is 0', async () => {
      it('sets the value to 0', async () => {
        const value = '-1'
        await mount(
          <NumberInput
            label="Name"
            defaultValue="0"
            step="1"
            min={0}
          />
        )

        const numberInput = await NumberInputLocator.find()
        const input = await numberInput.find('input')

        await input.change({ target: { value } })
        await input.blur()

        expect(input).to.have.value('0')
      })
    })

    context('when value is positive and max is 0', async () => {
      it('sets the value to 0', async () => {
        const value = '1'
        await mount(
          <NumberInput
            label="Name"
            defaultValue="0"
            step="1"
            max={0}
          />
        )

        const numberInput = await NumberInputLocator.find()
        const input = await numberInput.find('input')

        await input.change({ target: { value } })
        await input.blur()

        expect(input).to.have.value('0')
      })
    })
  })

  it('should accept a default value', async () => {
    await mount(
      <NumberInput
        label="Name"
        defaultValue="7"
        step="1"
      />
    )

    const numberInput = await NumberInputLocator.find()
    const input = await numberInput.find('input')

    expect(input).to.have.value('7')
  })

  it('should include a label', async () => {
    await mount(
      <NumberInput
        label="Name"
        defaultValue="7"
        step="1"
      />
    )

    const label = await find('label')
    expect(label).to.exist()
  })

  it('should focus the input when focus is called', async () => {
    let ref
    await mount(
      <NumberInput
        label="Name"
        defaultValue="7"
        step="1"
        componentRef={el => ref = el}
      />
    )

    const numberInput = await NumberInputLocator.find()

    ref.focus()

    expect(numberInput.containsFocus()).to.be.true()
  })

  it('should provide an inputRef prop', async () => {
    const inputRef = stub()
    await mount(
      <NumberInput
        label="Name"
        defaultValue="7"
        step="1"
        inputRef={inputRef}
      />
    )

    const numberInput = await NumberInputLocator.find()
    const input = await numberInput.find('input')

    expect(inputRef).to.have.been.calledWith(input.getDOMNode())
  })

  it('should provide a value getter', async () => {
    let ref
    await mount(
      <NumberInput
        label="Name"
        defaultValue="9.7"
        step="1"
        componentRef={el => ref = el}
      />
    )

    expect(ref.value).to.equal('9.7')
  })

  it('displays the number 0 passed as value prop', async () => {
    await mount(
      <NumberInput
        label="Name"
        value={0}
      />
    )

    const numberInput = await NumberInputLocator.find()
    const input = await numberInput.find('input')

    expect(input).to.have.value('0')
  })

  it('passes props through to input element', async () => {
    await mount(
      <NumberInput
        label="Name"
        data-automation="foo"
      />
    )

    const numberInput = await NumberInputLocator.find()
    const input = await numberInput.find('input')

    expect(input.getDOMNode().dataset.automation).to.equal('foo')
  })

  describe('events', async () => {
    it('up arrow responds to clicks', async () => {
      const onChange = stub()
      await mount(
        <NumberInput
          label="Name"
          defaultValue="0"
          step="1"
          onChange={onChange}
        />
      )

      const numberInput = await NumberInputLocator.find()
      const input = await numberInput.find('input')

      const arrows = await numberInput.findArrowButtons()

      await arrows[0].mouseDown()

      expect(onChange).to.have.been.called()
      expect(onChange.firstCall.args[1]).to.equal('1')
      expect(onChange.firstCall.args[2]).to.equal('1')
      expect(input).to.have.value('1')
    })

    it('down arrow responds to clicks', async () => {
      const onChange = stub()
      await mount(
        <NumberInput
          label="Name"
          defaultValue="0"
          step="1"
          onChange={onChange}
        />
      )

      const numberInput = await NumberInputLocator.find()
      const input = await numberInput.find('input')

      const arrows = await numberInput.findArrowButtons()

      await arrows[1].mouseDown()

      expect(onChange).to.have.been.called()
      expect(onChange.firstCall.args[1]).to.equal('-1')
      expect(onChange.firstCall.args[2]).to.equal('-1')
      expect(input).to.have.value('-1')
    })

    it('responds to onChange event', async () => {
      const onChange = stub()
      await mount(
        <NumberInput
          label="Name"
          defaultValue="0"
          step="1"
          onChange={onChange}
        />
      )

      const numberInput = await NumberInputLocator.find()
      const input = await numberInput.find('input')

      await input.change({ target: { value: '1'} })

      expect(onChange).to.have.been.called()
    })

    it('responds to onKeyDown event', async () => {
      const onKeyDown = stub()
      await mount(
        <NumberInput
          label="Name"
          defaultValue="0"
          step="1"
          onKeyDown={onKeyDown}
        />
      )

      const numberInput = await NumberInputLocator.find()
      const input = await numberInput.find('input')

      await input.keyDown('up')

      expect(onKeyDown).to.have.been.called()
    })

    it('responds to onBlur event', async () => {
      const onBlur = stub()
      await mount(
        <NumberInput
          label="Name"
          defaultValue="0"
          step="1"
          onBlur={onBlur}
        />
      )

      const numberInput = await NumberInputLocator.find()
      const input = await numberInput.find('input')

      await input.blur()

      expect(onBlur).to.have.been.called()
    })

    it('responds to onFocus event', async () => {
      const onFocus = stub()
      await mount(
        <NumberInput
          label="Name"
          defaultValue="0"
          step="1"
          onFocus={onFocus}
        />
      )

      const numberInput = await NumberInputLocator.find()
      const input = await numberInput.find('input')

      await input.focus()

      expect(onFocus).to.have.been.called()
    })
  })

  context('when controlled', async () => {
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

    it('allows negative numbers to be typed into the input', async () => {
      await mount(
        <Example />
      )

      const numberInput = await NumberInputLocator.find()
      const input = await numberInput.find('input')

      await input.change({ target: { value: '-' } })
      expect(input).to.have.value('-')

      await input.change({ target: { value: '-1' } })
      expect(input).to.have.value('-1')
    })

    it('allows periods to be typed into the input', async () => {
      await mount(
        <Example />
      )

      const numberInput = await NumberInputLocator.find()
      const input = await numberInput.find('input')

      await input.change({ target: { value: '.' } })
      expect(input).to.have.value('.')

      await input.change({ target: { value: '.5' } })
      expect(input).to.have.value('.5')
    })

    it('allows commas to be typed into the input', async () => {
      await mount(
        <Example />
      )

      const numberInput = await NumberInputLocator.find()
      const input = await numberInput.find('input')

      await input.change({ target: { value: ',' } })
      expect(input).to.have.value(',')

      await input.change({ target: { value: ',5' } })
      expect(input).to.have.value(',5')
    })

    it('formats the value according to the locale on blur', async () => {
      const value = '12345,6789'
      await mount(
        <Example locale="de" />
      )

      const numberInput = await NumberInputLocator.find()
      const input = await numberInput.find('input')

      await input.change({ target: { value } })
      expect(input).to.have.value(value)

      await input.blur()

      expect(input).to.have.value('12.345,6789')
    })

    it('sets the value to the specified precision on blur', async () => {
      const value = '102'
      await mount(
        <Example significantDigits={2} />
      )

      const numberInput = await NumberInputLocator.find()
      const input = await numberInput.find('input')

      await input.change({ target: { value } })
      expect(input).to.have.value(value)

      await input.blur()

      expect(input).to.have.value('100')
    })
  })

  describe('componentWillReceiveProps', async () => {
    it('updates value if locale changes', async () => {
      const onChange = stub()
      const subject = await mount(
        <NumberInput
          label="Name"
          defaultValue="0"
          step="1"
          locale="en"
          onChange={onChange}
        />
      )

      const numberInput = await NumberInputLocator.find()
      const input = await numberInput.find('input')

      input.getDOMNode().value = '1234.5'

      await subject.setProps({ locale: 'de' })

      expect(input).to.have.value('1.234,5')

      expect(onChange.lastCall.args[1]).to.equal('1.234,5')
      expect(onChange.lastCall.args[2]).to.equal('1234.5')
    })

    it('updates value if precision changes', async () => {
      const onChange = stub()
      const subject = await mount(
        <NumberInput
          label="Name"
          defaultValue="0"
          step="1"
          significantDigits={3}
          onChange={onChange}
        />
      )

      const numberInput = await NumberInputLocator.find()
      const input = await numberInput.find('input')

      await input.focus()
      await input.typeIn('12.5')
      await input.blur()

      await subject.setProps({ decimalPrecision: 2, significantDigits: null })

      expect(input).to.have.value('12.50')

      expect(onChange.lastCall.args[1]).to.equal('12.50')
      expect(onChange.lastCall.args[2]).to.equal('12.50')
    })
  })

  describe('for a11y', async () => {
    it('should meet standards', async () => {
      await mount(
        <NumberInput
          label="Name"
          defaultValue="0"
          step="1"
        />
      )

      const numberInput = await NumberInputLocator.find()

      expect(await numberInput.accessible()).to.be.true()
    })

    it('should set aria-invalid when errors prop is set', async () => {
      await mount(
        <NumberInput
          label="Name"
          defaultValue="0"
          step="1"
          messages={ [{ type: 'error', text: 'some error message' }]}
        />
      )

      const numberInput = await NumberInputLocator.find()
      const input = await numberInput.find('input')

      expect(input.getAttribute('aria-invalid')).to.exist()
    })
  })
})
