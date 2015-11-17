export const guidesContext = require.context('docs', true, /^\.\/.*\.md$/)
export default function loadGuides () {
  return guidesContext.keys().map((path) => {
    const id = path
      .replace('.md', '')
      .replace(/[\.\/]/g, '')
      .replace(/(\w+)/g, function (match) {
        return match.charAt(0).toUpperCase() + match.slice(1)
      })
    const title = id.replace(/[_-]/g, ' ')
    return {
      title,
      path,
      id
    }
  })
}
