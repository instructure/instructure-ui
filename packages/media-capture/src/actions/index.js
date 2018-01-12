import * as types from '../constants/ActionTypes'

export const audioDeviceChanged = id => ({ type: types.AUDIO_DEVICE_CHANGED, id })
export const closeClicked = () => ({ type: types.CLOSE_CLICKED })
export const countdownComplete = () => ({ type: types.COUNTDOWN_COMPLETE })
export const finishClicked = () => ({ type: types.FINISH_CLICKED })
export const onComplete = () => ({ type: types.ONCOMPLETE })
export const startClicked = () => ({ type: types.START_CLICKED })
export const startoverClicked = () => ({ type: types.STARTOVER_CLICKED })
export const titleEdited = text => ({ type: types.TITLE_EDITED, text })
export const videoDeviceChanged = id => ({ type: types.VIDEO_DEVICE_CHANGED, id })
export const deviceRequestAccepted = () => ({ type: types.DEVICE_REQUEST_ACCEPTED })
export const mediaRecorderInitialized = (mr) => ({ type: types.MEDIA_RECORDER_INITIALIZED, mr })
export const videoObjectGenerated = (src) => ({ type: types.VIDEO_OBJECT_GENERATED, src })
export const errorOccurred = (msg) => ({ type: types.ERROR_OCCURRED, msg })
export const devicesFound = (devices) => ({ type: types.DEVICES_FOUND, devices })

export const saveClicked = () => {
  return (dispatch) => {
    dispatch({ type: types.SAVE_CLICKED })

    // simulate async saving
    setTimeout(() => {
      dispatch(onComplete())
    }, 1500)
  }
}
