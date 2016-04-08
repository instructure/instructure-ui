import TextInput from '../index'

describe('TextInput', function () {
  const testbed = createTestbed(TextInput, {
    label: 'Name'
  })

  it('should accept a default value', function () {
    testbed.render({
      defaultValue: 'Tom Servo'
    })

    expect(testbed.dom.find('input').node.value)
      .to.equal('Tom Servo')
  })

  it('should include a label', function () {
    testbed.render()

    expect(testbed.dom.find('label')).to.exist
  })

  describe('for a11y', function () {
    it('should meet standards', function (done) {
      testbed.render()

      testbed.checkA11yStandards(done)
    })
    it('should render the placeholder text in a describedby element', function () {
      testbed.render({
        placeholder: 'some hint text'
      })

      const describedbyId = testbed.dom.find('input').node.getAttribute('aria-describedby')
      const describedbyEl = testbed.dom.find('#' + describedbyId).node

      expect(testbed.getText(describedbyEl))
        .to.equal('some hint text')
    })

    it('should render the errors text in a describedby element', function () {
      testbed.render({
        errors: ['some error message']
      })

      const describedbyId = testbed.dom.find('input').node.getAttribute('aria-describedby')
      const describedbyEl = testbed.dom.find('#' + describedbyId).node

      expect(testbed.getText(describedbyEl))
        .to.equal('some error message')
    })

    it('should set aria-invalid when errors prop is set', function () {
      testbed.render({
        errors: ['some error message']
      })

      expect(testbed.dom.find('input').node.getAttribute('aria-invalid'))
        .to.exist
    })
  })
})
