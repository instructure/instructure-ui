# Alert


The Alert component can be used to notify the user. It supports several
variants to provide context to the message, and two appearances: `floating`
(default) and `inline`.

Alert can optionally render as a dismissible 'dialog' with a close button.

The `margin` prop can be added to give
space above or below the alert.

```js
---
type: example
---
<InstUISettingsProvider theme={{
    componentOverrides: {
      "Alert": {
        dangerBackground: 'purple'
      }
    }
}}>
  <Alert
    variant="success"
    renderCloseButtonLabel="Close"
    margin="general.spaceMd"
    transition="none"
    variantScreenReaderLabel="Success, "
  >
    Sample success alert text. I will close w/o a transition out if you close me
  </Alert>
  <Alert
    variant="info"
    renderCloseButtonLabel="Close"
    margin="general.spaceMd"
    variantScreenReaderLabel="Information, "
  >
    Sample info text. I will fade out if you close me.
  </Alert>
  <Alert
    variant="error"
    renderCloseButtonLabel="Close"
    margin="general.spaceMd"
    variantScreenReaderLabel="Error, "
  >
    Sample error text that continues for a while
    to demonstrate what happens when the content stretches over
    several lines. It really does take a lot of prose to get the
    text to wrap when you are on a high resolution screen.
  </Alert>
  <Alert
    variant="warning"
    margin="general.spaceMd"
    variantScreenReaderLabel="Warning, "
  >
    Sample warning text. This alert is not dismissible and cannot be closed.
  </Alert>
</InstUISettingsProvider>
```

### Appearance

Use the `floating` appearance (default) for page-level alerts that need a
prominent message. It has a bold background color and a shadow.

Use the `inline` appearance when the Alert lives inside a content region and
should flow with the surrounding content. It has a pastel background, no shadow
and a color-coded icon.

```js
---
type: example
---
<div>
  {['info', 'success', 'warning', 'error'].map((variant) => (
    <Flex key={variant} gap="general.spaceMd" margin="general.spaceMd 0">
      <Flex.Item shouldGrow shouldShrink>
        <Alert variant={variant} renderCloseButtonLabel="Close" margin="0">
          Floating {variant} alert
        </Alert>
      </Flex.Item>
      <Flex.Item shouldGrow shouldShrink>
        <Alert
          variant={variant}
          appearance="inline"
          renderCloseButtonLabel="Close"
          margin="0"
        >
          Inline {variant} alert
        </Alert>
      </Flex.Item>
    </Flex>
  ))}
</div>
```

### Buttons in an Alert

An Alert can contain buttons to let the user act on the message. Follow the
design recommendations for button colors: use `primary-inverse` buttons in
`floating` alerts, and `primary` buttons in `inline` and `warning` alerts.

```js
---
type: example
---
<div>
  {['info', 'success', 'warning', 'error'].map((variant) => {
    const floatingButtonColor =
      variant !== 'warning' ? 'primary-inverse' : 'primary'
    return (
      <Flex key={variant} gap="general.spaceMd" margin="general.spaceMd 0">
        <Flex.Item shouldGrow shouldShrink>
          <Alert variant={variant} renderCloseButtonLabel="Close" margin="0">
            Floating {variant} alert. Lorem ipsum dolor sit amet, consectetur.
            <Flex gap="gap.buttons" padding="general.spaceMd 0 0 0">
              <Button withBackground={false} color={floatingButtonColor}>
                Cancel
              </Button>
              <Button color={floatingButtonColor}>Submit</Button>
            </Flex>
          </Alert>
        </Flex.Item>
        <Flex.Item shouldGrow shouldShrink>
          <Alert
            variant={variant}
            appearance="inline"
            renderCloseButtonLabel="Close"
            margin="0"
          >
            Inline {variant} alert. Lorem ipsum dolor sit amet, consectetur.
            <Flex gap="gap.buttons" padding="general.spaceMd 0 0 0">
              <Button withBackground={false} color="primary">
                Cancel
              </Button>
              <Button color="primary">Submit</Button>
            </Flex>
          </Alert>
        </Flex.Item>
      </Flex>
    )
  })}
</div>
```

The `timeout` prop can be used to automatically dismiss an alert after a time.

