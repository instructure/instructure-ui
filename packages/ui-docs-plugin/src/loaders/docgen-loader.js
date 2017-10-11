const path = require('path')
const loaderUtils = require('loader-utils')
const grayMatter = require('gray-matter')
const reactDocgen = require('react-docgen')
const jsdoc = require('jsdoc-api')

const extractComments = require('../utils/extractComments')
const getOptions = require('../utils/getOptions')

const ERROR_MISSING_DEFINITION = 'No suitable component definition found.'

const DOCS = {}

module.exports = function DocgenLoader (source) {
  this.cacheable && this.cacheable()

  const context = this.context || process.cwd()
  const resourcePath = this.resourcePath

  const options = getOptions()

  let doc = {
    documentType: 'unknown'
  }

  if (resourcePath.includes('.js')) {
    try {
      doc = reactDocgen.parse(source)
      doc.documentType = 'react'
    } catch (e1) {
      if (e1.message !== ERROR_MISSING_DEFINITION) {
        reportError(e1, this.request)
      }
    }

    if (!doc.props) {
      try {
        doc = jsdoc.explainSync({ source })[0]
        doc.documentType = 'jsdoc'
      } catch (e2) {
        reportError(e2, this.request)
      }
    }
  } else if (resourcePath.includes('.md')) {
    doc.documentType = 'markdown'
  } else {
    try {
      doc.comments = extractComments(source)
      doc.description = doc.comments.filter(d => d.type === 'doc')[0].text
      doc.documentType = 'comments'
    } catch (e3) {
      reportError(e3, this.request)
    }
  }

  const matter = grayMatter(doc.description || source)
  const template = identifier(options, resourcePath, matter, context)
  const id = loaderUtils.interpolateName(this, template, {})
  const relativePath = path.relative(options.projectRoot, resourcePath)

  if (Object.keys(DOCS).includes(id) && DOCS[id] !== relativePath) {
    console.warn('\x1b[33m%s\x1b[0m', `[${id}] is a duplicate id!!!!!!!`)
  }

  DOCS[id] = relativePath

  // eslint-disable-next-line no-console
  console.log(`[${id}] ${relativePath}`)

  doc = Object.assign(doc, {
    id,
    description: matter.content, // this removes the front matter
    category: matter.data.category,
    parent: matter.data.parent,
    title: matter.data.title || id,
    srcPath: srcPath(resourcePath, options, context),
    srcUrl: srcUrl(resourcePath, options, context)
  })

  if (resourcePath.includes('.js')) {
    doc = Object.assign(doc, {
      packageName: packageName(resourcePath, options, context),
      requirePath: requirePath(resourcePath, options, context)
    })
  }

  return `
  module.hot && module.hot.accept([])

  const doc = ${JSON.stringify(doc)}

  ${resourcePath.includes('.js') ? `doc.component = require(${JSON.stringify(resourcePath)}).default` : ''}

  module.exports = doc
`
}

function reportError (error, request) {
  console.warn('\x1b[33m%s\x1b[0m', '[docgen-loader]: Error when parsing ', request)
  console.warn(error.toString())
}

function pathParts (resourcePath, library = {}) {
  let parts = resourcePath.split(path.sep).filter((part) => part !== library.packages && part !== 'index.js')
  if (library.scope) {
    parts = [library.scope].concat(parts)
  }
  if (!library.packages) {
    parts = [library.name].concat(parts)
  }
  return parts
}

function relativePath (resourcePath, options) {
  return path.relative(options.projectRoot || process.cwd(), resourcePath)
}

function srcPath (resourcePath, options, context) {
  if (typeof options.srcPath === 'function') {
    return options.srcPath(resourcePath, context)
  } else {
    return relativePath(resourcePath, options)
  }
}

function srcUrl (resourcePath, options, context) {
  if (typeof options.srcUrl === 'function') {
    return options.srcUrl(resourcePath, context)
  } else {
    const path = srcPath(resourcePath, options, context)
    const library = options.library || {}
    return library.repository ? `${library.repository.replace('.git', '')}/tree/master/${path}` : null
  }
}

function requirePath (resourcePath, options, context) {
  if (typeof options.requirePath === 'function') {
    return options.requirePath(resourcePath, context)
  } else {
    return pathParts(relativePath(resourcePath, options).replace('/src/', '/lib/'), options.library)
      .join(path.sep).replace(path.extname(resourcePath), '')
  }
}

function packageName (resourcePath, options, context) {
  const parts = requirePath(resourcePath, options, context).split(path.sep)

  if (options.library.scope) {
    return parts.slice(0, 2).join(path.sep)
  } else {
    return parts[0]
  }
}

function identifier (options, resourcePath, matter, context) {
  if (typeof options.identifier === 'function') {
    return options.identifier(resourcePath, matter, context)
  } else if (typeof options.identifier === 'string') {
    return options.identifier
  } else if (matter.data.id) {
    return matter.data.id
  } else if (resourcePath.includes('/index.js') || resourcePath.includes('README.md')) {
    return '[folder]'
  } else {
    return '[name]'
  }
}
