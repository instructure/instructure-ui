import React from 'react'
import safeCloneElement from '../safeCloneElement'
import createChainedFunction from '../../createChainedFunction'

describe('safeCloneElement', () => {
  const SafeClone = function ({ element, props, children }) {
    return safeCloneElement(element, props, children)
  }

  const testbed = new Testbed(<SafeClone />)

  it('should preserve refs', () => {
    const origRef = testbed.stub()
    const cloneRef = testbed.stub()

    const div = testbed.render({
      element: <div ref={origRef} />,
      props: { ref: cloneRef }
    })

    expect(origRef).to.have.been.called
    expect(cloneRef).to.have.been.called
  })

  it('should throw an error for string refs', () => {
    function render () {
      return testbed.render({
        element: <div ref="foo" /> // eslint-disable-line react/no-string-refs
      })
    }

    expect(render).to.throw(Error)
  })

  it('should preserve event handlers', () => {
    const onClickA = testbed.spy()
    const onClickB = testbed.spy()

    const subject = testbed.render({
      element: <button onClick={onClickA} />,
      props: { onClick: onClickB }
    })

    subject.find('button').click()

    expect(onClickA).to.have.been.called
    expect(onClickB).to.have.been.called
  })

  it('should preserve already chained functions', () => {
    const onClickA = testbed.spy()
    const onClickB = testbed.spy()
    const onClickC = testbed.spy()

    const subject = testbed.render({
      element: <button onClick={onClickA} />,
      props: { onClick: createChainedFunction(onClickB, onClickC) }
    })

    subject.find('button').click()

    expect(onClickA).to.have.been.called
    expect(onClickB).to.have.been.called
    expect(onClickC).to.have.been.called
  })
})
