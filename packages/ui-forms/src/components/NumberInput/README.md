---
describes: NumberInput
---

A standard number input field with placeholder

```js
---
example: true
---
<NumberInput
  label="Age (in years)"
  placeholder="Your age goes here"
  min={1}
/>
```

A disabled number input field

```js
---
example: true
---
<NumberInput
  label="Age (in years)"
  disabled
  defaultValue="4"
/>
```

A number input field with minimum set to 30

```js
---
example: true
---
<NumberInput
  label="Monitor refresh rate"
  min={30}
  defaultValue="32"
/>
```

A number input field with minimum and maximum

```js
---
example: true
---
<NumberInput
  label="Two digit number or less, divisible by 7"
  min={-98}
  max={98}
  step={7}
/>
```

A number input field with step set to 0.1

```js
---
example: true
---
<NumberInput label="Battery capacity in Amp-hrs" step={0.1} min={0.1} />
```

A controlled number input

```js
---
example: true
render: false
---
class Example extends React.Component {
  state = {
    number: 0.1
  };

  handleChange = (event, number) => this.setState({ number });

  render () {
    return (
      <div>
        <NumberInput
          {...this.props}
          value={this.state.number}
          onChange={this.handleChange}
        />
        <br />
        <Button onClick={() => this.handleChange({}, '5')}>
          Go with 5
        </Button>
      </div>
    )
  }
}

render(<Example label="Battery capacity in Amp-hrs" step={0.1} min={0.1} />)
```

Number inputs with precision

```js
---
example: true
---
<div>
  <NumberInput
    label="2 decimals"
    defaultValue={0}
    decimalPrecision={2}
  />
  <br />
  <NumberInput
    label="2 significant digits"
    defaultValue={99}
    significantDigits={2}
  />
</div>
```

A controlled number input with precision

```js
---
example: true
render: false
---
class Example extends React.Component {
  state = {
    number: 9.99,
    precisionType: 'decimalPrecision',
    precisionValue: 2,
    precision: 2
  }

  handleNumberChange = (event, number) => this.setState({ number })

  handlePrecisionChange = (event, precisionValue, precision) => {
    this.setState({
      precisionValue,
      precision: precision ? Number(precision) : null
    })
  }

  render () {
    return (
      <div>
        <Select label="Precision type" onChange={(e, o) => this.setState({ precisionType: o.value })}>
          <option value="decimalPrecision">Decimal</option>
          <option value="significantDigits">Significant digits</option>
        </Select>
        <br />
        <NumberInput
          label={this.state.precisionType}
          min={0}
          max={10}
          decimalPrecision={0}
          value={this.state.precisionValue}
          onChange={this.handlePrecisionChange}
        />
        <br />
        <NumberInput
          label="Value"
          decimalPrecision={this.state.precisionType === 'decimalPrecision' ?  this.state.precision : null}
          significantDigits={this.state.precisionType === 'significantDigits' ?  this.state.precision : null}
          value={this.state.number}
          onChange={this.handleNumberChange}
        />
      </div>
    )
  }
}

render(<Example />)
```

