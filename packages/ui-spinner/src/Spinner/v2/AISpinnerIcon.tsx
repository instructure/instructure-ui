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

import { wrapCustomIcon } from '@instructure/ui-icons'

/**
 * ---
 * private: true
 * ---
 * The star path from packages/ui-icons/svg/Custom/igniteai-logo.svg, without
 * the small sparkle. The star alone is centered in the viewBox, so it rotates
 * evenly. If that logo changes, update this file too.
 */
const AISpinnerPaths = ({ color = 'currentColor' }: { color?: string }) => (
  <path
    d="M11.0621 2.53451C11.3843 1.66389 12.6157 1.66389 12.9379 2.53451L15.0815 8.32767C15.1828 8.60139 15.3986 8.8172 15.6723 8.91848L21.4655 11.0621C22.3361 11.3843 22.3361 12.6157 21.4655 12.9379L15.6723 15.0815C15.3986 15.1828 15.1828 15.3986 15.0815 15.6723L12.9379 21.4655C12.6157 22.3361 11.3843 22.3361 11.0621 21.4655L8.91849 15.6723C8.8172 15.3986 8.60139 15.1828 8.32767 15.0815L2.53451 12.9379C1.66389 12.6157 1.66389 11.3843 2.53451 11.0621L8.32767 8.91849C8.60139 8.8172 8.8172 8.60139 8.91848 8.32767L11.0621 2.53451Z"
    fill={color}
  />
)

const AISpinnerIcon = wrapCustomIcon(AISpinnerPaths, 'AISpinner', '0 0 24 24')

export default AISpinnerIcon
export { AISpinnerIcon }
