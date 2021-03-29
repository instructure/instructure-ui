---
title: Using Icons
category: Patterns
id: UsingIcons
---

## Using Icons

### Accessibility

By default, the icon's `role` is set to `presentation`. However, when the `title` prop is set, the role attribute is set to `img`. Include the `description` prop to further describe the icon.

```js
---
example: true
---
<View as="div" margin="small" padding="medium" background="primary">
  <Text as="div" size="large">I <IconHeartLine color="error" title="Love" /> New York</Text>
</View>
```

### Line vs Solid

The default choice for iconography is the `Line` version. However, when an icon appears on a dark or colored background, the `Solid` version should be used.

```js
---
example: true
---
<View as="div" margin="small">
  <Button margin="small" renderIcon={IconEyeLine}>Preview</Button>
  <Button color="primary" margin="small" renderIcon={IconEyeSolid}>Preview</Button>
  <View margin="small" display="inline-block" width="20rem" background="primary-inverse" padding="small" textAlign="end">
    <IconExpandSolid size="small" />
  </View>
</View>
```

### Changing the Icon Size

By default, icons are set to a size of 1em, so they will scale to match the font-size of their parent element. To change the size of the icon, use one of the predefined options for the `size` prop. If you need a size that is not offered via the size prop, adjust the font-size on the icon's parent element.

```js
---
example: true
---
<View as="div" margin="small" padding="medium" background="primary">
  <Flex wrap="wrap">
    <Flex.Item padding="small" shouldGrow>
      <Heading>I <IconHeartLine /> the size of my parent heading </Heading>
    </Flex.Item>
    <Flex.Item padding="small" shouldGrow>
      <Text>I am an <b>x-small</b> icon <IconHeartLine size="x-small" /> overriding my parent font-size.</Text>
    </Flex.Item>
    <Flex.Item padding="small" shouldGrow>
      <Text>I am a <b>small</b> icon <IconHeartLine size="small" /> overriding my parent font-size.</Text>
    </Flex.Item>
    <Flex.Item padding="small" shouldGrow>
      <Text>I am a <b>medium</b> icon <IconHeartLine size="medium" /> overriding my parent font-size.</Text>
    </Flex.Item>
    <Flex.Item padding="small" shouldGrow>
      <Text as="div">I am a <b>large</b> icon <IconHeartLine size="large" /> overriding my parent font-size.</Text>
    </Flex.Item>
    <Flex.Item padding="small" shouldGrow>
      <Text>I am an <b>x-large</b> icon <IconHeartLine size="x-large" /> overriding my parent font-size.</Text>
    </Flex.Item>
  </Flex>
</View>
```

### Changing the Icon Color

To change the color of the icon, use one of the predefined options for the `color` prop. By default the icon inherits the color of its parent element. However, it can be changed by setting the icon to one of the theme colors via the color property.

```js
---
example: true
---
<View as="div" margin="small" padding="medium" background="primary">
  <Flex wrap="wrap">
    <Flex.Item padding="small" shouldGrow>
      <Text color="brand">I am inheriting my parent's color <IconHeartLine /></Text>
    </Flex.Item>
    <Flex.Item padding="small" shouldGrow>
      <Text as="div">My icon should be primary <IconHeartLine color="primary" /></Text>
    </Flex.Item>
    <Flex.Item padding="small" shouldGrow>
      <Text as="div">My icon should be secondary <IconHeartLine color="secondary" /></Text>
    </Flex.Item>
    <Flex.Item padding="small" shouldGrow>
      <Text as="div">My icon should be brand <IconHeartLine color="brand" /></Text>
    </Flex.Item>
    <Flex.Item padding="small" shouldGrow>
      <Text as="div">My icon should be success <IconHeartLine color="success" /></Text>
    </Flex.Item>
    <Flex.Item padding="small" shouldGrow>
      <Text as="div">My icon should be error <IconHeartLine color="error" /></Text>
    </Flex.Item>
    <Flex.Item padding="small" shouldGrow>
      <Text as="div">My icon should be warning <IconHeartLine color="warning" /></Text>
    </Flex.Item>
  </Flex>
</View>
```
