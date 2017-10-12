module.exports = function trimIndent (str) {
  const lines = `${str.replace(/\r\n/g, '\n').replace(/\r/g, '\n')}\n`.split('\n')
  let indent = false
  let trimmed = ''

  lines.forEach((line, i) => {
    line.replace(/\s*$/, '')

    if (indent === false) {
      if (line === '') {
        return
      }
      indent = line.match(/^\s*/)[0]
    }

    trimmed += `${line.replace(new RegExp(`^${indent}`), '', 1)}\n`
  })

  return trimmed
}
