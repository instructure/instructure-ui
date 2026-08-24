'use client'

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

import { useState } from 'react'
import {
  SideNavBar as snb,
  ScreenReaderContent as src,
  IconDashboardLine as idl,
  IconCoursesLine as icl,
  IconCalendarMonthLine as icml,
  IconInboxLine as iil,
  IconQuestionLine as iql
} from '@instructure/ui/latest'

const SideNavBar = snb as any
const ScreenReaderContent = src as any
const IconDashboardLine = idl as any
const IconCoursesLine = icl as any
const IconCalendarMonthLine = icml as any
const IconInboxLine = iil as any
const IconQuestionLine = iql as any

export default function Scenario() {
  const [minimized, setMinimized] = useState(false)

  return (
    <div style={{ height: '34rem', width: '12rem' }}>
      <SideNavBar
        label="Fő navigáció"
        toggleLabel={{
          expandedLabel: 'Navigáció összecsukása',
          minimizedLabel: 'Navigáció kinyitása'
        }}
        onMinimized={(_event: unknown, isMinimized: boolean) =>
          setMinimized(isMinimized)
        }
      >
        <SideNavBar.Item
          icon={<IconDashboardLine size={minimized ? 'small' : 'medium'} />}
          label={<ScreenReaderContent>Kezdőlap</ScreenReaderContent>}
          href="#"
        />
        <SideNavBar.Item
          selected
          icon={<IconCoursesLine />}
          label="Kurzusok"
          href="#"
        />
        <SideNavBar.Item
          icon={<IconCalendarMonthLine />}
          label="Naptár"
          href="#"
        />
        <SideNavBar.Item icon={<IconInboxLine />} label="Bejövő" href="#" />
        <SideNavBar.Item icon={<IconQuestionLine />} label="Súgó" href="#" />
      </SideNavBar>
    </div>
  )
}
