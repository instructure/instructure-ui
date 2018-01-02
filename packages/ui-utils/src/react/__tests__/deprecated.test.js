import React, { Component } from 'react'
import PropTypes from 'prop-types'

import deprecated, { changedPackageWarning } from '../deprecated'

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
  describe('deprecated props', () => {
    const DeprecatedComponent = deprecated('2.1.0', {
      foo: 'bar',
      baz: true
    })(TestComponent)

    const testbed = new Testbed(<DeprecatedComponent />)

    it('should warn when suggesting new prop when using old prop', () => {
      const spy = testbed.spy(console, 'warn')

      testbed.render({
        foo: 'Jane'
      })

      spy.should.have.been.calledWithExactly(
        'Warning: %s was deprecated in %s%s. %s',
        'foo',
        '2.1.0',
        ' use bar instead',
        ''
      )
    })

    it('should warn when using old prop with no new prop', () => {
      const spy = testbed.spy(console, 'warn')

      testbed.render({
        baz: 'Goodbye'
      })

      spy.should.have.been.calledWithExactly(
        'Warning: %s was deprecated in %s%s. %s',
        'baz',
        '2.1.0',
        '',
        ''
      )
    })

    it('should not output a warning using new prop', () => {
      const spy = testbed.spy(console, 'warn')

      testbed.render({
        bar: 'Jane'
      })

      spy.should.not.have.been.called
    })
  })

  describe('deprecated component', () => {
    const DeprecatedComponent = deprecated('3.4.0')(TestComponent)

    const testbed = new Testbed(<DeprecatedComponent />)

    it('should warn that the entire component is deprecated if no old props are supplied', () => {
      const spy = testbed.spy(console, 'warn')

      testbed.render()

      spy.should.have.been.calledWithExactly(
        'Warning: %s was deprecated in version %s %s',
        'TestComponent',
        '3.4.0',
        ''
      )
    })
  })

  describe('deprecated component with a changed package message', () => {
    const DeprecatedComponent = deprecated('5.0.0', null, changedPackageWarning(
      'ui-core',
      'ui-portal'
    ))(TestComponent)

    const testbed = new Testbed(<DeprecatedComponent />)

    it('should warn that the component is deprecated and output a warning that the package changed', () => {
      const spy = testbed.spy(console, 'warn')

      testbed.render()

      const message = `It has been moved from ui-core to ui-portal. See ui-portal ` +
        `in the documentation for more details`

      spy.should.have.been.calledWithExactly(
        'Warning: %s was deprecated in version %s %s',
        'TestComponent',
        '5.0.0',
        message
      )
    })
  })
})
