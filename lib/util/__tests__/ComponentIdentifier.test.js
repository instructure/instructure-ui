import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import ComponentIdentifier, { pick } from '../ComponentIdentifier'

describe('ComponentIdentifier', function () {
  class Trigger extends ComponentIdentifier {
    static displayName = 'Trigger'
  }

  class App extends Component {
    static propTypes = {
      children: PropTypes.node
    }

    render () {
      const trigger = pick(Trigger, this.props.children)

      return (
        <div>
          <h2>Trigger</h2>
          {trigger}
        </div>
      )
    }
  }

  const testbed = createTestbed(<App />)

  it('should render only child', function () {
    const subject = testbed.render({
      children: (
        <Trigger>
          <button>Click Me</button>
        </Trigger>
      )
    })
    const trigger = ReactDOM.findDOMNode(subject.find(Trigger).unwrap())

    expect(trigger.nodeName).to.equal('BUTTON')
    expect(trigger.innerHTML).to.equal('Click Me')
  })

  it('should not error when no children provided', function () {
    expect(() => {
      testbed.render({
        children: (
          <Trigger />
        )
      })
    }).to.not.throw(Error)
  })

  it('should pass props', function () {
    const onClick = testbed.sandbox.stub()
    const subject = testbed.render({
      children: (
        <Trigger onClick={onClick}>
          <button>Click Me</button>
        </Trigger>
      )
    })
    const button = subject.find('button').unwrap()
    button.click()
    expect(onClick).to.have.been.called
  })
})
