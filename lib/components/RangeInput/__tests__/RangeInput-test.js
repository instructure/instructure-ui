import React from 'react'
import TestUtils from 'react-addons-test-utils'
import ReactDom from 'react-dom'
import RangeInput from '../index'

let root
let subject

const render = function (props) {
  props = Object.assign({
    labelText: 'Opacity',
    defaultValue: 25,
    name: 'opacity',
    max: 100,
    min: 0
  }, props || {})
  subject = ReactDom.render(
    <RangeInput {...props} />,
    root
  )
}

const findByTag = function (tag) {
  return TestUtils.findRenderedDOMComponentWithTag(subject, tag)
}

describe('ic-range-input', function () {
  beforeEach(function () {
    root = document.createElement('div')
    document.body.appendChild(root)
  })

  afterEach(function () {
    ReactDom.unmountComponentAtNode(root)
    document.body.removeChild(root)
    subject = null
  })

  it('renders an input with type range', function () {
    render()

    expect(findByTag('input').type).to.equal('range')
  })

  it('renders an output element with the defaultValue', function () {
    render({
      defaultValue: 50
    })

    expect(findByTag('output').textContent).to.equal('50')
  })

  it('formats the value displayed in the output element', function () {
    render({
      defaultValue: 45,
      formatValue: function (value) {
        return value + '%'
      }
    })

    expect(findByTag('output').textContent).to.equal('45%')
  })
})
