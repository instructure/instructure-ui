import React from 'react'

import Tray from '../index'
import styles from '../styles.css'

describe('<Tray />', function () {
  const testbed = new Testbed(<Tray />)

  it('should render', function () {
    testbed.render({
      isOpen: true
    })
    const $domQuery = document.querySelectorAll(`.${styles['root']}`)
    expect($domQuery).to.have.lengthOf(1)
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

    it('should have placement `left` by default', () => {
      testbed.render({
        isOpen: true
      })
      const $domQuery = document.querySelectorAll(`.${styles['placement--left']}`)
      expect($domQuery).to.have.lengthOf(1)
    })

    allowPlacementVariant('top')
    allowPlacementVariant('bottom')
    allowPlacementVariant('left')
    allowPlacementVariant('right')
  })

  describe('transitionType()', () => {
    const enteringPlacements = {
      'left':   'slide-right',
      'right':  'slide-left',
      'top':    'slide-down',
      'bottom': 'slide-up'
    }

    const exitingPlacements = {
      'left':   'slide-left',
      'right':  'slide-right',
      'top':    'slide-up',
      'bottom': 'slide-down'
    }

    for (const placement in enteringPlacements) {
      it(`returns ${enteringPlacements[placement]}`, () => {
        const subject = testbed.render({
          isOpen: true,
          placement: placement
        })
        expect(subject.unwrap().transitionType()).to.equal(enteringPlacements[placement])
      })
    }

    for (const placement in exitingPlacements) {
      it(`returns ${exitingPlacements[placement]}`, () => {
        const subject = testbed.render({
          isOpen: false,
          placement: placement
        })
        expect(subject.unwrap().transitionType()).to.equal(exitingPlacements[placement])
      })
    }
  })
})
