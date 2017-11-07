---
describes: DateInput
---

A DateInput component is used to input a date either with a
[DatePicker](#DatePicker) in a popup, or by typing a date into a
[TextInput](#TextInput).

```js
---
example: true
---
<DateInput
  previousLabel="previous month"
  nextLabel="next month"
  placeholder="Choose"
  label="Birthday"
  onDateChange={function () { console.log(arguments) }}
  invalidDateMessage="Invalid date: Birthday"
/>
```

DateInput passes most properties through to the underlying [TextInput](#TextInput).
It does not pass through `type`, `messages`, `defaultValue`, `value`, `onChange`, or
`onKeyDown`.

When the DatePicker value changes the new date is displayed in the TextInput
according to the specified format.

As characters are typed into the TextInput, the DateInput attempts to parse
the string according to the specified locale. The results are passed to the
TextInput as a success for fail message. When successful, enter will replace
the TextInput value with the formatted date.
