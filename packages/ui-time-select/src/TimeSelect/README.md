---
describes: TimeSelect
---

`TimeSelect` component is a higher level abstraction of [Select](Select) specifically for selecting time values. The list of possible values can be configured via the component's props.

### Uncontrolled

For the most basic implementations, `TimeSelect` can be uncontrolled. If desired, the `defaultValue` prop can be used to set the initial selection.

```javascript
---
type: example
---
<TimeSelect
  renderLabel="Choose a time"
  onChange={(e, { value }) => console.log(value)}
  onHideOptions={(e)=> console.log("hide opts")}
  // defaultValue={new Date().toISOString()}
/>
```

### Controlled

To use `TimeSelect` controlled, simply provide the `value` prop an ISO string. The `onChange` callback provides the ISO value of the corresponding option that was selected. Use this value to update the state.

```js
---
type: example
---
const Example = () => {
  const [value, setValue] = useState('2020-05-18T23:59:00')

  const handleChange = (e, { value }) => {
    setValue(value)
  }

  return (
    <TimeSelect
      renderLabel="Choose a time"
      placeholder="e.g., 4:00:00 PM"
      value={value}
      step={15}
      format="LTS"
      onChange={handleChange}
    />
  )
}

render(<Example />)
```

### Freeform input

By default, the user can only set a value that is divisible by `step` (although the component allows to set any valid time value programmatically). You can allow the user to set any valid value with typing in by setting `allowNonStepInput` to `true`. You can use the `onInputChange` event to see whether the current input is valid and its current value.
Note that the exact value needed to be typed by the user depends on their `locale`:

```javascript
---
type: example
---
<TimeSelect
  renderLabel="Choose a time"
  onChange={(e, { value }) => console.log("change",value)}
  onInputChange={(e, value, isoValue)=> console.log("inputChange", value, isoValue)}
  defaultValue="2022-05-12T05:30:00.000Z"
  locale="en_AU"
  timezone='US/Eastern'
  allowNonStepInput
/>
```

### Guidelines

```js
---
type: embed
---
<Guidelines>
  <Figure recommendation="yes" title="Do">
    <Figure.Item>Use a default value of 11:59 pm for implementations that have to do with due dates</Figure.Item>
    <Figure.Item>Respect the user's `locale` and `timezone` browser settings (the component does this by itself when not setting `locale` or `timezone`).</Figure.Item>
  </Figure>
</Guidelines>
```
