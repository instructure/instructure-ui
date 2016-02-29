import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import shallowEqual from 'shallowequal'

export default class ScopedStyle extends Component {
  static propTypes = {
    /**
    *  parent node id or some other selector that you want to use to scope the css
    */
    scope: PropTypes.string.isRequired,
    /**
    * css that you want to scope to children of the parent node
    */
    children: PropTypes.node
  };

  componentDidMount () {
    this.polyfillScopedStyle()
  }

  componentDidUpdate (prevProps) {
    if (prevProps.scope !== this.props.scope ||
        !shallowEqual(prevProps.children, this.props.children)) {
      this.polyfillScopedStyle()
    }
  }

  polyfillScopedStyle () {
    const styleNode = ReactDOM.findDOMNode(this)

    if (styleNode.scoped) {
      return // if scoped styles are supported, we can just leave the styles alone
    }

    const parentSheet = styleNode.sheet || styleNode.getSheet
    const allRules = parentSheet.cssRules || parentSheet.rules
    const scope = this.props.scope

    let index = allRules.length || 0

    // we need to loop through the rules backwards because IE only allows inserting rules at the end
    while (index--) {
      const rule = allRules[index]
      processCssRules(rule, index)
    }

    function processCssRules (parentRule, index) {
      const allRules = parentRule.cssRules || [parentRule]
      let i = allRules.length || 0
      const ruleIndex = parentRule.cssRules ? i : index
      let selector = ''

      // we need to loop through the rules backwards because IE only allows inserting rules at the end
      while (i--) {
        const rule = allRules[i]
        if (rule.selectorText) {
          let parts = rule.selectorText.split(',')

          // add the scope prop to the selectors to scope the rules
          parts = parts.map((part) => scope + part + ', ' + scope + ' ' + part)
          selector = parts.join(', ')
          selector = selector.replace(/[\ ]+:root/gi, '')

          try {
            rule.selectorText = selector
          } catch (e) {
            // catch errors for IE
          }

          // handle IE:
          if ((rule.selectorText.toLowerCase() !== selector) && (!rule.type || rule.type === 1)) {
            const sheet = parentRule.cssRules ? parentRule : parentSheet
            const styleRule = rule.style.cssText

            if (styleRule) { // IE doesn't allow inserting of '' as a styleRule
              sheet.deleteRule(ruleIndex)
              sheet.insertRule(selector + '{' + styleRule + '}', ruleIndex)
            }
          }
        } else if (rule.cssRules) {
          processCssRules(rule, ruleIndex)
        }
      }
    }
  }

  render () {
    // add scoped attribute for FF https://developer.mozilla.org/en-US/docs/Web/HTML/Element/style#A_scoped_stylesheet
    return (
      <style scoped dangerouslySetInnerHTML={{__html: this.props.children}}>
      </style>
    )
  }
}

