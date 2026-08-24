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
  TextInput as ti,
  NumberInput as ni,
  Checkbox as cb,
  RadioInput as ri,
  RadioInputGroup as rig,
  View as vw
} from '@instructure/ui/latest'

const TextInput = ti as any
const NumberInput = ni as any
const Checkbox = cb as any
const RadioInput = ri as any
const RadioInputGroup = rig as any
const View = vw as any

const error = [{ type: 'newError', text: 'Ez a mező kötelező' }]
const hint = [{ type: 'hint', text: 'Legalább 8 karakter' }]

export default function Scenario() {
  return (
    <View as="div" maxWidth="28rem">
      <div style={{ display: 'grid', gap: '1.5rem' }}>
        {/* No label, no messages: the grid the server renders and the grid the
            client renders are the same, so this row should stay still. */}
        <TextInput renderLabel="" display="inline-block" />

        {/* Visible label only. */}
        <TextInput renderLabel="Csak label" />

        {/* Label + message: the server-side grid has neither a `label` nor a
            `messages` row, so both get placed into implicit tracks and then
            move once the real styles arrive. */}
        <TextInput renderLabel="Label és hibaüzenet" messages={error} />
        <TextInput renderLabel="Label és hint" messages={hint} isRequired />
        <NumberInput renderLabel="NumberInput" messages={error} isRequired />

        {/* Inline layout puts the label in a column, which is a second grid
            template that also depends on the same mount-time flags. */}
        <TextInput
          renderLabel="Inline layout"
          layout="inline"
          messages={error}
        />

        <Checkbox label="Checkbox" messages={error} />

        <RadioInputGroup
          name="ssrLabRadio"
          description="RadioInputGroup"
          messages={error}
        >
          <RadioInput label="Első" value="1" />
          <RadioInput label="Második" value="2" />
        </RadioInputGroup>
      </div>
    </View>
  )
}
