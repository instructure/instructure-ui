const constraints = {
  audio: false,
  video: {
    width: 1280,
    height: 720,
    frameRate: 30
  }
}

export function getUserMedia (success, error) {
  navigator.mediaDevices.getUserMedia(constraints)
    .then(stream => success(stream))
    .catch(err => error(err))
}
