import React from 'react'
import TextInput from '../index'

describe('TextInput', function () {
  const testbed = createTestbed(
    <TextInput label="Name" />
  )

  it('should accept a default value', function () {
    const subject = testbed.render({
      defaultValue: 'Tom Servo'
    })

    expect(subject.find('input').dom().value)
      .to.equal('Tom Servo')
  })

  it('should include a label', function () {
    const subject = testbed.render()

    expect(subject.find('label').length).to.equal(1)
  })

  it('should focus the input when focus is called', function () {
    const subject = testbed.render()

    subject.unwrap().focus()

    expect(subject.find('input').dom()).to.equal(document.activeElement)
  })

  describe('for a11y', function () {
    it('should meet standards', function (done) {
      const subject = testbed.render()

      subject.should.be.accessible(done)
    })

    it('should render the placeholder text in a describedby element', function () {
      const subject = testbed.render({
        placeholder: 'some hint text'
      })

      const describedbyId = subject.find('input').getAttribute('aria-describedby')

      expect(subject.find('#' + describedbyId).text())
        .to.equal('some hint text')
    })

    it('should render the errors text in a describedby element', function () {
      const subject = testbed.render({
        errors: ['some error message']
      })

      const describedbyId = subject.find('input').getAttribute('aria-describedby')

      expect(subject.find('#' + describedbyId).text())
        .to.equal('some error message')
    })

    it('should set aria-invalid when errors prop is set', function () {
      const subject = testbed.render({
        errors: ['some error message']
      })

      expect(subject.find('input').getAttribute('aria-invalid'))
        .to.exist
    })
  })
})
