import addEventListener from '../addEventListener'

describe('addEventListener', () => {
  const testbed = new Testbed()

  it('should add an event listener and provide a remove method', () => {
    const callback = testbed.spy()
    const node = testbed.rootNode

    const listener = addEventListener(node, 'click', callback)

    node.click()

    expect(callback).to.have.been.calledOnce
    expect(typeof listener.remove).to.equal('function')

    listener.remove()
  })
})
