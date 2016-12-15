import parseCss, { ruleTypes } from '../parseCss'

describe('parseCss', function () {
  const cssText = `
    .Component__root {
      color: var(--Component-textColor);
    }
    .Component__background {
      background-color: var(--Component-backgroundColor);
    }
    @keyframes animation {
      to {
        opacity: 1;
        transform: translate3d(0, 0, 0);
      }
    }
    @media screen and (--Component-tabletMin) {
      .Component__root {
        color: var(--Component-textColor);
      }
    }
  `
  describe('#parseCss', function () {
    it('should parse', function () {
      const result = parseCss(cssText)

      expect(result.rules.length).to.equal(4)
      expect(result.rules[0].cssText).to.equal('color: var(--Component-textColor);')
      expect(result.rules[0].selector).to.equal('.Component__root')
      expect(result.rules[0].type).to.equal(ruleTypes.style)

      expect(result.rules[2].rules.length).to.equal(1)
      expect(result.rules[2].type).to.equal(ruleTypes.keyframes)
      expect(result.rules[2].rules[0].parent.type).to.equal(ruleTypes.keyframes)

      expect(result.rules[3].type).to.equal(ruleTypes.media)
      expect(result.rules[3].rules.length).to.equal(1)
    })
  })
})
