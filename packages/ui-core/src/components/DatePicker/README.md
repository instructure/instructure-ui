---
describes: DatePicker
---

The DatePicker component is used to select a date from a calendar.
You may want to use a [DateInput](#DateInput) instead.

```js
---
example: true
---
<DatePicker
  previousLabel="previous month"
  nextLabel="next month"
  onSelectedChange={function () { console.log(arguments) }}
  onRenderedChange={function () { console.log(arguments) }}
/>
```

The calendar display respects the specified locale, which can be supplied either
as properties or with [ApplyLocale](#ApplyLocale)

```js
---
example: true
render: false
---
class Example extends React.Component {
  constructor (props) {
    super(props)
    this.state = { locale: 'en' }
  }

  render () {
    return (
      <div>
        <Container as="div" padding="small 0" >
          <Select
            inline
            label="Choose Locale"
            onChange={e => this.setState({locale: e.target.value})}>
              {locales.map(loc => <option key={loc} value={loc}>{loc}</option>)}
          </Select>
        </Container>
        <DatePicker
          previousLabel="previous month"
          nextLabel="next month"
          locale={this.state.locale}
          onSelectedChange={function () { console.log(arguments) }}
          onRenderedChange={function () { console.log(arguments) }}
        />
      </div>
    )
  }
}

render(<Example />)
```
