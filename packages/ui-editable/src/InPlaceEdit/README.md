---
describes: InPlaceEdit
---

`InPlaceEdit` provides the DOM structure to organize the components that participate
in in-place editing by calling the `renderViewer` and `renderEditor` _render props_
in the context of the containing DOM sub-tree. It also takes care of wiring up the
event handlers required by [`Editable`](#Editable) to make the user interactions work.

As a controlled component, it is the responsibility of the consumer to maintain some data to make this work.
Each time `InPlaceEdit` is rendered, you must provide as props:

- the current `mode` prop, which defaults to `'view'`. The app will be notified of
  changes in mode via the `onChangeMode` function property.
- the current `value` prop, which primarily serves to trigger a re-render when the value changes

The view component, as returned by the `renderViewer` property can be anything you wish, but
will typically render some formatted text. It is up to the consumer to provide this component with
the current value.

The edit component, as returned by the `renderEditor` property is used to collect the user's
input. It is up to the consumer to provide the necessary properties to get the user provided value
(typically `onChange`), and to provide the current value.

Some components, like [Heading](#Heading) and [Text](#Text) can be made editable by setting their `as` property
to `input` (and optionally the `type` property). The value of this approach is that the editable version
will render in the same style as the view, making for a nice user experience. Other transitions,
`Text` to `Select` or `DateTimeInput` for example, result in a wholesale change in the component's UI, and will alter
the space it consumes in the app.

Use `InPlaceEdit` to edit `Text` using `Text as="input"`. Also demonstrates how you might wish to handle
the case when the text is empty. Use the checkbox to switch between inline and block layout.

```js
---
type: example
---
  const Example = (props) => {
    const [mode, setMode] = useState(props.mode || 'view')
    const [value, setValue] = useState('This is some text')
    const [inline, setInline] = useState(true)

    // You must provide this to Editable to be
    // notified of mode changes
    const handleChangeMode = (mode) => {
      setMode(mode)
    }

    // You attach an event handler to your edit component
    // to be notified of value changes from user interactions
    const handleChange = (event) => {
      setValue(event.target.value)
    }

    // Renders the view component
    // Be sure to give it the current value
    const renderView = () => (
      <Text
        color={value ? 'primary' : 'secondary'}
        weight={value ? 'normal' : 'light'}
        size="large"
      >
        {value || 'Enter some text'}
      </Text>
    )

    // Renders the edit component.
    // You have to forward the props on, which
    // includes an onBlur property to help manage
    // the mode changes.
    // Be sure to give it the current value
    const renderEdit = ({ onBlur, editorRef }) => (
      <Text
        color="primary"
        size="large"
        as="input"
        type="text"
        value={value}
        onChange={handleChange}
        aria-label="The title"
        onBlur={onBlur}
        elementRef={editorRef}
      />
    )

    // Renders the edit button.
    // Leverage the default implementation provided by InPlaceEdit
    const renderEditButton = (props) => {
      props.label = `Edit title "${value}"`
      return InPlaceEdit.renderDefaultEditButton(props)
    }

    const onChangeLayout = (event) => {
      setInline(event.target.checked)
    }

    return (
      <View as="div">
        <InPlaceEdit
          renderViewer={renderView}
          renderEditor={renderEdit}
          renderEditButton={renderEditButton}
          onChangeMode={handleChangeMode}
          mode={mode}
          value={value}
          inline={inline}
        />
        <View as="div" margin="small 0">
          <Checkbox label="inline" checked={inline} onChange={onChangeLayout} />
        </View>
      </View>
    )
  }

  render(<Example />)
```

A readOnly `InPlaceEdit`

```js
---
type: example
---
  const Example = (props) => {
    const [mode, setMode] = useState(props.mode || 'view')
    const [value, setValue] = useState('This is some text')

    // You must provide this to Editable to be
    // notified of mode changes
    const handleChangeMode = (mode) => {
      setMode(mode)
    }

    // You attach an event handler to your edit component
    // to be notified of value changes from user interactions
    const handleChange = (event) => {
      setValue(event.target.value)
    }

    // Renders the view component
    // Be sure to give it the current value
    const renderView = () => <Text size="large">{value}</Text>

    // Renders the edit component.
    // You have to forward the props on, which
    // includes an onBlur property to help manage
    // the mode changes.
    // Be sure to give it the current value
    const renderEdit = ({ onBlur, editorRef }) => (
      <Text
        size="large"
        as="input"
        type="text"
        value={value}
        onChange={handleChange}
        aria-label="The title"
        onBlur={onBlur}
        elementRef={editorRef}
      />
    )

    // Renders the edit button.
    // Leverage the default implementation provided by InPlaceEdit
    const renderEditButton = (props) => {
      props.label = `Edit title "${value}"`
      return InPlaceEdit.renderDefaultEditButton(props)
    }

    return (
      <InPlaceEdit
        readOnly
        renderViewer={renderView}
        renderEditor={renderEdit}
        renderEditButton={renderEditButton}
        onChangeMode={handleChangeMode}
        mode={mode}
        value={value}
      />
    )
  }

  render(<Example />)
```

To edit end-justified text, wrap `<InPlaceEdit />` in a
`<View>` component, as follows:

```js
---
type: example
---
  const Example = (props) => {
    const [mode, setMode] = useState(props.mode || 'view')
    const [value, setValue] = useState('This is some text')

    // You must provide this to Editable to be
    // notified of mode changes
    const handleChangeMode = (mode) => {
      setMode(mode)
    }

    // You attach an event handler to your edit component
    // to be notified of value changes from user interactions
    const handleChange = (event) => {
      setValue(event.target.value)
    }

    // Renders the view component
    // Be sure to give it the current value
    const renderView = () => <Text size="large">{value}</Text>

    // Renders the edit component.
    // You have to forward the props on, which
    // includes an onBlur property to help manage
    // the mode changes.
    // Be sure to give it the current value
    const renderEdit = ({ onBlur, editorRef }) => (
      <Text
        size="large"
        as="input"
        type="text"
        value={value}
        onChange={handleChange}
        aria-label="The title"
        onBlur={onBlur}
        elementRef={editorRef}
      />
    )

    // Renders the edit button.
    // Leverage the default implementation provided by InPlaceEdit
    const renderEditButton = (props) => {
      props.label = `Edit title "${value}"`
      return InPlaceEdit.renderDefaultEditButton(props)
    }

    return (
      <View as="div" textAlign="end">
        <InPlaceEdit
          renderViewer={renderView}
          renderEditor={renderEdit}
          renderEditButton={renderEditButton}
          onChangeMode={handleChangeMode}
          mode={mode}
          value={value}
          editButtonPlacement="start"
        />
      </View>
    )
  }

  render(<Example />)
```

Same as the first example, but notifies `Editable`'s `onChange`
when the user has finished editing and the value has changed.

```js
---
type: example
---
  const Example = (props) => {
    const [mode, setMode] = useState(props.mode || 'view')
    const [value, setValue] = useState('Edit me')
    const [onChangeValue, setOnChangeValue] = useState(undefined)

    // typically provided by the application so it can
    // be notified of value changes when the user is
    // finished editing
    const onChange = (newValue) => {
      setOnChangeValue(newValue)
    }

    // You must provide this to Editable to be
    // notified of mode changes
    const handleChangeMode = (mode) => {
      setMode(mode)
    }

    // You attach an event handler to your edit component
    // to be notified of value changes from user interactions
    const handleChange = (event) => {
      setValue(event.target.value)
    }

    // Renders the view component
    // Be sure to give it the current value
    const renderView = () => <Text size="large">{value}</Text>

    // Renders the edit component.
    // You have to forward the props on, which
    // includes an onBlur property to help manage
    // the mode changes.
    // Be sure to give it the current value
    const renderEdit = ({ onBlur, editorRef }) => (
      <Text
        size="large"
        as="input"
        type="text"
        value={value}
        onChange={handleChange}
        aria-label="The title"
        onBlur={onBlur}
        elementRef={editorRef}
      />
    )

    // Renders the edit button.
    // Leverage the default implementation provided by InPlaceEdit
    const renderEditButton = (props) => {
      props.label = `Edit title "${value}"`
      return InPlaceEdit.renderDefaultEditButton(props)
    }

    return (
      <View as="div">
        <InPlaceEdit
          renderViewer={renderView}
          renderEditor={renderEdit}
          renderEditButton={renderEditButton}
          onChangeMode={handleChangeMode}
          mode={mode}
          value={value}
          onChange={onChange}
        />
        <div>
          <Text fontStyle="italic">
            {onChangeValue !== undefined
              ? `onChange said: ${onChangeValue}`
              : `You haven't edited me yet!`}
          </Text>
        </div>
      </View>
    )
  }

  render(<Example />)
```
