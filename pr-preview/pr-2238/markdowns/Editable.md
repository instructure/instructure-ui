# Editable


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


### Props

| Component | Prop | Type | Required | Default | Description |
|-----------|------|------|----------|---------|-------------|
| Editable | mode | `'view' \| 'edit'` | Yes | - | If `'view'`: the view component is rendered, if `'edit'`: the edit component is rendered |
| Editable | onChangeMode | `(newMode: string) => void` | Yes | - | Called when the component's mode changes. |
| Editable | children | `(props: EditableRenderProps) => React.ReactNode` | No | `null` | Function that you can supply that will return the children of this component. It has one parameter has the following fields: - mode: `view` or `edit`, depending on whether the view or the editor should be rendered. - getContainerProps(props) - Props to be spread onto the container element - getEditorProps(props) - Props to be spread onto the editor element - getEditButtonProps(props) - Props to be spread onto the edit button element |
| Editable | render | `(props: EditableRenderProps) => React.ReactNode` | No | - | Identical to children |
| Editable | value | `any` | No | - | The current value. The value is managed by the consuming app, but we need to tell Editable it's changed or it won't re-render |
| Editable | onChange | `(value: any) => void` | No | - | Called when Editable switches from edit to view mode and the value has changed. |
| Editable | readOnly | `boolean` | No | `false` | The mode is fixed as 'view' |
| Editable | elementRef | `(element: Element \| null) => void` | No | - | provides a reference to the underlying html root element (container) |

### Usage

Install the package:

```shell
npm install @instructure/ui-editable
```

Import the component:

```javascript
/*** ES Modules (with tree shaking) ***/
import { Editable } from '@instructure/ui-editable'
```

