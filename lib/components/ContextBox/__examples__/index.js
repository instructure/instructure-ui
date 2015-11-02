import React from 'react'
import ReactDom from 'react-dom'
import ContextBox from '../index'

import styles from './examples.css'

import image from './example-image.jpg'

const Examples = React.createClass({
  render () {
    return (
      <div>
        <div className={styles.container}>
          <div className={styles.container}>
            <div className={styles.context}>

              <ContextBox position="above">
                <div className={styles.text}>
                  Context box with no caret and top animation
                </div>
              </ContextBox>

            </div>
          </div>
          <div className={styles.container}>
            <div className={styles.context}>

              <ContextBox showCaret position="left">
                <div className={styles.text}>
                  Context box with left caret and left animation
                </div>
              </ContextBox>

            </div>
          </div>
          <div className={styles.container}>
            <div className={styles.context}>

              <ContextBox showCaret position="right">
                <div className={styles.text}>
                  Context box with right caret and right animation
                </div>
              </ContextBox>

            </div>
          </div>
          <div className={styles.container}>
            <div className={styles.context}>

              <ContextBox showCaret position="above">
                <div className={styles.text}>
                  Context box with top caret and top animation
                </div>
              </ContextBox>

            </div>
          </div>
          <div className={styles.container}>
            <div className={styles.context}>

              <ContextBox showCaret position="below">
                <div className={styles.text}>
                  Context box with bottom caret and bottom animation
                </div>
              </ContextBox>

            </div>
          </div>
          <div className={styles.container}>
            <div className={styles.context}>

              <ContextBox showCaret position="above">
                <div className={styles.image}>
                  <img src={image} alt="Image of flowers" />
                </div>
                <div className={styles.text}>
                  Context box with top animation and caret, containing an image
                </div>
              </ContextBox>

            </div>
          </div>
        </div>
      </div>
    )
  }
})

ReactDom.render(<Examples/>, document.getElementById('examples'))
