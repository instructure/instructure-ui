---
describes: ApplyLocale
---

`<ApplyLocale />` Sets the locale and timezone context for children that can
use it, such as a [DatePicker](#DatePicker) or [NumberInput](#NumberInput)

```js
---
example: true
---
<ApplyLocale locale="fr" timezone="Europe/Paris">
  <DatePicker previousLabel="previous month" nextLabel="next month"/>
</ApplyLocale>
```

```js
---
example: true
---
<ApplyLocale locale="de">
  <NumberInput label="Locale set to 'de' via ApplyLocale" defaultValue="2.4" step="0.1"/>
</ApplyLocale>
```
