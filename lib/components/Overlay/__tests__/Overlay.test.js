import React from 'react'
import $ from 'teaspoon'
import Overlay from '../index'
import Portal from '../../Portal'

const CHILDREN_INPUTS = (
  <div>
    <input type="text" id="input-one" />
    <input type="text" id="input-two" />
  </div>
)

describe('<Overlay />', function () {
  const testbed = createTestbed(<Overlay />)

  it('should render nothing and have a node with no parent when closed', function () {
    const subject = testbed.render()
    const node = subject.find(Portal).unwrap()._node
    expect(node.parentNode).to.equal(null)
  })

  it('should render children and have a node with a parent when open', function () {
    const subject = testbed.render({
      isOpen: true
    })
    const node = subject.find(Portal).unwrap()._node
    expect(node.parentNode).to.equal(document.body)
  })

  it('should use transition', function () {
    const onEnter = testbed.sandbox.stub()
    const onEntering = testbed.sandbox.stub()
    const onEntered = testbed.sandbox.stub()
    testbed.render({
      isOpen: true,
      transition: 'fade',
      onEnter,
      onEntering,
      onEntered
    })

    expect(onEnter).to.have.been.called
    expect(onEntering).to.have.been.called
    expect(onEntered).to.have.been.called
  })

  it('should support onReady prop', function () {
    const onReady = testbed.sandbox.stub()
    testbed.render({
      isOpen: true,
      onReady
    })
    expect(onReady).to.have.been.called
  })

  it('should support onClose prop', function () {
    const onClose = testbed.sandbox.stub()
    const subject = testbed.render({
      isOpen: true
    })
    expect(onClose).to.not.have.been.called
    subject.props('isOpen', false, () => {
      expect(onClose).to.have.been.called
    })
  })

  it('should not request close when overlay clicked by default', function () {
    const onRequestClose = testbed.sandbox.stub()
    const subject = testbed.render({
      isOpen: true,
      onRequestClose
    })
    const content = $(subject.unwrap()._content)
    content.trigger('click')
    expect(onRequestClose).to.not.have.been.called
  })

  it('should request close when overlay clicked with prop', function () {
    const onRequestClose = testbed.sandbox.stub()
    const subject = testbed.render({
      isOpen: true,
      shouldCloseOnClick: true,
      onRequestClose
    })
    const content = $(subject.unwrap()._content)
    content.trigger('click')
    expect(onRequestClose).to.have.been.called
  })

  it('should request close when Esc key pressed', function () {
    const onRequestClose = testbed.sandbox.stub()
    const subject = testbed.render({
      isOpen: true,
      onRequestClose
    })
    const content = $(subject.unwrap()._content)
    content.trigger('keyDown', { keyCode: 27 })
    expect(onRequestClose).to.have.been.called
  })

  describe('managed focus', function () {
    class Manager extends React.Component {
      constructor (props) {
        super(props)

        this.state = {
          isOverlayOpen: false
        }
      }

      static propTypes = {
        isOpen: React.PropTypes.bool,
        getDefaultFocusElement: React.PropTypes.func
      }

      static defaultProps = {
        getDefaultFocusElement: function () {
          return document.getElementById('input-one')
        }
      }

      handleToggleOverlay = () => {
        this.setState({
          isOverlayOpen: !this.state.isOverlayOpen
        })
      }

      render () {
        return (
          <div>
            <input type="text" />
            <button onClick={this.handleToggleOverlay}>Toggle Overlay</button>
            <Overlay
              isOpen={this.state.isOverlayOpen}
              onRequestClose={this.handleToggleOverlay}
              getDefaultFocusElement={this.props.getDefaultFocusElement}
            >
              {CHILDREN_INPUTS}
            </Overlay>
          </div>
        )
      }
    }

    const testbed = createTestbed(<Manager />)

    it('should focus content by default', function () {
      const subject = testbed.render({ getDefaultFocusElement: null })
      const overlay = subject.find(Overlay)
      const button = subject.find('button')
      testbed.sandbox.clock.restore()

      button.trigger('click')
      const content = overlay.unwrap()._content
      expect(content === document.activeElement).to.be.true
    })

    it('should take a prop for finding default focus', function () {
      const subject = testbed.render()
      const button = subject.find('button')

      button.trigger('click')
      expect(document.getElementById('input-one') === document.activeElement).to.be.true
    })

  //   it('should return focus when closed', function () {
  //     /* eslint no-console:0 */
  //
  //     const subject = testbed.render()
  //     const button = subject.find('button')
  //     const input = subject.find('input')
  //
  //     // Focus some other element to begin
  //     input.dom().focus()
  //     console.log('focus', document.activeElement)
  //     expect(input.dom() === document.activeElement).to.be.true
  //
  //     // Open Overlay by clicking on the button
  //     // Focus should be applied to `getDefaultFocusElement` value
  //     button.trigger('click')
  //     console.log('open', document.activeElement)
  //     expect(document.getElementById('input-one') === document.activeElement).to.be.true
  //
  //     // Close Overlay by clicking on the button
  //     // Focus should be returned to element that had focus prior to open
  //     button.trigger('click')
  //     console.log('close', document.activeElement)
  //     expect(input.dom() === document.activeElement).to.be.true
  //   })
  })
})
