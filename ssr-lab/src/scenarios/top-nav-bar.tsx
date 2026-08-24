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

import { TopNavBar as tnb, View as vw } from '@instructure/ui/latest'

const TopNavBar = tnb as any
const View = vw as any

const pages = ['Áttekintés', 'Feladatok', 'Emberek', 'Jegyek', 'Beállítások']

export default function Scenario() {
  return (
    <View as="div" maxWidth="60rem">
      {/* TopNavBar decides between its desktop and small-viewport layout by
          measuring the viewport with Responsive, which needs a DOM. The server
          therefore renders one layout and the client may swap to the other. */}
      <TopNavBar>
        {() => (
          <TopNavBar.Layout
            navLabel="Példa navigáció"
            smallViewportConfig={{
              dropdownMenuToggleButtonLabel: 'Menü',
              dropdownMenuLabel: 'Főmenü'
            }}
            renderBrand={
              <TopNavBar.Brand screenReaderLabel="Márkanév" href="#" />
            }
            renderMenuItems={
              <TopNavBar.MenuItems
                listLabel="Oldal navigáció"
                currentPageId="page-0"
                renderHiddenItemsMenuTriggerLabel={(count: number) =>
                  `${count} további`
                }
                renderHiddenItemsMenuTriggerAriaLabel={(count: number) =>
                  `${count} további menüelem`
                }
              >
                {pages.map((page, index) => (
                  <TopNavBar.Item
                    id={`page-${index}`}
                    key={`page-${index}`}
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

      {/* A deliberately small breakpoint forces the truncating code path, where
          the component has to measure how many items fit. */}
      <View as="div" margin="large 0 0">
        <TopNavBar breakpoint="10rem">
          {() => (
            <TopNavBar.Layout
              navLabel="Szűk navigáció"
              smallViewportConfig={{
                dropdownMenuToggleButtonLabel: 'Menü',
                dropdownMenuLabel: 'Főmenü'
              }}
              renderMenuItems={
                <TopNavBar.MenuItems
                  listLabel="Oldal navigáció"
                  currentPageId="narrow-0"
                  renderHiddenItemsMenuTriggerLabel={(count: number) =>
                    `${count} további`
                  }
                  renderHiddenItemsMenuTriggerAriaLabel={(count: number) =>
                    `${count} további menüelem`
                  }
                >
                  {pages.map((page, index) => (
                    <TopNavBar.Item
                      id={`narrow-${index}`}
                      key={`narrow-${index}`}
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
      </View>
    </View>
  )
}
