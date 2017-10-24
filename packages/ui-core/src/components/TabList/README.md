---
describes: TabList
---

Accessible tabbed content component. You can use the TAB key to focus the component and
arrow keys to navigate between panels of content. The default variant is `simple` tabs.

### Simple tabs

```js
---
example: true
---
<TabList defaultSelectedIndex={2}>
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

To style `<TabList/>` as shown below, set the `variant` to `minimal`.

To restrict the width of the `<TabList/>`, use the `size` prop. Add space around
the entire component using the `margin` prop. Adjust the padding around the
panel content via `padding` (default is `small`). Finally, switch the
text alignment of the panel content with `textAlign`.

```js
---
example: true
---
<TabList
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
