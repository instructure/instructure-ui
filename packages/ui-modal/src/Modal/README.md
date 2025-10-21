---
describes: Modal
---

The Modal is a dialog component that is centered in the viewport. The Modal
overlays the application content and applies a mask to it.

The default `padding` of the Modal content is `medium` but can be overridden
by using the `padding` prop on the `<Modal.Body/>` if the use case requires it.

```js
---
type: example
---
const fpo = lorem.paragraphs(5)
const Example = () => {
  const [open, setOpen] = useState(false)

  const handleButtonClick = () => {
    setOpen((state) => !state)
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    console.log('form submitted')
    setOpen(false)
  }

  const renderCloseButton = () => {
    return (
      <CloseButton
        placement="end"
        offset="small"
        onClick={handleButtonClick}
        screenReaderLabel="Close"
      />
    )
  }

  return (
    <div style={{ padding: '0 0 11rem 0', margin: '0 auto' }}>
      <Button onClick={handleButtonClick}>
        {open ? 'Close' : 'Open'} the Modal
      </Button>
      <Modal
        as="form"
        open={open}
        onDismiss={() => {
          setOpen(false)
        }}
        onSubmit={handleFormSubmit}
        size="auto"
        label="Hello World"
        shouldCloseOnDocumentClick
      >
        <Modal.Header>
          {renderCloseButton()}
          <Heading>Hello World</Heading>
        </Modal.Header>
        <Modal.Body>
          <TextInput
            renderLabel="Example"
            placeholder="if you hit enter here, it should submit the form"
          />
          <Text lineHeight="double">{fpo}</Text>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleButtonClick} margin="0 x-small 0 0">
            Close
          </Button>
          <Button color="primary" type="submit">
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

render(<Example />)
```

### Constraining Modal to a parent element

By default, Modals are positioned relative to the document body.

Setting the `constrain` property to `parent` will constrain the Modal within the element it is mounted from (specified via the `mountNode` property). Note: in these cases, the `mountNode` element should have an explicit `height` set: Because Modal is absolutely positioned, it has no height of its own.

```js
---
type: example
---
const fpo = lorem.paragraphs(1)
const Example = () => {
  const [open, setOpen] = useState(false)
  const [size, setSize] = useState('auto')

  const handleButtonClick = () => {
    setOpen((state) => !state)
  }

  const renderCloseButton = () => {
    return (
      <CloseButton
        placement="end"
        offset="small"
        onClick={handleButtonClick}
        screenReaderLabel="Close"
      />
    )
  }
  return (
    <div>
      <Button onClick={handleButtonClick}>
        {open ? 'Close' : 'Open'} the Modal
      </Button>
      <Modal
        open={open}
        onDismiss={() => {
          setOpen(false)
        }}
        size="fullscreen"
        label="Hello World"
        shouldCloseOnDocumentClick
        mountNode={() => document.getElementById('constrainExample')}
        constrain="parent"
      >
        <Modal.Header>
          {renderCloseButton()}
          <Heading>This Modal is constrained to a parent</Heading>
        </Modal.Header>
        <Modal.Body>
          <View as="p" margin="none none small">
            <Text>{fpo}</Text>
          </View>
          <ModalAutoCompleteExample renderLabel="Choose a state" />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleButtonClick} margin="0 x-small 0 0">
            Close
          </Button>
          <Button onClick={handleButtonClick} color="primary" type="submit">
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
      <View
        background="primary-inverse"
        margin="medium auto none"
        display="block"
        width="25rem"
        height="25rem"
        borderWidth="large"
        id="constrainExample"
      ></View>
    </div>
  )
}

const ModalAutoCompleteExample = (props) => {
  const [isShowingOptions, setIsShowingOptions] = useState(false)

  const handleShowOptions = () => {
    setIsShowingOptions(true)
  }
  const handleHideOptions = () => {
    setIsShowingOptions(false)
  }

  const options = [
    'Alabama',
    'Alaska',
    'American Samoa',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'District Of Columbia',
    'Federated States Of Micronesia',
    'Florida',
    'Georgia',
    'Guam',
    'Hawaii',
    'Idaho',
    'Illinois'
  ]
  return (
    <Select
      {...props}
      isShowingOptions={isShowingOptions}
      onRequestShowOptions={handleShowOptions}
      onRequestHideOptions={handleHideOptions}
    >
      {options.map((label, index) => (
        <Select.Option key={label} id={'' + index}>
          {label}
        </Select.Option>
      ))}
    </Select>
  )
}

render(<Example />)
```

### Media (images, etc.) inside Modals

> Setting the `variant` prop to `"inverse"` will result in a dark version of Modal, useful for displaying media. _Note that the `inverse` Modal does not currently support text or form input content._

**If you are displaying small, relatively uniform images or videos inside Modal, the default settings should work well.** Modal.Body will expand to the height of the media you're displaying. If there is overflow, scrollbars will be available.

