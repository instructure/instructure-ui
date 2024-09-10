---
describes: RangeInput
---

An html5 range input/slider component.

- ```js
  class Example extends React.Component {
    state = {
      size: 'small',
      thumbVariant: 'accessible'
    }

    handleSizeChange = (event, value) => {
      this.setState({ size: value })
    }

    handleThumbVariantChange = (event, value) => {
      this.setState({ thumbVariant: value })
    }

    render() {
      return (
        <div>
          <View as="div" padding="medium" background="primary">
            <RangeInput
              label="Grading range"
              defaultValue={30}
              max={100}
              min={0}
              size={this.state.size}
              thumbVariant={this.state.thumbVariant}
            />
          </View>

          <View as="div" margin="medium 0 0">
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
                onChange={this.handleSizeChange}
                name="labelSize"
                value={this.state.size}
                description="Label size"
              >
                <RadioInput label="small" value="small" />
                <RadioInput label="medium" value="medium" />
                <RadioInput label="large" value="large" />
              </RadioInputGroup>

              <RadioInputGroup
                onChange={this.handleThumbVariantChange}
                name="thumbVariant"
                value={this.state.thumbVariant}
                description="Thumb variant"
              >
                <RadioInput label="accessible" value="accessible" />
                <RadioInput label="deprecated" value="deprecated" />
              </RadioInputGroup>
            </FormFieldGroup>
          </View>
        </div>
      )
    }
  }
  render(<Example />)
  ```

- ```js
  const Example = () => {
    const [size, setSize] = useState('small')
    const [thumbVariant, setThumbVariant] = useState('accessible')

    const handleSizeChange = (event, value) => {
      setSize(value)
    }

    const handleThumbVariantChange = (event, value) => {
      setThumbVariant(value)
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
            thumbVariant={thumbVariant}
          />
        </View>

        <View as="div" margin="medium 0 0">
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

            <RadioInputGroup
              onChange={handleThumbVariantChange}
              name="thumbVariant"
              value={thumbVariant}
              description="Thumb variant"
            >
              <RadioInput label="accessible" value="accessible" />
              <RadioInput label="deprecated" value="deprecated" />
            </RadioInputGroup>
          </FormFieldGroup>
        </View>
      </div>
    )
  }

  render(<Example />)
  ```
