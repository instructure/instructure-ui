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
import React, { useEffect, useRef } from 'react'
import {
  Button,
  CondensedButton,
  CloseButton,
  IconButton
} from 'instructure-ui/ui-buttons/es/index'
import { View } from 'instructure-ui/ui-view/es/index'
import { Flex } from 'instructure-ui/ui-flex/es/index'
import {
  IconAddLine,
  IconUserLine,
  IconAiSolid,
  IconAiColoredSolid,
  IconXSolid
} from 'instructure-ui/ui-icons/es/index'

export default function ButtonPage() {
  const myElementRef = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    myElementRef?.current?.focus()
  })
  const colors = [
    'primary',
    'primary-inverse',
    'secondary',
    'success',
    'danger'
  ]
  const sizes = ['small', 'medium', 'large']
  return (
    <main className="flex gap-8 p-8 flex-col items-start axe-test">
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <Button>Button</Button>
        {colors.map((color) => (
          <Button key={'color' + color} color={color}>
            {color} color
          </Button>
        ))}
      </div>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        {sizes.map((size) => (
          <Button key={'size' + size} size={size}>
            {size} size
          </Button>
        ))}
      </div>
      <Button renderIcon={IconAddLine}>Icon Button</Button>
      <Button disabled>Disabled Button</Button>
      <Button ref={myElementRef}>focused button</Button>
      <CondensedButton>CondensedButton</CondensedButton>
      {/* Positioned CloseButton (placement=end, offset=small) */}
      <View
        display="block"
        position="relative"
        height="5rem"
        width="10rem"
        background="primary"
        shadow="resting"
      >
        <CloseButton placement="end" offset="small" screenReaderLabel="Close" />
      </View>

      <View
        display="block"
        position="relative"
        background="primary"
        shadow="resting"
      >
        <Flex
          height="6rem"
          justifyItems="space-between"
          alignItems="center"
          padding="medium"
        >
          <Flex.Item shouldShrink shouldGrow>
            <h2>A heading</h2>
          </Flex.Item>
          <Flex.Item padding="none none none medium">
            <CloseButton size="medium" screenReaderLabel="Close" />
          </Flex.Item>
        </Flex>
      </View>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <IconButton screenReaderLabel="Add User">
          <IconAddLine />
        </IconButton>
        <IconButton color="primary" screenReaderLabel="Add blog post">
          <IconAddLine />
        </IconButton>
        <IconButton screenReaderLabel="View user profile">
          <IconUserLine />
        </IconButton>
        <IconButton
          color="ai-primary"
          screenReaderLabel="AI button"
          margin="small"
        >
          <IconAiSolid />
        </IconButton>
        <IconButton
          color="ai-secondary"
          screenReaderLabel="AI button"
          margin="small"
        >
          <IconAiColoredSolid />
        </IconButton>
        <IconButton
          shape="rectangle"
          screenReaderLabel="Delete tag"
          margin="small"
        >
          <IconXSolid />
        </IconButton>
        <IconButton
          shape="circle"
          screenReaderLabel="Delete tag"
          margin="small"
        >
          <IconXSolid />
        </IconButton>
        <View display="inline-block" background="primary">
          <IconButton
            withBackground={false}
            withBorder={false}
            screenReaderLabel="Delete tag"
            margin="large"
          >
            <IconXSolid />
          </IconButton>
        </View>
        <View display="inline-block" background="primary-inverse">
          <IconButton
            withBackground={false}
            withBorder={false}
            color="primary-inverse"
            screenReaderLabel="Delete tag"
            margin="large"
          >
            <IconXSolid />
          </IconButton>
        </View>
      </div>
    </main>
  )
}
