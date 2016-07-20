import StyleManager from '../StyleManager'

describe('StyleManager', function () {
  const prefix = 's__'
  const subject = new StyleManager(prefix)
  const id = 'Foo__123'
  const cssText = '.foo { color: red; }'

  it('adds style nodes to the document', function () {
    subject.addStyle(cssText, id)

    expect(document.querySelector('style[id="' + prefix + id + '"]').textContent)
      .to.equal(cssText)
  })

  it('updates existing style nodes', function () {
    const updatedCss = '.bar { color: green; }'
    subject.updateStyle(updatedCss, id)

    expect(document.querySelector('style[id="' + prefix + id + '"]').textContent)
      .to.equal(updatedCss)
  })

  it('prevents duplicate style nodes', function () {
    subject.addStyle(cssText, id)

    expect(document.querySelectorAll('style[id="' + prefix + id + '"]').length)
      .to.equal(1)
  })

  it('removes styles nodes', function () {
    // call removeStyle 2x because we called addStyle 2x
    subject.removeStyle(prefix + id)
    subject.removeStyle(prefix + id)

    expect(document.querySelectorAll('style[id="' + prefix + id + '"]').length)
      .to.equal(0)
  })
})
