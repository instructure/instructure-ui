import addResizeListener from '../addResizeListener'

describe('addResizeListener', () => {
  const testbed = new Testbed()

  it('should provide a remove method', () => {
    const callback = testbed.spy()
    const node = testbed.rootNode

    const listener = addResizeListener(node, callback)

    node.style.width = '50px'

    testbed.raf()

    expect(callback).to.have.been.calledOnce
    expect(typeof listener.remove).to.equal('function')

    listener.remove()
  })
})
