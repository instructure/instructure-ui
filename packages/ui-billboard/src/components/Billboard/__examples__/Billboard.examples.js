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
import IconAnnouncement from '@instructure/ui-icons/lib/Line/IconAnnouncement'
import Img from '@instructure/ui-elements/lib/components/Img'

export default {
  sectionProp: 'size',
  maxExamplesPerPage: 50,
  propValues: {
    hero: [
      function renderHero (size) {
        return <IconAnnouncement size={size} />
      },
      <Img key="test" src={require('./testImage.jpg')} />,
      null
    ],
    href: [null, 'instructure.design']
  },
  getComponentProps: () => {
    return {
      heading: 'I am a billboard',
      message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore',
      margin: 'medium small'
    }
  },
  filter: (props) => {
    return (
      props.size !== 'medium' &&
      !(
        props.hero === null &&
        props.headingLevel === 'h1' &&
        props.headingAs === 'h1' &&
        props.disabled === false
      )
    )
  }
}
