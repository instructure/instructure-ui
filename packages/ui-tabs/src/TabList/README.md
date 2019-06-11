---
describes: TabList
---

**DEPRECATED:** use the [Tabs](#Tabs) component from [@instructure/ui-tabs](#ui-tabs) instead.

Accessible tabbed content component. You can use the TAB key to focus the component and
arrow keys to navigate between panels of content. The default variant is `simple`.

### Simple tabs

```js
---
example: true
---
<TabList>
  <TabList.Panel title="First Tab">
    <Button>Focus Me</Button>
  </TabList.Panel>
  <TabList.Panel title="Disabled Tab" disabled>
    <Text>{lorem.paragraphs()}</Text>
  </TabList.Panel>
  <TabList.Panel title="Third Tab">
    <Text>{lorem.paragraphs()}</Text>
  </TabList.Panel>
  <TabList.Panel title="Fourth Tab" maxHeight="10rem">
    <Text>{lorem.paragraphs()}</Text>
  </TabList.Panel>
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
  margin="large auto"
  padding="medium"
>
  <TabList.Panel title="Tab A" textAlign="center" padding="large">
    <Text>{lorem.paragraphs()}</Text>
  </TabList.Panel>
  <TabList.Panel title="Disabled Tab" disabled>
    <Text>{lorem.paragraphs()}</Text>
  </TabList.Panel>
  <TabList.Panel title="Tab C">
    <Text>{lorem.paragraphs()}</Text>
  </TabList.Panel>
  <TabList.Panel title="Tab D">
    <Text>{lorem.paragraphs()}</Text>
  </TabList.Panel>
</TabList>
```
### Guidelines

```js
---
guidelines: true
---
<Guidelines>
  <Figure recommendation="yes" title="Do">
    <Figure.Item>Title should be a single row above content</Figure.Item>
    <Figure.Item>Tab content should be succinct, preferably one word</Figure.Item>
    <Figure.Item>Use title case</Figure.Item>
    <Figure.Item>Use minimal (lined version) as default TabList</Figure.Item> 
    <Figure.Item>Ensure each TabList.Panel content is mutually exclusive of the others’</Figure.Item>
  </Figure>
  <Figure recommendation="no" title="Don't">
    <Figure.Item>Exceed 20 characters including spaces for the title</Figure.Item>
    <Figure.Item>Exceed 5 tabs</Figure.Item>
    <Figure.Item>Use avatars, pills, icons, etc in the tab</Figure.Item>
    <Figure.Item>Nest tabbed content within a tab</Figure.Item>
    <Figure.Item>Align tabs to the center of the page</Figure.Item>
  </Figure>
</Guidelines>
```
