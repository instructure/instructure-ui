module.exports = function getCodeDoc (source, error) {
  const doc = {}
  try {
    doc.sections = (parseComments(source) || [])
      .filter(section => section.type === 'doc')
    doc.description = doc.sections[0].description
    doc.undocumented = doc.sections.length === 0
  } catch (err) {
    error(err)
  }
  return doc
}

function parseComments (source) {
  const commentRegex = {
    single:        /^\s*\/\/.*$/,
    docblockStart: /^\s*\/\*\*\s*$/,
    multiStart:    /^\s*\/\*+\s*$/,
    multiFinish:   /^\s*\*\/\s*$/
  }

  const lines = `${source.replace(/\r\n/g, '\n').replace(/\r/g, '\n')}\n`.split('\n')
  const blocks = []

  let block = {
    type: null,
    line: 0,
    text: '',
    raw: ''
  }
  let indentAmount = false

  function parseLine (line, i) {
    // Single-line parsing.
    if (block.type !== 'multi' && block.type !== 'doc' && line.match(commentRegex.single)) {
      block.raw += `${line}\n`
      // Add the current line (and a newline) minus the comment marker.
      block.description += `${line.replace(/^\s*\/\/\s?/, '')}\n`
      if (block.type !== 'single') {
        block.line = i + 1
      }
      block.type = 'single'
      return
    }

    // If we have reached the end of the current block, save it.
    if (block.type && line.match(commentRegex.multiFinish)) {
      const doneWithCurrentLine = block.type !== 'single'
      block.description = block.description.replace(/^\n+/, '').replace(/\n+$/, '')
      blocks.push(block)
      indentAmount = false
      block = {
        type: null,
        line: 0,
        text: '',
        raw: ''
      }
      // If we "found" the end of a single-line comment block, we are not done
      // processing the current line and cannot skip the rest of this loop.
      if (doneWithCurrentLine) {
        return
      }
    }

    // Docblock parsing.
    if (line.match(commentRegex.docblockStart)) {
      block.type = 'doc'
      block.raw += `${line}\n`
      block.line = i + 1
      return
    }

    if (block.type === 'doc') {
      block.raw += `${line}\n`
      // Add the current line (and a newline) minus the comment marker.
      block.description += `${line.replace(/^\s*\*\s?/, '')}\n`
      return
    }

    // Multi-line parsing.
    if (line.match(commentRegex.multiStart)) {
      block.type = 'multi'
      block.raw += `${line}\n`
      block.line = i + 1
      return
    }

    if (block.type === 'multi') {
      block.raw += `${line}\n`
      // If this is the first interior line, determine the indentation amount.
      if (indentAmount === false) {
        // Skip initial blank lines.
        if (line === '') {
          return
        }
        indentAmount = line.match(/^\s*/)[0]
      }
      // Always strip same indentation amount from each line.
      block.description += `${line.replace(new RegExp(`^${indentAmount}`), '', 1)}\n`
    }
  }

  lines.forEach((line, i) => {
    parseLine(line.replace(/\s*$/, ''))
  })

  return blocks
}
