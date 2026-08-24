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
  DrawerLayout as dl,
  View as vw,
  Heading as hd,
  Text as tx,
  Button as btn,
  CloseButton as cbtn
} from '@instructure/ui/latest'

const DrawerLayout = dl as any
const View = vw as any
const Heading = hd as any
const Text = tx as any
const Button = btn as any
const CloseButton = cbtn as any

export default function Scenario() {
  const [open, setOpen] = useState(true)

  return (
    <View height="26rem" as="div" background="primary" position="relative">
      {/* DrawerLayout measures its content width to decide whether the tray sits
          beside the content or overlays it. On the server there is nothing to
          measure, so the decision is made again after mount. */}
      <DrawerLayout>
        <DrawerLayout.Tray
          id="ssrLabTray"
          open={open}
          placement="start"
          label="Példa fiók"
          onDismiss={() => setOpen(false)}
        >
          <View as="div" maxWidth="16rem" padding="medium">
            <CloseButton
              placement="end"
              offset="small"
              onClick={() => setOpen(false)}
              screenReaderLabel="Bezárás"
            />
            <Text as="div" size="small">
              A fiók tartalma.
            </Text>
          </View>
        </DrawerLayout.Tray>

        <DrawerLayout.Content label="Példa tartalom">
          <View as="div" padding="large" background="primary">
            <Heading>Egyszerű drawer layout</Heading>
            <Button
              margin="medium 0"
              size="small"
              onClick={() => setOpen(true)}
            >
              Fiók kinyitása
            </Button>
            <Text as="p" size="small">
              A tartalom szélessége dönti el, hogy a fiók átfedi-e ezt a
              területet vagy mellé kerül.
            </Text>
          </View>
        </DrawerLayout.Content>
      </DrawerLayout>
    </View>
  )
}
