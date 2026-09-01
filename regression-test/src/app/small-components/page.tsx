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
  Text as tx,
  TimeSelect as ts,
  IconMessageLine,
  IconClockLine,
  IconEndLine,
  IconCheckLine
} from '@instructure/ui/latest'

const Metric = mc as any
const MetricGroup = mcg as any
const Pill = pl as any
const Tag = tg as any
const TimeSelect = ts as any
const Text = tx as any

export default function SmallComponentsPage() {
  return (
    <main id="main" className="flex gap-8 p-8 flex-col items-start axe-test">
      <div>
        <Text>Metric:</Text>
      </div>
      <Metric textAlign="start" renderLabel="Grade" renderValue="80%" />
      <Metric renderLabel="Grade" renderValue="80%" />
      <Metric textAlign="end" renderLabel="Grade" renderValue="80%" />
      <div>
        <Text>MetricGroup:</Text>
      </div>
      <MetricGroup>
        <Metric renderLabel="Grade" renderValue="80%" />
        <Metric renderLabel="Late" renderValue="4" />
        <Metric renderLabel="Missing" renderValue="2" />
      </MetricGroup>
      <div>
        <Text>Pill:</Text>
      </div>
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
      <div>
        <Text>Tag (static / leading icon in 3 sizes):</Text>
      </div>
      <div>
        <Tag text="Static" margin="0 xx-small 0 0" />
        <Tag
          text="Small"
          size="small"
          renderIcon={<IconCheckLine />}
          margin="0 xx-small 0 0"
        />
        <Tag
          text="Medium"
          renderIcon={<IconCheckLine />}
          margin="0 xx-small 0 0"
        />
        <Tag
          text="Large"
          size="large"
          renderIcon={<IconCheckLine />}
          margin="0 xx-small 0 0"
        />
      </div>
      <div>
        <Text>Tag (clickable button / dismissible):</Text>
      </div>
      <div>
        <Tag
          text="Clickable"
          onClick={function () {}}
          margin="0 xx-small 0 0"
        />
        <Tag
          text="Clickable with icon"
          renderIcon={<IconCheckLine />}
          onClick={function () {}}
          margin="0 xx-small 0 0"
        />
        <Tag
          text="Dismissible"
          renderDismissButtonLabel="Remove Dismissible"
          onDismiss={function () {}}
          margin="0 xx-small 0 0"
        />
        <Tag
          text="Dismissible with icon"
          renderIcon={<IconCheckLine />}
          renderDismissButtonLabel="Remove Dismissible with icon"
          onDismiss={function () {}}
          margin="0 xx-small 0 0"
        />
      </div>
      <div>
        <Text>Tag (link / disabled):</Text>
      </div>
      <div>
        <Tag text="Link" href="#" margin="0 xx-small 0 0" />
        <Tag
          text="Link with icon"
          href="#"
          renderIcon={<IconCheckLine />}
          margin="0 xx-small 0 0"
        />
        <Tag
          text="Link dismissible"
          href="#"
          renderIcon={<IconCheckLine />}
          renderDismissButtonLabel="Remove Link dismissible"
          onDismiss={function () {}}
          margin="0 xx-small 0 0"
        />
        <Tag
          text="Disabled link dismissible"
          href="#"
          disabled
          renderIcon={<IconCheckLine />}
          renderDismissButtonLabel="Remove Disabled link dismissible"
          onDismiss={function () {}}
          margin="0 xx-small 0 0"
        />
      </div>
      <div>
        <Text>TimeSelect:</Text>
      </div>
      <TimeSelect
        renderLabel="Choose a time"
        onChange={(e: any, { value }: any) => 3}
        onHideOptions={(e: any) => 5}
        defaultValue="2025-08-18T09:30:00+00:00"
      />
      <div>
        <Text>Text:</Text>
      </div>
      <div>
        <Text variant="descriptionPage"> descriptionPage </Text>
        <Text variant="descriptionSection"> descriptionSection </Text>
        <Text variant="content"> content </Text>
        <Text variant="contentImportant"> contentImportant </Text>
      </div>
      <div>
        <span style={{ color: '#AA0000' }}>
          <Text color="inherit"> inherit </Text>
        </span>
        <Text variant="contentQuote"> contentQuote </Text>
        <Text variant="contentSmall"> contentSmall </Text>
        <Text variant="legend"> legend </Text>
      </div>
      <div>
        <Text color="primary">I&#39;m primary text</Text>
        <Text color="secondary">I&#39;m secondary text</Text>
        <Text color="brand">I&#39;m brand text</Text>
        <Text color="success">I&#39;m success text</Text>
      </div>
      <div>
        <Text color="warning">I&#39;m warning text</Text>
        <Text color="danger">I&#39;m danger text</Text>
        <Text color="ai-highlight">I&#39;m an ai-highlight text</Text>
        <Text color="primary-inverse">I&#39;m primary-inverse text</Text>
      </div>
      <div>
        <Text color="secondary-inverse">I&#39;m secondary-inverse text</Text>
        <Text color="primary-on">I&#39;m primary-on text</Text>
        <Text color="secondary-on">I&#39;m secondary-on text</Text>
      </div>
      <div>
        <Text size="descriptionPage">descriptionPage</Text>
        <br />
        <Text size="descriptionSection">descriptionSection</Text>
        <br />
        <Text size="content">content</Text>
        <br />
        <Text size="contentSmall">contentSmall</Text>
        <br />
        <Text size="legend">legend</Text>
      </div>
    </main>
  )
}
