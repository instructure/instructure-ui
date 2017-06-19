import scopeStylesToNode, { scopeCssText } from '../scopeStylesToNode'

describe('scopeStylesToNode', function () {
  const cssText = `
    .root{
      color: red;
    }
    .background{
      background-color: purple;
    }
  `

  const scopedCss = `
    .root[foo] {
      color: red;
    }
    .background[foo] {
      background-color: purple;
    }
  `

  describe('#scopeStylesToNode', function () {
    const testbed = new Testbed()
    it('should apply scoped css to node', function () {
      const domNode = testbed.rootNode

      scopeStylesToNode(domNode, cssText, 'Foo')

      const styleNode = domNode.querySelector('style')

      if (styleNode.scoped) {
        expect(styleNode.innerText).to.equalIgnoreSpaces(cssText)
      } else {
        expect(styleNode.innerText).to.equalIgnoreSpaces(scopedCss)
        expect(domNode.getAttribute('foo')).to.exist
      }
    })
    it('should remove scoped css from node', function () {
      const domNode = testbed.rootNode

      scopeStylesToNode(domNode, cssText, 'Foo')
      scopeStylesToNode(domNode, '', 'Foo')

      const styleNode = domNode.querySelector('style')

      expect(styleNode).to.not.exist
      expect(domNode.getAttribute('foo')).to.not.exist
    })
  })

  describe('#scopeCssText', function () {
    it('scopes css text', function () {
      expect(scopeCssText(cssText, '[foo]'))
        .to.equalIgnoreSpaces(scopedCss)
    })
    it('should not apply scope to rules with a keyframes selector', function () {
      const cssText = `
        @keyframes contentAnimation {
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }
      `
      expect(scopeCssText(cssText, '[foo]'))
        .to.equalIgnoreSpaces(cssText)
    })
    it('should apply scope to rules with a media query selector', function () {
      const cssText = `
      @media screen and (--Component-largeMin) {
        .Component__root {
          color: blue;
          background-color: var(--Component-backgroundColor);
        }
      }
      `
      const scopedCss = `
      @media screen and (--Component-largeMin) {
        .Component__root[foo] {
          color: blue;
          background-color: var(--Component-backgroundColor);
        }
      }
      `
      expect(scopeCssText(cssText, '[foo]'))
        .to.equalIgnoreSpaces(scopedCss)
    })
  })
})
