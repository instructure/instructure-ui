# InPlaceEdit


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

- ```js
  class Example extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        mode: props.mode || 'view',
        value: 'This is some text',
        inline: true
      }
    }

    // You must provide this to Editable to be
    // notified of mode changes
    handleChangeMode = (mode) => {
      this.setState({ mode })
    }

    // You attach an event handler to your edit component
    // to be notified of value changes from user interactions
    handleChange = (event) => {
      this.setState({ value: event.target.value })
    }

    // Renders the view component
    // Be sure to give it the current value
    renderView = () => (
      <Text
        color={this.state.value ? 'primary' : 'secondary'}
        weight={this.state.value ? 'normal' : 'light'}
        size="large"
      >
        {this.state.value || 'Enter some text'}
      </Text>
    )

    // Renders the edit component.
    // You have to forward the props on, which
    // includes an onBlur property to help manage
    // the mode changes.
    // Be sure to give it the current value
    renderEdit = ({ onBlur, editorRef }) => (
      <Text
        color="primary"
        size="large"
        as="input"
        type="text"
        value={this.state.value}
        onChange={this.handleChange}
        aria-label="The title"
        onBlur={onBlur}
        elementRef={editorRef}
      />
    )

    // Renders the edit button.
    // Leverage the default implementation provided by InPlaceEdit
    renderEditButton = (props) => {
      props.label = `Edit title "${this.state.value}"`
      return InPlaceEdit.renderDefaultEditButton(props)
    }

    onChangeLayout = (event) => {
      this.setState({ inline: event.target.checked })
    }

    render() {
      return (
        <View as="div">
          <InPlaceEdit
            renderViewer={this.renderView}
            renderEditor={this.renderEdit}
            renderEditButton={this.renderEditButton}
            onChangeMode={this.handleChangeMode}
            mode={this.state.mode}
            value={this.state.value}
            inline={this.state.inline}
          />
          <View as="div" margin="small 0">
            <Checkbox
              label="inline"
              checked={this.state.inline}
              onChange={this.onChangeLayout}
            />
          </View>
        </View>
      )
    }
  }
  render(<Example />)
  ```

- ```js
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

- ```js
  class Example extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        mode: props.mode || 'view',
        value: 'This is some text'
      }
    }

    // You must provide this to Editable to be
    // notified of mode changes
    handleChangeMode = (mode) => {
      this.setState({ mode })
    }

    // You attach an event handler to your edit component
    // to be notified of value changes from user interactions
    handleChange = (event) => {
      this.setState({ value: event.target.value })
    }

    // Renders the view component
    // Be sure to give it the current value
    renderView = () => <Text size="large">{this.state.value}</Text>

    // Renders the edit component.
    // You have to forward the props on, which
    // includes an onBlur property to help manage
    // the mode changes.
    // Be sure to give it the current value
    renderEdit = ({ onBlur, editorRef }) => (
      <Text
        size="large"
        as="input"
        type="text"
        value={this.state.value}
        onChange={this.handleChange}
        aria-label="The title"
        onBlur={onBlur}
        elementRef={editorRef}
      />
    )

    // Renders the edit button.
    // Leverage the default implementation provided by InPlaceEdit
    renderEditButton = (props) => {
      props.label = `Edit title "${this.state.value}"`
      return InPlaceEdit.renderDefaultEditButton(props)
    }

    render() {
      return (
        <InPlaceEdit
          readOnly
          renderViewer={this.renderView}
          renderEditor={this.renderEdit}
          renderEditButton={this.renderEditButton}
          onChangeMode={this.handleChangeMode}
          mode={this.state.mode}
          value={this.state.value}
        />
      )
    }
  }
  render(<Example />)
  ```

- ```js
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

- ```js
  class Example extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        mode: props.mode || 'view',
        value: 'This is some text'
      }
    }

    // You must provide this to Editable to be
    // notified of mode changes
    handleChangeMode = (mode) => {
      this.setState({ mode })
    }

    // You attach an event handler to your edit component
    // to be notified of value changes from user interactions
    handleChange = (event) => {
      this.setState({ value: event.target.value })
    }

    // Renders the view component
    // Be sure to give it the current value
    renderView = () => <Text size="large">{this.state.value}</Text>

    // Renders the edit component.
    // You have to forward the props on, which
    // includes an onBlur property to help manage
    // the mode changes.
    // Be sure to give it the current value
    renderEdit = ({ onBlur, editorRef }) => (
      <Text
        size="large"
        as="input"
        type="text"
        value={this.state.value}
        onChange={this.handleChange}
        aria-label="The title"
        onBlur={onBlur}
        elementRef={editorRef}
      />
    )

    // Renders the edit button.
    // Leverage the default implementation provided by InPlaceEdit
    renderEditButton = (props) => {
      props.label = `Edit title "${this.state.value}"`
      return InPlaceEdit.renderDefaultEditButton(props)
    }

    render() {
      return (
        <View as="div" textAlign="end">
          <InPlaceEdit
            renderViewer={this.renderView}
            renderEditor={this.renderEdit}
            renderEditButton={this.renderEditButton}
            onChangeMode={this.handleChangeMode}
            mode={this.state.mode}
            value={this.state.value}
            editButtonPlacement="start"
          />
        </View>
      )
    }
  }
  render(<Example />)
  ```

