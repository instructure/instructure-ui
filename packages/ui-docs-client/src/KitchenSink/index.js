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

import React, { useState } from 'react'
import { ApplyTextDirection } from '@instructure/ui-i18n'
import { Avatar } from '@instructure/ui-avatar'
import { Pill } from '@instructure/ui-pill'
import { Flex, FlexItem } from '@instructure/ui-flex'
import { Breadcrumb, BreadcrumbLink } from '@instructure/ui-breadcrumb'
import { Spinner } from '@instructure/ui-spinner'
import { View } from '@instructure/ui-view'

const components = {
  Avatar: [
    <Avatar
      key={'avatar1'}
      themeOverride={{ color: 'blue' }}
      name="Sarah Robinson"
      margin="0 small 0 0"
    />,
    <Avatar key={'avatar2'} name="Rarah Sobinson" margin="0 small 0 0" />,
    <Avatar key={'avatar3'} name="Rarah Sobinson" shape="rectangle" />,
    <Avatar
      key={'avatar4'}
      name="Rarah Sobinson"
      size="x-large"
      src={
        'https://thumbs.dreamstime.com/b/cute-smiling-teacher-tutor-avatar-internet-learning-line-distant-education-web-study-school-chat-webinar-discussion-forum-185531323.jpg'
      }
    />
  ],
  Pill: [<Pill key={'pill1'}>Pill teszt 1</Pill>],
  Breadcrumb: [
    <Breadcrumb key={'breadcrumb1'} label={'Teszt'}>
      <BreadcrumbLink key="breadcrumbLink1" onClick={() => {}}>
        English 204
      </BreadcrumbLink>
      <BreadcrumbLink key="breadcrumbLink2" href="#">
        The Rabbit Novels
      </BreadcrumbLink>
      <BreadcrumbLink key="breadcrumbLink3">Rabbit Is Rich</BreadcrumbLink>
    </Breadcrumb>
  ],
  Spinner: [
    <Spinner key={'spinner1'} renderTitle="Spinner1" size="large" />,
    <Spinner key={'spinner2'} renderTitle="Spinner2" />,
    <Spinner key={'spinner3'} renderTitle="Spinner3" size="small" />,
    <Spinner key={'spinner4'} renderTitle="Spinner4" size="x-small" />
  ],
  Flex: [
    <Flex key={'flex6'} withVisualDebug>
      <FlexItem shouldShrink shouldGrow>
        I am growing and shrinking!
      </FlexItem>
      <FlexItem>I am not shrinking or growing.</FlexItem>
    </Flex>,
    <Flex key={'flex7'} withVisualDebug>
      <FlexItem size="200px">I am always 200px.</FlexItem>
      <FlexItem shouldShrink shouldGrow size="200px">
        I can grow, and shrink down to 200px.
      </FlexItem>
      <FlexItem size="25%">I am always 25%.</FlexItem>
    </Flex>,
    <Flex key={'flex8'} alignItems="end" withVisualDebug>
      <FlexItem>
        <Avatar name="Sarah Robinson" size="large" />
      </FlexItem>
      <FlexItem shouldGrow shouldShrink>
        I should be aligned to the bottom of the Avatar.
      </FlexItem>
      <FlexItem>Me, too.</FlexItem>
      <FlexItem align="start">I am aligning myself to the top.</FlexItem>
    </Flex>,
    <div key={'flex9'}>
      <Flex justifyItems="center" withVisualDebug>
        <FlexItem>
          <Avatar name="Sarah Robinson" size="large" />
        </FlexItem>
        <FlexItem>We are all centered!</FlexItem>
        <FlexItem>Yeah!</FlexItem>
      </Flex>

      <Flex justifyItems="space-between" withVisualDebug>
        <FlexItem>
          <Avatar name="Sarah Robinson" size="large" />
        </FlexItem>
        <FlexItem>Ah, a little more space.</FlexItem>
        <FlexItem>Totally.</FlexItem>
      </Flex>

      <Flex justifyItems="end" withVisualDebug>
        <FlexItem>
          <Avatar name="Sarah Robinson" size="large" />
        </FlexItem>
        <FlexItem>Smooshed again.</FlexItem>
        <FlexItem>Ugh.</FlexItem>
      </Flex>
    </div>
  ],
  View: [
    <View as="div" key="V1">
      Some content for the View -- default text align
    </View>,
    <View as="div" key="V2" textAlign="center">
      Some content for the View -- center left align
    </View>,
    <View as="div" key="V3" textAlign="end">
      Some content for the View -- right left align
    </View>
  ]
}
const App = () => {
  const [renderedComponent, setRenderedComponent] = useState()
  const [dir, setDir] = useState('ltr')
  const toggleDir = () => {
    setDir((prevDir) => (prevDir === 'ltr' ? 'rtl' : 'ltr'))
  }

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 1, cursor: 'pointer' }}>
        {Object.keys(components).map((name) => (
          <button
            onKeyPress={() => {}}
            style={{
              margin: 10,
              height: 30,
              borderBottom: 'solid',
              borderWidth: 1,
              textAlign: 'center',
              lineHeight: '30px'
            }}
            key={name}
            onClick={() => setRenderedComponent(name)}
          >
            {name}
          </button>
        ))}
      </div>
      <div style={{ flex: 10 }}>
        {renderedComponent && (
          <h1 style={{ textAlign: 'center' }}>
            <div>{renderedComponent}</div>
            <button style={{ margin: '16px auto 24px' }} onClick={toggleDir}>
              toggle direction
            </button>
          </h1>
        )}

        <ApplyTextDirection dir={dir} as="div">
          {components[renderedComponent] && components[renderedComponent][0]
            ? components[renderedComponent].map((component, index) => (
                <div key={`${renderedComponent}-${index}`}>
                  {component}
                  <hr />
                </div>
              ))
            : components[renderedComponent]}
        </ApplyTextDirection>
      </div>
    </div>
  )
}

export default App
export { App }
