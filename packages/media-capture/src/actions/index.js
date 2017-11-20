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
import { DateTime } from 'luxon'

import { translate } from '../constants/translated/translations'
import * as types from '../constants/ActionTypes'

export const audioDeviceChanged = id => ({ type: types.AUDIO_DEVICE_CHANGED, id })
export const closeClicked = () => ({ type: types.CLOSE_CLICKED })
export const countdownComplete = () => ({ type: types.COUNTDOWN_COMPLETE })

export const finishClicked = () => {
  return (dispatch) => {
    dispatch(
      {
        type: types.FINISH_CLICKED,
        fileName:  `[${translate('FILE_PLACEHOLDER')} ${new Date(DateTime.local())}]`
      }
    )
  }
}

export const onComplete = () => ({ type: types.ONCOMPLETE })
export const startClicked = () => ({ type: types.START_CLICKED })
export const startoverClicked = () => ({ type: types.STARTOVER_CLICKED })
export const titleEdited = text => ({ type: types.TITLE_EDITED, text })
export const videoDeviceChanged = id => ({ type: types.VIDEO_DEVICE_CHANGED, id })
export const deviceRequestAccepted = () => ({ type: types.DEVICE_REQUEST_ACCEPTED })
export const mediaRecorderInitialized = (mr) => ({ type: types.MEDIA_RECORDER_INITIALIZED, mr })
export const videoObjectGenerated = (src, blob) => ({ type: types.VIDEO_OBJECT_GENERATED, src, blob })
export const errorOccurred = (msg) => ({ type: types.ERROR_OCCURRED, msg })
export const devicesFound = (devices) => ({ type: types.DEVICES_FOUND, devices })
export const soundMeterInitialized = (sm) => ({ type: types.SOUND_METER_INITIALIZED, sm })

export const saveClicked = (fileName) => {
  return (dispatch) => {
    dispatch({ type: types.SAVE_CLICKED, fileName })

    // simulate async saving
    setTimeout(() => {
      dispatch(onComplete())
    }, 1500)
  }
}
