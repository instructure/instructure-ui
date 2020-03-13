---
describes: Tabs
---

`<Tabs />` is an accessible tabbed navigation component. Use the TAB key to focus the component and arrow keys to navigate between panels of content. To set a default panel that should be selected on initial render, set the `selected` prop on that `<Tabs.Panel>`.

To restrict the width of `<Tabs />`, use the `maxWidth` prop. Add space around the entire component using the `margin` prop. Adjust the padding around the panel content via `padding` (default is `small`) on each `<Tabs.Panel>`. Restrict the height of the panel using `minHeight` or `maxHeight`. Finally, switch the text alignment of the panel content with `textAlign`.

```js
---
example: true
render: false
---
class Example extends React.Component {
  state = {
    selectedIndex: 0
  }
  handleTabChange = (event, { index, id }) => {
    this.setState({
      selectedIndex: index
    })
  }
  render () {
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
          selected={selectedIndex === 0}
        >
          <Button>Focus Me</Button>
        </Tabs.Panel>
        <Tabs.Panel id="tabB" renderTitle="Disabled Tab" isDisabled>
          {lorem.paragraphs()}
        </Tabs.Panel>
        <Tabs.Panel id="tabC" renderTitle="Tab C" isSelected={selectedIndex === 2}>
          {lorem.paragraphs()}
        </Tabs.Panel>
        <Tabs.Panel id="tabD" renderTitle="Tab D" isSelected={selectedIndex === 3}>
          {lorem.paragraphs()}
        </Tabs.Panel>
      </Tabs>
    )
  }
}

render(<Example />)
```

### Secondary Tabs

```js
---
example: true
render: false
---
class Example extends React.Component {
  state = {
    selectedIndex: 2
  }
  handleTabChange = (event, { index }) => {
    this.setState({
      selectedIndex: index
    })
  }
  render () {
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

### Handling Tab overflow

By default, `<Tabs />` will stack each individual `<Tab />` if there isn't enough horizontal
space to display them all inline. For a more compact tab navigation, set `tabOverflow` to
`scroll`, which allows the Tabs to scroll horizontally.

```js
---
example: true
render: false
---
class Example extends React.Component {
  state = {
    selectedIndex: 4
  }
  handleTabChange = (event, { index, id }) => {
    this.setState({
      selectedIndex: index
    })
  }
  render () {
    const { selectedIndex } = this.state
    return (
      <Tabs
        margin="large auto"
        padding="medium"
        onRequestTabChange={this.handleTabChange}
        tabOverflow="scroll"
        maxWidth="20rem"
      >
        <Tabs.Panel id="tabA" renderTitle="Tab A" selected={selectedIndex === 0}>
          {lorem.sentence()}
        </Tabs.Panel>
        <Tabs.Panel id="tabB" renderTitle="Tab B" selected={selectedIndex === 1}>
          {lorem.sentence()}
        </Tabs.Panel>
        <Tabs.Panel id="tabC" renderTitle="Tab C" isSelected={selectedIndex === 2}>
          {lorem.sentence()}
        </Tabs.Panel>
        <Tabs.Panel id="tabD" renderTitle="Tab D" isSelected={selectedIndex === 3}>
          {lorem.sentence()}
        </Tabs.Panel>
        <Tabs.Panel id="tabE" renderTitle="Tab E" isSelected={selectedIndex === 4}>
          {lorem.sentence()}
        </Tabs.Panel>
        <Tabs.Panel id="tabF" renderTitle="Tab F" isSelected={selectedIndex === 5}>
          {lorem.sentence()}
        </Tabs.Panel>
        <Tabs.Panel id="tabG" renderTitle="Tab G" isSelected={selectedIndex === 6}>
          {lorem.sentence()}
        </Tabs.Panel>
      </Tabs>
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
