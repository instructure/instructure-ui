/**
--
category: packages/media-capture
--
**/

/**
 * Function to be called to check if the clients browser
 * can support the getUserMedia/Stream and MediaRecorder api's.
 * https://caniuse.com/#search=getusermedia
 * https://caniuse.com/#search=mediarecorder
 */
export function canUseMediaCapture () {
  return true
}

/**
 * Object representing the various media-capture states.
 */
export const mediaCaptureStates = {
  FINISHED: true,
  PREVIEWSAVE: true,
  READY: true,
  RECORDING: true,
  SAVING: true,
  STARTING: true
}
