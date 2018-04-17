---
category: Contributing/RFCs
id: DisabledDaysDateInputRFC
title: DisabledDaysDateInput
---


## DateInput Component

### Summary

This would be adding new props to the existing DateInput component to allow for disabling a selection of specified days. These could either be recurring (e.g., weekends) or specific days or date ranges.



### Use Cases

A use case is an application for selecting assignment due dates where a setting can determine whether assignments can be due on weekends or not.


### Other Implementations

react-day-picker has a similar feature with its `disabledDays` prop: http://react-day-picker.js.org/api/DayPicker/#disabledDays


### Functional Requirements and API

Given a `DateInput`, you can optionally specify `disabledDaysOfWeek`, and/or `disabledDays` to disable selection of those days in the date picker.


### Examples

With `disabledDaysOfWeek`:

```javascript
  <DateInput disabledDaysOfWeek={[0, 6]} />
```

With `disabledDays` as an array of dates;

```javascript
  <DateInput disabledDays={[new Date(2018, 1, 12), new Date(2019, 1, 1)]} />
```

With `disabledDays` as a callback function:

```javascript
  <DateInput disabledDays={(date) => date < new Date(2018, 1, 1) }
```

### Properties
| Prop     | Type     | Default  | Notes    |
|----------|-------------|----------|----------|
| disabledDaysOfWeek | number[] | [] | |
| disabledDays | oneOf: Date[], (date) => boolean | null | The function passes the current day and returns a boolean to determine if that day is disabled |


### Dependencies

N/A


### Theme Variables

N/A


### Accessibility Requirements

Keyboard-only users should not be able to select the disabled days. Screenreaders should be able to indicate that the day is disabled.


### Internationalization Requirements

N/A


### Other Things to Consider

N/A
