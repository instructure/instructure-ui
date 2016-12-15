import transformCss, {
  parse,
  RULE_TYPES
} from '../transformCss'

describe('transformCss', function () {
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
  describe('#parse', function () {
    it('should parse', function () {
      const result = parse(cssText)

      expect(result.rules.length).to.equal(4)
      expect(result.rules[0].cssText).to.equal('color: var(--Component-textColor);')
      expect(result.rules[0].selector).to.equal('.Component__root')
      expect(result.rules[0].type).to.equal(RULE_TYPES.style)

      expect(result.rules[2].rules.length).to.equal(1)
      expect(result.rules[2].type).to.equal(RULE_TYPES.keyframes)

      expect(result.rules[3].type).to.equal(RULE_TYPES.media)
      expect(result.rules[3].rules.length).to.equal(1)
    })
  })
  describe('#transformCss', function () {
    it('should transform', function () {
      const transform = function (node) {
        return {...node}
      }

      expect(transformCss(cssText, transform))
        .to.equalIgnoreSpaces(cssText)
    })
  })
})
