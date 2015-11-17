import React from 'react'
import { merge } from 'lodash'
import ReactDOM from 'react-dom'
import { drill, DOMSelectors } from 'react-drill'

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
}

global.createTestbed = (componentClass, defaultProps) => {
  return new ReactTestbed(componentClass, defaultProps)
}

