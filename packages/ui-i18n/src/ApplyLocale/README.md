---
describes: ApplyLocale
---

`<ApplyLocale />` Sets the locale and timezone context for children that can
use it, such as a [TimeSelect](#TimeSelect).

```js
---
type: example
---
const Example = () => {
  const [value, setValue] = useState('2020-05-18T23:59:00')

  const handleChange = (e, { value }) => {
    setValue(value)
    console.log(value)
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

render(
  <ApplyLocale locale="fr" timezone="Europe/Paris">
    <Example />
  </ApplyLocale>
)
```
