---
describes: CodeEditor
---

### Code layout

The CodeEditor component can be used to display code via the `defaultValue` prop.

```js
---
example: true
---
<CodeEditor
  label='code editor'
  defaultValue={`function findSequence(goal) {
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
}`}
  language='javascript'
  options={{ lineNumbers: false }}
/>
```

Controlled

```js
---
example: true
render: false
---
class Example extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      value: `
<div>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Hac habitasse <strong>platea dictumst</strong> vestibulum rhoncus est pellentesque. Aliquet bibendum enim facilisis gravida. Sem et tortor consequat id porta. Enim nulla aliquet porttitor lacus.
</div>`
    }
  }

  handleChange = (value) => {
    this.setState({value})
  }

  render () {
    return (
      <>
        <View as="div" borderWidth="small" padding="small" margin="small" dangerouslySetInnerHTML={{__html: this.state.value}}/>
        <CodeEditor
          label='code editor'
          value={this.state.value}
          onChange={this.handleChange}
          language='html'
          options={{ lineNumbers: true, lineWrapping: true }}
        />
      </>
    )
  }
}

render(<Example />)
```
