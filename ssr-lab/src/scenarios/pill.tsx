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

import {
  Pill as pl,
  Tag as tg,
  View as vw,
  Text as tx,
  IconCheckLine as icl,
  IconClockLine as iclk
} from '@instructure/ui/latest'

const Pill = pl as any
const Tag = tg as any
const View = vw as any
const Text = tx as any
const IconCheckLine = icl as any
const IconClockLine = iclk as any

export default function Scenario() {
  return (
    <View as="div" maxWidth="26rem">
      <Text size="small">Short labels</Text>
      <View as="div" margin="x-small 0 medium">
        <Pill margin="x-small">Excused</Pill>
        <Pill color="info" margin="x-small">
          Draft
        </Pill>
        <Pill renderIcon={<IconCheckLine />} color="success" margin="x-small">
          Checked in
        </Pill>
        <Pill renderIcon={<IconClockLine />} color="warning" margin="x-small">
          Late
        </Pill>
      </View>

      {/* Pill measures its own text to decide whether it needs truncating, so a
          label that is too long for the container is the interesting case. */}
      <Text size="small">Long labels in a narrow container</Text>
      <View as="div" margin="x-small 0 medium" maxWidth="12rem">
        <Pill margin="x-small">
          This pill label is deliberately far too long
        </Pill>
        <Pill color="danger" margin="x-small" statusLabel="Status">
          Another long label to force truncation
        </Pill>
      </View>

      <Text size="small">Tag</Text>
      <View as="div" margin="x-small 0 0">
        <Tag text="Static" margin="0 xx-small 0 0" />
        <Tag text="Medium" margin="0 xx-small 0 0" />
        <Tag text="Large" size="large" margin="0 xx-small 0 0" />
      </View>
    </View>
  )
}
