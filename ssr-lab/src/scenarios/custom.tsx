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

/* ==========================================================================
 * SCRATCH PAGE — edit this file freely.
 *
 * This is the one scenario that is already wired up: it shows in the list as
 * "Custom scratch page" and is served at /s/custom. Put whatever combination
 * you want to measure into the return statement below; you never have to touch
 * `loaders.ts` or `meta.ts`.
 *
 * Workflow:
 *   npm run dev     while you are writing the markup — hot reloads, but the
 *                   numbers are not trustworthy (dev bundles are much larger
 *                   and slower than production ones)
 *   npm run build && npm start    to measure — rerun after every edit
 *
 * Import anything from '@instructure/ui/latest' (v2). The `as any` casts are
 * only there because the app runs React 19 while the library types target 18.
 *
 * The measurement panel reports one CLS and one height delta for everything
 * inside this file, so keep a page focused if you want to attribute a shift to
 * a particular component. To compare several components side by side without
 * editing anything, tick them on the index page instead — that builds a
 * /mix?c=a&c=b URL out of the existing scenarios.
 * ========================================================================== */

import {
  View as vw,
  Heading as hd,
  Text as tx,
  TextInput as ti,
  Button as btn
} from '@instructure/ui/latest'

const View = vw as any
const Heading = hd as any
const Text = tx as any
const TextInput = ti as any
const Button = btn as any

export default function Scenario() {
  return (
    <View as="div" maxWidth="40rem">
      <Heading level="h1">Custom scratch page</Heading>

      <Text as="p">
        Replace everything below with the components you want to measure.
      </Text>

      <View as="div" margin="medium 0">
        <TextInput
          renderLabel="A field to get started"
          messages={[{ type: 'newError', text: 'An error message' }]}
        />
      </View>

      <Button color="primary">A button</Button>
    </View>
  )
}
