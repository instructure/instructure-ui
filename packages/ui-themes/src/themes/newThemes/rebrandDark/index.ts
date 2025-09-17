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

import primitives, { type Primitives } from './primitives'
import semantics, { type Semantics } from './semantics'
import metric, { type Metric } from './components/metric'
import avatar, { type Avatar } from './components/avatar'
import breadcrumb, { type Breadcrumb } from './components/breadcrumb'
import pill, { type Pill } from './components/pill'
import formFieldMessage, {
  type FormFieldMessage
} from './components/formFieldMessage'
import formFieldLabel, {
  type FormFieldLabel
} from './components/formFieldLabel'
import spinner, { type Spinner } from './components/spinner'

export type Theme = {
  primitives: Primitives
  semantics: Semantics
  components: {
    Metric: Metric
    Avatar: Avatar
    Breadcrumb: Breadcrumb
    Pill: Pill
    FormFieldMessage: FormFieldMessage
    FormFieldLabel: FormFieldLabel
    Spinner: Spinner
  }
}

const theme = {
  primitives,
  semantics,
  components: {
    Metric: metric,
    Avatar: avatar,
    Breadcrumb: breadcrumb,
    Pill: pill,
    FormFieldMessage: formFieldMessage,
    FormFieldLabel: formFieldLabel,
    Spinner: spinner
  }
}

export default theme
