import React from 'react'
import PropTypes from 'prop-types'

import {
  getOptionId, parseOptions
} from '../util'

describe('Autocomplete.util', function () {
  describe('getOptionId', function () {
    it('gives out null when no valid id or value is present', function () {
      expect(getOptionId()).to.equal(null)
      expect(getOptionId({})).to.equal(null)
      expect(getOptionId({ children: '1' })).to.equal(null)
      expect(getOptionId([2])).to.equal(null)
      expect(getOptionId(3)).to.equal(null)
    })

    it('prioritizes id attribute over value', function () {
      expect(getOptionId({ id: 1, value: 2 })).to.equal(1)
      expect(getOptionId({ notId: 1, value: 2 })).to.equal(2)
      expect(getOptionId({ id: undefined, value: 2 })).to.equal(2)
      expect(getOptionId({ id: null, value: 2 })).to.equal(2)
      expect(getOptionId({ id: 'not null?', value: 2 })).to.equal('not null?')
      let id = {}
      expect(getOptionId({ id, value: 2 })).to.equal(id)
      id = []
      expect(getOptionId({ id, value: 2 })).to.equal(id)
      id = () => {}
      expect(getOptionId({ id, value: 2 })).to.equal(id)
    })
  })

  describe('parseOptions', function () {
    class Example extends React.Component {
      static propTypes = {
        children: PropTypes.node
      }

      get children () {
        return this.props.children
      }

      render () {
        return <select label="LABEL">{this.props.children}</select>
      }
    }
    const testbed = new Testbed(<Example />)

    it('has order matter', function () {
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
})
