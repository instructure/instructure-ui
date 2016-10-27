import React, { Component, PropTypes } from 'react'
import themeable from '../../util/themeable'
import { omitProps } from '../../util/passthroughProps'
import classnames from 'classnames'

import Heading from '../Heading'

import styles from './styles.css'
import theme from './theme.js'

/**
  A Media component with a caption

  ```jsx_example
  <Media description={lorem.sentence()}>
    <Avatar userName="Jennifer Stern" />
  </Media>
  ```
**/
@themeable(theme, styles)
class Media extends Component {
  static propTypes = {
    /**
    * the media object
    */
    children: PropTypes.node.isRequired,
    /**
    * the media title
    */
    title: PropTypes.string,
    /**
    * the media description
    */
    description: PropTypes.string,
    /**
    * how should the title and description align
    */
    alignContent: PropTypes.oneOf(['top', 'center'])
  }

  static defaultProps = {
    alignContent: 'center'
  }

  render () {
    const props = omitProps(this.props, Media.propTypes)
    return (
      <figure {...props} className={classnames({
        [styles.root]: true,
        [styles[this.props.alignContent]]: true
      })}>
        <div className={styles.figure}>
          {this.props.children}
        </div>
        <figcaption className={styles.caption}>
          {
            this.props.title && (
              <Heading level="h3">
                <span className={styles.title}>
                  {this.props.title}
                </span>
              </Heading>
            )
          }
          {
            this.props.description && (
              <div className={styles.description}>
                {this.props.description}
              </div>
            )
          }
        </figcaption>
      </figure>
    )
  }
}

export default Media
