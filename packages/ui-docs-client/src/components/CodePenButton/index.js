import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ScreenReaderContent from '@instructure/ui-core/lib/components/ScreenReaderContent'
import Tooltip from '@instructure/ui-core/lib/components/Tooltip'
import SVGIcon from '@instructure/ui-core/lib/components/SVGIcon'

import Button from '../Button'

export default class CodePenButton extends Component {
  static propTypes = {
    code: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    language: PropTypes.string.isRequired,
    options: PropTypes.object // eslint-disable-line react/forbid-prop-types
  }

  static defaultProps = {
    options: {}
  }

  render () {
    const js = (this.props.language.includes('jsx'))
    ? `
    const Example = function () {
      return (
        ${this.props.code}
      )
    }

    ReactDOM.render(<Example />, document.getElementById('app'))
    `
    : `
    ${this.props.code}
    ReactDOM.render(<Example />, document.getElementById('app'))
    `
    const data = {
      title: this.props.title,
      js,
      private: true,
      editors: '001',
      html: '<div id="app"></div>',
      layout: 'top',
      css_prefix: 'autoprefixer',
      js_pre_processor: 'babel',
      ...this.props.options
    }
    /* eslint-disable max-len */
    return (
      <form action="https://codepen.io/pen/define" method="POST" target="_blank">
        <input type="hidden" name="data" value={JSON.stringify(data)} />
        <Tooltip variant="inverse" tip="Edit in Codepen" placement="bottom">
          <Button type="submit" size="small">
            <ScreenReaderContent>{`Edit ${this.props.title} in Codepen`}</ScreenReaderContent>
            <SVGIcon viewBox="0 0 1792 1792" title="Codepen">
              <path d="M216 1169l603 402v-359l-334-223zm-62-144l193-129-193-129v258zm819 546l603-402-269-180-334 223v359zm-77-493l272-182-272-182-272 182zm-411-275l334-223v-359l-603 402zm960 93l193 129v-258zm-138-93l269-180-603-402v359zm485-180v546q0 41-34 64l-819 546q-21 13-43 13t-43-13l-819-546q-34-23-34-64v-546q0-41 34-64l819-546q21-13 43-13t43 13l819 546q34 23 34 64z" />
            </SVGIcon>
          </Button>
        </Tooltip>
      </form>
    )
    /* eslint-enable max-len */
  }
}
