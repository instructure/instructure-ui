/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 - present Instructure, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Button } from '@instructure/ui-buttons'
import { Heading } from '@instructure/ui-heading'
import { View } from '@instructure/ui-view'
import { themeable } from '@instructure/ui-themeable'

import PandaLogo from './instui-panda.js'
import styles from './styles.css'
import theme from './theme'

@themeable(theme, styles)
class Header extends Component {
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
        <div className={styles.logo}>
          <PandaLogo />
        </div>
        <div className={styles.banner} role="banner">
          <Heading level="h2" as="h1">
            <Button
              variant="link"
              size="large"
              href="#index"
              theme={{largePadding: '0.25rem', largeFontSize: '1.5rem', largeHeight: 'normal'}}
            >
              {this.props.name || 'Documentation'}
            </Button>
          </Heading>
          { this.props.version && (
            <View display="block" margin="xx-small none none" __dangerouslyIgnoreExperimentalWarnings>
              <Button
                href="#CHANGELOG"
                variant="link"
                theme={{mediumPadding: '0.125rem', mediumHeight: 'normal'}}
              >
                v{this.props.version}
              </Button>
              &nbsp;|&nbsp;
              <Button
                href="#WhatsNew"
                variant="link"
                theme={{mediumPadding: '0.125rem', mediumHeight: 'normal'}}
              >
                What&apos;s New?
              </Button>
            </View>
          ) }
        </div>
      </div>
    )
  }
}

export default Header
export { Header }
