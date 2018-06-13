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

import React from 'react'
import PropTypes from 'prop-types'
import Button from '@instructure/ui-buttons/lib/components/Button'
import Flex, { FlexItem } from '@instructure/ui-layout/lib/components/Flex'
import List, { ListItem } from '@instructure/ui-elements/lib/components/List'
import Text from '@instructure/ui-elements/lib/components/Text'
import Heading from '@instructure/ui-elements/lib/components/Heading'
import Pill from '@instructure/ui-elements/lib/components/Pill'
import View from '@instructure/ui-layout/lib/components/View'
import Menu, { MenuItem } from '@instructure/ui-menu/lib/components/Menu'
import Badge from '@instructure/ui-elements/lib/components/Badge'
import ScreenReaderContent from '@instructure/ui-a11y/lib/components/ScreenReaderContent'
import Responsive from '@instructure/ui-layout/lib/components/Responsive'
import TruncateText from '@instructure/ui-elements/lib/components/TruncateText'
import IconAdd from '@instructure/ui-icons/lib/Line/IconAdd'
import IconMore from '@instructure/ui-icons/lib/Line/IconMore'
import IconQuiz from '@instructure/ui-icons/lib/Line/IconQuiz'
import IconPublish from '@instructure/ui-icons/lib/Solid/IconPublish'
import ToggleGroup from '../index'

class Header extends React.Component {
  static propTypes = {
    content: PropTypes.node,
    actions: PropTypes.node
  }
  render () {
    return (
      <Flex wrapItems>
        <FlexItem shrink grow padding="0 small 0 0">
          {this.props.content}
        </FlexItem>
        <FlexItem>
          {this.props.actions}
        </FlexItem>
      </Flex>
    )
  }
}

class Item extends React.Component {
  static propTypes = {
    content: PropTypes.node,
    actions: PropTypes.node,
    new: PropTypes.bool
  }
  static defaultProps = {
    new: false
  }
  render () {
    const newBadge = (
      <span>
        <ScreenReaderContent>This is a new assignment</ScreenReaderContent>
        <Badge standalone type="notification" />
      </span>
    )

    return (
      <Responsive
        match="media"
        query={{
          small: { maxWidth: 440 },
          large: { minWidth: 441 }
        }}
      >
        {(props, matches) => {
          if (matches.includes('large')) {
            return (
              <Flex>
                <FlexItem size="1.5rem" textAlign="center">
                  {this.props.new && newBadge}
                </FlexItem>
                <FlexItem shrink grow padding="0 small 0 0">
                  {this.props.content}
                </FlexItem>
                <FlexItem>
                  {this.props.actions}
                </FlexItem>
              </Flex>
            )
          } else {
            return (
              <div>
                {this.props.new && <View display="block" margin="0 0 x-small" textAlign="end">{newBadge}</View>}
                {this.props.content}
                <View
                  as="div"
                  margin="small 0 0"
                  textAlign="end"
                >
                  {this.props.actions}
                </View>
              </div>
            )
          }
        }}
      </Responsive>
    )
  }
}

export const sizeSmall = () => {
  return (
    <ToggleGroup
      toggleLabel="Toggle the details"
      summary="I am a small-size ToggleGroup"
      size="small"
    >
      <View display="block">
        This is the details section
      </View>
    </ToggleGroup>
  )
}

export const sizeMedium = () => {
  return (
    <ToggleGroup
      toggleLabel="Toggle the details"
      summary="I am a medium-size ToggleGroup"
      size="medium"
    >
      <View display="block">
        This is the details
      </View>
    </ToggleGroup>
  )
}

export const sizeLarge = () => {
  return (
    <ToggleGroup
      toggleLabel="Toggle the details"
      summary="I am a large-size ToggleGroup"
      size="large"
    >
      <View display="block">
        This is the details
      </View>
    </ToggleGroup>
  )
}

