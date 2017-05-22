import addPositionChangeListener from '../addPositionChangeListener'

describe('addPositionChangeListener', function () {
  const testbed = new Testbed()

  it('should provide a remove method', function (done) {
    const callback = testbed.spy()
    const node = testbed.rootNode

    node.style.position = 'relative'

    const listener = addPositionChangeListener(node, callback)

    node.style.top = '100px'

    testbed.defer(() => {
      testbed.raf()

      expect(callback).to.have.been.calledOnce
      expect(typeof listener.remove).to.equal('function')

      listener.remove()

      done()
    })
  })
})
