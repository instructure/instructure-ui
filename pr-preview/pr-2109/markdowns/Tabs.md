# Tabs


`<Tabs />` is an accessible tabbed navigation component. Use the TAB key to focus the component and arrow keys to navigate between panels of content. To set a default panel that should be selected on initial render, set the `selected` prop on that `<Tabs.Panel>`.

- ```js
  class Example extends React.Component {
    state = {
      selectedIndex: 0
    }
    handleTabChange = (event, { index }) => {
      this.setState({
        selectedIndex: index
      })
    }
    render() {
      const { selectedIndex } = this.state
      return (
        <Tabs
          margin="large auto"
          padding="medium"
          onRequestTabChange={this.handleTabChange}
        >
          <Tabs.Panel
            id="tabA"
            renderTitle="Tab A"
            textAlign="center"
            padding="large"
            isSelected={selectedIndex === 0}
          >
            <Button>Focus Me</Button>
          </Tabs.Panel>
          <Tabs.Panel id="tabB" renderTitle="Disabled Tab" isDisabled>
            {lorem.paragraphs()}
          </Tabs.Panel>
          <Tabs.Panel
            id="tabC"
            renderTitle="Tab C"
            isSelected={selectedIndex === 2}
          >
            {lorem.paragraphs()}
          </Tabs.Panel>
          <Tabs.Panel
            id="tabD"
            renderTitle="Tab D"
            isSelected={selectedIndex === 3}
          >
            {lorem.paragraphs()}
          </Tabs.Panel>
        </Tabs>
      )
    }
  }

  render(<Example />)
  ```

- ```js
  const Example = () => {
    const [selectedIndex, setSelectedIndex] = useState(0)

    const handleTabChange = (event, { index }) => {
      setSelectedIndex(index)
    }

    return (
      <Tabs
        margin="large auto"
        padding="medium"
        onRequestTabChange={handleTabChange}
      >
        <Tabs.Panel
          id="tabA"
          renderTitle="Tab A"
          textAlign="center"
          padding="large"
          isSelected={selectedIndex === 0}
        >
          <Button>Focus Me</Button>
        </Tabs.Panel>
        <Tabs.Panel id="tabB" renderTitle="Disabled Tab" isDisabled>
          {lorem.paragraphs()}
        </Tabs.Panel>
        <Tabs.Panel
          id="tabC"
          renderTitle="Tab C"
          isSelected={selectedIndex === 2}
        >
          {lorem.paragraphs()}
        </Tabs.Panel>
        <Tabs.Panel
          id="tabD"
          renderTitle="Tab D"
          isSelected={selectedIndex === 3}
        >
          {lorem.paragraphs()}
        </Tabs.Panel>
      </Tabs>
    )
  }

  render(<Example />)
  ```

### Secondary Tabs

- ```js
  class Example extends React.Component {
    state = {
      selectedIndex: 2
    }
    handleTabChange = (event, { index }) => {
      this.setState({
        selectedIndex: index
      })
    }
    render() {
      const { selectedIndex } = this.state
      return (
        <Tabs
          variant="secondary"
          onRequestTabChange={this.handleTabChange}
          minHeight="10rem"
          maxHeight="10rem"
        >
          <Tabs.Panel renderTitle="First Tab" isSelected={selectedIndex === 0}>
            Hello World
          </Tabs.Panel>
          <Tabs.Panel renderTitle="Disabled Tab" isDisabled>
            {lorem.paragraphs()}
          </Tabs.Panel>
          <Tabs.Panel renderTitle="Third Tab" isSelected={selectedIndex === 2}>
            {lorem.paragraphs()}
          </Tabs.Panel>
          <Tabs.Panel renderTitle="Fourth Tab" isSelected={selectedIndex === 3}>
            {lorem.paragraphs()}
          </Tabs.Panel>
        </Tabs>
      )
    }
  }

  render(<Example />)
  ```

