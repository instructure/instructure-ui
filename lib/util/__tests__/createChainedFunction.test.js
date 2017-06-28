import createChainedFunction from '../createChainedFunction'

describe('createChainedFunction', () => {
  const testbed = new Testbed()

  it('should return null if no function provided', () => {
    expect(createChainedFunction(null, undefined)).to.equal(null)
  })

  it('should return a function', () => {
    expect(typeof createChainedFunction(() => {})).to.equal('function')
  })

  it('should throw an error if something other than function, null, undefined provided', () => {
    expect(() => { createChainedFunction(12345) }).to.throw(Error)
  })

  it('should execute all the functions', () => {
    const spies = Array(5).fill(null).map(() => testbed.spy())
    const chain = createChainedFunction(...spies)

    chain()

    spies.forEach((spy) => {
      expect(spy).to.have.been.called
    })
  })
})
