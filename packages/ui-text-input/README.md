---
category: packages
---

## ui-text-input

[![npm][npm]][npm-url]
[![build-status][build-status]][build-status-url]
[![MIT License][license-badge]][LICENSE]
[![Code of Conduct][coc-badge]][coc]

A UI component library made by Instructure Inc.

### Installation

```sh
yarn add @instructure/ui-text-input
```

### Components
The `ui-text-input` package contains the following:
- [TextInputControlled](#TextInputControlled)

```javascript
---
example: true
render: false
---
class ControlledTextInputExample extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      value: 'Mint chocolate chip'
    }
  }

  handleChange = (e, value) => this.setState({ value })

  render () {
    return (
      <View as="div">
        <TextInputControlled
          label="What is your favorite ice cream flavor?"
          value={this.state.value}
          onChange={this.handleChange}
        />
        <View as="div" margin="medium none none">
          <code>this.state.value = {this.state.value}</code>
        </View>
      </View>
    )
  }
}

render(<ControlledTextInputExample />)
```

[npm]: https://img.shields.io/npm/v/@instructure/ui-text-input.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-text-input

[build-status]: https://travis-ci.org/instructure/instructure-ui.svg?branch=master
[build-status-url]: https://travis-ci.org/instructure/instructure-ui "Travis CI"

[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE

[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