```js
---
type: example
---
<Alert
  variant="info"
  margin="general.spaceMd"
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
          <View key={alert.key} display="block" margin="general.spaceMd 0">
            <Alert
              variant={alert.variant}
              renderCloseButtonLabel="Close"
              onDismiss={() => closeAlert(alert.key)}
              liveRegion={() => document.getElementById('flash-messages')}
              liveRegionPoliteness={alert.politeness}
              margin="general.spaceMd 0"
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
      <Button onClick={clearMessage} margin="0 0 0 general.spaceMd">
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

Use the `width` prop to set the width of the Alert.

```js
---
type: example
---
<Alert variant="info" width="20rem" margin="general.spaceMd">
  This Alert is 20rem wide.
</Alert>
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
    <Figure.Item>Use the <code>variantScreenReaderLabel</code> prop to indicate the alert variant to screen reader users</Figure.Item>
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
    <Figure.Item>Do not set the <code>role</code> prop on the <code>liveRegion</code> because <code>liveRegionPoliteness</code> and <code>isLiveRegionAtomic</code> override the set values.</Figure.Item>
  </Figure>
</Guidelines>
```


### Props

| Component | Prop | Type | Required | Default | Description |
|-----------|------|------|----------|---------|-------------|
| Alert | children | `ReactNode` | No | - | content to be rendered within Alert |
| Alert | variant | `'info' \| 'success' \| 'warning' \| 'error'` | No | - | Determines color and icon |
| Alert | appearance | `'floating' \| 'inline'` | No | - | `floating` is for page-level alerts that need a prominent message. `inline` is for alerts inside a content region. |
| Alert | variantScreenReaderLabel | `string` | No | - | How the screen reader should announce the alert variant. While the `variant` prop sets the color and icon for the alert component, this label should be a textual representation of that information. So e.g. if the variant is `info`, this label could be "Information," or "Information alert,". Note the `,` at the end of the label which helps the screenreader to be more natural sounding. |
| Alert | liveRegion | `Element \| null \| (() => Element \| null \| undefined)` | No | - | A DOM element or function that returns an element where screenreader alerts will be placed. |
| Alert | liveRegionPoliteness | `'polite' \| 'assertive'` | No | - | Choose the politeness level of screenreader alerts, sets the value of `aria-live`. When regions are specified as `polite`, assistive technologies will notify users of updates but generally do not interrupt the current task, and updates take low priority. When regions are specified as `assertive`, assistive technologies will immediately notify the user, and could potentially clear the speech queue of previous updates. |
| Alert | isLiveRegionAtomic | `boolean` | No | - | Value for the `aria-atomic` attribute. `aria-atomic` controls how much is read when a change happens. Should only the specific thing that changed be read or should the entire element be read. |
| Alert | screenReaderOnly | `boolean` | No | - | If the alert should only be visible to screen readers |
| Alert | timeout | `number` | No | - | Milliseconds until the Alert is dismissed automatically |
| Alert | margin | `Spacing` | No | - | Valid values are `0`, `none`, `auto`, and Spacing token values, see https://instructure.design/layout-spacing. Apply these values via familiar CSS-like shorthand. For example, `margin="general.spaceMd auto"`. |
| Alert | renderCloseButtonLabel | `Renderable` | No | - | Close button label. Can be a React component |
| Alert | onDismiss | `() => void` | No | - | Callback after the alert is closed |
| Alert | transition | `'none' \| 'fade'` | No | - | Transition used to make the alert appear and disappear |
| Alert | open | `boolean` | No | - | if open transitions from truthy to falsey, it's a signal to close and unmount the alert. This is necessary to close the alert from the outside and still run the transition. |
| Alert | hasShadow | `boolean` | No | - | If the alert should have a shadow. Defaults to `true` for the `floating` appearance and `false` for `inline`. |
| Alert | width | `string \| number` | No | - | The width of the alert. |
| Alert | renderCustomIcon | `Renderable` | No | - | An icon, or function that returns an icon. Setting it will override the variant's icon. |
| Alert | elementRef | `(element: Element \| null) => void` | No | - | provides a reference to the underlying html root element |

### Usage

Install the package:

```shell
npm install @instructure/ui-alerts
```

Import the component:

```javascript
/*** ES Modules (with tree shaking) ***/
import { Alert } from '@instructure/ui-alerts/v11_8'
```

