import marked from 'marked'

// https://github.com/sapegin/react-styleguidist/blob/master/loaders/examples.loader.js
const EXAMPLE_PLACEHOLDER = '<%{#example#}%>'

export default function parseDescription (markdown) {
  const examples = []

  const renderer = new marked.Renderer()
  renderer.code = function (code, language) {
    if (language === 'jsx_example') {
      examples.push(code)
      return EXAMPLE_PLACEHOLDER
    } else {
      return marked.Renderer.prototype.code.apply(this, arguments)
    }
  }

  const html = marked(markdown, {renderer: renderer})

  const sections = []
  const textChunks = html.split(EXAMPLE_PLACEHOLDER)
  textChunks.forEach(function (chunk) {
    const code = examples.shift()
    if (chunk) {
      sections.push({type: 'html', content: chunk})
    }
    if (code) {
      sections.push({type: 'code', content: code})
    }
  })
  return sections
}