- ```js
  const Example = () => {
    const [selectedIndex, setSelectedIndex] = useState(2)

    const handleTabChange = (event, { index }) => {
      setSelectedIndex(index)
    }

    return (
      <Tabs
        variant="secondary"
        onRequestTabChange={handleTabChange}
        minHeight="10rem"
        maxHeight="10rem"
      >
        <Tabs.Panel renderTitle="First Tab" isSelected={selectedIndex === 0}>
          Hello World
        </Tabs.Panel>
        <Tabs.Panel renderTitle="Disabled Tab" isDisabled>
          {lorem.paragraphs()}
        </Tabs.Panel>
        <Tabs.Panel renderTitle="Third Tab" isSelected={selectedIndex === 2}>
          {lorem.paragraphs()}
        </Tabs.Panel>
        <Tabs.Panel renderTitle="Fourth Tab" isSelected={selectedIndex === 3}>
          {lorem.paragraphs()}
        </Tabs.Panel>
      </Tabs>
    )
  }

  render(<Example />)
  ```

### Handling Tab overflow

By default, `<Tabs />` will stack each individual `<Tab />` if there isn't enough horizontal
space to display them all inline. For a more compact tab navigation, set `tabOverflow` to
`scroll`, which allows the Tabs to scroll horizontally.

- ```js
  class Example extends React.Component {
    state = {
      selectedIndex: 4
    }
    handleTabChange = (event, { index }) => {
      this.setState({
        selectedIndex: index
      })
    }
    render() {
      const { selectedIndex } = this.state
      return (
        <Tabs
          margin="large auto"
          padding="medium"
          onRequestTabChange={this.handleTabChange}
          tabOverflow="scroll"
          maxWidth="20rem"
        >
          <Tabs.Panel
            id="tabA"
            renderTitle="Tab A"
            isSelected={selectedIndex === 0}
          >
            {lorem.sentence()}
          </Tabs.Panel>
          <Tabs.Panel
            id="tabB"
            renderTitle="Tab B"
            isSelected={selectedIndex === 1}
          >
            {lorem.sentence()}
          </Tabs.Panel>
          <Tabs.Panel
            id="tabC"
            renderTitle="Tab C"
            isSelected={selectedIndex === 2}
          >
            {lorem.sentence()}
          </Tabs.Panel>
          <Tabs.Panel
            id="tabD"
            renderTitle="Tab D"
            isSelected={selectedIndex === 3}
          >
            {lorem.sentence()}
          </Tabs.Panel>
          <Tabs.Panel
            id="tabE"
            renderTitle="Tab E"
            isSelected={selectedIndex === 4}
          >
            {lorem.sentence()}
          </Tabs.Panel>
          <Tabs.Panel
            id="tabF"
            renderTitle="Tab F"
            isSelected={selectedIndex === 5}
          >
            {lorem.sentence()}
          </Tabs.Panel>
          <Tabs.Panel
            id="tabG"
            renderTitle="Tab G"
            isSelected={selectedIndex === 6}
          >
            {lorem.sentence()}
          </Tabs.Panel>
        </Tabs>
      )
    }
  }

  render(<Example />)
  ```

- ```js
  const Example = () => {
    const [selectedIndex, setSelectedIndex] = useState(4)

    const handleTabChange = (event, { index }) => {
      setSelectedIndex(index)
    }

    return (
      <Tabs
        margin="large auto"
        padding="medium"
        onRequestTabChange={handleTabChange}
        tabOverflow="scroll"
        maxWidth="20rem"
      >
        <Tabs.Panel
          id="tabA"
          renderTitle="Tab A"
          isSelected={selectedIndex === 0}
        >
          {lorem.sentence()}
        </Tabs.Panel>
        <Tabs.Panel
          id="tabB"
          renderTitle="Tab B"
          isSelected={selectedIndex === 1}
        >
          {lorem.sentence()}
        </Tabs.Panel>
        <Tabs.Panel
          id="tabC"
          renderTitle="Tab C"
          isSelected={selectedIndex === 2}
        >
          {lorem.sentence()}
        </Tabs.Panel>
        <Tabs.Panel
          id="tabD"
          renderTitle="Tab D"
          isSelected={selectedIndex === 3}
        >
          {lorem.sentence()}
        </Tabs.Panel>
        <Tabs.Panel
          id="tabE"
          renderTitle="Tab E"
          isSelected={selectedIndex === 4}
        >
          {lorem.sentence()}
        </Tabs.Panel>
        <Tabs.Panel
          id="tabF"
          renderTitle="Tab F"
          isSelected={selectedIndex === 5}
        >
          {lorem.sentence()}
        </Tabs.Panel>
        <Tabs.Panel
          id="tabG"
          renderTitle="Tab G"
          isSelected={selectedIndex === 6}
        >
          {lorem.sentence()}
        </Tabs.Panel>
      </Tabs>
    )
  }

  render(<Example />)
  ```

