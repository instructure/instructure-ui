---
describes: ApplyLocale
---

`<ApplyLocale />` Sets the locale and timezone context for children that can
use it, such as a [DateInput](#DateInput) or [NumberInput](#NumberInput)

```js
---
example: true
---
<ApplyLocale locale="fr" timezone="Europe/Paris">
  <DateInput
    previousLabel="previous month"
    nextLabel="next month"
    placeholder="Select a date"
    label="Date"
    onDateChange={() => { console.log(arguments) }}
    invalidDateMessage={(value) => { return `'${value}' is not a valid date` }}
  />
</ApplyLocale>
```

```js
---
example: true
---
<ApplyLocale locale="de">
  <NumberInput label="Locale set to 'de' via ApplyLocale" defaultValue={2.4} step={0.1} />
</ApplyLocale>
```
