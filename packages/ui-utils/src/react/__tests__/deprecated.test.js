import React, { Component } from 'react'
import PropTypes from 'prop-types'

import deprecated from '../deprecated'

@deprecated('2.1.0', {
  foo: 'bar',
  baz: true
})
class TestComponent extends Component {
  static propTypes = {
    bar: PropTypes.string, // eslint-disable-line react/require-default-props
    qux: PropTypes.string
  }

  static defaultProps = {
    qux: 'Hello'
  }

  render () {
    return <div>{this.props.qux} {this.props.bar}</div>
  }
}

describe('@deprecated', () => {
  const testbed = new Testbed(<TestComponent />)

  it('should warn when suggesting new prop when using old prop', () => {
    console.warn = testbed.spy()

    testbed.render({
      foo: 'Jane'
    })

    console.warn
      .should.have.been.calledWithExactly('Warning: %s was deprecated in %s%s', 'foo', '2.1.0', ' use bar instead')
  })

  it('should warn when using old prop with no new prop', () => {
    console.warn = testbed.spy()

    testbed.render({
      baz: 'Goodbye'
    })

    console.warn
      .should.have.been.calledWithExactly('Warning: %s was deprecated in %s%s', 'baz', '2.1.0', '')
  })

  it('should not output a warning using new prop', () => {
    console.warn = testbed.spy()

    testbed.render({
      bar: 'Jane'
    })

    console.warn.should.not.have.been.called
  })
})
