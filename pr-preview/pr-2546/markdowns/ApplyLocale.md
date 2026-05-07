# ApplyLocale


`<ApplyLocale />` Sets the locale and timezone context for children that can
use it, such as a [TimeSelect](TimeSelect).

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


### Props

| Component | Prop | Type | Required | Default | Description |
|-----------|------|------|----------|---------|-------------|
| ApplyLocale | locale | `string` | No | - |  |
| ApplyLocale | timezone | `string` | No | - |  |
| ApplyLocale | children | `React.ReactNode` | No | - |  |

### Usage

Install the package:

```shell
npm install @instructure/ui-i18n
```

Import the component:

```javascript
/*** ES Modules (with tree shaking) ***/
import { ApplyLocale } from '@instructure/ui-i18n'
```

