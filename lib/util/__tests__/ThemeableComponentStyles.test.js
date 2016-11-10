import ThemeableComponentStyles from '../ThemeableComponentStyles'

describe('ThemeableComponentStyles', function () {
  const testbed = createTestbed()

  const styles = function (theme) {
    return `
      .ThemeableComponent__root {
        color: ${theme.color};
        background: ${theme.background};
      }
    `
  }

  const componentName = 'ThemeableComponent'
  const componentId = 'ThemeableComponent1234'

  const styleManager = {
    addStyle: testbed.sandbox.stub(),
    updateStyle: testbed.sandbox.stub(),
    removeStyle: testbed.sandbox.stub()
  }

  const defaultTheme = { color: 'purple', background: 'white' }
  const theme = { color: 'purple' }

  describe('with custom properties supported', function () {
    const componentStyles = new ThemeableComponentStyles({
      componentName,
      componentId,
      styles,
      styleManager
    })

    describe('#init', function () {
      it('injects styles', function () {
        const domNode = testbed.rootNode

        componentStyles.init({ domNode, defaultTheme, theme })
        expect(styleManager.addStyle).to.have.been.called
      })

      it('does not apply the theme when it is the same as the default theme', function () {
        const domNode = testbed.rootNode

        componentStyles.init({ domNode, defaultTheme, theme })

        expect(domNode.style.getPropertyValue('--ThemeableComponent-color')).to.equal('')
      })

      it('applies the theme when it is different than the default theme', function () {
        const domNode = testbed.rootNode

        componentStyles.init({ domNode, defaultTheme, theme: { color: 'red' } })

        expect(domNode.style.getPropertyValue('--ThemeableComponent-color')).to.equal('red')
      })
    })

    describe('#update', function () {
      beforeEach(function () {
        componentStyles.init({ domNode: testbed.rootNode, defaultTheme, theme })
      })

      it('does not update styles when the default theme is the same', function () {
        componentStyles.update({ defaultTheme, theme })
        expect(styleManager.updateStyle).to.not.have.been.called
      })

      it('updates styles when the default theme changes', function () {
        componentStyles.update({ defaultTheme: { color: 'red' }, theme })
        expect(styleManager.updateStyle).to.have.been.called
      })

      it('updates the applied theme', function () {
        const domNode = testbed.rootNode

        componentStyles.update({ defaultTheme, theme: { color: 'green' } })

        expect(domNode.style.getPropertyValue('--ThemeableComponent-color')).to.equal('green')
      })

      it('removes the applied theme when it is the same as the default', function () {
        const domNode = testbed.rootNode

        componentStyles.update({ defaultTheme, theme: { color: 'purple' } })

        expect(domNode.style.getPropertyValue('--ThemeableComponent-color')).to.equal('')
      })
    })

    describe('#unmount', function () {
      it('removes styles', function () {
        componentStyles.unmount()
        expect(styleManager.removeStyle).to.have.been.called
      })
    })
  })

  describe('with custom properties polyfilled', function () {
    const componentStyles = new ThemeableComponentStyles({
      componentName,
      componentId,
      styles,
      styleManager,
      usePolyfill: true,
      scope: 'abc123'
    })

    describe('#init', function () {
      it('does not apply the theme when it is the same as the default theme', function () {
        const domNode = testbed.rootNode

        componentStyles.init({ domNode, defaultTheme, theme })

        expect(domNode.querySelector('style')).to.not.exist
      })

      it('applies the theme when it is different than the default theme', function () {
        const domNode = testbed.rootNode

        componentStyles.init({ domNode, defaultTheme, theme: { color: 'red' } })

        const styleNode = domNode.querySelector('style')

        if (styleNode.scoped) {
          expect(styleNode.innerText.trim()).to.equal(
          `.ThemeableComponent__root {
  color: red;
}`
          )
        } else {
          expect(styleNode.innerText.trim()).to.equal(
          `.ThemeableComponent__root[data-theme="ThemeableComponent__abc123"] {
  color: red;
}`
          )
          expect(domNode.getAttribute('data-theme')).to.equal('ThemeableComponent__abc123')
        }
      })
    })

    describe('#update', function () {
      beforeEach(function () {
        componentStyles.init({ domNode: testbed.rootNode, defaultTheme, theme })
      })
      it('updates the applied theme', function () {
        const domNode = testbed.rootNode

        componentStyles.update({ defaultTheme, theme: { color: 'green' } })

        const styleNode = domNode.querySelector('style')

        if (styleNode.scoped) {
          expect(styleNode.innerText.trim()).to.equal(
          `.ThemeableComponent__root {
  color: green;
}`
          )
        } else {
          expect(styleNode.innerText.trim()).to.equal(
          `.ThemeableComponent__root[data-theme="ThemeableComponent__abc123"] {
  color: green;
}`
          )
        }
      })

      it('removes the applied theme when it is the same as the default', function () {
        const domNode = testbed.rootNode

        componentStyles.update({ defaultTheme, theme: { color: 'purple' } })

        expect(domNode.querySelector('style')).to.not.exist
      })
    })
  })
})
