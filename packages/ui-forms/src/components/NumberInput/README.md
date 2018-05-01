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
  min="1"
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
  min="30"
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
  min="-98"
  max="98"
  step="7"
/>
```

A controlled number input

```js
---
example: true
render: false
---
class Example extends React.Component {
  state = {
    number: '0.1'
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

render(<Example label="Battery capacity in Amp-hrs" step="0.1" min="0.1" />)
```

A number input field with step set to 0.1

```js
---
example: true
---
<NumberInput label="Battery capacity in Amp-hrs" step="0.1" min="0.1" />
```

The number input accepts and displays values according to the specified locale, which
can be supplied either as a property or with [ApplyLocale](#ApplyLocale). If a locale
is not specified, it will be inferred from the browser.

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

A number input field with min set to 10.2, max to 50.8 and step set to 0.111

```js
---
example: true
---
<NumberInput label="Unpredictable numbers" min="10.2" max="50.8" step="0.111" />
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
