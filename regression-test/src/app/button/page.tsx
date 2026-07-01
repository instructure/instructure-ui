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
  IconButton,
  View,
  Flex,
  IconAddLine,
  IconUserLine,
  IconAiSolid,
  IconAiColoredSolid,
  IconXSolid
} from '@instructure/ui/latest'

export default function ButtonPage() {
  const myElementRef = useRef<any>(null)
  useEffect(() => {
    myElementRef?.current?.focus()
  })
  return (
    <main className="flex gap-8 p-8 flex-col items-start axe-test">
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <Button>Button</Button>
        <Button color="primary">primary</Button>
        <View
          display="inline-block"
          background="primary-inverse"
          padding="small"
        >
          <Button color="primary-inverse">primary-inverse</Button>
        </View>
        <Button color="secondary">secondary</Button>
        <Button color="success">success</Button>
        <Button color="danger">danger</Button>
      </div>
      withBackground = false:
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <Button withBackground={false}>Button</Button>
        <Button color="primary" withBackground={false}>
          primary
        </Button>
        <View
          display="inline-block"
          background="primary-inverse"
          padding="small"
        >
          <Button color="primary-inverse" withBackground={false}>
            primary-inverse
          </Button>
        </View>
        <Button color="secondary" withBackground={false}>
          secondary
        </Button>
        <Button color="success" withBackground={false}>
          success
        </Button>
        <Button color="danger" withBackground={false}>
          danger
        </Button>
      </div>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <Button size="small">small</Button>
        <Button size="medium">medium</Button>
        <Button size="large">large</Button>
      </div>
      <Button renderIcon={<IconAddLine />}>Icon Button</Button>
      Disabled:
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <Button disabled>Button</Button>
        <Button disabled withBackground={false}>
          no bg
        </Button>
        <Button disabled color="ai-primary">
          AI
        </Button>
        <Button disabled color="danger">
          danger
        </Button>
        <Button disabled color="danger" withBackground={false}>
          danger no bg
        </Button>
        <View
          display="inline-block"
          background="primary-inverse"
          padding="small"
        >
          <Button disabled color="primary-inverse">
            primary-inverse
          </Button>
          <Button disabled withBackground={false} color="primary-inverse">
            primary-inverse no bg
          </Button>
        </View>
      </div>
      <Button ref={myElementRef}>focused button</Button>
      <CondensedButton>CondensedButton</CondensedButton>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <View
          display="block"
          position="relative"
          height="5rem"
          width="10rem"
          background="primary"
          shadow="resting"
        >
          <CloseButton
            placement="end"
            offset="small"
            screenReaderLabel="Close"
          />
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
      </div>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <Button color="ai-primary" renderIcon={<IconAiSolid />} margin="small">
          AI Primary
        </Button>
        <Button
          color="ai-secondary"
          renderIcon={<IconAiColoredSolid />}
          margin="small"
        >
          AI Secondary
        </Button>
        <IconButton screenReaderLabel="Add User">
          <IconAddLine />
        </IconButton>
        <IconButton color="primary" screenReaderLabel="Add blog post">
          <IconAddLine />
        </IconButton>
        <IconButton screenReaderLabel="View user profile">
          <IconUserLine />
        </IconButton>
      </div>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
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
            shape="circle"
            color="ai-secondary"
            screenReaderLabel="AI button"
            margin="small"
          >
            <IconAiColoredSolid />
          </IconButton>
        </View>
        <View display="inline-block" background="primary-inverse">
          <IconButton
            shape="circle"
            color="ai-primary"
            screenReaderLabel="AI button"
            margin="small"
          >
            <IconAiSolid />
          </IconButton>
        </View>
      </div>
      {/*
        Unlike every other color, ai-secondary has no real CSS border — it fakes
        its gradient "border" with a ::before ring whose space is reserved by
        padding on the wrapper. That padding inflates the outer size, so the
        content box has to be shrunk back by a hand-written, per-size calc
        (2 × borderWidth) to stay identical to the other colors. Because that
        compensation is manual and size-specific, it's easy to miss a size or
        variant.
      */}
      ai-secondary size parity (all sizes):
      {(
        ['small', 'medium', 'large', 'condensedSmall', 'condensedMedium'] as const
      ).map((size) => (
        <div
          key={size}
          style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}
        >
          <Button size={size} color="secondary">
            {size}
          </Button>
          <Button size={size} color="ai-secondary">
            {size}
          </Button>
          <IconButton size={size} color="secondary" screenReaderLabel="Add">
            <IconAddLine />
          </IconButton>
          <IconButton size={size} color="ai-secondary" screenReaderLabel="AI">
            <IconAiColoredSolid />
          </IconButton>
        </div>
      ))}
    </main>
  )
}
