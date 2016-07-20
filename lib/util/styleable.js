import { PropTypes } from 'react'
import { StyleContextTypes, getStyleContext } from './StyleContextTypes'
import { injectBrandVariables, getComponentCss } from './themeUtils'
import StyleManager from './StyleManager'
import shortid from 'shortid'

const STYLE_MANAGER = new StyleManager()

/**
 * Mark component as styleable.
 * Injects styles into document head when component is mounted unless `styles` prop is set to `false`
 */
export default function styleable (styles, variables = {}) {
  const _STYLES = styles
  const _VARIABLES = variables

  return function (ComposedComponent) {
    const _COMPONENT_NAME = ComposedComponent.displayName || ComposedComponent.name
    const _STYLE_ID = _COMPONENT_NAME + '__' + shortid.generate()

    class StyleableComponent extends ComposedComponent {
      static displayName = _COMPONENT_NAME

      static contextTypes = {
        ...ComposedComponent.contextTypes,
        ...StyleContextTypes
      }

      static propTypes = {
        ...ComposedComponent.propTypes,
        styles: PropTypes.bool // set to false to disable injecting styles
      }

      constructor (props, context) {
        super(props, context)

        this._cssCache = null
      }

      componentWillMount () {
        const context = getStyleContext(this.context)
        const injectStyle = context ? context.injectStyle : STYLE_MANAGER.addStyle
        const cssText = this.getCssText()

        if (cssText) {
          // inject the brand global variables into the document
          // because they might be referenced in cssText
          this._brandStyleId = injectBrandVariables(injectStyle)

          // store the cssText to compare on next update
          this._cssCache = cssText
          // inject the style css into the document
          this._styleId = injectStyle(cssText, _STYLE_ID)
        }

        if (super.componentWillMount) {
          super.componentWillMount()
        }
      }

      componentDidUpdate (prevProps, prevState) {
        const cssText = this.getCssText()

        // if the cssText has changed since last added to the doc
        if (cssText !== this._cachedCssText) {
          this._cssCache = cssText
          STYLE_MANAGER.updateStyle(cssText, _STYLE_ID)
        }

        if (super.componentDidUpdate) {
          super.componentDidUpdate(prevProps, prevState)
        }
      }

      componentWillUnmount () {
        if (this._brandStyleId) {
          STYLE_MANAGER.removeStyle(this._brandStyleId)
        }

        if (this._styleId) {
          STYLE_MANAGER.removeStyle(this._styleId)
        }

        if (super.componentWillUnmount) {
          super.componentWillUnmount()
        }
      }

      getCssText () {
        if (this.props.styles === false) {
          return false
        } else {
          return getComponentCss(_COMPONENT_NAME, (this.props.styles || _STYLES), _VARIABLES)
        }
      }
    }

    return StyleableComponent
  }
}
