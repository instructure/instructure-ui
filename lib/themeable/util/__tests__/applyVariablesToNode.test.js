import { applyVariablesToNodeStyle, applyVariablesPolyfillToNode } from '../applyVariablesToNode'

describe('applyVariablesToNode', function () {
  const testbed = new Testbed()
  const variables = { color: 'red' }
  const defaults = { color: 'purple', background: 'white' }
  const prefix = 'ThemeableComponent'

  describe('#applyVariablesToNodeStyle', function () {
    it('applies prefixed css variables as custom properties to the node', function () {
      const domNode = testbed.rootNode

      applyVariablesToNodeStyle(domNode, variables, defaults, prefix)

      expect(domNode.style.getPropertyValue('--ThemeableComponent-color')).to.equal('red')
      expect(domNode.style.getPropertyValue('--ThemeableComponent-background')).to.equal('')
    })
  })

  describe('#applyVariablesPolyfillToNode', function () {
    it('injects scoped styles into the node', function () {
      const domNode = testbed.rootNode
      const template = function (theme) {
        return `
          .ThemeableComponent__root {
            font-family: sans-serif;
            color: ${theme.color};
            background: ${theme.background};
          }
        `
      }
      const scope = 'ThemeableComponent'

      applyVariablesPolyfillToNode(
        domNode,
        variables,
        defaults,
        prefix,
        template,
        scope
      )

      const styleNode = domNode.querySelector('style')

      expect(styleNode).to.exist

      if (styleNode.scoped) {
        expect(styleNode.innerText).to.equalIgnoreSpaces(
          `
          .ThemeableComponent__root {
            font-family: sans-serif;
            color: red;
            background: white;
          }
        `)
      } else {
        expect(styleNode.innerText).to.equalIgnoreSpaces(
          `
          .ThemeableComponent__root[themeablecomponent] {
            font-family: sans-serif;
            color: red;
            background: white;
          }
          `)
        expect(domNode.getAttribute('themeablecomponent')).to.exist
      }
    })
  })
})
