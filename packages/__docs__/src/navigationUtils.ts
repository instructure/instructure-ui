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

const MINOR_VERSION_REGEX = /^v\d+_\d+$/

type ParsedUrl = {
  prPrefix: string
  minorVersion: string | null
  page: string
  sectionId: string | undefined
}

function parseCurrentUrl(): ParsedUrl {
  const { pathname, hash } = window.location
  const cleanPath = pathname.replace(/^\/+|\/+$/g, '')
  const segments = cleanPath.split('/').filter(Boolean)

  let prPrefix = ''
  let idx = 0

  // Detect PR preview prefix: /pr-preview/pr-123
  if (
    segments.length >= 2 &&
    segments[0] === 'pr-preview' &&
    segments[1].startsWith('pr-')
  ) {
    prPrefix = `/${segments[0]}/${segments[1]}`
    idx = 2
  }

  // Detect /latest/ prefix
  if (idx === 0 && segments[idx] === 'latest') {
    prPrefix = '/latest'
    idx++
  }

  // Detect minor version prefix: /v11_7
  let minorVersion: string | null = null
  if (idx < segments.length && MINOR_VERSION_REGEX.test(segments[idx])) {
    minorVersion = segments[idx]
    idx++
  }

  // Remaining segment is the page
  const page = idx < segments.length ? segments[idx] : 'index'

  // Section ID from hash
  let sectionId: string | undefined
  if (hash) {
    sectionId = decodeURI(hash.replace(/^#+/, ''))
  }

  return { prPrefix, minorVersion, page, sectionId }
}

type BuildUrlOptions = {
  minorVersion?: string | null
  sectionId?: string
}

function buildUrl(targetPage: string, options?: BuildUrlOptions): string {
  const { prPrefix } = parseCurrentUrl()
  const minorVersion =
    options?.minorVersion !== undefined
      ? options.minorVersion
      : parseCurrentUrl().minorVersion

  let url = prPrefix

  if (minorVersion) {
    url += `/${minorVersion}`
  }

  if (!targetPage || targetPage === 'index') {
    url += '/'
  } else {
    url += `/${targetPage}`
  }

  if (options?.sectionId) {
    url += `#${options.sectionId}`
  }

  return url || '/'
}

function navigateTo(targetPage: string, options?: BuildUrlOptions): void {
  const url = buildUrl(targetPage, options)
  window.history.pushState({}, '', url)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

function navigateToVersion(version: string | null): void {
  const { page, sectionId } = parseCurrentUrl()
  const url = buildUrl(page, { minorVersion: version, sectionId })
  window.history.pushState({}, '', url)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

/**
 * Returns the base path prefix for fetching static assets.
 * On PR previews this is e.g. `/pr-preview/pr-2425`, otherwise empty string.
 */
function getAssetBasePath(): string {
  return parseCurrentUrl().prPrefix
}

export {
  parseCurrentUrl,
  buildUrl,
  navigateTo,
  navigateToVersion,
  getAssetBasePath,
  MINOR_VERSION_REGEX
}
export type { ParsedUrl }
