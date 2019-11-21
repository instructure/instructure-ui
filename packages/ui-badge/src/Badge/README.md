---
describes: Badge
---

### Making badges accessible
Badge counts are automatically fed to screenreaders through the `aria-describedby`
attribute. Often a stand alone number doesn't give a screenreader user enough context (_"3" vs. "You have 3 unread emails"_).
The examples below use the `formatOutput` prop to make the badge more screenreader-friendly.

```js
---
example: true
---
  <div>
    <Badge
      count={99}
      pulse
      margin="0 medium 0 0"
      formatOutput={function (formattedCount) {
        return (
          <AccessibleContent alt={`You have ${formattedCount} new edits to review`}>
            {formattedCount}
          </AccessibleContent>
        )
      }}
    >
      <IconButton
        renderIcon={IconUserSolid}
        screenReaderLabel="Edits"
        withBorder={false}
        withBackground={false}
      />
    </Badge>
    <Badge
      type="notification"
      formatOutput={function () {
        return <ScreenReaderContent>You have new edits to review</ScreenReaderContent>
      }}
    >
      <IconButton
        renderIcon={IconUserSolid}
        screenReaderLabel="Edits"
        withBorder={false}
        withBackground={false}
      />
    </Badge>
  </div>
```

> Note the use of the `pulse` prop in the first example to make the Badge slowly pulse twice on mount.

### Limit the count

Use the `countUntil` prop to set a limit for the count. The default for `formatOverflowText` is a "+" symbol.

```js
---
example: true
---
<div>
  <Badge count={105} countUntil={100} margin="0 medium 0 0">
    <Button>Inbox</Button>
  </Badge>
  <Badge count={250} countUntil={100}>
    <Button>Assignments</Button>
  </Badge>
</div>
```

### Standalone, notification and color variants

Setting the `standalone` prop to `true` renders Badge as a standalone
element that is not positioned relative to a child and displays inline-block.
Setting `type="notification"` will render small circles that should not contain any visible text.

```js
---
example: true
---
<div>
  <Badge standalone count={6} margin="0 small 0 0" />
  <Badge standalone variant="success" count={12} margin="0 small 0 0"  />
  <Badge standalone variant="danger" count={18} countUntil={10} margin="0 small 0 0" />
  <Badge
    type="notification"
    standalone
    formatOutput={function () {
      return <ScreenReaderContent>This is a notification</ScreenReaderContent>
    }}
    margin="0 small 0 0"
  />
  <Badge
    variant="success"
    type="notification"
    standalone
    formatOutput={function () {
      return <ScreenReaderContent>This is a success notification</ScreenReaderContent>
    }}
    margin="0 small 0 0"
  />
  <Badge
    variant="danger"
    type="notification"
    standalone
    formatOutput={function () {
      return <ScreenReaderContent>This is a danger notification</ScreenReaderContent>
    }}
  />
</div>
```

### Placement

Default is `top end`. __Note that standalone badges can't be placed.__

```js
---
example: true
render: false
---
const EditButton = () => (
  <IconButton
    renderIcon={IconUserSolid}
    screenReaderLabel="Edit page"
    withBorder={false}
    withBackground={false}
  />
)

const Example = () => (
  <div>
    <View as="div" margin="0 0 medium">
      <Badge count={21} margin="0 large 0 0" placement="top start">
        <EditButton />
      </Badge>
      <Badge count={21} margin="0 large 0 0">
        <EditButton />
      </Badge>
      <Badge count={21} margin="0 large 0 0" placement="bottom start">
        <EditButton />
      </Badge>
      <Badge count={21} margin="0 large 0 0" placement="bottom end">
        <EditButton />
      </Badge>
      <Badge count={21} margin="0 large 0 0" placement="start center">
        <EditButton />
      </Badge>
      <Badge count={21} placement="end center">
        <EditButton />
      </Badge>
    </View>
    <View as="div">
      <Badge
        type="notification"
        margin="0 large 0 0"
        placement="top start"
        formatOutput={function () {
          return <ScreenReaderContent>Updates are available for your account</ScreenReaderContent>
        }}
      >
        <EditButton />
      </Badge>
      <Badge
        type="notification"
        margin="0 large 0 0"
        formatOutput={function () {
          return <ScreenReaderContent>Updates are available for your account</ScreenReaderContent>
        }}
      >
        <EditButton />
      </Badge>
      <Badge
        type="notification"
        margin="0 large 0 0"
        placement="bottom start"
        formatOutput={function () {
          return <ScreenReaderContent>Updates are available for your account</ScreenReaderContent>
        }}
      >
        <EditButton />
      </Badge>
      <Badge
        type="notification"
        margin="0 large 0 0"
        placement="bottom end"
        formatOutput={function () {
          return <ScreenReaderContent>Updates are available for your account</ScreenReaderContent>
        }}
      >
        <EditButton />
      </Badge>
      <Badge
        type="notification"
        margin="0 large 0 0"
        placement="start center"
        formatOutput={function () {
          return <ScreenReaderContent>Updates are available for your account</ScreenReaderContent>
        }}
      >
        <EditButton />
      </Badge>
      <Badge
        type="notification"
        placement="end center"
        formatOutput={function () {
          return <ScreenReaderContent>Updates are available for your account</ScreenReaderContent>
        }}
      >
        <EditButton />
      </Badge>
    </View>
  </div>
)

render(<Example />)
```
### Guidelines

```js
---
guidelines: true
---
<Guidelines>
  <Figure recommendation="yes" title="Do">
    <Figure.Item>Use count for up to 2 digits of numbers</Figure.Item>
    <Figure.Item>Use "+" symbol for more than 2 digits (99+)</Figure.Item>
    <Figure.Item>Use for numeric count (like unread messages)</Figure.Item>
    <Figure.Item>Provide accessible text for what the number represents</Figure.Item>
  </Figure>
  <Figure recommendation="no" title="Don't">
    <Figure.Item>Use as a status indicator refer to Pill</Figure.Item>
    <Figure.Item>Use for text strings</Figure.Item>
  </Figure>
</Guidelines>
```
