import React from 'react'
import PropTypes from 'prop-types'
import Button from '../../Button'
import Tray from '../index'
import styles from '../styles.css'

describe('<Tray />', function () {
  const testbed = new Testbed(<Tray label="Tray Example" />)

  it('should render', function () {
    testbed.render({
      isOpen: true
    })
    const $domQuery = document.querySelectorAll(`.${styles['root']}`)
    expect($domQuery).to.have.lengthOf(1)
  })

  it('should support onReady prop', function () {
    const onReady = testbed.stub()
    testbed.render({
      isOpen: true,
      onReady
    })
    testbed.tick() // wait for animation

    expect(onReady).to.have.been.called
  })

  it('should support onClose prop', function (done) {
    const onClose = testbed.stub()

    const subject = testbed.render({
      onClose,
      isOpen: true
    })

    subject.setProps({ isOpen: false }, () => {
      testbed.defer(() => { // wait for re-render after state change
        testbed.tick()
        testbed.tick()
        expect(onClose).to.have.been.called
        done()
      })
    })
  })

  it('should render an "icon" style close button by default', () => {
    const subject = testbed.render({isOpen: true})
    const closeButton = subject.ref('_content').find(Button)
    expect(closeButton.prop('variant')).to.equal('icon')
  })

  it('should support closeButtonVariant prop', () => {
    const subject = testbed.render({
      isOpen: true,
      closeButtonVariant: 'icon-inverse'
    })
    const closeButton = subject.ref('_content').find(Button)
    expect(closeButton.prop('variant')).to.equal('icon-inverse')
  })

  describe('`placement` variants', () => {
    const allowPlacementVariant = (placement) => {
      it(`allows ${placement} variant`, () => {
        testbed.render({
          isOpen: true,
          placement: placement
        })
        const placementClassName = styles[`placement--${placement}`]
        const $domQuery = document.querySelectorAll(`.${placementClassName}`)
        expect($domQuery).to.have.lengthOf(1)
      })
    }

    it('should have placement `start` by default', () => {
      testbed.render({
        isOpen: true
      })
      const $domQuery = document.querySelectorAll(`.${styles['placement--start']}`)
      expect($domQuery).to.have.lengthOf(1)
    })

    allowPlacementVariant('top')
    allowPlacementVariant('bottom')
    allowPlacementVariant('start')
    allowPlacementVariant('end')
  })

  /* eslint-disable quote-props */
  describe('transitionType()', () => {
    const enteringPlacements = {
      'start':   'slide-right',
      'end':  'slide-left',
      'top':    'slide-down',
      'bottom': 'slide-up'
    }

    const exitingPlacements = {
      'start':   'slide-left',
      'end':  'slide-right',
      'top':    'slide-up',
      'bottom': 'slide-down'
    }
    /* eslint-enable quote-props */

    for (const placement in enteringPlacements) { // eslint-disable-line no-restricted-syntax
      it(`returns ${enteringPlacements[placement]}`, () => {
        const subject = testbed.render({
          isOpen: true,
          placement: placement
        })
        expect(subject.instance().transitionType()).to.equal(enteringPlacements[placement])
      })
    }

    for (const placement in exitingPlacements) { // eslint-disable-line no-restricted-syntax
      it(`returns ${exitingPlacements[placement]}`, () => {
        const subject = testbed.render({
          isOpen: false,
          placement: placement
        })
        expect(subject.instance().transitionType()).to.equal(exitingPlacements[placement])
      })
    }
  })
})

describe('<Tray /> managed focus', function () {
  class TrayExample extends React.Component {
    constructor (props) {
      super(props)

      this.state = {
        isOpen: false
      }
    }

    /* eslint-disable react/require-default-props */
    static propTypes = {
      onRequestClose: PropTypes.func,
      getDefaultFocusElement: PropTypes.func
    }
    /* eslint-enable react/require-default-props */

    handleToggleOpen = () => {
      this.setState({
        isOpen: !this.state.isOpen
      })
    }

    handleRequestClose = () => {
      if (this.props.onRequestClose) {
        this.props.onRequestClose()
      }
      this.handleToggleOpen()
    }

    render () {
      const closeButtonRef = (c) => {
        this._closeButton = c
      }

      const contentRef = (c) => {
        this._content = c
      }

      return (
        <div>
          <input type="text" />
          <button onClick={this.handleToggleOpen}>Toggle Modal</button>
          <Tray
            isOpen={this.state.isOpen}
            onRequestClose={this.handleRequestClose}
            getDefaultFocusElement={this.props.getDefaultFocusElement}
            label="A Tray"
            closeButtonRef={closeButtonRef}
            contentRef={contentRef}
          >
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

  it('should focus closeButton by default', function () {
    const subject = testbed.render()

    const button = subject.find('button')

    button.simulate('click')

    testbed.tick()

    expect(subject.ref('_closeButton').focused()).to.be.true
  })

  it('should take a prop for finding default focus', function () {
    const subject = testbed.render({ getDefaultFocusElement: function () {
      return document.getElementById('input-one')
    }})
    const button = subject.find('button')

    button.simulate('click')

    testbed.tick()

    expect(document.getElementById('input-one') === document.activeElement).to.be.true
  })

  it('should request close when Esc key pressed', function () {
    const onRequestClose = testbed.stub()
    const subject = testbed.render({
      isOpen: true,
      onRequestClose
    })

    const button = subject.find('button')

    button.simulate('click')

    testbed.tick() // transition

    subject.ref('_content').keyDown('esc')

    expect(onRequestClose).to.have.been.called
  })
})
