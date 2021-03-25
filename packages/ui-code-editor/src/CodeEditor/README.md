---
describes: CodeEditor
---

A wrapper around the popular [CodeMirror](https://codemirror.net/) text editor.

### Code layout

The CodeEditor component can be used to display code via the `defaultValue` prop.

```js
---
example: true
render: false
---
class Example extends React.Component {
  constructor (props) {
    super()
    this.state = { code: `function findSequence(goal) {
  function find(start, history) {
    if (start == goal)
      return history;
    else if (start > goal)
      return null;
    else
      return find(start + 5, "(" + history + " + 5)") ||
             find(start * 3, "(" + history + " * 3)");
  }
  return find(1, "1");
}` }
  }

  handleChange = (value) => {
    this.setState({ code: value})
  }

  render () {
    return (
      <CodeEditor
        label='code editor'
        value={this.state.code}
        language='javascript'
        options={{ lineNumbers: false }}
        onChange={this.handleChange}
      />
    )
  }
}

render(<Example />)
```
