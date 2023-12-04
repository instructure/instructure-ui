---
describes: FormFieldGroup
---

This is a helper component that is used by most of the custom form
components. Perfect if you need to wrap a complex group of form fields
(Play with the different properties inside the code editor
to see how they affect the overall look and feel). The first example
sets the `layout to inline` and sets the `vAlign to middle` and `small rowSpacing`

```js
---
type: example
---
  <FormFieldGroup
    description="Breakfast"
    rowSpacing="small"
    layout="inline"
    vAlign="middle"
  >
    <TextInput renderLabel="Favorite Breakfast Eatery"
      messages={[
      { text: 'Invalid name', type: 'error' }
      ]}
    />
    <TextInput renderLabel="Favorite Side Dish" />
    <RadioInputGroup
      name="beverage"
      description="Beverage of Choice"
      defaultValue="coffee"
      layout="columns"
    >
      <RadioInput label="Juice" value="juice" />
      <RadioInput label="Water" value="water" />
      <RadioInput label="Coffee" value="coffee" />
      <RadioInput label="Milk" value="milk" />
      <RadioInput label="Soda" value="soda" />
      <RadioInput label="Hot Tea" value="tea" />
    </RadioInputGroup>
  </FormFieldGroup>
```

This example sets the `layout to columns` and sets the `vAlign to top`
and the `colSpacing to medium`

```js
---
type: example
---
  <FormFieldGroup
    description="Lunch"
    colSpacing="medium"
    layout="columns"
    vAlign="top"
  >
    <TextInput renderLabel="Dining Style" />
    <TextInput renderLabel="Favorite Lunch Outing"/>
    <CheckboxGroup name="times"
      layout="stacked"
      onChange={function (value) { console.log(value) }}
      defaultValue={['afternoon']}
      description="Best Time to Head Out for Lunch"
    >
      <Checkbox label="Between 11:00 and 11:30" value="morning" />
      <Checkbox label="Between 11:30 and Noon" value="early-afternoon" />
      <Checkbox label="Between Noon and 1:00" value="afternoon" />
      <Checkbox label="Between 1:00 and 2:00" value="late-afternoon" />
    </CheckboxGroup>
  </FormFieldGroup>
```

This example sets the `layout to stacked` and sets the `rowSpacing to large`

```js
---
type: example
---
  <FormFieldGroup
    description="Dinner"
    layout="stacked"
    rowSpacing="large"
    messages={[
    { text: 'Complete All Fields', type: 'error' }
    ]}
  >
    <RadioInputGroup
      name="diningstyle"
      description="Size of Your Meal"
      defaultValue="grill"
      layout="stacked"
    >
      <RadioInput label="Keep it light" value="light" />
      <RadioInput label="Anything cooked on the grill" value="grill" />
      <RadioInput label="Bring it on... Ready for the full course" value="full-course" />
      <RadioInput label="Breakfast for dinner" value="breakfast" />
    </RadioInputGroup>
    <TextInput renderLabel="If Not At Home - I'd Like To Eat Dinner At"
      />
    <Checkbox label="Love to Eat Dessert After Dinner" value="medium" variant="toggle" />
  </FormFieldGroup>
```

### Guidelines

```js
---
type: embed
---
<Guidelines>
  <Figure recommendation="a11y" title="Accessibility">
    <Figure.Item>Avoid placeholder text (it creates usability problems by increasing cognitive load, low contrast, lack of screen reader compatibility, etc.)</Figure.Item>
  </Figure>
</Guidelines>
```
