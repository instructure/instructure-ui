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
import React from 'react'
import IconTrash from '@instructure/ui-icons/lib/Solid/IconTrash'
import ScreenReaderContent from '@instructure/ui-a11y/lib/components/ScreenReaderContent'
import Link from '../index'

export const basicLink = () => {
  return (
    <Link href="http://instructure.design">Delete</Link>
  )
}

export const iconOnly = () => {
  return (
    <Link href="http://instructure.design" icon={IconTrash}>
      <ScreenReaderContent>Delete</ScreenReaderContent>
    </Link>
  )
}

export const iconBeforeText = () => {
  return (
    <Link href="http://instructure.design" icon={IconTrash}>
      Delete
    </Link>
  )
}

export const iconAfterText = () => {
  return (
    <Link href="http://instructure.design" icon={IconTrash} iconPlacement="end">
      Delete
    </Link>
  )
}

export const ellipsisOverflow = () => {
  return (
    <div>
      <p>
        <Link href="http://instructure.design" ellipsis>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat
        </Link>
      </p>
      <p>
        <Link href="http://instructure.design" ellipsis icon={IconTrash}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat
        </Link>
      </p>
    </div>
  )
}
