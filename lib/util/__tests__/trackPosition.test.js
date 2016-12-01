import trackPosition from '../trackPosition'

describe('trackPosition', () => {
  let el
  let cancel

  beforeEach(() => {
    el = document.createElement('div')
    el.style.position = 'relative'
    document.body.appendChild(el)
  })

  afterEach(() => {
    if (el && el.parentNode) {
      el.parentNode.removeChild(el)
    }

    if (typeof cancel === 'function') {
      cancel()
    }
    cancel = null
  })

  it('should callback when position changes', (done) => {
    const spy = sinon.spy()
    cancel = trackPosition(el, spy)

    el.style.top = '10px'

    requestAnimationFrame(() => {
      expect(spy).to.have.been.called
      expect(typeof spy.getCall(0).args[0]).to.equal('object')
      done()
    })
  })

  it('should not callback when nothing changes', (done) => {
    const spy = sinon.spy()
    cancel = trackPosition(el, spy)

    requestAnimationFrame(() => {
      expect(spy).to.not.have.been.called
      done()
    })
  })

  it('should not callback when canceled', (done) => {
    const spy = sinon.spy()
    cancel = trackPosition(el, spy)

    cancel()

    el.style.top = '10px'

    requestAnimationFrame(() => {
      expect(spy).to.not.have.been.called
      done()
    })
  })
})

