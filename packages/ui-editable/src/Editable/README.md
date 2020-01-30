---
describes: Editable
---

The `Editable` component exists to support in-place editing of content on the page.
Perhaps you have a page with some text, say the heading, that you'd like to let the user
edit right there in-place. `Editable` manages the user's interactions which will flip
the rendering from the view mode to the edit mode in an accessible way. It is then just up
to the consumer of `Editable` to provide _render properties_ which return the view component
and the edit component.

Where `Editable` provides the state management and user interactions, it is not its
responsibility to provide the DOM structure to layout the component on the page.  We provide
a standard implementation of that in [`InPlaceEdit`](/#InPlaceEdit), which is where you
will find examples.

Using `Editable` gives you complete control, over how in-place editing
should look.

```js
---
example: true
render: false
---
class Example extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      mode: props.mode || 'view',
      value: props.value || '',
      buttonHasFocus: false,
      readOnly: false
    }
    this.onFocusEditButton = null;
  }

  renderButton ({ isVisible, onClick, onFocus, onBlur, buttonRef }) {
    if(this.state.readOnly) {
      return null
    }

     // To correctly handle focus, always return the Button, but
     // only visible if isVisible (if you want the UI to work in the standard way)
    return (
      <span style={{opacity: isVisible ? 1 : 0}}>
        <Button
          size="small"
          margin="0 0 0 x-small"
          onClick={onClick}
          onFocus={onFocus}
          onBlur={onBlur}
          elementRef={buttonRef}
        >
          Do it!
        </Button>
      </span>
    )
  }

  renderViewer () {
    return <span>{this.state.value}</span>
  }

  handleValueChange = (event) => {
    this.setState({value: event.target.value})
  }

  handleModeChange = (newMode) => {
    this.setState({mode: newMode})
  }

  renderEditor ({ onBlur, editorRef }) {
    return (
      <input
        ref={editorRef}
        onBlur={onBlur}
        value={this.state.value}
        onChange={this.handleValueChange}
      />
    )
  }

  renderMe = ({mode, getContainerProps, getViewerProps, getEditorProps, getEditButtonProps}) => {
    return (
      <View
        {...getContainerProps()}
      >
        {mode === 'view' ? this.renderViewer(getViewerProps()) : null}
        {mode === 'edit' ? this.renderEditor(getEditorProps()): null}
        {this.renderButton(getEditButtonProps())}
      </View>
    )
  }

  onChangeReadOnly = (event) => {
    this.setState({readOnly: event.target.checked})
  }

  render () {
    return  (
      <View as="div">
        <View as="div" margin="0 0 small 0">
          <Checkbox size="small" label="Read Only" checked={this.state.readOnly} onChange={this.onChangeReadOnly}/>
        </View>
        <Editable
          mode={this.state.mode}
          onChangeMode={this.handleModeChange}
          render={this.renderMe}
          value={this.state.value}
          readOnly={this.state.readOnly}
        />
      </View>
    )
  }

}
render(<Example value="you can edit me" />)
```
