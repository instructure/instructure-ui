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

/**
 * Fetches version data from versions.json
 * Returns null or an object:
 * {
 *   latestVersion: string, (e.g.: 'v8')
 *   previousVersions: string[] (e.g.: ['v7', 'v6'])
 * }
 * @param signal {AbortController.signal}
 * @returns {Promise<null|object>}
 */
const fetchVersionData = async (signal) => {
  const isLocalHost = window.location.hostname === 'localhost'

  if (!isLocalHost) {
    let input = window.location.hostname.includes('github.io')
      ? `${window.location.origin}/instructure-ui/versions.json`
      : `${window.location.origin}/versions.json`
    const result = await fetch(input, { signal })
    return await result.json()
  }

  return null
}

/**
 * if we are on the docs page of a legacy version,
 * the path includes the version number, e.g. `/v7` or `/v8`
 */
const [versionInPath] = window.location.pathname.split('/').filter(Boolean)

export default fetchVersionData
export { fetchVersionData, versionInPath }
