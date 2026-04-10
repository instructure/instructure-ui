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
  AArrowDownInstUIIcon,
  AArrowUpInstUIIcon,
  Accessibility2InstUIIcon,
  AccessibilityInstUIIcon,
  ActivityInstUIIcon,
  AiInfoInstUIIcon,
  ALargeSmallInstUIIcon,
  AppsInstUIIcon,
  BackgroundColorInstUIIcon,
  BellSolidInstUIIcon,
  CanvasLogoInstUIIcon,
  HeartInstUIIcon
} from '@instructure/ui-icons'
import type { InstUIIconProps } from '@instructure/ui-icons'

// This is just a React component, but that type doesn't work because
// the main project uses a different React version
type IconEntry = [string, any]

const COLORS: InstUIIconProps['color'][] = [
  'ai',
  'baseColor',
  'errorColor',
  'successColor',
  'warningColor',
  'infoColor',
  'mutedColor',
  'accentVioletColor'
]
const SIZES: InstUIIconProps['size'][] = [
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  '2xl',
  'illu-sm',
  'illu-md',
  'illu-lg'
]

const CUSTOM: IconEntry[] = [
  [Accessibility2InstUIIcon.displayName!, Accessibility2InstUIIcon],
  [AiInfoInstUIIcon.displayName!, AiInfoInstUIIcon],
  [AppsInstUIIcon.displayName!, AppsInstUIIcon],
  [BackgroundColorInstUIIcon.displayName!, BackgroundColorInstUIIcon],
  [BellSolidInstUIIcon.displayName!, BellSolidInstUIIcon]
]
const LUCIDE: IconEntry[] = [
  [AArrowDownInstUIIcon.displayName!, AArrowDownInstUIIcon],
  [AArrowUpInstUIIcon.displayName!, AArrowUpInstUIIcon],
  [ALargeSmallInstUIIcon.displayName!, ALargeSmallInstUIIcon],
  [AccessibilityInstUIIcon.displayName!, AccessibilityInstUIIcon],
  [ActivityInstUIIcon.displayName!, ActivityInstUIIcon]
]

function IconGrid({
  icons,
  color,
  size = 'md'
}: {
  icons: IconEntry[]
  color: InstUIIconProps['color']
  size: InstUIIconProps['size']
}) {
  return (
    <div className="flex flex-wrap gap-1">
      {icons.map(([name, Icon]) => (
        <div key={name} className="flex flex-col items-center gap-1 p-1">
          <Icon size={size} color={color} title={name} />
          <span
            style={{ fontSize: '15px' }}
            className="text-gray-500 text-center leading-tight"
          >
            {name.replace('InstUIIcon_', '')}
          </span>
        </div>
      ))}
    </div>
  )
}

function SizeRow({
  Icon,
  name,
  color
}: {
  Icon: any
  name: string
  color: InstUIIconProps['color']
}) {
  return (
    <div className="flex items-end flex-wrap gap-3">
      {SIZES.map((size) => (
        <div key={size} className="flex flex-col items-center gap-1 p-1">
          <Icon size={size} color={color} title={name} />
          <span style={{ fontSize: '15px' }} className="text-gray-500">
            {size}
          </span>
        </div>
      ))}
    </div>
  )
}

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-bold mt-7 mb-2 pb-1 border-b border-gray-300 text-gray-700">
      {children}
    </p>
  )
}

export default function CustomIconsPage() {
  return (
    <main className="axe-test p-6 font-sans">
      <h1 className="text-sm font-bold mb-1">
        Custom icons (sample of {CUSTOM.length})
      </h1>

      {COLORS.map((color) => (
        <React.Fragment key={color}>
          <SectionHeader>color={color}</SectionHeader>
          <IconGrid icons={CUSTOM} color={color} size="md" />
        </React.Fragment>
      ))}

      {SIZES.map((size) => (
        <React.Fragment key={size}>
          <SectionHeader>size={size}, color=baseColor</SectionHeader>
          <IconGrid icons={CUSTOM} color="baseColor" size={size} />
        </React.Fragment>
      ))}

      <SectionHeader>
        Size scale — AiInfo (stroke) + BellSolid (filled) + CanvasLogo (brand)
      </SectionHeader>
      <SizeRow Icon={AiInfoInstUIIcon} name="AiInfo" color="ai" />
      <SizeRow Icon={BellSolidInstUIIcon} name="BellSolid" color="ai" />
      <SizeRow
        Icon={CanvasLogoInstUIIcon}
        name="CanvasLogo"
        color="baseColor"
      />

      <h1 className="text-sm font-bold mt-10 mb-1">
        Lucide icons (sample of {LUCIDE.length})
      </h1>

      {COLORS.map((color) => (
        <React.Fragment key={color}>
          <SectionHeader>color={color}</SectionHeader>
          <IconGrid icons={LUCIDE} color={color} size="md" />
        </React.Fragment>
      ))}

      <SectionHeader>Size scale — Heart icon, color=ai</SectionHeader>
      <SizeRow Icon={HeartInstUIIcon} name="Heart" color="ai" />
    </main>
  )
}
