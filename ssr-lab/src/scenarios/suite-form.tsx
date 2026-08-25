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
  View as vw,
  Heading as hd,
  Text as tx,
  TextInput as ti,
  TextArea as ta,
  NumberInput as ni,
  SimpleSelect as ss,
  Checkbox as cb,
  CheckboxGroup as cg,
  RadioInput as ri,
  RadioInputGroup as rig,
  FileDrop as fd,
  Button as btn,
  Alert as al
} from '@instructure/ui/latest'

const View = vw as any
const Heading = hd as any
const Text = tx as any
const TextInput = ti as any
const TextArea = ta as any
const NumberInput = ni as any
const SimpleSelect = ss as any
const Checkbox = cb as any
const CheckboxGroup = cg as any
const RadioInput = ri as any
const RadioInputGroup = rig as any
const FileDrop = fd as any
const Button = btn as any
const Alert = al as any

const error = [{ type: 'newError', text: 'This field is required' }]

/**
 * A realistic "create assignment" form. Individually each field shifts by a few
 * pixels; the point of this scenario is that on a real page those add up, and
 * every field pushes the ones below it.
 */
export default function Scenario() {
  return (
    <View as="div" maxWidth="38rem">
      <Heading level="h1">Create assignment</Heading>

      <View as="div" margin="medium 0">
        <Alert variant="info" margin="0">
          Save the assignment once the form is filled in.
        </Alert>
      </View>

      <div style={{ display: 'grid', gap: '1.25rem' }}>
        <TextInput renderLabel="Assignment name" isRequired messages={error} />

        <TextArea
          label="Description"
          defaultValue={'First line\nSecond line'}
        />

        <NumberInput renderLabel="Points" isRequired />

        <SimpleSelect renderLabel="Assignment type">
          <SimpleSelect.Option id="essay" value="essay">
            Essay
          </SimpleSelect.Option>
          <SimpleSelect.Option id="quiz" value="quiz">
            Quiz
          </SimpleSelect.Option>
          <SimpleSelect.Option id="upload" value="upload">
            Upload
          </SimpleSelect.Option>
        </SimpleSelect>

        <RadioInputGroup
          name="ssrLabVisibility"
          description="Visibility"
          messages={error}
        >
          <RadioInput label="Everyone" value="all" />
          <RadioInput label="Sections only" value="sections" />
        </RadioInputGroup>

        <CheckboxGroup name="ssrLabOptions" description="Options">
          <Checkbox label="Group assignment" value="group" />
          <Checkbox label="Peer review" value="peer" />
          <Checkbox label="Anonymous grading" value="anonymous" />
        </CheckboxGroup>

        <FileDrop
          renderLabel={
            <View as="div" padding="medium" background="secondary">
              <Text>Upload an attachment</Text>
            </View>
          }
        />
      </div>

      <View as="div" margin="large 0 0">
        <Button color="primary" margin="0 small 0 0">
          Save
        </Button>
        <Button>Cancel</Button>
      </View>
    </View>
  )
}
