import React, { Component } from 'react'
import PropTypes from 'prop-types'

import deprecated from '../deprecated'

@deprecated('2.1.0', {
  foo: 'bar',
  baz: true
})
class TestComponent extends Component {
  static propTypes = {
    bar: PropTypes.string,
    qux: PropTypes.string
  }

  static defaultProps = {
    qux: 'Hello'
  }

  render () {
    return <div>{this.props.qux} {this.props.bar}</div>
  }
}

describe('@deprecated', function () {
  const testbed = new Testbed(<TestComponent />)

  it('should throw suggesting new prop when using old prop', function () {
    expect(function () {
      testbed.render({
        foo: 'Jane'
      })
    }).to.throw('foo was deprecated in 2.1.0 use bar instead')
  })

  it('should throw using old prop with no new prop', function () {
    expect(function () {
      testbed.render({
        baz: 'Goodbye'
      })
    }).to.throw('baz was deprecated in 2.1.0')
  })

  it('should not throw using new prop', function () {
    expect(function () {
      testbed.render({
        bar: 'Jane'
      }).to.not.throw
    })
  })
})
