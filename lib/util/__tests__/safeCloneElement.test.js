import React from 'react'
import safeCloneElement from '../safeCloneElement'

describe('safeCloneElement', function () {
  const SafeClone = function ({ children, cloneRef, ...props }) {
    return safeCloneElement(children, {
      ...children.props,
      ref: cloneRef
    })
  }

  const testbed = new Testbed(<SafeClone />)

  it('should preserve refs', function () {
    const origRef = testbed.sandbox.stub()
    const cloneRef = testbed.sandbox.stub()

    const div = testbed.render({
      cloneRef,
      children: <div ref={origRef} />
    })

    expect(origRef).to.have.been.called
    expect(cloneRef).to.have.been.called
  })

  it('should throw an error for string refs', function () {
    function render () {
      return testbed.render({
        children: <div ref="foo" />
      })
    }

    expect(render).to.throw(Error)
  })
})
