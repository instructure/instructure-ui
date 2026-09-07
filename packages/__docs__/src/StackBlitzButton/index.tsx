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

import { useContext } from 'react'

import { Tooltip } from '@instructure/ui-tooltip/latest'
import { SVGIcon } from '@instructure/ui-svg-images'
import { IconButton } from '@instructure/ui-buttons/latest'

import { AppContext } from '../appContext'
import type { StackBlitzButtonProps } from './props'

/**
 * "Open in StackBlitz" button for Playground examples.
 *
 * - Generates a Vite + React project and POSTs it to https://stackblitz.com/run
 *   StackBlitz runs real Node + Vite in the browser (WebContainers)
 * - Everything (components, icons, contexts) is imported from the
 *   `@instructure/ui` meta package
 */

const STACKBLITZ_RUN_URL = 'https://stackblitz.com/run'
const META_PACKAGE = '@instructure/ui'

const SAMPLE_MEDIA_HELPERS = [
  'avatarSquare',
  'avatarPortrait',
  'lorem',
  'placeholderImage'
] as const

const IconSVG = `<svg xmlns='http://www.w3.org/2000/svg' width='{{w}}' height='{{h}}' viewBox='0 0 {{w}} {{h}}'><rect x='0' y='0' fill='#F8F8F8' width='100%' height='100%'/><text x='10' y='20' fill='#ccc' style="font: 14px sans-serif;">FPO: {{w}} x {{h}}</text><svg x='40%' width='20%' viewBox='0 0 90 66' opacity='0.3'><path d='M85 5v56H5V5h80m5-5H0v66h90V0z'/><circle cx='18' cy='20' r='6'/><path d='M56 14L37 39l-8-6-17 23h67z'/></svg></svg>`

const SAMPLE_MEDIA_SOURCE = `import { LoremIpsum } from 'lorem-ipsum'
const IconSVG = \`${IconSVG}\`
export const avatarSquare = "https://raw.githubusercontent.com/instructure/instructure-ui/master/packages/__docs__/buildScripts/samplemedia/avatarSquare.jpg"
export const avatarPortrait = "https://raw.githubusercontent.com/instructure/instructure-ui/master/packages/__docs__/buildScripts/samplemedia/avatarPortrait.jpg"

const loremInstance = new LoremIpsum({
  sentencesPerParagraph: { max: 8, min: 4 },
  wordsPerSentence: { max: 16, min: 4 }
})
export const lorem = {
  sentence: () => loremInstance.generateWords(),
  paragraph: () => loremInstance.generateSentences(5),
  paragraphs: (count) =>
    loremInstance.generateSentences(count || Math.floor(Math.random() * 10))
}

export function placeholderImage(width = 512, height = 512) {
  const dataUri = btoa(
    IconSVG.replace(/{{w}}/g, width).replace(/{{h}}/g, height).trim()
  )
  return \`data:image/svg+xml;base64,\${dataUri}\`
}
`

/**
 * Guess which InstUI names an example uses so they can be imported from
 * `@instructure/ui`. Examples are bare JSX without imports, so this is text
 * matching, not parsing. Three kinds of usage are recognised:
 *
 *   <Avatar ...>, <Tabs.Panel ...>     -> Avatar, Tabs      (JSX tags)
 *   renderIcon={IconSearchLine}        -> IconSearchLine    (icons used as
 *   icon: UserInstUIIcon                  UserInstUIIcon     values; all icon
 *                                                            exports end in
 *                                                            Line/Solid/InstUIIcon)
 *   useContext(TextDirectionContext)   -> TextDirectionContext
 *
 * Names the example declares itself (`const Example = ...`, `class Foo`,
 * `function bar`) are dropped so we don't import them.
 */
const USED_NAME_PATTERN =
  /<([A-Z]\w+)|\b(Icon[A-Z]\w*(?:Line|Solid)|[A-Z]\w*InstUIIcon|[A-Z]\w+Context)\b/g
const LOCAL_DECLARATION_PATTERN = /\b(?:class|function|const|let)\s+([A-Z]\w*)/g

function collectUsedNames(code: string): string[] {
  const declared = new Set(
    [...code.matchAll(LOCAL_DECLARATION_PATTERN)].map((m) => m[1])
  )
  const used = new Set(
    [...code.matchAll(USED_NAME_PATTERN)].map((m) => m[1] ?? m[2])
  )
  return [...used].filter((name) => !declared.has(name))
}

