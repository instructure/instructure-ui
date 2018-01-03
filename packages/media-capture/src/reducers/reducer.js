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
  VIDEO_DEVICE_CHANGED
} from '../constants/ActionTypes'

import {
  FINISHED,
  PREVIEWSAVE,
  READY,
  RECORDING,
  SAVING,
  STARTING
} from '../constants/CaptureStates'

const initialState = {
  captureState: READY
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case AUDIO_DEVICE_CHANGED:
      return {
        ...state,
        audioDeviceId: action.id
      }

    case CLOSE_CLICKED:
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

    case FINISH_CLICKED:
      if (state.captureState !== RECORDING) { return state }

      return {
        ...state,
        captureState: PREVIEWSAVE
      }

    case ONCOMPLETE:
      if (state.captureState !== SAVING) { return state }

      return {
        ...state,
        captureState: FINISHED
      }

    case SAVE_CLICKED:
      if (state.captureState !== PREVIEWSAVE) { return state }

      return {
        ...state,
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

      return {
        ...state,
        captureState: READY
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

    default:
      return state
  }
}
