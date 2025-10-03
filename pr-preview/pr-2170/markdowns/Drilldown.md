# Drilldown


`Drilldown` is a diverse component that displays hierarchical data in a fashion that allows the users to "drill down" and dig deeper into the layers (pages) of the data structure. It has similar look and features to the [Menu](#Menu), [Select](#Select) and [TreeBrowser](#TreeBrowser) components.

The `Drilldown` component exists to support navigating and managing tree structures in compact spaces. With WCAG 2.1 requirements around small viewports, and also with general responsiveness standards the classic tree-navigation and flyout menu patterns got outdated.

Some of Drilldown's features include:

- options that navigate (drill) down in the structure is marked with an arrow;
- options that navigate back in the structure is always a “back” option at the top of the list;
- option groups can have titles that have the standard InstUI menu group title style;
- groups are divided by separator lines;
- items in groups have no indent unless the group is a checkbox or radio option group, in which case the selected items are marked with a "check" icon, all unselected items have an indent;
- secondary information blocks can be displayed both in-line with the option, or below the option with a dedicated text and color style;
- the component can be rendered both in-line and in a popover.

### Pages

The main building blocks of Drilldown are the `Drilldown.Pages`. These represent the layers of the structure and can contain Options, Separators and Groups. Each page has a "header" that can contain a page title, the back navigation and a "page action" option (see [Page header section](/#Drilldown/#page-header)).

Each page needs an `id` prop that is used in the navigation. Options point to pages with their `subPageId` prop, and the Drilldown itself needs a `rootPageId` that indicates the first root level page, which renders first.

```js
---
type: example
---
<Drilldown rootPageId='root' width="20rem" maxHeight="30rem">
  <Drilldown.Page id="root" renderTitle='Groceries'>
    <Drilldown.Option id="Produce" subPageId="Produce">
      Produce
    </Drilldown.Option>
    <Drilldown.Option id="Grains and Bread" subPageId="Grains and Bread">
      Grains and Bread
    </Drilldown.Option>
  </Drilldown.Page>

  <Drilldown.Page id="Produce" renderTitle='Produce'>
    <Drilldown.Option id="Fruits" subPageId="Fruits">
      Fruits
    </Drilldown.Option>
    <Drilldown.Option id="Vegtables" subPageId="Vegtables">
      Vegtables
    </Drilldown.Option>
  </Drilldown.Page>

  <Drilldown.Page id="Grains and Bread" renderTitle='Grains and Bread'>
    {['Pasta', 'Rice', 'Bread', 'Flour', 'Cereal', 'Oats'].map(
      item => <Drilldown.Option id={item} key={item}>{item}</Drilldown.Option>
    )}
  </Drilldown.Page>

  <Drilldown.Page id="Fruits" renderTitle='Fruits'>
    {['Apple', 'Orange', 'Cherry', 'Grapefruit', 'Mango', 'Banana', 'Strawberry'].map(
      item => <Drilldown.Option id={item} key={item}>{item}</Drilldown.Option>
    )}
  </Drilldown.Page>

  <Drilldown.Page id="Vegtables" renderTitle='Vegtables'>
    {['Tomato', 'Cucumber', 'Eggplant', 'Lettuce', 'Garlic', 'Onion', 'Corn', 'Carrot', 'Bell pepper'].map(
      item => <Drilldown.Option id={item} key={item}>{item}</Drilldown.Option>
    )}
  </Drilldown.Page>
</Drilldown>
```

### Options

`Drilldown.Option` is the main child component of Drilldown. The content can be a ReactNode or a function returning a ReactNode. The function has an object as its parameter, containing the option's `id`, `variant` and `isSelected` state.

> Note: Drilldown is based on the [Options](#Options) component, so the Drilldown.Options are rendered as `Options.Item` components under the hood. This is why the `variant` parameter has the values of Options.Item's `variant` prop.

```js
---
type: example
---
<Drilldown rootPageId='root' width="20rem" maxHeight="30rem">
  <Drilldown.Page id="root">
    <Drilldown.Option id="option1">
      Option
    </Drilldown.Option>
    <Drilldown.Option id="option2">
      {(props) => `Option ${props.variant === 'highlighted'
        ? 'is highlighted'
        : 'is not highlighted'}`}
    </Drilldown.Option>
    <Drilldown.Option id="option3">
      <Pill>Pill</Pill> Option
    </Drilldown.Option>
    <Drilldown.Option id="option4" disabled>
      Option
    </Drilldown.Option>
  </Drilldown.Page>
</Drilldown>
```

Options can be links too. If the `href` prop is set, the option renders as an `<a>` element.

```js
---
type: example
---
<Drilldown rootPageId='root' width="20rem" maxHeight="30rem">
  <Drilldown.Page id="root">
    <Drilldown.Option id="linkExampleOption1" href="/#Options">
      Options component
    </Drilldown.Option>
    <Drilldown.Option id="linkExampleOption2"href="/#Menu">
      Menu component
    </Drilldown.Option>
    <Drilldown.Option id="linkExampleOption3" href="/#Select">
      Options component
    </Drilldown.Option>
    <Drilldown.Option id="linkExampleOption4" href="/#SimpleSelect" disabled>
      SimpleSelect component
    </Drilldown.Option>
    <Drilldown.Option id="linkExampleOption5" href="/#TreeBrowser">
      TreeBrowser component
    </Drilldown.Option>
  </Drilldown.Page>
</Drilldown>
```

Just like `Options.Item`, `Drilldown.Option` can render a description under the label and icons before or after the label.

```js
---
type: example
---
<Drilldown rootPageId='root' width="20rem" maxHeight="30rem">
  <Drilldown.Page id="root">
    <Drilldown.Option
      id="renderElementExampleOption1"
      description="Curabitur fringilla, urna ut efficitur molestie, nibh lacus tincidunt elit, ut tempor ipsum nunc sit amet massa."
      renderBeforeLabel={IconCheckSolid}
      renderAfterLabel={IconArrowOpenEndSolid}
      beforeLabelContentVAlign="start"
      afterLabelContentVAlign="start"
    >
      Option
    </Drilldown.Option>
    <Drilldown.Option
      id="renderElementExampleOption2"
      description="Curabitur fringilla, urna ut efficitur molestie, nibh lacus tincidunt elit, ut tempor ipsum nunc sit amet massa."
      renderBeforeLabel={IconCheckSolid}
      renderAfterLabel={IconArrowOpenEndSolid}
      beforeLabelContentVAlign="center"
      afterLabelContentVAlign="center"
    >
      Option
    </Drilldown.Option>
    <Drilldown.Option
      id="renderElementExampleOption3"
      description="Curabitur fringilla, urna ut efficitur molestie, nibh lacus tincidunt elit, ut tempor ipsum nunc sit amet massa."
      renderBeforeLabel={IconCheckSolid}
      renderAfterLabel={IconArrowOpenEndSolid}
      beforeLabelContentVAlign="end"
      afterLabelContentVAlign="end"
    >
      Option
    </Drilldown.Option>
  </Drilldown.Page>
</Drilldown>
```

Additionally, the `renderLabelInfo` prop can render text or other elements next to the label.

- ```js
  class VideoSettingsExample extends React.Component {
    state = {
      selectedCaption: 'English',
      selectedSpeed: 'Normal',
      selectedQuality: '720p',
      isCommentsOn: true
    }

    renderTrigger() {
      return <Button renderIcon={IconSettingsSolid}>Video Settings</Button>
    }

    renderSelected(props, value) {
      return (
        <span
          style={{ color: props.variant === 'default' ? '#6B7780' : undefined }}
        >
          {value}
        </span>
      )
    }

    renderSelectGroup(options, stateName) {
      return (
        <Drilldown.Group
          id={`${stateName}Group`}
          selectableType="single"
          defaultSelected={[this.state[stateName]]}
          onSelect={(_event, { value }) => {
            this.setState({ [stateName]: value[0] })
          }}
        >
          {options.map((option, idx) => (
            <Drilldown.Option
              key={idx}
              id={option}
              value={option}
              onOptionClick={(_event, { goToPreviousPage }) => {
                goToPreviousPage()
              }}
            >
              {option}
            </Drilldown.Option>
          ))}
        </Drilldown.Group>
      )
    }

    render() {
      const { captionOptions, speedOptions, qualityOptions } = this.props

      return (
        <Drilldown
          rootPageId="videoSettings"
          width="18.5rem"
          maxHeight="26.5rem"
          shouldHideOnSelect={false}
          trigger={this.renderTrigger()}
          onToggle={(_event, { shown, goToPage }) => {
            shown && goToPage('videoSettings')
          }}
        >
          <Drilldown.Page
            id="videoSettings"
            renderTitle="Video Settings"
            withoutHeaderSeparator
          >
            <Drilldown.Option
              id="captions"
              subPageId="captions"
              renderLabelInfo={(props) =>
                this.renderSelected(props, this.state.selectedCaption)
              }
            >
              Captions
            </Drilldown.Option>
            <Drilldown.Option
              id="speed"
              subPageId="speed"
              renderLabelInfo={(props) =>
                this.renderSelected(props, this.state.selectedSpeed)
              }
            >
              Speed
            </Drilldown.Option>
            <Drilldown.Option
              id="quality"
              subPageId="quality"
              renderLabelInfo={(props) =>
                this.renderSelected(props, this.state.selectedQuality)
              }
            >
              Quality
            </Drilldown.Option>
            <Drilldown.Option
              id="comments"
              themeOverride={{ padding: '0.25rem 0.75rem' }}
              afterLabelContentVAlign="center"
              onOptionClick={() => {
                this.setState((state) => ({
                  isCommentsOn: !state.isCommentsOn
                }))
              }}
              role="checkbox"
              aria-checked={this.state.isCommentsOn ? 'true' : 'false'}
              // prevents reading the label of the checkbox too (duplicated)
              aria-describedby={['']}
              renderLabelInfo={
                <Checkbox
                  label={<ScreenReaderContent>Comments</ScreenReaderContent>}
                  variant="toggle"
                  readOnly
                  checked={this.state.isCommentsOn}
                  onChange={() => {
                    // needed for controlled Checkbox,
                    // but the state is handled on the Drilldown.Option
                  }}
                  labelPlacement="start"
                  tabIndex={-1}
                />
              }
            >
              Comments
            </Drilldown.Option>
          </Drilldown.Page>

          <Drilldown.Page id="captions" renderTitle="Captions">
            {this.renderSelectGroup(captionOptions, 'selectedCaption')}
          </Drilldown.Page>

          <Drilldown.Page id="speed" renderTitle="Speed">
            {this.renderSelectGroup(speedOptions, 'selectedSpeed')}
          </Drilldown.Page>

          <Drilldown.Page id="quality" renderTitle="Quality">
            {this.renderSelectGroup(qualityOptions, 'selectedQuality')}
          </Drilldown.Page>
        </Drilldown>
      )
    }
  }

  render(
    <VideoSettingsExample
      captionOptions={['Off', 'English', 'German', 'Spanish', 'Durtch']}
      speedOptions={['0.5x', 'Normal', '1.25x', '1.5x', '2x']}
      qualityOptions={['Auto', '360p', '480p', '720p', '1080p']}
    />
  )
  ```

- ```js
  const VideoSettingsExample = (props) => {
    const [selectedCaption, setSelectedCaption] = useState('English')
    const [selectedSpeed, setSelectedSpeed] = useState('Normal')
    const [selectedQuality, setSelectedQuality] = useState('720p')
    const [isCommentsOn, setIsCommentsOn] = useState(true)

    const renderTrigger = () => {
      return <Button renderIcon={IconSettingsSolid}>Video Settings</Button>
    }

    const renderSelected = (props, value) => {
      return (
        <span
          style={{ color: props.variant === 'default' ? '#6B7780' : undefined }}
        >
          {value}
        </span>
      )
    }

    const renderSelectGroup = (options, selectedState, setSelectedState) => {
      return (
        <Drilldown.Group
          id={`${selectedState}Group`}
          selectableType="single"
          defaultSelected={[selectedState]}
          onSelect={(_event, { value }) => {
            setSelectedState(value[0])
          }}
        >
          {options.map((option, idx) => (
            <Drilldown.Option
              key={idx}
              id={option}
              value={option}
              onOptionClick={(_event, { goToPreviousPage }) => {
                goToPreviousPage()
              }}
            >
              {option}
            </Drilldown.Option>
          ))}
        </Drilldown.Group>
      )
    }

    return (
      <Drilldown
        rootPageId="videoSettings"
        width="18.5rem"
        maxHeight="26.5rem"
        shouldHideOnSelect={false}
        trigger={renderTrigger()}
        onToggle={(_event, { shown, goToPage }) => {
          shown && goToPage('videoSettings')
        }}
      >
        <Drilldown.Page
          id="videoSettings"
          renderTitle="Video Settings"
          withoutHeaderSeparator
        >
          <Drilldown.Option
            id="captions"
            subPageId="captions"
            renderLabelInfo={(props) => renderSelected(props, selectedCaption)}
          >
            Captions
          </Drilldown.Option>
          <Drilldown.Option
            id="speed"
            subPageId="speed"
            renderLabelInfo={(props) => renderSelected(props, selectedSpeed)}
          >
            Speed
          </Drilldown.Option>
          <Drilldown.Option
            id="quality"
            subPageId="quality"
            renderLabelInfo={(props) => renderSelected(props, selectedQuality)}
          >
            Quality
          </Drilldown.Option>
          <Drilldown.Option
            id="comments"
            themeOverride={{ padding: '0.25rem 0.75rem' }}
            afterLabelContentVAlign="center"
            onOptionClick={() => {
              setIsCommentsOn((state) => !state)
            }}
            role="checkbox"
            aria-checked={isCommentsOn ? 'true' : 'false'}
            // prevents reading the label of the checkbox too (duplicated)
            aria-describedby={['']}
            renderLabelInfo={
              <Checkbox
                label={<ScreenReaderContent>Comments</ScreenReaderContent>}
                variant="toggle"
                readOnly
                checked={isCommentsOn}
                onChange={() => {
                  // needed for controlled Checkbox,
                  // but the state is handled on the Drilldown.Option
                }}
                labelPlacement="start"
                tabIndex={-1}
              />
            }
          >
            Comments
          </Drilldown.Option>
        </Drilldown.Page>

        <Drilldown.Page id="captions" renderTitle="Captions">
          {renderSelectGroup(
            props.captionOptions,
            selectedCaption,
            setSelectedCaption
          )}
        </Drilldown.Page>

        <Drilldown.Page id="speed" renderTitle="Speed">
          {renderSelectGroup(
            props.speedOptions,
            selectedSpeed,
            setSelectedSpeed
          )}
        </Drilldown.Page>

        <Drilldown.Page id="quality" renderTitle="Quality">
          {renderSelectGroup(
            props.qualityOptions,
            selectedQuality,
            setSelectedQuality
          )}
        </Drilldown.Page>
      </Drilldown>
    )
  }

  render(
    <VideoSettingsExample
      captionOptions={['Off', 'English', 'German', 'Spanish', 'Durtch']}
      speedOptions={['0.5x', 'Normal', '1.25x', '1.5x', '2x']}
      qualityOptions={['Auto', '360p', '480p', '720p', '1080p']}
    />
  )
  ```

### Displaying Drilldown in a Popover

Just like [Menu](#Menu), Drilldown accepts a `trigger` property: it will render a toggle button which, when clicked, shows or hides the Drilldown in a [Popover](#Popover). Drilldown passes many of its props to Popover in this case (`mountNode`, `shouldContainFocus`, `withArrow`, etc.).

- ```js
  class SelectContactsExample extends React.Component {
    state = {
      selected: []
    }

    getCategoryById(id) {
      return this.props.contactsData.find((cat) => cat.id === id)
    }

    selectContacts(values) {
      this.setState({ selected: values })
    }

    renderContacts(contacts) {
      return contacts.map((contact, idx) => {
        const { id, name, email } = contact

        return (
          <Drilldown.Option
            key={idx}
            id={id}
            value={name}
            description={
              <TruncateText>
                #{idx + 1} | {email}
              </TruncateText>
            }
            onOptionClick={() => {
              this.selectContacts([contact])
            }}
          >
            {name}
          </Drilldown.Option>
        )
      })
    }

    renderSubCategoryOptions(subCategories = []) {
      return subCategories.map((subCatId, idx) => {
        const category = this.getCategoryById(subCatId)
        const { id, title } = category

        return (
          <Drilldown.Option key={idx} id={id} subPageId={id}>
            {title}
          </Drilldown.Option>
        )
      })
    }

    renderPage(category, key) {
      const { id, title, subCategories = [], options = [] } = category

      const allContacts = this.getAllContactsFromCategory(category)

      return (
        <Drilldown.Page
          key={key}
          id={id}
          renderTitle={title}
          renderActionLabel={`Send to All (${allContacts.length})`}
          onHeaderActionClicked={() => {
            this.selectContacts(allContacts)
          }}
        >
          {[
            ...this.renderSubCategoryOptions(subCategories),
            ...this.renderContacts(options)
          ]}
        </Drilldown.Page>
      )
    }

    getAllContactsFromCategory(category) {
      let allContacts = []

      const addOptions = (cat) => {
        const { subCategories = [], options = [] } = cat
        allContacts.push(...options)

        subCategories.forEach((subCatId) => {
          addOptions(this.getCategoryById(subCatId))
        })
      }

      addOptions(category)
      return allContacts
    }

    render() {
      const { contactsData } = this.props
      const { selected = [] } = this.state

      return (
        <Flex alignItems="start">
          <Flex.Item width="20rem" textAlign="center" padding="x-small 0 0">
            <Drilldown
              rootPageId="contacts"
              width="18.5rem"
              maxHeight="26.5rem"
              trigger={<Button>Select Contacts</Button>}
              onToggle={(_event, args) => {
                args.shown && selectContacts([])
              }}
            >
              {contactsData.map((page, idx) => this.renderPage(page, idx))}
            </Drilldown>
          </Flex.Item>

          <Flex.Item padding="0 0 0 large" shouldGrow shouldShrink>
            <View as="div" padding="small" background="primary">
              <div>
                <Text weight="bold">
                  Selected ({selected ? selected.length : 0}):
                </Text>
              </div>
              <div>{selected.map((a) => a.name).join(', ')}</div>
            </View>
          </Flex.Item>
        </Flex>
      )
    }
  }

  const generateCategory = (name, count) => {
    return Array(count)
      .fill(name)
      .map((category, idx) => {
        const id = category.replace(/(-|\s)/g, '').toLowerCase()
        return {
          id: `${id}${idx + 1}`,
          category,
          name: `${category} ${idx + 1}`,
          email: `${id}${idx + 1}@randommail.com`
        }
      })
  }

  const contactsData = [
    {
      id: 'contacts',
      title: 'Contacts',
      subCategories: ['administrators', 'teachers', 'students']
    },
    {
      id: 'administrators',
      title: 'Administrators',
      subCategories: ['accountAdmins', 'subAccountAdmins']
    },
    {
      id: 'accountAdmins',
      title: 'Account Admins',
      options: generateCategory('Account Admin', 8)
    },
    {
      id: 'subAccountAdmins',
      title: 'Sub-Account Admins',
      options: generateCategory('Sub-Account Admin', 12)
    },
    {
      id: 'teachers',
      title: 'Teachers',
      options: generateCategory('Teacher', 23)
    },
    {
      id: 'students',
      title: 'Students',
      options: generateCategory('Student', 34)
    }
  ]

  render(<SelectContactsExample contactsData={contactsData} />)
  ```

- ```js
  const SelectContactsExample = (props) => {
    const [selected, setSelected] = useState([])

    const getCategoryById = (id) => {
      return props.contactsData.find((cat) => cat.id === id)
    }

    const selectContacts = (values) => {
      setSelected(values)
    }

    const renderContacts = (contacts) => {
      return contacts.map((contact, idx) => {
        const { id, name, email } = contact

        return (
          <Drilldown.Option
            key={idx}
            id={id}
            value={name}
            description={
              <TruncateText>
                #{idx + 1} | {email}
              </TruncateText>
            }
            onOptionClick={() => {
              selectContacts([contact])
            }}
          >
            {name}
          </Drilldown.Option>
        )
      })
    }

    const renderSubCategoryOptions = (subCategories = []) => {
      return subCategories.map((subCatId, idx) => {
        const category = getCategoryById(subCatId)
        const { id, title } = category

        return (
          <Drilldown.Option key={idx} id={id} subPageId={id}>
            {title}
          </Drilldown.Option>
        )
      })
    }

    const renderPage = (category, key) => {
      const { id, title, subCategories = [], options = [] } = category

      const allContacts = getAllContactsFromCategory(category)

      return (
        <Drilldown.Page
          key={key}
          id={id}
          renderTitle={title}
          renderActionLabel={`Send to All (${allContacts.length})`}
          onHeaderActionClicked={() => {
            selectContacts(allContacts)
          }}
        >
          {[
            ...renderSubCategoryOptions(subCategories),
            ...renderContacts(options)
          ]}
        </Drilldown.Page>
      )
    }

    const getAllContactsFromCategory = (category) => {
      let allContacts = []

      const addOptions = (cat) => {
        const { subCategories = [], options = [] } = cat
        allContacts.push(...options)

        subCategories.forEach((subCatId) => {
          addOptions(getCategoryById(subCatId))
        })
      }

      addOptions(category)
      return allContacts
    }

    return (
      <Flex alignItems="start">
        <Flex.Item width="20rem" textAlign="center" padding="x-small 0 0">
          <Drilldown
            rootPageId="contacts"
            width="18.5rem"
            maxHeight="26.5rem"
            trigger={<Button>Select Contacts</Button>}
            onToggle={(_event, args) => {
              args.shown && selectContacts([])
            }}
          >
            {props.contactsData.map((page, idx) => renderPage(page, idx))}
          </Drilldown>
        </Flex.Item>

        <Flex.Item padding="0 0 0 large" shouldGrow shouldShrink>
          <View as="div" padding="small" background="primary">
            <div>
              <Text weight="bold">
                Selected ({selected ? selected.length : 0}):
              </Text>
            </div>
            <div>{selected.map((a) => a.name).join(', ')}</div>
          </View>
        </Flex.Item>
      </Flex>
    )
  }

  const generateCategory = (name, count) => {
    return Array(count)
      .fill(name)
      .map((category, idx) => {
        const id = category.replace(/(-|\s)/g, '').toLowerCase()
        return {
          id: `${id}${idx + 1}`,
          category,
          name: `${category} ${idx + 1}`,
          email: `${id}${idx + 1}@randommail.com`
        }
      })
  }

  const contactsData = [
    {
      id: 'contacts',
      title: 'Contacts',
      subCategories: ['administrators', 'teachers', 'students']
    },
    {
      id: 'administrators',
      title: 'Administrators',
      subCategories: ['accountAdmins', 'subAccountAdmins']
    },
    {
      id: 'accountAdmins',
      title: 'Account Admins',
      options: generateCategory('Account Admin', 8)
    },
    {
      id: 'subAccountAdmins',
      title: 'Sub-Account Admins',
      options: generateCategory('Sub-Account Admin', 12)
    },
    {
      id: 'teachers',
      title: 'Teachers',
      options: generateCategory('Teacher', 23)
    },
    {
      id: 'students',
      title: 'Students',
      options: generateCategory('Student', 34)
    }
  ]

  render(<SelectContactsExample contactsData={contactsData} />)
  ```

### Page header

Each page can have a "header" with three optional items. The header and the Drilldown content are separated with a `<Drilldown.Separator>` (can be hidden with the `withoutHeaderSeparator` prop.)

##### Title

The `renderTitle` prop sets the title of the Page.

##### Action

The `renderActionLabel` displays an "action" option that can be used as e.g.: a "Select all" function. The action itself can be set with the `onHeaderActionClicked` prop.

##### Back navigation

On every page (except the root page) a "Back" navigation option is displayed with an arrow.

The label can be changed with `renderBackButtonLabel` prop (defaults to "Back"). If a function is passed, it has a `prevPageTitle` parameter.

This option will always display on the page when needed and cannot be disabled.

- ```js
  class BackNavigationExample extends React.Component {
    state = {
      showTitle: true,
      showAction: true,
      showAlternativeBackLabel: false
    }

    render() {
      const { showTitle, showAction, showAlternativeBackLabel } = this.state

      return (
        <Flex alignItems="start">
          <Flex.Item>
            <Drilldown rootPageId="root" width="20rem" maxHeight="30rem">
              <Drilldown.Page
                id="root"
                renderTitle={showTitle && 'Root page'}
                renderActionLabel={showAction && 'Action!'}
              >
                <Drilldown.Option
                  id="BackNavigationRoot1"
                  subPageId="secondPage"
                >
                  Option
                </Drilldown.Option>
                <Drilldown.Option
                  id="BackNavigationRoot2"
                  subPageId="secondPage"
                >
                  Option
                </Drilldown.Option>
                <Drilldown.Option
                  id="BackNavigationRoot3"
                  subPageId="secondPage"
                >
                  Option
                </Drilldown.Option>
              </Drilldown.Page>

              <Drilldown.Page
                id="secondPage"
                renderTitle={showTitle && 'Second page'}
                renderActionLabel={showAction && 'Action!'}
                renderBackButtonLabel={
                  showAlternativeBackLabel
                    ? (prevPageTitle) =>
                        prevPageTitle ? `Back to ${prevPageTitle}` : 'Back'
                    : undefined
                }
              >
                <Drilldown.Option id="BackNavigationSecondPage1">
                  Option
                </Drilldown.Option>
                <Drilldown.Option id="BackNavigationSecondPage2">
                  Option
                </Drilldown.Option>
                <Drilldown.Option id="BackNavigationSecondPage3">
                  Option
                </Drilldown.Option>
              </Drilldown.Page>
            </Drilldown>
          </Flex.Item>

          <Flex.Item padding="0 0 0 large" shouldGrow shouldShrink>
            <FormFieldGroup description="Drilldown Group example settings">
              <Checkbox
                checked={
                  !this.state.showTitle
                    ? false
                    : this.state.showAlternativeBackLabel
                }
                disabled={!this.state.showTitle}
                label='Display previous page title in back navigation ("Show page title" needs to be turned on)'
                variant="toggle"
                onChange={() => {
                  this.setState({
                    showAlternativeBackLabel:
                      !this.state.showAlternativeBackLabel
                  })
                }}
              />
              <Checkbox
                checked={this.state.showTitle}
                label="Show page title"
                variant="toggle"
                onChange={() => {
                  this.setState({ showTitle: !this.state.showTitle })
                }}
              />
              <Checkbox
                checked={this.state.showAction}
                label="Show action label"
                variant="toggle"
                onChange={() => {
                  this.setState({ showAction: !this.state.showAction })
                }}
              />
            </FormFieldGroup>
          </Flex.Item>
        </Flex>
      )
    }
  }

  render(<BackNavigationExample />)
  ```

- ```js
  const BackNavigationExample = () => {
    const [showTitle, setShowTitle] = useState(true)
    const [showAction, setShowAction] = useState(true)
    const [showAlternativeBackLabel, setShowAlternativeBackLabel] =
      useState(false)

    return (
      <Flex alignItems="start">
        <Flex.Item>
          <Drilldown rootPageId="root" width="20rem" maxHeight="30rem">
            <Drilldown.Page
              id="root"
              renderTitle={showTitle && 'Root page'}
              renderActionLabel={showAction && 'Action!'}
            >
              <Drilldown.Option id="BackNavigationRoot1" subPageId="secondPage">
                Option
              </Drilldown.Option>
              <Drilldown.Option id="BackNavigationRoot2" subPageId="secondPage">
                Option
              </Drilldown.Option>
              <Drilldown.Option id="BackNavigationRoot3" subPageId="secondPage">
                Option
              </Drilldown.Option>
            </Drilldown.Page>

            <Drilldown.Page
              id="secondPage"
              renderTitle={showTitle && 'Second page'}
              renderActionLabel={showAction && 'Action!'}
              renderBackButtonLabel={
                showAlternativeBackLabel
                  ? (prevPageTitle) =>
                      prevPageTitle ? `Back to ${prevPageTitle}` : 'Back'
                  : undefined
              }
            >
              <Drilldown.Option id="BackNavigationSecondPage1">
                Option
              </Drilldown.Option>
              <Drilldown.Option id="BackNavigationSecondPage2">
                Option
              </Drilldown.Option>
              <Drilldown.Option id="BackNavigationSecondPage3">
                Option
              </Drilldown.Option>
            </Drilldown.Page>
          </Drilldown>
        </Flex.Item>

        <Flex.Item padding="0 0 0 large" shouldGrow shouldShrink>
          <FormFieldGroup description="Drilldown Group example settings">
            <Checkbox
              checked={!showTitle ? false : showAlternativeBackLabel}
              disabled={!showTitle}
              label='Display previous page title in back navigation ("Show page title" needs to be turned on)'
              variant="toggle"
              onChange={() => {
                setShowAlternativeBackLabel(!showAlternativeBackLabel)
              }}
            />
            <Checkbox
              checked={showTitle}
              label="Show page title"
              variant="toggle"
              onChange={() => {
                setShowTitle(!showTitle)
              }}
            />
            <Checkbox
              checked={showAction}
              label="Show action label"
              variant="toggle"
              onChange={() => {
                setShowAction(!showAction)
              }}
            />
          </FormFieldGroup>
        </Flex.Item>
      </Flex>
    )
  }

  render(<BackNavigationExample />)
  ```

### Option Groups

Wrapping the Options in `<Drilldown.Group>` will separate these options with separators. These separators can be hidden, and you can provide a label with the `renderGroupTitle` prop.

- ```js
  class GroupsExample extends React.Component {
    state = {
      showSeparators: true,
      showTitles: true
    }

    render() {
      return (
        <Flex alignItems="start">
          <Flex.Item>
            <Drilldown rootPageId="root" width="20rem" maxHeight="30rem">
              <Drilldown.Page id="root">
                <Drilldown.Group
                  id="italy"
                  renderGroupTitle={this.state.showTitles && 'Italy'}
                  withoutSeparators={!this.state.showSeparators}
                >
                  <Drilldown.Option id="item11">Milano</Drilldown.Option>
                  <Drilldown.Option id="item12">Florence</Drilldown.Option>
                </Drilldown.Group>

                <Drilldown.Group
                  id="france"
                  renderGroupTitle={this.state.showTitles && 'France'}
                  withoutSeparators={!this.state.showSeparators}
                >
                  <Drilldown.Option id="item21">Lyon</Drilldown.Option>
                  <Drilldown.Option id="item22">Bordeaux</Drilldown.Option>
                </Drilldown.Group>

                <Drilldown.Group
                  id="germany"
                  renderGroupTitle={this.state.showTitles && 'Germany'}
                  withoutSeparators={!this.state.showSeparators}
                >
                  <Drilldown.Option id="item31">Frankfurt</Drilldown.Option>
                  <Drilldown.Option id="item32">Dortmund</Drilldown.Option>
                </Drilldown.Group>
              </Drilldown.Page>
            </Drilldown>
          </Flex.Item>

          <Flex.Item padding="0 0 0 large">
            <FormFieldGroup description="Drilldown Group example settings">
              <Checkbox
                checked={this.state.showSeparators}
                label="Show separators"
                variant="toggle"
                onChange={() => {
                  this.setState({ showSeparators: !this.state.showSeparators })
                }}
              />
              <Checkbox
                checked={this.state.showTitles}
                label="Show group titles"
                variant="toggle"
                onChange={() => {
                  this.setState({ showTitles: !this.state.showTitles })
                }}
              />
            </FormFieldGroup>
          </Flex.Item>
        </Flex>
      )
    }
  }

  render(<GroupsExample />)
  ```

- ```js
  const GroupsExample = () => {
    const [showSeparators, setShowSeparators] = useState(true)
    const [showTitles, setShowTitles] = useState(true)

    return (
      <Flex alignItems="start">
        <Flex.Item>
          <Drilldown rootPageId="root" width="20rem" maxHeight="30rem">
            <Drilldown.Page id="root">
              <Drilldown.Group
                id="italy"
                renderGroupTitle={showTitles && 'Italy'}
                withoutSeparators={!showSeparators}
              >
                <Drilldown.Option id="item11">Milano</Drilldown.Option>
                <Drilldown.Option id="item12">Florence</Drilldown.Option>
              </Drilldown.Group>

              <Drilldown.Group
                id="france"
                renderGroupTitle={showTitles && 'France'}
                withoutSeparators={!showSeparators}
              >
                <Drilldown.Option id="item21">Lyon</Drilldown.Option>
                <Drilldown.Option id="item22">Bordeaux</Drilldown.Option>
              </Drilldown.Group>

              <Drilldown.Group
                id="germany"
                renderGroupTitle={showTitles && 'Germany'}
                withoutSeparators={!showSeparators}
              >
                <Drilldown.Option id="item31">Frankfurt</Drilldown.Option>
                <Drilldown.Option id="item32">Dortmund</Drilldown.Option>
              </Drilldown.Group>
            </Drilldown.Page>
          </Drilldown>
        </Flex.Item>

        <Flex.Item padding="0 0 0 large">
          <FormFieldGroup description="Drilldown Group example settings">
            <Checkbox
              checked={showSeparators}
              label="Show separators"
              variant="toggle"
              onChange={() => {
                setShowSeparators(!showSeparators)
              }}
            />
            <Checkbox
              checked={showTitles}
              label="Show group titles"
              variant="toggle"
              onChange={() => {
                setShowTitles(!showTitles)
              }}
            />
          </FormFieldGroup>
        </Flex.Item>
      </Flex>
    )
  }

  render(<GroupsExample />)
  ```

#### Selectable Groups

The `selectableType` prop makes a group either a single-select (radio) or multi-select (checkbox) group. Selected options are indicated with a "check" icon.

It is recommended to set the `value` prop of the options in a group, because the `defaultSelected` and `onSelect` props are based on these values.

##### Single-select Group

```js
---
type: example
---
<Drilldown rootPageId='root' width="20rem" maxHeight="30rem">
  <Drilldown.Page id="root">
    <Drilldown.Group
      id="group1"
      renderGroupTitle="Select one option"
      selectableType='single'
    >
      <Drilldown.Option id="+2" value="+2" defaultSelected>
        Strongly agree
      </Drilldown.Option>
      <Drilldown.Option id="+1" value="+1">
        Somewhat agree
      </Drilldown.Option>
      <Drilldown.Option id="0" value="0">
        Neither agree nor disagree
      </Drilldown.Option>
      <Drilldown.Option id="-1" value="-1">
        Somewhat disagree
      </Drilldown.Option>
      <Drilldown.Option id="-2" value="-2">
        Strongly disagree
      </Drilldown.Option>
    </Drilldown.Group>
  </Drilldown.Page>
</Drilldown>
```

##### Multi-select Group

- ```js
  class SelectMembersExample extends React.Component {
    state = {
      selected: {}
    }

    selectMembers(groupValues) {
      this.setState(({ selected }) => {
        return { selected: { ...selected, ...groupValues } }
      })
    }

    renderGroups(groups) {
      return groups.map((group, idx) => {
        const { id, label, members, selectableType } = group

        return (
          <Drilldown.Group
            id={id}
            key={idx}
            renderGroupTitle={label}
            selectableType={selectableType}
            onSelect={(_e, { value }) => {
              this.selectMembers({ [id]: value })
            }}
          >
            {members.map((member, idx) => {
              const { id, name } = member
              return (
                <Drilldown.Option key={idx} id={id} value={name}>
                  {name}
                </Drilldown.Option>
              )
            })}
          </Drilldown.Group>
        )
      })
    }

    renderSubPageOptions(subPages = []) {
      return subPages.map((subPage, idx) => {
        const { id, label } = subPage

        return (
          <Drilldown.Option key={idx} id={id} subPageId={id}>
            {label}
          </Drilldown.Option>
        )
      })
    }

    renderPage(category, key) {
      const { id, subPages = [], groups = [] } = category

      return (
        <Drilldown.Page key={key} id={id}>
          {subPages.length > 0 && this.renderSubPageOptions(subPages)}
          {groups.length > 0 && this.renderGroups(groups)}
        </Drilldown.Page>
      )
    }

    render() {
      const { pages } = this.props
      const { selected = {} } = this.state

      return (
        <Flex alignItems="start">
          <Flex.Item width="20rem" textAlign="center" padding="x-small 0 0">
            <Drilldown
              rootPageId="root"
              width="18.5rem"
              maxHeight="26.5rem"
              trigger={<Button>Select Members</Button>}
              shouldHideOnSelect={false}
              onToggle={(_event, { shown }) => {
                shown && this.selectMembers({})
              }}
            >
              {pages.map((page, idx) => this.renderPage(page, idx))}
            </Drilldown>
          </Flex.Item>

          <Flex.Item padding="0 0 0 large" shouldGrow shouldShrink>
            <View as="div" padding="small" background="primary">
              <div>
                <Text weight="bold">Selected members:</Text>
              </div>
              <div>
                <List>
                  {Object.entries(selected).map(([groupId, values], idx) => {
                    return values.length > 0 ? (
                      <List.Item key={idx}>
                        <b>{groupId}</b>: {values.join(', ')}
                      </List.Item>
                    ) : null
                  })}
                </List>
              </div>
            </View>
          </Flex.Item>
        </Flex>
      )
    }
  }

  const pages = [
    {
      id: 'root',
      subPages: [
        { id: 'courses', label: 'Courses' },
        { id: 'groups', label: 'Groups' },
        { id: 'consortiums', label: 'Consortiums' }
      ]
    },
    {
      id: 'courses',
      groups: [
        {
          id: 'course1',
          label: 'Course 1',
          selectableType: 'multiple',
          members: [
            { id: 'course1_1', name: 'Hanna Septimus' },
            { id: 'course1_2', name: 'Kadin Press' },
            { id: 'course1_3', name: 'Kaiya Botosh' }
          ]
        },
        {
          id: 'course2',
          label: 'Course 2',
          selectableType: 'multiple',
          members: [
            { id: 'course2_1', name: 'Leo Calzoni' },
            { id: 'course2_2', name: 'Gretchen Gouse' }
          ]
        }
      ]
    },
    {
      id: 'groups',
      groups: [
        {
          id: 'group1',
          label: 'Group 1',
          selectableType: 'multiple',
          members: [
            { id: 'groups1_1', name: 'Penka Okabe' },
            { id: 'groups1_2', name: 'Ausma Meggyesfalvi' },
            { id: 'groups1_3', name: 'Endrit Höfler' },
            { id: 'groups1_4', name: 'Ryuu Carey' },
            { id: 'groups1_5', name: 'Daphne Dioli' }
          ]
        }
      ]
    },
    {
      id: 'consortiums',
      groups: [
        {
          id: 'consortium1',
          label: 'Consortium 1',
          selectableType: 'multiple',
          members: [
            { id: 'consortium1_1', name: 'Brahim Gustavsson' },
            { id: 'consortium1_2', name: 'Elodia Dreschner' }
          ]
        },
        {
          id: 'consortium2',
          label: 'Consortium 2',
          selectableType: 'multiple',
          members: [
            { id: 'consortium2_1', name: 'Darwin Peter' },
            { id: 'consortium2_2', name: 'Sukhrab Burnham' }
          ]
        },
        {
          id: 'consortium3',
          label: 'Consortium 3',
          selectableType: 'multiple',
          members: [
            { id: 'consortium3_1', name: 'Jeffry Antonise' },
            { id: 'consortium3_2', name: 'Bia Regenbogen' }
          ]
        }
      ]
    }
  ]

  render(<SelectMembersExample pages={pages} />)
  ```

- ```js
  const SelectMembersExample = (props) => {
    const [selected, setSelected] = useState({})

    const selectMembers = (groupValues) => {
      setSelected((selected) => ({
        ...selected,
        ...groupValues
      }))
    }

    const renderGroups = (groups) => {
      return groups.map((group, idx) => {
        const { id, label, members, selectableType } = group

        return (
          <Drilldown.Group
            id={id}
            key={idx}
            renderGroupTitle={label}
            selectableType={selectableType}
            onSelect={(_e, { value }) => {
              selectMembers({ [id]: value })
            }}
          >
            {members.map((member, idx) => {
              const { id, name } = member
              return (
                <Drilldown.Option key={idx} id={id} value={name}>
                  {name}
                </Drilldown.Option>
              )
            })}
          </Drilldown.Group>
        )
      })
    }

    const renderSubPageOptions = (subPages = []) => {
      return subPages.map((subPage, idx) => {
        const { id, label } = subPage

        return (
          <Drilldown.Option key={idx} id={id} subPageId={id}>
            {label}
          </Drilldown.Option>
        )
      })
    }

    const renderPage = (category, key) => {
      const { id, subPages = [], groups = [] } = category

      return (
        <Drilldown.Page key={key} id={id}>
          {subPages.length > 0 && renderSubPageOptions(subPages)}
          {groups.length > 0 && renderGroups(groups)}
        </Drilldown.Page>
      )
    }

    return (
      <Flex alignItems="start">
        <Flex.Item width="20rem" textAlign="center" padding="x-small 0 0">
          <Drilldown
            rootPageId="root"
            width="18.5rem"
            maxHeight="26.5rem"
            trigger={<Button>Select Members</Button>}
            shouldHideOnSelect={false}
            onToggle={(_event, { shown }) => {
              shown && selectMembers({})
            }}
          >
            {props.pages.map((page, idx) => renderPage(page, idx))}
          </Drilldown>
        </Flex.Item>

        <Flex.Item padding="0 0 0 large" shouldGrow shouldShrink>
          <View as="div" padding="small" background="primary">
            <div>
              <Text weight="bold">Selected members:</Text>
            </div>
            <div>
              <List>
                {Object.entries(selected).map(([groupId, values], idx) => {
                  return values.length > 0 ? (
                    <List.Item key={idx}>
                      <b>{groupId}</b>: {values.join(', ')}
                    </List.Item>
                  ) : null
                })}
              </List>
            </div>
          </View>
        </Flex.Item>
      </Flex>
    )
  }

  const pages = [
    {
      id: 'root',
      subPages: [
        { id: 'courses', label: 'Courses' },
        { id: 'groups', label: 'Groups' },
        { id: 'consortiums', label: 'Consortiums' }
      ]
    },
    {
      id: 'courses',
      groups: [
        {
          id: 'course1',
          label: 'Course 1',
          selectableType: 'multiple',
          members: [
            { id: 'course1_1', name: 'Hanna Septimus' },
            { id: 'course1_2', name: 'Kadin Press' },
            { id: 'course1_3', name: 'Kaiya Botosh' }
          ]
        },
        {
          id: 'course2',
          label: 'Course 2',
          selectableType: 'multiple',
          members: [
            { id: 'course2_1', name: 'Leo Calzoni' },
            { id: 'course2_2', name: 'Gretchen Gouse' }
          ]
        }
      ]
    },
    {
      id: 'groups',
      groups: [
        {
          id: 'group1',
          label: 'Group 1',
          selectableType: 'multiple',
          members: [
            { id: 'groups1_1', name: 'Penka Okabe' },
            { id: 'groups1_2', name: 'Ausma Meggyesfalvi' },
            { id: 'groups1_3', name: 'Endrit Höfler' },
            { id: 'groups1_4', name: 'Ryuu Carey' },
            { id: 'groups1_5', name: 'Daphne Dioli' }
          ]
        }
      ]
    },
    {
      id: 'consortiums',
      groups: [
        {
          id: 'consortium1',
          label: 'Consortium 1',
          selectableType: 'multiple',
          members: [
            { id: 'consortium1_1', name: 'Brahim Gustavsson' },
            { id: 'consortium1_2', name: 'Elodia Dreschner' }
          ]
        },
        {
          id: 'consortium2',
          label: 'Consortium 2',
          selectableType: 'multiple',
          members: [
            { id: 'consortium2_1', name: 'Darwin Peter' },
            { id: 'consortium2_2', name: 'Sukhrab Burnham' }
          ]
        },
        {
          id: 'consortium3',
          label: 'Consortium 3',
          selectableType: 'multiple',
          members: [
            { id: 'consortium3_1', name: 'Jeffry Antonise' },
            { id: 'consortium3_2', name: 'Bia Regenbogen' }
          ]
        }
      ]
    }
  ]

  render(<SelectMembersExample pages={pages} />)
  ```

### Disabled prop

You can disable the whole Drilldown or its sub-components with the `disabled` prop. The only option that can not be disabled is the Back navigation.

- ```js
  class DisabledExample extends React.Component {
    state = {
      disabled: 'None',
      withTrigger: false
    }

    render() {
      const { disabled, withTrigger } = this.state

      const disabledDrilldown = disabled === 'Drilldown'
      const disabledPages = disabled === 'Pages'
      const disabledGroups = disabled === 'Groups'
      const disabledOptions = disabled === 'Options'

      return (
        <Flex alignItems="start">
          <Flex.Item width="20rem" textAlign="center" padding="x-small 0 0">
            <View textAlign="start">
              <Drilldown
                rootPageId="root"
                width="20rem"
                maxHeight="30rem"
                trigger={withTrigger && <Button>Toggle button</Button>}
                disabled={disabledDrilldown}
              >
                <Drilldown.Page
                  id="root"
                  renderTitle="Root page"
                  renderActionLabel="Action"
                  disabled={disabledPages}
                >
                  <Drilldown.Option
                    id="disabledOption1"
                    subPageId="secondPage"
                    disabled={disabledOptions}
                  >
                    Option with subPage navigation
                  </Drilldown.Option>
                  <Drilldown.Option
                    id="disabledOption2"
                    disabled={disabledOptions}
                  >
                    Option
                  </Drilldown.Option>
                  <Drilldown.Group
                    id="group1"
                    renderGroupTitle="Selectable Group"
                    selectableType="multiple"
                    disabled={disabledGroups}
                  >
                    {['Apple', 'Orange', 'Banana', 'Strawberry'].map((item) => (
                      <Drilldown.Option
                        id={item}
                        key={item}
                        value={item}
                        defaultSelected={item === 'Apple'}
                        disabled={disabledOptions}
                      >
                        {item}
                      </Drilldown.Option>
                    ))}
                  </Drilldown.Group>
                </Drilldown.Page>

                <Drilldown.Page
                  id="secondPage"
                  renderTitle="Second page"
                  disabled={disabledPages}
                >
                  {['Option 1', 'Option 2', 'Option 3', 'Option 4'].map(
                    (item) => (
                      <Drilldown.Option
                        id={item}
                        key={item}
                        disabled={disabledOptions}
                      >
                        {item}
                      </Drilldown.Option>
                    )
                  )}
                </Drilldown.Page>
              </Drilldown>
            </View>
          </Flex.Item>

          <Flex.Item padding="0 0 0 large" shouldGrow shouldShrink>
            <FormFieldGroup
              description={<ScreenReaderContent>Settings</ScreenReaderContent>}
              colSpacing="medium"
              layout="columns"
              vAlign="top"
            >
              <RadioInputGroup
                onChange={(_event, value) => {
                  this.setState({ disabled: value })
                }}
                defaultValue="None"
                name="disabledPart"
                description="Select disabled"
              >
                {['None', 'Drilldown', 'Pages', 'Groups', 'Options'].map(
                  (part) => (
                    <RadioInput key={part} value={part} label={part} />
                  )
                )}
              </RadioInputGroup>

              <Checkbox
                checked={this.state.withTrigger}
                label="With toggle button"
                variant="toggle"
                onChange={() => {
                  this.setState({ withTrigger: !this.state.withTrigger })
                }}
              />
            </FormFieldGroup>
          </Flex.Item>
        </Flex>
      )
    }
  }

  render(<DisabledExample />)
  ```

- ```js
  const DisabledExample = () => {
    const [disabled, setDisabled] = useState('None')
    const [withTrigger, setWithTrigger] = useState(false)

    const disabledDrilldown = disabled === 'Drilldown'
    const disabledPages = disabled === 'Pages'
    const disabledGroups = disabled === 'Groups'
    const disabledOptions = disabled === 'Options'

    return (
      <Flex alignItems="start">
        <Flex.Item width="20rem" textAlign="center" padding="x-small 0 0">
          <View textAlign="start">
            <Drilldown
              rootPageId="root"
              width="20rem"
              maxHeight="30rem"
              trigger={withTrigger && <Button>Toggle button</Button>}
              disabled={disabledDrilldown}
            >
              <Drilldown.Page
                id="root"
                renderTitle="Root page"
                renderActionLabel="Action"
                disabled={disabledPages}
              >
                <Drilldown.Option
                  id="disabledOption1"
                  subPageId="secondPage"
                  disabled={disabledOptions}
                >
                  Option with subPage navigation
                </Drilldown.Option>
                <Drilldown.Option
                  id="disabledOption2"
                  disabled={disabledOptions}
                >
                  Option
                </Drilldown.Option>
                <Drilldown.Group
                  id="group1"
                  renderGroupTitle="Selectable Group"
                  selectableType="multiple"
                  disabled={disabledGroups}
                >
                  {['Apple', 'Orange', 'Banana', 'Strawberry'].map((item) => (
                    <Drilldown.Option
                      id={item}
                      key={item}
                      value={item}
                      defaultSelected={item === 'Apple'}
                      disabled={disabledOptions}
                    >
                      {item}
                    </Drilldown.Option>
                  ))}
                </Drilldown.Group>
              </Drilldown.Page>

              <Drilldown.Page
                id="secondPage"
                renderTitle="Second page"
                disabled={disabledPages}
              >
                {['Option 1', 'Option 2', 'Option 3', 'Option 4'].map(
                  (item) => (
                    <Drilldown.Option
                      id={item}
                      key={item}
                      disabled={disabledOptions}
                    >
                      {item}
                    </Drilldown.Option>
                  )
                )}
              </Drilldown.Page>
            </Drilldown>
          </View>
        </Flex.Item>

        <Flex.Item padding="0 0 0 large" shouldGrow shouldShrink>
          <FormFieldGroup
            description={<ScreenReaderContent>Settings</ScreenReaderContent>}
            colSpacing="medium"
            layout="columns"
            vAlign="top"
          >
            <RadioInputGroup
              onChange={(_event, value) => {
                setDisabled(value)
              }}
              defaultValue="None"
              name="disabledPart"
              description="Select disabled"
            >
              {['None', 'Drilldown', 'Pages', 'Groups', 'Options'].map(
                (part) => (
                  <RadioInput key={part} value={part} label={part} />
                )
              )}
            </RadioInputGroup>

            <Checkbox
              checked={withTrigger}
              label="With toggle button"
              variant="toggle"
              onChange={() => {
                setWithTrigger(!withTrigger)
              }}
            />
          </FormFieldGroup>
        </Flex.Item>
      </Flex>
    )
  }

  render(<DisabledExample />)
  ```

### shouldHideOnSelect

By default, if the Drilldown is in a Popover, it will hide if an option is selected (except on page navigation). You can disable this behavior by setting `shouldHideOnSelect={false}`.

You can still manually close the Popover on option click or select, calling the `.hide()` method on the `drilldown` parameter of the `onOptionClick` and `onSelect` callbacks.

```js
---
type: example
---
<Drilldown
  rootPageId='root'
  width="20rem"
  maxHeight="30rem"
  trigger={<Button>Toggle button</Button>}
  shouldHideOnSelect={false}
>
  <Drilldown.Page id="root" renderTitle='Should not hide on select'>
    <Drilldown.Group id="group1" selectableType='single'>
      <Drilldown.Option value="1" id="shouldHideOption1">
        Option 1
      </Drilldown.Option>
      <Drilldown.Option value="2" id="shouldHideOption2">
        Option 2
      </Drilldown.Option>
      <Drilldown.Option value="3" id="shouldHideOption3">
        Option 3
      </Drilldown.Option>
    </Drilldown.Group>
    <Drilldown.Option
      id="close"
      renderBeforeLabel={<IconXLine />}
      onOptionClick={(_event, data) => {
        data.drilldown.hide()
      }}
      themeOverride={(_componentTheme, currentTheme) => {
        return { color: currentTheme.colors.textDanger }
      }}
    >
      Close Popover
    </Drilldown.Option>
  </Drilldown.Page>
</Drilldown>
```

### Page navigation

The recommended way to navigate between pages is to add the `subaPageId` prop to the `<Drilldown.Option>`-s. This will make an arrow display on the option to indicate that it navigates to another page.

If you have to manually navigate to another page on click or on Popover toggle, the `onOptionClick` and `onToggle` callbacks expose methods for page navigation and the current page history.

- `pageHistory`: An array of the Page Id-s in "breadcrumbs" fashion.
- `goToPreviousPage`: A method that navigates to the previous page (if not on root page).
- `goToPage`: A method that navigates to a page, defined by the page id. If that page is already in the page history, it goes back to that level. If it is not in the history and the page exists, it adds it to the page history and goes there.

These two navigation methods are also available as public methods on the Drilldown component.

```js
---
type: example
---
<Drilldown
  rootPageId='Root Page'
  width="20rem"
  maxHeight="30rem"
>
  <Drilldown.Page id="Root Page" renderTitle='Root page'>
    <Drilldown.Option id="navRootOption1" subPageId='Page Two'>
      Go to Page Two
    </Drilldown.Option>
    <Drilldown.Option id="navRootOption2" subPageId='Page Three'>
      Go to Page Three
    </Drilldown.Option>
    <Drilldown.Option
      id="navRootOption3"
      onOptionClick={(_event, args) => {
        console.log(args.pageHistory)
        const nav = args.goToPage('Page Two')
        console.log(`Navigated from "${nav.prevPageId}" to "${nav.newPageId}"`)
      }}
      description='Navigates to Page Two on click and logs the pageHistory on the console.'
    >
      Manual navigation to Page Two
    </Drilldown.Option>
  </Drilldown.Page>

  <Drilldown.Page id="Page Two" renderTitle='Page Two'>
    <Drilldown.Option id="navPage2Option1" subPageId='Page Three'>
      Go to Page Three
    </Drilldown.Option>
    <Drilldown.Option
      id="navPage2Option2"
      onOptionClick={(_event, args) => {
        console.log(args.pageHistory)
        const nav = args.goToPreviousPage()
        console.log(`Navigated back from "${nav.prevPageId}" to previous "${nav.newPageId}"`)
      }}
      description='Navigates to the previous page on click and logs the pageHistory on the console.'
    >
      Manual "Back" navigation
    </Drilldown.Option>
    <Drilldown.Option
      id="navPage2Option3"
      onOptionClick={(_event, args) => {
        console.log(args.pageHistory)
        const nav = args.goToPage('Page Three')
        console.log(`Navigated from "${nav.prevPageId}" to "${nav.newPageId}"`)
      }}
      description='Navigates to Page Two on click and logs the pageHistory on the console.'
    >
      Manual navigation to Page Three
    </Drilldown.Option>
  </Drilldown.Page>

  <Drilldown.Page id="Page Three" renderTitle='Page Three'>
    <Drilldown.Option
      id="navPage3Option1"
      onOptionClick={(_event, args) => {
        console.log(args.pageHistory)
        const nav = args.goToPage(args.pageHistory[0])
        console.log(`Navigated from "${nav.prevPageId}" to "${nav.newPageId}"`)
      }}
      description='Navigates to the first page on click and logs the pageHistory on the console.'
    >
      Manual "Back" navigation
    </Drilldown.Option>
    <Drilldown.Option
      id="navPage3Option2"
      onOptionClick={(_event, args) => {
        console.log(args.pageHistory)
        const nav = args.goToPreviousPage()
        console.log(`Navigated back from "${nav.prevPageId}" to previous "${nav.newPageId}"`)
      }}
      description='Navigates to the previous page on click and logs the pageHistory on the console.'
    >
      Manual "Back" navigation
    </Drilldown.Option>
  </Drilldown.Page>
</Drilldown>
```

### Editable structures

The following example showcases an editable drilldown that can add or delete options.

- ```js
  class EditableStructureExample extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
        districtsData: {
          d1: {
            label: 'District 1',
            schools: ['s1']
          }
        },
        schoolsData: {
          s1: {
            label: 'School 1',
            districtId: 'd1',
            isSelected: false
          }
        }
      }

      this.districtCounter = Object.keys(this.state.districtsData).length
      this.schoolCounter = Object.keys(this.state.schoolsData).length
    }

    toggleSelectedSchool(id, school) {
      this.setState({
        schoolsData: {
          ...this.state.schoolsData,
          [id]: { ...school, isSelected: !school.isSelected }
        }
      })
    }

    renderSelectedIcon(isSelected) {
      return <IconCheckSolid style={{ opacity: isSelected ? 1 : 0 }} />
    }

    renderAddAction(label) {
      return (
        <span>
          <IconAddSolid />
          <View as="span" margin="0 0 0 x-small">
            New {label}
          </View>
        </span>
      )
    }

    addDistrict() {
      const { districtsData } = this.state
      this.districtCounter++
      const districtNumber = this.districtCounter
      const districtId = `d${districtNumber}`

      this.setState({
        districtsData: {
          ...districtsData,
          [districtId]: {
            label: `District ${districtNumber}`,
            schools: []
          }
        }
      })
    }

    addSchool(districtId) {
      const { districtsData, schoolsData } = this.state
      const district = districtsData[districtId]

      this.schoolCounter++
      const schoolNumber = this.schoolCounter
      const schoolId = `s${schoolNumber}`

      this.setState({
        districtsData: {
          ...districtsData,
          [districtId]: {
            ...district,
            schools: [...district.schools, schoolId]
          }
        },
        schoolsData: {
          ...schoolsData,
          [schoolId]: {
            label: `School ${schoolNumber}`,
            districtId,
            isSelected: false
          }
        }
      })
    }

    renderDeleteOption(type, label, idToDelete) {
      const id = type === 'school' ? 'deleteSchool' : 'deleteDistrict'
      const callback =
        type === 'school' ? this.deleteSchool : this.deleteDistrict
      const separatorId = `${idToDelete}__separator`

      return [
        <Drilldown.Separator id={separatorId} key={separatorId} />,
        <Drilldown.Option
          id={id}
          key={`${idToDelete}__${id}`}
          onOptionClick={() => {
            callback(idToDelete)
          }}
          themeOverride={(_componentTheme, currentTheme) => {
            return { color: currentTheme.colors.textDanger }
          }}
        >
          <IconTrashLine />
          <View as="span" margin="0 0 0 x-small">
            Delete {label}
          </View>
        </Drilldown.Option>
      ]
    }

    deleteSchool = (id) => {
      const { districtsData, schoolsData } = this.state
      const { [id]: school, ...restSchools } = schoolsData
      const { districtId } = school
      const district = districtsData[districtId]

      this.setState({
        schoolsData: restSchools,
        districtsData: {
          ...districtsData,
          [districtId]: {
            ...district,
            schools: district.schools.filter((schoolId) => schoolId !== id)
          }
        }
      })
    }

    deleteDistrict = (id) => {
      const { districtsData, schoolsData } = this.state
      const { [id]: district, ...restDistricts } = districtsData

      const filteredSchools = {}

      Object.entries(schoolsData).forEach(([schoolId, school]) => {
        if (school.districtId !== id) {
          filteredSchools[schoolId] = school
        }
      })

      this.setState({
        districtsData: restDistricts,
        schoolsData: filteredSchools
      })
    }

    render() {
      const { districtsData, schoolsData } = this.state
      const districts = Object.entries(districtsData)
      const schools = Object.entries(schoolsData)

      return (
        <Drilldown rootPageId="root" width="18.5rem" maxHeight="26.5rem">
          <Drilldown.Page
            id="root"
            renderTitle="Districts"
            renderActionLabel={this.renderAddAction('District')}
            onHeaderActionClicked={() => {
              this.addDistrict()
            }}
          >
            {districts.map(([id, district]) => {
              const { label } = district
              return (
                <Drilldown.Option
                  key={`districtOption__${id}`}
                  id={id}
                  subPageId={id}
                >
                  {label}
                </Drilldown.Option>
              )
            })}
          </Drilldown.Page>

          {districts.map(([districtId, district]) => {
            const { label, schools } = district
            return (
              <Drilldown.Page
                key={`districtPage__${districtId}`}
                id={districtId}
                renderTitle={label}
                renderActionLabel={this.renderAddAction('School')}
                onHeaderActionClicked={() => {
                  this.addSchool(districtId)
                }}
              >
                {schools.map((id) => {
                  const { label, isSelected } = this.state.schoolsData[id]
                  return (
                    <Drilldown.Option
                      key={`schoolOption__${districtId}--${id}`}
                      id={id}
                      subPageId={id}
                      renderBeforeLabel={this.renderSelectedIcon(isSelected)}
                    >
                      {label}
                    </Drilldown.Option>
                  )
                })}
                {this.renderDeleteOption('district', label, districtId)}
              </Drilldown.Page>
            )
          })}

          {schools.map(([id, school]) => {
            const { label, isSelected } = school
            return (
              <Drilldown.Page
                key={`schoolPage__${id}`}
                id={id}
                withoutHeaderSeparator
              >
                <Drilldown.Option
                  id="toggleSchool"
                  renderBeforeLabel={this.renderSelectedIcon(isSelected)}
                  onOptionClick={() => {
                    this.toggleSelectedSchool(id, school)
                  }}
                >
                  {isSelected ? 'Deselect' : 'Select'} {label}
                </Drilldown.Option>
                {this.renderDeleteOption('school', label, id)}
              </Drilldown.Page>
            )
          })}
        </Drilldown>
      )
    }
  }

  render(<EditableStructureExample />)
  ```

- ```js
  const EditableStructureExample = () => {
    const [districtsData, setDistrictsData] = useState({
      d1: {
        label: 'District 1',
        schools: ['s1']
      }
    })
    const [schoolsData, setSchoolsData] = useState({
      s1: {
        label: 'School 1',
        districtId: 'd1',
        isSelected: false
      }
    })

    const [districtCounter, setDistrictCounter] = useState(
      Object.keys(districtsData).length
    )
    const [schoolCounter, setSchoolCounter] = useState(
      Object.keys(schoolsData).length
    )

    const districts = Object.entries(districtsData)
    const schools = Object.entries(schoolsData)

    const toggleSelectedSchool = (id, school) => {
      setSchoolsData({
        ...schoolsData,
        [id]: { ...school, isSelected: !school.isSelected }
      })
    }

    const renderSelectedIcon = (isSelected) => {
      return <IconCheckSolid style={{ opacity: isSelected ? 1 : 0 }} />
    }

    const renderAddAction = (label) => {
      return (
        <span>
          <IconAddSolid />
          <View as="span" margin="0 0 0 x-small">
            New {label}
          </View>
        </span>
      )
    }

    const addDistrict = () => {
      const newDistrictCounter = districtCounter + 1
      const districtNumber = newDistrictCounter
      const districtId = `d${newDistrictCounter}`
      setDistrictCounter(newDistrictCounter)

      setDistrictsData((districtsData) => ({
        ...districtsData,
        [districtId]: {
          label: `District ${districtNumber}`,
          schools: []
        }
      }))
    }

    const addSchool = (districtId) => {
      const newSchoolCounter = schoolCounter + 1
      const district = districtsData[districtId]
      const schoolNumber = newSchoolCounter
      const schoolId = `s${newSchoolCounter}`
      setSchoolCounter(newSchoolCounter)

      setDistrictsData((districtsData) => ({
        ...districtsData,
        [districtId]: {
          ...districtsData[districtId],
          schools: [...district.schools, schoolId]
        }
      }))

      setSchoolsData((schoolsData) => ({
        ...schoolsData,
        [schoolId]: {
          label: `School ${schoolNumber}`,
          districtId,
          isSelected: false
        }
      }))
    }

    const renderDeleteOption = (type, label, idToDelete) => {
      const id = type === 'school' ? 'deleteSchool' : 'deleteDistrict'
      const callback = type === 'school' ? deleteSchool : deleteDistrict
      const separatorId = `${idToDelete}__separator`

      return [
        <Drilldown.Separator id={separatorId} key={separatorId} />,
        <Drilldown.Option
          id={id}
          key={`${idToDelete}__${id}`}
          onOptionClick={() => {
            callback(idToDelete)
          }}
          themeOverride={(_componentTheme, currentTheme) => {
            return { color: currentTheme.colors.textDanger }
          }}
        >
          <IconTrashLine />
          <View as="span" margin="0 0 0 x-small">
            Delete {label}
          </View>
        </Drilldown.Option>
      ]
    }

    const deleteSchool = (id) => {
      const { [id]: school, ...restSchools } = schoolsData
      const { districtId } = school
      const district = districtsData[districtId]

      setSchoolsData(restSchools)
      setDistrictsData({
        ...districtsData,
        [districtId]: {
          ...district,
          schools: district.schools.filter((schoolId) => schoolId !== id)
        }
      })
    }

    const deleteDistrict = (id) => {
      const { [id]: district, ...restDistricts } = districtsData

      const filteredSchools = {}

      Object.entries(schoolsData).forEach(([schoolId, school]) => {
        if (school.districtId !== id) {
          filteredSchools[schoolId] = school
        }
      })

      setDistrictsData(restDistricts)
      setSchoolsData(filteredSchools)
    }

    return (
      <Drilldown rootPageId="root" width="18.5rem" maxHeight="26.5rem">
        <Drilldown.Page
          id="root"
          renderTitle="Districts"
          renderActionLabel={renderAddAction('District')}
          onHeaderActionClicked={() => {
            addDistrict()
          }}
        >
          {districts.map(([id, district]) => {
            const { label } = district
            return (
              <Drilldown.Option
                key={`districtOption__${id}`}
                id={id}
                subPageId={id}
              >
                {label}
              </Drilldown.Option>
            )
          })}
        </Drilldown.Page>

        {districts.map(([districtId, district]) => {
          const { label, schools } = district
          return (
            <Drilldown.Page
              key={`districtPage__${districtId}`}
              id={districtId}
              renderTitle={label}
              renderActionLabel={renderAddAction('School')}
              onHeaderActionClicked={() => {
                addSchool(districtId)
              }}
            >
              {schools.map((id) => {
                const { label, isSelected } = schoolsData[id]
                return (
                  <Drilldown.Option
                    key={`schoolOption__${districtId}--${id}`}
                    id={id}
                    subPageId={id}
                    renderBeforeLabel={renderSelectedIcon(isSelected)}
                  >
                    {label}
                  </Drilldown.Option>
                )
              })}
              {renderDeleteOption('district', label, districtId)}
            </Drilldown.Page>
          )
        })}

        {schools.map(([id, school]) => {
          const { label, isSelected } = school
          return (
            <Drilldown.Page
              key={`schoolPage__${id}`}
              id={id}
              withoutHeaderSeparator
            >
              <Drilldown.Option
                id="toggleSchool"
                renderBeforeLabel={renderSelectedIcon(isSelected)}
                onOptionClick={() => {
                  toggleSelectedSchool(id, school)
                }}
              >
                {isSelected ? 'Deselect' : 'Select'} {label}
              </Drilldown.Option>
              {renderDeleteOption('school', label, id)}
            </Drilldown.Page>
          )
        })}
      </Drilldown>
    )
  }

  render(<EditableStructureExample />)
  ```

### Guidelines

```js
---
type: embed
---
<Guidelines>
  <Figure recommendation="yes" title="Do">
    <Figure.Item>
      Use to display tree structures (instead of the TreeBrowser)
    </Figure.Item>
    <Figure.Item>
      Use instead of flyout menus
    </Figure.Item>
    <Figure.Item>
      Use for radio or checkbox type interactions
    </Figure.Item>
    <Figure.Item>
      Make the text within Drilldown options direct and self-evident so users can quickly decide on an action
    </Figure.Item>
  </Figure>
  <Figure recommendation="no" title="Don't">
    <Figure.Item>
      Include complex content
    </Figure.Item>
    <Figure.Item>
      Use content that is not a Drilldown.Option (eg. buttons)
    </Figure.Item>
    <Figure.Item>
      Use the “back” option to display group names
    </Figure.Item>
  </Figure>
</Guidelines>
```


### Props

| Component | Prop | Type | Required | Default | Description |
|-----------|------|------|----------|---------|-------------|
| Drilldown | rootPageId | `string` | Yes | - | The id of the root page |
| Drilldown | children | `PageChild \| PageChild[]` | No | - | Children of type `<Drilldown.Page />` |
| Drilldown | id | `string` | No | - | The id of the `<Drilldown />` |
| Drilldown | label | `string` | No | - | Description of the `<Drilldown />` (used as `aria-label` attribute) |
| Drilldown | disabled | `boolean` | No | `false` | Is the `<Drilldown />` disabled |
| Drilldown | rotateFocus | `boolean` | No | `true` | Whether the focus should rotate with keyboard navigation when reaching the first or last option |
| Drilldown | as | `keyof JSX.IntrinsicElements \| ComponentType<P>` | No | `'ul'` | Element type to render as. |
| Drilldown | role | `string` | No | `'menu'` | The ARIA role of the element |
| Drilldown | elementRef | `(el: Element \| null) => void` | No | - | A function that returns a reference to root HTML element |
| Drilldown | drilldownRef | `(el: HTMLDivElement \| null) => void` | No | - | A function that returns a reference to the `<Drilldown />` |
| Drilldown | overflowX | `'auto' \| 'hidden' \| 'visible'` | No | `'auto'` |  |
| Drilldown | overflowY | `'auto' \| 'hidden' \| 'visible'` | No | `'auto'` |  |
| Drilldown | height | `string \| number` | No | - |  |
| Drilldown | width | `string \| number` | No | - |  |
| Drilldown | minHeight | `string \| number` | No | - |  |
| Drilldown | minWidth | `string \| number` | No | - |  |
| Drilldown | maxHeight | `string \| number` | No | - |  |
| Drilldown | maxWidth | `string \| number` | No | - |  |
| Drilldown | trigger | `React.ReactNode` | No | - | The trigger element, if the `<Drilldown />` is to render as a popover |
| Drilldown | placement | `PlacementPropValues` | No | `'bottom center'` | If a trigger is supplied, where should the `<Drilldown />` be placed (relative to the trigger) `stretch` will stretch the `Drilldown` to the same size as its `trigger` (provided that the `trigger` is at least as large as the `Drilldown`). In this case you should not set `width`/`maxHeight`, it will be set automatically. |
| Drilldown | defaultShow | `boolean` | No | `false` | Should the `<Drilldown />` be open for the initial render |
| Drilldown | show | `boolean` | No | - | Is the `<Drilldown />` open (should be accompanied by `onToggle` and `trigger`) |
| Drilldown | onToggle | `( event: React.UIEvent \| React.FocusEvent, args: { shown: boolean drilldown: Drilldown pageHistory: string[] goToPage: ( pageId: string ) => { prevPageId: string; newPageId: string } \| undefined goToPreviousPage: () => \| { prevPageId: string; newPageId: string } \| undefined } ) => void` | No | - | Callback fired when the `<Drilldown />` is toggled open/closed. When used with `show`, the component will not control its own state. |
| Drilldown | onSelect | `( event: React.SyntheticEvent, args: { value: DrilldownOptionValue \| DrilldownOptionValue[] isSelected: boolean selectedOption: OptionChild drilldown: Drilldown } ) => void` | No | - | Callback fired when an item within the `<Drilldown />` is selected |
| Drilldown | onDismiss | `( event: React.UIEvent \| React.FocusEvent, documentClick: boolean ) => void` | No | - | If a trigger is supplied, callback fired when the `<Drilldown />` is closed |
| Drilldown | onFocus | `(event: React.FocusEvent) => void` | No | - | If a trigger is supplied, callback fired when the `<Drilldown />` trigger is focused |
| Drilldown | onMouseOver | `(event: React.MouseEvent) => void` | No | - | If a trigger is supplied, callback fired onMouseOver for the `<Drilldown />` trigger |
| Drilldown | popoverRef | `(el: Popover \| null) => void` | No | - | If a trigger is supplied, A function that returns a reference to the `<Popover />` |
| Drilldown | mountNode | `PositionMountNode` | No | - | If a trigger is supplied, an element or a function returning an element to use as the mount node for the `<Drilldown />` (defaults to the component itself) |
| Drilldown | positionTarget | `PositionMountNode` | No | - | Target element for positioning the Popover (if it differs from the trigger) |
| Drilldown | positionContainerDisplay | `'inline-block' \| 'block'` | No | - | If a trigger is supplied, this prop can set the CSS `display` property on the `<span>` container element of the underlying Position component |
| Drilldown | constrain | `PositionConstraint` | No | - | The parent in which to constrain the placement. |
| Drilldown | shouldHideOnSelect | `boolean` | No | `true` | If a trigger is supplied, should the `<Drilldown />` hide when an item is selected |
| Drilldown | shouldContainFocus | `boolean` | No | `false` | Whether focus should be contained within the `<Drilldown/>` when it is open. Works only if `trigger` is provided. |
| Drilldown | shouldReturnFocus | `boolean` | No | `true` | Whether focus should be returned to the trigger when the `<Drilldown/>` is closed. Works only if `trigger` is provided. |
| Drilldown | withArrow | `boolean` | No | `true` | Whether or not an arrow pointing to the trigger should be rendered. Works only if `trigger` is provided. |
| Drilldown | offsetX | `string \| number` | No | `0` | The horizontal offset for the positioned content. Works only if `trigger` is provided. |
| Drilldown | offsetY | `string \| number` | No | `0` | The vertical offset for the positioned content. Works only if `trigger` is provided. |
| Drilldown | shouldSetAriaExpanded | `boolean` | No | `true` | If true (default), then the aria-expanded prop is added to the trigger. If its supplied via the aria-expanded prop then it takes the given value, otherwise its calculated automatically based on whether the content is shown. |
| Drilldown.DrilldownGroup | id | `string` | Yes | - |  |
| Drilldown.DrilldownGroup | children | `GroupChildren \| GroupChildren[]` | No | - | Children of type: `<Drilldown.Option />`, `<Drilldown.Separator />` |
| Drilldown.DrilldownGroup | renderGroupTitle | `React.ReactNode \| (() => React.ReactNode)` | No | - | The label of the option group. |
| Drilldown.DrilldownGroup | withoutSeparators | `boolean` | No | `false` | Hides the separators around the group. |
| Drilldown.DrilldownGroup | disabled | `boolean` | No | `false` | Is the option group disabled. |
| Drilldown.DrilldownGroup | role | `string` | No | `!isMac() && isFirefox() ? 'menu' : 'group'` | The ARIA role of the element. |
| Drilldown.DrilldownGroup | as | `keyof JSX.IntrinsicElements \| ComponentType<P>` | No | - | Element type to render as. By default, it inherits Drilldown's `as` prop. |
| Drilldown.DrilldownGroup | elementRef | `(element: Element \| null) => void` | No | - | Provides a reference to the underlying html root element |
| Drilldown.DrilldownGroup | selectableType | `'single' \| 'multiple'` | No | - | Makes the option group selectable (with "check" icon indicators). Can be set to a single-select (radio) or a multi-select (checkbox) group. |
| Drilldown.DrilldownGroup | defaultSelected | `DrilldownOptionValue[]` | No | - | An array of the values for the selected items on initial render. Works only with "selectableType" set. If "selectableType" is "single", the array has to have 1 item. |
| Drilldown.DrilldownGroup | onSelect | `( event: React.SyntheticEvent, args: { value: DrilldownOptionValue[] isSelected: boolean selectedOption: OptionChild drilldown: Drilldown } ) => void` | No | - | Callback fired when an option within the `<Drilldown.Group />` is selected |
| Drilldown.DrilldownOption | id | `string` | Yes | - |  |
| Drilldown.DrilldownOption | children | `\| React.ReactNode \| ((props: { id: string variant: DrilldownOptionVariant isSelected: boolean }) => React.ReactNode)` | No | - | Label of the Drilldown option. |
| Drilldown.DrilldownOption | subPageId | `string` | No | - | The id of the sub-page the option navigates to. |
| Drilldown.DrilldownOption | disabled | `boolean` | No | `false` | Is the option disabled. |
| Drilldown.DrilldownOption | selected | `boolean` | No | - | Whether the option is selected or not. (Setting this property assumes controlled behaviour) |
| Drilldown.DrilldownOption | value | `string \| number \| undefined` | No | - | The value of the option. Should be set for options in selectable groups. |
| Drilldown.DrilldownOption | href | `string` | No | - | Providing href will render the option as `<a>`. Doesn't work, if subPageId is provided or is in a selectable group. |
| Drilldown.DrilldownOption | as | `keyof JSX.IntrinsicElements \| ComponentType<P>` | No | `'li'` | Element type to render as. Will be set to `<a>` if href is provided. If the parent is "ul" or "ol", the option is forced to be "li" element. *Important*: `Drilldown` is rendered as `ul` by default so you *have to* change that as well if you want to use this prop. |
| Drilldown.DrilldownOption | role | `string` | No | `'menuitem'` | The ARIA role of the element |
| Drilldown.DrilldownOption | renderLabelInfo | `\| keyof ReactHTML \| keyof ReactSVG \| ClassType<P, ClassicComponent<P, ComponentState>, ClassicComponentClass<P>> \| ComponentClass \| ReactNode \| ((data: P) => ReactNode \| Element) \| (() => ReactNode \| Element) \| Element` | No | - | Info content to render after the label. If a function is provided, it has a `props` parameter. |
| Drilldown.DrilldownOption | renderBeforeLabel | `\| keyof ReactHTML \| keyof ReactSVG \| ClassType<P, ClassicComponent<P, ComponentState>, ClassicComponentClass<P>> \| ComponentClass \| ReactNode \| ((data: P) => ReactNode \| Element) \| (() => ReactNode \| Element) \| Element` | No | - | Content to render before the label. If a function is provided, it has a `props` parameter. |
| Drilldown.DrilldownOption | renderAfterLabel | `\| keyof ReactHTML \| keyof ReactSVG \| ClassType<P, ClassicComponent<P, ComponentState>, ClassicComponentClass<P>> \| ComponentClass \| ReactNode \| ((data: P) => ReactNode \| Element) \| (() => ReactNode \| Element) \| Element` | No | - | Content to render after the label. If a function is provided, it has a `props` parameter. |
| Drilldown.DrilldownOption | beforeLabelContentVAlign | `'start' \| 'center' \| 'end'` | No | `'start'` | Sets the vAlign of renderBeforeLabel content |
| Drilldown.DrilldownOption | afterLabelContentVAlign | `'start' \| 'center' \| 'end'` | No | `'start'` | Sets the vAlign of renderAfterLabel content and renderLabelInfo |
| Drilldown.DrilldownOption | description | `React.ReactNode \| (() => React.ReactNode)` | No | - | Additional "secondary" description text |
| Drilldown.DrilldownOption | descriptionRole | `string` | No | - | The ARIA role of the description element |
| Drilldown.DrilldownOption | onOptionClick | `( event: React.SyntheticEvent, args: { optionId: string drilldown: Drilldown pageHistory: string[] goToPage: ( pageId: string ) => { prevPageId: string; newPageId: string } \| undefined goToPreviousPage: () => \| { prevPageId: string; newPageId: string } \| undefined } ) => void` | No | - | Callback fired when the option is clicked. |
| Drilldown.DrilldownOption | defaultSelected | `boolean` | No | - | Whether the option is selected by default. |
| Drilldown.DrilldownOption | elementRef | `(element: Element \| null) => void` | No | - | Provides a reference to the underlying html root element |
| Drilldown.DrilldownOption | shouldCloseOnClick | `'auto' \| 'always' \| 'never'` | No | `'auto'` | Should close the container menu component, if clicked on the option marked with this prop |
| Drilldown.DrilldownPage | id | `string` | Yes | - |  |
| Drilldown.DrilldownPage | children | `PageChildren \| PageChildren[]` | No | - | Children of type: `<Drilldown.Option />`, `<Drilldown.Separator />`, `<Drilldown.Group />` |
| Drilldown.DrilldownPage | renderTitle | `\| keyof ReactHTML \| keyof ReactSVG \| ClassType<P, ClassicComponent<P, ComponentState>, ClassicComponentClass<P>> \| ComponentClass \| ReactNode \| ((data: P) => ReactNode \| Element) \| (() => ReactNode \| Element) \| Element` | No | - | The title of the page displayed in the header |
| Drilldown.DrilldownPage | renderActionLabel | `React.ReactNode \| (() => React.ReactNode)` | No | - | Label for the optional "action" option in the header (e.g.: "Select all") |
| Drilldown.DrilldownPage | renderBackButtonLabel | `\| React.ReactNode \| ((prevPageTitle?: React.ReactNode) => React.ReactNode)` | No | `'Back'` | Label for the "back" navigation in the header. If a function is provided, the first parameter of the function is the title of the previous page. |
| Drilldown.DrilldownPage | onHeaderActionClicked | `(event: React.SyntheticEvent) => void` | No | - | Callback fired when the "action" option is clicked in the header |
| Drilldown.DrilldownPage | onBackButtonClicked | `(newPageId: string, prevPageId: string) => void` | No | - | Callback fired when the "back" navigation option is clicked in the header |
| Drilldown.DrilldownPage | withoutHeaderSeparator | `boolean` | No | `false` | Hides the separator under the page header |
| Drilldown.DrilldownPage | disabled | `boolean` | No | `false` | Is the page disabled |
| Drilldown.DrilldownSeparator | id | `string` | Yes | - |  |
| Drilldown.DrilldownSeparator | as | `keyof JSX.IntrinsicElements \| ComponentType<P>` | No | - | Element type to render as |

### Usage

Install the package:

```shell
npm install @instructure/ui-drilldown
```

Import the component:

```javascript
/*** ES Modules (with tree shaking) ***/
import { Drilldown } from '@instructure/ui-drilldown'
```

