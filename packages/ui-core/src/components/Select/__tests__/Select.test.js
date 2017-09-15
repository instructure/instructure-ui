import React from 'react'
import Select from '../index'

describe('<Select />', () => {
  const testbed = new Testbed(
    <Select label="Foobar">
      <option value="foo">Foo</option>
      <option value="bar">Bar</option>
      <option value="baz">Baz</option>
    </Select>
  )

  /*
   * Leaving this low value test to ensure the defaults above yield a valid
   * component.
   */
  it('should render select element', () => {
    const subject = testbed.render()

    expect(subject.find('select').length).to.equal(1)
  })

  it('should render option elements', () => {
    const subject = testbed.render()

    expect(subject.find('option').length).to.equal(3)
  })

  it('should reject children that are not option tags', () => {
    let error = true
    try {
      testbed.render({
        children: [
          <h2>Invalid!!!</h2>
        ]
      })
    } catch (e) {
      error = true
    }
    expect(error).to.be.true
  })

  it('should include a label', () => {
    const subject = testbed.render()

    expect(subject.find('label').length).to.equal(1)
  })

  it('should provide a selectRef prop', () => {
    const selectRef = testbed.stub()
    const subject = testbed.render({
      selectRef
    })

    expect(selectRef).to.have.been.calledWith(subject.find('select').unwrap())
  })

  it('should provide a value getter', () => {
    const subject = testbed.render({
      defaultValue: 'bar'
    })

    expect(subject.instance().value).to.equal('bar')
  })

  it('sets invalid when error messages are present', () => {
    const subject = testbed.render({
      messages: [
        { text: 'Invalid name', type: 'error' }
      ]
    })

    expect(subject.instance().invalid).to.be.true
  })

  it('provides a focused getter', () => {
    const subject = testbed.render()

    subject.instance().focus()

    expect(subject.instance().focused).to.be.true
  })

  describe('events', () => {
    it('responds to onChange event', () => {
      const onChange = testbed.stub()

      const subject = testbed.render({
        onChange
      })

      subject.find('select').simulate('change')

      expect(onChange).to.have.been.called
    })

    it('responds to onBlur event', () => {
      const onBlur = testbed.stub()

      const subject = testbed.render({
        onBlur
      })

      subject.find('select').simulate('blur')

      expect(onBlur).to.have.been.called
    })

    it('responds to onFocus event', () => {
      const onFocus = testbed.stub()

      const subject = testbed.render({
        onFocus
      })

      subject.find('select').simulate('focus')

      expect(onFocus).to.have.been.called
    })

    it('responds to onKeyDown event', () => {
      const onKeyDown = testbed.stub()

      const subject = testbed.render({
        onKeyDown
      })

      subject.find('select').keyDown('a')

      expect(onKeyDown).to.have.been.called
    })
  })

  describe('when disabled', () => {
    it('should not respond to the onChange event', () => {
      const onChange = testbed.stub()

      const subject = testbed.render({
        disabled: true,
        onChange
      })

      subject.find('select').simulate('change')

      expect(onChange).to.not.have.been.called
    })

    it('should not respond to onKeyDown event', () => {
      const onKeyDown = testbed.stub()

      const subject = testbed.render({
        disabled: true,
        onKeyDown
      })

      subject.find('select').keyDown('a')

      expect(onKeyDown).to.not.have.been.called
    })
  })

  describe('for a11y', () => {
    it('should meet standards', (done) => {
      const subject = testbed.render()

      subject.should.be.accessible(done)
    })

    it('should require a label', () => {
      let error = true
      try {
        testbed.render({
          label: null
        })
      } catch (e) {
        error = true
      }
      expect(error).to.be.true
    })
  })
})
