import React from 'react'
import { merge } from 'lodash'
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

  render (props) {
    props = merge({}, this.defaultProps, props || {})
    this.subject = ReactDOM.render(
      <this.ComponentClass {...props} />,
      this.rootNode
    )
    return this.subject
  }

  get dom () {
    return drill(this.subject)
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

  checkA11yStandards (done, options) {
    options = options || {}

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
