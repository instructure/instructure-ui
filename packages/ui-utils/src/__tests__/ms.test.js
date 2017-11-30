import ms from '../ms'

describe('ms', () => {
  const testbed = new Testbed()

  it('handles ms unit', () => {
    expect(ms('4ms')).to.equal(4)
  })

  it('converts s to ms', () => {
    expect(ms('0.3s')).to.equal(0.3 * 1000)
  })

  it('handles unitless input', () => {
    expect(ms('15')).to.equal(15)
  })

  it('handles numeric input', () => {
    expect(ms(15)).to.equal(15)
  })
})
