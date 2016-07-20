import React from 'react'
import styleable from '../styleable'
import { makeStyleContext } from '../StyleContextTypes'

describe('@styleable', function () {
  const variables = {
    textColor: 'rgb(0, 128, 0)',
    backgroundColor: 'rgb(255, 255, 0)'
  }
  const styles = {
    root: 'Component__root',
    _cssText:
      `.Component__root {
        color: var(--Component-textColor);
        background-color: var(--Component-backgroundColor);
      }`
  }

  @styleable(styles, variables)
  class Component extends React.Component {
    render () {
      return <div className={styles.root}>Hello World</div>
    }
  }

  const testbed = createTestbed(<Component />)

  it('allows configuration through props', function () {
    testbed.render({ styles: false })

    const styleNodes = document.querySelectorAll('style')

    expect(styleNodes.length).to.equal(0)
  })

  it('injects styles into the document', function () {
    const component = testbed.render()

    const styleNode = document.querySelector('style[id*="Component__"]')
    const styles = window.getComputedStyle(component.dom())

    expect(styleNode).to.exist
    expect(styles.color).to.equal('rgb(0, 128, 0)')
    expect(styles.backgroundColor).to.equal('rgb(255, 255, 0)')
  })

  it('injects global config variables into the document', function () {
    testbed.render()

    const styleNodes = document.querySelectorAll('style')

    expect(styleNodes.length).to.equal(2)
  })

  it('allows configuration through context', function () {
    const injectStyle = testbed.sandbox.stub()
    const context = makeStyleContext({ injectStyle })

    testbed.render({}, context)

    // once for global config vars and once for component styles
    expect(injectStyle).to.have.been.calledTwice
  })
})
