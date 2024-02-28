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
import { Pages } from '@instructure/ui'

const PAGES_IUI = () => {
  const renderBackButton = (navigateToPreviousPage) => {
    return <button onClick={navigateToPreviousPage}>Back</button>
  }

  return (
    <Pages
      activePageIndex={0}
      onPageIndexChange={() => {}}
      backButtonLabel="Back to previous page"
    >
      <Pages.Page>
        {(history, navigateToPreviousPage) => {
          return (
            <div>
              <div>
                <button onClick={() => {}}>Go to Page Two</button>
              </div>
              <div>
                <div>Page One</div>
              </div>
            </div>
          )
        }}
      </Pages.Page>
      <Pages.Page>
        {(history, navigateToPreviousPage) => {
          return (
            <div>
              <div>
                {history.length > 1 && renderBackButton(navigateToPreviousPage)}
              </div>
              <div>Hey Look - Page Two</div>
            </div>
          )
        }}
      </Pages.Page>
    </Pages>
  )
}

export default PAGES_IUI
