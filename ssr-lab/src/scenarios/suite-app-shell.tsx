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
  Breadcrumb as bc,
  Tabs as tbs,
  Button as btn,
  TopNavBar as tnb,
  TruncateText as tt
} from '@instructure/ui/latest'

const View = vw as any
const Heading = hd as any
const Text = tx as any
const Breadcrumb = bc as any
const Tabs = tbs as any
const Button = btn as any
const TopNavBar = tnb as any
const TruncateText = tt as any

const pages = ['Overview', 'Assignments', 'People', 'Grades']

const paragraph =
  'A typical body paragraph. The navigation and the tabs around it all rely on measurement or on styles computed after mount, so this text is what moves during hydration.'

/**
 * The closest thing here to a real page: navigation on top, breadcrumb, tabs and
 * body text. Everything above the content participates in a shift, so the body
 * text ends up carrying the largest CLS contribution.
 */
export default function Scenario() {
  return (
    <View as="div">
      <TopNavBar>
        {() => (
          <TopNavBar.Layout
            navLabel="Application navigation"
            smallViewportConfig={{
              dropdownMenuToggleButtonLabel: 'Toggle menu',
              dropdownMenuLabel: 'Main menu'
            }}
            renderBrand={
              <TopNavBar.Brand screenReaderLabel="Brand name" href="#" />
            }
            renderMenuItems={
              <TopNavBar.MenuItems
                listLabel="Page navigation"
                currentPageId="shell-0"
                renderHiddenItemsMenuTriggerLabel={(count: number) =>
                  `${count} more`
                }
                renderHiddenItemsMenuTriggerAriaLabel={(count: number) =>
                  `${count} more menu items`
                }
              >
                {pages.map((page, index) => (
                  <TopNavBar.Item
                    id={`shell-${index}`}
                    key={`shell-${index}`}
                    href="#"
                  >
                    {page}
                  </TopNavBar.Item>
                ))}
              </TopNavBar.MenuItems>
            }
          />
        )}
      </TopNavBar>

      <View as="div" padding="medium" maxWidth="52rem">
        <Breadcrumb label="You are here">
          <Breadcrumb.Link href="#">Courses</Breadcrumb.Link>
          <Breadcrumb.Link href="#">English literature 204</Breadcrumb.Link>
          <Breadcrumb.Link>Assignments</Breadcrumb.Link>
        </Breadcrumb>

        <Heading level="h1" margin="small 0 medium">
          Assignments
        </Heading>

        <Tabs>
          {pages.map((page, index) => (
            <Tabs.Panel key={page} id={`tab-${index}`} renderTitle={page}>
              <Text as="p">
                <TruncateText maxLines={3}>{paragraph}</TruncateText>
              </Text>
              <Text as="p">{paragraph}</Text>
              <Button color="primary">New assignment</Button>
            </Tabs.Panel>
          ))}
        </Tabs>
      </View>
    </View>
  )
}