- ```js
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

- ```js
  class Example extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        mode: props.mode || 'view',
        value: 'Edit me',
        onChangeValue: undefined
      }
    }

    // typically provided by the application so it can
    // be notified of value changes when the user is
    // finished editing
    onChange = (newValue) => {
      this.setState({ onChangeValue: newValue })
    }

    // You must provide this to Editable to be
    // notified of mode changes
    handleChangeMode = (mode) => {
      this.setState({ mode })
    }

    // You attach an event handler to your edit component
    // to be notified of value changes from user interactions
    handleChange = (event) => {
      this.setState({ value: event.target.value })
    }

    // Renders the view component
    // Be sure to give it the current value
    renderView = () => <Text size="large">{this.state.value}</Text>

    // Renders the edit component.
    // You have to forward the props on, which
    // includes an onBlur property to help manage
    // the mode changes.
    // Be sure to give it the current value
    renderEdit = ({ onBlur, editorRef }) => (
      <Text
        size="large"
        as="input"
        type="text"
        value={this.state.value}
        onChange={this.handleChange}
        aria-label="The title"
        onBlur={onBlur}
        elementRef={editorRef}
      />
    )

    // Renders the edit button.
    // Leverage the default implementation provided by InPlaceEdit
    renderEditButton = (props) => {
      props.label = `Edit title "${this.state.value}"`
      return InPlaceEdit.renderDefaultEditButton(props)
    }

    render() {
      return (
        <View as="div">
          <InPlaceEdit
            renderViewer={this.renderView}
            renderEditor={this.renderEdit}
            renderEditButton={this.renderEditButton}
            onChangeMode={this.handleChangeMode}
            mode={this.state.mode}
            value={this.state.value}
            onChange={this.onChange}
          />
          <div>
            <Text fontStyle="italic">
              {this.state.onChangeValue !== undefined
                ? `onChange said: ${this.state.onChangeValue}`
                : `You haven't edited me yet!`}
            </Text>
          </div>
        </View>
      )
    }
  }
  render(<Example />)
  ```

- ```js
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


### Props

| Component | Prop | Type | Required | Default | Description |
|-----------|------|------|----------|---------|-------------|
| InPlaceEdit | renderViewer | `() => React.ReactNode` | Yes | - | Function to render the view mode component. It is the consumer's responsibility to provide the current value or children. Return value: - element: the viewer DOM sub-tree. |
| InPlaceEdit | renderEditor | `(data: { onBlur: () => void editorRef: (el: HTMLElement \| null) => void }) => React.ReactNode` | Yes | - | Function to render the edit mode component It is the consumer's responsibility to provide the current value, and to attach the appropriate onChange event handler needed to capture the updated value. This new value must then be forwarded to the view mode component. Return value: - element: the editor DOM sub-tree. |
| InPlaceEdit | renderEditButton | `(props: ExtendedRenderEditButton) => React.ReactNode \| null` | Yes | - | Function to render the edit button. Parameters: - object: { isVisible, onClick, onFocus, onBlur, buttonRef } Return value: - element: the edit button DOM sub-tree If you choose to use the default edit button, add `label` to the incoming `props` parameter and call `InPlaceEdit.renderDefaultEditButton(props)` If you choose to render a custom button, attach the on* event handlers and set `buttonRef` as a `ref` type property on the `button` element. `isVisible` is a hint as to whether the button is _typically_ shown, but you're free to ignore it for your use-case. |
| InPlaceEdit | mode | `'view' \| 'edit'` | Yes | - | If `'view'`: the view component is rendered, if `'edit'`: the edit component is rendered |
| InPlaceEdit | onChangeMode | `EditableProps['onChangeMode']` | Yes | - | Called when the component's mode changes Parameter: - newMode: string |
| InPlaceEdit | value | `any` | No | - | The current value. The value is managed by the consuming app, but we need to tell InPlaceEdit it's changed or it won't re-render |
| InPlaceEdit | onChange | `EditableProps['onChange']` | No | - | Called when Editable switches from edit to view mode and the value has changed. Parameter: - value: any |
| InPlaceEdit | readOnly | `boolean` | No | `false` | The mode is fixed as 'view' |
| InPlaceEdit | showFocusRing | `boolean` | No | `true` | Show a focus outline when the input is focused |
| InPlaceEdit | editButtonPlacement | `'start' \| 'end'` | No | `'end'` | Put the edit button before or after the view |
| InPlaceEdit | inline | `boolean` | No | `true` | Render outermost element inline v. block |

### Usage

Install the package:

```shell
npm install @instructure/ui-editable
```

Import the component:

```javascript
/*** ES Modules (with tree shaking) ***/
import { InPlaceEdit } from '@instructure/ui-editable'
```

