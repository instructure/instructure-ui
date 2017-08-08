import React from 'react'

import TrayContent from '../index'

import styles from '../styles.css'

describe('<TrayContent />', () => {
  const testbed = new Testbed(<TrayContent label="Tray Example" />)

  it('should render', () => {
    const subject = testbed.render({
      placement: 'start'
    })
    expect(subject.hasClass(styles['placement--start'])).to.be.true
  })

  it('should not have a close button', () => {
    const subject = testbed.render({
      placement: 'start'
    })
    expect(subject.find('button').length).to.equal(0)
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
})
