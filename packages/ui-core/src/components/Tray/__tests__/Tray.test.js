import React from 'react'
import Button from '../../Button'
import Portal from '../../Portal'
import Tray from '../index'

describe('<Tray />', () => {
  const applicationElement = document.createElement('div')
  const testbed = new Testbed(
    <Tray label="Tray Example" closeButtonLabel="Close" applicationElement={() => applicationElement} />
  )

  it('should render nothing and have a node with no parent when closed', () => {
    const subject = testbed.render()
    const node = subject.find(Portal).unwrap().node
    expect(node).to.equal(undefined)
  })

  it('should render children and have a node with a parent when open', () => {
    const subject = testbed.render({ open: true })
    const portal = subject.find(Portal).unwrap()
    expect(portal.node.parentNode).to.equal(document.body)
  })

  it('should apply the a11y attributes', () => {
    const subject = testbed.render({ open: true })
    const portal = subject.find(Portal).unwrap()

    testbed.tick()
    testbed.tick()

    expect(portal.node.querySelector('[role="region"]')).to.exist
    expect(portal.node.querySelector('[aria-label="Tray Example"]')).to.exist
  })

  it('should support onOpen prop', () => {
    const onOpen = testbed.stub()
    testbed.render({
      open: true,
      onOpen
    })
    testbed.tick() // wait for animation

    expect(onOpen).to.have.been.called
  })

  it('should support onClose prop', done => {
    const onClose = testbed.stub()

    const subject = testbed.render({
      onClose,
      open: true
    })

    testbed.tick()

    subject.setProps({ open: false }, () => {
      testbed.defer(() => {
        // wait for re-render after state change
        testbed.tick()
        testbed.tick()
        expect(onClose).to.have.been.called
        done()
      })
    })
  })

  it('should render an "icon" style close button by default', () => {
    let content
    testbed.render({
      open: true,
      contentRef: el => {
        content = el
      }
    })

    testbed.tick()
    testbed.tick()

    expect(Testbed.wrap(content).find(Button).prop('variant')).to.equal('icon')
  })

  it('should support closeButtonVariant prop', () => {
    let content
    testbed.render({
      open: true,
      contentRef: el => {
        content = el
      },
      closeButtonVariant: 'icon-inverse'
    })

    testbed.tick()
    testbed.tick()

    expect(Testbed.wrap(content).find(Button).prop('variant')).to.equal('icon-inverse')
  })

  describe('transition()', () => {
    const enteringPlacements = {
      start: 'slide-right',
      end: 'slide-left',
      top: 'slide-down',
      bottom: 'slide-up'
    }

    const exitingPlacements = {
      start: 'slide-left',
      end: 'slide-right',
      top: 'slide-up',
      bottom: 'slide-down'
    }

    // eslint-disable-next-line no-restricted-syntax
    for (const placement in enteringPlacements) {
      it(`returns ${enteringPlacements[placement]}`, () => {
        const subject = testbed.render({
          open: true,
          placement: placement
        })
        expect(subject.instance().transition).to.equal(enteringPlacements[placement])
      })
    }

    // eslint-disable-next-line no-restricted-syntax
    for (const placement in exitingPlacements) {
      it(`returns ${exitingPlacements[placement]}`, () => {
        const subject = testbed.render({
          open: false,
          placement: placement
        })
        expect(subject.instance().transition).to.equal(exitingPlacements[placement])
      })
    }
  })
})

describe('<Tray /> managed focus', () => {
  const applicationElement = document.createElement('div')
  class TrayExample extends React.Component {
    static propTypes = {
      ...Tray.PropTypes
    }

    render () {
      return (
        <div>
          <input type="text" />
          <Tray {...this.props} label="A Tray" closeButtonLabel="close" applicationElement={() => applicationElement}>
            <div>
              <input type="text" id="input-one" />
              <input type="text" id="input-two" />
            </div>
          </Tray>
        </div>
      )
    }
  }

  const testbed = new Testbed(<TrayExample />)

  it('should focus closeButton by default', () => {
    let closeButton

    testbed.render({
      open: true,
      closeButtonRef: el => {
        closeButton = el
      }
    })

    testbed.tick()

    expect(closeButton === document.activeElement).to.be.true
  })

  it('should take a prop for finding default focus', () => {
    testbed.render({
      open: true,
      defaultFocusElement: function () {
        return document.getElementById('input-one')
      }
    })

    testbed.tick()

    expect(document.getElementById('input-one') === document.activeElement).to.be.true
  })

  it('should call onDismiss prop when Esc key pressed', () => {
    const onDismiss = testbed.stub()
    const subject = testbed.render({
      open: true,
      shouldCloseOnDocumentClick: true,
      onDismiss
    })

    testbed.tick()

    testbed.wrapper.dispatchNativeKeyboardEvent('keyup', 'escape')

    expect(onDismiss).to.have.been.called
  })
})
