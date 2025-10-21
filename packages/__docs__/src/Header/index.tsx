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

import { Component } from 'react'

import { Link } from '@instructure/ui-link'
import { InlineSVG } from '@instructure/ui-svg-images'
import { Text } from '@instructure/ui-text'
import { View } from '@instructure/ui-view'
import { CondensedButton } from '@instructure/ui-buttons'
import { IconMiniArrowDownLine } from '@instructure/ui-icons'
import { Menu } from '@instructure/ui-menu'
import { ScreenReaderContent } from '@instructure/ui-a11y-content'

import { versionInPath } from '../versionData'

import type { HeaderProps } from './props'
import { allowedProps } from './props'
//@ts-expect-error ts complains for no real reason
import logo from '../../full_logo.svg'

class Header extends Component<HeaderProps> {
  static allowedProps = allowedProps
  static defaultProps = {
    version: undefined,
    versionsData: undefined
  }

  handleSelect = (
    _e: React.MouseEvent<any>,
    updated: (string | number | undefined)[]
  ) => {
    const [selectedVersion] = updated
    const { versionsData } = this.props
    const { latestVersion } = versionsData
    const isSelectedLatestVersion = selectedVersion === latestVersion
    const isOnLatestVersion = !versionInPath

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
    // Add `ghPagesPrefix` if we are not on https://instructure.design/
    const ghPagesPrefix =
      window.location.origin === 'https://instructure.github.io'
        ? '/instructure-ui'
        : ''
    const versionToNavigate = `${ghPagesPrefix}/${
      isSelectedLatestVersion
        ? window.location.hash
        : `${selectedVersion}/${window.location.hash}`
    }`
    return window.location.replace(versionToNavigate)
  }

  renderVersionsBlock = () => {
    const { versionsData, name, version } = this.props
    const { latestVersion, previousVersions } = versionsData
    const allVersions = [latestVersion, ...previousVersions]

    const currentVersion = versionInPath || latestVersion

    return (
      <View display="block" textAlign="center" margin="small none large">
        <Menu
          placement="bottom"
          label="Select InstUI version"
          themeOverride={{ minWidth: '12rem' }}
          trigger={
            <CondensedButton>
              <Text size="large">
                {name && version ? (
                  <span>
                    {name}
                    {version}
                  </span>
                ) : (
                  'Documentation'
                )}
              </Text>
              <IconMiniArrowDownLine size="x-small" />
            </CondensedButton>
          }
        >
          <Menu.Group
            selected={[currentVersion]}
            onSelect={this.handleSelect}
            label={
              <ScreenReaderContent>Select InstUI version</ScreenReaderContent>
            }
          >
            {allVersions.map((opt, index) => (
              <Menu.Item key={index} id={`opt-${index}`} value={opt}>
                <View textAlign="center" as="div">
                  InstUI {opt}
                </View>
              </Menu.Item>
            ))}
          </Menu.Group>
        </Menu>
      </View>
    )
  }

  render() {
    const { versionsData } = this.props
    return (
      <View as="div" margin="none none medium" padding="none medium">
        <Link
          href="index"
          isWithinText={false}
          display="block"
          onClick={(e) => {
            e.preventDefault()
            const basePath =
              window.location.pathname.match(/^(\/pr-preview\/pr-\d+)/)?.[1] ||
              ''
            const newUrl = basePath ? `${basePath}/index` : `/`
            window.history.pushState({}, '', newUrl)
            window.dispatchEvent(new PopStateEvent('popstate'))
          }}
        >
          <View display="block" textAlign="center">
            <InlineSVG src={logo} height="6rem" fontSize="12rem" />
            <ScreenReaderContent>Instructure logo</ScreenReaderContent>
          </View>
        </Link>
        <View display="block" textAlign="center">
          {versionsData ? (
            this.renderVersionsBlock()
          ) : (
            <Link
              href="index"
              isWithinText={false}
              display="block"
              onClick={(e) => {
                e.preventDefault()
                const basePath =
                  window.location.pathname.match(
                    /^(\/pr-preview\/pr-\d+)/
                  )?.[1] || ''
                const newUrl = basePath ? `${basePath}/index` : `/`
                window.history.pushState({}, '', newUrl)
                window.dispatchEvent(new PopStateEvent('popstate'))
              }}
            >
              <View display="block" margin="small none none">
                <Text size="large">
                  {this.props.name}
                  {this.props.version}
                </Text>
              </View>
            </Link>
          )}
        </View>
      </View>
    )
  }
}

export default Header
export { Header }
