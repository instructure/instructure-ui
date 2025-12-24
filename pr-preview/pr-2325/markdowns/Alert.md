# Alert


The Alert component can be used to notify the user. It supports several
variants to provide context to the message.

Alert can optionally render as a dismissible 'dialog' with a close button.

The `margin` prop can be added to give
space above or below the alert.

```js
---
type: example
---
<div>
  <Alert
    variant="success"
    renderCloseButtonLabel="Close"
    margin="small"
    transition="none"
    variantScreenReaderLabel="Success, "
  >
    Sample success alert text. I will close w/o a transition out if you close me
  </Alert>
  <Alert
    variant="info"
    renderCloseButtonLabel="Close"
    margin="small"
    variantScreenReaderLabel="Information, "
  >
    Sample info text. I will fade out if you close me.
  </Alert>
  <Alert
    variant="error"
    renderCloseButtonLabel="Close"
    margin="small"
    variantScreenReaderLabel="Error, "
  >
    Sample error text that continues for a while
    to demonstrate what happens when the content stretches over
    several lines. It really does take a lot of prose to get the
    text to wrap when you are on a high resolution screen.
  </Alert>
  <Alert
    variant="warning"
    margin="small"
    variantScreenReaderLabel="Warning, "
  >
    Sample warning text. This alert is not dismissible and cannot be closed.
  </Alert>
</div>
```

The `timeout` prop can be used to automatically dismiss an alert after a time.

```js
---
type: example
---
<Alert
  variant="info"
  margin="small"
  timeout={5000}
  variantScreenReaderLabel="Information, "
>
  Sample info text. I will fade out after 5 seconds
</Alert>
```

Given a `liveRegion` property, Alerts will guarantee a screenreader will announce their text.
Use `liveRegionPoliteness` to choose an `aria-live` politeness setting of either `polite`
or `assertive` (default). Use `isLiveRegionAtomic` to choose an `aria-atomic` setting
of either `true` or `false` (default).

Due to a bug in some screen readers, the live region element should be static, either through
server rendering or included in the static HTML file for the app. The Alert component will
ensure that element has the correct ARIA attributes.

For more information about live regions, see
[this MDN article](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions).

```js
---
type: example
---
const Example = () => {
  const [alerts, setAlerts] = useState([])
  const [count, setcount] = useState(0)

  const variants = ['info', 'success', 'warning', 'error']

  const addAlert = () => {
    const variant = variants[count % variants.length]
    const politeness = Math.random() < 0.5 ? 'polite' : 'assertive'
    setAlerts([
      ...alerts,
      {
        key: count,
        variant,
        politeness
      }
    ])
    setcount(count + 1)
  }

  const closeAlert = (key) =>
    setAlerts(alerts.filter((alert) => alert.key !== key))

  return (
    <div>
      <Button onClick={addAlert}>Add Alert</Button>
      {alerts.map((alert) => {
        return (
          <View key={alert.key} display="block" margin="small 0">
            <Alert
              variant={alert.variant}
              renderCloseButtonLabel="Close"
              onDismiss={() => closeAlert(alert.key)}
              liveRegion={() => document.getElementById('flash-messages')}
              liveRegionPoliteness={alert.politeness}
              margin="small 0"
            >
              This is {alert.politeness === 'polite' ? 'a' : 'an'}{' '}
              {alert.politeness} {alert.variant} alert
            </Alert>
          </View>
        )
      })}
    </div>
  )
}

render(<Example />)
```

Alerts can be used to emit screenreader only messages too

```js
---
type: example
---
const Example = () => {
  const [message, setMessage] = useState(null)
  const [count, setCount] = useState(1)

  const changeMessage = () => {
    setMessage(`this is message ${count}`)
    setCount(count + 1)
  }

  const clearMessage = () => {
    setMessage(null)
    setCount(count + 1)
  }

  return (
    <div>
      <Button onClick={changeMessage}>Change Message</Button>
      <Button onClick={clearMessage} margin="0 0 0 small">
        Clear Message
      </Button>
      <Alert
        liveRegion={() => document.getElementById('flash-messages')}
        isLiveRegionAtomic
        screenReaderOnly
      >
        {message}
      </Alert>
    </div>
  )
}

render(<Example />)
```

When Alerts are used inline, the shadow can be removed with the `hasShadow` property.

```js
---
type: example
---
<View as="div" background="primary" padding="large">
  <View
    as="div"
    background="primary"
    padding="small medium"
    borderWidth="small"
    borderRadius="small"
    margin="x-small 0"
  >
    {lorem.paragraph()}
  </View>
  <Alert
    variant="info"
    margin="x-small 0"
    renderCloseButtonLabel="Close"
    hasShadow={false}
  >
    This is an inline Alert, so it shouldn't have a shadow.
  </Alert>
  <View
    as="div"
    background="primary"
    padding="small medium"
    borderWidth="small"
    borderRadius="small"
    margin="x-small 0"
  >
    {lorem.paragraph()}
  </View>
</View>
```

### Guidelines

