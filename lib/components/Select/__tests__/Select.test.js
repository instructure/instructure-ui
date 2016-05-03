import Select from '../index'
import React from 'react'

describe('<Select />', function () {
  const testbed = createTestbed(Select, {
    label: 'Foobar',
    children: [
      <option value="foo" key="foo">Foo</option>,
      <option value="bar" key="bar" disabled>Bar</option>
    ]
  })

  /*
   * Leaving this low value test to ensure the defaults above yield a valid
   * component.
   */
  it('should render', function () {
    testbed.render()

    expect(testbed.dom.node).to.exist
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
    testbed.render()

    expect(testbed.dom.find('label')).to.exist
  })

  describe('events', function () {
    it('responds to onChange event', function () {
      const onChange = testbed.sandbox.stub()

      testbed.render({
        children: [
          <option value="foo" key="foo">Foo</option>,
          <option id="bar" value="bar" key="bar">Bar</option>,
          <option value="baz" key="baz">Baz</option>
        ],
        onChange
      })

      testbed.dom.find('select').change()

      expect(onChange).to.have.been.called
    })

    it('responds to onBlur event', function () {
      const onBlur = testbed.sandbox.stub()

      testbed.render({
        onBlur
      })

      testbed.dom.find('select').blur()

      expect(onBlur).to.have.been.called
    })

    it('responds to onFocus event', function () {
      const onFocus = testbed.sandbox.stub()

      testbed.render({
        onFocus
      })

      testbed.dom.find('select').focus()

      expect(onFocus).to.have.been.called
    })
  })

  describe('for a11y', function () {
    it('should meet standards', function (done) {
      testbed.render()

      testbed.checkA11yStandards(done, {
        ignores: [  /* add a11y standards rules to ignore here (https://dequeuniversity.com/rules/axe) */ ]
      })
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