### Controlling the size and the spacing

To restrict the width of `<Tabs />`, use the `maxWidth` prop. Add space around the entire component using the `margin` prop. Adjust the padding around the panel content via `padding` (default is `small`) on each `<Tabs.Panel>`.

Set the height of the Tabs component with the `fixHeight` property (set to '100%' to fill out it's parent element). You can also restrict the height of the **panels** using the `minHeight` and `maxHeight` properties (they don't work if you set `fixHeight` on the whole Tabs component).

Finally, switch the text alignment of the panel content with `textAlign`.

- ```js
  class Example extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        selectedIndex: 0,
        heightOption: 'fixHeight: 100%'
      }

      this.heightOptions = {
        ['fixHeight: 100%']: { fixHeight: '100%' },
        ['fixHeight: 15rem']: { fixHeight: '15rem' },
        ['minHeight: 17rem']: { minHeight: '17rem' },
        ['maxHeight: 10rem']: { maxHeight: '10rem' }
      }
    }

    handleTabChange = (event, { index }) => {
      this.setState({
        selectedIndex: index
      })
    }

    handleHeightOptionSelect = (e, heightOption) => {
      this.setState({ heightOption })
    }

    render() {
      const { selectedIndex, heightOption } = this.state
      const { heightOptions } = this

      const containerProps = {
        as: 'div',
        ...(heightOption.includes('fixHeight') && {
          height: '22rem',
          withVisualDebug: true
        })
      }

      return (
        <>
          <View display="block" margin="none none medium">
            <RadioInputGroup
              name="tabsHeightOptions"
              defaultValue="fixHeight: 100%"
              description={
                <ScreenReaderContent>Tabs height selector</ScreenReaderContent>
              }
              variant="toggle"
              onChange={this.handleHeightOptionSelect}
            >
              {Object.keys(heightOptions).map((heightOption) => (
                <RadioInput
                  key={heightOption}
                  label={heightOption}
                  value={heightOption}
                />
              ))}
            </RadioInputGroup>
          </View>

          <View {...containerProps}>
            <Tabs
              margin="large auto"
              padding="medium"
              onRequestTabChange={this.handleTabChange}
              {...heightOptions[heightOption]}
            >
              <Tabs.Panel
                id="tabA"
                renderTitle="Tab A"
                textAlign="center"
                padding="large"
                iSelected={selectedIndex === 0}
              >
                <Button>Focus Me</Button>
              </Tabs.Panel>
              <Tabs.Panel id="tabB" renderTitle="Disabled Tab" isDisabled>
                {lorem.paragraphs()}
              </Tabs.Panel>
              <Tabs.Panel
                id="tabC"
                renderTitle="Tab C"
                isSelected={selectedIndex === 2}
              >
                {lorem.paragraphs()}
              </Tabs.Panel>
              <Tabs.Panel
                id="tabD"
                renderTitle="Tab D"
                isSelected={selectedIndex === 3}
              >
                {lorem.paragraphs()}
              </Tabs.Panel>
            </Tabs>
          </View>
        </>
      )
    }
  }

  render(<Example />)
  ```

