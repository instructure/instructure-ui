import transformCss from '../transformCss'

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