```js
---
type: example
---
const Example = () => {
  const [open, setOpen] = useState(false)

  const handleButtonClick = () => {
    setOpen((state) => !state)
  }

  return (
    <div>
      <Button onClick={handleButtonClick}>
        {open ? 'Close' : 'Open'} the Modal
      </Button>
      <Modal
        open={open}
        onDismiss={() => {
          setOpen(false)
        }}
        size="auto"
        label="Hello Media"
        shouldCloseOnDocumentClick
        variant="inverse"
      >
        <Modal.Header>
          <Flex>
            <Flex.Item shouldGrow shouldShrink>
              <Heading level="h2">
                <TruncateText>A small image</TruncateText>
              </Heading>
            </Flex.Item>
            <Flex.Item>
              <CloseButton
                color="primary-inverse"
                placement="end"
                offset="small"
                onClick={handleButtonClick}
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
          <Button
            onClick={handleButtonClick}
            withBackground={false}
            color="primary-inverse"
            type="submit"
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

render(<Example />)
```

**When you have to display large media inside the Modal (or have no control over the size of the media)**, set `overflow` to `fit`. Doing so makes Modal.Body fill 100% of the available width and height, enabling you to
use the [Img](Img) component's `constrain` property to fit the image inside Modal.Body.

> `<Img />` uses CSS's [`object-fit`](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit) for its constrain property. If you're not using `<Img />`, add an `object-fit` rule to your media, and it will work with `overflow="fit"`.

```js
---
type: example
---
const Example = () => {
  const [open, setOpen] = useState(false)
  const [imageFit, setImageFit] = useState('cover')
  const [modalSize, setModalSize] = useState('fullscreen')

  const handleButtonClick = () => {
    setOpen((state) => !state)
  }

  const handleImageFitChange = (event, value) => {
    setImageFit(value)
  }

  const handleModalSizeChange = (event, value) => {
    setModalSize(value)
  }

  return (
    <div>
      <FormFieldGroup
        description={
          <Heading level="h3" as="h3">
            Media Modal
          </Heading>
        }
        rowSpacing="medium"
      >
        <RadioInputGroup
          onChange={handleImageFitChange}
          name="imageFit"
          defaultValue="cover"
          description="Img component's `constrain` prop"
          variant="toggle"
        >
          <RadioInput label="Cover" value="cover" />
          <RadioInput label="Contain" value="contain" />
        </RadioInputGroup>
        <RadioInputGroup
          onChange={handleModalSizeChange}
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
      <Button onClick={handleButtonClick} margin="medium 0 0">
        {open ? 'Close' : 'Open'} the Modal
      </Button>
      <Modal
        open={open}
        onDismiss={() => {
          setOpen(false)
        }}
        size={modalSize}
        label="Hello Media"
        shouldCloseOnDocumentClick
        variant="inverse"
        overflow="fit"
      >
        <Modal.Header>
          <Flex>
            <Flex.Item shouldGrow shouldShrink>
              <Flex alignItems="center">
                <Flex.Item margin="0 x-small 0 0">
                  <SVGIcon
                    src={iconExample}
                    size="small"
                    title="Icon Example"
                  />
                </Flex.Item>
                <Flex.Item shouldGrow shouldShrink>
                  <Heading level="h2">
                    <TruncateText>This Modal Contains Media</TruncateText>
                  </Heading>
                </Flex.Item>
              </Flex>
            </Flex.Item>
            <Flex.Item>
              <IconButton
                color="primary-inverse"
                withBackground={false}
                withBorder={false}
                renderIcon={IconPrinterSolid}
                screenReaderLabel="Print This Image"
                margin="0 x-small 0 0"
              />
              <IconButton
                color="primary-inverse"
                withBackground={false}
                withBorder={false}
                renderIcon={IconDownloadSolid}
                screenReaderLabel="Download This Image"
                margin="0 x-small 0 0"
              />
              <IconButton
                color="primary-inverse"
                withBackground={false}
                withBorder={false}
                renderIcon={IconXSolid}
                screenReaderLabel="Close"
                onClick={handleButtonClick}
              />
            </Flex.Item>
          </Flex>
        </Modal.Header>
        <Modal.Body padding="none">
          <Img src={avatarSquare} constrain={imageFit} display="block" />
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={handleButtonClick}
            withBackground={false}
            color="primary-inverse"
            type="submit"
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

render(<Example />)
```

### Small viewports

On smaller viewports (like mobile devices or scaled-up UI), we don't want to lose space because of padding and margins. In order to achieve that, use `size="fullscreen"` on the Modal and set the `spacing` property of Modal.Header to `compact`.

