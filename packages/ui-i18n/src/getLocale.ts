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
import { useContext } from 'react'
import { ApplyLocaleContext } from '.'

// TODO: this is a better replacement for `ui-i18n/src/Locale.ts` which should be deleted in the future
export function getLocale(defaultLocale = 'en-US') {
  const localeContext = useContext(ApplyLocaleContext)
  if (localeContext.locale) {
    return localeContext.locale
  }

  if (typeof navigator !== 'undefined') {
    if (navigator.languages && navigator.languages.length) {
      return navigator.languages[0]
    }
    if (navigator.language) {
      return navigator.language
    }
  }
  try {
    // This is generally reliable if Intl is supported
    return new Intl.DateTimeFormat().resolvedOptions().locale
  } catch (e) {
    console.warn(
      'Intl.DateTimeFormat().resolvedOptions().locale failed, using fallback.'
    )
    // Fall through to default
  }
  return defaultLocale
}
