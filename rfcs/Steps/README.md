---
describes: rfcs
id: StepsRFC
title: Steps
---


## Steps Component
Steps


### Summary
This component is used for showing step progressions/milestones
throughout a task.  The component will progressively show which
steps milestone/step you currently on, which one you have failed,
and which ones you have completed.


### Use Cases
https://instructure.invisionapp.com/share/FRL2FPRPX4N#/screens/321079043
https://instructure.invisionapp.com/share/FRL2FPRPX4N#/screens/317350953

### Other Implementations
https://material-ui.com/demos/steppers/


### Functional Requirements and API
The functional requirements will consist of constructing an ordered lists where
the props on the `Step` will correlate directly to the `ol` and the `StepItem`
will correlate to an `li`.  The Step Item will have customization with status
and label.


### Examples
```javascript
<Step layout="condensed" label="homework submission"
  <StepItem
    icon={<IconCheckSolid/>} label={({ status }) => (status === StepItem.status.complete) ? I18n.t('Phase One (complete)') : I18n.t('Phase One (in progress)')}}
    status="in-progress"/>
  <StepItem
    icon={<IconCheckSolid/>} label={({ status }) => (status === StepItem.status.complete) ? I18n.t('Phase One (complete)') : I18n.t('Phase One (in progress)')}}
    status="in-progress"/>
  <StepItem
    icon={<IconCheckSolid/>} label={({ status }) => (status === StepItem.status.complete) ? I18n.t('Phase One (complete)') : I18n.t('Phase One (in progress)')}}
    active
    status="in-progress"/>
  <StepItem
    icon={<IconCheckSolid/>} label={({ status }) => (status === StepItem.status.complete) ? I18n.t('Phase One (complete)') : I18n.t('Phase One (in progress)')}}
</Step>

```

### Properties
| Prop     | Type     | Default  | Notes    |
|----------|-------------|----------|----------|
| children | custom | null | Children of the <Step /> must be of type <StepItem /> |
| layout | enum | full | One of: full, condensed|
| label | oneOf: node, string | | Required. labels the Step component |

### Dependencies
StepItem


### Theme Variables
TBD


### Accessibility Requirements
Given that the idea for this component is just a normal ol with li the accessibility should be straight forward with
normal navigation through an ol.


### Internationalization Requirements
N/A


### Other Things to Consider
For smaller screens the Step component will condense and only display the inProgress StepItem.
https://instructure.invisionapp.com/share/FRL2FPRPX4N#/screens/326434297
