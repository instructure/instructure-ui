const path = require('path')

module.exports = function getPathInfo (resourcePath, options, context) {
  return {
    relativePath: path.relative(options.projectRoot, resourcePath),
    extension: path.extname(resourcePath),
    srcPath: srcPath(resourcePath, options, context),
    srcUrl: srcUrl(resourcePath, options, context),
    packageName: packageName(resourcePath, options, context),
    requirePath: requirePath(resourcePath, options, context),
    requireStr: `require('${resourcePath}').default`
  }
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
  const { srcPath } = options.document
  if (typeof srcPath === 'function') {
    return srcPath(resourcePath, context)
  } else {
    return relativePath(resourcePath, options)
  }
}

function srcUrl (resourcePath, options, context) {
  const { srcUrl } = options.document
  if (typeof srcUrl === 'function') {
    return srcUrl(resourcePath, context)
  } else {
    const path = srcPath(resourcePath, options, context)
    const library = options.library || {}
    return library.repository ? `${library.repository.replace('.git', '')}/tree/master/${path}` : null
  }
}

function requirePath (resourcePath, options, context) {
  const { requirePath } = options.document
  if (typeof requirePath === 'function') {
    return requirePath(resourcePath, context)
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
