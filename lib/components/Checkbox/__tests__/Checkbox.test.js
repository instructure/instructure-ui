import Checkbox from '../index'

describe('<Checkbox />', function () {
  const testbed = createTestbed(Checkbox, {
    label: 'fake label',
    value: 'someValue',
    name: 'someName'
  })

  it('renders an input with type "checkbox"', function () {
    testbed.render()

    expect(testbed.dom.find('input').node.type)
      .to.equal('checkbox')
  })

  describe('events', function () {
    it('responds to onClick event', function () {
      const onClick = testbed.sandbox.stub()

      testbed.render({
        onClick
      })

      testbed.dom.find('input').click()

      expect(onClick).to.have.been.called
    })

    it('responds to onChange event', function () {
      const onChange = testbed.sandbox.stub()

      testbed.render({
        onChange
      })

      testbed.dom.find('input').change()

      expect(onChange).to.have.been.called
    })

    it('does not respond to onChange event when disabled', function () {
      const onChange = testbed.sandbox.stub()

      testbed.render({
        disabled: true,
        onChange
      })

      testbed.dom.find('input').click()

      expect(onChange).to.not.have.been.called
    })

    it('responds to onBlur event', function () {
      const onBlur = testbed.sandbox.stub()

      testbed.render({
        onBlur
      })

      testbed.dom.find('input').blur()

      expect(onBlur).to.have.been.called
    })

    it('responds to onFocus event', function () {
      const onFocus = testbed.sandbox.stub()

      testbed.render({
        onFocus
      })

      testbed.dom.find('input').focus()

      expect(onFocus).to.have.been.called
    })
  })

  describe('for a11y', function () {
    it('`simple` variant should meet standards', function (done) {
      testbed.render({
        variant: 'simple'
      })

      testbed.checkA11yStandards(done)
    })

    it('`toggle` variant should meet standards', function (done) {
      testbed.render({
        variant: 'toggle'
      })

      testbed.checkA11yStandards(done, {
        ignores: [ 'color-contrast' ] /* the success color doesn't meet the wcag2aa rules */
      })
    })

    it('should require a label', function () {
      let error = false
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
