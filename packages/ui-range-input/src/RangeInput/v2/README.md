---
describes: RangeInput
---

An html5 range input/slider component.

```js
---
type: example
---
const Example = () => {
  const [size, setSize] = useState('small')

  const handleSizeChange = (event, value) => {
    setSize(value)
  }

  return (
    <div>
      <View as="div" padding="medium" background="primary">
        <RangeInput
          label="Grading range"
          defaultValue={30}
          max={100}
          min={0}
          size={size}
        />
      </View>

      <View as="div" margin="general.spaceXl 0 0">
        <FormFieldGroup
          description={
            <ScreenReaderContent>
              RangeInput Example Settings
            </ScreenReaderContent>
          }
          layout="columns"
          vAlign="top"
        >
          <RadioInputGroup
            onChange={handleSizeChange}
            name="labelSize"
            value={size}
            description="Label size"
          >
            <RadioInput label="small" value="small" />
            <RadioInput label="medium" value="medium" />
            <RadioInput label="large" value="large" />
          </RadioInputGroup>
        </FormFieldGroup>
      </View>
    </div>
  )
}

render(<Example />)
```
