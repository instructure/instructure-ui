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
    closeButtonLabel="Close"
    margin="small"
    transition="none"
  >
    Sample success alert text. I will close w/o a transition out if you close me
  </Alert>
  <Alert
    variant="info"
    closeButtonLabel="Close"
    margin="small"
  >
    Sample info text. I will fade out if you close me.
  </Alert>
  <Alert
    variant="error"
    closeButtonLabel="Close"
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
                closeButtonLabel="Close"
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
