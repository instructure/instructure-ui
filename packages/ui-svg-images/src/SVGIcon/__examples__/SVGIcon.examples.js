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

export default {
  sectionProp: 'size',
  getComponentProps: (props) => {
    return {
      viewBox: '0 0 2000 2000',
      children: (
        <path
          d="M1692.48 910.647l-732.762 687.36-731.182-685.779c-154.616-156.875-154.616-412.122 0-568.997 74.542-75.558 173.704-117.233 279.304-117.233h.113c105.487 0 204.65 41.675 279.078 117.233l.113.113c74.767 75.783 116.103 176.865 116.103 284.385h112.941c0-107.52 41.224-208.602 116.104-284.498 74.428-75.558 173.59-117.233 279.19-117.233h.113c105.487 0 204.763 41.675 279.19 117.233 154.617 156.875 154.617 412.122 1.695 567.416m78.833-646.701c-95.887-97.355-223.737-150.89-359.718-150.89h-.113c-136.094 0-263.83 53.535-359.604 150.777-37.61 38.061-68.443 80.979-92.16 127.398-23.718-46.42-54.664-89.337-92.16-127.285-95.774-97.355-223.51-150.89-359.605-150.89h-.113c-135.981 0-263.83 53.535-359.83 150.89-197.648 200.696-197.648 526.983 1.694 729.035l810.014 759.868L1771.313 991.4c197.647-200.47 197.647-526.758 0-727.454"
          stroke="none"
          strokeWidth="1"
          fillRule="evenodd"
        />
      )
    }
  }
}
