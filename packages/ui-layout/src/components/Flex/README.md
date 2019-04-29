---
describes: Flex
---

The Flex component makes it simple for developers to create multi-column
layouts with flexbox.

### Layout direction

**Note:** Use the `visualDebug` property to see the borders of Flex/FlexItem while developing!

Flex defaults to a `direction` of `row`, creating a horizontal layout. Change `direction` to
`column` to stack your FlexItems.

> **Unless your layout has a specific/finite height, you probably don't need `direction="column"`.** To create a
layout of stacked elements, it is simpler to use multiple [View](#View) components with `display="block"`.

```js
---
example: true
---
<div>
  <Flex visualDebug margin="none none large">
    <FlexItem>One</FlexItem>
    <FlexItem>Two</FlexItem>
    <FlexItem>Three</FlexItem>
    <FlexItem>Four</FlexItem>
  </Flex>
  <Flex visualDebug direction="column" margin="none none large">
    <FlexItem>One</FlexItem>
    <FlexItem>Two</FlexItem>
    <FlexItem>Three</FlexItem>
    <FlexItem>Four</FlexItem>
  </Flex>
  <Flex visualDebug direction="row-reverse" margin="none none large">
    <FlexItem>One</FlexItem>
    <FlexItem>Two</FlexItem>
    <FlexItem>Three</FlexItem>
    <FlexItem>Four</FlexItem>
  </Flex>
  <Flex visualDebug direction="column-reverse">
    <FlexItem>One</FlexItem>
    <FlexItem>Two</FlexItem>
    <FlexItem>Three</FlexItem>
    <FlexItem>Four</FlexItem>
  </Flex>
</div>
```

### Sizing FlexItems

By default, FlexItems **expand to fit their contents**, even if that means overflowing
their container.

```js
---
example: true
---
<Flex visualDebug>
  <FlexItem padding="x-small">
    Villum dolore eu fugiat nulla pariatur.
  </FlexItem>
  <FlexItem padding="x-small">
    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
  </FlexItem>
  <FlexItem padding="x-small">
    Duis aute irure.
  </FlexItem>
  <FlexItem padding="x-small">
    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
  </FlexItem>
</Flex>
```

Adding the `shrink` property forces the FlexItem to shrink as needed to fit inside its
container.

```js
---
example: true
---
<Flex visualDebug>
  <FlexItem padding="x-small" shrink>
    Villum dolore eu fugiat nulla pariatur.
  </FlexItem>
  <FlexItem padding="x-small" shrink>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
  </FlexItem>
  <FlexItem padding="x-small" shrink>
    Duis aute irure.
  </FlexItem>
  <FlexItem padding="x-small" shrink>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
  </FlexItem>
</Flex>
```

The `grow` property forces the FlexItem to expand to fill in any available space.

```js
---
example: true
---
<Flex visualDebug>
  <FlexItem padding="x-small" shrink grow>
    I am growing and shrinking!
  </FlexItem>
  <FlexItem>
    I am not shrinking or growing.
  </FlexItem>
</Flex>
```

The `size` property sets the base size (accepts px, em, rem) for the FlexItem. If the
`direction` property is `row`, this is the item's **width**. If `direction` is `column`,
then it is the item's **height**. FlexItems can `grow` beyond their `size`, but cannot
`shrink` to less than their `size`.

```js
---
example: true
---
<Flex visualDebug>
  <FlexItem padding="x-small" size="200px">
    I am always 200px.
  </FlexItem>
  <FlexItem padding="x-small" shrink grow size="200px">
    I can grow, and shrink down to 200px.
  </FlexItem>
  <FlexItem padding="x-small" size="25%">
    I am always 25%.
  </FlexItem>
</Flex>
```

### Aligning FlexItems
By default, Flex aligns its FlexItems along the `center` of the axis. Use the `alignItems`
property to change this behavior.

`alignItems` can be overridden on individual FlexItems through FlexItem's `align` property.

```js
---
example: true
---
<Flex alignItems="end" visualDebug>
  <FlexItem>
    <Avatar name="Sarah Robinson" size="large" src={avatarSquare} />
  </FlexItem>
  <FlexItem grow shrink>
    I should be aligned to the bottom of the Avatar.
  </FlexItem>
  <FlexItem>
    Me, too.
  </FlexItem>
  <FlexItem align="start">
    I am aligning myself to the top.
  </FlexItem>
</Flex>
```

### Justifying FlexItems
Use the `justifyItems` property to change the justification of FlexItems.

```js
---
example: true
---
<div>
  <Flex justifyItems="center" margin="0 0 large" visualDebug>
    <FlexItem>
      <Avatar name="Sarah Robinson" size="large" src={avatarSquare} />
    </FlexItem>
    <FlexItem>
      We are all centered!
    </FlexItem>
    <FlexItem>
      Yeah!
    </FlexItem>
  </Flex>

  <Flex justifyItems="space-between" visualDebug margin="0 0 large">
    <FlexItem>
      <Avatar name="Sarah Robinson" size="large" src={avatarSquare} />
    </FlexItem>
    <FlexItem>
      Ah, a little more space.
    </FlexItem>
    <FlexItem>
      Totally.
    </FlexItem>
  </Flex>

  <Flex justifyItems="end" visualDebug>
    <FlexItem>
      <Avatar name="Sarah Robinson" size="large" src={avatarSquare} />
    </FlexItem>
    <FlexItem>
      Smooshed again.
    </FlexItem>
    <FlexItem>
      Ugh.
    </FlexItem>
  </Flex>
</div>
```

### Handling overflow
When `direction` is set to `column`, FlexItems' `overflowY` property is automagically set
to `auto` to account for content overflow with a vertical scrollbar.

> To override this default, simply set `overflowY` on the FlexItem to either `visible` or `hidden`.

```js
---
example: true
---
<Flex
  visualDebug
  direction="column"
>
  <FlexItem padding="small">
    <Heading>Pandas are cute, right?</Heading>
  </FlexItem>
  <FlexItem size="150px" padding="small">
    <Img src={avatarSquare} />
  </FlexItem>
</Flex>
```

### A few common layouts

#### Heading and button combination

```js
---
example: true
---
<Flex>
  <FlexItem grow shrink padding="none medium none none">
    <Heading>Lorem ipsum dolor sit amet consectetur dolor sit</Heading>
  </FlexItem>
  <FlexItem>
    <Button margin="none x-small none none">
      Cancel
    </Button>
    <Button variant="success" icon={IconUserSolid}>
      Add user
    </Button>
  </FlexItem>
</Flex>
```

#### Centered content (note the nested Flex components and use of the `wrapItems` property)

```js
---
example: true
---
<Flex height="32rem" justifyItems="center" padding="large" visualDebug>
  <FlexItem shrink grow textAlign="center">

    <Heading level="h1" margin="0 0 medium">An amazing thing!</Heading>

    <Flex visualDebug wrapItems justifyItems="space-around" margin="0 0 medium">
      <FlexItem padding="small">
        <SVGIcon src={iconExample} size="medium" title="Icon Example" />
        <Text weight="bold" size="large" as="div">We love you!</Text>
      </FlexItem>
      <FlexItem padding="small">
        <SVGIcon src={iconExample} size="medium" title="Icon Example" />
        <Text weight="bold" size="large" as="div">We love you!</Text>
      </FlexItem>
      <FlexItem padding="small">
        <SVGIcon src={iconExample} size="medium" title="Icon Example" />
        <Text weight="bold" size="large" as="div">We love you!</Text>
      </FlexItem>
    </Flex>

    <div>
      <Button variant="primary" size="large">Sign up now!</Button>
    </div>

  </FlexItem>
</Flex>
```

#### Quick and dirty mobile app layout

```js
---
example: true
---

<Flex height="400px" width="300px" as="div" direction="column" visualDebug>

  <FlexItem padding="small" as="header" textAlign="center">
    <Heading level="h3">App</Heading>
  </FlexItem>

  <FlexItem grow shrink padding="small" as="main">
    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  </FlexItem>

  <FlexItem padding="small" as="footer">

    <Flex visualDebug justifyItems="space-between">
      <FlexItem>
        <Button variant="icon" icon={IconEmailLine}>
          <ScreenReaderContent>Some app function</ScreenReaderContent>
        </Button>
      </FlexItem>
      <FlexItem>
        <Button variant="icon" icon={IconPrinterLine}>
          <ScreenReaderContent>Some app function</ScreenReaderContent>
        </Button>
      </FlexItem>
      <FlexItem>
        <Button variant="icon" icon={IconCalendarDayLine}>
          <ScreenReaderContent>Some app function</ScreenReaderContent>
        </Button>
      </FlexItem>
      <FlexItem>
        <Button variant="icon" icon={IconSettingsLine}>
          <ScreenReaderContent>Some app function</ScreenReaderContent>
        </Button>
      </FlexItem>
    </Flex>

  </FlexItem>
</Flex>
```