```js
---
type: embed
---
<Guidelines>
  <Figure recommendation="yes" title="Do">
    <Figure.Item>Use the Info alert to notify the user of more information</Figure.Item>
    <Figure.Item>Use the Error alert to notify user of an error</Figure.Item>
    <Figure.Item>Use the Warning alert to notify user of a warning</Figure.Item>
    <Figure.Item>Use the Success alert to notify user of a success event or action</Figure.Item>
    <Figure.Item>Use the `variantScreenReaderLabel` prop to indicate the alert variant to screen reader users</Figure.Item>
  </Figure>
  <Figure recommendation="no" title="Don't">
    <Figure.Item>Have alert messaging that is more than two lines long</Figure.Item>
    <Figure.Item>Overuse alerts on the same page</Figure.Item>
  </Figure>
</Guidelines>
```

```js
---
type: embed
---
<Guidelines>
  <Figure recommendation="a11y" title="Accessibility">
    <Figure.Item>If the alert requires user interaction to be dismissed, the alert should behave as a modal dialog. Focus should be set to the alert when it appears, remain in the alert until it is dismissed, and return to a logical place on the page when the alert is dismissed</Figure.Item>
    <Figure.Item>aria-live="polite" alerts will only be announced if the user is not currently doing anything. Polite should be used in most situations involving live regions that present new info to users</Figure.Item>
    <Figure.Item>aria-live="assertive" alerts will be announced to the user as soon as possible, but not necessarily immediately. Assertive should be used if there is information that a user must know about right away, for example, a warning message in a form that does validation on the fly</Figure.Item>
    <Figure.Item>The aria-atomic=BOOLEAN is used to set whether or not the screen reader should always present the live region as a whole, even if only part of the region changes. The possible settings are: false or true. The default setting is false.</Figure.Item>
  </Figure>
</Guidelines>
```


### Props

| Component | Prop | Type | Required | Default | Description |
|-----------|------|------|----------|---------|-------------|
| Alert | children | `ReactNode` | No | `null` | content to be rendered within Alert |
| Alert | variant | `'info' \| 'success' \| 'warning' \| 'error'` | No | `'info'` | Determines color and icon |
| Alert | variantScreenReaderLabel | `string` | No | - | How the screen reader should announce the alert variant. While the `variant` prop sets the color and icon for the alert component, this label should be a textual representation of that information. So e.g. if the variant is `info`, this label could be "Information," or "Information alert,". Note the `,` at the end of the label which helps the screenreader to be more natural sounding. |
| Alert | liveRegion | `Element \| null \| (() => Element \| null \| undefined)` | No | - | A DOM element or function that returns an element where screenreader alerts will be placed. |
| Alert | liveRegionPoliteness | `'polite' \| 'assertive'` | No | `'assertive'` | Choose the politeness level of screenreader alerts, sets the value of `aria-live`. When regions are specified as `polite`, assistive technologies will notify users of updates but generally do not interrupt the current task, and updates take low priority. When regions are specified as `assertive`, assistive technologies will immediately notify the user, and could potentially clear the speech queue of previous updates. |
| Alert | isLiveRegionAtomic | `boolean` | No | `false` | Value for the `aria-atomic` attribute. `aria-atomic` controls how much is read when a change happens. Should only the specific thing that changed be read or should the entire element be read. |
| Alert | screenReaderOnly | `boolean` | No | `false` | If the alert should only be visible to screen readers |
| Alert | timeout | `number` | No | `0` | Milliseconds until the Alert is dismissed automatically |
| Alert | margin | `Spacing` | No | `'x-small 0'` | Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`, `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via familiar CSS-like shorthand. For example: `margin="small auto large"`. |
| Alert | renderCloseButtonLabel | `\| ClassType<P, ClassicComponent<P, ComponentState>, ClassicComponentClass<P>> \| ComponentClass \| ReactNode \| ((data: P) => ReactNode \| Element) \| (() => ReactNode \| Element) \| Element` | No | - | Close button label. Can be a React component |
| Alert | onDismiss | `() => void` | No | - | Callback after the alert is closed |
| Alert | transition | `'none' \| 'fade'` | No | `'fade'` | Transition used to make the alert appear and disappear |
| Alert | open | `boolean` | No | `true` | if open transitions from truthy to falsey, it's a signal to close and unmount the alert. This is necessary to close the alert from the outside and still run the transition. |
| Alert | hasShadow | `boolean` | No | `true` | If the alert should have a shadow. |
| Alert | renderCustomIcon | `\| ClassType<P, ClassicComponent<P, ComponentState>, ClassicComponentClass<P>> \| ComponentClass \| ReactNode \| ((data: P) => ReactNode \| Element) \| (() => ReactNode \| Element) \| Element` | No | - | An icon, or function that returns an icon. Setting it will override the variant's icon. |

### Usage

Install the package:

```shell
npm install @instructure/ui-alerts
```

Import the component:

```javascript
/*** ES Modules (with tree shaking) ***/
import { Alert } from '@instructure/ui-alerts'
```

