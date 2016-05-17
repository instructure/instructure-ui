import React, { Component, createElement } from 'react'
import ReactDOM from 'react-dom'
import { drill, DOMSelectors } from 'react-drill'
import ReactTestUtils from 'react/lib/ReactTestUtils'
import checkA11y from 'tests/util/a11y-check'
import createMockRaf from 'mock-raf'

class TestBed extends Component {
  constructor () {
    super()
    this.state = {
      componentClass: null,
      props: null
    }
  }
  renderComponent (componentClass, props) {
    this.setState({
      componentClass,
      props
    })
  }
  setProps (newProps) {
    const oldProps = this.props
    this.setState({
      props: {
        ...oldProps,
        ...newProps
      }
    })
  }
  get subject () {
    return this.refs.subject
  }
  render () {
    const {
      componentClass,
      props
    } = this.state
    return createElement(componentClass || 'div', {
      ...props,
      ref: 'subject'
    })
  }
}

export default class ReactTestbed {
  constructor (componentClass, defaultProps) {
    this.componentClass = componentClass
    this.defaultProps = defaultProps || {}

    beforeEach(() => {
      this.mockRaf = createMockRaf()

      this.rootNode = document.createElement('div')
      this.rootNode.setAttribute('data-testbedroot', '')
      document.body.appendChild(this.rootNode)
      DOMSelectors.setRootNode(this.rootNode)
      this.bed = ReactDOM.render(
        <TestBed />,
        this.rootNode
      )
      this.sandbox = sinon.sandbox.create({
        useFakeTimers: true
      })
      this.sandbox.stub(window, 'requestAnimationFrame', this.mockRaf.raf)
      this.sandbox.stub(window, 'cancelAnimationFrame', this.mockRaf.cancel)
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
    const Subject = this.componentClass
    this.bed.renderComponent(Subject, props)
    this.subject = ReactTestUtils.scryRenderedComponentsWithType(this.bed, this.componentClass)[0]
    this.sandbox.clock.tick(1000) // to make sure any "appear" transitions are complete
    return this.subject
  }

  setProps (props = {}) {
    this.bed.setProps(props)
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

    this.sandbox.clock.tick(1000) // so that the setTimeouts in axe-core are called
  }
}

global.createTestbed = (componentClass, defaultProps) => {
  return new ReactTestbed(componentClass, defaultProps)
}
