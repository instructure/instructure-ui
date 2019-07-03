---
category: Getting Started/RFCs
id: bidirectionalRFC
title: bidirectional
---


## bidirectional Component

### Summary
A higher-order component (HOC) which will evaluate and pass document direction to subscribing
components.


### Use Cases
Any components for which there does not exist a pure css bidirectional solution. For example, `View`
requires js knowledge of document direction while converting the css shorthand. `Tray` because
it has to set the transition direction in js.


### Other Implementations
- [airbnb withDirection](https://github.com/airbnb/react-with-direction/blob/master/src/withDirection.jsx)


### Functional Requirements and API
We will take a similar approach here that we used with `themeable`.

`bidirectional` function takes a component as an argument, and extends it. This extended component
provides a direction getter method which does the following:

1) checks the context for direction
2) checks the props for direction
3) checks the state for direction
4) defaults to ltr

We are still evaluating the best approach for setting the direction via state. We could possibly
check in `componentDidMount` for text direction and update state, but there is a concern that that
will cause errors (ex. in the case of DrawerTray for transitions). The other possibility is performing
the check once in the `ApplyDirection` component and passing it purely via context.


### Examples
```javascript
@bidirectional()
class Foo extends React.Component {
  ...
  render () {
    return this.direction === DIRECTION.ltr ? <LtrComponent /> : <RtlComponent />
  }
}

const ViaContext = <Foo />
const ViaProps = <Foo direction="rtl" />
```

### Properties
| Prop     | Type     | Default  | Notes    |
|----------|-------------|----------|----------|
| direction | one of DIRECTION.ltr or DIRECTION.rtl | DIRECTION.ltr | |

### Dependencies
TBD


### Theme Variables
n/a


### Accessibility Requirements
TBD


### Internationalization Requirements
Should work :D


### Other Things to Consider
TBD
