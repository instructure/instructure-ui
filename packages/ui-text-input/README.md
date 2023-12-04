---
category: packages
---

## ui-text-input

[![npm][npm]][npm-url]&nbsp;
[![MIT License][license-badge]][license]&nbsp;
[![Code of Conduct][coc-badge]][coc]

A styled HTML text input component.

### Components

The `ui-text-input` package contains the following:

- [TextInput](#TextInput)

### Installation

```sh
npm install @instructure/ui-text-input
```

### Usage

```javascript
---
type: code
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
        <TextInput
          renderLabel="What is your favorite ice cream flavor?"
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
[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
