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

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { processFile } from './processFile.mjs'
import { getFrontMatter } from './utils/getFrontMatter.mjs'
import type { LibraryOptions, ProcessedFile } from './DataTypes.mjs'
import packageJson from '../package.json' with { type: 'json' }

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Shared parsing constants live here (rather than in build-docs) so the
// build, the parse workers, and the markdown watcher all read one source of
// truth. They resolve identically whether this runs from `buildScripts/` (src)
// or the compiled `lib/`, since both sit one level under `packages/__docs__`.
export const projectRoot = path.resolve(__dirname, '../../../')

/** Library metadata stamped onto every parsed doc (MainDocsData.library). */
export const library: LibraryOptions = {
  version: packageJson.version,
  repository: packageJson.repository.url
}

/**
 * Parses a single file and returns a ProcessedFile, or undefined if it
 * should be skipped. Pure parsing — no file writes, no module-level state, so
 * it can be invoked both in-process and inside a worker thread.
 */
export function parseSingleFile(
  fullPath: string,
  projectRoot: string,
  library: LibraryOptions
): ProcessedFile | undefined {
  let docObject
  const dirName = path.dirname(fullPath)
  const fileName = path.parse(fullPath).name
  if (fileName === 'index') {
    docObject = processFile(fullPath, projectRoot, library)
    if (!docObject) {
      return
    }
    // Some Components (e.g. Alert) store their descriptions in README.md files.
    // Add this to the final JSON if it's edited
    const readmeDesc = tryParseReadme(dirName)
    docObject.description = readmeDesc
      ? docObject.description + readmeDesc
      : docObject.description
  } else if (fileName === 'README') {
    // if we edit a README, we'll need to add the changes to the components JSON
    let componentIndexFile: string | undefined
    if (fs.existsSync(path.join(dirName, 'index.tsx'))) {
      componentIndexFile = path.join(dirName, 'index.tsx')
    } else if (fs.existsSync(path.join(dirName, 'index.ts'))) {
      componentIndexFile = path.join(dirName, 'index.ts')
    }
    if (componentIndexFile) {
      docObject = processFile(componentIndexFile, projectRoot, library)!
      const readmeDesc = tryParseReadme(dirName)
      docObject.description = readmeDesc ? readmeDesc : docObject.description
    } else {
      // just a README.md, has no index file
      docObject = processFile(fullPath, projectRoot, library)
    }
  } else {
    // documentation .md files, utils ts and tsx files
    docObject = processFile(fullPath, projectRoot, library)
  }
  return docObject
}

/**
 * Parses a file and writes its JSON into `<buildDir>/docs/`. Used by the
 * markdown watcher for incremental rebuilds. Returns the parsed doc (so callers
 * can fan it out to version subdirs) or undefined if the file was skipped.
 */
export function parseAndWriteFile(
  fullPath: string,
  buildDir: string
): ProcessedFile | undefined {
  const docObject = parseSingleFile(fullPath, projectRoot, library)
  if (!docObject) {
    return
  }
  fs.writeFileSync(
    path.join(buildDir, 'docs', docObject.id + '.json'),
    JSON.stringify(docObject)
  )
  return docObject
}

function tryParseReadme(dirName: string) {
  const readme = path.join(dirName, 'README.md')
  if (fs.existsSync(readme)) {
    const data = fs.readFileSync(readme)
    const frontMatter = getFrontMatter(data)
    return frontMatter.description
    // TODO here the 'describes' field was used to pair them, remove it
  }
  return undefined
}
