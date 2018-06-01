---
describes: Badge
---

### Making badges accessible
Badge counts are automatically fed to screenreaders through the `aria-describedby`
attribute. Often, though, a number alone doesn't give a screenreader user enough context.
The examples below use the `formatOutput` prop to make the badge more screenreader-friendly.

Note the use of the `pulse` prop to make the Badge slowly pulse twice on mount,

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
      <Button variant="icon" icon={IconUser.Solid}>
        <ScreenReaderContent>Edits</ScreenReaderContent>
      </Button>
    </Badge>
    <Badge
      type="notification"
      formatOutput={function () {
        return <ScreenReaderContent>You have new edits to review</ScreenReaderContent>
      }}
    >
      <Button variant="icon" icon={IconUser.Solid}>
        <ScreenReaderContent>Edits</ScreenReaderContent>
      </Button>
    </Badge>
  </div>
```

### countUntil

Use the `countUntil` prop to set a limit for the count. Format the overflow
text using `formatOverflowText` (default is "+").

```js
---
example: true
---
<div>
  <Badge count={100} countUntil={100} margin="0 medium 0 0">
    <Button>Inbox</Button>
  </Badge>
  <Badge
    count={100}
    countUntil={100}
    formatOverflowText={function (count, countUntil) {
      return 'Over ' + (countUntil - 1)
    }}
  >
    <Button>
      Assignments
    </Button>
  </Badge>
</div>
```

### Standalone badges and color variants

Setting the `standalone` prop to `true` renders Badge as a standalone
element that is not positioned relative to a child and displays inline-block.

```js
---
example: true
---
<div>
  <Badge standalone count={6} />
  &nbsp;&nbsp;
  <Badge standalone variant="success" count={12} />
  &nbsp;&nbsp;
  <Badge standalone variant="danger" count={18} countUntil={10} />
  &nbsp;&nbsp;
  <Badge standalone type="notification" />
  &nbsp;&nbsp;
  <Badge standalone type="notification" variant="success" />
  &nbsp;&nbsp;
  <Badge standalone type="notification" variant="danger" />
</div>
```

### placement

Default is `top end`. Note that standalone badges can't be placed.

```js
---
example: true
---
<div>
  <View as="div" margin="0 0 medium">
    <Badge count={21} margin="0 large 0 0" placement="top start">
      <Button variant="icon" icon={IconUser.Solid}>
        <ScreenReaderContent>Edit page</ScreenReaderContent>
      </Button>
    </Badge>
    <Badge count={21} margin="0 large 0 0">
      <Button variant="icon" icon={IconUser.Solid}>
        <ScreenReaderContent>Edit page</ScreenReaderContent>
      </Button>
    </Badge>
    <Badge count={21} margin="0 large 0 0" placement="bottom start">
      <Button variant="icon" icon={IconUser.Solid}>
        <ScreenReaderContent>Edit page</ScreenReaderContent>
      </Button>
    </Badge>
    <Badge count={21} margin="0 large 0 0" placement="bottom end">
      <Button variant="icon" icon={IconUser.Solid}>
        <ScreenReaderContent>Edit page</ScreenReaderContent>
      </Button>
    </Badge>
    <Badge count={21} margin="0 large 0 0" placement="start center">
      <Button variant="icon" icon={IconUser.Solid}>
        <ScreenReaderContent>Edit page</ScreenReaderContent>
      </Button>
    </Badge>
    <Badge count={21} placement="end center">
      <Button variant="icon" icon={IconUser.Solid}>
        <ScreenReaderContent>Edit page</ScreenReaderContent>
      </Button>
    </Badge>
  </View>
  <View as="div">
    <Badge type="notification" margin="0 large 0 0" placement="top start">
      <Button variant="icon" icon={IconUser.Solid}>
        <ScreenReaderContent>Edit page</ScreenReaderContent>
      </Button>
    </Badge>
    <Badge type="notification" margin="0 large 0 0">
      <Button variant="icon" icon={IconUser.Solid}>
        <ScreenReaderContent>Edit page</ScreenReaderContent>
      </Button>
    </Badge>
    <Badge type="notification" margin="0 large 0 0" placement="bottom start">
      <Button variant="icon" icon={IconUser.Solid}>
        <ScreenReaderContent>Edit page</ScreenReaderContent>
      </Button>
    </Badge>
    <Badge type="notification" margin="0 large 0 0" placement="bottom end">
      <Button variant="icon" icon={IconUser.Solid}>
        <ScreenReaderContent>Edit page</ScreenReaderContent>
      </Button>
    </Badge>
    <Badge type="notification" margin="0 large 0 0" placement="start center">
      <Button variant="icon" icon={IconUser.Solid}>
        <ScreenReaderContent>Edit page</ScreenReaderContent>
      </Button>
    </Badge>
    <Badge type="notification" placement="end center">
      <Button variant="icon" icon={IconUser.Solid}>
        <ScreenReaderContent>Edit page</ScreenReaderContent>
      </Button>
    </Badge>
  </View>
</div>
```
