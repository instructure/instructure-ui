import StyleManager from '../StyleManager'

describe('StyleManager', function () {
  const subject = new StyleManager()
  const id = 'Foo__123'
  const cssText = '.foo { color: red; }'
  let styleId

  it('adds style nodes to the document', function () {
    styleId = subject.addStyle(cssText, id)

    expect(document.querySelector('style[id="' + styleId + '"]').textContent)
      .to.equal(cssText)
  })

  it('updates existing style nodes', function () {
    const updatedCss = '.bar { color: green; }'
    subject.updateStyle(updatedCss, id)

    expect(document.querySelector('style[id="' + styleId + '"]').textContent)
      .to.equal(updatedCss)
  })

  it('prevents duplicate style nodes', function () {
    styleId = subject.addStyle(cssText, id)

    expect(document.querySelectorAll('style[id="' + styleId + '"]').length)
      .to.equal(1)
  })

  it('removes styles nodes', function () {
    subject.removeStyle(id)

    expect(document.querySelectorAll('style[id="' + styleId + '"]').length)
      .to.equal(1)

    subject.removeStyle(id)

    expect(document.querySelectorAll('style[id="' + styleId + '"]').length)
      .to.equal(0)
  })
})
