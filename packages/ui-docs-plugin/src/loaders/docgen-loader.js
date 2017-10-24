const path = require('path')
const loaderUtils = require('loader-utils')
const grayMatter = require('gray-matter')
const reactDocgen = require('react-docgen')
const jsdoc = require('jsdoc-api')

const extractComments = require('../utils/extractComments')
const getOptions = require('../utils/getOptions')
const parseResourcePath = require('../utils/parseResourcePath')

const ERROR_MISSING_DEFINITION = 'No suitable component definition found.'

const DOCS = {}

module.exports = function DocgenLoader (source) {
  this.cacheable && this.cacheable()

  const context = this.context || process.cwd()
  const options = getOptions(loaderUtils.getOptions(this))
  const resourcePath = parseResourcePath(this.resourcePath, options, context)

  let doc = {
    documentType: 'unknown'
  }

  if (resourcePath.extension === '.js') {
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
        const sections = jsdoc.explainSync({ source })
          .filter((section) => {
            return section.undocumented !== true && section.access !== 'private' && section.kind !== 'package'
          })
        const module = sections.filter(section => section.kind === 'module')[0] || sections[0] || {}
        doc = {
          ...module,
          sections: sections
            .filter(section => section.longname !== module.longname)
            .map((section) => {
              const parts = section.longname.split('.')
              const name = section.longname.replace(`${module.longname}.`, '')
              return {
                ...section,
                id: name,
                title: name
              }
            }),
          undocumented: sections.length <= 0,
          documentType: 'jsdoc'
        }
      } catch (e2) {
        reportError(e2, this.request)
      }
    }
  } else if (resourcePath.extension === '.md') {
    doc.documentType = 'markdown'
    doc.description = source
  } else {
    try {
      doc.sections = (extractComments(source) || [])
        .filter(section => section.type === 'doc')
      doc.description = doc.sections[0].description
      doc.undocumented = doc.sections.length === 0
      doc.documentType = 'comments'
    } catch (e3) {
      reportError(e3, this.request)
    }
  }

  const matter = grayMatter(doc.description || '')
  const template = identifier(options, resourcePath.path, matter, context)
  const id = loaderUtils.interpolateName(this, template, {})

  if (Object.keys(DOCS).includes(id) && DOCS[id] !== resourcePath.relativePath) {
    console.warn('\x1b[33m%s\x1b[0m', `[${id}] is a duplicate id!!!!!!!`)
  }

  DOCS[id] = resourcePath.relativePath

  // eslint-disable-next-line no-console
  console.log(`[${id}] ${resourcePath.relativePath}`)

  doc = Object.assign(doc, {
    id,
    description: matter.content, // this removes the front matter
    category: matter.data.category,
    parent: matter.data.parent,
    title: matter.data.title || id,
    order: matter.data.order || '',
    srcPath: resourcePath.srcPath,
    srcUrl: resourcePath.srcUrl
  })

  if (resourcePath.extension === '.js') {
    doc = Object.assign(doc, {
      packageName: resourcePath.packageName,
      requirePath: resourcePath.requirePath
    })
  }

  return `
  module.hot && module.hot.accept([])

  const doc = ${JSON.stringify(doc)}

  ${resourcePath.extension === '.js' ? `doc.resource = ${resourcePath.require}` : ''}

  module.exports = doc
`
}

function reportError (error, request) {
  console.warn('\x1b[33m%s\x1b[0m', '[docgen-loader]: Error when parsing ', request)
  console.warn(error.toString())
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
