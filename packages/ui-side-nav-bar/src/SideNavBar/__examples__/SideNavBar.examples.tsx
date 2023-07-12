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

import {
  IconAdminLine,
  IconDashboardLine,
  IconAssignmentLine,
  IconAnnouncementLine
} from '@instructure/ui-icons'

import { SideNavBarItem } from '../index'

import type { StoryConfig } from '@instructure/ui-test-utils'
import type { SideNavBarProps } from '../props'

export default {
  getComponentProps: () => {
    return {
      label: "I'm the main nav",
      toggleLabel: {
        expandedLabel: 'Minimize SideNavBar',
        minimizedLabel: 'Expand SideNavBar'
      },
      children: [
        <SideNavBarItem
          key="1"
          icon={<IconAdminLine />}
          label="Admin"
          href="#"
          themeOverride={{
            backgroundColor: 'red',
            hoverBackgroundColor: 'blue'
          }}
        />,
        <SideNavBarItem
          key="2"
          icon={<IconDashboardLine />}
          label="Dashboard"
          href="#"
          selected={true}
        />,
        <SideNavBarItem
          key="3"
          icon={<IconAssignmentLine />}
          label="Courses"
          href="#"
        />,
        <SideNavBarItem
          key="4"
          icon={<IconAnnouncementLine />}
          label="Supercalifragilistic"
          href="#"
        />
      ]
    }
  },
  getExampleProps: () => {
    return {
      style: {
        width: '5.25rem',
        height: '30rem'
      }
    }
  }
} as StoryConfig<SideNavBarProps>
