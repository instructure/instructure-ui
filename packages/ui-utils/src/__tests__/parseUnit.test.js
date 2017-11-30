import parseUnit from '../parseUnit'

describe('parseUnit', () => {
  const testbed = new Testbed()

  it('unitless', () => {
    expect(parseUnit('50')[0]).to.equal(50)
  })

  it('integer', () => {
    expect(parseUnit(50)[0]).to.equal(50)
  })

  it('decimal', () => {
    expect(parseUnit(47.89101)[0]).to.equal(47.89101)
  })

  it('negative', () => {
    expect(parseUnit('-20px')[0]).to.equal(-20)
    expect(parseUnit('-20px')[1]).to.equal('px')
  })

  it('px', () => {
    expect(parseUnit('100.0792px')[0]).to.equal(100.0792)
    expect(parseUnit('100.0792px')[1]).to.equal('px')
  })

  it('rem', () => {
    expect(parseUnit('4000rem')[0]).to.equal(4000)
    expect(parseUnit('4000rem')[1]).to.equal('rem')
  })

  it('em', () => {
    expect(parseUnit('300em')[0]).to.equal(300)
    expect(parseUnit('300em')[1]).to.equal('em')
  })

  it('s', () => {
    expect(parseUnit('5s')[0]).to.equal(5)
    expect(parseUnit('5s')[1]).to.equal('s')
  })

  it('ms', () => {
    expect(parseUnit('20ms')[0]).to.equal(20)
    expect(parseUnit('20ms')[1]).to.equal('ms')
  })

  it('vh', () => {
    expect(parseUnit('327vh')[0]).to.equal(327)
    expect(parseUnit('327vh')[1]).to.equal('vh')
  })

  it('vmin', () => {
    expect(parseUnit('70vmin')[0]).to.equal(70)
    expect(parseUnit('70vmin')[1]).to.equal('vmin')
  })
})
