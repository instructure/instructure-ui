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
  Metric as mc,
  MetricGroup as mcg,
  Pill as pl,
  Tag as tg,
  TimeSelect as ts,
  IconMessageLine,
  IconClockLine,
  IconEndLine,
  IconCheckLine,
  AccessibleContent
} from '@instructure/ui'

const Metric = mc as any
const MetricGroup = mcg as any
const Pill = pl as any
const Tag = tg as any
const TimeSelect = ts as any

export default function MetricPage() {
  return (
    <main id="main" className="flex gap-8 p-8 flex-col items-start axe-test">
      <div>Metric:</div>
      <Metric textAlign="start" renderLabel="Grade" renderValue="80%" />
      <Metric renderLabel="Grade" renderValue="80%" />
      <Metric textAlign="end" renderLabel="Grade" renderValue="80%" />
      <div>MetricGroup:</div>
      <MetricGroup>
        <Metric renderLabel="Grade" renderValue="80%" />
        <Metric renderLabel="Late" renderValue="4" />
        <Metric renderLabel="Missing" renderValue="2" />
      </MetricGroup>
      <div>Pill:</div>
      <div>
        <Pill margin="x-small">Excused</Pill>
        <Pill statusLabel="Status" color="info" margin="x-small">
          Draft
        </Pill>
        <Pill
          statusLabel="Status"
          renderIcon={<IconCheckLine />}
          color="success"
          margin="x-small"
        >
          Checked In
        </Pill>
        <Pill renderIcon={<IconEndLine />} color="danger" margin="x-small">
          Missing
        </Pill>
        <Pill renderIcon={<IconClockLine />} color="warning" margin="x-small">
          Late
        </Pill>
        <Pill renderIcon={<IconMessageLine />} color="alert" margin="x-small">
          Notification
        </Pill>
      </div>
      <div>Tag:</div>
      <div>
        <Tag text="Static" margin="0 xx-small 0 0" />
        <Tag
          text={
            <AccessibleContent alt="Remove dismissible tag">
              Dismissible tag
            </AccessibleContent>
          }
          dismissible
          margin="0 xx-small 0 0"
          onClick={function () {}}
        />
        <Tag text="Small" size="small" margin="0 xx-small 0 0" />
        <Tag text="Medium" margin="0 xx-small 0 0" />
        <Tag
          disabled
          dismissible
          text="Large"
          size="large"
          margin="0 xx-small 0 0"
          onClick={function () {}}
        />
      </div>
      <p>
        This is an
        <Tag
          dismissible
          onClick={() => alert('Tag dismissed')}
          size="large"
          text={
            <AccessibleContent alt="Remove 'inline'">inline</AccessibleContent>
          }
          variant="inline"
        />
        tag.
      </p>
      <div>TimeSelect:</div>
      <TimeSelect
        renderLabel="Choose a time"
        onChange={(e: any, { value }: any) => 3}
        onHideOptions={(e: any) => 5}
        defaultValue="2025-08-18T09:30:00+00:00"
      />
    </main>
  )
}
