---
describes: TabList
---

Accessible tabbed content component. You can use the TAB key to focus the component and
arrow keys to navigate between panels of content. The default variant is `simple`.

### Simple tabs

```js
---
example: true
---
<TabList>
  <TabPanel title="First Tab">
    <Text>Hello World</Text>
  </TabPanel>
  <TabPanel title="Disabled Tab" disabled>
    <Text>{lorem.paragraphs()}</Text>
  </TabPanel>
  <TabPanel title="Third Tab">
    <Text>{lorem.paragraphs()}</Text>
  </TabPanel>
  <TabPanel title="Fourth Tab" maxHeight="10rem">
    <Text>{lorem.paragraphs()}</Text>
  </TabPanel>
</TabList>
```

### Minimal tabs

To style `<TabList/>` as shown below, set the variant to `minimal`. To set a default panel that should be selected on initial render set the `defaultSelectedIndex`.

To restrict the width of the `<TabList/>`, use the `size` prop. Add space around
the entire component using the `margin` prop. Adjust the padding around the
panel content via `padding` (default is `small`). Finally, switch the
text alignment of the panel content with `textAlign`.

```js
---
example: true
---
<TabList
  defaultSelectedIndex={2}
  variant="minimal"
  size="medium"
  margin="large auto"
  padding="medium"
>
  <TabPanel title="Tab A" textAlign="center" padding="large">
    <Text>{lorem.paragraphs()}</Text>
  </TabPanel>
  <TabPanel title="Disabled Tab" disabled>
    <Text>{lorem.paragraphs()}</Text>
  </TabPanel>
  <TabPanel title="Tab C">
    <Text>{lorem.paragraphs()}</Text>
  </TabPanel>
  <TabPanel title="Tab D">
    <Text>{lorem.paragraphs()}</Text>
  </TabPanel>
</TabList>
```
### Guidelines

```js
---
guidelines: true
---
<Guidelines>
  <Figure recommendation="yes" title="Do">
    <FigureItem>Title should be a single row above content</FigureItem>
    <FigureItem>Tab content should be succinct, preferably one word</FigureItem>
    <FigureItem>Use title case</FigureItem>
    <FigureItem>Use minimal (lined version) as default TabList</FigureItem> 
    <FigureItem>Ensure each TabPanel content is mutually exclusive of the others’</FigureItem>
  </Figure>
  <Figure recommendation="no" title="Don't">
    <FigureItem>Exceed 20 characters including spaces for the title</FigureItem>
    <FigureItem>Exceed 5 tabs</FigureItem>
    <FigureItem>Use avatars, pills, icons, etc in the tab</FigureItem>
    <FigureItem>Nest tabbed content within a tab</FigureItem>
    <FigureItem>Align tabs to the center of the page</FigureItem>
  </Figure>
</Guidelines>
```