- ```js
  const Example = () => {
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [heightOption, setHeightOption] = useState('fixHeight: 100%')

    const heightOptions = {
      ['fixHeight: 100%']: { fixHeight: '100%' },
      ['fixHeight: 15rem']: { fixHeight: '15rem' },
      ['minHeight: 17rem']: { minHeight: '17rem' },
      ['maxHeight: 10rem']: { maxHeight: '10rem' }
    }

    const handleTabChange = (event, { index }) => {
      setSelectedIndex(index)
    }

    const handleHeightOptionSelect = (e, heightOption) => {
      setHeightOption(heightOption)
    }

    const containerProps = {
      as: 'div',
      ...(heightOption.includes('fixHeight') && {
        height: '22rem',
        withVisualDebug: true
      })
    }

    return (
      <>
        <View display="block" margin="none none medium">
          <RadioInputGroup
            name="tabsHeightOptions"
            defaultValue="fixHeight: 100%"
            description={
              <ScreenReaderContent>Tabs height selector</ScreenReaderContent>
            }
            variant="toggle"
            onChange={handleHeightOptionSelect}
          >
            {Object.keys(heightOptions).map((heightOption) => (
              <RadioInput
                key={heightOption}
                label={heightOption}
                value={heightOption}
              />
            ))}
          </RadioInputGroup>
        </View>

        <View {...containerProps}>
          <Tabs
            margin="large auto"
            padding="medium"
            onRequestTabChange={handleTabChange}
            {...heightOptions[heightOption]}
          >
            <Tabs.Panel
              id="tabA"
              renderTitle="Tab A"
              textAlign="center"
              padding="large"
              isSelected={selectedIndex === 0}
            >
              <Button>Focus Me</Button>
            </Tabs.Panel>
            <Tabs.Panel id="tabB" renderTitle="Disabled Tab" isDisabled>
              {lorem.paragraphs()}
            </Tabs.Panel>
            <Tabs.Panel
              id="tabC"
              renderTitle="Tab C"
              isSelected={selectedIndex === 2}
            >
              {lorem.paragraphs()}
            </Tabs.Panel>
            <Tabs.Panel
              id="tabD"
              renderTitle="Tab D"
              isSelected={selectedIndex === 3}
            >
              {lorem.paragraphs()}
            </Tabs.Panel>
          </Tabs>
        </View>
      </>
    )
  }

  render(<Example />)
  ```

### Support for dynamic content with active panel

Marking one of the `<Tabs.Panel>` as `active` will render that panel's content in all the panels. This is useful for dynamic content rendering: the panel area can be used as a container, what routing libraries, such as React Router, can use to render their children elements into.

- ```js
  class Outlet extends React.Component {
    state = {
      show: false
    }

    componentDidMount() {
      setTimeout(() => this.setState({ show: true }), 2000)
    }

    render() {
      return (
        <div>
          <Heading level="h1" as="h1" margin="0 0 x-small">
            {this.state.show ? 'Hello Developer' : 'Simulating network call...'}
          </Heading>
          {this.state.show ? (
            lorem.paragraphs()
          ) : (
            <Spinner renderTitle="Loading" size="medium" />
          )}
        </div>
      )
    }
  }

  class Example extends React.Component {
    state = {
      selectedIndex: 0
    }
    handleTabChange = (event, { index }) => {
      this.setState({
        selectedIndex: index
      })
    }

    render() {
      const { selectedIndex } = this.state
      return (
        <Tabs
          margin="large auto"
          padding="medium"
          onRequestTabChange={this.handleTabChange}
        >
          <Tabs.Panel
            id="tabA"
            renderTitle="Tab A"
            textAlign="center"
            padding="large"
            isSelected={selectedIndex === 0}
            active
          >
            <Outlet />
          </Tabs.Panel>
          <Tabs.Panel id="tabB" renderTitle="Disabled Tab" isDisabled />
          <Tabs.Panel
            id="tabC"
            renderTitle="Tab C"
            isSelected={selectedIndex === 2}
          />
          <Tabs.Panel
            id="tabD"
            renderTitle="Tab D"
            isSelected={selectedIndex === 3}
          />
        </Tabs>
      )
    }
  }

  render(<Example />)
  ```