```js
---
type: example
---
const fpo = lorem.paragraphs(1)
const Example = () => {
  const [open, setOpen] = useState(false)
  const [smallViewport, setSmallViewport] = useState(true)

  const toggleOpen = () => {
    setOpen((state) => !state)
  }

  const toggleViewport = () => {
    setSmallViewport((state) => !state)
  }

  const renderCloseButton = () => {
    return (
      <CloseButton
        placement="end"
        offset="small"
        onClick={toggleOpen}
        screenReaderLabel="Close"
      />
    )
  }

  return (
    <div>
      <Button onClick={toggleOpen}>
        {open ? 'Close' : 'Open'} the Modal
      </Button>
      <Button
        onClick={toggleViewport}
        margin="0 0 0 small"
        id="toggleViewportButton"
      >
        Toggle viewport
      </Button>
      <Modal
        open={open}
        size={smallViewport ? 'fullscreen' : 'small'}
        onDismiss={(event) => {
          if (event.target.id !== 'toggleViewportButton') {
            setOpen(false)
          }
        }}
        label="Hello World"
        shouldCloseOnDocumentClick
        mountNode={() => document.getElementById('viewportExample')}
        constrain="parent"
      >
        <Modal.Header spacing={smallViewport ? 'compact' : 'default'}>
          {renderCloseButton()}
          {smallViewport ? (
            <Heading as="h2" level="h3" themeOverride={{ h3FontWeight: 400 }}>
              This Modal is optimized for small viewport
            </Heading>
          ) : (
            <Heading as="h2">This is a default size Modal</Heading>
          )}
        </Modal.Header>
        <Modal.Body>
          <View as="p" margin="none none small">
            <Text>{fpo}</Text>
          </View>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={toggleOpen} margin="0 x-small 0 0">
            Close
          </Button>
          <Button onClick={toggleOpen} color="primary" type="submit">
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      <View
        background="primary-inverse"
        margin="medium auto none"
        display="block"
        width={smallViewport ? '20rem' : '50rem'}
        height="37.5rem"
        borderWidth="large"
        id="viewportExample"
      ></View>
    </div>
  )
}

render(<Example />)
```

### Using custom children

Occasionally, you might find it useful to incorporate custom components within a `Modal`, such as a higher-order component for `Modal.Header` or `Modal.Body` or not using built in child components at all. Although this approach is typically not advised, it can sometimes aid in code splitting or achieving more streamlined code, especially for more intricate and sizable `Modal`s.

Below example demonstrates how to use a higher-order component for `Modal.Body`. `Modal` consists of a `Modal.Header`, a custom `WrappedModalBody` component, and a `View` component. Properties `variant` and `overflow` are passed down to child components. While the original `Modal.Header`, `Modal.Body` and `Modal.Footer` components use these properties, please note that these might cause unpredictable side effects for custom components.

```js
---
type: example
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
  };

  renderCloseButton () {
    return (
      <CloseButton
        color="primary-inverse"
        placement="end"
        offset="small"
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
          size="large"
          label="Hello World"
          shouldCloseOnDocumentClick
          variant='inverse'
          overflow='scroll'
        >
          <Modal.Header>
            {this.renderCloseButton()}
            <Heading>This is a Modal with a Modal.Body wrapped in to a HOC</Heading>
          </Modal.Header>
          <WrappedModalBody>
            <Heading level='h3'>WrappedModalBody inherits the variant and overflow properties automatically</Heading>
            <Text lineHeight="double">{lorem.paragraphs(5)}</Text>
          </WrappedModalBody>
          <View
            as="div"
            margin="small"
            padding="large"
            background="primary">
            <Heading level='h3'>This View child does not inherit the variant and overflow properties</Heading>
            <Text>{lorem.paragraphs(5)}</Text>
          </View>
        </Modal>
      </div>
    )
  }
}

const withLogger = (WrappedComponent) => {
  class WithLogger extends React.Component {
    componentDidMount() {
      console.log('WrappedModelBody mounted');
    }
    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return WithLogger;
}

const WrappedModalBody = withLogger(Modal.Body)

render(<Example />)
```

### Changing the Modal's z-index

You can do this with the `insertAt` prop or a theme override:

```jsx
---
  type: code
---
<InstUISettingsProvider
      theme={{
        themeOverrides: {
            componentOverrides: {
              Mask: {
                zIndex: 555,
              }
            }
          }
      }}
    >
  <Modal />
</InstUISettingsProvider>
```

### Guidelines

```js
---
type: embed
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
type: embed
---
<Guidelines>
  <Figure recommendation="a11y" title="Accessibility">
    <Figure.Item>Keyboard focus must be set in the modal when it appears; usually on the first interactive element</Figure.Item>
    <Figure.Item>Modals must contain keyboard focus until they’re closed. This is to ensure that keyboard or screen reader users won't mistakenly interact with background content that is meant to be hidden or inaccessible</Figure.Item>
    <Figure.Item>When a user closes a modal, focus must return to a logical place within the page. This is usually the element that triggered opening the modal</Figure.Item>
    <Figure.Item>Modals should be able to be closed by clicking away, esc key and/or a close button</Figure.Item>
    <Figure.Item>We recommend that modals begin with a heading (typically H2)</Figure.Item>
    <Figure.Item>The Modal's header currently becomes non-sticky when the window height is too small, improving navigation of the Modal.Body, e.g., at higher zoom levels</Figure.Item>
  </Figure>
</Guidelines>
```
