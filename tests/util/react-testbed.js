import React from 'react'
import ReactDOM from 'react-dom'
import { drill, DOMSelectors } from 'react-drill'
import ReactTestUtils from 'react/lib/ReactTestUtils'
import checkA11y from 'tests/util/a11y-check'

export default class ReactTestbed {
  constructor (ComponentClass, defaultProps) {
    this.ComponentClass = ComponentClass
    this.defaultProps = defaultProps || {}

    beforeEach(() => {
      this.rootNode = document.createElement('div')
      document.body.appendChild(this.rootNode)
      DOMSelectors.setRootNode(this.rootNode)
      this.sandbox = sinon.sandbox.create()
    })

    afterEach(() => {
      ReactDOM.unmountComponentAtNode(this.rootNode)
      this.rootNode.remove()
      this.rootNode = undefined
      this.subject = undefined
      DOMSelectors.setRootNode(undefined)
      this.sandbox.restore()
    })
  }

  render (propOverrides = {}) {
    const props = {...this.defaultProps, ...propOverrides}
    const Subject = this.ComponentClass
    this.subject = ReactDOM.render(
      <Subject {...props} />,
      this.rootNode
    )
    return this.subject
  }

  get dom () {
    return drill(this.subject)
  }

  getText (element = this.dom.node) {
    const text = []
    const els = element.childNodes
    let el = els[0]
    const excluded = {
      'noscript': 'noscript',
      'script': 'script',
      'style': 'style'
    }

    for (let i = 0, iLen = els.length; i < iLen; i++) {
      el = els[i]
      if (el.nodeType === 1 &&
         !(el.tagName.toLowerCase() in excluded)) {
        text.push(this.getText(el))
      } else if (el.nodeType === 3) {
        text.push(el.data)
      }
    }
    return text.join('').trim()
  }

  findChildrenByType (type) {
    return ReactTestUtils.scryRenderedComponentsWithType(this.subject, type)
  }

  findChildByType (type) {
    return ReactTestUtils.findRenderedComponentWithType(this.subject, type)
  }

  findChildren (test) {
    return ReactTestUtils.findAllInRenderedTree(this.subject, test)
  }

  checkA11yStandards (done, options = {}) {
    options.onFailure = options.onFailure || function (err, violations) {
      expect(violations.length).to.equal(0, err)
      done(new Error(err))
    }
    options.onSuccess = options.onSuccess || function () {
      done()
    }

    checkA11y(this.dom.node, options)
  }
}

global.createTestbed = (componentClass, defaultProps) => {
  return new ReactTestbed(componentClass, defaultProps)
}

