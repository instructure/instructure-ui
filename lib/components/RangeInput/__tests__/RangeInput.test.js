import RangeInput from '../index'

describe('<RangeInput />', function () {
  const testbed = createTestbed(RangeInput, {
    labelText: 'Opacity',
    name: 'opacity',
    max: 100,
    min: 0
  })

  it('renders an input with type "range"', function () {
    testbed.render()

    expect(testbed.dom.find('input').node.type)
      .to.equal('range')
  })

  it('displays the default value', function () {
    testbed.render({
      defaultValue: 50
    })

    expect(testbed.dom.find('output').node.textContent.trim())
      .to.equal('50')
  })

  it('requires an `onChange` prop with a `value` prop', function () {
    let error = false
    try {
      testbed.render({
        value: 'banana'
      })
    } catch (e) {
      error = true
    }

    expect(error).to.be.true
  })

  it('formats the value displayed', function () {
    testbed.render({
      defaultValue: 45,
      formatValue: function (value) {
        return value + '%'
      }
    })

    expect(testbed.dom.find('output').node.textContent.trim())
      .to.equal('45%')
  })

  describe('for a11y', function () {
    it('should meet standards', function (done) {
      testbed.render({
        defaultValue: 50
      })

      testbed.checkA11yStandards(done)
    })

    it('sets the input role to "slider"', function () {
      testbed.render({
        defaultValue: 50
      })

      expect(testbed.dom.find('input').node.getAttribute('role'))
        .to.equal('slider')
    })

    it('sets the aria-valuenow attribute', function () {
      testbed.render({
        defaultValue: 40
      })

      expect(testbed.dom.find('input').node.getAttribute('aria-valuenow'))
        .to.equal('40')
    })

    it('sets the aria-valuemin attribute', function () {
      testbed.render({
        min: 20
      })

      expect(testbed.dom.find('input').node.getAttribute('aria-valuemin'))
        .to.equal('20')
    })

    it('sets the aria-valuemax attribute', function () {
      testbed.render({
        max: 80
      })

      expect(testbed.dom.find('input').node.getAttribute('aria-valuemax'))
        .to.equal('80')
    })

    it('formats the aria-valuetext attribute', function () {
      testbed.render({
        defaultValue: 40,
        formatValue: function (value) {
          return value + '%'
        }
      })

      expect(testbed.dom.find('input').node.getAttribute('aria-valuetext'))
        .to.equal('40%')
    })
  })

  describe('when the input value changes', function () {
    it('should update the value displayed', function () {
      testbed.render({
        defaultValue: 50
      })

      const input = testbed.dom.find('input')

      setValue(input, 30)

      expect(testbed.dom.find('output').node.textContent.trim())
        .to.equal('30')
      expect(input.node.getAttribute('aria-valuenow'))
        .to.equal('30')
    })

    it('should call the onChange prop', function () {
      const onChange = testbed.sandbox.stub()

      testbed.render({
        defaultValue: 50,
        onChange
      })

      setValue(testbed.dom.find('input'), 30)

      expect(onChange).to.have.been.calledWith('30')
    })

    it('should not update the input value when the value prop is set', function () {
      const component = testbed.render({
        value: 0
      })

      setValue(testbed.dom.find('input'), 30)

      expect(component.value).to.equal(0)
    })
  })
})

/*
 Note: this normally wouldn't be required, but this component
 has a hack to workaround a react bug and browser inconsistencies
 in handling events with input[type="range"] so we have to fire native
 events instead of using the React test utilities to simulate them
*/
function setValue (input, value) {
  /* eslint-disable no-param-reassign */
  input.node.value = value
  /* eslint-enable no-param-reassign */

  /* workaround for https://github.com/facebook/react/issues/554 */
  input.dispatchNativeEvent('change')
  input.dispatchNativeEvent('input')
}

