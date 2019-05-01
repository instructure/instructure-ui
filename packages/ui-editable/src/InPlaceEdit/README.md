---
describes: InPlaceEdit
---

`InPlaceEdit` provides the DOM structure to organize the components that participate
in in-place editing by calling the `renderViewer` and `renderEditor` _render props_
in the context of the containing DOM sub-tree. It also takes care of wiring up the
event handlers required by [`Editable`](#Editable) to make the user interactions wrok.

As a controlled component, it is the responsibility of the consumer to maintain a some data to make this work.
Each time `InPlaceEdit` is rendered, you must provide as props:
-  the current `mode` prop, which defaults to `'view'`. The app will be notified of
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
will render in the same style as the view, making for a nice user experience.  Other transitions,
`Text` to `Select` or `DateTimeInput` for example, result in a wholesale change in the component's UI, and will alter
the space it consumes in the app.

Use `InPlaceEdit` to edit `Text` using `Text as="input"`. Also demonstrates how you might wish to handle
the case when the text is empty.  Use the checkbox to switch between inline and block layout.

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
      value: 'This is some text',
      inline: true
    }
  }

  // You must provide this to Editable to be
  // notified of mode changes
  handleChangeMode = (mode) => {
    this.setState({mode})
  }

  // You attach an event handler to your edit component
  // to be notified of value changes from user interactions
  handleChange = (event) => {
    this.setState({value: event.target.value})
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
  renderEdit = ({onBlur, editorRef}) => (
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
    this.setState({inline: event.target.checked})
  }

  render () {
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
          <Checkbox label="inline" checked={this.state.inline} onChange={this.onChangeLayout} />
        </View>
      </View>
    )
  }
}
render(<Example />)
```

A readOnly `InPlaceEdit`

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
      value: 'This is some text',
    }
  }

  // You must provide this to Editable to be
  // notified of mode changes
  handleChangeMode = (mode) => {
    this.setState({mode})
  }

  // You attach an event handler to your edit component
  // to be notified of value changes from user interactions
  handleChange = (event) => {
    this.setState({value: event.target.value})
  }

  // Renders the view component
  // Be sure to give it the current value
  renderView = () => (
    <Text size="large">
      {this.state.value}
    </Text>
  )

  // Renders the edit component.
  // You have to forward the props on, which
  // includes an onBlur property to help manage
  // the mode changes.
  // Be sure to give it the current value
  renderEdit = ({onBlur, editorRef}) => (
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
  // Leverage the default implemetation provided by InPlaceEdit
  renderEditButton = (props) => {
    props.label = `Edit title "${this.state.value}"`
    return InPlaceEdit.renderDefaultEditButton(props)
  }

  render () {
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

To edit end-justified text, wrap `<InPlaceEdit />` in a
`<View>` component, as follows:

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
      value: 'This is some text',
    }
  }

  // You must provide this to Editable to be
  // notified of mode changes
  handleChangeMode = (mode) => {
    this.setState({mode})
  }

  // You attach an event handler to your edit component
  // to be notified of value changes from user interactions
  handleChange = (event) => {
    this.setState({value: event.target.value})
  }

  // Renders the view component
  // Be sure to give it the current value
  renderView = () => (
    <Text size="large">
      {this.state.value}
    </Text>
  )

  // Renders the edit component.
  // You have to forward the props on, which
  // includes an onBlur property to help manage
  // the mode changes.
  // Be sure to give it the current value
  renderEdit = ({onBlur, editorRef}) => (
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

  render () {
    return (
      <View as="div" textAlign="end">
        <InPlaceEdit
          renderViewer={this.renderView}
          renderEditor={this.renderEdit}
          renderEditButton={this.renderEditButton}
          onChangeMode={this.handleChangeMode}
          mode={this.state.mode}
          value={this.state.value}
          editButtonPlacement='start'
        />
      </View>
    )
  }
}
render(<Example />)
```

