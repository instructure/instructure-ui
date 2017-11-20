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
import { reducer, getInitialState } from '../index'
import * as types from '../../constants/ActionTypes'
import * as states from '../../constants/CaptureStates'

describe('capture reducer', () => {
  it('should handle AUDIO_DEVICE_CHANGED', () => {
    expect(
      reducer([], {
        type: types.AUDIO_DEVICE_CHANGED,
        id: '123wfjwfnef1'
      })
    ).to.deep.equal(
      { audioDeviceId: '123wfjwfnef1' }
    )
  })

  it('should handle CLOSE_CLICKED', () => {
    expect(
      reducer(
        { captureState: states.READY },
        { type: types.CLOSE_CLICKED }
      )
    ).to.deep.equal(
      { captureState: states.READY }
    )

    expect(
      reducer(
        { captureState: states.SAVING },
        { type: types.CLOSE_CLICKED }
      )
    ).to.deep.equal(
      { captureState: states.SAVING }
    )
  })

  it('should handle COUNTDOWN_COMPLETE', () => {
    expect(
      reducer(
        { captureState: states.STARTING },
        { type: types.COUNTDOWN_COMPLETE }
      )
    ).to.deep.equal(
      { captureState: states.RECORDING }
    )

    expect(
      reducer(
        { captureState: states.RECORDING },
        { type: types.COUNTDOWN_COMPLETE }
      )
    ).to.deep.equal(
      {
        captureState: states.RECORDING
      }
    )
  })

  it('should handle DEVICES_FOUND', () => {
    expect(
      reducer(
        { captureState: states.LOADING },
        {
          type: types.DEVICES_FOUND,
          devices: {
            audioinput: [{ deviceId: 'audioDeviceId1' }, { deviceId: 'audioDeviceId2' }],
            videoinput: [{deviceId: 'videoDeviceId1'}]
          }
        }
      )
    ).to.deep.equal(
      {
        captureState: states.LOADING,
        devices: {
          audioinput: [{ deviceId: 'audioDeviceId1' }, { deviceId: 'audioDeviceId2' }],
          videoinput: [{ deviceId: 'videoDeviceId1' }]
        },
        audioDeviceId: 'audioDeviceId1',
        videoDeviceId: 'videoDeviceId1'
      }
    )
  })

  it('should handle FINISH_CLICKED', () => {
    expect(
      reducer(
        { captureState: states.RECORDING },
        { type: types.FINISH_CLICKED, fileName: 'this is a file name' }
      )
    ).to.deep.equal(
      { captureState: states.PREVIEWSAVE, fileName: 'this is a file name' }
    )

    expect(
      reducer(
        { captureState: states.SAVING },
        { type: types.FINISH_CLICKED }
      )
    ).to.deep.equal(
      { captureState: states.SAVING }
    )
  })

  it('should handle ONCOMPLETE', () => {
    const onCompleted = () => {}
    expect(
      reducer(
        { ...getInitialState(onCompleted), captureState: states.SAVING, soundMeter: true },
        { type: types.ONCOMPLETE }
      )
    ).to.deep.equal(
      { ...getInitialState(), captureState: states.READY, soundMeter: true, onCompleted }
    )

    expect(
      reducer(
        { captureState: states.FINISHED },
        { type: types.ONCOMPLETE }
      )
    ).to.deep.equal(
      { captureState: states.FINISHED }
    )
  })

  it('should handle SAVE_CLICKED', () => {
    expect(
      reducer(
        { captureState: states.PREVIEWSAVE },
        { type: types.SAVE_CLICKED, fileName: 'this is a file name' }
      )
    ).to.deep.equal(
      { captureState: states.SAVING, fileName: 'this is a file name' }
    )

    expect(
      reducer(
        { captureState: states.READY },
        { type: types.SAVE_CLICKED }
      )
    ).to.deep.equal(
      { captureState: states.READY }
    )
  })

  it('should handle START_CLICKED', () => {
    expect(
      reducer(
        { captureState: states.PREVIEWSAVE },
        { type: types.START_CLICKED }
      )
    ).to.deep.equal(
      { captureState: states.PREVIEWSAVE }
    )

    expect(
      reducer(
        { captureState: states.READY },
        { type: types.START_CLICKED }
      )
    ).to.deep.equal(
      { captureState: states.STARTING }
    )
  })

  it('should handle START_CLICKED', () => {
    expect(
      reducer(
        { captureState: states.PREVIEWSAVE },
        { type: types.START_CLICKED }
      )
    ).to.deep.equal(
      { captureState: states.PREVIEWSAVE }
    )

    expect(
      reducer(
        { captureState: states.READY },
        { type: types.START_CLICKED }
      )
    ).to.deep.equal(
      { captureState: states.STARTING }
    )
  })

  it('should handle STARTOVER_CLICKED', () => {
    expect(
      reducer(
        { ...getInitialState(), soundMeter: true, captureState: states.PREVIEWSAVE },
        { type: types.STARTOVER_CLICKED }
      )
    ).to.deep.equal(
      { ...getInitialState(), soundMeter: true, captureState: states.LOADING }
    )

    expect(
      reducer(
        { ...getInitialState(), soundMeter: true, captureState: states.RECORDING },
        { type: types.STARTOVER_CLICKED }
      )
    ).to.deep.equal(
      { ...getInitialState(), soundMeter: true, captureState: states.READY }
    )

    expect(
      reducer(
        { captureState: states.STARTING },
        { type: types.STARTOVER_CLICKED }
      )
    ).to.deep.equal(
      { captureState: states.STARTING }
    )
  })

  it('should handle TITLE_EDITED', () => {
    expect(
      reducer(
        { captureState: states.PREVIEWSAVE },
        { type: types.TITLE_EDITED, text: 'this is a title' }
      )
    ).to.deep.equal(
      { captureState: states.PREVIEWSAVE, title: 'this is a title' }
    )
  })

  it('should handle VIDEO_DEVICE_CHANGED', () => {
    expect(
      reducer(
        { captureState: states.READY },
        { type: types.VIDEO_DEVICE_CHANGED, id: '1028eowjdnf' }
      )
    ).to.deep.equal(
      { captureState: states.READY, videoDeviceId: '1028eowjdnf' }
    )
  })

  it('should handle DEVICE_REQUEST_ACCEPTED', () => {
    expect(
      reducer(
        { captureState: states.LOADING },
        { type: types.DEVICE_REQUEST_ACCEPTED }
      )
    ).to.deep.equal(
      { captureState: states.READY }
    )
  })

  it('should handle MEDIA_RECORDER_INITIALIZED', () => {
    expect(
      reducer(
        { captureState: states.RECORDING },
        { type: types.MEDIA_RECORDER_INITIALIZED, mr: true }
      )
    ).to.deep.equal(
      { captureState: states.RECORDING, mediaRecorder: true }
    )
  })

  it('should handle VIDEO_OBJECT_GENERATED', () => {
    expect(
      reducer(
        { captureState: states.PREVIEWSAVE },
        { type: types.VIDEO_OBJECT_GENERATED, src: 'blob:1234asdf23', blob: '[BLOB]' }
      )
    ).to.deep.equal(
      { captureState: states.PREVIEWSAVE, videoSrc: 'blob:1234asdf23', videoBlob: '[BLOB]' }
    )
  })

  it('should handle ERROR_OCCURRED', () => {
    expect(
      reducer(
        { captureState: states.READY },
        { type: types.ERROR_OCCURRED, msg: 'error copy' }
      )
    ).to.deep.equal(
      { captureState: states.ERROR, msg: 'error copy' }
    )
  })
})
