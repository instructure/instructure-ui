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

import { ensureSingleChild } from '@instructure/ui-react-utils'
import { ApplyLocaleContext } from './ApplyLocaleContext'

type OwnProps = {
  locale?: string
  timezone?: string
  children?: React.ReactNode
}

// @ts-expect-error ts-migrate(2456) FIXME: Type alias 'Props' circularly references itself.
type Props = OwnProps & typeof ApplyLocale.defaultProps

/**
---
category: components/utilities
---
**/
// @ts-expect-error ts-migrate(7022) FIXME: 'ApplyLocale' implicitly has type 'any' because it... Remove this comment to see the full error message
export const ApplyLocale = ({ children, locale, timezone }: Props) => {
  return (
    <ApplyLocaleContext.Provider value={{ locale, timezone }}>
      {ensureSingleChild(children)}
    </ApplyLocaleContext.Provider>
  )
}

ApplyLocale.defaultProps = {
  locale: undefined,
  timezone: undefined,
  children: undefined
}

export default ApplyLocale
