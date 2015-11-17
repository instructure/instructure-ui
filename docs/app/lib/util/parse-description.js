import marked from 'marked'

// https://github.com/sapegin/react-styleguidist/blob/master/loaders/examples.loader.js
const CODE_PLACEHOLDER = '<%{#code#}%>'

export default function parseDescription (markdown) {
  const codeChunks = []

  const renderer = new marked.Renderer()
  renderer.code = function (code) {
    codeChunks.push(code)
    return CODE_PLACEHOLDER
  }

  const html = marked(markdown, {renderer: renderer})

  const chunks = []
  const textChunks = html.split(CODE_PLACEHOLDER)
  textChunks.forEach(function (chunk) {
    const code = codeChunks.shift()
    if (chunk) {
      chunks.push({type: 'html', content: chunk})
    }
    if (code) {
      chunks.push({type: 'code', content: code})
    }
  })
  return chunks
}
