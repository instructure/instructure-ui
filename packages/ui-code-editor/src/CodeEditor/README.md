---
describes: CodeEditor
---

A wrapper around the popular [CodeMirror](https://codemirror.net/) text editor.

### Note!

If you are testing a component that utilizes `CodeEditor` as a sub component with `jest`, then from version _8.15.0_ and upwards those test might start to **fail**. This is because the `CodeMirror` language options - which depend on browser API's - are now being statically imported instead of dynamically imported when the browser is available.

`CodeMirror` depends on specific browser API - `document.createRange` -, and since `document.createRange` is not defined in `jsdom`, we have to mock it in order to fix the failing test(s):

```js
...
// yourFailingComponent.test.js
beforeAll(() => {
  // CodeMirror langague options depend on createRange function
  // which is not defined in jsdom environments
  Document.prototype.createRange = function () {
    return {
      setEnd: function () {},
      setStart: function () {},
      getBoundingClientRect: function () {
        return { right: 0 }
      },
      getClientRects: function () {
        return {
          length: 0,
          left: 0,
          right: 0
        }
      }
    }
  }
})
test('should render', () => {
  // YourComponent uses InstUI's CodeEditor under the hood
  const { container } = render(<YourComponent />)

  expect(container).toBeInTheDocument()
})
```

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
