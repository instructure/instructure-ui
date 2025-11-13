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

/**
 * @packageDocumentation
 * Lucide icons for Instructure UI with RTL support.
 *
 * This package provides access to all 1,500+ Lucide icons with automatic
 * RTL (right-to-left) support for bidirectional icons.
 *
 * ## Usage
 *
 * ```tsx
 * import { ArrowLeft, Plus, Check } from '@instructure/ui-icons-lucide'
 *
 * const MyComponent = () => (
 *   <div>
 *     <ArrowLeft size={24} />
 *     <Plus size={24} />
 *   </div>
 * )
 * ```
 *
 * ## RTL Support
 *
 * Bidirectional icons (arrows, chevrons, etc.) automatically flip horizontally
 * in RTL contexts. Non-directional icons render normally in all contexts.
 *
 * ## API
 *
 * All icons accept the standard Lucide props:
 * - `size`: number - Icon size in pixels
 * - `color`: string - Icon color (defaults to currentColor)
 * - `strokeWidth`: number - Stroke width
 * - Plus all standard SVG attributes
 *
 * See https://lucide.dev for complete icon list and documentation.
 */

import * as Lucide from 'lucide-react'
import { withRTL } from './withRTL'

// Re-export types
export type { LucideProps, LucideIcon } from 'lucide-react'

// Re-export utilities
export { withRTL }
export { BIDIRECTIONAL_ICONS } from './bidirectional'

/**
 * All Lucide icons wrapped with RTL support
 *
 * All icons are wrapped with the withRTL utility. Bidirectional icons
 * (arrows, chevrons, etc.) automatically flip horizontally in RTL contexts.
 * Non-directional icons pass through unchanged.
 *
 * Based on mapping.json version 1.0 (updated 2025-11-07)
 * Total icons: 1737
 * Bidirectional: 2
 */

