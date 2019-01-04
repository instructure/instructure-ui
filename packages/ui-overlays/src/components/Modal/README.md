---
describes: Modal
---

The Modal is a dialog component that is centered in the viewport. The Modal
overlays the application content and applies a mask to it.

The default `padding` of the Modal content is `medium` but can be overridden
by using the `padding` prop on the `<ModalBody/>` if the use case requires it.

```js
---
render: false
example: true
---
const fpo = lorem.paragraphs(5)

class Example extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      open: false,
      size: 'auto'
    }
  }

  handleButtonClick = () => {
    this.setState(function (state) {
      return { open: !state.open }
    })
  };

  handleSelectChange = (e, o) => {
    this.setState({ size: o.value })
  };

  handleFormSubmit = e => {
    e.preventDefault()
    console.log('form submitted')
    this.setState(state => ({ open: false }))
  }

  renderCloseButton () {
    return (
      <CloseButton
        placement="end"
        offset="medium"
        variant="icon"
        onClick={this.handleButtonClick}
      >
        Close
      </CloseButton>
    )
  }

  render () {
    const variants = [
      {value: 'auto', label: 'Auto'},
      {value: 'small', label: 'Small'},
      {value: 'medium', label: 'Medium'},
      {value: 'large', label: 'Large'},
      {value: 'fullscreen', label: 'Full Screen'}
    ]

    return (
      <div style={{ padding: '0 0 11rem 0', margin: '0 auto' }}>
        <Select
          onChange={this.handleSelectChange}
          value={this.state.size}
          label={<ScreenReaderContent>Modal size</ScreenReaderContent>}
          inline
        >
          {variants.map((s) => <option value={s.value} key={s.value}>{s.label}</option>)}
        </Select>
        &nbsp;
        <Button onClick={this.handleButtonClick}>
          {this.state.open ? 'Close' : 'Open'} the Modal
        </Button>
        <Modal
          as="form"
          open={this.state.open}
          onDismiss={() => { this.setState({ open: false }) }}
          onSubmit={this.handleFormSubmit}
          size={this.state.size}
          label="Modal Dialog: Hello World"
          shouldCloseOnDocumentClick
        >
          <ModalHeader>
            {this.renderCloseButton()}
            <Heading>Hello World</Heading>
          </ModalHeader>
          <ModalBody>
            <TextInput label="Example" placeholder="if you hit enter here, it should submit the form" />
            <Text lineHeight="double">{fpo}</Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={this.handleButtonClick}>Close</Button>&nbsp;
            <Button variant="primary" type="submit">Submit</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

render(<Example />)
```

### Constraining Modal to a parent element

By default, Modals are positioned relative to the document body. Setting the `constrain`
property to `parent` will constrain the Modal within the element it is mounted from
(specified via the `mountNode` property). _Note: in these cases, the `mountNode`
element should have an explicit `height` set: Because Modal is absolutely positioned,
it has no height of its own._

```js
---
render: false
example: true
---
const fpo = lorem.paragraphs(1)
class Example extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      open: false,
      size: 'auto'
    }
  }

  handleButtonClick = () => {
    this.setState(function (state) {
      return { open: !state.open }
    })
  }

  renderCloseButton () {
    return (
      <CloseButton
        placement="end"
        offset="medium"
        variant="icon"
        onClick={this.handleButtonClick}
      >
        Close
      </CloseButton>
    )
  }

  render () {
    return (
      <div>
        <Button onClick={this.handleButtonClick}>
          {this.state.open ? 'Close' : 'Open'} the Modal
        </Button>
        <Modal
          open={this.state.open}
          onDismiss={() => { this.setState({ open: false }) }}
          size="fullscreen"
          label="Modal Dialog: Hello World"
          shouldCloseOnDocumentClick
          mountNode={() => document.getElementById('constrainExample')}
          constrain="parent"
        >
          <ModalHeader>
            {this.renderCloseButton()}
            <Heading>This Modal contains an Autocomplete</Heading>
          </ModalHeader>
          <ModalBody>
            <View as="p" margin="none none small"><Text>{fpo}</Text></View>
            <ModalAutoCompleteExample
              label="Choose a state" defaultOption="12"
              onChange={(e, o) => console.log(o.label)} />
          </ModalBody>
          <ModalFooter>
            <Button onClick={this.handleButtonClick}>Close</Button>&nbsp;
            <Button onClick={this.handleButtonClick} variant="primary" type="submit">Submit</Button>
          </ModalFooter>
        </Modal>
        <View
          background="inverse"
          margin="medium auto none"
          display="block"
          width="25rem"
          height="25rem"
          borderWidth="large"
          id="constrainExample">
        </View>
      </div>
    )
  }
}

class ModalAutoCompleteExample extends React.Component {
  render () {
    const options = [
      'Alabama', 'Alaska', 'American Samoa', 'Arizona',
      'Arkansas', 'California', 'Colorado', 'Connecticut',
      'Delaware', 'District Of Columbia',
      'Federated States Of Micronesia', 'Florida', 'Georgia',
      'Guam', 'Hawaii', 'Idaho', 'Illinois'
    ]

    return (
      <Select {...this.props}
        editable
        formatSelectedOption={(tag) => (
          <AccessibleContent alt={`Remove ${tag.label}`}>{tag.label}</AccessibleContent>
        )}
      >
        {options.map((label, index) => (
          <option key={label} value={'' + index}>
            {label}
          </option>
        ))}
      </Select>
    )
  }
}

render(<Example />)
```

