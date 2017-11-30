import within from '../within'

describe('within', () => {
  const testbed = new Testbed()

  it('returns true when values are within range', () => {
    expect(within(10, 8, 2)).to.be.true
    expect(within(10, 11, 1)).to.be.true
    expect(within(10, 10, 0)).to.be.true
    expect(within(10, 9.999, 0.001)).to.be.true
    expect(within(-10, -15, 5)).to.be.true
  })

  it('returns false when values are out of range', () => {
    expect(within(10, 8, 1)).to.be.false
    expect(within(12, 10, 1.9999)).to.be.false
    expect(within(8.705, 8.7, 0.004)).to.be.false
    expect(within(-2, -1.5, 0.4)).to.be.false
  })
})
