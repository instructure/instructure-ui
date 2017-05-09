import React from 'react'
import NumberInput, { cleanValue, applyStep } from '../index'
import styles from '../styles.css'

describe('<NumberInput />', function () {
  const testbed = new Testbed(
    <NumberInput label="Name" />
  )

  describe('NumberInput.cleanValue', function () {
    it('should clean letter characters', function () {
      const value = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
      expect(cleanValue(value)).to.equal('')
    })

    it('should all symbols except for - and .', function () {
      const value = '!"·$%&/()=?¿\'|-@#¢∞¬÷“”≠´`+´ç,^*¨Ç;:_[.]{}„…'
      expect(cleanValue(value)).to.equal('-.')
    })

    it('should allow only one minus sign when in not behind numbers', function () {
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

    it('should allow only one dot', function () {
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

  describe('NumberInput.applyStep', function () {
    it('should add and substract step', function () {
      expect(applyStep('0', '1', 1)).to.equal('1')
      expect(applyStep('0', '1', -1)).to.equal('-1')
      expect(applyStep('2', '2', 1)).to.equal('4')
      expect(applyStep('3', '1.5', -1)).to.equal('1.5')
    })

    it('should assume value is 0 when given no value', function () {
      expect(applyStep(null, '1', 1)).to.equal('1')
      expect(applyStep(null, '1', -1)).to.equal('-1')
      expect(applyStep(null, '123', 1)).to.equal('123')
      expect(applyStep(null, '123', -1)).to.equal('-123')
    })

    it('should limit min if given', function () {
      expect(applyStep('-9', '1', -1, '-10')).to.equal('-10')
      expect(applyStep('-10', '1', -1, '-10')).to.equal('-10')
      expect(applyStep('0', '1', -1, '0')).to.equal('0')
    })

    it('should snap to the next step when value doesn\'t match the step increments', function () {
      expect(applyStep('2.5', '1', 1, null)).to.equal('3')
      expect(applyStep('2.5', '1', -1, null)).to.equal('2')
    })

    it('should not change if value is already smaller than min and dir is -1', function () {
      expect(applyStep('-99', '1', -1, '-10')).to.equal('-99')
    })

    it('should snap value to min when it is already smaller than min and dir is 1', function () {
      expect(applyStep('-99', '1', 1, '-10')).to.equal('-10')
    })

    it('should limit max if given', function () {
      expect(applyStep('6', '1', 1, null, '7')).to.equal('7')
      expect(applyStep('7', '1', 1, null, '7')).to.equal('7')
    })

    it('should not change if value is already greater than max and dir is 1', function () {
      expect(applyStep('99', '1', 1, null, '10')).to.equal('99')
    })

    it('should snap value to max when it is already greater than max and dir is -1', function () {
      expect(applyStep('99', '1', -1, null, '10')).to.equal('10')
    })

    it('should use min when given as the base for step', function () {
      expect(applyStep('1', '0.11', 1, '1')).to.equal('1.11')
      expect(applyStep('0', '0.11', 1, '0')).to.equal('0.11')
      expect(applyStep('-1', '0.3', 1, '-1')).to.equal('-0.7')
      expect(applyStep('5.25', '1', -1, '-2.75')).to.equal('4.25')
    })

    it('should not pass over max it when the last step doesn\'t match', function () {
      expect(applyStep('2', '1', 1, null, '2.75')).to.equal('2')
      expect(applyStep('3.4', '0.4', 1, '3', '3.6')).to.equal('3.4')
    })
  })

  it('should accept a default value', function () {
    const subject = testbed.render({
      defaultValue: '7'
    })

    expect(subject.find('input').getDOMNode().value)
      .to.equal('7')
  })

  it('should include a label', function () {
    const subject = testbed.render()

    expect(subject.find('label').length).to.equal(1)
  })

  it('should focus the input when focus is called', function () {
    const subject = testbed.render()

    subject.instance().focus()

    expect(subject.find('input').focused()).to.be.true
  })

  it('should provide an inputRef prop', function () {
    const inputRef = testbed.stub()
    const subject = testbed.render({
      inputRef
    })

    expect(inputRef).to.have.been.calledWith(subject.find('input').unwrap())
  })

  it('should provide a value getter', function () {
    const subject = testbed.render({
      defaultValue: '9.7'
    })

    expect(subject.instance().value).to.equal('9.7')
  })

  describe('events', function () {
    it('up arrow responds to clicks', function () {
      const onChange = testbed.stub()

      const subject = testbed.render({
        onChange
      })

      subject.find(`.${styles.arrow}`).first().simulate('click')

      expect(onChange).to.have.been.called
      expect(subject.find('input').getDOMNode().value).to.equal('1')
    })

    it('down arrow responds to clicks', function () {
      const onChange = testbed.stub()

      const subject = testbed.render({
        onChange
      })

      subject.find(`.${styles.arrow}`).last().simulate('click')

      expect(onChange).to.have.been.called
      expect(subject.find('input').getDOMNode().value).to.equal('-1')
    })

    it('responds to onChange event', function () {
      const onChange = testbed.stub()

      const subject = testbed.render({
        onChange
      })

      subject.find('input').simulate('change')

      expect(onChange).to.have.been.called
    })

    it('responds to onKeyDown event', function () {
      const onKeyDown = testbed.stub()

      const subject = testbed.render({
        onKeyDown
      })

      subject.find('input').simulate('keydown', { key: 'ArrowUp' })

      expect(onKeyDown).to.have.been.called
    })

    it('responds to onBlur event', function () {
      const onBlur = testbed.stub()

      const subject = testbed.render({
        onBlur
      })

      subject.find('input').simulate('blur')

      expect(onBlur).to.have.been.called
    })

    it('responds to onFocus event', function () {
      const onFocus = testbed.stub()

      const subject = testbed.render({
        onFocus
      })

      subject.find('input').simulate('focus')

      expect(onFocus).to.have.been.called
    })
  })

  describe('for a11y', function () {
    it('should meet standards', function (done) {
      const subject = testbed.render()

      subject.should.be.accessible(done)
    })

    it('should set aria-invalid when errors prop is set', function () {
      const subject = testbed.render({
        messages: [{ type: 'error', text: 'some error message' }]
      })

      expect(subject.find('input').getAttribute('aria-invalid'))
        .to.exist
    })
  })
})
