import {
  AUDIO_DEVICE_CHANGED,
  CLOSE_CLICKED,
  COUNTDOWN_COMPLETE,
  FINISH_CLICKED,
  ONCOMPLETE,
  SAVE_CLICKED,
  START_CLICKED,
  STARTOVER_CLICKED,
  TITLE_EDITED,
  VIDEO_DEVICE_CHANGED,
  DEVICE_REQUEST_ACCEPTED,
  MEDIA_RECORDER_INITIALIZED,
  VIDEO_OBJECT_GENERATED,
  ERROR_OCCURRED,
  DEVICES_FOUND,
  AUDIO_SIGNAL_EMITTED,
  SOUND_METER_INITIALIZED
} from '../constants/ActionTypes'

import {
  FINISHED,
  PREVIEWSAVE,
  READY,
  RECORDING,
  SAVING,
  STARTING,
  LOADING,
  ERROR,
  getInitialState
} from '../constants/CaptureStates'

export default function reducer (state, action) {
  switch (action.type) {
    case AUDIO_DEVICE_CHANGED:
      return {
        ...state,
        audioDeviceId: action.id
      }

    case SOUND_METER_INITIALIZED:
      return {
        ...state,
        soundMeter: action.sm
      }

    case CLOSE_CLICKED:
      state.soundMeter && state.soundMeter.stop()

      if ([READY, STARTING, RECORDING, PREVIEWSAVE].includes(state.captureState)) {
        return {
          ...state,
          captureState: READY
        }
      } else {
        return state
      }

    case COUNTDOWN_COMPLETE:
      if (state.captureState !== STARTING) { return state }

      return {
        ...state,
        captureState: RECORDING
      }

    case DEVICE_REQUEST_ACCEPTED:
      return {
        ...state,
        captureState: READY
      }

    case DEVICES_FOUND:
      return {
        ...state,
        devices: action.devices,
        audioDeviceId: action.devices.audioinput[0].deviceId,
        videoDeviceId: action.devices.videoinput[0].deviceId
      }

    case ERROR_OCCURRED:
      return {
        ...state,
        msg: action.msg,
        captureState: ERROR
      }

    case FINISH_CLICKED: {
      if (state.captureState !== RECORDING) { return state }

      state.mediaRecorder && state.mediaRecorder.stop()
      state.soundMeter && state.soundMeter.stop()

      return {
        ...state,
        fileName: action.fileName,
        captureState: PREVIEWSAVE
      }
    }

    case ONCOMPLETE: {
      if (state.captureState !== SAVING) { return state }

      state.onCompleted(new File([state.videoBlob], state.fileName, { type: 'webm' }))

      return {
        ...getInitialState()
      }
    }

    case MEDIA_RECORDER_INITIALIZED:

      return {
        ...state,
        mediaRecorder: action.mr
      }

    case SAVE_CLICKED:
      if (state.captureState !== PREVIEWSAVE) { return state }

      return {
        ...state,
        fileName: action.fileName,
        captureState: SAVING
      }

    case START_CLICKED:
      if (state.captureState !== READY) { return state }

      return {
        ...state,
        captureState: STARTING
      }

    case STARTOVER_CLICKED:
      if (![RECORDING, PREVIEWSAVE].includes(state.captureState)) { return state }

      state.mediaRecorder && state.mediaRecorder.stop()
      state.soundMeter && state.soundMeter.stop()

      return {
        ...getInitialState()
      }

    case TITLE_EDITED:
      return {
        ...state,
        title: action.text
      }

    case VIDEO_DEVICE_CHANGED:
      return {
        ...state,
        videoDeviceId: action.id
      }

    case VIDEO_OBJECT_GENERATED:
      return {
        ...state,
        videoSrc: action.src,
        videoBlob: action.blob
      }

    default:
      return state
  }
}
