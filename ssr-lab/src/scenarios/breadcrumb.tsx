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
  Breadcrumb as bc,
  View as vw,
  Text as tx
} from '@instructure/ui/latest'

const Breadcrumb = bc as any
const View = vw as any
const Text = tx as any

const crumbs = [
  'Kurzusok',
  'Magyar irodalom 204',
  'Modulok',
  'Második félév',
  'Aktuális lecke'
]

/**
 * Breadcrumb renders its links through TruncateList, which measures the
 * available width and collapses the middle crumbs into an ellipsis. Narrow
 * containers are where the server and client output differ the most.
 */
export default function Scenario() {
  return (
    <View as="div">
      {['48rem', '30rem', '20rem', '14rem'].map((width) => (
        <View as="div" key={width} margin="0 0 medium" maxWidth={width}>
          <Text size="small">{width}</Text>
          <Breadcrumb label="Itt vagy">
            {crumbs.map((crumb, index) =>
              index === crumbs.length - 1 ? (
                <Breadcrumb.Link key={crumb}>{crumb}</Breadcrumb.Link>
              ) : (
                <Breadcrumb.Link key={crumb} href="#">
                  {crumb}
                </Breadcrumb.Link>
              )
            )}
          </Breadcrumb>
        </View>
      ))}
    </View>
  )
}
