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

const error = [{ type: 'newError', text: 'Ez a mező kötelező' }]

/**
 * A realistic "create assignment" form. Individually each field shifts by a few
 * pixels; the point of this scenario is that on a real page those add up, and
 * every field pushes the ones below it.
 */
export default function Scenario() {
  return (
    <View as="div" maxWidth="38rem">
      <Heading level="h1">Feladat létrehozása</Heading>

      <View as="div" margin="medium 0">
        <Alert variant="info" margin="0">
          Az űrlap kitöltése után mentsd el a feladatot.
        </Alert>
      </View>

      <div style={{ display: 'grid', gap: '1.25rem' }}>
        <TextInput renderLabel="Feladat neve" isRequired messages={error} />

        <TextArea label="Leírás" defaultValue={'Első sor\nMásodik sor'} />

        <NumberInput renderLabel="Pontszám" isRequired />

        <SimpleSelect renderLabel="Feladat típusa">
          <SimpleSelect.Option id="essay" value="essay">
            Esszé
          </SimpleSelect.Option>
          <SimpleSelect.Option id="quiz" value="quiz">
            Kvíz
          </SimpleSelect.Option>
          <SimpleSelect.Option id="upload" value="upload">
            Feltöltés
          </SimpleSelect.Option>
        </SimpleSelect>

        <RadioInputGroup
          name="ssrLabVisibility"
          description="Láthatóság"
          messages={error}
        >
          <RadioInput label="Mindenki" value="all" />
          <RadioInput label="Csak szekciók" value="sections" />
        </RadioInputGroup>

        <CheckboxGroup name="ssrLabOptions" description="Beállítások">
          <Checkbox label="Csoportos feladat" value="group" />
          <Checkbox label="Peer review" value="peer" />
          <Checkbox label="Anonim értékelés" value="anonymous" />
        </CheckboxGroup>

        <FileDrop
          renderLabel={
            <View as="div" padding="medium" background="secondary">
              <Text>Csatolmány feltöltése</Text>
            </View>
          }
        />
      </div>

      <View as="div" margin="large 0 0">
        <Button color="primary" margin="0 small 0 0">
          Mentés
        </Button>
        <Button>Mégse</Button>
      </View>
    </View>
  )
}
