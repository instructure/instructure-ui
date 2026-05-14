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

// Webpack-injected; equals output.publicPath.
// Examples: '/', '/latest/', '/pr-preview/pr-123/'.
declare const __webpack_public_path__: string

const MINOR_VERSION_REGEX = /^v\d+_\d+$/

type ParsedUrl = {
  minorVersion: string | null
  page: string
  sectionId: string | undefined
}

/**
 * Returns webpack's `output.publicPath` with the trailing slash stripped.
 * Always begins with `/`, or is empty for a root deploy.
 */
function getDeployBase(): string {
  if (typeof __webpack_public_path__ === 'string' && __webpack_public_path__) {
    return __webpack_public_path__.replace(/\/+$/, '')
  }
  return ''
}

function parseCurrentUrl(): ParsedUrl {
  const { pathname, hash } = window.location

  const deployBase = getDeployBase()
  let rest = pathname
  if (
    deployBase &&
    (rest === deployBase || rest.startsWith(deployBase + '/'))
  ) {
    rest = rest.slice(deployBase.length)
  }

  const cleanPath = rest.replace(/^\/+|\/+$/g, '')
  const segments = cleanPath.split('/').filter(Boolean)

  let idx = 0

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

  return { minorVersion, page, sectionId }
}

type BuildUrlOptions = {
  minorVersion?: string | null
  sectionId?: string
}

function buildUrl(targetPage: string, options?: BuildUrlOptions): string {
  const parsed = parseCurrentUrl()
  const minorVersion =
    options?.minorVersion !== undefined
      ? options.minorVersion
      : parsed.minorVersion

  let url = getDeployBase()

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

export {
  parseCurrentUrl,
  buildUrl,
  navigateTo,
  navigateToVersion,
  getDeployBase,
  MINOR_VERSION_REGEX
}
export type { ParsedUrl }
