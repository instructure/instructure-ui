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

import { Drilldown as dd, View as vw } from '@instructure/ui/latest'

const Drilldown = dd as any
const View = vw as any

const fruits = ['Alma', 'Narancs', 'Cseresznye', 'Mangó', 'Banán', 'Szamóca']
const vegetables = ['Paradicsom', 'Uborka', 'Répa', 'Spenót', 'Brokkoli']

export default function Scenario() {
  return (
    <View as="div" maxWidth="30rem">
      <Drilldown rootPageId="root" width="20rem" maxHeight="26rem">
        <Drilldown.Page id="root" renderTitle="Élelmiszer">
          <Drilldown.Option id="fruits" subPageId="fruits">
            Gyümölcsök
          </Drilldown.Option>
          <Drilldown.Option id="vegetables" subPageId="vegetables">
            Zöldségek
          </Drilldown.Option>
          <Drilldown.Option id="other">Egyéb</Drilldown.Option>
        </Drilldown.Page>

        <Drilldown.Page id="fruits" renderTitle="Gyümölcsök">
          {fruits.map((fruit) => (
            <Drilldown.Option id={`fruit-${fruit}`} key={fruit}>
              {fruit}
            </Drilldown.Option>
          ))}
        </Drilldown.Page>

        <Drilldown.Page id="vegetables" renderTitle="Zöldségek">
          {vegetables.map((vegetable) => (
            <Drilldown.Option id={`vegetable-${vegetable}`} key={vegetable}>
              {vegetable}
            </Drilldown.Option>
          ))}
        </Drilldown.Page>
      </Drilldown>
    </View>
  )
}
