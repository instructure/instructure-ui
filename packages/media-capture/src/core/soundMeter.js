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
export default class SoundMeter {
  constructor (context) {
    this.context = context
    this.processor = this.context.createScriptProcessor(512)
    this.processor.volume = 0
    this.processor.averaging = 0.95
    this.processor.onaudioprocess = this.consumeBuffer
  }

  connectToSource (stream, callback) {
    try {
      this.mic = this.context.createMediaStreamSource(stream)
      this.mic.connect(this.processor)
      this.processor.connect(this.context.destination)
      callback(null)
    } catch (e) {
      callback(e)
    }
  }

  stop () {
    this.mic.disconnect()
    this.processor.disconnect()
  }

  consumeBuffer (event) {
    const buf = event.inputBuffer.getChannelData(0)
    const bufLength = buf.length
    let sum = 0
    let x

    for (let i = 0; i < bufLength; i++) {
      x = buf[i]
      sum += x * x
    }

    const rms = Math.sqrt(sum / bufLength)
    this.volume = Math.max(rms, this.volume * this.averaging)
  }
}
