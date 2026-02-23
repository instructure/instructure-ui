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
responsibility to provide the DOM structure to layout the component on the page. We provide
a standard implementation of that in [`InPlaceEdit`](/#InPlaceEdit), which is where you
will find examples.

Using `Editable` gives you complete control, over how in-place editing
should look.

```js
---
type: example
---
const Example = (props) => {
  const [mode, setMode] = useState(props.mode || 'view')
  const [value, setValue] = useState(props.value || '')
  const [readOnly, setReadOnly] = useState(false)

  const renderButton = ({
    isVisible,
    onClick,
    onFocus,
    onBlur,
    buttonRef
  }) => {
    if (readOnly) {
      return null
    }

    // To correctly handle focus, always return the Button, but
    // only visible if isVisible (if you want the UI to work in the standard way)
    return (
      <span style={{ opacity: isVisible ? 1 : 0 }}>
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

  const renderViewer = () => {
    return <span>{value}</span>
  }

  const handleValueChange = (event) => {
    setValue(event.target.value)
  }

  const handleModeChange = (newMode) => {
    setMode(newMode)
  }

  const renderEditor = ({ onBlur, editorRef }) => {
    return (
      <input
        ref={editorRef}
        onBlur={onBlur}
        value={value}
        onChange={handleValueChange}
      />
    )
  }

  const renderMe = ({
    mode,
    getContainerProps,
    getViewerProps,
    getEditorProps,
    getEditButtonProps
  }) => {
    return (
      <View {...getContainerProps()}>
        {mode === 'view' ? renderViewer(getViewerProps()) : null}
        {mode === 'edit' ? renderEditor(getEditorProps()) : null}
        {renderButton(getEditButtonProps())}
      </View>
    )
  }

  const onChangeReadOnly = (event) => {
    setReadOnly(event.target.checked)
  }

  return (
    <View as="div">
      <View as="div" margin="0 0 small 0">
        <Checkbox
          size="small"
          label="Read Only"
          checked={readOnly}
          onChange={onChangeReadOnly}
        />
      </View>
      <Editable
        mode={mode}
        onChangeMode={handleModeChange}
        render={renderMe}
        value={value}
        readOnly={readOnly}
      />
    </View>
  )
}

render(<Example value="you can edit me" />)
```
