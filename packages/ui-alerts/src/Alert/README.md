---
describes: Alert
---

The Alert component can be used to notify the user. It supports several
variants to provide context to the message.

Alert can optionally render as a dismissible 'dialog' with a close button.

The `margin` prop can be added to give
space above or below the alert.

```js
---
example: true
---
<div>
  <Alert
    variant="success"
    renderCloseButtonLabel="Close"
    margin="small"
    transition="none"
  >
    Sample success alert text. I will close w/o a transition out if you close me
  </Alert>
  <Alert
    variant="info"
    renderCloseButtonLabel="Close"
    margin="small"
  >
    Sample info text. I will fade out if you close me.
  </Alert>
  <Alert
    variant="error"
    renderCloseButtonLabel="Close"
    margin="small"
  >
    Sample error text that continues for a while
    to demonstrate what happens when the content stretches over
    several lines. It really does take a lot of prose to get the
    text to wrap when you are on a high resolution screen.
  </Alert>
  <Alert
    variant="warning"
    margin="small"
  >
    Sample warning text. This alert is not dismissible and cannot be closed.
  </Alert>
</div>
```

The `timeout` prop can be used to automatically dismiss an alert after a time.

```js
---
example: true
---
<Alert
  variant="info"
  margin="small"
  timeout={5000}
>
  Sample info text. I will fade out after 5 seconds
</Alert>
```

Given a `liveRegion` property, Alerts will guarantee a screenreader will announce their text.
Use `liveRegionPoliteness` to choose an `aria-live` politeness setting of either `polite`
or `assertive` (default).

Due to a bug in some screen readers, the live region element should be static, either through
server rendering or included in the static HTML file for the app. The Alert component will
ensure that element has the correct ARIA attributes.

For more information about live regions, see
[this MDN article](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions).

```js
---
example: true
render: false
---
class Example extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      alerts: []
    }

    this.i = 0
    this.variants = ['info', 'success', 'warning', 'error']
    this.politeness = ['polite', 'assertive']
  }

  addAlert () {
    const variant = this.variants[this.i++ % this.variants.length]
    const politeness = Math.random() < 0.5 ? 'polite' : 'assertive'
    const alerts = [...this.state.alerts]
    const key = new Number(this.i)
    alerts.push({
      key,
      variant,
      politeness,
      onDismiss: () => this.closeAlert(key)
    })
    this.setState({ alerts })
  }

  closeAlert (key) {
    const alerts = this.state.alerts.filter((alert) => {
      return alert.key !== key
    })
    this.setState({ alerts })
  }

  render () {
    return (
      <div>
        <Button onClick={this.addAlert.bind(this)}>Add Alert</Button>
        {this.state.alerts.map((alert) => {
          return (
            <View
              key={alert.key}
              display="block"
              margin="small 0"
            >
              <Alert
                variant={alert.variant}
                renderCloseButtonLabel="Close"
                onDismiss={alert.onDismiss}
                liveRegion={() => document.getElementById('flash-messages')}
                liveRegionPoliteness={alert.politeness}
                margin="small 0"
              >
                This is {alert.politeness === 'polite' ? 'a' : 'an'} {alert.politeness} {alert.variant} alert
              </Alert>
            </View>
          )
        })}
      </div>
    );
  }
}

render(<Example />)
```

Alerts can be used to emit screenreader only messages too

```js
---
example: true
render: false
---
class Example extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      message: null,
      count: 1
    }
  }

  changeMessage = () => {
    this.setState({
      message: `this is message ${this.state.count}`,
      count: this.state.count + 1
      })
  }

  clearMessage  =() => {
    this.setState({
      message: null,
      count: this.state.count + 1})
  }

  render () {
    return (
      <div>
        <Button onClick={this.changeMessage}>Change Message</Button>
        <Button onClick={this.clearMessage} margin="0 0 0 small">Clear Message</Button>
        <Alert
          liveRegion={() => document.getElementById('flash-messages')}
          screenReaderOnly
         >
            {this.state.message}
        </Alert>
      </div>
    );
  }
}

render(<Example />)
```

### Guidelines

```js
---
guidelines: true
---
<Guidelines>
  <Figure recommendation="yes" title="Do">
    <Figure.Item>Use the Info alert to notify the user of more information</Figure.Item>
    <Figure.Item>Use the Error alert to notify user of an error</Figure.Item>
    <Figure.Item>Use the Warning alert to notify user of a warning</Figure.Item>
    <Figure.Item>Use the Success alert to notify user of a success event or action</Figure.Item>
  </Figure>
  <Figure recommendation="no" title="Don't">
    <Figure.Item>Have alert messaging that is more than two lines long</Figure.Item>
    <Figure.Item>Overuse alerts on the same page</Figure.Item>
  </Figure>
</Guidelines>
```

```js
---
guidelines: true
---
<Guidelines>
  <Figure recommendation="a11y" title="Accessibility">
    <Figure.Item>If the alert requires user interaction to be dismissed, the alert should behave as a modal dialog. Focus should be set to the alert when it appears, remain in the alert until it is dismissed, and return to a logical place on the page when the alert is dismissed</Figure.Item>
    <Figure.Item>aria-live="polite" alerts will only be announced if the user is not currently doing anything. Polite should be used in most situations involving live regions that present new info to users</Figure.Item>
    <Figure.Item>aria-live="assertive" alerts will be announced to the user as soon as possible, but not necessarily immediately. Assertive should be used if there is information that a user must know about right away, for example, a warning message in a form that does validation on the fly</Figure.Item>
  </Figure>
</Guidelines>
```