export const rubricExample = () => {
  return (
    <ToggleGroup
      defaultExpanded
      toggleLabel="Toggle the details"
      summary={
        <Header
          content={
            <Heading level="h3"><TruncateText>Creative Writing</TruncateText></Heading>
          }
          actions={
            <Pill text="2 of 5 mastered" />
          }
        />
      }
    >
      <ToggleGroup
        defaultExpanded
        toggleLabel="Toggle the details"
        border={false}
        summary={
          <Header
            content={
              <div>
                <Heading level="h4" margin="0 0 xxx-small">CW.EL11.17</Heading>
                <Text as="div" size="small" color="secondary">3 Alignments</Text>
              </div>
            }
            actions={
              <Pill text="Mastered" variant="success" />
            }
          />
        }
      >
        <View display="block">
          <List delimiter="dashed" variant="unstyled">
            <ListItem padding="small">
              Stuff inside a list
            </ListItem>
            <ListItem padding="small">
              More stuff inside a list
            </ListItem>
          </List>
        </View>
      </ToggleGroup>
    </ToggleGroup>
  )
}

export const assignmentsExample = () => {
  return (
    <ToggleGroup
      toggleLabel="Toggle the details"
      transition
      defaultExpanded
      summary={
        <Header
          content={
            <Heading level="h3"><TruncateText>Assignments</TruncateText></Heading>
          }
          actions={
            <div>
              <Pill text="2 rules" />
              <Button variant="icon" margin="0 0 0 xx-small" icon={IconAdd}>
                <ScreenReaderContent>Add assignment</ScreenReaderContent>
              </Button>
              <Menu
                placement="bottom"
                trigger={
                  <Button variant="icon" icon={IconMore}>
                    <ScreenReaderContent>More options</ScreenReaderContent>
                  </Button>
                }
              >
                <MenuItem value="one">Option 1</MenuItem>
                <MenuItem value="two">Option 2</MenuItem>
                <MenuItem value="three">Option 3</MenuItem>
                <MenuItem value="four">Option 4</MenuItem>
              </Menu>
            </div>
          }
        />
      }
    >
      <List delimiter="solid" variant="unstyled">
        <ListItem padding="small">
          <Item
            new
            content={
              <Flex>
                <FlexItem padding="0 small">
                  <IconQuiz size="x-small" title="Quiz" style={{color: '#00AC18'}} />
                </FlexItem>
                <FlexItem shrink grow>
                  <Heading level="h4" margin="0 0 xxx-small">User Experience Survey and General Student Readiness Questions</Heading>
                  <Text as="div" size="small" color="secondary">Canvas User Experience Module</Text>
                </FlexItem>
              </Flex>
            }
            actions={
              <div>
                <Text color="secondary" size="small">100 points</Text>
                <Button
                  variant="icon"
                  margin="0 0 0 small"
                  icon={<IconPublish style={{color: '#00AC18'}} />}
                >
                  <ScreenReaderContent>Quiz</ScreenReaderContent>
                </Button>
                <Menu
                  placement="bottom"
                  trigger={
                    <Button variant="icon" icon={IconMore}>
                      <ScreenReaderContent>More options</ScreenReaderContent>
                    </Button>
                  }
                >
                  <MenuItem value="one">Option 1</MenuItem>
                  <MenuItem value="two">Option 2</MenuItem>
                  <MenuItem value="three">Option 3</MenuItem>
                  <MenuItem value="four">Option 4</MenuItem>
                </Menu>
              </div>
            }
          />
        </ListItem>
        <ListItem padding="small">
          <Item
            content={
              <Flex>
                <FlexItem padding="0 small">
                  <IconQuiz size="x-small" title="Quiz" style={{color: '#00AC18'}} />
                </FlexItem>
                <FlexItem shrink grow>
                  <Heading level="h4" margin="0 0 xxx-small">Random Pop Quiz!</Heading>
                  <Text as="div" size="small" color="secondary">Canvas User Experience Module</Text>
                </FlexItem>
              </Flex>
            }
            actions={
              <div>
                <Text color="secondary" size="small">10 points</Text>
                <Button
                  variant="icon"
                  margin="0 0 0 small"
                  icon={<IconPublish style={{color: '#00AC18'}} />}
                >
                  <ScreenReaderContent>Quiz</ScreenReaderContent>
                </Button>
                <Menu
                  placement="bottom"
                  trigger={
                    <Button variant="icon" icon={IconMore}>
                      <ScreenReaderContent>More options</ScreenReaderContent>
                    </Button>
                  }
                >
                  <MenuItem value="one">Option 1</MenuItem>
                  <MenuItem value="two">Option 2</MenuItem>
                  <MenuItem value="three">Option 3</MenuItem>
                  <MenuItem value="four">Option 4</MenuItem>
                </Menu>
              </div>
            }
          />
        </ListItem>
      </List>
    </ToggleGroup>
  )
}
