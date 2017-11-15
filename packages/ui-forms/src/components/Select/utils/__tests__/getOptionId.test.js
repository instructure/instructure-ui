import React from 'react'
import PropTypes from 'prop-types'

import getOptionId from '../getOptionId'

describe('getOptionId', () => {
  it('gives out null when no valid id or value is present', () => {
    expect(getOptionId()).to.equal(null)
    expect(getOptionId({})).to.equal(null)
    expect(getOptionId({ children: '1' })).to.equal(null)
    expect(getOptionId([2])).to.equal(null)
    expect(getOptionId(3)).to.equal(null)
  })

  it('prioritizes id attribute over value', () => {
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
