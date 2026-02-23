---
describes: RadioInput
---

By default, the RadioInput component is a custom styled HTML radio button.

Adjust the size of the RadioInput and its label text via the `size` prop. The default size is
`medium`. See [RadioInputGroup](/RadioInputGroup) for more details

```js
---
type: example
---
<InstUISettingsProvider>
<Flex>
  <Flex direction="column" margin="medium" gap="medium">
    <RadioInput
      label="small"
      value="foo"
      name="bar"
      size="small"
    />
    <RadioInput
      label="medium"
      value="foo2"
      name="bar2"
    />
    <RadioInput
      label="large"
      value="foo3"
      name="bar3"
      size="large"
    />
    <RadioInput
      label="large disabled"
      value="foo4"
      name="bar4"
      size="large"
      disabled
    />
    <RadioInput
      label="large readonly"
      value="foo5"
      name="bar5"
      size="large"
      readOnly
    />
  </Flex>
  <Flex direction="column" margin="medium" gap="medium">
    <RadioInput
      label="small"
      value="foo6"
      name="bar6"
      checked
      size="small"
      checked
    />
    <RadioInput
      label="medium"
      value="foo7"
      name="bar7"
      checked
    />
    <RadioInput
      label="large"
      value="foo8"
      name="bar8"
      size="large"
      checked
    />
    <RadioInput
      label="large disabled checked"
      value="foo9"
      name="bar9"
      size="large"
      disabled
      checked
    />
    <RadioInput
      label="large readonly"
      value="foo10"
      name="bar10"
      size="large"
      readOnly
      checked
    />
  </Flex>
</Flex>
</InstUISettingsProvider>
```

### Guidelines

```js
---
type: embed
---
<Guidelines>
  <Figure recommendation="yes" title="Do">
    <Figure.Item>Use sentence-style capitalization</Figure.Item>
    <Figure.Item>Use a clear and concise label for RadioInput</Figure.Item>
    <Figure.Item>Optionally include a heading to provide further clarity</Figure.Item>
  </Figure>
  <Figure recommendation="no" title="Don't">
    <Figure.Item>Have a single RadioInput</Figure.Item>
    <Figure.Item>Use long labels for RadioInput</Figure.Item>
    <Figure.Item>Display more than two radio inputs horizontally</Figure.Item>
  </Figure>
</Guidelines>
```
