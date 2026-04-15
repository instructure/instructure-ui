---
describes: Flex
---

The Flex component makes it simple for developers to create multi-column
layouts with flexbox.

### Layout direction

**Note:** Use the `withVisualDebug` property to see the borders of Flex/Flex.Item while developing!

Flex defaults to a `direction` of `row`, creating a horizontal layout. Change `direction` to
`column` to stack your Flex.Items.

> **Unless your layout has a specific/finite height, you probably don't need `direction="column"`.** To create a layout of stacked elements, it is simpler to use multiple [View](View) components with `display="block"`.

```js
---
type: example
---
<div>
  <Flex withVisualDebug margin="none none large">
    <Flex.Item><Text>One</Text></Flex.Item>
    <Flex.Item><Text>Two</Text></Flex.Item>
    <Flex.Item><Text>Three</Text></Flex.Item>
    <Flex.Item><Text>Four</Text></Flex.Item>
  </Flex>
  <Flex withVisualDebug direction="column" margin="none none large">
    <Flex.Item><Text>One</Text></Flex.Item>
    <Flex.Item><Text>Two</Text></Flex.Item>
    <Flex.Item><Text>Three</Text></Flex.Item>
    <Flex.Item><Text>Four</Text></Flex.Item>
  </Flex>
  <Flex withVisualDebug direction="row-reverse" margin="none none large">
    <Flex.Item><Text>One</Text></Flex.Item>
    <Flex.Item><Text>Two</Text></Flex.Item>
    <Flex.Item><Text>Three</Text></Flex.Item>
    <Flex.Item><Text>Four</Text></Flex.Item>
  </Flex>
  <Flex withVisualDebug direction="column-reverse">
    <Flex.Item><Text>One</Text></Flex.Item>
    <Flex.Item><Text>Two</Text></Flex.Item>
    <Flex.Item><Text>Three</Text></Flex.Item>
    <Flex.Item><Text>Four</Text></Flex.Item>
  </Flex>
</div>
```

### Gap between Flex.Items

Flex items will have no gap by default. You can set the gap between Flex.Items by using the `gap` property.

```js
---
type: example
---
<div>
  <Flex withVisualDebug margin="none none large" gap="small">
    <Flex.Item><Text>One</Text></Flex.Item>
    <Flex.Item><Text>Two</Text></Flex.Item>
    <Flex.Item><Text>Three</Text></Flex.Item>
    <Flex.Item><Text>Four</Text></Flex.Item>
  </Flex>
  <Flex withVisualDebug direction="column" margin="none none large" gap="medium">
    <Flex.Item><Text>One</Text></Flex.Item>
    <Flex.Item><Text>Two</Text></Flex.Item>
    <Flex.Item><Text>Three</Text></Flex.Item>
    <Flex.Item><Text>Four</Text></Flex.Item>
  </Flex>
  <Flex withVisualDebug direction="row-reverse" margin="none none large" gap="medium">
    <Flex.Item><Text>One</Text></Flex.Item>
    <Flex.Item><Text>Two</Text></Flex.Item>
    <Flex.Item><Text>Three</Text></Flex.Item>
    <Flex.Item><Text>Four</Text></Flex.Item>
  </Flex>
  <Flex withVisualDebug direction="column-reverse" gap="small">
    <Flex.Item><Text>One</Text></Flex.Item>
    <Flex.Item><Text>Two</Text></Flex.Item>
    <Flex.Item><Text>Three</Text></Flex.Item>
    <Flex.Item><Text>Four</Text></Flex.Item>
  </Flex>
</div>
```

You can also set the gap between rows and columns by using the `gap` property. Make sure that the `wrap` property is set to `wrap` or `wrap-reverse`.

```js
---
type: example
---
<div>
  <Flex withVisualDebug margin="none none large" gap="small" wrap="wrap">
    <Flex.Item size='25rem'><Text>One</Text></Flex.Item>
    <Flex.Item size='25rem'><Text>Two</Text></Flex.Item>
    <Flex.Item size='25rem'><Text>Three</Text></Flex.Item>
    <Flex.Item size='25rem'><Text>Four</Text></Flex.Item>
  </Flex>
  <Flex withVisualDebug margin="none none large" gap="small large" wrap="wrap">
    <Flex.Item size='25rem'><Text>One</Text></Flex.Item>
    <Flex.Item size='25rem'><Text>Two</Text></Flex.Item>
    <Flex.Item size='25rem'><Text>Three</Text></Flex.Item>
    <Flex.Item size='25rem'><Text>Four</Text></Flex.Item>
  </Flex>
  <Flex withVisualDebug margin="none none large" gap="small" wrap="wrap-reverse">
    <Flex.Item size='25rem'><Text>One</Text></Flex.Item>
    <Flex.Item size='25rem'><Text>Two</Text></Flex.Item>
    <Flex.Item size='25rem'><Text>Three</Text></Flex.Item>
    <Flex.Item size='25rem'><Text>Four</Text></Flex.Item>
  </Flex>
  <Flex withVisualDebug margin="none none large" gap="small large" wrap="wrap-reverse">
    <Flex.Item size='25rem'><Text>One</Text></Flex.Item>
    <Flex.Item size='25rem'><Text>Two</Text></Flex.Item>
    <Flex.Item size='25rem'><Text>Three</Text></Flex.Item>
    <Flex.Item size='25rem'><Text>Four</Text></Flex.Item>
  </Flex>
</div>
```

