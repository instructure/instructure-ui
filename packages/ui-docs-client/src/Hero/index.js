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

/** @jsx jsx */
import { Component } from 'react'
import PropTypes from 'prop-types'

import { Button, IconButton } from '@instructure/ui-buttons'
import { Flex } from '@instructure/ui-flex'
import { Img } from '@instructure/ui-img'
import { Link } from '@instructure/ui-link'
import { List } from '@instructure/ui-list'
import { Text } from '@instructure/ui-text'
import { View } from '@instructure/ui-view'
import {
  IconGithubSolid,
  IconCheckMarkSolid,
  IconAnnouncementLine
} from '@instructure/ui-icons'
import { AccessibleContent } from '@instructure/ui-a11y-content'
import { InlineSVG, SVGIcon } from '@instructure/ui-svg-images'

import { withStyle, jsx } from '@instructure/emotion'

import generateStyle from './styles'
import generateComponentTheme from './theme'

import { ColorBand } from '../ColorBand'
import { ContentWrap } from '../ContentWrap'
import { Search } from '../Search'
import { Heading } from '../Heading'

@withStyle(generateStyle, generateComponentTheme)
class Hero extends Component {
  static propTypes = {
    // eslint-disable-next-line react/require-default-props
    makeStyles: PropTypes.func,
    // eslint-disable-next-line react/require-default-props
    styles: PropTypes.object,
    name: PropTypes.string.isRequired,
    repository: PropTypes.string.isRequired,
    version: PropTypes.string.isRequired,
    layout: PropTypes.oneOf(['small', 'medium', 'large', 'x-large']).isRequired,
    description: PropTypes.string,
    docs: PropTypes.object
  }

  static defaultProps = {
    description: undefined,
    docs: null
  }

  componentDidMount() {
    this.props.makeStyles()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.props.makeStyles()
  }

