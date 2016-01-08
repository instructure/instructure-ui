import _ from 'lodash'

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

export default function checkA11y (node, options) {
  options = options || {}

  axe.a11yCheck(node, (result) => {
    const ignores = options.ignores || []
    const violations = _.reject(result.violations, function (violation) {
      return (ignores.indexOf(violation.id) >= 0)
    })

    if (violations.length > 0) {
      const err = formatViolations(violations)
      if (typeof options.onFailure === 'function') {
        options.onFailure(err, violations)
      } else {
        _.defer(function () {
          throw new Error(err)
        })
      }
    } else if (typeof options.onSuccess === 'function') {
      options.onSuccess()
    }
  })
}
