const grayMatter = require('gray-matter')

module.exports = function getFrontMatter (description = '') {
  const matter = grayMatter(description)

  return {
    id: matter.data.id,
    category: matter.data.category,
    parent: matter.data.parent,
    title: matter.data.title,
    order: matter.data.order || '',
    describes: matter.data.describes,
    description: matter.content
  }
}
