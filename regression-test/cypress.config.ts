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
import { existsSync, readFileSync, writeFileSync } from 'node:fs'

const META_FILE = 'cypress/meta.json'

export default defineConfig({
  screenshotsFolder: 'cypress/screenshots',
  trashAssetsBeforeRuns: true,
  video: false,
  e2e: {
    viewportWidth: 1280,
    viewportHeight: 800,
    setupNodeEvents(on, config) {
      on('before:run', () => {
        writeFileSync(META_FILE, '{}')
      })
      on('task', {
        log(message) {
          console.log(message)
          return null
        },
        table(message) {
          console.table(message)
          return null
        },
        recordMeta({ name, pagePath }: { name: string; pagePath: string }) {
          const data = existsSync(META_FILE)
            ? JSON.parse(readFileSync(META_FILE, 'utf8'))
            : {}
          data[name] = pagePath
          writeFileSync(META_FILE, JSON.stringify(data, null, 2))
          return null
        }
      })
    }
  }
})
