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
    version: PropTypes.string.isRequired
  }
  render () {
    return (
      <div className={styles.root}>
        <div className={styles.banner} role="banner">
          <Link
            theme={{
              color: '#008ee2',
              hoverColor: darken('#008ee2', 10),
              textDecoration: 'none',
              hoverTextDecoration: 'underline'
            }}
            href="#index"
          >
            <h1 className={styles.heading}>
              {this.props.name}
            </h1>
          </Link>
          <div className={styles.version}>
            <Link
              theme={{
                color: '#73818C',
                hoverColor: darken('#73818C', 10),
                textDecoration: 'none',
                hoverTextDecoration: 'underline'
              }}
              href="#CHANGELOG"
            >
              v{this.props.version}
            </Link>
          </div>
        </div>
      </div>
    )
  }
}
