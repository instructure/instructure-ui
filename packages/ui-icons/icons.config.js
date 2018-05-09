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
const libraryName = 'InstructureIcons'
const packageName = '@instructure/ui-icons'
const source = './src/'
const destination = './lib/'

const svg = {
  source: `${source}**/*.sketch`,
  destination: `${source}__svg__/`
}

const fonts = {
  source: svg.destination, // variant is added to path
  destination: `${destination}font/`,
  fontName: libraryName,
  className: 'icon',
  formats: ['woff2', 'woff', 'eot', 'ttf', 'svg']
}

const react = {
  source: svg.destination,
  tmp: './__build__/',
  destination: `${destination}`,
  componentBaseName: 'Icon'
}

const deprecated = {
  /* [icon name]: [icon name to use instead]
  /* e.g. 'arrow-up': 'arrow' */
  'discussion-x': 'x',
  'copy-course': 'copy',
  'discussion-reply-dark': 'more',
  'discussion-reply': 'more',
  'discussion-search': 'search',
  'search-address-book': 'search',
  'rss-add': 'add',
  'user-add': 'add',
  'materials-required-light': 'materials-required',
  'mature-light': 'mature',
  'note-dark': 'note',
  'note-light': 'note',
  'icon-reply-2': 'icon-reply',
  'icon-replied': 'icon-reply',
  'settings-2': 'settings',
  'twitter-boxed': 'twitter',
  'arrow-left' : 'arrow-start',
  'arrow-open-left' : 'arrow-open-start',
  'arrow-open-right' : 'arrow-open-end',
  'arrow-right' : 'arrow-end',
  'expand-left' : 'expand-start',
  'mini-arrow-left' : 'mini-arrow-start',
  'mini-arrow-right' : 'mini-arrow-end',
  'move-left' : 'move-start',
  'move-right' : 'move-end',
  'text-left' : 'text-start',
  'text-right' : 'text-end',
  'toggle-left' : 'toggle-start',
  'toggle-right' : 'toggle-end'
}

const bidirectional = [
  'address-book',
  'annotate',
  'announcement',
  'arrow-left',
  'arrow-start',
  'arrow-open-left',
  'arrow-open-start',
  'arrow-open-right',
  'arrow-open-end',
  'arrow-right',
  'arrow-end',
  'audio',
  'assignment',
  'bullet-list',
  'chat',
  'compose',
  'courses',
  'discussion',
  'discussion-reply-2',
  'document',
  'edit',
  'essay',
  'expand-left',
  'expand-start',
  'export-content',
  'export',
  'external-link',
  'feedback',
  'folder-locked',
  'folder',
  'forward',
  'gradebook-export',
  'gradebook-import',
  'highlighter',
  'import-content',
  'import',
  'indent-2',
  'indent',
  'mini-arrow-left',
  'mini-arrow-start',
  'mini-arrow-right',
  'mini-arrow-end',
  'move-left',
  'move-start',
  'move-right',
  'move-end',
  'next-unread',
  'not-graded',
  'note',
  'open-folder',
  'outdent',
  'outdent2',
  'quiz-stats-high',
  'quiz-stats-low',
  'quiz',
  'replied',
  'reply-2',
  'reply-all-2',
  'reply',
  'rubric-dark',
  'rubric',
  'sis-imported',
  'syllabus',
  'text-left',
  'text-start',
  'text-right',
  'text-end',
  'textarea',
  'toggle-left',
  'toggle-start',
  'toggle-right',
  'toggle-end'
]

module.exports = {
  source,
  destination,
  libraryName,
  packageName,
  svg,
  fonts,
  react,
  deprecated,
  bidirectional
}
