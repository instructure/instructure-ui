import React, { Component } from 'react'
import PropTypes from 'prop-types'

import themeable from '@instructure/ui-themeable'
import { darken } from '@instructure/ui-themeable/lib/utils/color'
import Link from '@instructure/ui-core/lib/components/Link'

import styles from './styles.css'
import theme from './theme'

@themeable(theme, styles)
export default class Header extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    version: PropTypes.string
  }
  static defaultProps = {
    version: undefined
  }
  render () {
    return (
      <div className={styles.root}>
        <div className={styles.banner} role="banner">
          <Link
            theme={{
              color: '#0084D1',
              hoverColor: darken('#0084D1', 10),
              textDecoration: 'none',
              hoverTextDecoration: 'underline'
            }}
            href="#index"
          >
            <h1 className={styles.heading}>
              {this.props.name || 'Documentation'}
            </h1>
          </Link>
          { this.props.version && (
            <div className={styles.version}>
              <Link
                theme={{
                  color: '#005A8F',
                  hoverColor: darken('#005A8F', 10),
                  textDecoration: 'none',
                  hoverTextDecoration: 'underline'
                }}
                href="#CHANGELOG"
              >
                v{this.props.version}
              </Link>
            </div>
          ) }
        </div>
      </div>
    )
  }
}