  render() {
    const { version, layout, styles } = this.props

    const corpLogo = (
      <SVGIcon viewBox="0 0 500 500">
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
      </SVGIcon>
    )

    const canvasLogo = (
      <InlineSVG viewBox="0 0 792 220" width="239px" height="66px">
        <path
          fill="white"
          d="M48.2 109.4c0-13.8-10.3-25.1-23.7-26.7 -2.2 8.5-3.4 17.4-3.4 26.7s1.2 18.2 3.4 26.7C37.9 134.5 48.2 123 48.2 109.4z"
        />
        <path
          fill="white"
          d="M63.8 100.9c-4.7 0-8.5 3.8-8.5 8.5s3.8 8.5 8.5 8.5c4.7 0 8.5-3.8 8.5-8.5S68.6 100.9 63.8 100.9z"
        />
        <path
          fill="white"
          d="M180.5 109.4c0 13.8 10.3 25.1 23.7 26.7 2.2-8.5 3.4-17.4 3.4-26.7s-1.2-18.2-3.4-26.7C190.7 84.3 180.5 95.5 180.5 109.4z"
        />
        <path
          fill="white"
          d="M164.6 100.9c-4.7 0-8.5 3.8-8.5 8.5s3.8 8.5 8.5 8.5c4.7 0 8.5-3.8 8.5-8.5S169.4 100.9 164.6 100.9z"
        />
        <path
          fill="white"
          d="M114 175.6c-13.8 0-25.1 10.3-26.7 23.7 8.5 2.2 17.4 3.4 26.7 3.4 9.3 0 18.2-1.2 26.7-3.4C139.1 186.1 127.9 175.6 114 175.6z"
        />
        <path
          fill="white"
          d="M114 151.5c-4.7 0-8.5 3.8-8.5 8.5 0 4.7 3.8 8.5 8.5 8.5 4.7 0 8.5-3.8 8.5-8.5C122.5 155.4 118.8 151.5 114 151.5z"
        />
        <path
          fill="white"
          d="M114 43.3c13.8 0 25.1-10.3 26.7-23.7 -8.5-2.2-17.4-3.4-26.7-3.4 -9.3 0-18.2 1.2-26.7 3.4C88.9 33.1 100.4 43.3 114 43.3z"
        />
        <path
          fill="white"
          d="M114 50.7c-4.7 0-8.5 3.8-8.5 8.5s3.8 8.5 8.5 8.5c4.7 0 8.5-3.8 8.5-8.5C122.5 54.4 118.8 50.7 114 50.7z"
        />
        <path
          fill="white"
          d="M160.9 156.2c-9.7 9.7-10.5 24.9-2.2 35.6 15.6-9.1 28.7-22.1 37.8-37.8C186 145.7 170.6 146.5 160.9 156.2z"
        />
        <path
          fill="white"
          d="M143.9 139c-3.4 3.4-3.4 8.7 0 11.9 3.4 3.4 8.7 3.4 11.9 0 3.4-3.4 3.4-8.7 0-11.9C152.6 135.9 147.2 135.9 143.9 139z"
        />
        <path
          fill="white"
          d="M67.4 62.7c9.7-9.7 10.5-24.9 2.2-35.6 -15.6 9.1-28.7 22.1-37.8 37.8C42.5 73 57.7 72.4 67.4 62.7z"
        />
        <path
          fill="white"
          d="M72.5 67.7c-3.4 3.4-3.4 8.7 0 11.9 3.4 3.4 8.7 3.4 11.9 0 3.4-3.4 3.4-8.7 0-11.9C81.2 64.5 75.9 64.5 72.5 67.7z"
        />
        <path
          fill="white"
          d="M160.9 62.5c9.7 9.7 24.9 10.5 35.6 2.2 -9.1-15.6-22.1-28.7-37.8-37.8C150.4 37.6 151.2 52.8 160.9 62.5z"
        />
        <path
          fill="white"
          d="M155.7 79.5c3.4-3.4 3.4-8.7 0-11.9 -3.4-3.4-8.7-3.4-11.9 0 -3.4 3.4-3.4 8.7 0 11.9C147 82.9 152.4 82.9 155.7 79.5z"
        />
        <path
          fill="white"
          d="M67.4 156c-9.7-9.7-24.9-10.5-35.6-2.2 9.1 15.6 22.1 28.7 37.8 37.8C77.9 181.1 77.1 165.7 67.4 156z"
        />
        <path
          fill="white"
          d="M72.5 139c-3.4 3.4-3.4 8.7 0 11.9 3.4 3.4 8.7 3.4 11.9 0 3.4-3.4 3.4-8.7 0-11.9C81.2 135.7 75.7 135.7 72.5 139z"
        />
        <path
          fill="white"
          d="M330.9 148.7c0 18.2-11.9 25.1-29.9 25.1h-0.4c-18 0-29.9-6.5-29.9-25.1v-71c0-17.6 11.9-25.1 29.9-25.1h0.4c18 0 29.9 7.5 29.9 25.1v14h-19.6V80.7c0-8.3-4.2-10.9-10.3-10.9s-10.3 2.6-10.3 10.9v64.8c0 8.3 4.2 10.9 10.3 10.9s10.3-2.6 10.3-10.9v-13.8h19.6V148.7z"
        />
        <path
          fill="white"
          d="M400.3 145.9h-21.5l-4.2 26.3h-19l21.9-118.4h24.7l22.3 118.4h-20L400.3 145.9zM397.9 129.7l-8.3-52.6 -8.3 52.6H397.9z"
        />
        <path
          fill="white"
          d="M451.3 172.4V54h19.6l24.9 73.1V54h18v118.4h-18.6l-25.9-76.9v76.9H451.3z"
        />
        <path
          fill="white"
          d="M584.4 172.4h-21.5L540.5 54h20l13.6 87.8L587.7 54h19L584.4 172.4z"
        />
        <path
          fill="white"
          d="M665.2 145.9h-21.5l-4.2 26.3h-19l21.9-118.4h24.7l22.3 118.4h-20L665.2 145.9zM662.6 129.7l-8.3-52.6 -8.3 52.6H662.6z"
        />
        <path
          fill="white"
          d="M751.2 88.6v-8.9c0-7.5-4.2-10.1-9.9-10.1 -5.7 0-9.9 2.8-9.9 10.1v8.1c0 6.1 2 8.7 7.5 12.1l13.8 7.7c11.3 6.5 18.2 11.7 18.2 24.3v17c0 18.2-11.3 24.7-29.3 24.7h-0.4c-18 0-29.3-6.3-29.3-24.7v-12.5h19.4v9.9c0 7.3 4.2 10.5 10.1 10.5 5.9 0 10.1-3.2 10.1-10.5V137c0-6.1-1.8-9.1-7.7-12.3l-13.6-7.7c-11.5-6.5-18.2-12.1-18.2-24.3V77.1c0-17.6 12.9-24.3 29.1-24.3h0.4c16.2 0 29.1 6.7 29.1 24.3v11.7h-19.4V88.6z"
        />
      </InlineSVG>
    )

    const bigScreen = layout === 'large' || layout === 'x-large'
    const contentMaxWidth = '84rem'
    const checkmark = <IconCheckMarkSolid inline={false} color="success" />

    const heroBodyContent = (
      <View as="div">
        <Heading as="h3" level="h2" margin="none none medium">
          Components everyone can count on
        </Heading>
        <View as="div" margin="medium none">
          <Text size="large">
            Instructure UI is maintained by Instructure designers, developers,
            and accessibility experts. Our components and utilities offer
            support for:
          </Text>
        </View>
        <List
          size="large"
          itemSpacing="xx-small"
          margin="none none xx-large"
          isUnstyled
        >
          <List.Item>
            <Flex>
              <Flex.Item padding="none small none none">{checkmark}</Flex.Item>
              <Flex.Item>
                Leading screen readers: VoiceOver, NVDA, and JAWS (Firefox only)
              </Flex.Item>
            </Flex>
          </List.Item>
          <List.Item>
            <Flex>
              <Flex.Item padding="none small none none">{checkmark}</Flex.Item>
              <Flex.Item shouldGrow shouldShrink>
                Keyboard only navigation
              </Flex.Item>
            </Flex>
          </List.Item>
          <List.Item>
            <Flex>
              <Flex.Item padding="none small none none">{checkmark}</Flex.Item>
              <Flex.Item>Right-to-left (RTL) languages</Flex.Item>
            </Flex>
          </List.Item>
        </List>
        <Heading as="h3" level="h2" margin="none none medium">
          Getting started
        </Heading>
        <View as="p" margin="none none small">
          <Text size="large">
            Check out our <Link href="#usage">Developer Quick Start</Link> to
            spin up a starter app or integrate the library into an existing
            project.
          </Text>
        </View>
        <List margin="none none x-large" itemSpacing="xx-small">
          <List.Item>
            <Text weight="bold">React support:</Text> 16.8.0 and later
          </List.Item>
          <List.Item>
            <Text weight="bold">Browser support:</Text> The last two versions of
            all modern browsers (Firefox, Safari, Chrome, Edge).
          </List.Item>
          <List.Item>
            <Text weight="bold">License:</Text> <Link href="#LICENSE">MIT</Link>
          </List.Item>
        </List>
        <Heading as="h3" level="h2" margin="none none medium">
          Contribute
        </Heading>
        <View as="p" margin="none none small">
          <Text size="large">
            Whether it&apos;s finding a bug, committing a fix, or suggesting a
            feature, we welcome contributions.
          </Text>
        </View>
        <List margin="none none large" itemSpacing="xx-small">
          <List.Item>
            <Link href="#contributing">Contributing Guidelines</Link>
          </List.Item>
          <List.Item>
            <Link href="#CODE_OF_CONDUCT">Code of Conduct</Link>
          </List.Item>
          <List.Item>
            <Link href="https://github.com/instructure/instructure-ui">
              Instructure UI on Github
            </Link>
          </List.Item>
        </List>
      </View>
    )

    const sidebarContent = (
      <View as="aside">
        <View as="div" background="secondary" padding="large">
          <Flex>
            <Flex.Item>
              <IconAnnouncementLine inline={false} size="small" />
            </Flex.Item>
            <Flex.Item padding="none none none small">
              <Heading as="h3" level="h3">
                What&apos;s New?
              </Heading>
            </Flex.Item>
          </Flex>
          <View as="p" margin="medium none small">
            <Text weight="bold">
              See what&apos;s in the latest release, or read our latest
              newsletter.
            </Text>
          </View>
          <List isUnstyled margin="small none none">
            <List.Item>
              <Link href="#v8-upgrade-guide">Version 8.0 Upgrade Guide</Link>
            </List.Item>
            <List.Item>
              <Link href="#CHANGELOG">Change Log ({version})</Link>
            </List.Item>
            <List.Item>
              <Link href="#Newsletter">Instructure UI Newsletter</Link>
            </List.Item>
          </List>
        </View>
        <Link
          display="block"
          href="https://www.instructure.com/canvas/"
          isWithinText={false}
          themeOverride={{
            hoverTextDecorationOutsideText: 'none'
          }}
        >
          <View
            display="block"
            background="danger"
            margin="x-large none none"
            padding="large"
            textAlign="center"
          >
            <AccessibleContent alt="Instructure UI powers Canvas">
              <Text size="large">Instructure UI powers</Text>
            </AccessibleContent>
            <View display="block" margin="xx-small none none">
              {canvasLogo}
            </View>
          </View>
        </Link>
      </View>
    )

    return (
      <View as="section">
        <View
          as="div"
          minHeight={layout === 'small' ? null : '100vh'}
          position="relative"
        >
          <div css={styles.overlayLayout}>
            <Img
              src="https://instui-docs.s3.us-east-2.amazonaws.com/hero2.jpg"
              display="block"
              constrain="cover"
              overlay={{
                color: styles.backgroundColor,
                opacity: 10,
                blend: 'multiply'
              }}
            />
          </div>
          <View
            as="div"
            position="relative"
            css={styles.contentLayout}
            minHeight={layout === 'small' ? null : '100vh'}
          >
            <View
              as="header"
              background="primary"
              position="relative"
              shadow="resting"
            >
              <Flex
                padding={bigScreen ? 'small' : 'small x-small'}
                justifyItems="space-between"
              >
                <Flex.Item size="4rem"></Flex.Item>
                <Flex.Item
                  shouldShrink={!bigScreen}
                  shouldGrow={!bigScreen}
                  size={bigScreen ? '36%' : null}
                  padding={bigScreen ? 'none' : 'none x-small none none'}
                >
                  <Search options={this.props.docs} />
                </Flex.Item>
                <Flex.Item>
                  <IconButton
                    href="https://github.com/instructure/instructure-ui"
                    renderIcon={<IconGithubSolid />}
                    screenReaderLabel="Contribute on Github"
                    withBackground={false}
                    withBorder={false}
                    size={bigScreen ? 'large' : 'medium'}
                  />
                  <IconButton
                    href="http://instructure.com"
                    renderIcon={corpLogo}
                    screenReaderLabel="Instructure"
                    withBackground={false}
                    withBorder={false}
                    size={bigScreen ? 'large' : 'medium'}
                  />
                </Flex.Item>
              </Flex>
            </View>
            <View display="block" css={styles.content}>
              <ContentWrap
                padding={
                  layout === 'small' ? 'xx-large large' : 'x-large xx-large'
                }
                maxWidth={contentMaxWidth}
              >
                <View
                  as="div"
                  maxWidth={bigScreen ? '66%' : null}
                  padding={bigScreen ? 'none x-large none none' : 'none'}
                >
                  <Flex margin="0 0 large">
                    <Flex.Item padding="0 x-small 0 0">
                      <Heading as="h1" level="h3" color="primary-inverse">
                        Instructure UI
                      </Heading>
                    </Flex.Item>
                    <Flex.Item>
                      <Button
                        size="small"
                        withBackground={false}
                        color="primary-inverse"
                        href="#CHANGELOG"
                      >
                        {version}
                      </Button>
                    </Flex.Item>
                  </Flex>

                  <Heading
                    as="h2"
                    level="h1"
                    themeOverride={{
                      h1FontSize: bigScreen ? '4rem' : '3.25rem'
                    }}
                    color="primary-inverse"
                  >
                    Create beautiful, accessible React apps.
                  </Heading>

                  <View as="p" margin="large 0">
                    <Text
                      size={bigScreen ? 'large' : 'medium'}
                      color="primary-inverse"
                    >
                      Use open source components millions of learners rely on
                      every day when they use Instructure products like Canvas
                      LMS.
                    </Text>
                  </View>

                  <View as="p" margin="0">
                    <Button
                      withBackground={false}
                      color="primary-inverse"
                      href="#usage"
                      margin="0 x-small x-small 0"
                      size={bigScreen ? 'large' : 'medium'}
                    >
                      Developer Quick Start
                    </Button>
                    <Button
                      withBackground={false}
                      color="primary-inverse"
                      renderIcon={IconGithubSolid}
                      href="https://github.com/instructure/instructure-ui"
                      size={bigScreen ? 'large' : 'medium'}
                      margin="0 x-small x-small 0"
                    >
                      Github
                    </Button>
                    <Button
                      withBorder={false}
                      focusColor="inverse"
                      color="success"
                      href="#v8-upgrade-guide"
                      size={bigScreen ? 'large' : 'medium'}
                      margin="0 x-small x-small 0"
                    >
                      8.0 Upgrade Guide
                    </Button>
                  </View>
                </View>
              </ContentWrap>
            </View>
            <ContentWrap
              padding={bigScreen ? 'none xx-large' : 'none'}
              maxWidth={contentMaxWidth}
            >
              <ColorBand />
            </ContentWrap>
          </View>
        </View>
        <ContentWrap
          padding={layout === 'small' ? 'large' : 'xx-large'}
          maxWidth={contentMaxWidth}
        >
          {bigScreen ? (
            <Flex alignItems="start" padding="medium none none">
              <Flex.Item
                shouldGrow
                shouldShrink
                padding="none xx-large none none"
              >
                {heroBodyContent}
              </Flex.Item>
              <Flex.Item size="32%">{sidebarContent}</Flex.Item>
            </Flex>
          ) : (
            <div>
              {heroBodyContent}
              {sidebarContent}
            </div>
          )}
        </ContentWrap>
      </View>
    )
  }
}

export default Hero
export { Hero }
