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
import { Avatar } from '@instructure/ui-avatar'
import { Flex, FlexItem } from '@instructure/ui-flex'
import { Breadcrumb, BreadcrumbLink } from '@instructure/ui-breadcrumb'
import { Spinner } from '@instructure/ui-spinner'
import { Heading } from '@instructure/ui-heading'
import { Img } from '@instructure/ui-img'
import { View } from '@instructure/ui-view'

const components = {
  Avatar: (
    <div>
      <Avatar
        themeOverride={{ color: 'blue' }}
        name="Sarah Robinson"
        margin="0 small 0 0"
      />
      <Avatar name="Rarah Sobinson" margin="0 small 0 0" />
      <Avatar name="Rarah Sobinson" shape="rectangle" />
      <Avatar
        name="Rarah Sobinson"
        size="x-large"
        src={
          'https://thumbs.dreamstime.com/b/cute-smiling-teacher-tutor-avatar-internet-learning-line-distant-education-web-study-school-chat-webinar-discussion-forum-185531323.jpg'
        }
      />
    </div>
  ),
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
  Heading: (
    <div>
      <Heading level="h1" as="h2" margin="0 0 x-small">
        Heading level One
      </Heading>
      <Heading level="h2" as="h1" margin="0 0 x-small">
        Heading level Two
      </Heading>
      <Heading level="h3" margin="0 0 x-small">
        Heading level Three
      </Heading>
      <Heading level="h4" margin="0 0 x-small">
        Heading level Four
      </Heading>
      <Heading level="h5" margin="0 0 x-small">
        Heading level Five
      </Heading>
      <Heading level="reset" as="h2">
        Heading level reset as a Two
      </Heading>
    </div>
  ),
  Img: (
    <View textAlign="center" as="div">
      <Img
        src="https://via.placeholder.com/200"
        overlay={{ color: '#008ee2', opacity: 9, blend: 'overlay' }}
        alt="A placeholder image"
        margin="x-small"
      />
      <Img
        src="https://via.placeholder.com/200"
        overlay={{ color: '#008ee2', opacity: 6, blend: 'multiply' }}
        alt="A placeholder image"
        margin="x-small"
      />
      <Img
        src="https://via.placeholder.com/200"
        overlay={{ color: '#008ee2', opacity: 3 }}
        alt="A placeholder image"
        margin="x-small"
      />
    </View>
  )
}
const App = () => {
  const [renderedComponent, setRenderedComponent] = useState()

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
        <h1 style={{ textAlign: 'center' }}>{renderedComponent}</h1>
        {components[renderedComponent] && components[renderedComponent][0]
          ? components[renderedComponent].map((component, index) => (
              <div key={`${renderedComponent}-${index}`}>
                {component} <hr />
              </div>
            ))
          : components[renderedComponent]}
      </div>
    </div>
  )
}

export default App
export { App }
