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
  Drilldown as dd,
  Button as btn,
  Pill as pl,
  IconCheckSolid as ics,
  IconArrowOpenEndSolid as iaoes
} from '@instructure/ui/latest'

const Drilldown = dd as any
const Button = btn as any
const Pill = pl as any
const IconCheckSolid = ics as any
const IconArrowOpenEndSolid = iaoes as any

export default function DrilldownPage() {
  return (
    <main className="flex gap-8 p-8 flex-col items-start axe-test">
      {/* Basic multi-page example (from README "Pages") */}
      <Drilldown rootPageId="root" width="20rem" maxHeight="30rem">
        <Drilldown.Page id="root" renderTitle="Groceries">
          <Drilldown.Option id="Produce" subPageId="Produce">
            Produce
          </Drilldown.Option>
          <Drilldown.Option id="GrainsAndBread" subPageId="GrainsAndBread">
            Grains and Bread
          </Drilldown.Option>
        </Drilldown.Page>

        <Drilldown.Page id="Produce" renderTitle="Produce">
          <Drilldown.Option id="Fruits" subPageId="Fruits">
            Fruits
          </Drilldown.Option>
          <Drilldown.Option id="Vegetables" subPageId="Vegetables">
            Vegetables
          </Drilldown.Option>
        </Drilldown.Page>

        <Drilldown.Page id="GrainsAndBread" renderTitle="Grains and Bread">
          {['Pasta', 'Rice', 'Bread', 'Flour', 'Cereal', 'Oats'].map((item) => (
            <Drilldown.Option id={`G_${item}`} key={item}>
              {item}
            </Drilldown.Option>
          ))}
        </Drilldown.Page>

        <Drilldown.Page id="Fruits" renderTitle="Fruits">
          {[
            'Apple',
            'Orange',
            'Cherry',
            'Grapefruit',
            'Mango',
            'Banana',
            'Strawberry'
          ].map((item) => (
            <Drilldown.Option id={`F_${item}`} key={item}>
              {item}
            </Drilldown.Option>
          ))}
        </Drilldown.Page>

        <Drilldown.Page id="Vegetables" renderTitle="Vegetables">
          {[
            'Tomato',
            'Cucumber',
            'Eggplant',
            'Lettuce',
            'Garlic',
            'Onion',
            'Corn',
            'Carrot',
            'Bell pepper'
          ].map((item) => (
            <Drilldown.Option id={`V_${item}`} key={item}>
              {item}
            </Drilldown.Option>
          ))}
        </Drilldown.Page>
      </Drilldown>

      <div style={{ height: '20rem' }}>
        <Drilldown
          rootPageId="rootRadio"
          width="20rem"
          maxHeight="30rem"
          show={true}
          trigger={<Button>Open Drilldown</Button>}
          shouldHideOnSelect={false}
        >
          <Drilldown.Page id="rootRadio" renderTitle="Select one option">
            <Drilldown.Option id="plus0" value="234" defaultSelected>
              Some option
            </Drilldown.Option>
            <Drilldown.Group
              disabled={true}
              id="agreement"
              renderGroupTitle="Disabled group"
              selectableType="single"
            >
              <Drilldown.Option id="plus2" value="+2" defaultSelected>
                Strongly agree
              </Drilldown.Option>
              <Drilldown.Option id="plus1" value="+1">
                Somewhat agree
              </Drilldown.Option>
              <Drilldown.Option id="zero" value="0">
                Neither agree nor disagree
              </Drilldown.Option>
              <Drilldown.Option id="minus1" value="-1">
                Somewhat disagree
              </Drilldown.Option>
              <Drilldown.Option id="minus2" value="-2">
                Strongly disagree
              </Drilldown.Option>
            </Drilldown.Group>
          </Drilldown.Page>
        </Drilldown>
      </div>
      {/* Icons, Pills, descriptions and page navigation */}
      <Drilldown rootPageId="rootRich" width="22rem" maxHeight="30rem">
        <Drilldown.Page id="rootRich" renderTitle="Products">
          <Drilldown.Option
            id="optAnalytics"
            subPageId="analytics"
            renderBeforeLabel={IconCheckSolid}
            description="Insights and reports"
            afterLabelContentVAlign="center"
            renderLabelInfo={() => <Pill margin="0 0 0 x-small">Beta</Pill>}
          >
            Analytics
          </Drilldown.Option>

          <Drilldown.Option
            id="optBilling"
            subPageId="billing"
            renderBeforeLabel={<IconCheckSolid style={{ opacity: 0 }} />}
            description="Manage subscription and invoices"
            afterLabelContentVAlign="center"
            renderLabelInfo={() => (
              <Pill color="danger" margin="0 0 0 x-small">
                New
              </Pill>
            )}
          >
            Billing
          </Drilldown.Option>

          <Drilldown.Option
            id="optIntegrations"
            subPageId="integrations"
            renderBeforeLabel={IconCheckSolid}
            description="Connect external services"
          >
            Integrations
          </Drilldown.Option>
        </Drilldown.Page>

        <Drilldown.Page id="analytics" renderTitle="Analytics">
          <Drilldown.Option id="anaOverview">
            Overview dashboard
          </Drilldown.Option>
          <Drilldown.Option id="anaReports">Scheduled reports</Drilldown.Option>
          <Drilldown.Option
            id="anaBack"
            onOptionClick={(_e: any, { goToPreviousPage }: any) => {
              goToPreviousPage()
            }}
          >
            Back to Products
          </Drilldown.Option>
        </Drilldown.Page>

        <Drilldown.Page id="billing" renderTitle="Billing">
          <Drilldown.Option id="bilPlans">Plans</Drilldown.Option>
          <Drilldown.Option id="bilInvoices">Invoices</Drilldown.Option>
          <Drilldown.Option
            id="bilBack"
            onOptionClick={(_e: any, { goToPreviousPage }: any) => {
              goToPreviousPage()
            }}
          >
            Back to Products
          </Drilldown.Option>
        </Drilldown.Page>

        <Drilldown.Page id="integrations" renderTitle="Integrations">
          <Drilldown.Option id="intSlack">Slack</Drilldown.Option>
          <Drilldown.Option id="intZapier">Zapier</Drilldown.Option>
          <Drilldown.Option
            id="intBack"
            onOptionClick={(_e: any, { goToPreviousPage }: any) => {
              goToPreviousPage()
            }}
          >
            Back to Products
          </Drilldown.Option>
        </Drilldown.Page>
      </Drilldown>
    </main>
  )
}
