import * as types from '../../constants/ActionTypes'
import * as actions from '../index'

describe('mediaCapture actions', () => {
  it('audioDeviceChanged should create AUDIO_DEVICE_CHANGED action', () => {
    expect(actions.audioDeviceChanged('102nsdfsdf02')).to.deep.equal({
      type: types.AUDIO_DEVICE_CHANGED,
      id: '102nsdfsdf02'
    })
  })

  it('closeClicked should create CLOSE_CLICKED action', () => {
    expect(actions.closeClicked()).to.deep.equal({
      type: types.CLOSE_CLICKED
    })
  })

  it('countdownComplete should create COUNTDOWN_COMPLETE action', () => {
    expect(actions.countdownComplete()).to.deep.equal({
      type: types.COUNTDOWN_COMPLETE
    })
  })

  it('finishClicked should create FINISH_CLICKED action', () => {
    expect(actions.finishClicked()).to.deep.equal({
      type: types.FINISH_CLICKED
    })
  })

  it('onComplete should create ONCOMPLETE action', () => {
    expect(actions.onComplete()).to.deep.equal({
      type: types.ONCOMPLETE
    })
  })

  it('saveClicked should create SAVE_CLICKED action', () => {
    expect(actions.saveClicked()).to.deep.equal({
      type: types.SAVE_CLICKED
    })
  })

  it('startClicked should create SAVE_CLICKED action', () => {
    expect(actions.saveClicked()).to.deep.equal({
      type: types.SAVE_CLICKED
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
})
