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
import PropTypes from 'prop-types'

let translations = {
  ARIA_VIDEO_LABEL: 'Video Player',
  ARIA_VOLUME: 'Current Volume Level',
  ARIA_RECORDING: 'Recording',
  DEFAULT_ERROR: 'Something went wrong accessing your webcam.',
  DEVICE_AUDIO: 'Mic',
  DEVICE_VIDEO: 'Webcam',
  FILE_PLACEHOLDER: 'Untitled',
  FINISH: 'Finish',
  NO_WEBCAM: 'No Video',
  NOT_ALLOWED_ERROR: 'Please allow Arc to access your webcam.',
  NOT_READABLE_ERROR: 'Your webcam may already be in use.',
  PLAYBACK_PAUSE: 'Pause',
  PLAYBACK_PLAY: 'Play',
  PREVIEW: 'PREVIEW',
  SAVE: 'Save',
  SR_FILE_INPUT: 'File name',
  START: 'Start Recording',
  START_OVER: 'Start Over'
}

export const TranslationPropTypes =
  Object.keys(translations).reduce((pt, key) => ({ ...pt, [key]: PropTypes.string }), {})

export function applyTranslations (consumerTranslations) {
  translations = {...translations, ...consumerTranslations}
}

export function translate (key) {
  return translations[key]
}
