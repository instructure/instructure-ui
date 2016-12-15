import scopeStylesToNode, { scopeCssText } from '../scopeStylesToNode'

describe('scopeStylesToNode', function () {
  const scope = 'Component__1234'

  const scopeAttr = `[data-theme="${scope}"]`

  const cssText = `
    .root{
      color: red;
    }
    .background{
      background-color: purple;
    }
  `

  const scopedCss = `
    .root${scopeAttr}{
      color: red;
    }
    .background${scopeAttr}{
      background-color: purple;
    }
  `

  describe('#scopeStylesToNode', function () {
    const testbed = new Testbed()
    it('should apply scoped css to node', function () {
      const domNode = testbed.rootNode

      scopeStylesToNode(domNode, cssText, scope)

      const styleNode = domNode.querySelector('style')

      if (styleNode.scoped) {
        expect(styleNode.innerText).to.equalIgnoreSpaces(cssText)
      } else {
        expect(styleNode.innerText).to.equalIgnoreSpaces(scopedCss)
        expect(domNode.getAttribute('data-theme')).to.equal(scope)
      }
    })
  })

  describe('#scopeCssText', function () {
    it('scopes css text', function () {
      expect(scopeCssText(cssText, scopeAttr))
        .to.equalIgnoreSpaces(scopedCss)
    })
  })
})
