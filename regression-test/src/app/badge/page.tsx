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
  Badge as b,
  Button as btn,
  IconButton as icb,
  IconUserSolid as ius,
  Flex as flx,
  View as vw,
  AccessibleContent as ac,
  ScreenReaderContent as src
} from '@instructure/ui'

// alias to avoid TS/SSR friction like other pages
const Badge = b as any
const Button = btn as any
const IconButton = icb as any
const IconUserSolid = ius as any
const Flex = flx as any
const View = vw as any
const AccessibleContent = ac as any
const ScreenReaderContent = src as any

export default function BadgePage() {
  return (
    <main className="flex gap-8 p-8 flex-col items-start axe-test">
      {/* Making badges accessible */}
      <div>
        <Badge
          count={99}
          margin="0 medium 0 0"
          formatOutput={function (formattedCount: any) {
            return (
              <AccessibleContent
                alt={`You have ${formattedCount} new edits to review`}
              >
                {formattedCount}
              </AccessibleContent>
            )
          }}
        >
          <IconButton
            renderIcon={IconUserSolid}
            screenReaderLabel="Edits"
            withBorder={false}
            withBackground={false}
          />
        </Badge>
        <Badge
          type="notification"
          formatOutput={function () {
            return (
              <ScreenReaderContent>
                You have new edits to review
              </ScreenReaderContent>
            )
          }}
        >
          <IconButton
            renderIcon={IconUserSolid}
            screenReaderLabel="Edits"
            withBorder={false}
            withBackground={false}
          />
        </Badge>
      </div>

      {/* Limit the count */}
      <div>
        <Badge count={105} countUntil={100} margin="0 medium 0 0">
          <Button>Inbox</Button>
        </Badge>
        <Badge
          count={250}
          countUntil={100}
          formatOverflowText={(_count: number, countUntil: number) =>
            `more than ${countUntil}`
          }
        >
          <Button>Assignments</Button>
        </Badge>
      </div>

      {/* Standalone, notification and color variants */}
      <div>
        <Flex padding="small" display="inline-flex" alignItems="center">
          <Badge standalone count={6} margin="0 small 0 0" />
          <Badge
            type="notification"
            standalone
            formatOutput={function () {
              return (
                <ScreenReaderContent>
                  This is a notification
                </ScreenReaderContent>
              )
            }}
          />
        </Flex>
      </div>
      <div>
        <Flex padding="small" display="inline-flex" alignItems="center">
          <Badge standalone variant="success" count={12} margin="0 small 0 0" />
          <Badge
            variant="success"
            type="notification"
            standalone
            formatOutput={function () {
              return (
                <ScreenReaderContent>
                  This is a success notification
                </ScreenReaderContent>
              )
            }}
          />
        </Flex>
      </div>
      <div>
        <Flex padding="small" display="inline-flex" alignItems="center">
          <Badge
            standalone
            variant="danger"
            count={18}
            countUntil={10}
            margin="0 small 0 0"
          />
          <Badge
            variant="danger"
            type="notification"
            standalone
            formatOutput={function () {
              return (
                <ScreenReaderContent>
                  This is a danger notification
                </ScreenReaderContent>
              )
            }}
          />
        </Flex>
      </div>
      <div>
        <View display="inline-flex" background="primary-inverse">
          <Flex
            padding="small"
            display="inline-flex"
            alignItems="center"
            background="primary-inverse"
          >
            <Badge
              standalone
              variant="inverse"
              count={8}
              margin="0 small 0 0"
            />
            <Badge
              variant="inverse"
              type="notification"
              standalone
              formatOutput={function () {
                return (
                  <ScreenReaderContent>
                    This is a danger notification
                  </ScreenReaderContent>
                )
              }}
            />
          </Flex>
        </View>
      </div>

      {/* Placement */}
      <div>
        <View as="div" margin="0 0 medium">
          <Badge count={21} margin="0 large 0 0" placement="top start">
            <IconButton
              renderIcon={IconUserSolid}
              screenReaderLabel="Edit page"
              withBorder={false}
              withBackground={false}
            />
          </Badge>
          <Badge count={21} margin="0 large 0 0">
            <IconButton
              renderIcon={IconUserSolid}
              screenReaderLabel="Edit page"
              withBorder={false}
              withBackground={false}
            />
          </Badge>
          <Badge count={21} margin="0 large 0 0" placement="bottom start">
            <IconButton
              renderIcon={IconUserSolid}
              screenReaderLabel="Edit page"
              withBorder={false}
              withBackground={false}
            />
          </Badge>
          <Badge count={21} margin="0 large 0 0" placement="bottom end">
            <IconButton
              renderIcon={IconUserSolid}
              screenReaderLabel="Edit page"
              withBorder={false}
              withBackground={false}
            />
          </Badge>
          <Badge count={21} margin="0 large 0 0" placement="start center">
            <IconButton
              renderIcon={IconUserSolid}
              screenReaderLabel="Edit page"
              withBorder={false}
              withBackground={false}
            />
          </Badge>
          <Badge count={21} placement="end center">
            <IconButton
              renderIcon={IconUserSolid}
              screenReaderLabel="Edit page"
              withBorder={false}
              withBackground={false}
            />
          </Badge>
        </View>
      </div>
    </main>
  )
}
