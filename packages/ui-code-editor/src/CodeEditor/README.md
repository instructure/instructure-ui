---
describes: CodeEditor
---

A wrapper around the popular [CodeMirror](https://codemirror.net/5/index.html) text editor.

```javascript
---
type: embed
---
<ToggleBlockquote
  summary="Upgrade to SourceCodeEditor!"
>
  <ToggleBlockquote.Paragraph>
    The CodeEditor component is a wrapper for the (older) <Link href="https://codemirror.net/5/index.html" target='_blank'>CodeMirror version 5</Link>.
  </ToggleBlockquote.Paragraph>
  <ToggleBlockquote.Paragraph>
    The new <Link href="https://codemirror.net/" target='_blank'>CodeMirror version 6</Link> is not 100% compatible with V5, so we've made a new wrapper component for it named <Link href="/#SourceCodeEditor">SourceCodeEditor</Link>.
  </ToggleBlockquote.Paragraph>
  <ToggleBlockquote.Paragraph>
    See the <Link href="/#CodeEditor/#migration-guide">migration guide</Link> at the bottom of this page.
  </ToggleBlockquote.Paragraph>
</ToggleBlockquote>
```

### Code layout

The CodeEditor component can be used to display code via the `defaultValue` prop.

```js
---
type: example
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

### Note! Guide for testing with Jest

If you are testing a component that utilizes `CodeEditor` as a sub component with `jest`, then from version _8.15.0_ and upwards those test might start to **fail**. This is because the `CodeMirror` language options - which depend on browser API's - are now being statically imported instead of dynamically imported when the browser is available.

`CodeMirror` depends on specific browser API - `document.createRange` -, and since `document.createRange` is not defined in `jsdom`, we have to mock it in order to fix the failing test(s):

```js
---
type: code
---
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

### Migration Guide

| Property      | Changed? | Notes                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| ------------- | :------: | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| label         |    no    | It is still used as label for screen readers.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| language      |    no    | The `language` property has the same values. `<SourceCodeEditor>` has autocomplete and better syntax highlighting.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| value         |   yes    | This prop is needed for the controlled version. The `<SourceCodeEditor>` has a a `defaultValue` prop for uncontrolled mode (recommended to use for the `readOnly` versions too).                                                                                                                                                                                                                                                                                                                                                                                                                               |
| onChange      |   yes    | It is now required for controlled mode (when a `value` prop is provided).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| readOnly      | slightly | The `readOnly` prop now only accepts boolean. Instead of the special `nocursor` value the `<SourceCodeEditor>` has an `editable` prop: when `editable={false}` the editor is not focusable anymore.                                                                                                                                                                                                                                                                                                                                                                                                            |
| attachment    | visually | The property works the same as before, but the top/bottom margins changed slightly when attached, and since the background color of the editor is now white, it is recommend to check if changes are needed.                                                                                                                                                                                                                                                                                                                                                                                                   |
| options       |   yes    | `<SourceCodeEditor>` doesn't have an `options` prop anymore, because the way CodeMirror V6 handles options completely changed. Instead of an options object it can be configured with adding and manually updating "extensions". We've added the most commonly used options as separate props to `<SourceCodeEditor>` (e.g.: `lineNumbers`, `lineWrapping`, `autofocus`, `spellcheck`, `direction`, `rtlMoveVisually`). See the [SourceCodeEditor](/#SourceCodeEditor) documentation for all available options. (Please contact us in case you need extra functionality to be implemented in the new version!) |
| themeOverride |   yes    | The theme and style of `<SourceCodeEditor>` is completely different. The syntax highlighting is using CodeMirror's own color palette. Please consult the new [SourceCodeEditor theme variables table](/#SourceCodeEditor/#SourceCodeEditorTheme).                                                                                                                                                                                                                                                                                                                                                              |
