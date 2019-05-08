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
import { Flex } from '../index'

const regular = [
  <Flex.Item key="0">One</Flex.Item>,
  <Flex.Item key="1">Two</Flex.Item>,
  <Flex.Item key="2">Three</Flex.Item>,
  <Flex.Item key="3">Four</Flex.Item>
]

const shrink = [
  <Flex.Item key="0" padding="x-small" shrink>
    Villum dolore eu fugiat nulla pariatur.
  </Flex.Item>,
  <Flex.Item key="1" padding="x-small" shrink>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
  </Flex.Item>,
  <Flex.Item key="2" padding="x-small" shrink>
    Duis aute irure.
  </Flex.Item>,
  <Flex.Item key="3" padding="x-small" shrink>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
  </Flex.Item>
]

const grow = [
  <Flex.Item key="0" padding="x-small" size="200px">
    I am always 200px.
  </Flex.Item>,
  <Flex.Item key="1" padding="x-small" shrink grow size="200px">
    I can grow, and shrink down to 200px.
  </Flex.Item>,
  <Flex.Item key="2" padding="x-small" size="25%">
    I am always 25%.
  </Flex.Item>
]

export default {
  maxExamplesPerPage: 50,
  propValues: {
    children: [
      regular,
      shrink,
      grow
    ]
  },
  filter: (props) => {
    return props.visualDebug || props.inline || props.direction === 'row-reverse' || props.direction === 'column-reverse'
  }
}
