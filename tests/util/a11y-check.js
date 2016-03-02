import defer from 'lodash.defer'
import reject from 'lodash.reject'

require('script!axe-core/axe.min.js')
/*global axe*/

function formatViolations (violations) {
  return violations.map((violation) => {
    return (
      [
        '[' + violation.id + '] ' + violation.help,
        violation.helpUrl + '\n'
      ].join('\n')
    )
  })
}

export default function checkA11y (node, options = {}) {
  const exclude = options.exclude || []
  const ignores = options.ignores || []
  const axeConfig = {
    runOnly: {
      type: 'tag',
      values: ['wcag2a', 'wcag2aa', 'section508', 'best-practice']
    }
  }

  axe.a11yCheck({ include: [node], exclude }, axeConfig, (result) => {
    const violations = reject(result.violations, function (violation) {
      return (ignores.indexOf(violation.id) >= 0)
    })

    if (violations.length > 0) {
      const err = formatViolations(violations)
      if (typeof options.onFailure === 'function') {
        options.onFailure(err, violations)
      } else {
        defer(function () {
          throw new Error(err)
        })
      }
    } else if (typeof options.onSuccess === 'function') {
      options.onSuccess()
    }
  })
}
