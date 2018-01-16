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