### Dark Modal
Setting the `variant` prop to `"inverse"` will result in a dark version of Modal.

```js
---
render: false
example: true
---
const fpo = lorem.paragraphs(1)
class Example extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      open: false,
      size: 'auto'
    }
  }

  handleButtonClick = () => {
    this.setState(function (state) {
      return { open: !state.open }
    })
  }

  renderCloseButton () {
    return (
      <CloseButton
        placement="end"
        offset="medium"
        variant="icon-inverse"
        onClick={this.handleButtonClick}
      >
        Close
      </CloseButton>
    )
  }

  render () {
    return (
      <div>
        <Button onClick={this.handleButtonClick}>
          {this.state.open ? 'Close' : 'Open'} the Modal
        </Button>
        <Modal
          open={this.state.open}
          onDismiss={() => { this.setState({ open: false }) }}
          size="fullscreen"
          label="Modal Dialog: Hello Media"
          shouldCloseOnDocumentClick
          variant="inverse"
        >
          <ModalHeader>
            {this.renderCloseButton()}
            <Heading level="h2" ellipsis>
              <Flex alignItems="center">
                <FlexItem padding="0 small 0 0">
                  <SVGIcon src={iconExample} size="small" title="Icon Example" />
                </FlexItem>
                <FlexItem>
                  This Modal can contain media
                </FlexItem>
              </Flex>
            </Heading>
          </ModalHeader>
          <ModalBody padding="0 medium">
            <View
              as="div"
              margin="auto"
              textAlign="center"
              background="transparent"
            >
              <Img src={avatarPortrait} />
            </View>
          </ModalBody>
          <ModalFooter>
            <Button onClick={this.handleButtonClick} variant="ghost-inverse" type="submit">Ok</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

render(<Example />)
```

### Guidelines

```js
---
guidelines: true
---
<Guidelines>
  <Figure recommendation="yes" title="Do">
    <FigureItem>Use it to validate user decisions or to gain secondary confirmation</FigureItem>
    <FigureItem>Provide input areas that the user may interact with such as Forms, Dropdowns, Selectors, and Links</FigureItem>
    <FigureItem>Provide a way to dismiss the Modal: the "x" close button, the ESC key, clicking outside the modal, alternative response button (done, etc...)</FigureItem>
    <FigureItem>Place optional response button(s) on the right side within the ModalFooter</FigureItem>
    <FigureItem>Place primary button on the far right with secondary response buttons to the left of the primary</FigureItem>
  </Figure>
  <Figure recommendation="no" title="Don't">
    <FigureItem>Use when the workflow should NOT be interrupted</FigureItem>
    <FigureItem>Use to show error, success, or warning messages/notifications (see Alert)</FigureItem>
    <FigureItem>Add content to a modal that would be better suited in its own page</FigureItem>
    <FigureItem>Use "inverse" variant for anything other than media</FigureItem>
  </Figure>
</Guidelines>
```

```js
---
guidelines: true
---
<Guidelines>
  <Figure recommendation="a11y" title="Accessibility">
    <FigureItem>Keyboard focus must be set in the modal when it appears; usually on the first interactive element</FigureItem>
    <FigureItem>Modals must contain keyboard focus until they’re closed. This is to ensure that keyboard or screen reader users won't mistakenly interact with background content that is meant to be hidden or inaccessible</FigureItem>
    <FigureItem>When a user closes a modal, focus must return to a logical place within the page. This is usually the element that triggered opening the modal</FigureItem>
    <FigureItem>Modals should be able to be closed by clicking away, esc key and/or a close button</FigureItem>
    <FigureItem>We recommend that modals begin with a heading (typically H2)</FigureItem>
  </Figure>
</Guidelines>
```
