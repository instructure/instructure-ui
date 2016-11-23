import Select from '../index'
import React from 'react'

describe('<Select />', function () {
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
  it('should render select element', function () {
    const subject = testbed.render()

    expect(subject.find('select').length).to.equal(1)
  })

  it('should render option elements', function () {
    const subject = testbed.render()

    expect(subject.find('option').length).to.equal(3)
  })

  it('should reject children that are not option tags', function () {
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

  it('should include a label', function () {
    const subject = testbed.render()

    expect(subject.find('label').length).to.equal(1)
  })

  it('should provide a selectRef prop', function () {
    const selectRef = testbed.sandbox.stub()
    const subject = testbed.render({
      selectRef
    })

    expect(selectRef).to.have.been.calledWith(subject.find('select').unwrap())
  })

  it('should provide a value getter', function () {
    const subject = testbed.render({
      defaultValue: 'bar'
    })

    expect(subject.unwrap().value).to.equal('bar')
  })

  describe('events', function () {
    it('responds to onChange event', function () {
      const onChange = testbed.sandbox.stub()

      const subject = testbed.render({
        onChange
      })

      subject.find('select').trigger('change')

      expect(onChange).to.have.been.called
    })

    it('responds to onBlur event', function () {
      const onBlur = testbed.sandbox.stub()

      const subject = testbed.render({
        onBlur
      })

      subject.find('select').trigger('blur')

      expect(onBlur).to.have.been.called
    })

    it('responds to onFocus event', function () {
      const onFocus = testbed.sandbox.stub()

      const subject = testbed.render({
        onFocus
      })

      subject.find('select').trigger('focus')

      expect(onFocus).to.have.been.called
    })
  })

  describe('when disabled', function () {
    it('should not respond to the onChange event', function () {
      const onChange = testbed.sandbox.stub()

      const subject = testbed.render({
        disabled: true,
        onChange
      })

      subject.find('select').trigger('change')

      expect(onChange).to.not.have.been.called
    })
  })

  describe('for a11y', function () {
    it('should meet standards', function (done) {
      const subject = testbed.render()

      subject.should.be.accessible(done)
    })

    it('should require a label', function () {
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
