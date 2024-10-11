---
describes: TextInput
---

```js
---
type: example
---
  <>
  <CheckboxGroup
  name="sports2"
  messages={[
    { text: 'Old error...', type: 'error' }
  ]}
  description="Old checkbox group with error"
>
  <Checkbox label="Football" value="football" />
  <Checkbox label="Basketball" value="basketball"/>
  <Checkbox label="Volleyball" value="volleyball" />
  <Checkbox label="Soccer" value="soccer"/>
</CheckboxGroup>

  <div style={{height: '64px'}}></div>

  <CheckboxGroup
  name="newErrorGroup"
  messages={[
    { text: 'New error...', type: 'newError' }
  ]}
  description="New checkbox group with error"
>
  <Checkbox label="Football" value="football" />
  <Checkbox label="Basketball" value="basketball"/>
  <Checkbox label="Volleyball" value="volleyball" />
  <Checkbox label="Soccer" value="soccer"/>
</CheckboxGroup>

  <div style={{height: '64px'}}></div>
    <Checkbox label="toggle" variant="toggle" isRequired/>
  <div style={{height: '64px'}}></div>
    <Checkbox label="required toggle" variant="toggle" messages={[{type: 'error', text: 'Old error'}]} isRequired/>
  <div style={{height: '64px'}}></div>
    <Checkbox label="required toggle" variant="toggle" messages={[{type: 'newError', text: 'New error'}]} isRequired/>
  <div style={{height: '64px'}}></div>

  <Checkbox label="checkbox 1" value="medium" />
  <div style={{height: '64px'}}></div>
  <Checkbox label="required checkbox" value="medium" isRequired/>
  <div style={{height: '64px'}}></div>
  <Checkbox label="checkbox 2" value="medium" messages={[{type: 'error', text: 'Old error'}]} isRequired/>
  <div style={{height: '64px'}}></div>
  <Checkbox label="checkbox 3" value="medium" messages={[{type: 'newError', text: 'New error'}]} isRequired/>
  <div style={{height: '64px'}}></div>

  <RadioInputGroup name="example1" description="Select something" messages={[{text: 'Radio error', type: 'newError'}]} isRequired>
  <RadioInput
    label="See RadioInputGroup for more details"
    value="foo1"
    name="bar3"
  />
  <RadioInput
    label="See RadioInputGroup for more details"
    value="foo2"
    name="bar3"
  />
  <RadioInput
    label="See RadioInputGroup for more details"
    value="foo3"
    name="bar3"
  />
    </RadioInputGroup>
  <div style={{height: '64px'}}></div>

  <RadioInputGroup name="example2" description="Required radio group" isRequired>
  <RadioInput
    label="See RadioInputGroup for more details"
    value="foo1"
    name="bar3"
  />
  <RadioInput
    label="See RadioInputGroup for more details"
    value="foo2"
    name="bar3"
  />
  <RadioInput
    label="See RadioInputGroup for more details"
    value="foo3"
    name="bar3"
  />
    </RadioInputGroup>
  <div style={{height: '64px'}}></div>


<TextInput
  renderLabel="Required name"
  placeholder="Doe, John Doe"
  isRequired
  onChange={(event, value) => { console.log(value) }}
/>
  <div style={{height: '64px'}}></div>
<TextInput
  renderLabel="Name"
  placeholder="Doe, John Doe"
  isRequired
  messages={[
    { text: 'Old error', type: 'error' }
  ]}
  onChange={(event, value) => { console.log(value) }}
/>
  <div style={{height: '64px'}}></div>
<TextInput
  renderLabel="Name"
  placeholder="Doe, John Doe"
  isRequired
  messages={[
    { text: 'New error, Lorem, ipsum dolor sit amet consectetur adipisicing elit. Atque illum molestias vel consequatur dolorum explicabo officia velit enim, praesentium voluptatibus omnis minus voluptatem vero, eveniet dolores perspiciatis magni aut nulla?', type: 'newError' }
  ]}
  onChange={(event, value) => { console.log(value) }}
/>
  <div style={{height: '64px'}}></div>
<TextInput
  renderLabel="Name"
  placeholder="Doe, John Doe"
  messages={[
    { text: 'New Error', type: 'newError' }
  ]}
  onChange={(event, value) => { console.log(value) }}
/>
</>
```
