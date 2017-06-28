import reject from 'lodash/reject' // eslint-disable-line import/no-extraneous-dependencies

// eslint-disable-next-line import/no-extraneous-dependencies, import/no-webpack-loader-syntax, import/no-unresolved
require('script-loader!axe-core/axe.min.js')
/* global axe */

const formatError = function (violations) {
  return violations.map((violation) => {
    return [
      '[' + violation.id + '] ' + violation.help,
      violation.nodes.map((node) => {
        return node.target.toString()
      }).join('\n'),
      violation.description,
      violation.helpUrl + '\n'
    ].join('\n')
  })
}

export default function checkA11y (node, options = {}, done) {
  const exclude = options.exclude || []
  const ignores = options.ignores || []
  const axeConfig = {
    runOnly: {
      type: 'tag',
      values: ['wcag2a', 'wcag2aa', 'section508', 'best-practice']
    }
  }

  axe.a11yCheck({ include: [node], exclude }, axeConfig, (result) => {
    const violations = reject(result.violations, (violation) => {
      return (ignores.indexOf(violation.id) >= 0)
    })

    violations.forEach((violation) => {
      /* eslint-disable no-console */
      console.groupCollapsed('[' + violation.id + '] ' + violation.help)
      violation.nodes.forEach((node) => {
        const el = document.querySelector(node.target.toString())
        if (!el) {
          console.log(node.target.toString())
        } else {
          console.log(el)
        }
      })
      console.groupEnd()
      /* eslint-enable no-console */
    })

    done({
      violations,
      error: violations.length > 0 ? new Error(formatError(violations)) : null
    })
  })
}
