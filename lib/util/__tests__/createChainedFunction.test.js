import createChainedFunction from '../createChainedFunction'

describe('createChainedFunction', function () {
  const testbed = new Testbed()

  it('should return null if no function provided', function () {
    expect(createChainedFunction(null, undefined)).to.equal(null)
  })

  it('should return a function', function () {
    expect(typeof createChainedFunction(function () {})).to.equal('function')
  })

  it('should throw an error if something other than function, null, undefined provided', function () {
    expect(function () { createChainedFunction(12345) }).to.throw(Error)
  })

  it('should execute all the functions', function () {
    const spies = Array(5).fill(null).map(() => testbed.spy())
    const chain = createChainedFunction(...spies)

    chain()

    spies.forEach((spy) => {
      expect(spy).to.have.been.called
    })
  })
})
