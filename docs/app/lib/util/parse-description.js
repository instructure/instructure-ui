import marked from 'marked'

// https://github.com/sapegin/react-styleguidist/blob/master/loaders/examples.loader.js
const EXAMPLE_PLACEHOLDER = '<%{#example#}%>'

export default function parseDescription (markdown) {
  const examples = []

  const renderer = new marked.Renderer()
  renderer.code = function (code, language) {
    if (language === 'jsx_example' ||
        language === 'jsx_example_inverse' ||
        language === 'js_example' ||
        language === 'js_example_inverse') {
      const variant = (language === 'jsx_example_inverse' || language === 'js_example_inverse') ? 'inverse' : null
      const lang = (language === 'js_example' || language === 'js_example_inverse') ? 'js' : 'jsx'
      examples.push({ code, variant, lang })

      return EXAMPLE_PLACEHOLDER
    } else {
      return marked.Renderer.prototype.code.apply(this, arguments)
    }
  }

  const html = marked(markdown, {renderer: renderer})

  const sections = []
  const textChunks = html.split(EXAMPLE_PLACEHOLDER)
  textChunks.forEach(function (chunk) {
    const example = examples.shift()

    if (chunk) {
      sections.push({type: 'html', content: chunk})
    }

    if (example && example.code) {
      sections.push({
        type: 'code',
        variant: example.variant,
        content: example.code,
        language: example.lang
      })
    }
  })

  return sections
}
