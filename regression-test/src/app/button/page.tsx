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
import { Button } from 'instructure-ui/ui-buttons/es/index'
import { IconAddLine } from 'instructure-ui/ui-icons/es/index'

export default function ButtonPage() {
  const colors = [
    'primary',
    'primary-inverse',
    'secondary',
    'success',
    'danger'
  ]
  const sizes = ['small', 'medium', 'large']
  return (
    <main className="flex gap-8 p-8 flex-col items-start axe-test">
      <Button>Button</Button>
      {colors.map((color) => (
        <Button key={'color' + color} color={color}>
          {color} color
        </Button>
      ))}
      {sizes.map((size) => (
        <Button key={'size' + size} size={size}>
          {size} size
        </Button>
      ))}
      <Button renderIcon={IconAddLine}>Icon Button</Button>
      <Button disabled>Disabled Button</Button>
    </main>
  )
}
