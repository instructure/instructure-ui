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

  it('should throw suggesting new prop when using old prop', () => {
    expect(() => {
      testbed.render({
        foo: 'Jane'
      })
    }).to.throw('foo was deprecated in 2.1.0 use bar instead')
  })

  it('should throw using old prop with no new prop', () => {
    expect(() => {
      testbed.render({
        baz: 'Goodbye'
      })
    }).to.throw('baz was deprecated in 2.1.0')
  })

  it('should not throw using new prop', () => {
    expect(() => {
      testbed.render({
        bar: 'Jane'
      }).to.not.throw
    })
  })
})
