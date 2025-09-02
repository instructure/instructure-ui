
# Adding Error Messages to Form Components

InstUI offers a range of form elements and all of them have a similar API to handle error/hint/success messages. These components use the `messages` prop with the following type definition:

```ts
---
type: code
---
type FormMessages = {
  type:
    | 'newError'
    | 'error'
    | 'hint'
    | 'success'
    | 'screenreader-only'
  text: React.ReactNode
}[]
```

So a basic example would look something like this:

```ts
---
type: example
---
const PasswordExample = () => {
  const [password, setPassword] = useState('')
  const messages = password.length < 6
    ? [{type: 'newError', text: 'Password have to be at least 6 characters long!'}]
    : []
  return (
    <TextInput
      renderLabel="Password"
      type="password"
      messages={messages}
      onChange={(event, value) => { setPassword(value) }}
    />
  )
}

render(<PasswordExample/>)
```

However you might have noticed from the type definition that a message can be `error` and `newError` type. This is due to compatibility reasons. `error` is the older type and does not meet accessibility requirements, `newError` (hance the name) is the newer and more accessible format.

We wanted to allow users to start using the new format without making it mandatory, but after the introductory period `newError` will be deprecated and `error` type will be changed to look and behave the same way.

With this update we also introduced the "required asterisk" which will display an `*` character next to field labels that are required. This update is not opt-in and will apply to **all** InstUI form components so if you were relying on a custom solution for this feature before, you need to remove that to avoid having double asterisks.

Here are examples with different form components:

```ts
---
type: example
---
const Example = () => {
  const [showError, setShowError] = useState(true)
  const [showNewError, setShowNewError] = useState(true)
  const [showLongError, setShowLongError] = useState(false)
  const [isRequired, setIsRequired] = useState(true)

  const messages = showError
    ? [{type: showNewError ? 'newError' : 'error', text: showLongError ? 'Long error. Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos voluptas, esse commodi eos facilis voluptatibus harum exercitationem. Et magni est consectetur, eveniet veniam unde! Molestiae labore libero sapiente ad ratione.' : 'Short error message'}]
    : []

  const handleSettingsChange = (v) => {
    setShowError(v.includes('showError'))
    setShowNewError(v.includes('showNewError'))
    setShowLongError(v.includes('showLongError'))
    setIsRequired(v.includes('isRequired'))
  }

  return (
    <div>
      <CheckboxGroup
        name="errorOptions"
        description="Error message options"
        onChange={handleSettingsChange}
        defaultValue={['showError', 'showNewError', 'isRequired']}
      >
        <Checkbox label="Show error message" value="showError"/>
        <Checkbox label="Use the new error type" value="showNewError" />
        <Checkbox label="Use long message" value="showLongError" />
        <Checkbox label="Make fields required" value="isRequired" />
      </CheckboxGroup>
      <div style={{display: 'flex', gap: '2rem', marginTop: '3rem', flexDirection: 'column'}}>

        <TextInput renderLabel="TextInput" messages={messages} isRequired={isRequired}/>

        <NumberInput renderLabel="NumberInput" messages={messages} isRequired={isRequired}/>

        <TextArea messages={messages} label="TextArea" required={isRequired}/>

        <Checkbox label="Checkbox" isRequired={isRequired} messages={messages}/>

        <Checkbox label={`Checkbox (variant="toggle")`} variant="toggle" isRequired={isRequired} messages={messages}/>

        <CheckboxGroup
          name="CheckboxGroup"
          messages={messages}
          description="CheckboxGroup"
        >
          <Checkbox label="Checkbox 1" value="checkbox1"/>
          <Checkbox label="Checkbox 2"  value="checkbox2"/>
          <Checkbox label="Checkbox 3" value="checkbox3"/>
        </CheckboxGroup>

        <RadioInputGroup name="radioInputGroup" description="RadioInputGroup" messages={messages} isRequired={isRequired}>
          <RadioInput
            label="RadioInput 1"
            value="radioInput1"
          />
          <RadioInput
            label="RadioInput 2"
            value="radioInput2"
          />
          <RadioInput
            label="RadioInput 3"
            value="radioInput3"
          />
        </RadioInputGroup>

        <FileDrop messages={messages} renderLabel="FileDrop" />

        <ColorPicker
          label="ColorPicker"
          placeholderText="Enter HEX"
          isRequired={isRequired}
          renderMessages={() => messages}
        />

        <DateTimeInput
          description={`DateTimeInput (layout="column")`}
          datePlaceholder="Choose a date"
          dateRenderLabel="Date"
          timeRenderLabel="Time"
          invalidDateTimeMessage="Invalid date!"
          prevMonthLabel="Previous month"
          nextMonthLabel="Next month"
          defaultValue="2018-01-18T13:30"
          layout="columns"
          isRequired={isRequired}
          messages={messages}
        />

        <DateTimeInput
          description={`DateTimeInput (layout="stacked")`}
          datePlaceholder="Choose a date"
          dateRenderLabel="Date"
          timeRenderLabel="Time"
          invalidDateTimeMessage="Invalid date!"
          prevMonthLabel="Previous month"
          nextMonthLabel="Next month"
          defaultValue="2018-01-18T13:30"
          layout="stacked"
          isRequired={isRequired}
          messages={messages}
        />

      </div>
    </div>
  )
}

render(<Example/>)
```


