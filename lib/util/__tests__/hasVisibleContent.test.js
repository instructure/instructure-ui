import React from 'react'
import hasVisibleContent from '../hasVisibleContent'
import ScreenReaderContent from '../../components/ScreenReaderContent'

describe('hasVisibleContent', function () {
  it('should not count ScreenReaderContent as visible content', function () {
    expect(hasVisibleContent(<ScreenReaderContent>Foo</ScreenReaderContent>)).to.be.false
  })
  it('should count everything else as visible', function () {
    expect(hasVisibleContent(<div>Foo</div>)).to.be.true
  })
})
