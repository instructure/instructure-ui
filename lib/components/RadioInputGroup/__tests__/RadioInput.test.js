import { RadioInput } from '../index'

describe('<RadioInput />', function () {
  const testbed = createTestbed(RadioInput, {
    label: 'fake label',
    value: 'someValue',
    name: 'someName',
    labelledBy: 'somelabelId'
  })

  it('renders an input with type "radio"', function () {
    testbed.render()

    expect(testbed.dom.find('input').node.type)
      .to.equal('radio')
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

    it('does not respond to onClick event when disabled', function () {
      const onClick = testbed.sandbox.stub()

      testbed.render({
        disabled: true,
        onClick
      })

      testbed.dom.find('input').click()

      expect(onClick).to.not.have.been.called
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
    it('should meet standards', function (done) {
      testbed.render()

      testbed.checkA11yStandards(done)
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
