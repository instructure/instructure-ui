import addEventListener from '../addEventListener'

describe('addEventListener', function () {
  const testbed = new Testbed()

  it('should add an event listener and provide a remove method', function () {
    const callback = testbed.spy()
    const node = testbed.rootNode

    const listener = addEventListener(node, 'click', callback)

    node.click()

    expect(callback).to.have.been.called.once
    expect(typeof listener.remove).to.equal('function')

    listener.remove()
  })
})