function buildProjectFiles(
  code: string,
  usedNames: string[],
  instuiVersion: string,
  componentVersion: string | undefined
) {
  const ext = 'jsx'
  const importPath = `${META_PACKAGE}/${componentVersion ?? 'latest'}`

  const neededMedia = SAMPLE_MEDIA_HELPERS.filter((h) =>
    h === 'lorem' ? code.includes('lorem.') : code.includes(h)
  )
  const mediaImport = neededMedia.length
    ? `import { ${neededMedia.join(', ')} } from './samplemedia'\n`
    : ''

  const instuiImports = usedNames.length
    ? `import { ${usedNames.join(', ')} } from '${importPath}'`
    : ''

  // If the example ends with a render(<.../>) call keep it, otherwise wrap it.
  const cleaned = code.replace(/\s+/g, '')
  const hasRenderCall =
    cleaned.lastIndexOf('render(<') !== -1 && cleaned.endsWith('>)')
  const body = hasRenderCall ? code : `render(${code})`

  const dependencies: Record<string, string> = {
    [META_PACKAGE]: instuiVersion,
    react: '18.3.1',
    'react-dom': '18.3.1'
  }
  if (neededMedia.includes('lorem')) dependencies['lorem-ipsum'] = '^3.0.0'

  const files: Record<string, string> = {
    'package.json': JSON.stringify(
      {
        name: 'instui-example',
        private: true,
        type: 'module',
        scripts: { dev: 'vite', build: 'vite build' },
        dependencies,
        devDependencies: {
          vite: '^8.0.0',
          '@vitejs/plugin-react': '^6.0.0'
        }
      },
      null,
      2
    ),
    '.stackblitzrc': JSON.stringify(
      {
        installDependencies: false,
        startCommand: 'pnpm install --prefer-offline && pnpm dev'
      },
      null,
      2
    ),
    'vite.config.js': `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Pre-bundle React and InstUI together. If Vite discovers @instructure/ui
  // in a later optimize pass it bundles a second React copy into it, which
  // ends in "Invalid hook call" at runtime.
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-dom/client', '${importPath}']
  },
  resolve: { dedupe: ['react', 'react-dom'] }
})
`,
    'index.html': `<!doctype html>
<html>
  <body>
    <div id="app"></div>
    <div id="flash-messages"></div>
    <div id="nav"></div>
    <script type="module" src="/src/main.${ext}"></script>
  </body>
</html>
`,
    [`src/main.${ext}`]: `import React, { useState, useEffect, useContext, Children } from 'react'
import ReactDOM from 'react-dom/client'
${mediaImport}${instuiImports}

const render = (el) =>
  ReactDOM.createRoot(document.getElementById('app')).render(el)

${body}
`
  }
  if (neededMedia.length) {
    files[`src/samplemedia.js`] = SAMPLE_MEDIA_SOURCE
  }
  return { files, entry: `src/main.${ext}` }
}

/** Equivalent of `sdk.openProject(project, { newWindow: true, openFile })`. */
function postToStackBlitz(
  title: string,
  files: Record<string, string>,
  openFile: string
) {
  const form = document.createElement('form')
  form.method = 'POST'
  form.action = `${STACKBLITZ_RUN_URL}?file=${encodeURIComponent(openFile)}`
  form.target = '_blank'
  form.style.display = 'none'

  const add = (name: string, value: string) => {
    const input = document.createElement('input')
    input.type = 'hidden'
    input.name = name
    input.value = value
    form.appendChild(input)
  }
  add('project[title]', title)
  add('project[description]', 'Generated from instructure.design')
  add('project[template]', 'node')
  for (const [path, content] of Object.entries(files)) {
    add(`project[files][${path}]`, content)
  }
  document.body.appendChild(form)
  form.submit()
  form.remove()
}

function StackBlitzButton({ code, title }: StackBlitzButtonProps) {
  const { library, componentVersion } = useContext(AppContext)

  const handleClick = () => {
    // Pin to the docs' own version when it is a plain release, otherwise
    // (local dev / snapshot builds) fall back to the current major.
    const version =
      library?.version && /^\d+\.\d+\.\d+$/.test(library.version)
        ? library.version
        : `^${library?.version?.split('.')[0] ?? '11'}`
    const { files, entry } = buildProjectFiles(
      code,
      collectUsedNames(code),
      version,
      componentVersion
    )
    postToStackBlitz(title, files, entry)
  }

  return (
    <Tooltip renderTip="Edit in StackBlitz" placement="bottom">
      <IconButton
        onClick={handleClick}
        size="small"
        screenReaderLabel={`Edit ${title} in StackBlitz`}
        withBorder={false}
        withBackground={false}
        renderIcon={
          <SVGIcon viewBox="0 0 28 28" title="StackBlitz">
            <path d="M12.747 16.273h-7.46L18.925 1.5l-3.671 10.227h7.46L9.075 26.5l3.671-10.227z" />
          </SVGIcon>
        }
      />
    </Tooltip>
  )
}

StackBlitzButton.displayName = 'StackBlitzButton'

export default StackBlitzButton
export { StackBlitzButton }
