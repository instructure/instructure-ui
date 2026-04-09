---
describes: IconButton
---

An IconButton can be used when the Button only renders an Icon and does not have other visual elements or text content.
It is not recommended to set the size of an icon inside an IconButton. Only use the `size` property of the IconButton.

```js
---
type: example
---
<IconButton screenReaderLabel="Add User"><PlusInstUIIcon /></IconButton>
```

### Sizes

```js
---
type: example
---
<View display="block">
  <IconButton size="small" screenReaderLabel="Add" margin="small"><PlusInstUIIcon /></IconButton>
  <IconButton size="medium" screenReaderLabel="Add" margin="small"><PlusInstUIIcon /></IconButton>
  <IconButton size="large" screenReaderLabel="Add" margin="small"><PlusInstUIIcon /></IconButton>
</View>
```

There are also two condensed size variants for compact layouts: `condensedSmall` and `condensedMedium`. These are designed to be used inside other components, such as a [TextInput](TextInput).

```js
---
type: example
---
const PasswordInput = () => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <View as="div" maxWidth="20rem">
    <TextInput
      renderLabel="Password"
      type={showPassword ? 'text' : 'password'}
      renderAfterInput={
        <IconButton
          size="condensedMedium"
          withBackground={false}
          withBorder={false}
          screenReaderLabel={showPassword ? 'Hide password' : 'Show password'}
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeOffInstUIIcon /> : <EyeInstUIIcon />}
        </IconButton>
      }
    />
    </View>
  )
}

render(<PasswordInput />)
```

### Accessibility

Because the IconButton visually only renders an icon, a description is necessary for assistive technologies. The `screenReaderLabel` prop is required for this purpose, and should consist of a complete description of the action.

```js
---
type: example
---
<IconButton color="primary" screenReaderLabel="Add blog post"><PlusInstUIIcon /></IconButton>
```

Using [Tooltip](Tooltip) in conjunction with IconButton can also provide necessary context when the IconButton alone would be insufficient.

```js
---
type: example
---
<Tooltip
  renderTip="View user profile"
  on={['hover', 'focus']}
  placement="bottom"
>
  <IconButton screenReaderLabel="View user profile"><UserInstUIIcon /></IconButton>
</Tooltip>
```

### AI Icon buttons

```js
---
type: example
---
<View display="block">
  <IconButton color="ai-primary" screenReaderLabel="AI button" margin="small"><IgniteaiLogoInstUIIcon/></IconButton>
  <IconButton color="ai-secondary" screenReaderLabel="AI button"  margin="small"><IgniteaiLogoInstUIIcon/></IconButton>
</View>
```

### Shaping

The `shape` prop specifies if the IconButton will render as a `rectangle` or `circle`.

```js
---
type: example
---
<View display="block">
  <IconButton shape="rectangle" screenReaderLabel="Delete tag" margin="small"><XInstUIIcon /></IconButton>
  <IconButton shape="circle" screenReaderLabel="Delete tag" margin="small"><XInstUIIcon /></IconButton>
</View>
```

### Rendering only the icon

The background and border can be optionally removed as needed by setting the `withBorder` and `withBackground` props to `false`

```js
---
type: example
---
<View display="block">
  <View display="inline-block" background="primary">
    <IconButton withBackground={false} withBorder={false} screenReaderLabel="Delete tag" margin="large">
      <XInstUIIcon />
    </IconButton>
  </View>
</View>
```

### Styling

For an example see [Button](Button/#Styling%20buttons)