- ```js
  const Outlet = () => {
    const [show, setShow] = useState(false)

    useEffect(() => {
      const timer = setTimeout(() => setShow(true), 2000)
      return () => clearTimeout(timer)
    }, [])

    return (
      <div>
        <Heading level="h1" as="h1" margin="0 0 x-small">
          {show ? 'Hello Developer' : 'Simulating network call...'}
        </Heading>
        {show ? (
          lorem.paragraphs()
        ) : (
          <Spinner renderTitle="Loading" size="medium" />
        )}
      </div>
    )
  }

  const Example = () => {
    const [selectedIndex, setSelectedIndex] = useState(0)

    const handleTabChange = (event, { index }) => {
      setSelectedIndex(index)
    }

    return (
      <Tabs
        margin="large auto"
        padding="medium"
        onRequestTabChange={handleTabChange}
      >
        <Tabs.Panel
          id="tabA"
          renderTitle="Tab A"
          textAlign="center"
          padding="large"
          isSelected={selectedIndex === 0}
          active
        >
          <Outlet />
        </Tabs.Panel>
        <Tabs.Panel id="tabB" renderTitle="Disabled Tab" isDisabled />
        <Tabs.Panel
          id="tabC"
          renderTitle="Tab C"
          isSelected={selectedIndex === 2}
        />
        <Tabs.Panel
          id="tabD"
          renderTitle="Tab D"
          isSelected={selectedIndex === 3}
        />
      </Tabs>
    )
  }

  render(<Example />)
  ```

### Persisting the selected tab

If you need to persist the rendered content of the tabpanels between tabbing, you can set the `unmountOnExit` prop to `false` on the `<Tabs.Panel>` component. It works case by case, so you can set it to `false` only on the tabpanels you want to persist.

- ```js
  class Counter extends React.Component {
    state = {
      counter: 0
    }
    handleIncrement = () => {
      this.setState({
        counter: this.state.counter + 1
      })
    }

    render() {
      return (
        <div>
          <Button onClick={this.handleIncrement}>Increment</Button>
          <hr />
          <Text>{this.state.counter}</Text>
        </div>
      )
    }
  }
  class Example extends React.Component {
    state = {
      selectedIndex: 0
    }
    handleTabChange = (event, { index }) => {
      this.setState({
        selectedIndex: index
      })
    }
    render() {
      const { selectedIndex } = this.state
      return (
        <Tabs
          margin="large auto"
          padding="medium"
          onRequestTabChange={this.handleTabChange}
        >
          <Tabs.Panel
            id="tabA"
            renderTitle="I will persist"
            textAlign="center"
            padding="large"
            isSelected={selectedIndex === 0}
            unmountOnExit={false}
          >
            <Counter />
          </Tabs.Panel>
          <Tabs.Panel
            id="tabB"
            renderTitle="I will unmount"
            isSelected={selectedIndex === 1}
            textAlign="center"
            padding="large"
          >
            <Counter />
          </Tabs.Panel>
          <Tabs.Panel
            id="tabC"
            renderTitle="Tab C"
            isSelected={selectedIndex === 2}
          >
            Tab C
          </Tabs.Panel>
          <Tabs.Panel
            id="tabD"
            renderTitle="Tab D"
            isSelected={selectedIndex === 3}
          >
            Tab D
          </Tabs.Panel>
        </Tabs>
      )
    }
  }

  render(<Example />)
  ```

