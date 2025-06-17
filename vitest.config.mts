/*
 * The MIT License (MIT).
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

/// <reference types="vitest" />

import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  test: {
    globals: true,
    watchTriggerPatterns: [
      {
        // matches any file inside the __testfixtures__ directory
        pattern: /^.*\/ui-codemods\/.*\/__testfixtures__\/.*$/,
        // file is the full path. e.g.  /Users/MyUser/code/instructure-ui/packages/ui-codemods/lib/__node_tests__/__testfixtures__/colors.input.ts
        testsToRun: (file, _match) => {
          const dirName = path.basename(path.dirname(file))
          // reruns all tests that match the directory name of the test fixture
          return `packages/ui-codemods/lib/__node_tests__/${dirName}.test.ts`
        }
      }
    ],
    projects: [
      {
        // DOM-based unit tests
        test: {
          // Allows using APIs like Jest without importing them
          globals: true,
          include: ['**/__tests__/**/*.test.tsx'],
          environment: 'jsdom',
          setupFiles: './vitest.setup.ts',
          name: { label: 'web', color: 'blue' }
        }
      },
      {
        // tests for node scripts
        test: {
          globals: true,
          include: ['**/__node_tests__/**/*.test.{ts,tsx}'],
          environment: 'node',
          name: { label: 'node', color: 'magenta' }
        }
      }
    ]

  }
})
