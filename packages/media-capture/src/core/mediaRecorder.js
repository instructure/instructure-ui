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
import { Decoder, Reader, tools } from 'ts-ebml'

const FILE_TYPE = 'video/webm; codecs="vp8, opus"'

function startMediaRecorder (stream, onMediaRecorderInit, success, error) {
  const mediaFile = new MediaFile(stream, FILE_TYPE, success, error)
  onMediaRecorderInit(mediaFile.mediaRecorder)
  mediaFile.mediaRecorder.start(10)
}

class MediaFile {
  constructor (stream, fileType, fileSuccess, fileError) {
    this.stream = stream
    this.fileType = fileType
    this.fileSuccess = fileSuccess
    this.fileError = fileError

    this.tasks = Promise.resolve()
    this.decoder = new Decoder()
    this.reader = new Reader()
    this.chunks = []

    this.mediaRecorder = new MediaRecorder(stream, { mimeType: this.fileType })
    this.mediaRecorder.ondataavailable = this.addToChunks
    this.mediaRecorder.onerror = this.onError
    this.mediaRecorder.onstop = this.onStop
  }

  addToChunks = (e) => {
    this.chunks.push(e.data)
    const task = () => this.readAsArrayBuffer(e.data).then((buf) => {
      const elms = this.decoder.decode(buf)
      elms.forEach((elm) => { this.reader.read(elm) })
    }).catch((e) => {
      this.onError(e)
    })

    return this.tasks.then(() => task() )
  }

  readAsArrayBuffer = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsArrayBuffer(blob)
      reader.onloadend = () => { resolve(reader.result) }
      reader.onerror = (ev) => { reject(ev.error) }
    })
  }

  onError = (e) => {
    this.fileError(e)
  }

  onStop = async () => {
    try {
      await this.tasks
      let webM = new Blob(this.chunks, { type: FILE_TYPE })

      if (this.chunks && this.chunks[0].type !== 'audio/ogg') {
        const webMBuf = await this.readAsArrayBuffer(webM)
        const refinedMetadataBuf = tools.makeMetadataSeekable(
          this.reader.metadatas, this.reader.duration, this.reader.cues
        )
        const body = webMBuf.slice(this.reader.metadataSize)
        webM = new Blob([refinedMetadataBuf, body], { type: FILE_TYPE })
      }
      this.fileSuccess(webM)
    } catch (e) {
      this.onError(e)
    }
  }
}

export { startMediaRecorder }
export default MediaFile
