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
'use client'
import React from 'react'
import { Heading, View, Flex, SkeletonLoader } from '@instructure/ui/latest'

const SIZES = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'] as const

// Every shape on this page is static. The suite screenshots each page once per
// theme and diffs against a baseline, so a running shimmer would guarantee
// flaky diffs.
const STATIC = { animate: false } as const

export default function SkeletonPage() {
  return (
    <main className="flex gap-8 p-8 flex-col items-start axe-test">
      <div style={{ width: '40rem' }}>
        <Heading level="h2">Text — the size ramp</Heading>
        {SIZES.map((size) => (
          <View key={size} as="div" margin="0 0 small 0">
            <SkeletonLoader.Shape shape="text" size={size} {...STATIC} />
          </View>
        ))}
      </div>

      <div style={{ width: '40rem' }}>
        <Heading level="h2">Text — line counts</Heading>
        {[1, 3, 5].map((lines) => (
          <View key={lines} as="div" margin="0 0 small 0">
            <SkeletonLoader.Shape
              shape="text"
              size="md"
              lines={lines}
              {...STATIC}
            />
          </View>
        ))}
      </div>

      <div style={{ width: '40rem' }}>
        <Heading level="h2">Text — leading</Heading>
        <Flex gap="medium" alignItems="start">
          <Flex.Item shouldGrow>
            <SkeletonLoader.Shape
              shape="text"
              size="md"
              lines={3}
              leading="heading"
              {...STATIC}
            />
          </Flex.Item>
          <Flex.Item shouldGrow>
            <SkeletonLoader.Shape
              shape="text"
              size="md"
              lines={3}
              leading="text"
              {...STATIC}
            />
          </Flex.Item>
        </Flex>
      </div>

      <div style={{ width: '40rem' }}>
        <Heading level="h2">Rectangles and circles</Heading>
        <Flex gap="medium" alignItems="start">
          <Flex.Item>
            <SkeletonLoader.Shape shape="circle" diameter="2rem" {...STATIC} />
          </Flex.Item>
          <Flex.Item>
            <SkeletonLoader.Shape shape="circle" diameter="4rem" {...STATIC} />
          </Flex.Item>
          <Flex.Item shouldGrow>
            <SkeletonLoader.Shape
              shape="rectangle"
              aspectRatio="16 / 9"
              {...STATIC}
            />
          </Flex.Item>
          <Flex.Item shouldGrow>
            <SkeletonLoader.Shape shape="rectangle" height="6rem" {...STATIC} />
          </Flex.Item>
        </Flex>
      </div>

      <div style={{ width: '40rem' }}>
        <Heading level="h2">Composed card</Heading>
        <View
          as="div"
          borderWidth="small"
          borderRadius="medium"
          padding="medium"
        >
          <Flex gap="medium" alignItems="start">
            <Flex.Item>
              <SkeletonLoader.Shape
                shape="circle"
                diameter="3rem"
                {...STATIC}
              />
            </Flex.Item>
            <Flex.Item shouldGrow>
              <SkeletonLoader.Shape
                shape="text"
                size="lg"
                width="60%"
                {...STATIC}
              />
              <View as="div" margin="small 0 0 0">
                <SkeletonLoader.Shape
                  shape="text"
                  size="sm"
                  lines={3}
                  leading="text"
                  {...STATIC}
                />
              </View>
            </Flex.Item>
          </Flex>
          <View as="div" margin="medium 0 0 0">
            <SkeletonLoader.Shape
              shape="rectangle"
              aspectRatio="21 / 9"
              {...STATIC}
            />
          </View>
        </View>
      </div>

      <div style={{ width: '40rem' }}>
        <Heading level="h2">View isLoading</Heading>
        <Flex gap="medium" alignItems="start">
          <Flex.Item shouldGrow>
            <View
              as="div"
              isLoading
              height="8rem"
              borderRadius="medium"
              skeletonShape="rectangle"
              skeletonAnimate={false}
            >
              <span>hidden while loading</span>
            </View>
          </Flex.Item>
          <Flex.Item shouldGrow>
            <View
              as="div"
              isLoading
              skeletonShape="text"
              skeletonLines={3}
              skeletonSize="md"
              skeletonAnimate={false}
            >
              <span>hidden while loading</span>
            </View>
          </Flex.Item>
        </Flex>
      </div>

      <div style={{ width: '40rem' }}>
        <Heading level="h2">SkeletonLoader — loaded and loading</Heading>
        <SkeletonLoader
          isLoading={false}
          loadingLabel="Loading courses"
          loadedLabel="Two courses"
          skeleton={<SkeletonLoader.Shape shape="text" lines={2} {...STATIC} />}
        >
          <View as="div" padding="small 0">
            Biology 101 and Chemistry 201
          </View>
        </SkeletonLoader>

        <SkeletonLoader
          isLoading
          loadingLabel="Loading courses"
          loadedLabel="Two courses"
          skeleton={
            <SkeletonLoader.Shape
              shape="text"
              lines={2}
              leading="text"
              {...STATIC}
            />
          }
        >
          <View as="div" padding="small 0">
            Never shown in this state
          </View>
        </SkeletonLoader>
      </div>
    </main>
  )
}
