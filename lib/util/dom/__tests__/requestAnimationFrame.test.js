import requestAnimationFrame from '../requestAnimationFrame'

describe('requestAnimationFrame', function () {
  const testbed = new Testbed()

  it('should provide a cancel method', function () {
    const callback = testbed.spy()

    const raf = requestAnimationFrame(callback)

    testbed.raf()

    expect(callback).to.have.been.calledOnce
    expect(typeof raf.cancel).to.equal('function')
  })
})
