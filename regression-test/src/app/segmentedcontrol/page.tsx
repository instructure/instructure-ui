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
import {
  LayoutGridInstUIIcon,
  ListInstUIIcon,
  SegmentedControl,
  Text
} from '@instructure/ui/latest'

const SIZES = ['lg', 'md', 'sm'] as const

function Control({
  size,
  content,
  isDisabled,
  disabledOption
}: {
  size: (typeof SIZES)[number]
  content: 'text' | 'icon' | 'text+icon'
  isDisabled?: boolean
  disabledOption?: string
}) {
  const label = `${content} ${size}${isDisabled ? ' disabled' : ''}`
  const options = [
    { value: 'one', text: 'One', icon: <LayoutGridInstUIIcon />, name: 'Grid' },
    { value: 'two', text: 'Two', icon: <ListInstUIIcon />, name: 'List' },
    {
      value: 'three',
      text: 'Three',
      icon: <LayoutGridInstUIIcon />,
      name: 'Tiles'
    }
  ]
  return (
    <SegmentedControl
      aria-label={label}
      size={size}
      isDisabled={isDisabled}
      defaultValue="one"
    >
      {options.map((option) => (
        <SegmentedControl.Option
          key={option.value}
          value={option.value}
          isDisabled={option.value === disabledOption}
          renderLabel={content === 'icon' ? undefined : option.text}
          renderIcon={content === 'text' ? undefined : option.icon}
          screenReaderLabel={content === 'icon' ? option.name : undefined}
        />
      ))}
    </SegmentedControl>
  )
}

export default function SegmentedControlPage() {
  return (
    <main className="flex gap-8 p-8 flex-col items-start axe-test">
      {(['text', 'icon', 'text+icon'] as const).map((content) => (
        <section key={content} className="flex gap-4 flex-col items-start">
          <Text weight="bold">{content}</Text>
          {SIZES.map((size) => (
            <div key={size} className="flex gap-4 items-center">
              <Control size={size} content={content} />
              <Control size={size} content={content} isDisabled />
              <Control size={size} content={content} disabledOption="two" />
            </div>
          ))}
        </section>
      ))}
    </main>
  )
}
