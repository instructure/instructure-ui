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

import { Flex } from '@instructure/ui/latest'

describe('<Flex.Item/>', () => {
  it('visually reorders items when order prop is set', () => {
    cy.mount(
      <Flex data-testid="flex-container-default">
        <Flex.Item data-testid="item-1-default">FOO</Flex.Item>
        <Flex.Item data-testid="item-2-default">BOO</Flex.Item>
      </Flex>
    )

    cy.get('[data-testid="flex-container-default"]').then(($container) => {
      const firstItem = $container.find('[data-testid="item-1-default"]')[0]
      const secondItem = $container.find('[data-testid="item-2-default"]')[0]
      const firstRect = firstItem.getBoundingClientRect()
      const secondRect = secondItem.getBoundingClientRect()

      expect(firstRect.left).to.be.lessThan(secondRect.left)
    })

    // set order prop
    cy.mount(
      <Flex data-testid="flex-container-ordered">
        <Flex.Item order={2} data-testid="item-1-ordered">
          FOO
        </Flex.Item>
        <Flex.Item order={1} data-testid="item-2-ordered">
          BOO
        </Flex.Item>
      </Flex>
    )

    cy.get('[data-testid="flex-container-ordered"]').then(($container) => {
      const firstItem = $container.find('[data-testid="item-1-ordered"]')[0]
      const secondItem = $container.find('[data-testid="item-2-ordered"]')[0]
      const firstRect = firstItem.getBoundingClientRect()
      const secondRect = secondItem.getBoundingClientRect()

      expect(secondRect.left).to.be.lessThan(firstRect.left)
    })
  })
})