Same as the first example, but notifies `Editable`'s `onChange`
when the user has finished editing and the value has changed.

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
      value: 'Edit me',
      onChangeValue: undefined,
    }
  }

  // typically provided by the application so it can
  // be notified of value changes when the user is
  // finished editing
  onChange = (newValue) => {
    this.setState({onChangeValue: newValue})
  }


  // You must provide this to Editable to be
  // notified of mode changes
  handleChangeMode = (mode) => {
    this.setState({mode})
  }

  // You attach an event handler to your edit component
  // to be notified of value changes from user interactions
  handleChange = (event) => {
    this.setState({value: event.target.value})
  }

  // Renders the view component
  // Be sure to give it the current value
  renderView = () => (
    <Text size="large">
      {this.state.value}
    </Text>
  )

  // Renders the edit component.
  // You have to forward the props on, which
  // includes an onBlur property to help manage
  // the mode changes.
  // Be sure to give it the current value
  renderEdit = ({onBlur, editorRef}) => (
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
  // Leverage the default implemetation provided by InPlaceEdit
  renderEditButton = (props) => {
    props.label = `Edit title "${this.state.value}"`
    return InPlaceEdit.renderDefaultEditButton(props)
  }

  render () {
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
              ? `onChange said: ${this.state.onChangeValue}` : `You haven't edited me yet!`}
          </Text>
        </div>
      </View>
    )
  }
}
render(<Example />)
```

Use `InPlaceEdit` to in-place edit `Heading` using its `as="input"` property.
Change the heading's level with the Select to see how the edit mode's
styling matches the view mode.

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
      value: 'This is a Title',
      level: 'h2',
    }
  }

  handleChangeMode = (mode) => {
    this.setState({mode})
  }

  handleChange = (event) => {
    this.setState({value: event.target.value})
  }

  handleChangeHeading = (e, option) => {
    this.setState({level: option.value})
  }

  renderView = () => (
    <Heading
      level={this.state.level}
    >
      {this.state.value}
    </Heading>
  )

  renderEdit = ({onBlur, editorRef}) => (
    <Heading
      level={this.state.level}
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
  // Leverage the default implemetation provided by InPlaceEdit
  renderEditButton = (props) => {
    props.label = `Edit title "${this.state.value}"`
    return InPlaceEdit.renderDefaultEditButton(props)
  }

  render () {
    return (
      <View
        as="div"
        padding="x-small"
        margin="0 auto xx-large auto"
        background="default"
      >
        <View as="div" margin="0 0 medium 0" >
          <Select
            onChange={this.handleChangeHeading}
            selectedOption={this.state.level}
            label="Heading level"
          >
            <option value="h1">H1</option>
            <option value="h2">H2</option>
            <option value="h3">H3</option>
            <option value="h4">H4</option>
          </Select>
        </View>
        <InPlaceEdit
          renderViewer={this.renderView}
          renderEditor={this.renderEdit}
          renderEditButton={this.renderEditButton}

          onChangeMode={this.handleChangeMode}
          mode={this.state.mode}

          value={this.state.value}
        />
     </View>
    )
  }
}
render(<Example />)
```

Use `InPlaceEdit` to edit `Text` with a multi-`Select`

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
      value: ['Bananas'],
    }
  }
  handleChangeMode = (mode) => {
    this.setState({mode})
  }

  handleChange = (event, selectedOption) => {
    const value = selectedOption.map(o => o.value)
    this.setState({value})
  }

  renderView = () => (
    <Text size="medium">
      {this.state.value.join('|')}
    </Text>
  )

  getSelectOptions () {
    return ['Apples', 'Bananas', 'Peaches'].map((str, i) => <option key={i} value={str} label={str}/>)
  }

  renderEdit = ({onBlur, editorRef}) => (
    <Select
      label="Pick one"
      selectedOption={this.state.value}
      onChange={this.handleChange}
      layout="stacked"
      onBlur={onBlur}
      inputRef={editorRef}
      multiple
    >
      {this.getSelectOptions()}
    </Select>
  )

  // Renders the edit button.
  // Leverage the default implemetation provided by InPlaceEdit
  renderEditButton = (props) => {
    props.label = `Edit title "${this.state.value}"`
    return InPlaceEdit.renderDefaultEditButton(props)
  }


  render () {
    return (
      <div style={{margin:"0 0 4em 0"}}>
        <InPlaceEdit
          renderViewer={this.renderView}
          renderEditor={this.renderEdit}
          renderEditButton={this.renderEditButton}

          onChangeMode={this.handleChangeMode}
          mode={this.state.mode}

          value={this.state.value}
          showFocusRing={false}
        />
      </div>
    )
  }
}
render(<Example />)
```

Use `InPlaceEdit` to edit `Text` with a `DateTimeInput`.
This example demonstrates rendering a custom edit button.

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
      value: DateTime.now('en', DateTime.browserTimeZone()).startOf('hour').toISOString(true)
    }
  }
  handleChangeMode = (mode) => {
    this.setState({mode})
  }

  handleChange = (event, newValue) => {
    this.setState({value: newValue})
  }

  invalidDateTimeMessage = (rawDateValue, rawTimeValue) => {
    if (rawDateValue) {
      return `'${rawDateValue}' is not a valid date.`
    } else {
      if (rawTimeValue) {
        return 'You must provide a date with a time.'
      } else {
        return 'Date and time values are required.'  // if required is true
      }
    }
  }

  renderView = () => {
    const dt = DateTime.toLocaleString (this.state.value, 'en', DateTime.browserTimeZone(), 'LLL')
    return <Text size="medium">{dt}</Text>
  }

  renderEdit = ({onBlur, editorRef}) => (
    <DateTimeInput
      layout="stacked"
      description="When?"
      dateLabel="Date"
      datePreviousLabel="previous"
      dateNextLabel="next"
      timeLabel="Time"
      required
      invalidDateTimeMessage={this.invalidDateTimeMessage}
      value={this.state.value}
      onChange={this.handleChange}
      onBlur={onBlur}
      dateInputRef={editorRef}
    />
  )

  // Renders the edit button.
  renderEditButton = ({ isVisible, onClick, onFocus, onBlur, buttonRef }) => {
    return this.state.mode !== 'edit' ? (
      <Button
        size="small"
        variant="icon"
        margin="0 0 0 x-small"
        icon={IconCalendarMonthLine}
        onClick={onClick}
        onFocus={onFocus}
        onBlur={onBlur}
        buttonRef={buttonRef}
      >
        <ScreenReaderContent>Edit when</ScreenReaderContent>
      </Button>
    ) : null
  }

  render () {
    return (
      <InPlaceEdit
        renderViewer={this.renderView}
        renderEditor={this.renderEdit}
        renderEditButton={this.renderEditButton}

        onChangeMode={this.handleChangeMode}
        mode={this.state.mode}

        value={this.state.value}
        showFocusRing={false}
      />
    )
  }
}
render(<Example />)
```
