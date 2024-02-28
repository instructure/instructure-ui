/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 - present Instructure, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { Select, View, Alert } from '@instructure/ui'

class SingleSelectExample extends React.Component {
  state = {
    inputValue: this.props.options[0].label,
    isShowingOptions: false,
    highlightedOptionId: null,
    selectedOptionId: this.props.options[0].id,
    announcement: null
  }

  getOptionById(queryId) {
    return this.props.options.find(({ id }) => id === queryId)
  }

  handleShowOptions = (event) => {
    this.setState({
      isShowingOptions: true
    })
  }

  handleHideOptions = (event) => {
    const { selectedOptionId } = this.state
    const option = this.getOptionById(selectedOptionId).label
    this.setState({
      isShowingOptions: false,
      highlightedOptionId: null,
      inputValue: selectedOptionId ? option : '',
      announcement: 'List collapsed.'
    })
  }

  handleBlur = (event) => {
    this.setState({
      highlightedOptionId: null
    })
  }

  handleHighlightOption = (event, { id }) => {
    event.persist()
    const optionsAvailable = `${this.props.options.length} options available.`
    const nowOpen = !this.state.isShowingOptions
      ? `List expanded. ${optionsAvailable}`
      : ''
    const option = this.getOptionById(id).label
    this.setState((state) => ({
      highlightedOptionId: id,
      inputValue: event.type === 'keydown' ? option : state.inputValue,
      announcement: `${option} ${nowOpen}`
    }))
  }

  handleSelectOption = (event, { id }) => {
    const option = this.getOptionById(id).label
    this.setState({
      selectedOptionId: id,
      inputValue: option,
      isShowingOptions: false,
      announcement: `"${option}" selected. List collapsed.`
    })
  }

  render() {
    const {
      inputValue,
      isShowingOptions,
      highlightedOptionId,
      selectedOptionId,
      announcement
    } = this.state

    return (
      <div>
        <Select
          renderLabel="Single Select"
          assistiveText="Use arrow keys to navigate options."
          inputValue={inputValue}
          isShowingOptions={isShowingOptions}
          onBlur={this.handleBlur}
          onRequestShowOptions={this.handleShowOptions}
          onRequestHideOptions={this.handleHideOptions}
          onRequestHighlightOption={this.handleHighlightOption}
          onRequestSelectOption={this.handleSelectOption}
        >
          {this.props.options.map((option) => {
            return (
              <Select.Option
                id={option.id}
                key={option.id}
                isHighlighted={option.id === highlightedOptionId}
                isSelected={option.id === selectedOptionId}
              >
                {option.label}
              </Select.Option>
            )
          })}
        </Select>
        <Alert
          liveRegion={() => document.getElementById('flash-messages')}
          liveRegionPoliteness="assertive"
        >
          {announcement}
        </Alert>
      </div>
    )
  }
}

const SELECT_IUI = () => {
  return (
    <View>
      <SingleSelectExample
        options={[
          { id: 'opt1', label: 'Alaska' },
          { id: 'opt2', label: 'American Samoa' },
          { id: 'opt3', label: 'Arizona' },
          { id: 'opt4', label: 'Arkansas' },
          { id: 'opt5', label: 'California' },
          { id: 'opt6', label: 'Colorado' },
          { id: 'opt7', label: 'Connecticut' },
          { id: 'opt8', label: 'Delaware' },
          { id: 'opt9', label: 'District Of Columbia' },
          { id: 'opt10', label: 'Federated States Of Micronesia' },
          { id: 'opt11', label: 'Florida' },
          { id: 'opt12', label: 'Georgia (unavailable)' },
          { id: 'opt13', label: 'Guam' },
          { id: 'opt14', label: 'Hawaii' },
          { id: 'opt15', label: 'Idaho' },
          { id: 'opt16', label: 'Illinois' }
        ]}
      />
    </View>
  )
}

export default SELECT_IUI
