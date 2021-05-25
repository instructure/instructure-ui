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

import { Link } from '@instructure/ui-link'
import { View } from '@instructure/ui-view'
import { themeable } from '@instructure/ui-themeable'
import { CondensedButton } from '@instructure/ui-buttons'
import { IconMiniArrowDownLine } from '@instructure/ui-icons'
import { Menu } from '@instructure/ui-menu'
import { Text } from '@instructure/ui-text'
import { ScreenReaderContent } from '@instructure/ui-a11y-content'


import PandaLogo from './instui-panda.js'
import styles from './styles.css'
import theme from './theme'

@themeable(theme, styles)
class Header extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    version: PropTypes.string,
    versionsData: PropTypes.shape({
      latestVersion: PropTypes.string.isRequired,
      previousVersions: PropTypes.arrayOf(PropTypes.string).isRequired
    })
  }

  static defaultProps = {
    version: undefined,
    versionsData: {
      latestVersion: '',
      previousVersions: []
    }
  }

  handleSelect = (_e, [ selectedVersion ]) => {
    const { versionsData } = this.props
    const { latestVersion } = versionsData
    const isSelectedLatestVersion = selectedVersion === latestVersion
    const splittedUrl = window.location.pathname.split('/').filter(Boolean)
    const [ versionInPath ] = splittedUrl
    const isOnLatestVersion = splittedUrl.length === 0

    // 1: instructure.design, latest: v8, selected: v8 -> navigate to instructure.design/#index
    // 2: instructure.design/v6/, latest: v8, selected: v6 -> navigate to instructure.design/v6/#index
    if ((isOnLatestVersion && isSelectedLatestVersion) || selectedVersion === versionInPath) {
      return window.location.replace('#index')
    }
    // If we select the latest version from the dropdown,
    // then navigate to the index (instructure.design/#currentHash).
    // In every other case eg.: v6,v7 navigate to --> instructure.design/v6/#currentHash
    const versionToNavigate = isSelectedLatestVersion
      ? `/${window.location.hash}`
      : `/${selectedVersion}/${window.location.hash}`

    return window.location.replace(versionToNavigate)
  }

  renderVersionsBlock = () => {
    const { versionsData } = this.props
    const { latestVersion, previousVersions } = versionsData
    const allVersions = [latestVersion, ...previousVersions]

    const [versionInPath] = window.location.pathname.split('/').filter(Boolean)

    const currentVersion = versionInPath || latestVersion

    return (
      <View display="block" textAlign="center" margin="small none">
        <Menu
          placement="bottom"
          label="Select InstUI version"
          onSelect={this.handleSelect}
          theme={{ minWidth: '12rem' }}
          trigger={
            <CondensedButton padding="0.25rem">
              <Text size="medium">
                {(
                  <span>
                    {this.props.name} {this.props.version}
                  </span>
                ) || 'Documentation'}
              </Text>
              <IconMiniArrowDownLine size="x-small" />
            </CondensedButton>
          }
        >
          <Menu.Group
            selected={[currentVersion]}
            label={
              <ScreenReaderContent>Select InstUI version</ScreenReaderContent>
            }
          >
            {allVersions.map((opt, index) => (
              <Menu.Item key={index} id={`opt-${index}`} value={opt}>
                <View textAlign="center" as="div">
                  {this.props.name} {opt}
                </View>
              </Menu.Item>
            ))}
          </Menu.Group>
        </Menu>
      </View>
    )
  }

  render () {
    return (
      <div className={styles.root}>
        <div className={styles.logo}>
          <PandaLogo />
        </div>
        <div className={styles.banner} role="banner">
          {this.renderVersionsBlock()}
          { this.props.version && (
            <View display="block" margin="xx-small none none">
              <Link
                href="#Newsletter"
                isWithinText={false}
              >
                Newsletter
              </Link>
            </View>
          ) }
        </div>
      </div>
    )
  }
}

export default Header
export { Header }
