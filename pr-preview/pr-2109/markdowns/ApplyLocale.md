# ApplyLocale


`<ApplyLocale />` Sets the locale and timezone context for children that can
use it, such as a [TimeSelect](#TimeSelect).

```js
---
type: example
---

class Example extends React.Component {
  state = {
    value: '2020-05-18T23:59:00'
  }

  handleChange = (e, { value }) => {
    this.setState({ value }, () =>console.log(this.state.value))
  }

  render () {
    return (
      <TimeSelect
        renderLabel="Choose a time"
        placeholder="e.g., 4:00:00 PM"
        value={this.state.value}
        step={15}
        format="LTS"
        onChange={this.handleChange}
      />
    )
  }
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