### Sizing Flex.Items

By default, Flex.Items **expand to fit their contents**, even if that means overflowing
their container.

```js
---
type: example
---
<Flex withVisualDebug>
  <Flex.Item padding="x-small">
    <Text>Villum dolore eu fugiat nulla pariatur.</Text>
  </Flex.Item>
  <Flex.Item padding="x-small">
    <Text>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</Text>
  </Flex.Item>
  <Flex.Item padding="x-small">
    <Text>Duis aute irure.</Text>
  </Flex.Item>
  <Flex.Item padding="x-small">
    <Text>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
  </Flex.Item>
</Flex>
```

Adding the `shouldShrink` property forces the Flex.Item to shrink as needed to fit inside its
container.

```js
---
type: example
---
<Flex withVisualDebug>
  <Flex.Item padding="x-small" shouldShrink>
    <Text>Villum dolore eu fugiat nulla pariatur.</Text>
  </Flex.Item>
  <Flex.Item padding="x-small" shouldShrink>
    <Text>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</Text>
  </Flex.Item>
  <Flex.Item padding="x-small" shouldShrink>
    <Text>Duis aute irure.</Text>
  </Flex.Item>
  <Flex.Item padding="x-small" shouldShrink>
    <Text>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
  </Flex.Item>
</Flex>
```

The `shouldGrow` property forces the Flex.Item to expand to fill in any available space.

```js
---
type: example
---
<Flex withVisualDebug>
  <Flex.Item padding="x-small" shouldShrink shouldGrow>
    <Text>I am growing and shrinking!</Text>
  </Flex.Item>
  <Flex.Item>
    <Text>I am not shrinking or growing.</Text>
  </Flex.Item>
</Flex>
```

The `size` property sets the base size (accepts px, em, rem) for the Flex.Item. If the
`direction` property is `row`, this is the item's **width**. If `direction` is `column`,
then it is the item's **height**. Flex.Items can grow beyond their `size`, but cannot
shrink to less than their `size`.

```js
---
type: example
---
<Flex withVisualDebug>
  <Flex.Item padding="x-small" size="200px">
    <Text>I am always 200px.</Text>
  </Flex.Item>
  <Flex.Item padding="x-small" shouldShrink shouldGrow size="200px">
    <Text>I can grow, and shrink down to 200px.</Text>
  </Flex.Item>
  <Flex.Item padding="x-small" size="25%">
    <Text>I am always 25%.</Text>
  </Flex.Item>
</Flex>
```

### Aligning Flex.Items

By default, Flex aligns its Flex.Items along the `center` of the axis. Use the `alignItems`
property to change this behavior.

`alignItems` can be overridden on individual Flex.Items through Flex.Item's `align` property.

```js
---
type: example
---
<Flex alignItems="end" withVisualDebug>
  <Flex.Item>
    <Avatar name="Sarah Robinson" size="large" src={avatarSquare} />
  </Flex.Item>
  <Flex.Item shouldGrow shouldShrink>
    <Text>I should be aligned to the bottom of the Avatar.</Text>
  </Flex.Item>
  <Flex.Item>
    <Text>Me, too.</Text>
  </Flex.Item>
  <Flex.Item align="start">
    <Text>I am aligning myself to the top.</Text>
  </Flex.Item>
</Flex>
```

### Justifying Flex.Items

Use the `justifyItems` property to change the justification of Flex.Items.

