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
import * as types from '../../constants/ActionTypes'
import * as actions from '../index'

describe('mediaCapture actions', () => {
  const testbed = new Testbed()
  it('audioDeviceChanged should create AUDIO_DEVICE_CHANGED action', () => {
    expect(actions.audioDeviceChanged('102nsdfsdf02')).to.deep.equal({
      type: types.AUDIO_DEVICE_CHANGED,
      id: '102nsdfsdf02'
    })
  })

  it('closeClicked should create CLOSE_CLICKED action', () => {
    const dispatch = testbed.stub()
    actions.closeClicked()(dispatch)
    expect(dispatch).to.have.been.calledWith({
      type: types.CLOSE_CLICKED
    })
  })

  it('countdownComplete should create COUNTDOWN_COMPLETE action', () => {
    expect(actions.countdownComplete()).to.deep.equal({
      type: types.COUNTDOWN_COMPLETE
    })
  })

  it('finishClicked should create FINISH_CLICKED action', () => {
    const dispatch = testbed.stub()
    actions.finishClicked()(dispatch)
    expect(dispatch).to.have.been.called
  })

  it('onComplete should create ONCOMPLETE action', () => {
    expect(actions.onComplete()).to.deep.equal({
      type: types.ONCOMPLETE
    })
  })

  it('startoverClicked should create STARTOVER_CLICKED action', () => {
    expect(actions.startoverClicked()).to.deep.equal({
      type: types.STARTOVER_CLICKED
    })
  })

  it('titleEdited should create TITLE_EDITED action', () => {
    expect(actions.titleEdited('new title!')).to.deep.equal({
      type: types.TITLE_EDITED,
      text: 'new title!'
    })
  })

  it('videoDeviceChanged should create VIDEO_DEVICE_CHANGED action', () => {
    expect(actions.videoDeviceChanged('oasnf2308hf')).to.deep.equal({
      type: types.VIDEO_DEVICE_CHANGED,
      id: 'oasnf2308hf'
    })
  })

  it('saveClicked should dispatch SAVE_CLICKED action', () => {
    const dispatch = testbed.stub()
    actions.saveClicked('file')(dispatch)
    expect(dispatch).to.have.been.calledWith({
      type: types.SAVE_CLICKED,
      fileName: 'file'
    })
  })

  it('deviceRequestAccepted should create DEVICE_REQUEST_ACCEPTED action', () => {
    expect(actions.deviceRequestAccepted()).to.deep.equal({
      type: types.DEVICE_REQUEST_ACCEPTED
    })
  })

  it('mediaRecorderInitialized should create MEDIA_RECORDER_INITIALIZED action', () => {
    expect(actions.mediaRecorderInitialized('mr')).to.deep.equal({
      type: types.MEDIA_RECORDER_INITIALIZED,
      mr: 'mr'
    })
  })

  it('videoObjectGenerated should create VIDEO_OBJECT_GENERATED action', () => {
    expect(actions.videoObjectGenerated('src', 'blob')).to.deep.equal({
      type: types.VIDEO_OBJECT_GENERATED,
      src: 'src',
      blob: 'blob'
    })
  })

  it('errorOccurred should create ERROR_OCCURED action', () => {
    expect(actions.errorOccurred('msg')).to.deep.equal({
      type: types.ERROR_OCCURRED,
      msg: 'msg'
    })
  })

  it('devicesFound should create DEVICES_FOUND action', () => {
    const dispatch = testbed.stub()
    const devices = { audioinput: [{ deviceId: 'default' }, { label: 'default:' }], videoinput: [{ label: 'id1', deviceId: '12345' }] }
    actions.devicesFound(devices, { label: 'id1' })(dispatch)
    expect(dispatch).to.have.been.calledWith({
      type: types.DEVICES_FOUND,
      devices,
      selectedVideoId: '12345',
      selectedAudioId: 'default'
    })
  })

  it('startClicked should create START_CLICKED action', () => {
    expect(actions.startClicked()).to.deep.equal({ type: types.START_CLICKED })
  })

  it('soundMeterInitialized should create SOUND_METER_INITIALIZED action', () => {
    expect(actions.soundMeterInitialized('sm')).to.deep.equal({
      type: types.SOUND_METER_INITIALIZED,
      sm: 'sm'
    })
  })
})
