---
describes: Modal
---

The Modal is a dialog component that is centered in the viewport. The Modal
overlays the application content and applies a mask to it.

The default `padding` of the Modal content is `medium` but can be overridden
by using the `padding` prop on the `<Modal.Body/>` if the use case requires it.

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
      open: false
    }
  }

  handleButtonClick = () => {
    this.setState(function (state) {
      return { open: !state.open }
    })
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
        onClick={this.handleButtonClick}
        screenReaderLabel="Close"
      />
    )
  }

  render () {
    return (
      <div style={{ padding: '0 0 11rem 0', margin: '0 auto' }}>
        <Button onClick={this.handleButtonClick}>
          {this.state.open ? 'Close' : 'Open'} the Modal
        </Button>
        <Modal
          as="form"
          open={this.state.open}
          onDismiss={() => { this.setState({ open: false }) }}
          onSubmit={this.handleFormSubmit}
          size="auto"
          label="Modal Dialog: Hello World"
          shouldCloseOnDocumentClick
        >
          <Modal.Header>
            {this.renderCloseButton()}
            <Heading>Hello World</Heading>
          </Modal.Header>
          <Modal.Body>
            <TextInput renderLabel="Example" placeholder="if you hit enter here, it should submit the form" />
            <Text lineHeight="double">{fpo}</Text>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleButtonClick}>Close</Button>&nbsp;
            <Button variant="primary" type="submit">Submit</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

render(<Example />)
```

### Constraining Modal to a parent element

By default, Modals are positioned relative to the document body.

Setting the `constrain` property to `parent` will constrain the Modal within the element it is mounted from (specified via the `mountNode` property). Note: in these cases, the `mountNode` element should have an explicit `height` set: Because Modal is absolutely positioned, it has no height of its own.

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
        onClick={this.handleButtonClick}
        screenReaderLabel="Close"
      />
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
          <Modal.Header>
            {this.renderCloseButton()}
            <Heading>This Modal is constrained to a parent</Heading>
          </Modal.Header>
          <Modal.Body>
            <View as="p" margin="none none small"><Text>{fpo}</Text></View>
            <ModalAutoCompleteExample renderLabel="Choose a state" />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleButtonClick}>Close</Button>&nbsp;
            <Button onClick={this.handleButtonClick} variant="primary" type="submit">Submit</Button>
          </Modal.Footer>
        </Modal>
        <View
          background="primary-inverse"
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
  state = {
    isShowingOptions: false
  }

  handleShowOptions = () => {
    this.setState({ isShowingOptions: true })
  }
  handleHideOptions = () => {
    this.setState({ isShowingOptions: false })
  }
  render () {
    const options = [
      'Alabama', 'Alaska', 'American Samoa', 'Arizona',
      'Arkansas', 'California', 'Colorado', 'Connecticut',
      'Delaware', 'District Of Columbia',
      'Federated States Of Micronesia', 'Florida', 'Georgia',
      'Guam', 'Hawaii', 'Idaho', 'Illinois'
    ]

    return (
      <Select {...this.props} isShowingOptions={this.state.isShowingOptions} onRequestShowOptions={this.handleShowOptions} onRequestHideOptions={this.handleHideOptions}>
        {options.map((label, index) => (
          <Select.Option key={label} id={'' + index}>
            {label}
          </Select.Option>
        ))}
      </Select>
    )
  }
}

render(<Example />)
```
### Media (images, etc.) inside Modals

> Setting the `variant` prop to `"inverse"` will result in a dark version of Modal, useful for displaying media. *Note that the `inverse` Modal does not currently support text or form input content.*

**If you are displaying small, relatively uniform images or videos inside Modal, the default settings should work well.** Modal.Body will expand to the height of the media you're displaying. If there is overflow, scrollbars will be available.

```js
---
render: false
example: true
---
class Example extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      open: false
    }
  }

  handleButtonClick = () => {
    this.setState(function (state) {
      return { open: !state.open }
    })
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
          size="auto"
          label="Modal Dialog: Hello Media"
          shouldCloseOnDocumentClick
          variant="inverse"
        >
          <Modal.Header>
            <Flex>
              <Flex.Item shouldGrow shouldShrink>
                <Heading level="h2"><TruncateText>A small image</TruncateText></Heading>
              </Flex.Item>
              <Flex.Item>
                <CloseButton
                  color="primary-inverse"
                  onClick={this.handleButtonClick}
                  screenReaderLabel="Close"
                />
              </Flex.Item>
            </Flex>
          </Modal.Header>
          <Modal.Body padding="none">
            <Img
              src={placeholderImage(500, 250)}
              display="block"
              margin="0 auto"
            />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleButtonClick} variant="ghost-inverse" type="submit">Ok</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

render(<Example />)
```

**When you have to display large media inside the Modal (or have no control over the size of the media)**, set `overflow` to `fit`. Doing so makes Modal.Body fill 100% of the available width and height, enabling you to
use the [Img](#Img) component's `constrain` property to fit the image inside Modal.Body.

> `<Img />` uses CSS's [`object-fit`](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit) for its constrain property. If you're not using `<Img />`, add an `object-fit` rule to your media, and it will work with `overflow="fit"`.

```js
---
render: false
example: true
---
class Example extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      open: false,
      imageFit: 'cover',
      modalSize: 'fullscreen'
    }
  }

  handleButtonClick = () => {
    this.setState(function (state) {
      return { open: !state.open }
    })
  }

  handleImageFitChange = (event, value) => {
    this.setState({ imageFit: value })
  }

  handleModalSizeChange = (event, value) => {
    this.setState({ modalSize: value })
  }

  render () {
    return (
      <div>
        <FormFieldGroup
          description={<Heading level="h3" as="h3">Media Modal</Heading>}
          rowSpacing="medium"
        >
          <RadioInputGroup
            onChange={this.handleImageFitChange}
            name="imageFit"
            defaultValue="cover"
            description="Img component's `constrain` prop"
            variant="toggle"
          >
            <RadioInput label="Cover" value="cover" />
            <RadioInput label="Contain" value="contain" />
          </RadioInputGroup>
          <RadioInputGroup
            onChange={this.handleModalSizeChange}
            name="modalSize"
            defaultValue="fullscreen"
            description="Modal size"
            variant="toggle"
          >
            <RadioInput label="fullscreen" value="fullscreen" />
            <RadioInput label="small" value="small" />
            <RadioInput label="medium" value="medium" />
            <RadioInput label="large" value="large" />
            <RadioInput label="auto" value="auto" />
          </RadioInputGroup>
        </FormFieldGroup>
        <Button onClick={this.handleButtonClick} margin="medium 0 0">
          {this.state.open ? 'Close' : 'Open'} the Modal
        </Button>
        <Modal
          open={this.state.open}
          onDismiss={() => { this.setState({ open: false }) }}
          size={this.state.modalSize}
          label="Modal Dialog: Hello Media"
          shouldCloseOnDocumentClick
          variant="inverse"
          overflow="fit"
        >
          <Modal.Header>
            <Flex>
              <Flex.Item shouldGrow shouldShrink>
                <Flex alignItems="center">
                  <Flex.Item margin="0 x-small 0 0">
                    <SVGIcon src={iconExample} size="small" title="Icon Example" />
                  </Flex.Item>
                  <Flex.Item shouldGrow shouldShrink>
                    <Heading level="h2"><TruncateText>This Modal Contains Media</TruncateText></Heading>
                  </Flex.Item>
                </Flex>
              </Flex.Item>
              <Flex.Item>
                <Button variant="icon-inverse" icon={IconPrinterSolid} margin="0 x-small">
                  <ScreenReaderContent>Print This</ScreenReaderContent>
                </Button>
                <Button variant="icon-inverse" icon={IconDownloadSolid} margin="0 x-small 0 0">
                  <ScreenReaderContent>Download This</ScreenReaderContent>
                </Button>
                <CloseButton
                  color="primary-inverse"
                  onClick={this.handleButtonClick}
                  screenReaderLabel="Close"
                />
              </Flex.Item>
            </Flex>
          </Modal.Header>
          <Modal.Body padding="none">
            <Img
              src={avatarSquare}
              constrain={this.state.imageFit}
              display="block"
            />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleButtonClick} variant="ghost-inverse" type="submit">Ok</Button>
          </Modal.Footer>
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
    <Figure.Item>Use it to validate user decisions or to gain secondary confirmation</Figure.Item>
    <Figure.Item>Provide input areas that the user may interact with such as Forms, Dropdowns, Selectors, and Links</Figure.Item>
    <Figure.Item>Provide a way to dismiss the Modal: the "x" close button, the ESC key, clicking outside the modal, alternative response button (done, etc...)</Figure.Item>
    <Figure.Item>Place optional response button(s) on the right side within the Modal.Footer</Figure.Item>
    <Figure.Item>Place primary button on the far right with secondary response buttons to the left of the primary</Figure.Item>
    <Figure.Item>Use size="fullscreen" when setting Modal.Body to overflow="contain" to support media fitting within its container</Figure.Item>
  </Figure>
  <Figure recommendation="no" title="Don't">
    <Figure.Item>Use when the workflow should NOT be interrupted</Figure.Item>
    <Figure.Item>Use to show error, success, or warning messages/notifications (see Alert)</Figure.Item>
    <Figure.Item>Add content to a modal that would be better suited in its own page</Figure.Item>
    <Figure.Item>Use "inverse" variant for anything other than media</Figure.Item>
  </Figure>
</Guidelines>
```

```js
---
guidelines: true
---
<Guidelines>
  <Figure recommendation="a11y" title="Accessibility">
    <Figure.Item>Keyboard focus must be set in the modal when it appears; usually on the first interactive element</Figure.Item>
    <Figure.Item>Modals must contain keyboard focus until they’re closed. This is to ensure that keyboard or screen reader users won't mistakenly interact with background content that is meant to be hidden or inaccessible</Figure.Item>
    <Figure.Item>When a user closes a modal, focus must return to a logical place within the page. This is usually the element that triggered opening the modal</Figure.Item>
    <Figure.Item>Modals should be able to be closed by clicking away, esc key and/or a close button</Figure.Item>
    <Figure.Item>We recommend that modals begin with a heading (typically H2)</Figure.Item>
  </Figure>
</Guidelines>
```
