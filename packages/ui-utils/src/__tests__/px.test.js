import px from '../px'
import getFontSize from '../dom/getFontSize'

describe('px', () => {
  const testbed = new Testbed()

  it('handles px units', () => {
    expect(px('30px')).to.equal(30)
  })

  it('converts rem to px', () => {
    expect(px('50rem')).to.equal(50 * getFontSize())
  })

  it('converts em to px', () => {
    const el = document.createElement('div')
    el.style.fontSize = '24px'
    document.body.appendChild(el)
    expect(px('10em', el)).to.equal(10 * getFontSize(el))
  })

  it('handles unitless input', () => {
    expect(px('4')).to.equal(4)
  })
})