The number input accepts and displays values according to the specified locale, which
can be supplied either as a property or with [ApplyLocale](#ApplyLocale). If a locale
is not specified, it will be inferred from the browser.

If the `min`, `max`, `step`, or `defaultValue` props are given as strings, they
will be parsed according to the rules of the `en-US` locale (with `.` decimal
separator). This is for backward-compatibility only; it is recommended to pass
numbers, not strings, for these props.

```js
---
example: true
render: false
---
class Example extends React.Component {
  state = { locale: 'de' };

  render () {
    const label = this.state.locale === 'de' ? "Comma separator" : "Period separator";
    return (
      <div>
        <Select
          label="Choose locale"
          onChange={(e, o) => this.setState({ locale: o.value })}>
            <option key="de" value="de">de</option>
            <option key="en" value="en">en</option>
        </Select>
        <View padding="small">
          <NumberInput
            label={label}
            step={0.1}
            min={0.1}
            locale={this.state.locale}
            defaultValue={2.4}
          />
        </View>
      </div>
    )
  }
}

render(<Example />)
```

The `onChange` prop receives the content of the input as a second argument, and
a normalized string parsed according to the current locale as the third
argument. For example, if the locale is `fr` and the input value is set to
`1,5`, the third argument to `onChange` will be `"1.5"`. Note that this third
argument will be `null` if the input string cannot be parsed.

If the `value` prop is a number, it will be formatted according to the locale on
render; if a string is given, make sure it is already in the correct format for
the locale.

The number input will attempt to format the string on blur. The `onChange`
handler will be called *before* the `onBlur` handler.

```js
---
example: true
render: false
---
class Example extends React.Component {
  state = {
    locale: 'de',
    messages: [],
    normalizedValue: '2.4',
    value: 2.4
  }

  handleChange = (event, value, normalizedValue) => {
    this.setState({ value, normalizedValue })
  }

  handleBlur = () => {
    if (this.state.value && !this.state.normalizedValue) {
      this.setState({ messages: [{ text: 'Invalid number', type: 'error' }] })
    } else {
      this.setState({ messages: [] })
    }
  }

  render () {
    const label = this.state.locale === 'de' ? "Comma separator" : "Period separator";
    return (
      <div>
        <Select
          label="Choose locale"
          onChange={(e, o) => this.setState({ locale: o.value })}
        >
          <option key="de" value="de">de</option>
          <option key="en" value="en">en</option>
        </Select>
        <View padding="small">
          <NumberInput
            label={label}
            locale={this.state.locale}
            messages={this.state.messages}
            onBlur={this.handleBlur}
            onChange={this.handleChange}
            step={0.1}
            value={this.state.value}
          />
          <p>Normalized value: <code>{JSON.stringify(this.state.normalizedValue)}</code></p>
        </View>
      </div>
    )
  }
}

render(<Example />)
```
A number input field with min set to 10.2, max to 50.8 and step set to 0.111

```js
---
example: true
---
<NumberInput label="Unpredictable numbers" min={10.2} max={50.8} step={0.111} />
```

A number input field with errors

```js
---
example: true
---
<NumberInput messages={[{ text: 'Invalid number', type: 'error' }]} label="Points" />
```

As with other forms components, setting the `layout` prop to `inline` will
horizontally align the input and the label.

Setting the boolean `inline` prop to `true` will cause the input itself to display
inline and accept a fixed `width`. *Note: IE11 needs a `width` prop if the input is `inline`.*

```js
---
example: true
---
<div>
  <View as="div" margin="0 0 medium">
    <NumberInput
      label="Points"
      layout="inline"
    />
  </View>
  <View as="div">
    <NumberInput
      label="Points"
      layout="inline"
      inline
      width="9rem"
    />
  </View>
</div>
```

A number input field with a screenreader only label

```js
---
example: true
---
<NumberInput
  label={<ScreenReaderContent>Points</ScreenReaderContent>}
  placeholder="Points"
/>
```

An inline number input field with a fixed width

```js
---
example: true
---
<Grid vAlign="bottom" colSpacing="small">
  <GridRow>
    <GridCol width="auto">
      <NumberInput
        label="Percent needed to pass"
        inline
        width="10rem"
      />
    </GridCol>
    <GridCol width="auto">
      <View margin="0 0 x-small" display="block">
        <Text weight="bold">%</Text>
      </View>
    </GridCol>
  </GridRow>
</Grid>
```

A number input field next to a [Button](#Button).

```js
---
example: true
---
<form>
  <FormFieldGroup
    layout="columns"
    vAlign="bottom"
    rowSpacing="medium"
    description={
      <ScreenReaderContent>
        Medium NumberInput + Button examples
      </ScreenReaderContent>
    }
  >
    <NumberInput label="Default-size input and button" />
    <Button>Click me</Button>
  </FormFieldGroup>
  <br/>
  <FormFieldGroup
    layout="columns"
    vAlign="bottom"
    rowSpacing="medium"
    description={
      <ScreenReaderContent>
        Large NumberInput + Button examples
      </ScreenReaderContent>
    }
  >
    <NumberInput size="large" label="Large-size input and button" />
    <Button size="large">Click me</Button>
  </FormFieldGroup>
</form>
```