```js
---
type: example
---
<div>
  <Flex justifyItems="center" margin="0 0 large" withVisualDebug>
    <Flex.Item>
      <Avatar name="Sarah Robinson" size="large" src={avatarSquare} />
    </Flex.Item>
    <Flex.Item>
      <Text>We are all centered!</Text>
    </Flex.Item>
    <Flex.Item>
      <Text>Yeah!</Text>
    </Flex.Item>
  </Flex>

  <Flex justifyItems="space-between" withVisualDebug margin="0 0 large">
    <Flex.Item>
      <Avatar name="Sarah Robinson" size="large" src={avatarSquare} />
    </Flex.Item>
    <Flex.Item>
      <Text>Ah, a little more space.</Text>
    </Flex.Item>
    <Flex.Item>
      <Text>Totally.</Text>
    </Flex.Item>
  </Flex>

  <Flex justifyItems="end" withVisualDebug>
    <Flex.Item>
      <Avatar name="Sarah Robinson" size="large" src={avatarSquare} />
    </Flex.Item>
    <Flex.Item>
      <Text>Smooshed again.</Text>
    </Flex.Item>
    <Flex.Item>
      <Text>Ugh.</Text>
    </Flex.Item>
  </Flex>
</div>
```

### Handling overflow

When `direction` is set to `column`, Flex.Items' `overflowY` property is automagically set
to `auto` to account for content overflow with a vertical scrollbar. Add padding, so focus rings are not cut off.

> To override this default, simply set `overflowY` on the Flex.Item to either `visible` or `hidden`.

```js
---
type: example
---
  <Flex
    withVisualDebug
    direction="column"
  >
    <Flex.Item padding="small">
      <Heading>Pandas are cute, right?</Heading>
    </Flex.Item>
    <Flex.Item>
      <TextInput name="name" renderLabel="If you dont add padding, the focus ring will be cut off!" />
    </Flex.Item>
    <Flex.Item size="150px" padding="small">
      <Img src={avatarSquare} />
    </Flex.Item>
  </Flex>
```

### A few common layouts

#### Heading and button combination

```js
---
type: example
---
<Flex>
  <Flex.Item shouldGrow shouldShrink padding="none medium none none">
    <Heading>Lorem ipsum dolor sit amet consectetur dolor sit</Heading>
  </Flex.Item>
  <Flex.Item>
    <Button margin="none x-small none none">
      Cancel
    </Button>
    <Button color="success" renderIcon={UserInstUIIcon}>
      Add user
    </Button>
  </Flex.Item>
</Flex>
```

#### Centered content (note the nested Flex components and use of the `wrap` property)

```js
---
type: example
---
<Flex height="32rem" justifyItems="center" padding="large" withVisualDebug>
  <Flex.Item shouldShrink shouldGrow textAlign="center">

    <Heading level="h1" margin="0 0 medium">An amazing thing!</Heading>

    <Flex withVisualDebug wrap="wrap" justifyItems="space-around" margin="0 0 medium">
      <Flex.Item padding="small">
        <HeartInstUIIcon size="medium" title="Icon Example" color="primary" />
        <Text weight="bold" size="large" as="div">We love you!</Text>
      </Flex.Item>
      <Flex.Item padding="small">
        <HeartInstUIIcon size="medium" title="Icon Example" color="primary" />
        <Text weight="bold" size="large" as="div">We love you!</Text>
      </Flex.Item>
      <Flex.Item padding="small">
        <HeartInstUIIcon size="medium" title="Icon Example" color="primary" />
        <Text weight="bold" size="large" as="div">We love you!</Text>
      </Flex.Item>
    </Flex>

    <div>
      <Button color="primary" size="large">Sign up now!</Button>
    </div>

  </Flex.Item>
</Flex>
```

#### Quick and dirty mobile app layout

```js
---
type: example
---

<Flex height="400px" width="300px" as="div" direction="column" withVisualDebug>

  <Flex.Item padding="small" as="header" textAlign="center">
    <Heading level="h3">App</Heading>
  </Flex.Item>

  <Flex.Item shouldGrow shouldShrink padding="small" as="main">
    <Text>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
  </Flex.Item>

  <Flex.Item padding="small" as="footer">

    <Flex withVisualDebug justifyItems="space-between">
      <Flex.Item>
        <IconButton
          renderIcon={MailInstUIIcon}
          withBackground={false}
          withBorder={false}
          screenReaderLabel="Some app function"
        />
      </Flex.Item>
      <Flex.Item>
        <IconButton
          renderIcon={PrinterInstUIIcon}
          withBackground={false}
          withBorder={false}
          screenReaderLabel="Some app function"
        />
      </Flex.Item>
      <Flex.Item>
        <IconButton
          renderIcon={Calendar1InstUIIcon}
          withBackground={false}
          withBorder={false}
          screenReaderLabel="Some app function"
        />
      </Flex.Item>
      <Flex.Item>
        <IconButton
          renderIcon={SettingsInstUIIcon}
          withBackground={false}
          withBorder={false}
          screenReaderLabel="Some app function"
        />
      </Flex.Item>
    </Flex>

  </Flex.Item>
</Flex>
```
