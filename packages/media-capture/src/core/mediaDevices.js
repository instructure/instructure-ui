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
import SoundMeter from './soundMeter'

const defaultConstraints = {
  audio: {
    sampleRate: 48000,
    channelCount: 2,
    volume: 1.0
  },
  video: {
    width: 1280,
    height: 720,
    frameRate: 30
  }
}

export function getUserMedia (audioId, videoId, success, error) {
  const constraints = {
    audio: {
      ...defaultConstraints.audio,
      deviceId: audioId
    },
    video: {
      ...defaultConstraints.video,
      deviceId: videoId
    }
  }

  navigator.mediaDevices.getUserMedia(constraints)
    .then(stream => success(stream))
    .catch(err => error(err))
}

export function enumerateDevices (success, error) {
  navigator.mediaDevices.enumerateDevices()
    .then(devices => {
      const deviceTypes = devices.reduce((d, curr) => {
        switch (curr.kind) {
          case 'audioinput':
            return {
              audioinput: [...d.audioinput, curr],
              videoinput: [...d.videoinput]
            }
          case 'videoinput':
            return {
              videoinput: [...d.videoinput, curr],
              audioinput: [...d.audioinput]
            }
          default:
            return {
              videoinput: [...d.videoinput],
              audioinput: [...d.audioinput]
            }
        }
      }, { audioinput: [], videoinput: [] })

      success(deviceTypes)
    })
    .catch(e => error(e))
}

export function getAudioContext (stream, success, error) {
  const audioContext = new AudioContext()
  const soundMeter = new SoundMeter(audioContext)
  soundMeter.connectToSource(stream, (e) => {
    if (e) { error(e) }

    success(soundMeter)
  })
}
