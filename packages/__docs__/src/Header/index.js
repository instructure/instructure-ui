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
import { InlineSVG } from '@instructure/ui-svg-images'
import { Text } from '@instructure/ui-text'
import { View } from '@instructure/ui-view'
import { CondensedButton } from '@instructure/ui-buttons'
import { IconMiniArrowDownLine } from '@instructure/ui-icons'
import { Menu } from '@instructure/ui-menu'
import { ScreenReaderContent } from '@instructure/ui-a11y-content'

import { Heading } from '../Heading'

class Header extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    version: PropTypes.string.isRequired,
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

  handleSelect = (e, [selectedVersion]) => {
    const { versionsData } = this.props
    const { latestVersion } = versionsData
    const isSelectedLatestVersion = selectedVersion === latestVersion
    const pathNameParts = window.location.pathname.split('/').filter(Boolean)
    const [versionInPath] = pathNameParts
    const isOnLatestVersion = pathNameParts.length === 0

    // Example scenarios:
    // 1: instructure.design, latest: v8, selected: v8 -> navigate to instructure.design/#index
    // 2: instructure.design/v6/, latest: v8, selected: v6 -> navigate to instructure.design/v6/#index
    if (
      (isOnLatestVersion && isSelectedLatestVersion) ||
      selectedVersion === versionInPath
    ) {
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

    // this will be hardcoded to v8 in local development
    const currentVersion = versionInPath || latestVersion

    return (
      <View display="block" textAlign="center" margin="small none large">
        <Menu
          placement="bottom"
          label="Select InstUI version"
          onSelect={this.handleSelect}
          themeOverride={{ minWidth: '12rem' }}
          trigger={
            <CondensedButton padding="0.25rem">
              <Text size="large">
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

  render() {
    const corpLogo = (
      <InlineSVG viewBox="0 0 500 500" width="6rem" height="6rem">
        <polygon
          fill="#2A7BA0"
          points="30.07,373.64 250.04,249.77 470,373.64 250.04,497.46 "
        />
        <polygon
          fill="#FDCC10"
          points="140.03,64.02 30.07,125.9 140.08,187.84 250.04,125.9 "
        />
        <polygon
          fill="#F78F20"
          points="249.99,2.08 140.08,63.97 250.04,125.9 359.99,64.02 "
        />
        <polygon
          fill="#EB2227"
          points="359.99,64.02 250.04,125.9 359.99,187.84 469.95,125.9 "
        />
      </InlineSVG>
    )

    return (
      <View
        role="banner"
        as="div"
        margin="none none medium"
        padding="none medium"
      >
        <Heading level="h2" as="h1">
          <Link href="#index" isWithinText={false} display="block">
            <View display="block" textAlign="center">
              {corpLogo}
            </View>
          </Link>
          <View display="block" textAlign="center">
            {this.renderVersionsBlock()}
          </View>
        </Heading>
      </View>
    )
  }
}

export default Header
export { Header }
