export function startMediaRecorder (stream, onMediaRecorderInit, success, error) {
  const chunks = []
  const mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm' })
  onMediaRecorderInit(mediaRecorder)
  mediaRecorder.start(10)
  mediaRecorder.ondataavailable = (e) => chunks.push(e.data)
  mediaRecorder.onerror = (e) => error(e)
  mediaRecorder.onstop = (e) => {
    const blob = new Blob(chunks, { type: 'video/webm' })
    success(blob)
  }
}