- ```js
  const Counter = () => {
    const [counter, setCounter] = useState(0)

    const handleIncrement = () => {
      setCounter(counter + 1)
    }

    return (
      <div>
        <Button onClick={handleIncrement}>Increment</Button>
        <hr />
        <Text>{counter}</Text>
      </div>
    )
  }

  const Example = () => {
    const [selectedIndex, setSelectedIndex] = useState(0)

    const handleTabChange = (event, { index }) => {
      setSelectedIndex(index)
    }

    return (
      <Tabs
        margin="large auto"
        padding="medium"
        onRequestTabChange={handleTabChange}
      >
        <Tabs.Panel
          id="tabA"
          renderTitle="I will persist"
          textAlign="center"
          padding="large"
          isSelected={selectedIndex === 0}
          unmountOnExit={false}
        >
          <Counter />
        </Tabs.Panel>
        <Tabs.Panel
          id="tabB"
          renderTitle="I will unmount"
          isSelected={selectedIndex === 1}
          textAlign="center"
          padding="large"
        >
          <Counter />
        </Tabs.Panel>
        <Tabs.Panel
          id="tabC"
          renderTitle="Tab C"
          isSelected={selectedIndex === 2}
        >
          Tab C
        </Tabs.Panel>
        <Tabs.Panel
          id="tabD"
          renderTitle="Tab D"
          isSelected={selectedIndex === 3}
        >
          Tab D
        </Tabs.Panel>
      </Tabs>
    )
  }

  render(<Example />)
  ```

### Guidelines

```js
---
type: embed
---
<Guidelines>
  <Figure recommendation="yes" title="Do">
    <Figure.Item>Title should be a single row above content</Figure.Item>
    <Figure.Item>TabButton content should be succinct, preferably one word</Figure.Item>
    <Figure.Item>Use title case</Figure.Item>
    <Figure.Item>Use default variant when a single Tabs component exists on the page</Figure.Item>
    <Figure.Item>Ensure each Tablist.Panel content is mutually exclusive of the others’</Figure.Item>
  </Figure>
  <Figure recommendation="no" title="Don't">
    <Figure.Item>Exceed 20 characters including spaces for the title</Figure.Item>
    <Figure.Item>Exceed 5 tabs</Figure.Item>
    <Figure.Item>Use avatars, pills, icons, etc in the TabButton</Figure.Item>
    <Figure.Item>Use `tabOverflow="scroll"` with `secondary` Tabs</Figure.Item>
    <Figure.Item>Nest tabbed content within a tab</Figure.Item>
    <Figure.Item>Align tabs to the center of the page</Figure.Item>
  </Figure>
</Guidelines>
```


### Props

| Component | Prop | Type | Required | Default | Description |
|-----------|------|------|----------|---------|-------------|
| Tabs | children | `React.ReactNode` | No | - | children of type `Tabs.Panel` |
| Tabs | variant | `'default' \| 'secondary'` | No | `'default'` |  |
| Tabs | screenReaderLabel | `string` | No | - | A screen ready only label for the list of tabs |
| Tabs | onRequestTabChange | `( event: React.MouseEvent<ViewOwnProps> \| React.KeyboardEvent<ViewOwnProps>, tabData: { index: number; id?: string } ) => void` | No | - | Called when the selected tab should change |
| Tabs | maxWidth | `string \| number` | No | - |  |
| Tabs | maxHeight | `string \| number` | No | - |  |
| Tabs | minHeight | `string \| number` | No | - |  |
| Tabs | fixHeight | `string \| number` | No | - |  |
| Tabs | margin | `string` | No | - | Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`, `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via familiar CSS-like shorthand. For example: `margin="small auto large"`. |
| Tabs | padding | `string` | No | - | Valid values are `0`, `none`, `xxx-small`, `xx-small`, `x-small`, `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via familiar CSS-like shorthand. For example: `padding="small x-large large"`. |
| Tabs | textAlign | `'start' \| 'center' \| 'end'` | No | - |  |
| Tabs | elementRef | `(element: Element \| null) => void` | No | - | provides a reference to the underlying html root element |
| Tabs | tabOverflow | `'stack' \| 'scroll'` | No | `'stack'` | Choose whether Tabs should stack or scroll when they exceed the width of their container. |
| Tabs | shouldFocusOnRender | `bool` | No | `false` |  |

### Usage

Install the package:

```shell
npm install @instructure/ui-tabs
```

Import the component:

```javascript
/*** ES Modules (with tree shaking) ***/
import { Tabs } from '@instructure/ui-tabs'

/*** ES Modules (without tree shaking) ***/
import { Tabs } from '@instructure/ui-tabs/es/Tabs/index'
```

