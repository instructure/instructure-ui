import React from 'react'
import hasVisibleChildren from '../hasVisibleChildren'
import ScreenReaderContent from '../../components/ScreenReaderContent'

describe('hasVisibleChildren', () => {
  it('should not count ScreenReaderContent as visible content', () => {
    expect(hasVisibleChildren(<ScreenReaderContent>Foo</ScreenReaderContent>)).to.be.false
  })
  it('should count everything else as visible', () => {
    expect(hasVisibleChildren(<div>Foo</div>)).to.be.true
  })
})
