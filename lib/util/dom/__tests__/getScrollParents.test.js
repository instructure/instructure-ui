import React from 'react'
import getScrollParents from '../getScrollParents'

describe('getScrollParents', () => {
  const testbed = new Testbed(
    <div>
      <div id="item-1">
        <div id="item-2">
          <span id="item-3">hello</span>
          <span id="sibling-1">hello</span>
          <span id="sibling-2">hello</span>
          <span id="sibling-3">hello</span>
        </div>
      </div>
      <div id="ht" style={{ height: '50px' }} />
      <div id="scroll-parent" style={{ height: '200px', overflow: 'scroll' }}>
        <div>
          <div id="scroll-child" style={{ height: '500px' }}>hello</div>
        </div>
      </div>

      <div id="scroll-parent-rel" style={{ height: '200px', overflow: 'scroll', position: 'relative' }}>
        <div style={{ height: '200px', overflow: 'scroll' }}>
          <div id="scroll-child-rel" style={{ height: '500px', position: 'absolute' }}>hello</div>
        </div>
      </div>

      <div style={{ height: '200px', overflow: 'scroll' }}>
        <div id="scroll-child-fixed" style={{ height: '500px', position: 'fixed' }}>hello</div>
      </div>
    </div>
  )

  it('should find scroll parent for inline elements', () => {
    testbed.render()

    const child = document.getElementById('scroll-child')
    const parent = document.getElementById('scroll-parent')

    expect(getScrollParents(child)[0]).to.be.equal(parent)
  })

  it('should ignore static parents when absolute', () => {
    testbed.render()

    const child = document.getElementById('scroll-child-rel')
    const parent = document.getElementById('scroll-parent-rel')

    expect(getScrollParents(child)[0]).to.be.equal(parent)
  })

  it('should handle fixed', () => {
    testbed.render()

    const child = document.getElementById('scroll-child-fixed')
    const scrollParent = getScrollParents(child)[0]

    expect(scrollParent === document).to.be.equal(true)
  })
})
