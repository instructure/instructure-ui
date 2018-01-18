export const FINISHED = 'FINISHED'
export const PREVIEWSAVE = 'PREVIEWSAVE'
export const READY = 'READY'
export const RECORDING = 'RECORDING'
export const SAVING = 'SAVING'
export const STARTING = 'STARTING'
export const LOADING = 'LOADING'
export const ERROR = 'ERROR'

export function getInitialState (onCompleted) {
  return {
    captureState: LOADING,
    videoSrc: '',
    videoBlob: '',
    msg: '',
    devices: {
      audioinput: [],
      videoinput: []
    },
    audioDeviceId: '',
    videoDeviceId: '',
    fileName: '',
    onCompleted: onCompleted
  }
}
