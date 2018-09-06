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
import SoundMeter from '../soundMeter'

describe('SoundMeter', () => {
  const testbed = new Testbed()

  const closeStub = testbed.stub()
  const disconnectStub = testbed.stub()
  const audioContext = () => {
    return {
      createScriptProcessor: () => {
        return {
          disconnect: disconnectStub
        }
      },
      state: '',
      close: closeStub
    }
  }

  it ('initializes', () => {
    const soundMeter = new SoundMeter(audioContext())
    expect(soundMeter.volume).to.eql(0)
    expect(soundMeter.averaging).to.eql(0.95)
  })

  it("consumes an event's inputBuffer and calculates a weighted root mean square", () => {
    const inputBuffer = {
      getChannelData: () => {
        return [2, 5, 6, 2, 8, 10, 15, 16, 20, 24, 21]
      }
    }
    const soundMeter = new SoundMeter(audioContext())
    soundMeter.consumeBuffer({ inputBuffer })
    expect(soundMeter.volume).to.eql(13.918594495396176)
  })

  it('cleans up', () => {
    const soundMeter = new SoundMeter(audioContext())
    soundMeter.context.state = 'inactive'
    soundMeter.stop()
    expect(closeStub).to.have.been.called()
    expect(disconnectStub).to.have.been.called()
  })
})
