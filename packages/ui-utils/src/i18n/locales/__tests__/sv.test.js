import numeral from 'numeral'
import sv from '../sv'

numeral.locale('sv')

describe('ordinal', () => {
  it('formats 1 ordinal as 1:a', () => {
    expect(numeral(1).format('0o')).to.equal('1:a')
  })

  it('formats 2 ordinal as 2:a', () => {
    expect(numeral(2).format('0o')).to.equal('2:a')
  })

  it('formats 10 ordinal as 10:e', () => {
    expect(numeral(10).format('0o')).to.equal('10:e')
  })

  it('formats 11 ordinal as 11:e', () => {
    expect(numeral(11).format('0o')).to.equal('11:e')
  })

  it('formats 12 ordinal as 12:e', () => {
    expect(numeral(12).format('0o')).to.equal('12:e')
  })

  it('formats 20 ordinal as 20:e', () => {
    expect(numeral(20).format('0o')).to.equal('20:e')
  })

  it('formats 21 ordinal as 21:a', () => {
    expect(numeral(21).format('0o')).to.equal('21:a')
  })

  it('formats 22 ordinal as 22:a', () => {
    expect(numeral(22).format('0o')).to.equal('22:a')
  })

  it('formats 23 ordinal as 23:e', () => {
    expect(numeral(23).format('0o')).to.equal('23:e')
  })
})
