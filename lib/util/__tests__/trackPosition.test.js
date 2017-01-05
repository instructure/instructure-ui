import trackPosition from '../trackPosition'

describe('trackPosition', () => {
  const testbed = new Testbed()
  let el
  let cancel

  beforeEach(() => {
    el = testbed.rootNode
    el.style.position = 'relative'
  })

  afterEach(() => {
    if (typeof cancel === 'function') {
      cancel()
    }
    cancel = null
  })

  it('should callback when position changes', () => {
    const spy = sinon.spy()
    cancel = trackPosition(el, spy)

    el.style.top = '10px'

    testbed.sandbox.clock.tick()

    expect(spy).to.have.been.called
    expect(typeof spy.getCall(0).args[0]).to.equal('object')
  })

  it('should not callback when nothing changes', () => {
    const spy = sinon.spy()
    cancel = trackPosition(el, spy)

    testbed.sandbox.clock.tick()

    expect(spy).to.not.have.been.called
  })

  it('should not callback when canceled', () => {
    const spy = sinon.spy()
    cancel = trackPosition(el, spy)

    cancel()

    el.style.top = '10px'

    testbed.sandbox.clock.tick()

    expect(spy).to.not.have.been.called
  })
})

