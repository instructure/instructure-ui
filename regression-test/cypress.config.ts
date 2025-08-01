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
import { defineConfig } from 'cypress'
import { installPlugin } from '@chromatic-com/cypress'

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      installPlugin(on, config)

      // This registers a log task as seen in the Cypress docs for cy.task as well
      // as a table task for sending tabular data to the terminal.
      // More info: https://www.npmjs.com/package/cypress-axe
      on('task', {
        log(message) {
          // eslint-disable-next-line no-console
          console.log(message)

          return null
        },
        table(message) {
          // eslint-disable-next-line no-console
          console.table(message)

          return null
        }
      })
    }
  }
})
