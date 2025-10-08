---
describes: Tabs
---

`<Tabs />` is an accessible tabbed navigation component. Use the TAB key to focus the component and arrow keys to navigate between panels of content. To set a default panel that should be selected on initial render, set the `selected` prop on that `<Tabs.Panel>`.

```js
---
type: example
---
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

```js
---
type: example
---
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

```js
---
type: example
---
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

```js
---
type: example
---
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

```js
---
type: example
---
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

```js
---
type: example
---
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
