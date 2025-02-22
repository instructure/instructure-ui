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
import React, {
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useRef
} from 'react'
import ReactDOM from 'react-dom'

import { LoremIpsum } from 'lorem-ipsum'
import moment from 'moment'
import 'moment/min/locales'

import { mirrorHorizontalPlacement } from '@instructure/ui-position'

// eslint-plugin-import doesn't like 'import * as Components' here
const Components = require('./components')

import { debounce } from '@instructure/debounce'

// eslint-disable-next-line no-restricted-imports
import '@instructure/ui-icons/es/icon-font/Solid/InstructureIcons-Solid.css'
// eslint-disable-next-line no-restricted-imports
import '@instructure/ui-icons/es/icon-font/Line/InstructureIcons-Line.css'

import { DateTime } from '@instructure/ui-i18n'
// @ts-ignore webpack import
import iconExample from './buildScripts/samplemedia/heart_lg.svg'
// @ts-ignore webpack import
import avatarSquare from './buildScripts/samplemedia/avatarSquare.jpg'
// @ts-ignore webpack import
import avatarPortrait from './buildScripts/samplemedia/avatarPortrait.jpg'
import placeholderImage from './buildScripts/samplemedia/placeholder-image'
// eslint-disable-next-line no-restricted-imports
import ThemeColors from './src/ThemeColors'
// eslint-disable-next-line no-restricted-imports
import ColorTable from './src/ColorTable'

import { additionalPrimitives, dataVisualization } from '@instructure/ui-themes'

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4
  },
  wordsPerSentence: {
    max: 16,
    min: 4
  }
})

const globals = {
  ...Components,
  debounce,
  moment,
  avatarSquare,
  avatarPortrait,
  DateTime,
  iconExample,
  lorem: {
    sentence: () => lorem.generateWords(),
    paragraph: () => lorem.generateSentences(5),
    paragraphs: (count: number) =>
      lorem.generateSentences(count || Math.floor(Math.random() * 10))
  },
  mirrorHorizontalPlacement,
  placeholderImage,
  React,
  ReactDOM,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useRef,
  forwardRef,
  additionalPrimitives,
  dataVisualization,
  ThemeColors,
  ColorTable
}

Object.keys(globals).forEach((key) => {
  ;(global as any)[key] = globals[key]
})

export default globals
