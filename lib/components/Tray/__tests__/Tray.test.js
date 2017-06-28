import React from 'react'
import Button from '../../Button'
import Tray from '../index'
import styles from '../styles.css'

describe('<Tray />', () => {
  const testbed = new Testbed(<Tray label="Tray Example" />)

  it('should render', () => {
    testbed.render({
      open: true
    })
    const $domQuery = document.querySelectorAll(`.${styles['root']}`)
    expect($domQuery).to.have.lengthOf(1)
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

  it('should support onClose prop', (done) => {
    const onClose = testbed.stub()

    const subject = testbed.render({
      onClose,
      open: true
    })

    subject.setProps({ open: false }, () => {
      testbed.defer(() => { // wait for re-render after state change
        testbed.tick()
        testbed.tick()
        expect(onClose).to.have.been.called
        done()
      })
    })
  })

  it('should render an "icon" style close button by default', () => {
    const subject = testbed.render({open: true})
    const closeButton = subject.ref('_content').find(Button)
    expect(closeButton.prop('variant')).to.equal('icon')
  })

  it('should support closeButtonVariant prop', () => {
    const subject = testbed.render({
      open: true,
      closeButtonVariant: 'icon-inverse'
    })
    const closeButton = subject.ref('_content').find(Button)
    expect(closeButton.prop('variant')).to.equal('icon-inverse')
  })

  describe('`placement` variants', () => {
    const allowPlacementVariant = (placement) => {
      it(`allows ${placement} variant`, () => {
        testbed.render({
          open: true,
          placement: placement
        })
        const placementClassName = styles[`placement--${placement}`]
        const $domQuery = document.querySelectorAll(`.${placementClassName}`)
        expect($domQuery).to.have.lengthOf(1)
      })
    }

    it('should have placement `start` by default', () => {
      testbed.render({
        open: true
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
          open: true,
          placement: placement
        })
        expect(subject.instance().transitionType()).to.equal(enteringPlacements[placement])
      })
    }

    for (const placement in exitingPlacements) { // eslint-disable-line no-restricted-syntax
      it(`returns ${exitingPlacements[placement]}`, () => {
        const subject = testbed.render({
          open: false,
          placement: placement
        })
        expect(subject.instance().transitionType()).to.equal(exitingPlacements[placement])
      })
    }
  })
})

describe('<Tray /> managed focus', () => {
  class TrayExample extends React.Component {
    static propTypes = {
      ...Tray.PropTypes
    }

    render () {
      return (
        <div>
          <input type="text" />
          <Tray
            {...this.props}
            label="A Tray"
            closeButtonLabel="close"
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

  it('should focus closeButton by default', () => {
    let closeButton

    testbed.render({
      open: true,
      closeButtonRef: (el) => { closeButton = el }
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
    let contentEl
    testbed.render({
      open: true,
      onDismiss,
      contentRef: (el) => { contentEl = el }
    })

    testbed.tick()

    Testbed.wrap(contentEl).keyUp('esc')

    expect(onDismiss).to.have.been.called
  })
})