export const AArrowDown = withRTL(Lucide.AArrowDown, { flipsInRTL: false })
export const AArrowUp = withRTL(Lucide.AArrowUp, { flipsInRTL: false })
export const ALargeSmall = withRTL(Lucide.ALargeSmall, { flipsInRTL: false })
export const Accessibility = withRTL(Lucide.Accessibility, {
  flipsInRTL: false
})
export const Activity = withRTL(Lucide.Activity, { flipsInRTL: false })
export const ActivitySquare = withRTL(Lucide.ActivitySquare, {
  flipsInRTL: false
})
export const AirVent = withRTL(Lucide.AirVent, { flipsInRTL: false })
export const Airplay = withRTL(Lucide.Airplay, { flipsInRTL: false })
export const AlarmCheck = withRTL(Lucide.AlarmCheck, { flipsInRTL: false })
export const AlarmClock = withRTL(Lucide.AlarmClock, { flipsInRTL: false })
export const AlarmClockCheck = withRTL(Lucide.AlarmClockCheck, {
  flipsInRTL: false
})
export const AlarmClockMinus = withRTL(Lucide.AlarmClockMinus, {
  flipsInRTL: false
})
export const AlarmClockOff = withRTL(Lucide.AlarmClockOff, {
  flipsInRTL: false
})
export const AlarmClockPlus = withRTL(Lucide.AlarmClockPlus, {
  flipsInRTL: false
})
export const AlarmMinus = withRTL(Lucide.AlarmMinus, { flipsInRTL: false })
export const AlarmPlus = withRTL(Lucide.AlarmPlus, { flipsInRTL: false })
export const AlarmSmoke = withRTL(Lucide.AlarmSmoke, { flipsInRTL: false })
export const Album = withRTL(Lucide.Album, { flipsInRTL: false })
export const AlertCircle = withRTL(Lucide.AlertCircle, { flipsInRTL: false })
export const AlertOctagon = withRTL(Lucide.AlertOctagon, { flipsInRTL: false })
export const AlertTriangle = withRTL(Lucide.AlertTriangle, {
  flipsInRTL: false
})
export const AlignCenter = withRTL(Lucide.AlignCenter, { flipsInRTL: false })
export const AlignCenterHorizontal = withRTL(Lucide.AlignCenterHorizontal, {
  flipsInRTL: false
})
export const AlignCenterVertical = withRTL(Lucide.AlignCenterVertical, {
  flipsInRTL: false
})
export const AlignEndHorizontal = withRTL(Lucide.AlignEndHorizontal, {
  flipsInRTL: false
})
export const AlignEndVertical = withRTL(Lucide.AlignEndVertical, {
  flipsInRTL: false
})
export const AlignHorizontalDistributeCenter = withRTL(
  Lucide.AlignHorizontalDistributeCenter,
  { flipsInRTL: false }
)
export const AlignHorizontalDistributeEnd = withRTL(
  Lucide.AlignHorizontalDistributeEnd,
  { flipsInRTL: false }
)
export const AlignHorizontalDistributeStart = withRTL(
  Lucide.AlignHorizontalDistributeStart,
  { flipsInRTL: false }
)
export const AlignHorizontalJustifyCenter = withRTL(
  Lucide.AlignHorizontalJustifyCenter,
  { flipsInRTL: false }
)
export const AlignHorizontalJustifyEnd = withRTL(
  Lucide.AlignHorizontalJustifyEnd,
  { flipsInRTL: false }
)
export const AlignHorizontalJustifyStart = withRTL(
  Lucide.AlignHorizontalJustifyStart,
  { flipsInRTL: false }
)
export const AlignHorizontalSpaceAround = withRTL(
  Lucide.AlignHorizontalSpaceAround,
  { flipsInRTL: false }
)
export const AlignHorizontalSpaceBetween = withRTL(
  Lucide.AlignHorizontalSpaceBetween,
  { flipsInRTL: false }
)
export const AlignJustify = withRTL(Lucide.AlignJustify, { flipsInRTL: false })
export const AlignLeft = withRTL(Lucide.AlignLeft, { flipsInRTL: false })
export const AlignRight = withRTL(Lucide.AlignRight, { flipsInRTL: false })
export const AlignStartHorizontal = withRTL(Lucide.AlignStartHorizontal, {
  flipsInRTL: false
})
export const AlignStartVertical = withRTL(Lucide.AlignStartVertical, {
  flipsInRTL: false
})
export const AlignVerticalDistributeCenter = withRTL(
  Lucide.AlignVerticalDistributeCenter,
  { flipsInRTL: false }
)
export const AlignVerticalDistributeEnd = withRTL(
  Lucide.AlignVerticalDistributeEnd,
  { flipsInRTL: false }
)
export const AlignVerticalDistributeStart = withRTL(
  Lucide.AlignVerticalDistributeStart,
  { flipsInRTL: false }
)
export const AlignVerticalJustifyCenter = withRTL(
  Lucide.AlignVerticalJustifyCenter,
  { flipsInRTL: false }
)
export const AlignVerticalJustifyEnd = withRTL(Lucide.AlignVerticalJustifyEnd, {
  flipsInRTL: false
})
export const AlignVerticalJustifyStart = withRTL(
  Lucide.AlignVerticalJustifyStart,
  { flipsInRTL: false }
)
export const AlignVerticalSpaceAround = withRTL(
  Lucide.AlignVerticalSpaceAround,
  { flipsInRTL: false }
)
export const AlignVerticalSpaceBetween = withRTL(
  Lucide.AlignVerticalSpaceBetween,
  { flipsInRTL: false }
)
export const Ambulance = withRTL(Lucide.Ambulance, { flipsInRTL: false })
export const Ampersand = withRTL(Lucide.Ampersand, { flipsInRTL: false })
export const Ampersands = withRTL(Lucide.Ampersands, { flipsInRTL: false })
export const Amphora = withRTL(Lucide.Amphora, { flipsInRTL: false })
export const Anchor = withRTL(Lucide.Anchor, { flipsInRTL: false })
export const Angry = withRTL(Lucide.Angry, { flipsInRTL: false })
export const Annoyed = withRTL(Lucide.Annoyed, { flipsInRTL: false })
export const Antenna = withRTL(Lucide.Antenna, { flipsInRTL: false })
export const Anvil = withRTL(Lucide.Anvil, { flipsInRTL: false })
export const Aperture = withRTL(Lucide.Aperture, { flipsInRTL: false })
export const AppWindow = withRTL(Lucide.AppWindow, { flipsInRTL: false })
export const AppWindowMac = withRTL(Lucide.AppWindowMac, { flipsInRTL: false })
export const Apple = withRTL(Lucide.Apple, { flipsInRTL: false })
export const Archive = withRTL(Lucide.Archive, { flipsInRTL: false })
export const ArchiveRestore = withRTL(Lucide.ArchiveRestore, {
  flipsInRTL: false
})
export const ArchiveX = withRTL(Lucide.ArchiveX, { flipsInRTL: false })
export const AreaChart = withRTL(Lucide.AreaChart, { flipsInRTL: false })
export const Armchair = withRTL(Lucide.Armchair, { flipsInRTL: false })
export const ArrowBigDown = withRTL(Lucide.ArrowBigDown, { flipsInRTL: false })
export const ArrowBigDownDash = withRTL(Lucide.ArrowBigDownDash, {
  flipsInRTL: false
})
export const ArrowBigLeft = withRTL(Lucide.ArrowBigLeft, { flipsInRTL: false })
export const ArrowBigLeftDash = withRTL(Lucide.ArrowBigLeftDash, {
  flipsInRTL: false
})
export const ArrowBigRight = withRTL(Lucide.ArrowBigRight, {
  flipsInRTL: false
})
export const ArrowBigRightDash = withRTL(Lucide.ArrowBigRightDash, {
  flipsInRTL: false
})
export const ArrowBigUp = withRTL(Lucide.ArrowBigUp, { flipsInRTL: false })
export const ArrowBigUpDash = withRTL(Lucide.ArrowBigUpDash, {
  flipsInRTL: false
})
export const ArrowDown = withRTL(Lucide.ArrowDown, { flipsInRTL: false })
export const ArrowDown01 = withRTL(Lucide.ArrowDown01, { flipsInRTL: false })
export const ArrowDown10 = withRTL(Lucide.ArrowDown10, { flipsInRTL: false })
export const ArrowDownAZ = withRTL(Lucide.ArrowDownAZ, { flipsInRTL: false })
export const ArrowDownAz = withRTL(Lucide.ArrowDownAz, { flipsInRTL: false })
export const ArrowDownCircle = withRTL(Lucide.ArrowDownCircle, {
  flipsInRTL: false
})
export const ArrowDownFromLine = withRTL(Lucide.ArrowDownFromLine, {
  flipsInRTL: false
})
export const ArrowDownLeft = withRTL(Lucide.ArrowDownLeft, {
  flipsInRTL: false
})
export const ArrowDownLeftFromCircle = withRTL(Lucide.ArrowDownLeftFromCircle, {
  flipsInRTL: false
})
export const ArrowDownLeftFromSquare = withRTL(Lucide.ArrowDownLeftFromSquare, {
  flipsInRTL: false
})
export const ArrowDownLeftSquare = withRTL(Lucide.ArrowDownLeftSquare, {
  flipsInRTL: false
})
export const ArrowDownNarrowWide = withRTL(Lucide.ArrowDownNarrowWide, {
  flipsInRTL: false
})
export const ArrowDownRight = withRTL(Lucide.ArrowDownRight, {
  flipsInRTL: false
})
export const ArrowDownRightFromCircle = withRTL(
  Lucide.ArrowDownRightFromCircle,
  { flipsInRTL: false }
)
export const ArrowDownRightFromSquare = withRTL(
  Lucide.ArrowDownRightFromSquare,
  { flipsInRTL: false }
)
export const ArrowDownRightSquare = withRTL(Lucide.ArrowDownRightSquare, {
  flipsInRTL: false
})
export const ArrowDownSquare = withRTL(Lucide.ArrowDownSquare, {
  flipsInRTL: false
})
export const ArrowDownToDot = withRTL(Lucide.ArrowDownToDot, {
  flipsInRTL: false
})
export const ArrowDownToLine = withRTL(Lucide.ArrowDownToLine, {
  flipsInRTL: false
})
export const ArrowDownUp = withRTL(Lucide.ArrowDownUp, { flipsInRTL: false })
export const ArrowDownWideNarrow = withRTL(Lucide.ArrowDownWideNarrow, {
  flipsInRTL: false
})
export const ArrowDownZA = withRTL(Lucide.ArrowDownZA, { flipsInRTL: false })
export const ArrowDownZa = withRTL(Lucide.ArrowDownZa, { flipsInRTL: false })
export const ArrowLeft = withRTL(Lucide.ArrowLeft, { flipsInRTL: true })
export const ArrowLeftCircle = withRTL(Lucide.ArrowLeftCircle, {
  flipsInRTL: false
})
export const ArrowLeftFromLine = withRTL(Lucide.ArrowLeftFromLine, {
  flipsInRTL: false
})
export const ArrowLeftRight = withRTL(Lucide.ArrowLeftRight, {
  flipsInRTL: false
})
export const ArrowLeftSquare = withRTL(Lucide.ArrowLeftSquare, {
  flipsInRTL: false
})
export const ArrowLeftToLine = withRTL(Lucide.ArrowLeftToLine, {
  flipsInRTL: false
})
export const ArrowRight = withRTL(Lucide.ArrowRight, { flipsInRTL: true })
export const ArrowRightCircle = withRTL(Lucide.ArrowRightCircle, {
  flipsInRTL: false
})
export const ArrowRightFromLine = withRTL(Lucide.ArrowRightFromLine, {
  flipsInRTL: false
})
export const ArrowRightLeft = withRTL(Lucide.ArrowRightLeft, {
  flipsInRTL: false
})
export const ArrowRightSquare = withRTL(Lucide.ArrowRightSquare, {
  flipsInRTL: false
})
export const ArrowRightToLine = withRTL(Lucide.ArrowRightToLine, {
  flipsInRTL: false
})
export const ArrowUp = withRTL(Lucide.ArrowUp, { flipsInRTL: false })
export const ArrowUp01 = withRTL(Lucide.ArrowUp01, { flipsInRTL: false })
export const ArrowUp10 = withRTL(Lucide.ArrowUp10, { flipsInRTL: false })
export const ArrowUpAZ = withRTL(Lucide.ArrowUpAZ, { flipsInRTL: false })
export const ArrowUpAz = withRTL(Lucide.ArrowUpAz, { flipsInRTL: false })
export const ArrowUpCircle = withRTL(Lucide.ArrowUpCircle, {
  flipsInRTL: false
})
export const ArrowUpDown = withRTL(Lucide.ArrowUpDown, { flipsInRTL: false })
export const ArrowUpFromDot = withRTL(Lucide.ArrowUpFromDot, {
  flipsInRTL: false
})
export const ArrowUpFromLine = withRTL(Lucide.ArrowUpFromLine, {
  flipsInRTL: false
})
export const ArrowUpLeft = withRTL(Lucide.ArrowUpLeft, { flipsInRTL: false })
export const ArrowUpLeftFromCircle = withRTL(Lucide.ArrowUpLeftFromCircle, {
  flipsInRTL: false
})
export const ArrowUpLeftFromSquare = withRTL(Lucide.ArrowUpLeftFromSquare, {
  flipsInRTL: false
})
export const ArrowUpLeftSquare = withRTL(Lucide.ArrowUpLeftSquare, {
  flipsInRTL: false
})
export const ArrowUpNarrowWide = withRTL(Lucide.ArrowUpNarrowWide, {
  flipsInRTL: false
})
export const ArrowUpRight = withRTL(Lucide.ArrowUpRight, { flipsInRTL: false })
export const ArrowUpRightFromCircle = withRTL(Lucide.ArrowUpRightFromCircle, {
  flipsInRTL: false
})
export const ArrowUpRightFromSquare = withRTL(Lucide.ArrowUpRightFromSquare, {
  flipsInRTL: false
})
export const ArrowUpRightSquare = withRTL(Lucide.ArrowUpRightSquare, {
  flipsInRTL: false
})
export const ArrowUpSquare = withRTL(Lucide.ArrowUpSquare, {
  flipsInRTL: false
})
export const ArrowUpToLine = withRTL(Lucide.ArrowUpToLine, {
  flipsInRTL: false
})
export const ArrowUpWideNarrow = withRTL(Lucide.ArrowUpWideNarrow, {
  flipsInRTL: false
})
export const ArrowUpZA = withRTL(Lucide.ArrowUpZA, { flipsInRTL: false })
export const ArrowUpZa = withRTL(Lucide.ArrowUpZa, { flipsInRTL: false })
export const ArrowsUpFromLine = withRTL(Lucide.ArrowsUpFromLine, {
  flipsInRTL: false
})
export const Asterisk = withRTL(Lucide.Asterisk, { flipsInRTL: false })
export const AsteriskSquare = withRTL(Lucide.AsteriskSquare, {
  flipsInRTL: false
})
export const AtSign = withRTL(Lucide.AtSign, { flipsInRTL: false })
export const Atom = withRTL(Lucide.Atom, { flipsInRTL: false })
export const AudioLines = withRTL(Lucide.AudioLines, { flipsInRTL: false })
export const AudioWaveform = withRTL(Lucide.AudioWaveform, {
  flipsInRTL: false
})
export const Award = withRTL(Lucide.Award, { flipsInRTL: false })
export const Axe = withRTL(Lucide.Axe, { flipsInRTL: false })
export const Axis3D = withRTL(Lucide.Axis3D, { flipsInRTL: false })
export const Axis3d = withRTL(Lucide.Axis3d, { flipsInRTL: false })
export const Baby = withRTL(Lucide.Baby, { flipsInRTL: false })
export const Backpack = withRTL(Lucide.Backpack, { flipsInRTL: false })
export const Badge = withRTL(Lucide.Badge, { flipsInRTL: false })
export const BadgeAlert = withRTL(Lucide.BadgeAlert, { flipsInRTL: false })
export const BadgeCent = withRTL(Lucide.BadgeCent, { flipsInRTL: false })
export const BadgeCheck = withRTL(Lucide.BadgeCheck, { flipsInRTL: false })
export const BadgeDollarSign = withRTL(Lucide.BadgeDollarSign, {
  flipsInRTL: false
})
export const BadgeEuro = withRTL(Lucide.BadgeEuro, { flipsInRTL: false })
export const BadgeHelp = withRTL(Lucide.BadgeHelp, { flipsInRTL: false })
export const BadgeIndianRupee = withRTL(Lucide.BadgeIndianRupee, {
  flipsInRTL: false
})
export const BadgeInfo = withRTL(Lucide.BadgeInfo, { flipsInRTL: false })
export const BadgeJapaneseYen = withRTL(Lucide.BadgeJapaneseYen, {
  flipsInRTL: false
})
export const BadgeMinus = withRTL(Lucide.BadgeMinus, { flipsInRTL: false })
export const BadgePercent = withRTL(Lucide.BadgePercent, { flipsInRTL: false })
export const BadgePlus = withRTL(Lucide.BadgePlus, { flipsInRTL: false })
export const BadgePoundSterling = withRTL(Lucide.BadgePoundSterling, {
  flipsInRTL: false
})
export const BadgeRussianRuble = withRTL(Lucide.BadgeRussianRuble, {
  flipsInRTL: false
})
export const BadgeSwissFranc = withRTL(Lucide.BadgeSwissFranc, {
  flipsInRTL: false
})
export const BadgeX = withRTL(Lucide.BadgeX, { flipsInRTL: false })
export const BaggageClaim = withRTL(Lucide.BaggageClaim, { flipsInRTL: false })
export const Ban = withRTL(Lucide.Ban, { flipsInRTL: false })
export const Banana = withRTL(Lucide.Banana, { flipsInRTL: false })
export const Bandage = withRTL(Lucide.Bandage, { flipsInRTL: false })
export const Banknote = withRTL(Lucide.Banknote, { flipsInRTL: false })
export const BarChart = withRTL(Lucide.BarChart, { flipsInRTL: false })
export const BarChart2 = withRTL(Lucide.BarChart2, { flipsInRTL: false })
export const BarChart3 = withRTL(Lucide.BarChart3, { flipsInRTL: false })
export const BarChart4 = withRTL(Lucide.BarChart4, { flipsInRTL: false })
export const BarChartBig = withRTL(Lucide.BarChartBig, { flipsInRTL: false })
export const BarChartHorizontal = withRTL(Lucide.BarChartHorizontal, {
  flipsInRTL: false
})
export const BarChartHorizontalBig = withRTL(Lucide.BarChartHorizontalBig, {
  flipsInRTL: false
})
export const Barcode = withRTL(Lucide.Barcode, { flipsInRTL: false })
export const Baseline = withRTL(Lucide.Baseline, { flipsInRTL: false })
export const Bath = withRTL(Lucide.Bath, { flipsInRTL: false })
export const Battery = withRTL(Lucide.Battery, { flipsInRTL: false })
export const BatteryCharging = withRTL(Lucide.BatteryCharging, {
  flipsInRTL: false
})
export const BatteryFull = withRTL(Lucide.BatteryFull, { flipsInRTL: false })
export const BatteryLow = withRTL(Lucide.BatteryLow, { flipsInRTL: false })
export const BatteryMedium = withRTL(Lucide.BatteryMedium, {
  flipsInRTL: false
})
export const BatteryWarning = withRTL(Lucide.BatteryWarning, {
  flipsInRTL: false
})
export const Beaker = withRTL(Lucide.Beaker, { flipsInRTL: false })
export const Bean = withRTL(Lucide.Bean, { flipsInRTL: false })
export const BeanOff = withRTL(Lucide.BeanOff, { flipsInRTL: false })
export const Bed = withRTL(Lucide.Bed, { flipsInRTL: false })
export const BedDouble = withRTL(Lucide.BedDouble, { flipsInRTL: false })
export const BedSingle = withRTL(Lucide.BedSingle, { flipsInRTL: false })
export const Beef = withRTL(Lucide.Beef, { flipsInRTL: false })
export const Beer = withRTL(Lucide.Beer, { flipsInRTL: false })
export const BeerOff = withRTL(Lucide.BeerOff, { flipsInRTL: false })
export const Bell = withRTL(Lucide.Bell, { flipsInRTL: false })
export const BellDot = withRTL(Lucide.BellDot, { flipsInRTL: false })
export const BellElectric = withRTL(Lucide.BellElectric, { flipsInRTL: false })
export const BellMinus = withRTL(Lucide.BellMinus, { flipsInRTL: false })
export const BellOff = withRTL(Lucide.BellOff, { flipsInRTL: false })
export const BellPlus = withRTL(Lucide.BellPlus, { flipsInRTL: false })
export const BellRing = withRTL(Lucide.BellRing, { flipsInRTL: false })
export const BetweenHorizonalEnd = withRTL(Lucide.BetweenHorizonalEnd, {
  flipsInRTL: false
})
export const BetweenHorizonalStart = withRTL(Lucide.BetweenHorizonalStart, {
  flipsInRTL: false
})
export const BetweenHorizontalEnd = withRTL(Lucide.BetweenHorizontalEnd, {
  flipsInRTL: false
})
export const BetweenHorizontalStart = withRTL(Lucide.BetweenHorizontalStart, {
  flipsInRTL: false
})
export const BetweenVerticalEnd = withRTL(Lucide.BetweenVerticalEnd, {
  flipsInRTL: false
})
export const BetweenVerticalStart = withRTL(Lucide.BetweenVerticalStart, {
  flipsInRTL: false
})
export const BicepsFlexed = withRTL(Lucide.BicepsFlexed, { flipsInRTL: false })
export const Bike = withRTL(Lucide.Bike, { flipsInRTL: false })
export const Binary = withRTL(Lucide.Binary, { flipsInRTL: false })
export const Binoculars = withRTL(Lucide.Binoculars, { flipsInRTL: false })
export const Biohazard = withRTL(Lucide.Biohazard, { flipsInRTL: false })
export const Bird = withRTL(Lucide.Bird, { flipsInRTL: false })
export const Bitcoin = withRTL(Lucide.Bitcoin, { flipsInRTL: false })
export const Blend = withRTL(Lucide.Blend, { flipsInRTL: false })
export const Blinds = withRTL(Lucide.Blinds, { flipsInRTL: false })
export const Blocks = withRTL(Lucide.Blocks, { flipsInRTL: false })
export const Bluetooth = withRTL(Lucide.Bluetooth, { flipsInRTL: false })
export const BluetoothConnected = withRTL(Lucide.BluetoothConnected, {
  flipsInRTL: false
})
export const BluetoothOff = withRTL(Lucide.BluetoothOff, { flipsInRTL: false })
export const BluetoothSearching = withRTL(Lucide.BluetoothSearching, {
  flipsInRTL: false
})
export const Bold = withRTL(Lucide.Bold, { flipsInRTL: false })
export const Bolt = withRTL(Lucide.Bolt, { flipsInRTL: false })
export const Bomb = withRTL(Lucide.Bomb, { flipsInRTL: false })
export const Bone = withRTL(Lucide.Bone, { flipsInRTL: false })
export const Book = withRTL(Lucide.Book, { flipsInRTL: false })
export const BookA = withRTL(Lucide.BookA, { flipsInRTL: false })
export const BookAudio = withRTL(Lucide.BookAudio, { flipsInRTL: false })
export const BookCheck = withRTL(Lucide.BookCheck, { flipsInRTL: false })
export const BookCopy = withRTL(Lucide.BookCopy, { flipsInRTL: false })
export const BookDashed = withRTL(Lucide.BookDashed, { flipsInRTL: false })
export const BookDown = withRTL(Lucide.BookDown, { flipsInRTL: false })
export const BookHeadphones = withRTL(Lucide.BookHeadphones, {
  flipsInRTL: false
})
export const BookHeart = withRTL(Lucide.BookHeart, { flipsInRTL: false })
export const BookImage = withRTL(Lucide.BookImage, { flipsInRTL: false })
export const BookKey = withRTL(Lucide.BookKey, { flipsInRTL: false })
export const BookLock = withRTL(Lucide.BookLock, { flipsInRTL: false })
export const BookMarked = withRTL(Lucide.BookMarked, { flipsInRTL: false })
export const BookMinus = withRTL(Lucide.BookMinus, { flipsInRTL: false })
export const BookOpen = withRTL(Lucide.BookOpen, { flipsInRTL: false })
export const BookOpenCheck = withRTL(Lucide.BookOpenCheck, {
  flipsInRTL: false
})
export const BookOpenText = withRTL(Lucide.BookOpenText, { flipsInRTL: false })
export const BookPlus = withRTL(Lucide.BookPlus, { flipsInRTL: false })
export const BookTemplate = withRTL(Lucide.BookTemplate, { flipsInRTL: false })
export const BookText = withRTL(Lucide.BookText, { flipsInRTL: false })
export const BookType = withRTL(Lucide.BookType, { flipsInRTL: false })
export const BookUp = withRTL(Lucide.BookUp, { flipsInRTL: false })
export const BookUp2 = withRTL(Lucide.BookUp2, { flipsInRTL: false })
export const BookUser = withRTL(Lucide.BookUser, { flipsInRTL: false })
export const BookX = withRTL(Lucide.BookX, { flipsInRTL: false })
export const Bookmark = withRTL(Lucide.Bookmark, { flipsInRTL: false })
export const BookmarkCheck = withRTL(Lucide.BookmarkCheck, {
  flipsInRTL: false
})
export const BookmarkMinus = withRTL(Lucide.BookmarkMinus, {
  flipsInRTL: false
})
export const BookmarkPlus = withRTL(Lucide.BookmarkPlus, { flipsInRTL: false })
export const BookmarkX = withRTL(Lucide.BookmarkX, { flipsInRTL: false })
export const BoomBox = withRTL(Lucide.BoomBox, { flipsInRTL: false })
export const Bot = withRTL(Lucide.Bot, { flipsInRTL: false })
export const BotMessageSquare = withRTL(Lucide.BotMessageSquare, {
  flipsInRTL: false
})
export const BotOff = withRTL(Lucide.BotOff, { flipsInRTL: false })
export const Box = withRTL(Lucide.Box, { flipsInRTL: false })
export const BoxSelect = withRTL(Lucide.BoxSelect, { flipsInRTL: false })
export const Boxes = withRTL(Lucide.Boxes, { flipsInRTL: false })
export const Braces = withRTL(Lucide.Braces, { flipsInRTL: false })
export const Brackets = withRTL(Lucide.Brackets, { flipsInRTL: false })
export const Brain = withRTL(Lucide.Brain, { flipsInRTL: false })
export const BrainCircuit = withRTL(Lucide.BrainCircuit, { flipsInRTL: false })
export const BrainCog = withRTL(Lucide.BrainCog, { flipsInRTL: false })
export const BrickWall = withRTL(Lucide.BrickWall, { flipsInRTL: false })
export const Briefcase = withRTL(Lucide.Briefcase, { flipsInRTL: false })
export const BriefcaseBusiness = withRTL(Lucide.BriefcaseBusiness, {
  flipsInRTL: false
})
export const BriefcaseConveyorBelt = withRTL(Lucide.BriefcaseConveyorBelt, {
  flipsInRTL: false
})
export const BriefcaseMedical = withRTL(Lucide.BriefcaseMedical, {
  flipsInRTL: false
})
export const BringToFront = withRTL(Lucide.BringToFront, { flipsInRTL: false })
export const Brush = withRTL(Lucide.Brush, { flipsInRTL: false })
export const Bug = withRTL(Lucide.Bug, { flipsInRTL: false })
export const BugOff = withRTL(Lucide.BugOff, { flipsInRTL: false })
export const BugPlay = withRTL(Lucide.BugPlay, { flipsInRTL: false })
export const Building = withRTL(Lucide.Building, { flipsInRTL: false })
export const Building2 = withRTL(Lucide.Building2, { flipsInRTL: false })
export const Bus = withRTL(Lucide.Bus, { flipsInRTL: false })
export const BusFront = withRTL(Lucide.BusFront, { flipsInRTL: false })
export const Cable = withRTL(Lucide.Cable, { flipsInRTL: false })
export const CableCar = withRTL(Lucide.CableCar, { flipsInRTL: false })
export const Cake = withRTL(Lucide.Cake, { flipsInRTL: false })
export const CakeSlice = withRTL(Lucide.CakeSlice, { flipsInRTL: false })
export const Calculator = withRTL(Lucide.Calculator, { flipsInRTL: false })
export const Calendar = withRTL(Lucide.Calendar, { flipsInRTL: false })
export const Calendar1 = withRTL(Lucide.Calendar1, { flipsInRTL: false })
export const CalendarArrowDown = withRTL(Lucide.CalendarArrowDown, {
  flipsInRTL: false
})
export const CalendarArrowUp = withRTL(Lucide.CalendarArrowUp, {
  flipsInRTL: false
})
export const CalendarCheck = withRTL(Lucide.CalendarCheck, {
  flipsInRTL: false
})
export const CalendarCheck2 = withRTL(Lucide.CalendarCheck2, {
  flipsInRTL: false
})
export const CalendarClock = withRTL(Lucide.CalendarClock, {
  flipsInRTL: false
})
export const CalendarCog = withRTL(Lucide.CalendarCog, { flipsInRTL: false })
export const CalendarDays = withRTL(Lucide.CalendarDays, { flipsInRTL: false })
export const CalendarFold = withRTL(Lucide.CalendarFold, { flipsInRTL: false })
export const CalendarHeart = withRTL(Lucide.CalendarHeart, {
  flipsInRTL: false
})
export const CalendarMinus = withRTL(Lucide.CalendarMinus, {
  flipsInRTL: false
})
export const CalendarMinus2 = withRTL(Lucide.CalendarMinus2, {
  flipsInRTL: false
})
export const CalendarOff = withRTL(Lucide.CalendarOff, { flipsInRTL: false })
export const CalendarPlus = withRTL(Lucide.CalendarPlus, { flipsInRTL: false })
export const CalendarPlus2 = withRTL(Lucide.CalendarPlus2, {
  flipsInRTL: false
})
export const CalendarRange = withRTL(Lucide.CalendarRange, {
  flipsInRTL: false
})
export const CalendarSearch = withRTL(Lucide.CalendarSearch, {
  flipsInRTL: false
})
export const CalendarX = withRTL(Lucide.CalendarX, { flipsInRTL: false })
export const CalendarX2 = withRTL(Lucide.CalendarX2, { flipsInRTL: false })
export const Camera = withRTL(Lucide.Camera, { flipsInRTL: false })
export const CameraOff = withRTL(Lucide.CameraOff, { flipsInRTL: false })
export const CandlestickChart = withRTL(Lucide.CandlestickChart, {
  flipsInRTL: false
})
export const Candy = withRTL(Lucide.Candy, { flipsInRTL: false })
export const CandyCane = withRTL(Lucide.CandyCane, { flipsInRTL: false })
export const CandyOff = withRTL(Lucide.CandyOff, { flipsInRTL: false })
export const Cannabis = withRTL(Lucide.Cannabis, { flipsInRTL: false })
export const Captions = withRTL(Lucide.Captions, { flipsInRTL: false })
export const CaptionsOff = withRTL(Lucide.CaptionsOff, { flipsInRTL: false })
export const Car = withRTL(Lucide.Car, { flipsInRTL: false })
export const CarFront = withRTL(Lucide.CarFront, { flipsInRTL: false })
export const CarTaxiFront = withRTL(Lucide.CarTaxiFront, { flipsInRTL: false })
export const Caravan = withRTL(Lucide.Caravan, { flipsInRTL: false })
export const Carrot = withRTL(Lucide.Carrot, { flipsInRTL: false })
export const CaseLower = withRTL(Lucide.CaseLower, { flipsInRTL: false })
export const CaseSensitive = withRTL(Lucide.CaseSensitive, {
  flipsInRTL: false
})
export const CaseUpper = withRTL(Lucide.CaseUpper, { flipsInRTL: false })
export const CassetteTape = withRTL(Lucide.CassetteTape, { flipsInRTL: false })
export const Cast = withRTL(Lucide.Cast, { flipsInRTL: false })
export const Castle = withRTL(Lucide.Castle, { flipsInRTL: false })
export const Cat = withRTL(Lucide.Cat, { flipsInRTL: false })
export const Cctv = withRTL(Lucide.Cctv, { flipsInRTL: false })
export const ChartArea = withRTL(Lucide.ChartArea, { flipsInRTL: false })
export const ChartBar = withRTL(Lucide.ChartBar, { flipsInRTL: false })
export const ChartBarBig = withRTL(Lucide.ChartBarBig, { flipsInRTL: false })
export const ChartBarDecreasing = withRTL(Lucide.ChartBarDecreasing, {
  flipsInRTL: false
})
export const ChartBarIncreasing = withRTL(Lucide.ChartBarIncreasing, {
  flipsInRTL: false
})
export const ChartBarStacked = withRTL(Lucide.ChartBarStacked, {
  flipsInRTL: false
})
export const ChartCandlestick = withRTL(Lucide.ChartCandlestick, {
  flipsInRTL: false
})
export const ChartColumn = withRTL(Lucide.ChartColumn, { flipsInRTL: false })
export const ChartColumnBig = withRTL(Lucide.ChartColumnBig, {
  flipsInRTL: false
})
export const ChartColumnDecreasing = withRTL(Lucide.ChartColumnDecreasing, {
  flipsInRTL: false
})
export const ChartColumnIncreasing = withRTL(Lucide.ChartColumnIncreasing, {
  flipsInRTL: false
})
export const ChartColumnStacked = withRTL(Lucide.ChartColumnStacked, {
  flipsInRTL: false
})
export const ChartGantt = withRTL(Lucide.ChartGantt, { flipsInRTL: false })
export const ChartLine = withRTL(Lucide.ChartLine, { flipsInRTL: false })
export const ChartNetwork = withRTL(Lucide.ChartNetwork, { flipsInRTL: false })
export const ChartNoAxesColumn = withRTL(Lucide.ChartNoAxesColumn, {
  flipsInRTL: false
})
export const ChartNoAxesColumnDecreasing = withRTL(
  Lucide.ChartNoAxesColumnDecreasing,
  { flipsInRTL: false }
)
export const ChartNoAxesColumnIncreasing = withRTL(
  Lucide.ChartNoAxesColumnIncreasing,
  { flipsInRTL: false }
)
export const ChartNoAxesCombined = withRTL(Lucide.ChartNoAxesCombined, {
  flipsInRTL: false
})
export const ChartNoAxesGantt = withRTL(Lucide.ChartNoAxesGantt, {
  flipsInRTL: false
})
export const ChartPie = withRTL(Lucide.ChartPie, { flipsInRTL: false })
export const ChartScatter = withRTL(Lucide.ChartScatter, { flipsInRTL: false })
export const ChartSpline = withRTL(Lucide.ChartSpline, { flipsInRTL: false })
export const Check = withRTL(Lucide.Check, { flipsInRTL: false })
export const CheckCheck = withRTL(Lucide.CheckCheck, { flipsInRTL: false })
export const CheckCircle = withRTL(Lucide.CheckCircle, { flipsInRTL: false })
export const CheckCircle2 = withRTL(Lucide.CheckCircle2, { flipsInRTL: false })
export const CheckSquare = withRTL(Lucide.CheckSquare, { flipsInRTL: false })
export const CheckSquare2 = withRTL(Lucide.CheckSquare2, { flipsInRTL: false })
export const ChefHat = withRTL(Lucide.ChefHat, { flipsInRTL: false })
export const Cherry = withRTL(Lucide.Cherry, { flipsInRTL: false })
export const ChevronDown = withRTL(Lucide.ChevronDown, { flipsInRTL: false })
export const ChevronDownCircle = withRTL(Lucide.ChevronDownCircle, {
  flipsInRTL: false
})
export const ChevronDownSquare = withRTL(Lucide.ChevronDownSquare, {
  flipsInRTL: false
})
export const ChevronFirst = withRTL(Lucide.ChevronFirst, { flipsInRTL: false })
export const ChevronLast = withRTL(Lucide.ChevronLast, { flipsInRTL: false })
export const ChevronLeft = withRTL(Lucide.ChevronLeft, { flipsInRTL: false })
export const ChevronLeftCircle = withRTL(Lucide.ChevronLeftCircle, {
  flipsInRTL: false
})
export const ChevronLeftSquare = withRTL(Lucide.ChevronLeftSquare, {
  flipsInRTL: false
})
export const ChevronRight = withRTL(Lucide.ChevronRight, { flipsInRTL: false })
export const ChevronRightCircle = withRTL(Lucide.ChevronRightCircle, {
  flipsInRTL: false
})
export const ChevronRightSquare = withRTL(Lucide.ChevronRightSquare, {
  flipsInRTL: false
})
export const ChevronUp = withRTL(Lucide.ChevronUp, { flipsInRTL: false })
export const ChevronUpCircle = withRTL(Lucide.ChevronUpCircle, {
  flipsInRTL: false
})
export const ChevronUpSquare = withRTL(Lucide.ChevronUpSquare, {
  flipsInRTL: false
})
export const ChevronsDown = withRTL(Lucide.ChevronsDown, { flipsInRTL: false })
export const ChevronsDownUp = withRTL(Lucide.ChevronsDownUp, {
  flipsInRTL: false
})
export const ChevronsLeft = withRTL(Lucide.ChevronsLeft, { flipsInRTL: false })
export const ChevronsLeftRight = withRTL(Lucide.ChevronsLeftRight, {
  flipsInRTL: false
})
export const ChevronsLeftRightEllipsis = withRTL(
  Lucide.ChevronsLeftRightEllipsis,
  { flipsInRTL: false }
)
export const ChevronsRight = withRTL(Lucide.ChevronsRight, {
  flipsInRTL: false
})
export const ChevronsRightLeft = withRTL(Lucide.ChevronsRightLeft, {
  flipsInRTL: false
})
export const ChevronsUp = withRTL(Lucide.ChevronsUp, { flipsInRTL: false })
export const ChevronsUpDown = withRTL(Lucide.ChevronsUpDown, {
  flipsInRTL: false
})
export const Chrome = withRTL(Lucide.Chrome, { flipsInRTL: false })
export const Church = withRTL(Lucide.Church, { flipsInRTL: false })
export const Cigarette = withRTL(Lucide.Cigarette, { flipsInRTL: false })
export const CigaretteOff = withRTL(Lucide.CigaretteOff, { flipsInRTL: false })
export const Circle = withRTL(Lucide.Circle, { flipsInRTL: false })
export const CircleAlert = withRTL(Lucide.CircleAlert, { flipsInRTL: false })
export const CircleArrowDown = withRTL(Lucide.CircleArrowDown, {
  flipsInRTL: false
})
export const CircleArrowLeft = withRTL(Lucide.CircleArrowLeft, {
  flipsInRTL: false
})
export const CircleArrowOutDownLeft = withRTL(Lucide.CircleArrowOutDownLeft, {
  flipsInRTL: false
})
export const CircleArrowOutDownRight = withRTL(Lucide.CircleArrowOutDownRight, {
  flipsInRTL: false
})
export const CircleArrowOutUpLeft = withRTL(Lucide.CircleArrowOutUpLeft, {
  flipsInRTL: false
})
export const CircleArrowOutUpRight = withRTL(Lucide.CircleArrowOutUpRight, {
  flipsInRTL: false
})
export const CircleArrowRight = withRTL(Lucide.CircleArrowRight, {
  flipsInRTL: false
})
export const CircleArrowUp = withRTL(Lucide.CircleArrowUp, {
  flipsInRTL: false
})
export const CircleCheck = withRTL(Lucide.CircleCheck, { flipsInRTL: false })
export const CircleCheckBig = withRTL(Lucide.CircleCheckBig, {
  flipsInRTL: false
})
export const CircleChevronDown = withRTL(Lucide.CircleChevronDown, {
  flipsInRTL: false
})
export const CircleChevronLeft = withRTL(Lucide.CircleChevronLeft, {
  flipsInRTL: false
})
export const CircleChevronRight = withRTL(Lucide.CircleChevronRight, {
  flipsInRTL: false
})
export const CircleChevronUp = withRTL(Lucide.CircleChevronUp, {
  flipsInRTL: false
})
export const CircleDashed = withRTL(Lucide.CircleDashed, { flipsInRTL: false })
export const CircleDivide = withRTL(Lucide.CircleDivide, { flipsInRTL: false })
export const CircleDollarSign = withRTL(Lucide.CircleDollarSign, {
  flipsInRTL: false
})
export const CircleDot = withRTL(Lucide.CircleDot, { flipsInRTL: false })
export const CircleDotDashed = withRTL(Lucide.CircleDotDashed, {
  flipsInRTL: false
})
export const CircleEllipsis = withRTL(Lucide.CircleEllipsis, {
  flipsInRTL: false
})
export const CircleEqual = withRTL(Lucide.CircleEqual, { flipsInRTL: false })
export const CircleFadingArrowUp = withRTL(Lucide.CircleFadingArrowUp, {
  flipsInRTL: false
})
export const CircleFadingPlus = withRTL(Lucide.CircleFadingPlus, {
  flipsInRTL: false
})
export const CircleGauge = withRTL(Lucide.CircleGauge, { flipsInRTL: false })
export const CircleHelp = withRTL(Lucide.CircleHelp, { flipsInRTL: false })
export const CircleMinus = withRTL(Lucide.CircleMinus, { flipsInRTL: false })
export const CircleOff = withRTL(Lucide.CircleOff, { flipsInRTL: false })
export const CircleParking = withRTL(Lucide.CircleParking, {
  flipsInRTL: false
})
export const CircleParkingOff = withRTL(Lucide.CircleParkingOff, {
  flipsInRTL: false
})
export const CirclePause = withRTL(Lucide.CirclePause, { flipsInRTL: false })
export const CirclePercent = withRTL(Lucide.CirclePercent, {
  flipsInRTL: false
})
export const CirclePlay = withRTL(Lucide.CirclePlay, { flipsInRTL: false })
export const CirclePlus = withRTL(Lucide.CirclePlus, { flipsInRTL: false })
export const CirclePower = withRTL(Lucide.CirclePower, { flipsInRTL: false })
export const CircleSlash = withRTL(Lucide.CircleSlash, { flipsInRTL: false })
export const CircleSlash2 = withRTL(Lucide.CircleSlash2, { flipsInRTL: false })
export const CircleSlashed = withRTL(Lucide.CircleSlashed, {
  flipsInRTL: false
})
export const CircleStop = withRTL(Lucide.CircleStop, { flipsInRTL: false })
export const CircleUser = withRTL(Lucide.CircleUser, { flipsInRTL: false })
export const CircleUserRound = withRTL(Lucide.CircleUserRound, {
  flipsInRTL: false
})
export const CircleX = withRTL(Lucide.CircleX, { flipsInRTL: false })
export const CircuitBoard = withRTL(Lucide.CircuitBoard, { flipsInRTL: false })
export const Citrus = withRTL(Lucide.Citrus, { flipsInRTL: false })
export const Clapperboard = withRTL(Lucide.Clapperboard, { flipsInRTL: false })
export const Clipboard = withRTL(Lucide.Clipboard, { flipsInRTL: false })
export const ClipboardCheck = withRTL(Lucide.ClipboardCheck, {
  flipsInRTL: false
})
export const ClipboardCopy = withRTL(Lucide.ClipboardCopy, {
  flipsInRTL: false
})
export const ClipboardEdit = withRTL(Lucide.ClipboardEdit, {
  flipsInRTL: false
})
export const ClipboardList = withRTL(Lucide.ClipboardList, {
  flipsInRTL: false
})
export const ClipboardMinus = withRTL(Lucide.ClipboardMinus, {
  flipsInRTL: false
})
export const ClipboardPaste = withRTL(Lucide.ClipboardPaste, {
  flipsInRTL: false
})
export const ClipboardPen = withRTL(Lucide.ClipboardPen, { flipsInRTL: false })
export const ClipboardPenLine = withRTL(Lucide.ClipboardPenLine, {
  flipsInRTL: false
})
export const ClipboardPlus = withRTL(Lucide.ClipboardPlus, {
  flipsInRTL: false
})
export const ClipboardSignature = withRTL(Lucide.ClipboardSignature, {
  flipsInRTL: false
})
export const ClipboardType = withRTL(Lucide.ClipboardType, {
  flipsInRTL: false
})
export const ClipboardX = withRTL(Lucide.ClipboardX, { flipsInRTL: false })
export const Clock = withRTL(Lucide.Clock, { flipsInRTL: false })
export const Clock1 = withRTL(Lucide.Clock1, { flipsInRTL: false })
export const Clock10 = withRTL(Lucide.Clock10, { flipsInRTL: false })
export const Clock11 = withRTL(Lucide.Clock11, { flipsInRTL: false })
export const Clock12 = withRTL(Lucide.Clock12, { flipsInRTL: false })
export const Clock2 = withRTL(Lucide.Clock2, { flipsInRTL: false })
export const Clock3 = withRTL(Lucide.Clock3, { flipsInRTL: false })
export const Clock4 = withRTL(Lucide.Clock4, { flipsInRTL: false })
export const Clock5 = withRTL(Lucide.Clock5, { flipsInRTL: false })
export const Clock6 = withRTL(Lucide.Clock6, { flipsInRTL: false })
export const Clock7 = withRTL(Lucide.Clock7, { flipsInRTL: false })
export const Clock8 = withRTL(Lucide.Clock8, { flipsInRTL: false })
export const Clock9 = withRTL(Lucide.Clock9, { flipsInRTL: false })
export const ClockAlert = withRTL(Lucide.ClockAlert, { flipsInRTL: false })
export const ClockArrowDown = withRTL(Lucide.ClockArrowDown, {
  flipsInRTL: false
})
export const ClockArrowUp = withRTL(Lucide.ClockArrowUp, { flipsInRTL: false })
export const Cloud = withRTL(Lucide.Cloud, { flipsInRTL: false })
export const CloudAlert = withRTL(Lucide.CloudAlert, { flipsInRTL: false })
export const CloudCog = withRTL(Lucide.CloudCog, { flipsInRTL: false })
export const CloudDownload = withRTL(Lucide.CloudDownload, {
  flipsInRTL: false
})
export const CloudDrizzle = withRTL(Lucide.CloudDrizzle, { flipsInRTL: false })
export const CloudFog = withRTL(Lucide.CloudFog, { flipsInRTL: false })
export const CloudHail = withRTL(Lucide.CloudHail, { flipsInRTL: false })
export const CloudLightning = withRTL(Lucide.CloudLightning, {
  flipsInRTL: false
})
export const CloudMoon = withRTL(Lucide.CloudMoon, { flipsInRTL: false })
export const CloudMoonRain = withRTL(Lucide.CloudMoonRain, {
  flipsInRTL: false
})
export const CloudOff = withRTL(Lucide.CloudOff, { flipsInRTL: false })
export const CloudRain = withRTL(Lucide.CloudRain, { flipsInRTL: false })
export const CloudRainWind = withRTL(Lucide.CloudRainWind, {
  flipsInRTL: false
})
export const CloudSnow = withRTL(Lucide.CloudSnow, { flipsInRTL: false })
export const CloudSun = withRTL(Lucide.CloudSun, { flipsInRTL: false })
export const CloudSunRain = withRTL(Lucide.CloudSunRain, { flipsInRTL: false })
export const CloudUpload = withRTL(Lucide.CloudUpload, { flipsInRTL: false })
export const Cloudy = withRTL(Lucide.Cloudy, { flipsInRTL: false })
export const Clover = withRTL(Lucide.Clover, { flipsInRTL: false })
export const Club = withRTL(Lucide.Club, { flipsInRTL: false })
export const Code = withRTL(Lucide.Code, { flipsInRTL: false })
export const Code2 = withRTL(Lucide.Code2, { flipsInRTL: false })
export const CodeSquare = withRTL(Lucide.CodeSquare, { flipsInRTL: false })
export const CodeXml = withRTL(Lucide.CodeXml, { flipsInRTL: false })
export const Codepen = withRTL(Lucide.Codepen, { flipsInRTL: false })
export const Codesandbox = withRTL(Lucide.Codesandbox, { flipsInRTL: false })
export const Coffee = withRTL(Lucide.Coffee, { flipsInRTL: false })
export const Cog = withRTL(Lucide.Cog, { flipsInRTL: false })
export const Coins = withRTL(Lucide.Coins, { flipsInRTL: false })
export const Columns = withRTL(Lucide.Columns, { flipsInRTL: false })
export const Columns2 = withRTL(Lucide.Columns2, { flipsInRTL: false })
export const Columns3 = withRTL(Lucide.Columns3, { flipsInRTL: false })
export const Columns4 = withRTL(Lucide.Columns4, { flipsInRTL: false })
export const Combine = withRTL(Lucide.Combine, { flipsInRTL: false })
export const Command = withRTL(Lucide.Command, { flipsInRTL: false })
export const Compass = withRTL(Lucide.Compass, { flipsInRTL: false })
export const Component = withRTL(Lucide.Component, { flipsInRTL: false })
export const Computer = withRTL(Lucide.Computer, { flipsInRTL: false })
export const ConciergeBell = withRTL(Lucide.ConciergeBell, {
  flipsInRTL: false
})
export const Cone = withRTL(Lucide.Cone, { flipsInRTL: false })
export const Construction = withRTL(Lucide.Construction, { flipsInRTL: false })
export const Contact = withRTL(Lucide.Contact, { flipsInRTL: false })
export const Contact2 = withRTL(Lucide.Contact2, { flipsInRTL: false })
export const ContactRound = withRTL(Lucide.ContactRound, { flipsInRTL: false })
export const Container = withRTL(Lucide.Container, { flipsInRTL: false })
export const Contrast = withRTL(Lucide.Contrast, { flipsInRTL: false })
export const Cookie = withRTL(Lucide.Cookie, { flipsInRTL: false })
export const CookingPot = withRTL(Lucide.CookingPot, { flipsInRTL: false })
export const Copy = withRTL(Lucide.Copy, { flipsInRTL: false })
export const CopyCheck = withRTL(Lucide.CopyCheck, { flipsInRTL: false })
export const CopyMinus = withRTL(Lucide.CopyMinus, { flipsInRTL: false })
export const CopyPlus = withRTL(Lucide.CopyPlus, { flipsInRTL: false })
export const CopySlash = withRTL(Lucide.CopySlash, { flipsInRTL: false })
export const CopyX = withRTL(Lucide.CopyX, { flipsInRTL: false })
export const Copyleft = withRTL(Lucide.Copyleft, { flipsInRTL: false })
export const Copyright = withRTL(Lucide.Copyright, { flipsInRTL: false })
export const CornerDownLeft = withRTL(Lucide.CornerDownLeft, {
  flipsInRTL: false
})
export const CornerDownRight = withRTL(Lucide.CornerDownRight, {
  flipsInRTL: false
})
export const CornerLeftDown = withRTL(Lucide.CornerLeftDown, {
  flipsInRTL: false
})
export const CornerLeftUp = withRTL(Lucide.CornerLeftUp, { flipsInRTL: false })
export const CornerRightDown = withRTL(Lucide.CornerRightDown, {
  flipsInRTL: false
})
export const CornerRightUp = withRTL(Lucide.CornerRightUp, {
  flipsInRTL: false
})
export const CornerUpLeft = withRTL(Lucide.CornerUpLeft, { flipsInRTL: false })
export const CornerUpRight = withRTL(Lucide.CornerUpRight, {
  flipsInRTL: false
})
export const Cpu = withRTL(Lucide.Cpu, { flipsInRTL: false })
export const CreativeCommons = withRTL(Lucide.CreativeCommons, {
  flipsInRTL: false
})
export const CreditCard = withRTL(Lucide.CreditCard, { flipsInRTL: false })
export const Croissant = withRTL(Lucide.Croissant, { flipsInRTL: false })
export const Crop = withRTL(Lucide.Crop, { flipsInRTL: false })
export const Cross = withRTL(Lucide.Cross, { flipsInRTL: false })
export const Crosshair = withRTL(Lucide.Crosshair, { flipsInRTL: false })
export const Crown = withRTL(Lucide.Crown, { flipsInRTL: false })
export const Cuboid = withRTL(Lucide.Cuboid, { flipsInRTL: false })
export const CupSoda = withRTL(Lucide.CupSoda, { flipsInRTL: false })
export const CurlyBraces = withRTL(Lucide.CurlyBraces, { flipsInRTL: false })
export const Currency = withRTL(Lucide.Currency, { flipsInRTL: false })
export const Cylinder = withRTL(Lucide.Cylinder, { flipsInRTL: false })
export const Dam = withRTL(Lucide.Dam, { flipsInRTL: false })
export const Database = withRTL(Lucide.Database, { flipsInRTL: false })
export const DatabaseBackup = withRTL(Lucide.DatabaseBackup, {
  flipsInRTL: false
})
export const DatabaseZap = withRTL(Lucide.DatabaseZap, { flipsInRTL: false })
export const Delete = withRTL(Lucide.Delete, { flipsInRTL: false })
export const Dessert = withRTL(Lucide.Dessert, { flipsInRTL: false })
export const Diameter = withRTL(Lucide.Diameter, { flipsInRTL: false })
export const Diamond = withRTL(Lucide.Diamond, { flipsInRTL: false })
export const DiamondMinus = withRTL(Lucide.DiamondMinus, { flipsInRTL: false })
export const DiamondPercent = withRTL(Lucide.DiamondPercent, {
  flipsInRTL: false
})
export const DiamondPlus = withRTL(Lucide.DiamondPlus, { flipsInRTL: false })
export const Dice1 = withRTL(Lucide.Dice1, { flipsInRTL: false })
export const Dice2 = withRTL(Lucide.Dice2, { flipsInRTL: false })
export const Dice3 = withRTL(Lucide.Dice3, { flipsInRTL: false })
export const Dice4 = withRTL(Lucide.Dice4, { flipsInRTL: false })
export const Dice5 = withRTL(Lucide.Dice5, { flipsInRTL: false })
export const Dice6 = withRTL(Lucide.Dice6, { flipsInRTL: false })
export const Dices = withRTL(Lucide.Dices, { flipsInRTL: false })
export const Diff = withRTL(Lucide.Diff, { flipsInRTL: false })
export const Disc = withRTL(Lucide.Disc, { flipsInRTL: false })
export const Disc2 = withRTL(Lucide.Disc2, { flipsInRTL: false })
export const Disc3 = withRTL(Lucide.Disc3, { flipsInRTL: false })
export const DiscAlbum = withRTL(Lucide.DiscAlbum, { flipsInRTL: false })
export const Divide = withRTL(Lucide.Divide, { flipsInRTL: false })
export const DivideCircle = withRTL(Lucide.DivideCircle, { flipsInRTL: false })
export const DivideSquare = withRTL(Lucide.DivideSquare, { flipsInRTL: false })
export const Dna = withRTL(Lucide.Dna, { flipsInRTL: false })
export const DnaOff = withRTL(Lucide.DnaOff, { flipsInRTL: false })
export const Dock = withRTL(Lucide.Dock, { flipsInRTL: false })
export const Dog = withRTL(Lucide.Dog, { flipsInRTL: false })
export const DollarSign = withRTL(Lucide.DollarSign, { flipsInRTL: false })
export const Donut = withRTL(Lucide.Donut, { flipsInRTL: false })
export const DoorClosed = withRTL(Lucide.DoorClosed, { flipsInRTL: false })
export const DoorOpen = withRTL(Lucide.DoorOpen, { flipsInRTL: false })
export const Dot = withRTL(Lucide.Dot, { flipsInRTL: false })
export const DotSquare = withRTL(Lucide.DotSquare, { flipsInRTL: false })
export const Download = withRTL(Lucide.Download, { flipsInRTL: false })
export const DownloadCloud = withRTL(Lucide.DownloadCloud, {
  flipsInRTL: false
})
export const DraftingCompass = withRTL(Lucide.DraftingCompass, {
  flipsInRTL: false
})
export const Drama = withRTL(Lucide.Drama, { flipsInRTL: false })
export const Dribbble = withRTL(Lucide.Dribbble, { flipsInRTL: false })
export const Drill = withRTL(Lucide.Drill, { flipsInRTL: false })
export const Droplet = withRTL(Lucide.Droplet, { flipsInRTL: false })
export const Droplets = withRTL(Lucide.Droplets, { flipsInRTL: false })
export const Drum = withRTL(Lucide.Drum, { flipsInRTL: false })
export const Drumstick = withRTL(Lucide.Drumstick, { flipsInRTL: false })
export const Dumbbell = withRTL(Lucide.Dumbbell, { flipsInRTL: false })
export const Ear = withRTL(Lucide.Ear, { flipsInRTL: false })
export const EarOff = withRTL(Lucide.EarOff, { flipsInRTL: false })
export const Earth = withRTL(Lucide.Earth, { flipsInRTL: false })
export const EarthLock = withRTL(Lucide.EarthLock, { flipsInRTL: false })
export const Eclipse = withRTL(Lucide.Eclipse, { flipsInRTL: false })
export const Edit = withRTL(Lucide.Edit, { flipsInRTL: false })
export const Edit2 = withRTL(Lucide.Edit2, { flipsInRTL: false })
export const Edit3 = withRTL(Lucide.Edit3, { flipsInRTL: false })
export const Egg = withRTL(Lucide.Egg, { flipsInRTL: false })
export const EggFried = withRTL(Lucide.EggFried, { flipsInRTL: false })
export const EggOff = withRTL(Lucide.EggOff, { flipsInRTL: false })
export const Ellipsis = withRTL(Lucide.Ellipsis, { flipsInRTL: false })
export const EllipsisVertical = withRTL(Lucide.EllipsisVertical, {
  flipsInRTL: false
})
export const Equal = withRTL(Lucide.Equal, { flipsInRTL: false })
export const EqualApproximately = withRTL(Lucide.EqualApproximately, {
  flipsInRTL: false
})
export const EqualNot = withRTL(Lucide.EqualNot, { flipsInRTL: false })
export const EqualSquare = withRTL(Lucide.EqualSquare, { flipsInRTL: false })
export const Eraser = withRTL(Lucide.Eraser, { flipsInRTL: false })
export const EthernetPort = withRTL(Lucide.EthernetPort, { flipsInRTL: false })
export const Euro = withRTL(Lucide.Euro, { flipsInRTL: false })
export const Expand = withRTL(Lucide.Expand, { flipsInRTL: false })
export const ExternalLink = withRTL(Lucide.ExternalLink, { flipsInRTL: false })
export const Eye = withRTL(Lucide.Eye, { flipsInRTL: false })
export const EyeClosed = withRTL(Lucide.EyeClosed, { flipsInRTL: false })
export const EyeOff = withRTL(Lucide.EyeOff, { flipsInRTL: false })
export const Facebook = withRTL(Lucide.Facebook, { flipsInRTL: false })
export const Factory = withRTL(Lucide.Factory, { flipsInRTL: false })
export const Fan = withRTL(Lucide.Fan, { flipsInRTL: false })
export const FastForward = withRTL(Lucide.FastForward, { flipsInRTL: false })
export const Feather = withRTL(Lucide.Feather, { flipsInRTL: false })
export const Fence = withRTL(Lucide.Fence, { flipsInRTL: false })
export const FerrisWheel = withRTL(Lucide.FerrisWheel, { flipsInRTL: false })
export const Figma = withRTL(Lucide.Figma, { flipsInRTL: false })
export const File = withRTL(Lucide.File, { flipsInRTL: false })
export const FileArchive = withRTL(Lucide.FileArchive, { flipsInRTL: false })
export const FileAudio = withRTL(Lucide.FileAudio, { flipsInRTL: false })
export const FileAudio2 = withRTL(Lucide.FileAudio2, { flipsInRTL: false })
export const FileAxis3D = withRTL(Lucide.FileAxis3D, { flipsInRTL: false })
export const FileAxis3d = withRTL(Lucide.FileAxis3d, { flipsInRTL: false })
export const FileBadge = withRTL(Lucide.FileBadge, { flipsInRTL: false })
export const FileBadge2 = withRTL(Lucide.FileBadge2, { flipsInRTL: false })
export const FileBarChart = withRTL(Lucide.FileBarChart, { flipsInRTL: false })
export const FileBarChart2 = withRTL(Lucide.FileBarChart2, {
  flipsInRTL: false
})
export const FileBox = withRTL(Lucide.FileBox, { flipsInRTL: false })
export const FileChartColumn = withRTL(Lucide.FileChartColumn, {
  flipsInRTL: false
})
export const FileChartColumnIncreasing = withRTL(
  Lucide.FileChartColumnIncreasing,
  { flipsInRTL: false }
)
export const FileChartLine = withRTL(Lucide.FileChartLine, {
  flipsInRTL: false
})
export const FileChartPie = withRTL(Lucide.FileChartPie, { flipsInRTL: false })
export const FileCheck = withRTL(Lucide.FileCheck, { flipsInRTL: false })
export const FileCheck2 = withRTL(Lucide.FileCheck2, { flipsInRTL: false })
export const FileClock = withRTL(Lucide.FileClock, { flipsInRTL: false })
export const FileCode = withRTL(Lucide.FileCode, { flipsInRTL: false })
export const FileCode2 = withRTL(Lucide.FileCode2, { flipsInRTL: false })
export const FileCog = withRTL(Lucide.FileCog, { flipsInRTL: false })
export const FileCog2 = withRTL(Lucide.FileCog2, { flipsInRTL: false })
export const FileDiff = withRTL(Lucide.FileDiff, { flipsInRTL: false })
export const FileDigit = withRTL(Lucide.FileDigit, { flipsInRTL: false })
export const FileDown = withRTL(Lucide.FileDown, { flipsInRTL: false })
export const FileEdit = withRTL(Lucide.FileEdit, { flipsInRTL: false })
export const FileHeart = withRTL(Lucide.FileHeart, { flipsInRTL: false })
export const FileImage = withRTL(Lucide.FileImage, { flipsInRTL: false })
export const FileInput = withRTL(Lucide.FileInput, { flipsInRTL: false })
export const FileJson = withRTL(Lucide.FileJson, { flipsInRTL: false })
export const FileJson2 = withRTL(Lucide.FileJson2, { flipsInRTL: false })
export const FileKey = withRTL(Lucide.FileKey, { flipsInRTL: false })
export const FileKey2 = withRTL(Lucide.FileKey2, { flipsInRTL: false })
export const FileLineChart = withRTL(Lucide.FileLineChart, {
  flipsInRTL: false
})
export const FileLock = withRTL(Lucide.FileLock, { flipsInRTL: false })
export const FileLock2 = withRTL(Lucide.FileLock2, { flipsInRTL: false })
export const FileMinus = withRTL(Lucide.FileMinus, { flipsInRTL: false })
export const FileMinus2 = withRTL(Lucide.FileMinus2, { flipsInRTL: false })
export const FileMusic = withRTL(Lucide.FileMusic, { flipsInRTL: false })
export const FileOutput = withRTL(Lucide.FileOutput, { flipsInRTL: false })
export const FilePen = withRTL(Lucide.FilePen, { flipsInRTL: false })
export const FilePenLine = withRTL(Lucide.FilePenLine, { flipsInRTL: false })
export const FilePieChart = withRTL(Lucide.FilePieChart, { flipsInRTL: false })
export const FilePlus = withRTL(Lucide.FilePlus, { flipsInRTL: false })
export const FilePlus2 = withRTL(Lucide.FilePlus2, { flipsInRTL: false })
export const FileQuestion = withRTL(Lucide.FileQuestion, { flipsInRTL: false })
export const FileScan = withRTL(Lucide.FileScan, { flipsInRTL: false })
export const FileSearch = withRTL(Lucide.FileSearch, { flipsInRTL: false })
export const FileSearch2 = withRTL(Lucide.FileSearch2, { flipsInRTL: false })
export const FileSignature = withRTL(Lucide.FileSignature, {
  flipsInRTL: false
})
export const FileSliders = withRTL(Lucide.FileSliders, { flipsInRTL: false })
export const FileSpreadsheet = withRTL(Lucide.FileSpreadsheet, {
  flipsInRTL: false
})
export const FileStack = withRTL(Lucide.FileStack, { flipsInRTL: false })
export const FileSymlink = withRTL(Lucide.FileSymlink, { flipsInRTL: false })
export const FileTerminal = withRTL(Lucide.FileTerminal, { flipsInRTL: false })
export const FileText = withRTL(Lucide.FileText, { flipsInRTL: false })
export const FileType = withRTL(Lucide.FileType, { flipsInRTL: false })
export const FileType2 = withRTL(Lucide.FileType2, { flipsInRTL: false })
export const FileUp = withRTL(Lucide.FileUp, { flipsInRTL: false })
export const FileUser = withRTL(Lucide.FileUser, { flipsInRTL: false })
export const FileVideo = withRTL(Lucide.FileVideo, { flipsInRTL: false })
export const FileVideo2 = withRTL(Lucide.FileVideo2, { flipsInRTL: false })
export const FileVolume = withRTL(Lucide.FileVolume, { flipsInRTL: false })
export const FileVolume2 = withRTL(Lucide.FileVolume2, { flipsInRTL: false })
export const FileWarning = withRTL(Lucide.FileWarning, { flipsInRTL: false })
export const FileX = withRTL(Lucide.FileX, { flipsInRTL: false })
export const FileX2 = withRTL(Lucide.FileX2, { flipsInRTL: false })
export const Files = withRTL(Lucide.Files, { flipsInRTL: false })
export const Film = withRTL(Lucide.Film, { flipsInRTL: false })
export const Filter = withRTL(Lucide.Filter, { flipsInRTL: false })
export const FilterX = withRTL(Lucide.FilterX, { flipsInRTL: false })
export const Fingerprint = withRTL(Lucide.Fingerprint, { flipsInRTL: false })
export const FireExtinguisher = withRTL(Lucide.FireExtinguisher, {
  flipsInRTL: false
})
export const Fish = withRTL(Lucide.Fish, { flipsInRTL: false })
export const FishOff = withRTL(Lucide.FishOff, { flipsInRTL: false })
export const FishSymbol = withRTL(Lucide.FishSymbol, { flipsInRTL: false })
export const Flag = withRTL(Lucide.Flag, { flipsInRTL: false })
export const FlagOff = withRTL(Lucide.FlagOff, { flipsInRTL: false })
export const FlagTriangleLeft = withRTL(Lucide.FlagTriangleLeft, {
  flipsInRTL: false
})
export const FlagTriangleRight = withRTL(Lucide.FlagTriangleRight, {
  flipsInRTL: false
})
export const Flame = withRTL(Lucide.Flame, { flipsInRTL: false })
export const FlameKindling = withRTL(Lucide.FlameKindling, {
  flipsInRTL: false
})
export const Flashlight = withRTL(Lucide.Flashlight, { flipsInRTL: false })
export const FlashlightOff = withRTL(Lucide.FlashlightOff, {
  flipsInRTL: false
})
export const FlaskConical = withRTL(Lucide.FlaskConical, { flipsInRTL: false })
export const FlaskConicalOff = withRTL(Lucide.FlaskConicalOff, {
  flipsInRTL: false
})
export const FlaskRound = withRTL(Lucide.FlaskRound, { flipsInRTL: false })
export const FlipHorizontal = withRTL(Lucide.FlipHorizontal, {
  flipsInRTL: false
})
export const FlipHorizontal2 = withRTL(Lucide.FlipHorizontal2, {
  flipsInRTL: false
})
export const FlipVertical = withRTL(Lucide.FlipVertical, { flipsInRTL: false })
export const FlipVertical2 = withRTL(Lucide.FlipVertical2, {
  flipsInRTL: false
})
export const Flower = withRTL(Lucide.Flower, { flipsInRTL: false })
export const Flower2 = withRTL(Lucide.Flower2, { flipsInRTL: false })
export const Focus = withRTL(Lucide.Focus, { flipsInRTL: false })
export const FoldHorizontal = withRTL(Lucide.FoldHorizontal, {
  flipsInRTL: false
})
export const FoldVertical = withRTL(Lucide.FoldVertical, { flipsInRTL: false })
export const Folder = withRTL(Lucide.Folder, { flipsInRTL: false })
export const FolderArchive = withRTL(Lucide.FolderArchive, {
  flipsInRTL: false
})
export const FolderCheck = withRTL(Lucide.FolderCheck, { flipsInRTL: false })
export const FolderClock = withRTL(Lucide.FolderClock, { flipsInRTL: false })
export const FolderClosed = withRTL(Lucide.FolderClosed, { flipsInRTL: false })
export const FolderCode = withRTL(Lucide.FolderCode, { flipsInRTL: false })
export const FolderCog = withRTL(Lucide.FolderCog, { flipsInRTL: false })
export const FolderCog2 = withRTL(Lucide.FolderCog2, { flipsInRTL: false })
export const FolderDot = withRTL(Lucide.FolderDot, { flipsInRTL: false })
export const FolderDown = withRTL(Lucide.FolderDown, { flipsInRTL: false })
export const FolderEdit = withRTL(Lucide.FolderEdit, { flipsInRTL: false })
export const FolderGit = withRTL(Lucide.FolderGit, { flipsInRTL: false })
export const FolderGit2 = withRTL(Lucide.FolderGit2, { flipsInRTL: false })
export const FolderHeart = withRTL(Lucide.FolderHeart, { flipsInRTL: false })
export const FolderInput = withRTL(Lucide.FolderInput, { flipsInRTL: false })
export const FolderKanban = withRTL(Lucide.FolderKanban, { flipsInRTL: false })
export const FolderKey = withRTL(Lucide.FolderKey, { flipsInRTL: false })
export const FolderLock = withRTL(Lucide.FolderLock, { flipsInRTL: false })
export const FolderMinus = withRTL(Lucide.FolderMinus, { flipsInRTL: false })
export const FolderOpen = withRTL(Lucide.FolderOpen, { flipsInRTL: false })
export const FolderOpenDot = withRTL(Lucide.FolderOpenDot, {
  flipsInRTL: false
})
export const FolderOutput = withRTL(Lucide.FolderOutput, { flipsInRTL: false })
export const FolderPen = withRTL(Lucide.FolderPen, { flipsInRTL: false })
export const FolderPlus = withRTL(Lucide.FolderPlus, { flipsInRTL: false })
export const FolderRoot = withRTL(Lucide.FolderRoot, { flipsInRTL: false })
export const FolderSearch = withRTL(Lucide.FolderSearch, { flipsInRTL: false })
export const FolderSearch2 = withRTL(Lucide.FolderSearch2, {
  flipsInRTL: false
})
export const FolderSymlink = withRTL(Lucide.FolderSymlink, {
  flipsInRTL: false
})
export const FolderSync = withRTL(Lucide.FolderSync, { flipsInRTL: false })
export const FolderTree = withRTL(Lucide.FolderTree, { flipsInRTL: false })
export const FolderUp = withRTL(Lucide.FolderUp, { flipsInRTL: false })
export const FolderX = withRTL(Lucide.FolderX, { flipsInRTL: false })
export const Folders = withRTL(Lucide.Folders, { flipsInRTL: false })
export const Footprints = withRTL(Lucide.Footprints, { flipsInRTL: false })
export const ForkKnife = withRTL(Lucide.ForkKnife, { flipsInRTL: false })
export const ForkKnifeCrossed = withRTL(Lucide.ForkKnifeCrossed, {
  flipsInRTL: false
})
export const Forklift = withRTL(Lucide.Forklift, { flipsInRTL: false })
export const FormInput = withRTL(Lucide.FormInput, { flipsInRTL: false })
export const Forward = withRTL(Lucide.Forward, { flipsInRTL: false })
export const Frame = withRTL(Lucide.Frame, { flipsInRTL: false })
export const Framer = withRTL(Lucide.Framer, { flipsInRTL: false })
export const Frown = withRTL(Lucide.Frown, { flipsInRTL: false })
export const Fuel = withRTL(Lucide.Fuel, { flipsInRTL: false })
export const Fullscreen = withRTL(Lucide.Fullscreen, { flipsInRTL: false })
export const FunctionSquare = withRTL(Lucide.FunctionSquare, {
  flipsInRTL: false
})
export const GalleryHorizontal = withRTL(Lucide.GalleryHorizontal, {
  flipsInRTL: false
})
export const GalleryHorizontalEnd = withRTL(Lucide.GalleryHorizontalEnd, {
  flipsInRTL: false
})
export const GalleryThumbnails = withRTL(Lucide.GalleryThumbnails, {
  flipsInRTL: false
})
export const GalleryVertical = withRTL(Lucide.GalleryVertical, {
  flipsInRTL: false
})
export const GalleryVerticalEnd = withRTL(Lucide.GalleryVerticalEnd, {
  flipsInRTL: false
})
export const Gamepad = withRTL(Lucide.Gamepad, { flipsInRTL: false })
export const Gamepad2 = withRTL(Lucide.Gamepad2, { flipsInRTL: false })
export const GanttChart = withRTL(Lucide.GanttChart, { flipsInRTL: false })
export const GanttChartSquare = withRTL(Lucide.GanttChartSquare, {
  flipsInRTL: false
})
export const Gauge = withRTL(Lucide.Gauge, { flipsInRTL: false })
export const GaugeCircle = withRTL(Lucide.GaugeCircle, { flipsInRTL: false })
export const Gavel = withRTL(Lucide.Gavel, { flipsInRTL: false })
export const Gem = withRTL(Lucide.Gem, { flipsInRTL: false })
export const Ghost = withRTL(Lucide.Ghost, { flipsInRTL: false })
export const Gift = withRTL(Lucide.Gift, { flipsInRTL: false })
export const GitBranch = withRTL(Lucide.GitBranch, { flipsInRTL: false })
export const GitBranchPlus = withRTL(Lucide.GitBranchPlus, {
  flipsInRTL: false
})
export const GitCommit = withRTL(Lucide.GitCommit, { flipsInRTL: false })
export const GitCommitHorizontal = withRTL(Lucide.GitCommitHorizontal, {
  flipsInRTL: false
})
export const GitCommitVertical = withRTL(Lucide.GitCommitVertical, {
  flipsInRTL: false
})
export const GitCompare = withRTL(Lucide.GitCompare, { flipsInRTL: false })
export const GitCompareArrows = withRTL(Lucide.GitCompareArrows, {
  flipsInRTL: false
})
export const GitFork = withRTL(Lucide.GitFork, { flipsInRTL: false })
export const GitGraph = withRTL(Lucide.GitGraph, { flipsInRTL: false })
export const GitMerge = withRTL(Lucide.GitMerge, { flipsInRTL: false })
export const GitPullRequest = withRTL(Lucide.GitPullRequest, {
  flipsInRTL: false
})
export const GitPullRequestArrow = withRTL(Lucide.GitPullRequestArrow, {
  flipsInRTL: false
})
export const GitPullRequestClosed = withRTL(Lucide.GitPullRequestClosed, {
  flipsInRTL: false
})
export const GitPullRequestCreate = withRTL(Lucide.GitPullRequestCreate, {
  flipsInRTL: false
})
export const GitPullRequestCreateArrow = withRTL(
  Lucide.GitPullRequestCreateArrow,
  { flipsInRTL: false }
)
export const GitPullRequestDraft = withRTL(Lucide.GitPullRequestDraft, {
  flipsInRTL: false
})
export const Github = withRTL(Lucide.Github, { flipsInRTL: false })
export const Gitlab = withRTL(Lucide.Gitlab, { flipsInRTL: false })
export const GlassWater = withRTL(Lucide.GlassWater, { flipsInRTL: false })
export const Glasses = withRTL(Lucide.Glasses, { flipsInRTL: false })
export const Globe = withRTL(Lucide.Globe, { flipsInRTL: false })
export const Globe2 = withRTL(Lucide.Globe2, { flipsInRTL: false })
export const GlobeLock = withRTL(Lucide.GlobeLock, { flipsInRTL: false })
export const Goal = withRTL(Lucide.Goal, { flipsInRTL: false })
export const Grab = withRTL(Lucide.Grab, { flipsInRTL: false })
export const GraduationCap = withRTL(Lucide.GraduationCap, {
  flipsInRTL: false
})
export const Grape = withRTL(Lucide.Grape, { flipsInRTL: false })
export const Grid = withRTL(Lucide.Grid, { flipsInRTL: false })
export const Grid2X2 = withRTL(Lucide.Grid2X2, { flipsInRTL: false })
export const Grid2X2Plus = withRTL(Lucide.Grid2X2Plus, { flipsInRTL: false })
export const Grid2x2 = withRTL(Lucide.Grid2x2, { flipsInRTL: false })
export const Grid2x2Check = withRTL(Lucide.Grid2x2Check, { flipsInRTL: false })
export const Grid2x2Plus = withRTL(Lucide.Grid2x2Plus, { flipsInRTL: false })
export const Grid2x2X = withRTL(Lucide.Grid2x2X, { flipsInRTL: false })
export const Grid3X3 = withRTL(Lucide.Grid3X3, { flipsInRTL: false })
export const Grid3x3 = withRTL(Lucide.Grid3x3, { flipsInRTL: false })
export const Grip = withRTL(Lucide.Grip, { flipsInRTL: false })
export const GripHorizontal = withRTL(Lucide.GripHorizontal, {
  flipsInRTL: false
})
export const GripVertical = withRTL(Lucide.GripVertical, { flipsInRTL: false })
export const Group = withRTL(Lucide.Group, { flipsInRTL: false })
export const Guitar = withRTL(Lucide.Guitar, { flipsInRTL: false })
export const Ham = withRTL(Lucide.Ham, { flipsInRTL: false })
export const Hammer = withRTL(Lucide.Hammer, { flipsInRTL: false })
export const Hand = withRTL(Lucide.Hand, { flipsInRTL: false })
export const HandCoins = withRTL(Lucide.HandCoins, { flipsInRTL: false })
export const HandHeart = withRTL(Lucide.HandHeart, { flipsInRTL: false })
export const HandHelping = withRTL(Lucide.HandHelping, { flipsInRTL: false })
export const HandMetal = withRTL(Lucide.HandMetal, { flipsInRTL: false })
export const HandPlatter = withRTL(Lucide.HandPlatter, { flipsInRTL: false })
export const Handshake = withRTL(Lucide.Handshake, { flipsInRTL: false })
export const HardDrive = withRTL(Lucide.HardDrive, { flipsInRTL: false })
export const HardDriveDownload = withRTL(Lucide.HardDriveDownload, {
  flipsInRTL: false
})
export const HardDriveUpload = withRTL(Lucide.HardDriveUpload, {
  flipsInRTL: false
})
export const HardHat = withRTL(Lucide.HardHat, { flipsInRTL: false })
export const Hash = withRTL(Lucide.Hash, { flipsInRTL: false })
export const Haze = withRTL(Lucide.Haze, { flipsInRTL: false })
export const HdmiPort = withRTL(Lucide.HdmiPort, { flipsInRTL: false })
export const Heading = withRTL(Lucide.Heading, { flipsInRTL: false })
export const Heading1 = withRTL(Lucide.Heading1, { flipsInRTL: false })
export const Heading2 = withRTL(Lucide.Heading2, { flipsInRTL: false })
export const Heading3 = withRTL(Lucide.Heading3, { flipsInRTL: false })
export const Heading4 = withRTL(Lucide.Heading4, { flipsInRTL: false })
export const Heading5 = withRTL(Lucide.Heading5, { flipsInRTL: false })
export const Heading6 = withRTL(Lucide.Heading6, { flipsInRTL: false })
export const HeadphoneOff = withRTL(Lucide.HeadphoneOff, { flipsInRTL: false })
export const Headphones = withRTL(Lucide.Headphones, { flipsInRTL: false })
export const Headset = withRTL(Lucide.Headset, { flipsInRTL: false })
export const Heart = withRTL(Lucide.Heart, { flipsInRTL: false })
export const HeartCrack = withRTL(Lucide.HeartCrack, { flipsInRTL: false })
export const HeartHandshake = withRTL(Lucide.HeartHandshake, {
  flipsInRTL: false
})
export const HeartOff = withRTL(Lucide.HeartOff, { flipsInRTL: false })
export const HeartPulse = withRTL(Lucide.HeartPulse, { flipsInRTL: false })
export const Heater = withRTL(Lucide.Heater, { flipsInRTL: false })
export const HelpCircle = withRTL(Lucide.HelpCircle, { flipsInRTL: false })
export const HelpingHand = withRTL(Lucide.HelpingHand, { flipsInRTL: false })
export const Hexagon = withRTL(Lucide.Hexagon, { flipsInRTL: false })
export const Highlighter = withRTL(Lucide.Highlighter, { flipsInRTL: false })
export const History = withRTL(Lucide.History, { flipsInRTL: false })
export const Home = withRTL(Lucide.Home, { flipsInRTL: false })
export const Hop = withRTL(Lucide.Hop, { flipsInRTL: false })
export const HopOff = withRTL(Lucide.HopOff, { flipsInRTL: false })
export const Hospital = withRTL(Lucide.Hospital, { flipsInRTL: false })
export const Hotel = withRTL(Lucide.Hotel, { flipsInRTL: false })
export const Hourglass = withRTL(Lucide.Hourglass, { flipsInRTL: false })
export const House = withRTL(Lucide.House, { flipsInRTL: false })
export const HousePlug = withRTL(Lucide.HousePlug, { flipsInRTL: false })
export const HousePlus = withRTL(Lucide.HousePlus, { flipsInRTL: false })
export const IceCream = withRTL(Lucide.IceCream, { flipsInRTL: false })
export const IceCream2 = withRTL(Lucide.IceCream2, { flipsInRTL: false })
export const IceCreamBowl = withRTL(Lucide.IceCreamBowl, { flipsInRTL: false })
export const IceCreamCone = withRTL(Lucide.IceCreamCone, { flipsInRTL: false })
export const IdCard = withRTL(Lucide.IdCard, { flipsInRTL: false })
export const Image = withRTL(Lucide.Image, { flipsInRTL: false })
export const ImageDown = withRTL(Lucide.ImageDown, { flipsInRTL: false })
export const ImageMinus = withRTL(Lucide.ImageMinus, { flipsInRTL: false })
export const ImageOff = withRTL(Lucide.ImageOff, { flipsInRTL: false })
export const ImagePlay = withRTL(Lucide.ImagePlay, { flipsInRTL: false })
export const ImagePlus = withRTL(Lucide.ImagePlus, { flipsInRTL: false })
export const ImageUp = withRTL(Lucide.ImageUp, { flipsInRTL: false })
export const Images = withRTL(Lucide.Images, { flipsInRTL: false })
export const Import = withRTL(Lucide.Import, { flipsInRTL: false })
export const Inbox = withRTL(Lucide.Inbox, { flipsInRTL: false })
export const Indent = withRTL(Lucide.Indent, { flipsInRTL: false })
export const IndentDecrease = withRTL(Lucide.IndentDecrease, {
  flipsInRTL: false
})
export const IndentIncrease = withRTL(Lucide.IndentIncrease, {
  flipsInRTL: false
})
export const IndianRupee = withRTL(Lucide.IndianRupee, { flipsInRTL: false })
// export const Infinity = withRTL(Lucide.Infinity, { flipsInRTL: false })
export const Info = withRTL(Lucide.Info, { flipsInRTL: false })
export const Inspect = withRTL(Lucide.Inspect, { flipsInRTL: false })
export const InspectionPanel = withRTL(Lucide.InspectionPanel, {
  flipsInRTL: false
})
export const Instagram = withRTL(Lucide.Instagram, { flipsInRTL: false })
export const Italic = withRTL(Lucide.Italic, { flipsInRTL: false })
export const IterationCcw = withRTL(Lucide.IterationCcw, { flipsInRTL: false })
export const IterationCw = withRTL(Lucide.IterationCw, { flipsInRTL: false })
export const JapaneseYen = withRTL(Lucide.JapaneseYen, { flipsInRTL: false })
export const Joystick = withRTL(Lucide.Joystick, { flipsInRTL: false })
export const Kanban = withRTL(Lucide.Kanban, { flipsInRTL: false })
export const KanbanSquare = withRTL(Lucide.KanbanSquare, { flipsInRTL: false })
export const KanbanSquareDashed = withRTL(Lucide.KanbanSquareDashed, {
  flipsInRTL: false
})
export const Key = withRTL(Lucide.Key, { flipsInRTL: false })
export const KeyRound = withRTL(Lucide.KeyRound, { flipsInRTL: false })
export const KeySquare = withRTL(Lucide.KeySquare, { flipsInRTL: false })
export const Keyboard = withRTL(Lucide.Keyboard, { flipsInRTL: false })
export const KeyboardMusic = withRTL(Lucide.KeyboardMusic, {
  flipsInRTL: false
})
export const KeyboardOff = withRTL(Lucide.KeyboardOff, { flipsInRTL: false })
export const Lamp = withRTL(Lucide.Lamp, { flipsInRTL: false })
export const LampCeiling = withRTL(Lucide.LampCeiling, { flipsInRTL: false })
export const LampDesk = withRTL(Lucide.LampDesk, { flipsInRTL: false })
export const LampFloor = withRTL(Lucide.LampFloor, { flipsInRTL: false })
export const LampWallDown = withRTL(Lucide.LampWallDown, { flipsInRTL: false })
export const LampWallUp = withRTL(Lucide.LampWallUp, { flipsInRTL: false })
export const LandPlot = withRTL(Lucide.LandPlot, { flipsInRTL: false })
export const Landmark = withRTL(Lucide.Landmark, { flipsInRTL: false })
export const Languages = withRTL(Lucide.Languages, { flipsInRTL: false })
export const Laptop = withRTL(Lucide.Laptop, { flipsInRTL: false })
export const Laptop2 = withRTL(Lucide.Laptop2, { flipsInRTL: false })
export const LaptopMinimal = withRTL(Lucide.LaptopMinimal, {
  flipsInRTL: false
})
export const LaptopMinimalCheck = withRTL(Lucide.LaptopMinimalCheck, {
  flipsInRTL: false
})
export const Lasso = withRTL(Lucide.Lasso, { flipsInRTL: false })
export const LassoSelect = withRTL(Lucide.LassoSelect, { flipsInRTL: false })
export const Laugh = withRTL(Lucide.Laugh, { flipsInRTL: false })
export const Layers = withRTL(Lucide.Layers, { flipsInRTL: false })
export const Layers2 = withRTL(Lucide.Layers2, { flipsInRTL: false })
export const Layers3 = withRTL(Lucide.Layers3, { flipsInRTL: false })
export const Layout = withRTL(Lucide.Layout, { flipsInRTL: false })
export const LayoutDashboard = withRTL(Lucide.LayoutDashboard, {
  flipsInRTL: false
})
export const LayoutGrid = withRTL(Lucide.LayoutGrid, { flipsInRTL: false })
export const LayoutList = withRTL(Lucide.LayoutList, { flipsInRTL: false })
export const LayoutPanelLeft = withRTL(Lucide.LayoutPanelLeft, {
  flipsInRTL: false
})
export const LayoutPanelTop = withRTL(Lucide.LayoutPanelTop, {
  flipsInRTL: false
})
export const LayoutTemplate = withRTL(Lucide.LayoutTemplate, {
  flipsInRTL: false
})
export const Leaf = withRTL(Lucide.Leaf, { flipsInRTL: false })
export const LeafyGreen = withRTL(Lucide.LeafyGreen, { flipsInRTL: false })
export const Lectern = withRTL(Lucide.Lectern, { flipsInRTL: false })
export const LetterText = withRTL(Lucide.LetterText, { flipsInRTL: false })
export const Library = withRTL(Lucide.Library, { flipsInRTL: false })
export const LibraryBig = withRTL(Lucide.LibraryBig, { flipsInRTL: false })
export const LibrarySquare = withRTL(Lucide.LibrarySquare, {
  flipsInRTL: false
})
export const LifeBuoy = withRTL(Lucide.LifeBuoy, { flipsInRTL: false })
export const Ligature = withRTL(Lucide.Ligature, { flipsInRTL: false })
export const Lightbulb = withRTL(Lucide.Lightbulb, { flipsInRTL: false })
export const LightbulbOff = withRTL(Lucide.LightbulbOff, { flipsInRTL: false })
export const LineChart = withRTL(Lucide.LineChart, { flipsInRTL: false })
export const Link = withRTL(Lucide.Link, { flipsInRTL: false })
export const Link2 = withRTL(Lucide.Link2, { flipsInRTL: false })
export const Link2Off = withRTL(Lucide.Link2Off, { flipsInRTL: false })
export const Linkedin = withRTL(Lucide.Linkedin, { flipsInRTL: false })
export const List = withRTL(Lucide.List, { flipsInRTL: false })
export const ListCheck = withRTL(Lucide.ListCheck, { flipsInRTL: false })
export const ListChecks = withRTL(Lucide.ListChecks, { flipsInRTL: false })
export const ListCollapse = withRTL(Lucide.ListCollapse, { flipsInRTL: false })
export const ListEnd = withRTL(Lucide.ListEnd, { flipsInRTL: false })
export const ListFilter = withRTL(Lucide.ListFilter, { flipsInRTL: false })
export const ListMinus = withRTL(Lucide.ListMinus, { flipsInRTL: false })
export const ListMusic = withRTL(Lucide.ListMusic, { flipsInRTL: false })
export const ListOrdered = withRTL(Lucide.ListOrdered, { flipsInRTL: false })
export const ListPlus = withRTL(Lucide.ListPlus, { flipsInRTL: false })
export const ListRestart = withRTL(Lucide.ListRestart, { flipsInRTL: false })
export const ListStart = withRTL(Lucide.ListStart, { flipsInRTL: false })
export const ListTodo = withRTL(Lucide.ListTodo, { flipsInRTL: false })
export const ListTree = withRTL(Lucide.ListTree, { flipsInRTL: false })
export const ListVideo = withRTL(Lucide.ListVideo, { flipsInRTL: false })
export const ListX = withRTL(Lucide.ListX, { flipsInRTL: false })
export const Loader = withRTL(Lucide.Loader, { flipsInRTL: false })
export const Loader2 = withRTL(Lucide.Loader2, { flipsInRTL: false })
export const LoaderCircle = withRTL(Lucide.LoaderCircle, { flipsInRTL: false })
export const LoaderPinwheel = withRTL(Lucide.LoaderPinwheel, {
  flipsInRTL: false
})
export const Locate = withRTL(Lucide.Locate, { flipsInRTL: false })
export const LocateFixed = withRTL(Lucide.LocateFixed, { flipsInRTL: false })
export const LocateOff = withRTL(Lucide.LocateOff, { flipsInRTL: false })
export const Lock = withRTL(Lucide.Lock, { flipsInRTL: false })
export const LockKeyhole = withRTL(Lucide.LockKeyhole, { flipsInRTL: false })
export const LockKeyholeOpen = withRTL(Lucide.LockKeyholeOpen, {
  flipsInRTL: false
})
export const LockOpen = withRTL(Lucide.LockOpen, { flipsInRTL: false })
export const LogIn = withRTL(Lucide.LogIn, { flipsInRTL: false })
export const LogOut = withRTL(Lucide.LogOut, { flipsInRTL: false })
export const Logs = withRTL(Lucide.Logs, { flipsInRTL: false })
export const Lollipop = withRTL(Lucide.Lollipop, { flipsInRTL: false })
export const Luggage = withRTL(Lucide.Luggage, { flipsInRTL: false })
export const MSquare = withRTL(Lucide.MSquare, { flipsInRTL: false })
export const Magnet = withRTL(Lucide.Magnet, { flipsInRTL: false })
export const Mail = withRTL(Lucide.Mail, { flipsInRTL: false })
export const MailCheck = withRTL(Lucide.MailCheck, { flipsInRTL: false })
export const MailMinus = withRTL(Lucide.MailMinus, { flipsInRTL: false })
export const MailOpen = withRTL(Lucide.MailOpen, { flipsInRTL: false })
export const MailPlus = withRTL(Lucide.MailPlus, { flipsInRTL: false })
export const MailQuestion = withRTL(Lucide.MailQuestion, { flipsInRTL: false })
export const MailSearch = withRTL(Lucide.MailSearch, { flipsInRTL: false })
export const MailWarning = withRTL(Lucide.MailWarning, { flipsInRTL: false })
export const MailX = withRTL(Lucide.MailX, { flipsInRTL: false })
export const Mailbox = withRTL(Lucide.Mailbox, { flipsInRTL: false })
export const Mails = withRTL(Lucide.Mails, { flipsInRTL: false })
export const Map = withRTL(Lucide.Map, { flipsInRTL: false })
export const MapPin = withRTL(Lucide.MapPin, { flipsInRTL: false })
export const MapPinCheck = withRTL(Lucide.MapPinCheck, { flipsInRTL: false })
export const MapPinCheckInside = withRTL(Lucide.MapPinCheckInside, {
  flipsInRTL: false
})
export const MapPinHouse = withRTL(Lucide.MapPinHouse, { flipsInRTL: false })
export const MapPinMinus = withRTL(Lucide.MapPinMinus, { flipsInRTL: false })
export const MapPinMinusInside = withRTL(Lucide.MapPinMinusInside, {
  flipsInRTL: false
})
export const MapPinOff = withRTL(Lucide.MapPinOff, { flipsInRTL: false })
export const MapPinPlus = withRTL(Lucide.MapPinPlus, { flipsInRTL: false })
export const MapPinPlusInside = withRTL(Lucide.MapPinPlusInside, {
  flipsInRTL: false
})
export const MapPinX = withRTL(Lucide.MapPinX, { flipsInRTL: false })
export const MapPinXInside = withRTL(Lucide.MapPinXInside, {
  flipsInRTL: false
})
export const MapPinned = withRTL(Lucide.MapPinned, { flipsInRTL: false })
export const Martini = withRTL(Lucide.Martini, { flipsInRTL: false })
export const Maximize = withRTL(Lucide.Maximize, { flipsInRTL: false })
export const Maximize2 = withRTL(Lucide.Maximize2, { flipsInRTL: false })
export const Medal = withRTL(Lucide.Medal, { flipsInRTL: false })
export const Megaphone = withRTL(Lucide.Megaphone, { flipsInRTL: false })
export const MegaphoneOff = withRTL(Lucide.MegaphoneOff, { flipsInRTL: false })
export const Meh = withRTL(Lucide.Meh, { flipsInRTL: false })
export const MemoryStick = withRTL(Lucide.MemoryStick, { flipsInRTL: false })
export const Menu = withRTL(Lucide.Menu, { flipsInRTL: false })
export const MenuSquare = withRTL(Lucide.MenuSquare, { flipsInRTL: false })
export const Merge = withRTL(Lucide.Merge, { flipsInRTL: false })
export const MessageCircle = withRTL(Lucide.MessageCircle, {
  flipsInRTL: false
})
export const MessageCircleCode = withRTL(Lucide.MessageCircleCode, {
  flipsInRTL: false
})
export const MessageCircleDashed = withRTL(Lucide.MessageCircleDashed, {
  flipsInRTL: false
})
export const MessageCircleHeart = withRTL(Lucide.MessageCircleHeart, {
  flipsInRTL: false
})
export const MessageCircleMore = withRTL(Lucide.MessageCircleMore, {
  flipsInRTL: false
})
export const MessageCircleOff = withRTL(Lucide.MessageCircleOff, {
  flipsInRTL: false
})
export const MessageCirclePlus = withRTL(Lucide.MessageCirclePlus, {
  flipsInRTL: false
})
export const MessageCircleQuestion = withRTL(Lucide.MessageCircleQuestion, {
  flipsInRTL: false
})
export const MessageCircleReply = withRTL(Lucide.MessageCircleReply, {
  flipsInRTL: false
})
export const MessageCircleWarning = withRTL(Lucide.MessageCircleWarning, {
  flipsInRTL: false
})
export const MessageCircleX = withRTL(Lucide.MessageCircleX, {
  flipsInRTL: false
})
export const MessageSquare = withRTL(Lucide.MessageSquare, {
  flipsInRTL: false
})
export const MessageSquareCode = withRTL(Lucide.MessageSquareCode, {
  flipsInRTL: false
})
export const MessageSquareDashed = withRTL(Lucide.MessageSquareDashed, {
  flipsInRTL: false
})
export const MessageSquareDiff = withRTL(Lucide.MessageSquareDiff, {
  flipsInRTL: false
})
export const MessageSquareDot = withRTL(Lucide.MessageSquareDot, {
  flipsInRTL: false
})
export const MessageSquareHeart = withRTL(Lucide.MessageSquareHeart, {
  flipsInRTL: false
})
export const MessageSquareLock = withRTL(Lucide.MessageSquareLock, {
  flipsInRTL: false
})
export const MessageSquareMore = withRTL(Lucide.MessageSquareMore, {
  flipsInRTL: false
})
export const MessageSquareOff = withRTL(Lucide.MessageSquareOff, {
  flipsInRTL: false
})
export const MessageSquarePlus = withRTL(Lucide.MessageSquarePlus, {
  flipsInRTL: false
})
export const MessageSquareQuote = withRTL(Lucide.MessageSquareQuote, {
  flipsInRTL: false
})
export const MessageSquareReply = withRTL(Lucide.MessageSquareReply, {
  flipsInRTL: false
})
export const MessageSquareShare = withRTL(Lucide.MessageSquareShare, {
  flipsInRTL: false
})
export const MessageSquareText = withRTL(Lucide.MessageSquareText, {
  flipsInRTL: false
})
export const MessageSquareWarning = withRTL(Lucide.MessageSquareWarning, {
  flipsInRTL: false
})
export const MessageSquareX = withRTL(Lucide.MessageSquareX, {
  flipsInRTL: false
})
export const MessagesSquare = withRTL(Lucide.MessagesSquare, {
  flipsInRTL: false
})
export const Mic = withRTL(Lucide.Mic, { flipsInRTL: false })
export const Mic2 = withRTL(Lucide.Mic2, { flipsInRTL: false })
export const MicOff = withRTL(Lucide.MicOff, { flipsInRTL: false })
export const MicVocal = withRTL(Lucide.MicVocal, { flipsInRTL: false })
export const Microchip = withRTL(Lucide.Microchip, { flipsInRTL: false })
export const Microscope = withRTL(Lucide.Microscope, { flipsInRTL: false })
export const Microwave = withRTL(Lucide.Microwave, { flipsInRTL: false })
export const Milestone = withRTL(Lucide.Milestone, { flipsInRTL: false })
export const Milk = withRTL(Lucide.Milk, { flipsInRTL: false })
export const MilkOff = withRTL(Lucide.MilkOff, { flipsInRTL: false })
export const Minimize = withRTL(Lucide.Minimize, { flipsInRTL: false })
export const Minimize2 = withRTL(Lucide.Minimize2, { flipsInRTL: false })
export const Minus = withRTL(Lucide.Minus, { flipsInRTL: false })
export const MinusCircle = withRTL(Lucide.MinusCircle, { flipsInRTL: false })
export const MinusSquare = withRTL(Lucide.MinusSquare, { flipsInRTL: false })
export const Monitor = withRTL(Lucide.Monitor, { flipsInRTL: false })
export const MonitorCheck = withRTL(Lucide.MonitorCheck, { flipsInRTL: false })
export const MonitorCog = withRTL(Lucide.MonitorCog, { flipsInRTL: false })
export const MonitorDot = withRTL(Lucide.MonitorDot, { flipsInRTL: false })
export const MonitorDown = withRTL(Lucide.MonitorDown, { flipsInRTL: false })
export const MonitorOff = withRTL(Lucide.MonitorOff, { flipsInRTL: false })
export const MonitorPause = withRTL(Lucide.MonitorPause, { flipsInRTL: false })
export const MonitorPlay = withRTL(Lucide.MonitorPlay, { flipsInRTL: false })
export const MonitorSmartphone = withRTL(Lucide.MonitorSmartphone, {
  flipsInRTL: false
})
export const MonitorSpeaker = withRTL(Lucide.MonitorSpeaker, {
  flipsInRTL: false
})
export const MonitorStop = withRTL(Lucide.MonitorStop, { flipsInRTL: false })
export const MonitorUp = withRTL(Lucide.MonitorUp, { flipsInRTL: false })
export const MonitorX = withRTL(Lucide.MonitorX, { flipsInRTL: false })
export const Moon = withRTL(Lucide.Moon, { flipsInRTL: false })
export const MoonStar = withRTL(Lucide.MoonStar, { flipsInRTL: false })
export const MoreHorizontal = withRTL(Lucide.MoreHorizontal, {
  flipsInRTL: false
})
export const MoreVertical = withRTL(Lucide.MoreVertical, { flipsInRTL: false })
export const Mountain = withRTL(Lucide.Mountain, { flipsInRTL: false })
export const MountainSnow = withRTL(Lucide.MountainSnow, { flipsInRTL: false })
export const Mouse = withRTL(Lucide.Mouse, { flipsInRTL: false })
export const MouseOff = withRTL(Lucide.MouseOff, { flipsInRTL: false })
export const MousePointer = withRTL(Lucide.MousePointer, { flipsInRTL: false })
export const MousePointer2 = withRTL(Lucide.MousePointer2, {
  flipsInRTL: false
})
export const MousePointerBan = withRTL(Lucide.MousePointerBan, {
  flipsInRTL: false
})
export const MousePointerClick = withRTL(Lucide.MousePointerClick, {
  flipsInRTL: false
})
export const MousePointerSquareDashed = withRTL(
  Lucide.MousePointerSquareDashed,
  { flipsInRTL: false }
)
export const Move = withRTL(Lucide.Move, { flipsInRTL: false })
export const Move3D = withRTL(Lucide.Move3D, { flipsInRTL: false })
export const Move3d = withRTL(Lucide.Move3d, { flipsInRTL: false })
export const MoveDiagonal = withRTL(Lucide.MoveDiagonal, { flipsInRTL: false })
export const MoveDiagonal2 = withRTL(Lucide.MoveDiagonal2, {
  flipsInRTL: false
})
export const MoveDown = withRTL(Lucide.MoveDown, { flipsInRTL: false })
export const MoveDownLeft = withRTL(Lucide.MoveDownLeft, { flipsInRTL: false })
export const MoveDownRight = withRTL(Lucide.MoveDownRight, {
  flipsInRTL: false
})
export const MoveHorizontal = withRTL(Lucide.MoveHorizontal, {
  flipsInRTL: false
})
export const MoveLeft = withRTL(Lucide.MoveLeft, { flipsInRTL: false })
export const MoveRight = withRTL(Lucide.MoveRight, { flipsInRTL: false })
export const MoveUp = withRTL(Lucide.MoveUp, { flipsInRTL: false })
export const MoveUpLeft = withRTL(Lucide.MoveUpLeft, { flipsInRTL: false })
export const MoveUpRight = withRTL(Lucide.MoveUpRight, { flipsInRTL: false })
export const MoveVertical = withRTL(Lucide.MoveVertical, { flipsInRTL: false })
export const Music = withRTL(Lucide.Music, { flipsInRTL: false })
export const Music2 = withRTL(Lucide.Music2, { flipsInRTL: false })
export const Music3 = withRTL(Lucide.Music3, { flipsInRTL: false })
export const Music4 = withRTL(Lucide.Music4, { flipsInRTL: false })
export const Navigation = withRTL(Lucide.Navigation, { flipsInRTL: false })
export const Navigation2 = withRTL(Lucide.Navigation2, { flipsInRTL: false })
export const Navigation2Off = withRTL(Lucide.Navigation2Off, {
  flipsInRTL: false
})
export const NavigationOff = withRTL(Lucide.NavigationOff, {
  flipsInRTL: false
})
export const Network = withRTL(Lucide.Network, { flipsInRTL: false })
export const Newspaper = withRTL(Lucide.Newspaper, { flipsInRTL: false })
export const Nfc = withRTL(Lucide.Nfc, { flipsInRTL: false })
export const Notebook = withRTL(Lucide.Notebook, { flipsInRTL: false })
export const NotebookPen = withRTL(Lucide.NotebookPen, { flipsInRTL: false })
export const NotebookTabs = withRTL(Lucide.NotebookTabs, { flipsInRTL: false })
export const NotebookText = withRTL(Lucide.NotebookText, { flipsInRTL: false })
export const NotepadText = withRTL(Lucide.NotepadText, { flipsInRTL: false })
export const NotepadTextDashed = withRTL(Lucide.NotepadTextDashed, {
  flipsInRTL: false
})
export const Nut = withRTL(Lucide.Nut, { flipsInRTL: false })
export const NutOff = withRTL(Lucide.NutOff, { flipsInRTL: false })
export const Octagon = withRTL(Lucide.Octagon, { flipsInRTL: false })
export const OctagonAlert = withRTL(Lucide.OctagonAlert, { flipsInRTL: false })
export const OctagonMinus = withRTL(Lucide.OctagonMinus, { flipsInRTL: false })
export const OctagonPause = withRTL(Lucide.OctagonPause, { flipsInRTL: false })
export const OctagonX = withRTL(Lucide.OctagonX, { flipsInRTL: false })
export const Omega = withRTL(Lucide.Omega, { flipsInRTL: false })
export const Option = withRTL(Lucide.Option, { flipsInRTL: false })
export const Orbit = withRTL(Lucide.Orbit, { flipsInRTL: false })
export const Origami = withRTL(Lucide.Origami, { flipsInRTL: false })
export const Outdent = withRTL(Lucide.Outdent, { flipsInRTL: false })
export const Package = withRTL(Lucide.Package, { flipsInRTL: false })
export const Package2 = withRTL(Lucide.Package2, { flipsInRTL: false })
export const PackageCheck = withRTL(Lucide.PackageCheck, { flipsInRTL: false })
export const PackageMinus = withRTL(Lucide.PackageMinus, { flipsInRTL: false })
export const PackageOpen = withRTL(Lucide.PackageOpen, { flipsInRTL: false })
export const PackagePlus = withRTL(Lucide.PackagePlus, { flipsInRTL: false })
export const PackageSearch = withRTL(Lucide.PackageSearch, {
  flipsInRTL: false
})
export const PackageX = withRTL(Lucide.PackageX, { flipsInRTL: false })
export const PaintBucket = withRTL(Lucide.PaintBucket, { flipsInRTL: false })
export const PaintRoller = withRTL(Lucide.PaintRoller, { flipsInRTL: false })
export const Paintbrush = withRTL(Lucide.Paintbrush, { flipsInRTL: false })
export const Paintbrush2 = withRTL(Lucide.Paintbrush2, { flipsInRTL: false })
export const PaintbrushVertical = withRTL(Lucide.PaintbrushVertical, {
  flipsInRTL: false
})
export const Palette = withRTL(Lucide.Palette, { flipsInRTL: false })
export const Palmtree = withRTL(Lucide.Palmtree, { flipsInRTL: false })
export const PanelBottom = withRTL(Lucide.PanelBottom, { flipsInRTL: false })
export const PanelBottomClose = withRTL(Lucide.PanelBottomClose, {
  flipsInRTL: false
})
export const PanelBottomDashed = withRTL(Lucide.PanelBottomDashed, {
  flipsInRTL: false
})
export const PanelBottomInactive = withRTL(Lucide.PanelBottomInactive, {
  flipsInRTL: false
})
export const PanelBottomOpen = withRTL(Lucide.PanelBottomOpen, {
  flipsInRTL: false
})
export const PanelLeft = withRTL(Lucide.PanelLeft, { flipsInRTL: false })
export const PanelLeftClose = withRTL(Lucide.PanelLeftClose, {
  flipsInRTL: false
})
export const PanelLeftDashed = withRTL(Lucide.PanelLeftDashed, {
  flipsInRTL: false
})
export const PanelLeftInactive = withRTL(Lucide.PanelLeftInactive, {
  flipsInRTL: false
})
export const PanelLeftOpen = withRTL(Lucide.PanelLeftOpen, {
  flipsInRTL: false
})
export const PanelRight = withRTL(Lucide.PanelRight, { flipsInRTL: false })
export const PanelRightClose = withRTL(Lucide.PanelRightClose, {
  flipsInRTL: false
})
export const PanelRightDashed = withRTL(Lucide.PanelRightDashed, {
  flipsInRTL: false
})
export const PanelRightInactive = withRTL(Lucide.PanelRightInactive, {
  flipsInRTL: false
})
export const PanelRightOpen = withRTL(Lucide.PanelRightOpen, {
  flipsInRTL: false
})
export const PanelTop = withRTL(Lucide.PanelTop, { flipsInRTL: false })
export const PanelTopClose = withRTL(Lucide.PanelTopClose, {
  flipsInRTL: false
})
export const PanelTopDashed = withRTL(Lucide.PanelTopDashed, {
  flipsInRTL: false
})
export const PanelTopInactive = withRTL(Lucide.PanelTopInactive, {
  flipsInRTL: false
})
export const PanelTopOpen = withRTL(Lucide.PanelTopOpen, { flipsInRTL: false })
export const PanelsLeftBottom = withRTL(Lucide.PanelsLeftBottom, {
  flipsInRTL: false
})
export const PanelsLeftRight = withRTL(Lucide.PanelsLeftRight, {
  flipsInRTL: false
})
export const PanelsRightBottom = withRTL(Lucide.PanelsRightBottom, {
  flipsInRTL: false
})
export const PanelsTopBottom = withRTL(Lucide.PanelsTopBottom, {
  flipsInRTL: false
})
export const PanelsTopLeft = withRTL(Lucide.PanelsTopLeft, {
  flipsInRTL: false
})
export const Paperclip = withRTL(Lucide.Paperclip, { flipsInRTL: false })
export const Parentheses = withRTL(Lucide.Parentheses, { flipsInRTL: false })
export const ParkingCircle = withRTL(Lucide.ParkingCircle, {
  flipsInRTL: false
})
export const ParkingCircleOff = withRTL(Lucide.ParkingCircleOff, {
  flipsInRTL: false
})
export const ParkingMeter = withRTL(Lucide.ParkingMeter, { flipsInRTL: false })
export const ParkingSquare = withRTL(Lucide.ParkingSquare, {
  flipsInRTL: false
})
export const ParkingSquareOff = withRTL(Lucide.ParkingSquareOff, {
  flipsInRTL: false
})
export const PartyPopper = withRTL(Lucide.PartyPopper, { flipsInRTL: false })
export const Pause = withRTL(Lucide.Pause, { flipsInRTL: false })
export const PauseCircle = withRTL(Lucide.PauseCircle, { flipsInRTL: false })
export const PauseOctagon = withRTL(Lucide.PauseOctagon, { flipsInRTL: false })
export const PawPrint = withRTL(Lucide.PawPrint, { flipsInRTL: false })
export const PcCase = withRTL(Lucide.PcCase, { flipsInRTL: false })
export const Pen = withRTL(Lucide.Pen, { flipsInRTL: false })
export const PenBox = withRTL(Lucide.PenBox, { flipsInRTL: false })
export const PenLine = withRTL(Lucide.PenLine, { flipsInRTL: false })
export const PenOff = withRTL(Lucide.PenOff, { flipsInRTL: false })
export const PenSquare = withRTL(Lucide.PenSquare, { flipsInRTL: false })
export const PenTool = withRTL(Lucide.PenTool, { flipsInRTL: false })
export const Pencil = withRTL(Lucide.Pencil, { flipsInRTL: false })
export const PencilLine = withRTL(Lucide.PencilLine, { flipsInRTL: false })
export const PencilOff = withRTL(Lucide.PencilOff, { flipsInRTL: false })
export const PencilRuler = withRTL(Lucide.PencilRuler, { flipsInRTL: false })
export const Pentagon = withRTL(Lucide.Pentagon, { flipsInRTL: false })
export const Percent = withRTL(Lucide.Percent, { flipsInRTL: false })
export const PercentCircle = withRTL(Lucide.PercentCircle, {
  flipsInRTL: false
})
export const PercentDiamond = withRTL(Lucide.PercentDiamond, {
  flipsInRTL: false
})
export const PercentSquare = withRTL(Lucide.PercentSquare, {
  flipsInRTL: false
})
export const PersonStanding = withRTL(Lucide.PersonStanding, {
  flipsInRTL: false
})
export const PhilippinePeso = withRTL(Lucide.PhilippinePeso, {
  flipsInRTL: false
})
export const Phone = withRTL(Lucide.Phone, { flipsInRTL: false })
export const PhoneCall = withRTL(Lucide.PhoneCall, { flipsInRTL: false })
export const PhoneForwarded = withRTL(Lucide.PhoneForwarded, {
  flipsInRTL: false
})
export const PhoneIncoming = withRTL(Lucide.PhoneIncoming, {
  flipsInRTL: false
})
export const PhoneMissed = withRTL(Lucide.PhoneMissed, { flipsInRTL: false })
export const PhoneOff = withRTL(Lucide.PhoneOff, { flipsInRTL: false })
export const PhoneOutgoing = withRTL(Lucide.PhoneOutgoing, {
  flipsInRTL: false
})
export const Pi = withRTL(Lucide.Pi, { flipsInRTL: false })
export const PiSquare = withRTL(Lucide.PiSquare, { flipsInRTL: false })
export const Piano = withRTL(Lucide.Piano, { flipsInRTL: false })
export const Pickaxe = withRTL(Lucide.Pickaxe, { flipsInRTL: false })
export const PictureInPicture = withRTL(Lucide.PictureInPicture, {
  flipsInRTL: false
})
export const PictureInPicture2 = withRTL(Lucide.PictureInPicture2, {
  flipsInRTL: false
})
export const PieChart = withRTL(Lucide.PieChart, { flipsInRTL: false })
export const PiggyBank = withRTL(Lucide.PiggyBank, { flipsInRTL: false })
export const Pilcrow = withRTL(Lucide.Pilcrow, { flipsInRTL: false })
export const PilcrowLeft = withRTL(Lucide.PilcrowLeft, { flipsInRTL: false })
export const PilcrowRight = withRTL(Lucide.PilcrowRight, { flipsInRTL: false })
export const PilcrowSquare = withRTL(Lucide.PilcrowSquare, {
  flipsInRTL: false
})
export const Pill = withRTL(Lucide.Pill, { flipsInRTL: false })
export const PillBottle = withRTL(Lucide.PillBottle, { flipsInRTL: false })
export const Pin = withRTL(Lucide.Pin, { flipsInRTL: false })
export const PinOff = withRTL(Lucide.PinOff, { flipsInRTL: false })
export const Pipette = withRTL(Lucide.Pipette, { flipsInRTL: false })
export const Pizza = withRTL(Lucide.Pizza, { flipsInRTL: false })
export const Plane = withRTL(Lucide.Plane, { flipsInRTL: false })
export const PlaneLanding = withRTL(Lucide.PlaneLanding, { flipsInRTL: false })
export const PlaneTakeoff = withRTL(Lucide.PlaneTakeoff, { flipsInRTL: false })
export const Play = withRTL(Lucide.Play, { flipsInRTL: false })
export const PlayCircle = withRTL(Lucide.PlayCircle, { flipsInRTL: false })
export const PlaySquare = withRTL(Lucide.PlaySquare, { flipsInRTL: false })
export const Plug = withRTL(Lucide.Plug, { flipsInRTL: false })
export const Plug2 = withRTL(Lucide.Plug2, { flipsInRTL: false })
export const PlugZap = withRTL(Lucide.PlugZap, { flipsInRTL: false })
export const PlugZap2 = withRTL(Lucide.PlugZap2, { flipsInRTL: false })
export const Plus = withRTL(Lucide.Plus, { flipsInRTL: false })
export const PlusCircle = withRTL(Lucide.PlusCircle, { flipsInRTL: false })
export const PlusSquare = withRTL(Lucide.PlusSquare, { flipsInRTL: false })
export const Pocket = withRTL(Lucide.Pocket, { flipsInRTL: false })
export const PocketKnife = withRTL(Lucide.PocketKnife, { flipsInRTL: false })
export const Podcast = withRTL(Lucide.Podcast, { flipsInRTL: false })
export const Pointer = withRTL(Lucide.Pointer, { flipsInRTL: false })
export const PointerOff = withRTL(Lucide.PointerOff, { flipsInRTL: false })
export const Popcorn = withRTL(Lucide.Popcorn, { flipsInRTL: false })
export const Popsicle = withRTL(Lucide.Popsicle, { flipsInRTL: false })
export const PoundSterling = withRTL(Lucide.PoundSterling, {
  flipsInRTL: false
})
export const Power = withRTL(Lucide.Power, { flipsInRTL: false })
export const PowerCircle = withRTL(Lucide.PowerCircle, { flipsInRTL: false })
export const PowerOff = withRTL(Lucide.PowerOff, { flipsInRTL: false })
export const PowerSquare = withRTL(Lucide.PowerSquare, { flipsInRTL: false })
export const Presentation = withRTL(Lucide.Presentation, { flipsInRTL: false })
export const Printer = withRTL(Lucide.Printer, { flipsInRTL: false })
export const PrinterCheck = withRTL(Lucide.PrinterCheck, { flipsInRTL: false })
export const Projector = withRTL(Lucide.Projector, { flipsInRTL: false })
export const Proportions = withRTL(Lucide.Proportions, { flipsInRTL: false })
export const Puzzle = withRTL(Lucide.Puzzle, { flipsInRTL: false })
export const Pyramid = withRTL(Lucide.Pyramid, { flipsInRTL: false })
export const QrCode = withRTL(Lucide.QrCode, { flipsInRTL: false })
export const Quote = withRTL(Lucide.Quote, { flipsInRTL: false })
export const Rabbit = withRTL(Lucide.Rabbit, { flipsInRTL: false })
export const Radar = withRTL(Lucide.Radar, { flipsInRTL: false })
export const Radiation = withRTL(Lucide.Radiation, { flipsInRTL: false })
export const Radical = withRTL(Lucide.Radical, { flipsInRTL: false })
export const Radio = withRTL(Lucide.Radio, { flipsInRTL: false })
export const RadioReceiver = withRTL(Lucide.RadioReceiver, {
  flipsInRTL: false
})
export const RadioTower = withRTL(Lucide.RadioTower, { flipsInRTL: false })
export const Radius = withRTL(Lucide.Radius, { flipsInRTL: false })
export const RailSymbol = withRTL(Lucide.RailSymbol, { flipsInRTL: false })
export const Rainbow = withRTL(Lucide.Rainbow, { flipsInRTL: false })
export const Rat = withRTL(Lucide.Rat, { flipsInRTL: false })
export const Ratio = withRTL(Lucide.Ratio, { flipsInRTL: false })
export const Receipt = withRTL(Lucide.Receipt, { flipsInRTL: false })
export const ReceiptCent = withRTL(Lucide.ReceiptCent, { flipsInRTL: false })
export const ReceiptEuro = withRTL(Lucide.ReceiptEuro, { flipsInRTL: false })
export const ReceiptIndianRupee = withRTL(Lucide.ReceiptIndianRupee, {
  flipsInRTL: false
})
export const ReceiptJapaneseYen = withRTL(Lucide.ReceiptJapaneseYen, {
  flipsInRTL: false
})
export const ReceiptPoundSterling = withRTL(Lucide.ReceiptPoundSterling, {
  flipsInRTL: false
})
export const ReceiptRussianRuble = withRTL(Lucide.ReceiptRussianRuble, {
  flipsInRTL: false
})
export const ReceiptSwissFranc = withRTL(Lucide.ReceiptSwissFranc, {
  flipsInRTL: false
})
export const ReceiptText = withRTL(Lucide.ReceiptText, { flipsInRTL: false })
export const RectangleEllipsis = withRTL(Lucide.RectangleEllipsis, {
  flipsInRTL: false
})
export const RectangleHorizontal = withRTL(Lucide.RectangleHorizontal, {
  flipsInRTL: false
})
export const RectangleVertical = withRTL(Lucide.RectangleVertical, {
  flipsInRTL: false
})
export const Recycle = withRTL(Lucide.Recycle, { flipsInRTL: false })
export const Redo = withRTL(Lucide.Redo, { flipsInRTL: false })
export const Redo2 = withRTL(Lucide.Redo2, { flipsInRTL: false })
export const RedoDot = withRTL(Lucide.RedoDot, { flipsInRTL: false })
export const RefreshCcw = withRTL(Lucide.RefreshCcw, { flipsInRTL: false })
export const RefreshCcwDot = withRTL(Lucide.RefreshCcwDot, {
  flipsInRTL: false
})
export const RefreshCw = withRTL(Lucide.RefreshCw, { flipsInRTL: false })
export const RefreshCwOff = withRTL(Lucide.RefreshCwOff, { flipsInRTL: false })
export const Refrigerator = withRTL(Lucide.Refrigerator, { flipsInRTL: false })
export const Regex = withRTL(Lucide.Regex, { flipsInRTL: false })
export const RemoveFormatting = withRTL(Lucide.RemoveFormatting, {
  flipsInRTL: false
})
export const Repeat = withRTL(Lucide.Repeat, { flipsInRTL: false })
export const Repeat1 = withRTL(Lucide.Repeat1, { flipsInRTL: false })
export const Repeat2 = withRTL(Lucide.Repeat2, { flipsInRTL: false })
export const Replace = withRTL(Lucide.Replace, { flipsInRTL: false })
export const ReplaceAll = withRTL(Lucide.ReplaceAll, { flipsInRTL: false })
export const Reply = withRTL(Lucide.Reply, { flipsInRTL: false })
export const ReplyAll = withRTL(Lucide.ReplyAll, { flipsInRTL: false })
export const Rewind = withRTL(Lucide.Rewind, { flipsInRTL: false })
export const Ribbon = withRTL(Lucide.Ribbon, { flipsInRTL: false })
export const Rocket = withRTL(Lucide.Rocket, { flipsInRTL: false })
export const RockingChair = withRTL(Lucide.RockingChair, { flipsInRTL: false })
export const RollerCoaster = withRTL(Lucide.RollerCoaster, {
  flipsInRTL: false
})
export const Rotate3D = withRTL(Lucide.Rotate3D, { flipsInRTL: false })
export const Rotate3d = withRTL(Lucide.Rotate3d, { flipsInRTL: false })
export const RotateCcw = withRTL(Lucide.RotateCcw, { flipsInRTL: false })
export const RotateCcwSquare = withRTL(Lucide.RotateCcwSquare, {
  flipsInRTL: false
})
export const RotateCw = withRTL(Lucide.RotateCw, { flipsInRTL: false })
export const RotateCwSquare = withRTL(Lucide.RotateCwSquare, {
  flipsInRTL: false
})
export const Route = withRTL(Lucide.Route, { flipsInRTL: false })
export const RouteOff = withRTL(Lucide.RouteOff, { flipsInRTL: false })
export const Router = withRTL(Lucide.Router, { flipsInRTL: false })
export const Rows = withRTL(Lucide.Rows, { flipsInRTL: false })
export const Rows2 = withRTL(Lucide.Rows2, { flipsInRTL: false })
export const Rows3 = withRTL(Lucide.Rows3, { flipsInRTL: false })
export const Rows4 = withRTL(Lucide.Rows4, { flipsInRTL: false })
export const Rss = withRTL(Lucide.Rss, { flipsInRTL: false })
export const Ruler = withRTL(Lucide.Ruler, { flipsInRTL: false })
export const RussianRuble = withRTL(Lucide.RussianRuble, { flipsInRTL: false })
export const Sailboat = withRTL(Lucide.Sailboat, { flipsInRTL: false })
export const Salad = withRTL(Lucide.Salad, { flipsInRTL: false })
export const Sandwich = withRTL(Lucide.Sandwich, { flipsInRTL: false })
export const Satellite = withRTL(Lucide.Satellite, { flipsInRTL: false })
export const SatelliteDish = withRTL(Lucide.SatelliteDish, {
  flipsInRTL: false
})
export const Save = withRTL(Lucide.Save, { flipsInRTL: false })
export const SaveAll = withRTL(Lucide.SaveAll, { flipsInRTL: false })
export const SaveOff = withRTL(Lucide.SaveOff, { flipsInRTL: false })
export const Scale = withRTL(Lucide.Scale, { flipsInRTL: false })
export const Scale3D = withRTL(Lucide.Scale3D, { flipsInRTL: false })
export const Scale3d = withRTL(Lucide.Scale3d, { flipsInRTL: false })
export const Scaling = withRTL(Lucide.Scaling, { flipsInRTL: false })
export const Scan = withRTL(Lucide.Scan, { flipsInRTL: false })
export const ScanBarcode = withRTL(Lucide.ScanBarcode, { flipsInRTL: false })
export const ScanEye = withRTL(Lucide.ScanEye, { flipsInRTL: false })
export const ScanFace = withRTL(Lucide.ScanFace, { flipsInRTL: false })
export const ScanLine = withRTL(Lucide.ScanLine, { flipsInRTL: false })
export const ScanQrCode = withRTL(Lucide.ScanQrCode, { flipsInRTL: false })
export const ScanSearch = withRTL(Lucide.ScanSearch, { flipsInRTL: false })
export const ScanText = withRTL(Lucide.ScanText, { flipsInRTL: false })
export const ScatterChart = withRTL(Lucide.ScatterChart, { flipsInRTL: false })
export const School = withRTL(Lucide.School, { flipsInRTL: false })
export const School2 = withRTL(Lucide.School2, { flipsInRTL: false })
export const Scissors = withRTL(Lucide.Scissors, { flipsInRTL: false })
export const ScissorsLineDashed = withRTL(Lucide.ScissorsLineDashed, {
  flipsInRTL: false
})
export const ScissorsSquare = withRTL(Lucide.ScissorsSquare, {
  flipsInRTL: false
})
export const ScissorsSquareDashedBottom = withRTL(
  Lucide.ScissorsSquareDashedBottom,
  { flipsInRTL: false }
)
export const ScreenShare = withRTL(Lucide.ScreenShare, { flipsInRTL: false })
export const ScreenShareOff = withRTL(Lucide.ScreenShareOff, {
  flipsInRTL: false
})
export const Scroll = withRTL(Lucide.Scroll, { flipsInRTL: false })
export const ScrollText = withRTL(Lucide.ScrollText, { flipsInRTL: false })
export const Search = withRTL(Lucide.Search, { flipsInRTL: false })
export const SearchCheck = withRTL(Lucide.SearchCheck, { flipsInRTL: false })
export const SearchCode = withRTL(Lucide.SearchCode, { flipsInRTL: false })
export const SearchSlash = withRTL(Lucide.SearchSlash, { flipsInRTL: false })
export const SearchX = withRTL(Lucide.SearchX, { flipsInRTL: false })
export const Section = withRTL(Lucide.Section, { flipsInRTL: false })
export const Send = withRTL(Lucide.Send, { flipsInRTL: false })
export const SendHorizonal = withRTL(Lucide.SendHorizonal, {
  flipsInRTL: false
})
export const SendHorizontal = withRTL(Lucide.SendHorizontal, {
  flipsInRTL: false
})
export const SendToBack = withRTL(Lucide.SendToBack, { flipsInRTL: false })
export const SeparatorHorizontal = withRTL(Lucide.SeparatorHorizontal, {
  flipsInRTL: false
})
export const SeparatorVertical = withRTL(Lucide.SeparatorVertical, {
  flipsInRTL: false
})
export const Server = withRTL(Lucide.Server, { flipsInRTL: false })
export const ServerCog = withRTL(Lucide.ServerCog, { flipsInRTL: false })
export const ServerCrash = withRTL(Lucide.ServerCrash, { flipsInRTL: false })
export const ServerOff = withRTL(Lucide.ServerOff, { flipsInRTL: false })
export const Settings = withRTL(Lucide.Settings, { flipsInRTL: false })
export const Settings2 = withRTL(Lucide.Settings2, { flipsInRTL: false })
export const Shapes = withRTL(Lucide.Shapes, { flipsInRTL: false })
export const Share = withRTL(Lucide.Share, { flipsInRTL: false })
export const Share2 = withRTL(Lucide.Share2, { flipsInRTL: false })
export const Sheet = withRTL(Lucide.Sheet, { flipsInRTL: false })
export const Shell = withRTL(Lucide.Shell, { flipsInRTL: false })
export const Shield = withRTL(Lucide.Shield, { flipsInRTL: false })
export const ShieldAlert = withRTL(Lucide.ShieldAlert, { flipsInRTL: false })
export const ShieldBan = withRTL(Lucide.ShieldBan, { flipsInRTL: false })
export const ShieldCheck = withRTL(Lucide.ShieldCheck, { flipsInRTL: false })
export const ShieldClose = withRTL(Lucide.ShieldClose, { flipsInRTL: false })
export const ShieldEllipsis = withRTL(Lucide.ShieldEllipsis, {
  flipsInRTL: false
})
export const ShieldHalf = withRTL(Lucide.ShieldHalf, { flipsInRTL: false })
export const ShieldMinus = withRTL(Lucide.ShieldMinus, { flipsInRTL: false })
export const ShieldOff = withRTL(Lucide.ShieldOff, { flipsInRTL: false })
export const ShieldPlus = withRTL(Lucide.ShieldPlus, { flipsInRTL: false })
export const ShieldQuestion = withRTL(Lucide.ShieldQuestion, {
  flipsInRTL: false
})
export const ShieldX = withRTL(Lucide.ShieldX, { flipsInRTL: false })
export const Ship = withRTL(Lucide.Ship, { flipsInRTL: false })
export const ShipWheel = withRTL(Lucide.ShipWheel, { flipsInRTL: false })
export const Shirt = withRTL(Lucide.Shirt, { flipsInRTL: false })
export const ShoppingBag = withRTL(Lucide.ShoppingBag, { flipsInRTL: false })
export const ShoppingBasket = withRTL(Lucide.ShoppingBasket, {
  flipsInRTL: false
})
export const ShoppingCart = withRTL(Lucide.ShoppingCart, { flipsInRTL: false })
export const Shovel = withRTL(Lucide.Shovel, { flipsInRTL: false })
export const ShowerHead = withRTL(Lucide.ShowerHead, { flipsInRTL: false })
export const Shrink = withRTL(Lucide.Shrink, { flipsInRTL: false })
export const Shrub = withRTL(Lucide.Shrub, { flipsInRTL: false })
export const Shuffle = withRTL(Lucide.Shuffle, { flipsInRTL: false })
export const Sidebar = withRTL(Lucide.Sidebar, { flipsInRTL: false })
export const SidebarClose = withRTL(Lucide.SidebarClose, { flipsInRTL: false })
export const SidebarOpen = withRTL(Lucide.SidebarOpen, { flipsInRTL: false })
export const Sigma = withRTL(Lucide.Sigma, { flipsInRTL: false })
export const SigmaSquare = withRTL(Lucide.SigmaSquare, { flipsInRTL: false })
export const Signal = withRTL(Lucide.Signal, { flipsInRTL: false })
export const SignalHigh = withRTL(Lucide.SignalHigh, { flipsInRTL: false })
export const SignalLow = withRTL(Lucide.SignalLow, { flipsInRTL: false })
export const SignalMedium = withRTL(Lucide.SignalMedium, { flipsInRTL: false })
export const SignalZero = withRTL(Lucide.SignalZero, { flipsInRTL: false })
export const Signature = withRTL(Lucide.Signature, { flipsInRTL: false })
export const Signpost = withRTL(Lucide.Signpost, { flipsInRTL: false })
export const SignpostBig = withRTL(Lucide.SignpostBig, { flipsInRTL: false })
export const Siren = withRTL(Lucide.Siren, { flipsInRTL: false })
export const SkipBack = withRTL(Lucide.SkipBack, { flipsInRTL: false })
export const SkipForward = withRTL(Lucide.SkipForward, { flipsInRTL: false })
export const Skull = withRTL(Lucide.Skull, { flipsInRTL: false })
export const Slack = withRTL(Lucide.Slack, { flipsInRTL: false })
export const Slash = withRTL(Lucide.Slash, { flipsInRTL: false })
export const SlashSquare = withRTL(Lucide.SlashSquare, { flipsInRTL: false })
export const Slice = withRTL(Lucide.Slice, { flipsInRTL: false })
export const Sliders = withRTL(Lucide.Sliders, { flipsInRTL: false })
export const SlidersHorizontal = withRTL(Lucide.SlidersHorizontal, {
  flipsInRTL: false
})
export const SlidersVertical = withRTL(Lucide.SlidersVertical, {
  flipsInRTL: false
})
export const Smartphone = withRTL(Lucide.Smartphone, { flipsInRTL: false })
export const SmartphoneCharging = withRTL(Lucide.SmartphoneCharging, {
  flipsInRTL: false
})
export const SmartphoneNfc = withRTL(Lucide.SmartphoneNfc, {
  flipsInRTL: false
})
export const Smile = withRTL(Lucide.Smile, { flipsInRTL: false })
export const SmilePlus = withRTL(Lucide.SmilePlus, { flipsInRTL: false })
export const Snail = withRTL(Lucide.Snail, { flipsInRTL: false })
export const Snowflake = withRTL(Lucide.Snowflake, { flipsInRTL: false })
export const Sofa = withRTL(Lucide.Sofa, { flipsInRTL: false })
export const SortAsc = withRTL(Lucide.SortAsc, { flipsInRTL: false })
export const SortDesc = withRTL(Lucide.SortDesc, { flipsInRTL: false })
export const Soup = withRTL(Lucide.Soup, { flipsInRTL: false })
export const Space = withRTL(Lucide.Space, { flipsInRTL: false })
export const Spade = withRTL(Lucide.Spade, { flipsInRTL: false })
export const Sparkle = withRTL(Lucide.Sparkle, { flipsInRTL: false })
export const Sparkles = withRTL(Lucide.Sparkles, { flipsInRTL: false })
export const Speaker = withRTL(Lucide.Speaker, { flipsInRTL: false })
export const Speech = withRTL(Lucide.Speech, { flipsInRTL: false })
export const SpellCheck = withRTL(Lucide.SpellCheck, { flipsInRTL: false })
export const SpellCheck2 = withRTL(Lucide.SpellCheck2, { flipsInRTL: false })
export const Spline = withRTL(Lucide.Spline, { flipsInRTL: false })
export const Split = withRTL(Lucide.Split, { flipsInRTL: false })
export const SplitSquareHorizontal = withRTL(Lucide.SplitSquareHorizontal, {
  flipsInRTL: false
})
export const SplitSquareVertical = withRTL(Lucide.SplitSquareVertical, {
  flipsInRTL: false
})
export const SprayCan = withRTL(Lucide.SprayCan, { flipsInRTL: false })
export const Sprout = withRTL(Lucide.Sprout, { flipsInRTL: false })
export const Square = withRTL(Lucide.Square, { flipsInRTL: false })
export const SquareActivity = withRTL(Lucide.SquareActivity, {
  flipsInRTL: false
})
export const SquareArrowDown = withRTL(Lucide.SquareArrowDown, {
  flipsInRTL: false
})
export const SquareArrowDownLeft = withRTL(Lucide.SquareArrowDownLeft, {
  flipsInRTL: false
})
export const SquareArrowDownRight = withRTL(Lucide.SquareArrowDownRight, {
  flipsInRTL: false
})
export const SquareArrowLeft = withRTL(Lucide.SquareArrowLeft, {
  flipsInRTL: false
})
export const SquareArrowOutDownLeft = withRTL(Lucide.SquareArrowOutDownLeft, {
  flipsInRTL: false
})
export const SquareArrowOutDownRight = withRTL(Lucide.SquareArrowOutDownRight, {
  flipsInRTL: false
})
export const SquareArrowOutUpLeft = withRTL(Lucide.SquareArrowOutUpLeft, {
  flipsInRTL: false
})
export const SquareArrowOutUpRight = withRTL(Lucide.SquareArrowOutUpRight, {
  flipsInRTL: false
})
export const SquareArrowRight = withRTL(Lucide.SquareArrowRight, {
  flipsInRTL: false
})
export const SquareArrowUp = withRTL(Lucide.SquareArrowUp, {
  flipsInRTL: false
})
export const SquareArrowUpLeft = withRTL(Lucide.SquareArrowUpLeft, {
  flipsInRTL: false
})
export const SquareArrowUpRight = withRTL(Lucide.SquareArrowUpRight, {
  flipsInRTL: false
})
export const SquareAsterisk = withRTL(Lucide.SquareAsterisk, {
  flipsInRTL: false
})
export const SquareBottomDashedScissors = withRTL(
  Lucide.SquareBottomDashedScissors,
  { flipsInRTL: false }
)
export const SquareChartGantt = withRTL(Lucide.SquareChartGantt, {
  flipsInRTL: false
})
export const SquareCheck = withRTL(Lucide.SquareCheck, { flipsInRTL: false })
export const SquareCheckBig = withRTL(Lucide.SquareCheckBig, {
  flipsInRTL: false
})
export const SquareChevronDown = withRTL(Lucide.SquareChevronDown, {
  flipsInRTL: false
})
export const SquareChevronLeft = withRTL(Lucide.SquareChevronLeft, {
  flipsInRTL: false
})
export const SquareChevronRight = withRTL(Lucide.SquareChevronRight, {
  flipsInRTL: false
})
export const SquareChevronUp = withRTL(Lucide.SquareChevronUp, {
  flipsInRTL: false
})
export const SquareCode = withRTL(Lucide.SquareCode, { flipsInRTL: false })
export const SquareDashed = withRTL(Lucide.SquareDashed, { flipsInRTL: false })
export const SquareDashedBottom = withRTL(Lucide.SquareDashedBottom, {
  flipsInRTL: false
})
export const SquareDashedBottomCode = withRTL(Lucide.SquareDashedBottomCode, {
  flipsInRTL: false
})
export const SquareDashedKanban = withRTL(Lucide.SquareDashedKanban, {
  flipsInRTL: false
})
export const SquareDashedMousePointer = withRTL(
  Lucide.SquareDashedMousePointer,
  { flipsInRTL: false }
)
export const SquareDivide = withRTL(Lucide.SquareDivide, { flipsInRTL: false })
export const SquareDot = withRTL(Lucide.SquareDot, { flipsInRTL: false })
export const SquareEqual = withRTL(Lucide.SquareEqual, { flipsInRTL: false })
export const SquareFunction = withRTL(Lucide.SquareFunction, {
  flipsInRTL: false
})
export const SquareGanttChart = withRTL(Lucide.SquareGanttChart, {
  flipsInRTL: false
})
export const SquareKanban = withRTL(Lucide.SquareKanban, { flipsInRTL: false })
export const SquareLibrary = withRTL(Lucide.SquareLibrary, {
  flipsInRTL: false
})
export const SquareM = withRTL(Lucide.SquareM, { flipsInRTL: false })
export const SquareMenu = withRTL(Lucide.SquareMenu, { flipsInRTL: false })
export const SquareMinus = withRTL(Lucide.SquareMinus, { flipsInRTL: false })
export const SquareMousePointer = withRTL(Lucide.SquareMousePointer, {
  flipsInRTL: false
})
export const SquareParking = withRTL(Lucide.SquareParking, {
  flipsInRTL: false
})
export const SquareParkingOff = withRTL(Lucide.SquareParkingOff, {
  flipsInRTL: false
})
export const SquarePen = withRTL(Lucide.SquarePen, { flipsInRTL: false })
export const SquarePercent = withRTL(Lucide.SquarePercent, {
  flipsInRTL: false
})
export const SquarePi = withRTL(Lucide.SquarePi, { flipsInRTL: false })
export const SquarePilcrow = withRTL(Lucide.SquarePilcrow, {
  flipsInRTL: false
})
export const SquarePlay = withRTL(Lucide.SquarePlay, { flipsInRTL: false })
export const SquarePlus = withRTL(Lucide.SquarePlus, { flipsInRTL: false })
export const SquarePower = withRTL(Lucide.SquarePower, { flipsInRTL: false })
export const SquareRadical = withRTL(Lucide.SquareRadical, {
  flipsInRTL: false
})
export const SquareScissors = withRTL(Lucide.SquareScissors, {
  flipsInRTL: false
})
export const SquareSigma = withRTL(Lucide.SquareSigma, { flipsInRTL: false })
export const SquareSlash = withRTL(Lucide.SquareSlash, { flipsInRTL: false })
export const SquareSplitHorizontal = withRTL(Lucide.SquareSplitHorizontal, {
  flipsInRTL: false
})
export const SquareSplitVertical = withRTL(Lucide.SquareSplitVertical, {
  flipsInRTL: false
})
export const SquareSquare = withRTL(Lucide.SquareSquare, { flipsInRTL: false })
export const SquareStack = withRTL(Lucide.SquareStack, { flipsInRTL: false })
export const SquareTerminal = withRTL(Lucide.SquareTerminal, {
  flipsInRTL: false
})
export const SquareUser = withRTL(Lucide.SquareUser, { flipsInRTL: false })
export const SquareUserRound = withRTL(Lucide.SquareUserRound, {
  flipsInRTL: false
})
export const SquareX = withRTL(Lucide.SquareX, { flipsInRTL: false })
export const Squircle = withRTL(Lucide.Squircle, { flipsInRTL: false })
export const Squirrel = withRTL(Lucide.Squirrel, { flipsInRTL: false })
export const Stamp = withRTL(Lucide.Stamp, { flipsInRTL: false })
export const Star = withRTL(Lucide.Star, { flipsInRTL: false })
export const StarHalf = withRTL(Lucide.StarHalf, { flipsInRTL: false })
export const StarOff = withRTL(Lucide.StarOff, { flipsInRTL: false })
export const Stars = withRTL(Lucide.Stars, { flipsInRTL: false })
export const StepBack = withRTL(Lucide.StepBack, { flipsInRTL: false })
export const StepForward = withRTL(Lucide.StepForward, { flipsInRTL: false })
export const Stethoscope = withRTL(Lucide.Stethoscope, { flipsInRTL: false })
export const Sticker = withRTL(Lucide.Sticker, { flipsInRTL: false })
export const StickyNote = withRTL(Lucide.StickyNote, { flipsInRTL: false })
export const StopCircle = withRTL(Lucide.StopCircle, { flipsInRTL: false })
export const Store = withRTL(Lucide.Store, { flipsInRTL: false })
export const StretchHorizontal = withRTL(Lucide.StretchHorizontal, {
  flipsInRTL: false
})
export const StretchVertical = withRTL(Lucide.StretchVertical, {
  flipsInRTL: false
})
export const Strikethrough = withRTL(Lucide.Strikethrough, {
  flipsInRTL: false
})
export const Subscript = withRTL(Lucide.Subscript, { flipsInRTL: false })
export const Subtitles = withRTL(Lucide.Subtitles, { flipsInRTL: false })
export const Sun = withRTL(Lucide.Sun, { flipsInRTL: false })
export const SunDim = withRTL(Lucide.SunDim, { flipsInRTL: false })
export const SunMedium = withRTL(Lucide.SunMedium, { flipsInRTL: false })
export const SunMoon = withRTL(Lucide.SunMoon, { flipsInRTL: false })
export const SunSnow = withRTL(Lucide.SunSnow, { flipsInRTL: false })
export const Sunrise = withRTL(Lucide.Sunrise, { flipsInRTL: false })
export const Sunset = withRTL(Lucide.Sunset, { flipsInRTL: false })
export const Superscript = withRTL(Lucide.Superscript, { flipsInRTL: false })
export const SwatchBook = withRTL(Lucide.SwatchBook, { flipsInRTL: false })
export const SwissFranc = withRTL(Lucide.SwissFranc, { flipsInRTL: false })
export const SwitchCamera = withRTL(Lucide.SwitchCamera, { flipsInRTL: false })
export const Sword = withRTL(Lucide.Sword, { flipsInRTL: false })
export const Swords = withRTL(Lucide.Swords, { flipsInRTL: false })
export const Syringe = withRTL(Lucide.Syringe, { flipsInRTL: false })
export const Table = withRTL(Lucide.Table, { flipsInRTL: false })
export const Table2 = withRTL(Lucide.Table2, { flipsInRTL: false })
export const TableCellsMerge = withRTL(Lucide.TableCellsMerge, {
  flipsInRTL: false
})
export const TableCellsSplit = withRTL(Lucide.TableCellsSplit, {
  flipsInRTL: false
})
export const TableColumnsSplit = withRTL(Lucide.TableColumnsSplit, {
  flipsInRTL: false
})
export const TableOfContents = withRTL(Lucide.TableOfContents, {
  flipsInRTL: false
})
export const TableProperties = withRTL(Lucide.TableProperties, {
  flipsInRTL: false
})
export const TableRowsSplit = withRTL(Lucide.TableRowsSplit, {
  flipsInRTL: false
})
export const Tablet = withRTL(Lucide.Tablet, { flipsInRTL: false })
export const TabletSmartphone = withRTL(Lucide.TabletSmartphone, {
  flipsInRTL: false
})
export const Tablets = withRTL(Lucide.Tablets, { flipsInRTL: false })
export const Tag = withRTL(Lucide.Tag, { flipsInRTL: false })
export const Tags = withRTL(Lucide.Tags, { flipsInRTL: false })
export const Tally1 = withRTL(Lucide.Tally1, { flipsInRTL: false })
export const Tally2 = withRTL(Lucide.Tally2, { flipsInRTL: false })
export const Tally3 = withRTL(Lucide.Tally3, { flipsInRTL: false })
export const Tally4 = withRTL(Lucide.Tally4, { flipsInRTL: false })
export const Tally5 = withRTL(Lucide.Tally5, { flipsInRTL: false })
export const Tangent = withRTL(Lucide.Tangent, { flipsInRTL: false })
export const Target = withRTL(Lucide.Target, { flipsInRTL: false })
export const Telescope = withRTL(Lucide.Telescope, { flipsInRTL: false })
export const Tent = withRTL(Lucide.Tent, { flipsInRTL: false })
export const TentTree = withRTL(Lucide.TentTree, { flipsInRTL: false })
export const Terminal = withRTL(Lucide.Terminal, { flipsInRTL: false })
export const TerminalSquare = withRTL(Lucide.TerminalSquare, {
  flipsInRTL: false
})
export const TestTube = withRTL(Lucide.TestTube, { flipsInRTL: false })
export const TestTube2 = withRTL(Lucide.TestTube2, { flipsInRTL: false })
export const TestTubeDiagonal = withRTL(Lucide.TestTubeDiagonal, {
  flipsInRTL: false
})
export const TestTubes = withRTL(Lucide.TestTubes, { flipsInRTL: false })
export const Text = withRTL(Lucide.Text, { flipsInRTL: false })
export const TextCursor = withRTL(Lucide.TextCursor, { flipsInRTL: false })
export const TextCursorInput = withRTL(Lucide.TextCursorInput, {
  flipsInRTL: false
})
export const TextQuote = withRTL(Lucide.TextQuote, { flipsInRTL: false })
export const TextSearch = withRTL(Lucide.TextSearch, { flipsInRTL: false })
export const TextSelect = withRTL(Lucide.TextSelect, { flipsInRTL: false })
export const TextSelection = withRTL(Lucide.TextSelection, {
  flipsInRTL: false
})
export const Theater = withRTL(Lucide.Theater, { flipsInRTL: false })
export const Thermometer = withRTL(Lucide.Thermometer, { flipsInRTL: false })
export const ThermometerSnowflake = withRTL(Lucide.ThermometerSnowflake, {
  flipsInRTL: false
})
export const ThermometerSun = withRTL(Lucide.ThermometerSun, {
  flipsInRTL: false
})
export const ThumbsDown = withRTL(Lucide.ThumbsDown, { flipsInRTL: false })
export const ThumbsUp = withRTL(Lucide.ThumbsUp, { flipsInRTL: false })
export const Ticket = withRTL(Lucide.Ticket, { flipsInRTL: false })
export const TicketCheck = withRTL(Lucide.TicketCheck, { flipsInRTL: false })
export const TicketMinus = withRTL(Lucide.TicketMinus, { flipsInRTL: false })
export const TicketPercent = withRTL(Lucide.TicketPercent, {
  flipsInRTL: false
})
export const TicketPlus = withRTL(Lucide.TicketPlus, { flipsInRTL: false })
export const TicketSlash = withRTL(Lucide.TicketSlash, { flipsInRTL: false })
export const TicketX = withRTL(Lucide.TicketX, { flipsInRTL: false })
export const Tickets = withRTL(Lucide.Tickets, { flipsInRTL: false })
export const TicketsPlane = withRTL(Lucide.TicketsPlane, { flipsInRTL: false })
export const Timer = withRTL(Lucide.Timer, { flipsInRTL: false })
export const TimerOff = withRTL(Lucide.TimerOff, { flipsInRTL: false })
export const TimerReset = withRTL(Lucide.TimerReset, { flipsInRTL: false })
export const ToggleLeft = withRTL(Lucide.ToggleLeft, { flipsInRTL: false })
export const ToggleRight = withRTL(Lucide.ToggleRight, { flipsInRTL: false })
export const Toilet = withRTL(Lucide.Toilet, { flipsInRTL: false })
export const Tornado = withRTL(Lucide.Tornado, { flipsInRTL: false })
export const Torus = withRTL(Lucide.Torus, { flipsInRTL: false })
export const Touchpad = withRTL(Lucide.Touchpad, { flipsInRTL: false })
export const TouchpadOff = withRTL(Lucide.TouchpadOff, { flipsInRTL: false })
export const TowerControl = withRTL(Lucide.TowerControl, { flipsInRTL: false })
export const ToyBrick = withRTL(Lucide.ToyBrick, { flipsInRTL: false })
export const Tractor = withRTL(Lucide.Tractor, { flipsInRTL: false })
export const TrafficCone = withRTL(Lucide.TrafficCone, { flipsInRTL: false })
export const Train = withRTL(Lucide.Train, { flipsInRTL: false })
export const TrainFront = withRTL(Lucide.TrainFront, { flipsInRTL: false })
export const TrainFrontTunnel = withRTL(Lucide.TrainFrontTunnel, {
  flipsInRTL: false
})
export const TrainTrack = withRTL(Lucide.TrainTrack, { flipsInRTL: false })
export const TramFront = withRTL(Lucide.TramFront, { flipsInRTL: false })
export const Trash = withRTL(Lucide.Trash, { flipsInRTL: false })
export const Trash2 = withRTL(Lucide.Trash2, { flipsInRTL: false })
export const TreeDeciduous = withRTL(Lucide.TreeDeciduous, {
  flipsInRTL: false
})
export const TreePalm = withRTL(Lucide.TreePalm, { flipsInRTL: false })
export const TreePine = withRTL(Lucide.TreePine, { flipsInRTL: false })
export const Trees = withRTL(Lucide.Trees, { flipsInRTL: false })
export const Trello = withRTL(Lucide.Trello, { flipsInRTL: false })
export const TrendingDown = withRTL(Lucide.TrendingDown, { flipsInRTL: false })
export const TrendingUp = withRTL(Lucide.TrendingUp, { flipsInRTL: false })
export const TrendingUpDown = withRTL(Lucide.TrendingUpDown, {
  flipsInRTL: false
})
export const Triangle = withRTL(Lucide.Triangle, { flipsInRTL: false })
export const TriangleAlert = withRTL(Lucide.TriangleAlert, {
  flipsInRTL: false
})
export const TriangleRight = withRTL(Lucide.TriangleRight, {
  flipsInRTL: false
})
export const Trophy = withRTL(Lucide.Trophy, { flipsInRTL: false })
export const Truck = withRTL(Lucide.Truck, { flipsInRTL: false })
export const Turtle = withRTL(Lucide.Turtle, { flipsInRTL: false })
export const Tv = withRTL(Lucide.Tv, { flipsInRTL: false })
export const Tv2 = withRTL(Lucide.Tv2, { flipsInRTL: false })
export const TvMinimal = withRTL(Lucide.TvMinimal, { flipsInRTL: false })
export const TvMinimalPlay = withRTL(Lucide.TvMinimalPlay, {
  flipsInRTL: false
})
export const Twitch = withRTL(Lucide.Twitch, { flipsInRTL: false })
export const Twitter = withRTL(Lucide.Twitter, { flipsInRTL: false })
export const Type = withRTL(Lucide.Type, { flipsInRTL: false })
export const TypeOutline = withRTL(Lucide.TypeOutline, { flipsInRTL: false })
export const Umbrella = withRTL(Lucide.Umbrella, { flipsInRTL: false })
export const UmbrellaOff = withRTL(Lucide.UmbrellaOff, { flipsInRTL: false })
export const Underline = withRTL(Lucide.Underline, { flipsInRTL: false })
export const Undo = withRTL(Lucide.Undo, { flipsInRTL: false })
export const Undo2 = withRTL(Lucide.Undo2, { flipsInRTL: false })
export const UndoDot = withRTL(Lucide.UndoDot, { flipsInRTL: false })
export const UnfoldHorizontal = withRTL(Lucide.UnfoldHorizontal, {
  flipsInRTL: false
})
export const UnfoldVertical = withRTL(Lucide.UnfoldVertical, {
  flipsInRTL: false
})
export const Ungroup = withRTL(Lucide.Ungroup, { flipsInRTL: false })
export const University = withRTL(Lucide.University, { flipsInRTL: false })
export const Unlink = withRTL(Lucide.Unlink, { flipsInRTL: false })
export const Unlink2 = withRTL(Lucide.Unlink2, { flipsInRTL: false })
export const Unlock = withRTL(Lucide.Unlock, { flipsInRTL: false })
export const UnlockKeyhole = withRTL(Lucide.UnlockKeyhole, {
  flipsInRTL: false
})
export const Unplug = withRTL(Lucide.Unplug, { flipsInRTL: false })
export const Upload = withRTL(Lucide.Upload, { flipsInRTL: false })
export const UploadCloud = withRTL(Lucide.UploadCloud, { flipsInRTL: false })
export const Usb = withRTL(Lucide.Usb, { flipsInRTL: false })
export const User = withRTL(Lucide.User, { flipsInRTL: false })
export const User2 = withRTL(Lucide.User2, { flipsInRTL: false })
export const UserCheck = withRTL(Lucide.UserCheck, { flipsInRTL: false })
export const UserCheck2 = withRTL(Lucide.UserCheck2, { flipsInRTL: false })
export const UserCircle = withRTL(Lucide.UserCircle, { flipsInRTL: false })
export const UserCircle2 = withRTL(Lucide.UserCircle2, { flipsInRTL: false })
export const UserCog = withRTL(Lucide.UserCog, { flipsInRTL: false })
export const UserCog2 = withRTL(Lucide.UserCog2, { flipsInRTL: false })
export const UserMinus = withRTL(Lucide.UserMinus, { flipsInRTL: false })
export const UserMinus2 = withRTL(Lucide.UserMinus2, { flipsInRTL: false })
export const UserPen = withRTL(Lucide.UserPen, { flipsInRTL: false })
export const UserPlus = withRTL(Lucide.UserPlus, { flipsInRTL: false })
export const UserPlus2 = withRTL(Lucide.UserPlus2, { flipsInRTL: false })
export const UserRound = withRTL(Lucide.UserRound, { flipsInRTL: false })
export const UserRoundCheck = withRTL(Lucide.UserRoundCheck, {
  flipsInRTL: false
})
export const UserRoundCog = withRTL(Lucide.UserRoundCog, { flipsInRTL: false })
export const UserRoundMinus = withRTL(Lucide.UserRoundMinus, {
  flipsInRTL: false
})
export const UserRoundPen = withRTL(Lucide.UserRoundPen, { flipsInRTL: false })
export const UserRoundPlus = withRTL(Lucide.UserRoundPlus, {
  flipsInRTL: false
})
export const UserRoundSearch = withRTL(Lucide.UserRoundSearch, {
  flipsInRTL: false
})
export const UserRoundX = withRTL(Lucide.UserRoundX, { flipsInRTL: false })
export const UserSearch = withRTL(Lucide.UserSearch, { flipsInRTL: false })
export const UserSquare = withRTL(Lucide.UserSquare, { flipsInRTL: false })
export const UserSquare2 = withRTL(Lucide.UserSquare2, { flipsInRTL: false })
export const UserX = withRTL(Lucide.UserX, { flipsInRTL: false })
export const UserX2 = withRTL(Lucide.UserX2, { flipsInRTL: false })
export const Users = withRTL(Lucide.Users, { flipsInRTL: false })
export const Users2 = withRTL(Lucide.Users2, { flipsInRTL: false })
export const UsersRound = withRTL(Lucide.UsersRound, { flipsInRTL: false })
export const Utensils = withRTL(Lucide.Utensils, { flipsInRTL: false })
export const UtensilsCrossed = withRTL(Lucide.UtensilsCrossed, {
  flipsInRTL: false
})
export const UtilityPole = withRTL(Lucide.UtilityPole, { flipsInRTL: false })
export const Variable = withRTL(Lucide.Variable, { flipsInRTL: false })
export const Vault = withRTL(Lucide.Vault, { flipsInRTL: false })
export const Vegan = withRTL(Lucide.Vegan, { flipsInRTL: false })
export const VenetianMask = withRTL(Lucide.VenetianMask, { flipsInRTL: false })
export const Verified = withRTL(Lucide.Verified, { flipsInRTL: false })
export const Vibrate = withRTL(Lucide.Vibrate, { flipsInRTL: false })
export const VibrateOff = withRTL(Lucide.VibrateOff, { flipsInRTL: false })
export const Video = withRTL(Lucide.Video, { flipsInRTL: false })
export const VideoOff = withRTL(Lucide.VideoOff, { flipsInRTL: false })
export const Videotape = withRTL(Lucide.Videotape, { flipsInRTL: false })
export const View = withRTL(Lucide.View, { flipsInRTL: false })
export const Voicemail = withRTL(Lucide.Voicemail, { flipsInRTL: false })
export const Volleyball = withRTL(Lucide.Volleyball, { flipsInRTL: false })
export const Volume = withRTL(Lucide.Volume, { flipsInRTL: false })
export const Volume1 = withRTL(Lucide.Volume1, { flipsInRTL: false })
export const Volume2 = withRTL(Lucide.Volume2, { flipsInRTL: false })
export const VolumeOff = withRTL(Lucide.VolumeOff, { flipsInRTL: false })
export const VolumeX = withRTL(Lucide.VolumeX, { flipsInRTL: false })
export const Vote = withRTL(Lucide.Vote, { flipsInRTL: false })
export const Wallet = withRTL(Lucide.Wallet, { flipsInRTL: false })
export const Wallet2 = withRTL(Lucide.Wallet2, { flipsInRTL: false })
export const WalletCards = withRTL(Lucide.WalletCards, { flipsInRTL: false })
export const WalletMinimal = withRTL(Lucide.WalletMinimal, {
  flipsInRTL: false
})
export const Wallpaper = withRTL(Lucide.Wallpaper, { flipsInRTL: false })
export const Wand = withRTL(Lucide.Wand, { flipsInRTL: false })
export const Wand2 = withRTL(Lucide.Wand2, { flipsInRTL: false })
export const WandSparkles = withRTL(Lucide.WandSparkles, { flipsInRTL: false })
export const Warehouse = withRTL(Lucide.Warehouse, { flipsInRTL: false })
export const WashingMachine = withRTL(Lucide.WashingMachine, {
  flipsInRTL: false
})
export const Watch = withRTL(Lucide.Watch, { flipsInRTL: false })
export const Waves = withRTL(Lucide.Waves, { flipsInRTL: false })
export const Waypoints = withRTL(Lucide.Waypoints, { flipsInRTL: false })
export const Webcam = withRTL(Lucide.Webcam, { flipsInRTL: false })
export const Webhook = withRTL(Lucide.Webhook, { flipsInRTL: false })
export const WebhookOff = withRTL(Lucide.WebhookOff, { flipsInRTL: false })
export const Weight = withRTL(Lucide.Weight, { flipsInRTL: false })
export const Wheat = withRTL(Lucide.Wheat, { flipsInRTL: false })
export const WheatOff = withRTL(Lucide.WheatOff, { flipsInRTL: false })
export const WholeWord = withRTL(Lucide.WholeWord, { flipsInRTL: false })
export const Wifi = withRTL(Lucide.Wifi, { flipsInRTL: false })
export const WifiHigh = withRTL(Lucide.WifiHigh, { flipsInRTL: false })
export const WifiLow = withRTL(Lucide.WifiLow, { flipsInRTL: false })
export const WifiOff = withRTL(Lucide.WifiOff, { flipsInRTL: false })
export const WifiZero = withRTL(Lucide.WifiZero, { flipsInRTL: false })
export const Wind = withRTL(Lucide.Wind, { flipsInRTL: false })
export const WindArrowDown = withRTL(Lucide.WindArrowDown, {
  flipsInRTL: false
})
export const Wine = withRTL(Lucide.Wine, { flipsInRTL: false })
export const WineOff = withRTL(Lucide.WineOff, { flipsInRTL: false })
export const Workflow = withRTL(Lucide.Workflow, { flipsInRTL: false })
export const Worm = withRTL(Lucide.Worm, { flipsInRTL: false })
export const WrapText = withRTL(Lucide.WrapText, { flipsInRTL: false })
export const Wrench = withRTL(Lucide.Wrench, { flipsInRTL: false })
export const X = withRTL(Lucide.X, { flipsInRTL: false })
export const XCircle = withRTL(Lucide.XCircle, { flipsInRTL: false })
export const XOctagon = withRTL(Lucide.XOctagon, { flipsInRTL: false })
export const XSquare = withRTL(Lucide.XSquare, { flipsInRTL: false })
export const Youtube = withRTL(Lucide.Youtube, { flipsInRTL: false })
export const Zap = withRTL(Lucide.Zap, { flipsInRTL: false })
export const ZapOff = withRTL(Lucide.ZapOff, { flipsInRTL: false })
export const ZoomIn = withRTL(Lucide.ZoomIn, { flipsInRTL: false })
export const ZoomOut = withRTL(Lucide.ZoomOut, { flipsInRTL: false })
