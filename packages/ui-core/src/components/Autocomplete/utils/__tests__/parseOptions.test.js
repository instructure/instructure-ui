import React from 'react'
import PropTypes from 'prop-types'

import parseOptions from '../parseOptions'

describe('parseOptions', () => {
  class Example extends React.Component {
    static propTypes = {
      children: PropTypes.node // eslint-disable-line react/require-default-props
    }

    get children () {
      return this.props.children
    }

    render () {
      return <select label="LABEL">{this.props.children}</select>
    }
  }
  const testbed = new Testbed(<Example />)

  it('has order matter', () => {
    const children = [{
      id: '1', value: '1', children: 'Aruba', label: 'Aruba'
    }, {
      id: '2', value: '2', children: 'Jamaica', label: 'Jamaica'
    }, {
      id: '3', value: '3', children: 'Oh I want to take ya', label: 'Oh I want to take ya'
    }]
    const subject = testbed.render({
      children: children.map(({ value, label }) => (
        <option key={value} value={value}>{label}</option>
      ))
    })

    expect(parseOptions(subject.instance().props.children)).to.eql(children)
  })
})
