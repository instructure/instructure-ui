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

import React from 'react'
import IconHeart from '@instructure/ui-icons/lib/Line/IconHeart'
import IconApple from '@instructure/ui-icons/lib/Line/IconApple'
import IconBank from '@instructure/ui-icons/lib/Line/IconBank'
/* eslint-disable instructure-ui/no-relative-package-imports */
import Button from '../../../../../ui-buttons/lib/components/Button'
import AccessibleContent from '../../../../../ui-a11y/lib/components/AccessibleContent'
/* eslint-disable instructure-ui/no-relative-package-imports */
import Select from '../index'

export const sizeSmall = () => {
  return (
  <Select
    size="small"
    label="Small"
    assistiveText="3 options available. Use arrow keys to navigate options."
  >
    <option value="foo">Foo</option>
    <option value="bar">Bar</option>
    <option value="baz">Baz</option>
  </Select>
  )
}

export const sizeMedium = () => {
  return (
  <Select
    size="medium"
    label="Medium"
    assistiveText="3 options available. Use arrow keys to navigate options."
  >
    <option value="foo">Foo</option>
    <option value="bar">Bar</option>
    <option value="baz">Baz</option>
  </Select>
  )
}

export const sizeLarge = () => {
  return (
  <Select
    size="large"
    label="Large"
    assistiveText="3 options available. Use arrow keys to navigate options."
  >
    <option value="foo">Foo</option>
    <option value="bar">Bar</option>
    <option value="baz">Baz</option>
  </Select>
  )
}

export const layoutStacked = () => {
  return (
  <Select
    label="Stacked"
    layout="stacked"
    assistiveText="3 options available. Use arrow keys to navigate options."
  >
    <option value="foo">Foo</option>
    <option value="bar">Bar</option>
    <option value="baz">Baz</option>
  </Select>
  )
}

export const layoutInline = () => {
  return (
  <Select
    label="Inline"
    layout="inline"
    assistiveText="3 options available. Use arrow keys to navigate options."
  >
    <option value="foo">Foo</option>
    <option value="bar">Bar</option>
    <option value="baz">Baz</option>
  </Select>
  )
}

export const layoutDisabled = () => {
  return (
  <Select
    disabled
    label="Disabled"
    assistiveText="3 options available. Use arrow keys to navigate options."
  >
    <option value="foo">Foo</option>
    <option value="bar">Bar</option>
    <option value="baz">Baz</option>
  </Select>
  )
}

export const withIcon = () => {
  return (
  <Select
    label="Options with icons"
    assistiveText="3 options available. Use arrow keys to navigate options."
  >
    <option value="foo" icon={IconHeart}>Foo</option>
    <option value="bar" icon={IconApple}>Bar</option>
    <option value="baz" icon={IconBank}>Baz</option>
  </Select>
  )
}

export const withOptGroup = () => {
  return (
    <Select label="Option Group Select">
      <optgroup label="Group One">
        <option value="item1">Item One</option>
        <option value="item2">Item Two</option>
      </optgroup>
      <optgroup label="Group Two">
        <option value="item3">Item Three</option>
      </optgroup>
      <optgroup label="Group Three" icon={IconHeart}>
        <option value="item4">Item Four</option>
        <option value="item5">Item Five</option>
      </optgroup>
    </Select>
  )
}

export const error = () => {
  return (
    <Select
      layout="inline"
      label="Choose a snack"
      messages={[{ text: 'You need to make a selection', type: 'error' }]}>
      <option value="apples">Apples</option>
      <option value="oranges">Oranges</option>
      <option value="bananas">Bananas</option>
      <option value="candy" disabled>Candy</option>
    </Select>
  )
}

export const success = () => {
  return (
    <Select
      label="Choose a snack"
      messages={[{ text: 'Great job choosing something healthy!', type: 'success' }]}>
      <option value="apples">Apples</option>
      <option value="oranges">Oranges</option>
      <option value="bananas">Bananas</option>
      <option value="candy" disabled>Candy</option>
    </Select>
  )
}

class AutocompleteExample extends React.Component {
  render () {
    const options = [
      'Alabama', 'Alaska', 'American Samoa', 'Arizona',
      'Arkansas', 'California', 'Colorado', 'Connecticut',
      'Delaware', 'District Of Columbia',
      'Federated States Of Micronesia', 'Florida', 'Georgia',
      'Guam', 'Hawaii', 'Idaho', 'Illinois'
    ]

    return (
      <Select
        {...this.props}
        assistiveText="Start typing to search. Press the down arrow to navigate results."
        formatSelectedOption={(tag) => (
          <AccessibleContent alt={`Remove ${tag.label}`}>{tag.label}</AccessibleContent>
        )}
      >
        {options.map((label, index) => (
          <option key={label} value={'' + index}>
            {label}
          </option>
        ))}
      </Select>
    )
  }
}

export const singleAutocomplete = () => {
  return (
    <AutocompleteExample
      label="Choose a state"
      name="state"
      defaultOption="12"
      editable
    />
  )
}

export const multipleAutocomplete = () => {
  return (
    <AutocompleteExample
      label="Choose a few states"
      name="states"
      defaultOption={["0", "12", "15"]}
      editable
      multiple
    />
  )
}

class PersistentExample extends React.Component {
  constructor () {
    super(...arguments)
    this.persistentOptions = [
      { label: 'Apples', value: '0', dismissible: false },
      { label: 'Bananas', value: '1', dismissible: false }
    ]
    this.state = {
      options: [...this.persistentOptions]
    }
  }

  handleChange = (e, opts) => {
    const options = [
      ...this.persistentOptions,
      ...opts.slice(this.persistentOptions.length)
    ]
    console.log(options) // eslint-disable-line no-console
    this.setState({ options })
  }

  clear = () => {
    this.setState({
      options: [...this.persistentOptions]
    })
  }

  getOptionLabel () {
    const { options } = this.state
    return options.map((o) => o.label).join(', ')
  }

  render () {
    return (
      <div>
        <Select
          multiple
          label="Choose some fruit"
          editable
          {...this.props}
          selectedOption={this.state.options}
          onChange={this.handleChange}
        >
          <option value="0">Apples</option>
          <option value="1">Bananas</option>
          <option value="2">Oranges</option>
          <option value="3">Mangoes</option>
          <option value="4">Pears</option>
          <option value="5">Cherries</option>

        </Select>
        <div>Value selected: {this.getOptionLabel()}</div>
        <br />
        <Button onClick={this.clear}>Clear Selections</Button>
      </div>
    )
  }
}

export const persistentOptions = () => {
  return (
    <PersistentExample />
  )
}
