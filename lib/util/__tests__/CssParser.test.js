import CssParser from '../CssParser'

describe('CssParser', function () {
  it('parses css text', function () {
    const cssText = `
      .Component__root {
        color: var(--Component-textColor);
      }
      .Component__background {
        background-color: var(--Component-backgroundColor);
      }
    `
    const parsedCss = CssParser.parse(cssText)

    const rules = parsedCss.rules

    expect(rules.length).to.eq(2)

    expect(rules[0].selector).to.eq('.Component__root')
    expect(rules[0].cssText.trim()).to.eq('color: var(--Component-textColor);')

    expect(rules[1].selector).to.eq('.Component__background')
    expect(rules[1].cssText.trim()).to.eq('background-color: var(--Component-backgroundColor);')
  })
})
