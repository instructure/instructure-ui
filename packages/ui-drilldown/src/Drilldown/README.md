---
describes: Drilldown
---

TODO: description

### TODO: subtitle

TODO: example

```js
---
example: true
render: false
---

class SelectContactsExample extends React.Component {
  state = {
    selected: []
  }

  getCategoryById(id) {
    return this.props.contactsData.find(cat => cat.id === id)
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
      <div>
        <View as="div" margin="0 0 large">
          <div>Selected ({selected ? selected.length : 0}):</div>
          <div>{selected.map((a) => a.name).join(', ')}</div>
        </View>

        <Drilldown
          rootPageId="contacts"
          width="18.5rem"
          maxHeight="26.5rem"
          trigger={<Button>Select Contacts</Button>}
          onToggle={(_event, args) => {
            args.shown && this.selectContacts([])
          }}
        >
          {contactsData.map((page, idx) => this.renderPage(page, idx))}
        </Drilldown>
      </div>
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

```js
---
example: true
render: false
---

class SelectMembersExample extends React.Component {
  state = {
    selected: {}
  }

  selectMembers(groupValues) {
    this.setState(({ selected }) => {
      return { selected: { ...selected, ...groupValues }}
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
          onSelect={(_e, value) => {
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
      <div>
        <View as="div" margin="0 0 large">
          <div>Selected:</div>
          <List>
            {Object.entries(selected).map(([ groupId, values ], idx) => {
              return values.length > 0 ? (
                <List.Item key={idx}>
                  <b>{groupId}</b>: {values.join(', ')}
                </List.Item>
              ) : null
            })}
          </List>
        </View>

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
      </div>
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
          { id: 'course1_3', name: 'Kaiya Botosh' },
        ]
      },
      {
        id: 'course2',
        label: 'Course 2',
        selectableType: 'multiple',
        members: [
          { id: 'course2_1', name: 'Leo Calzoni' },
          { id: 'course2_2', name: 'Gretchen Gouse' },
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
          { id: 'groups1_5', name: 'Daphne Dioli' },
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
          { id: 'consortium1_2', name: 'Elodia Dreschner' },
        ]
      },
      {
        id: 'consortium2',
        label: 'Consortium 2',
        selectableType: 'multiple',
        members: [
          { id: 'consortium2_1', name: 'Darwin Peter' },
          { id: 'consortium2_2', name: 'Sukhrab Burnham' },
        ]
      },
      {
        id: 'consortium3',
        label: 'Consortium 3',
        selectableType: 'multiple',
        members: [
          { id: 'consortium3_1', name: 'Jeffry Antonise' },
          { id: 'consortium3_2', name: 'Bia Regenbogen' },
        ]
      }
    ]
  }
]

render(<SelectMembersExample pages={pages} />)
```

```js
---
example: true
render: false
---

class VideoSettingsExample extends React.Component {
  state = {
    selectedCaption: 'English',
    selectedSpeed: 'Normal',
    selectedQuality: '720p',
    isCommentsOn: true
  }

  renderTrigger() {
    return (
      <Tooltip
        renderTip="Video Settings"
        placement="top"
        on={['hover', 'focus']}
      >
        <IconButton
          renderIcon={IconSettingsSolid}
          screenReaderLabel="Video Settings"
        />
      </Tooltip>
    )
  }

  renderSelected(props, value) {
    return (
      <span style={{ color: props.variant === 'default' ? '#6B7780' : undefined }}>
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
        onSelect={(_event, value) => {
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
    const {
      captionOptions,
      speedOptions,
      qualityOptions
    } = this.props

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
            renderLabelInfo={
              (props) => this.renderSelected(props, this.state.selectedCaption)
            }
          >
            Captions
          </Drilldown.Option>
          <Drilldown.Option
            id="speed"
            subPageId="speed"
            renderLabelInfo={
              (props) => this.renderSelected(props, this.state.selectedSpeed)
            }
          >
            Speed
          </Drilldown.Option>
          <Drilldown.Option
            id="quality"
            subPageId="quality"
            renderLabelInfo={
              (props) => this.renderSelected(props, this.state.selectedQuality)
            }
          >
            Quality
          </Drilldown.Option>
          <Drilldown.Option
            id="comments"
            onOptionClick={() => {
              this.setState((state) => ({ isCommentsOn: !state.isCommentsOn }))
            }}
            renderLabelInfo={
              <Checkbox
                label={<ScreenReaderContent>Comments</ScreenReaderContent>}
                variant='toggle'
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

        <Drilldown.Page
          id="captions"
          renderTitle="Captions"
        >
          {this.renderSelectGroup(captionOptions, 'selectedCaption')}
        </Drilldown.Page>

        <Drilldown.Page
          id="speed"
          renderTitle="Speed"
        >
          {this.renderSelectGroup(speedOptions, 'selectedSpeed')}
        </Drilldown.Page>

        <Drilldown.Page
          id="quality"
          renderTitle="Quality"
        >
          {this.renderSelectGroup(qualityOptions, 'selectedQuality')}
        </Drilldown.Page>
      </Drilldown>
    )
  }
}

render(<VideoSettingsExample
  captionOptions={['Off', 'English', 'German', 'Spanish', 'Durtch']}
  speedOptions={['0.5x', 'Normal', '1.25x', '1.5x', '2x']}
  qualityOptions={['Auto', '360p', '480p', '720p', '1080p']}
/>)
```

```js
---
example: true
render: false
---

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
    this.setState({ schoolsData: {
      ...this.state.schoolsData,
        [id]: { ...school, isSelected: !school.isSelected }
    } })
  }

  renderSelectedIcon(isSelected) {
    return (
      <IconCheckSolid
        style={{ opacity: isSelected ? 1 : 0 }}
      />
    )
  }

  renderAddAction(label) {
    return (
      <span>
        <IconAddSolid />
        <View as="span" margin="0 0 0 x-small">New {label}</View>
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
    const id = type === 'school' ? "deleteSchool" : "deleteDistrict"
    const callback = type === 'school' ? this.deleteSchool : this.deleteDistrict

    return [
      <Drilldown.Separator key={`${idToDelete}__separator`} />,
      <Drilldown.Option
        id={id}
        key={`${idToDelete}__${id}`}
        onOptionClick={() => { callback(idToDelete) }}
        themeOverride={(_componentTheme, currentTheme) => {
          return { color: currentTheme.colors.textDanger }
        }}
      >
        <IconTrashLine />
        <View as='span' margin='0 0 0 x-small'>
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
          schools: district.schools.filter(schoolId => schoolId !== id)
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
      <Drilldown
        rootPageId="root"
        width="18.5rem"
        maxHeight="26.5rem"
      >
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

        {districts.map(([districtId , district]) => {
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

```js
---
example: true
render: false
---

class Example extends React.Component {
  render() {
    return (
      <Drilldown
        rootPageId="page0"
        maxHeight="10rem"
        width="25rem"
      >
        {this.props.pages.map((page, idx) => {
          const { options, ...pageProps } = page
          return (
            <Drilldown.Page key={idx} {...pageProps}>
              {options.map((option, idx) => {
                const { label, ...optionProps } = option
                return (
                  <Drilldown.Option key={idx} {...optionProps}>
                    {label}
                  </Drilldown.Option>
                )
              })}
            </Drilldown.Page>
          )
        })}
      </Drilldown>
    )
  }
}

const pagesData = [
  {
    id: 'page0',
    renderTitle: 'root page',
    renderActionLabel: 'Select all',
    options: Array(4)
      .fill(0)
      .map((_item, idx) => ({
        id: `page0_${idx}`,
        subPageId: idx === 0 ? 'page1' : idx === 1 ? 'page2' : undefined,
        label: ({ id }) => `label ${id}`,
        description: 'This is a description'
      }))
  },
  {
    id: 'page1',
    renderBackButtonLabel: (prevPageTitle) => `Back to ${prevPageTitle}`,
    renderTitle: (previousOptionId) => {
      return previousOptionId
    },
    options: Array(2)
      .fill(0)
      .map((_item, idx) => ({
        id: `page1_${idx}`,
        subPageId: idx === 0 ? 'page3' : undefined,
        label: ({ id }) => `label ${id}`,
      }))
  },
  {
    id: 'page2',
    renderTitle: 'page2',
    options: Array(3)
      .fill(0)
      .map((_item, idx) => ({
        id: `page2_${idx}`,
        label: 'asd'
      }))
  },
  {
    id: 'page3',
    renderTitle: 'page2',
    options: Array(5)
      .fill(0)
      .map((_item, idx) => ({
        id: `page2_${idx}`,
        label: 'asd'
      }))
  }
]

render(<Example pages={pagesData} />)

```

```js
---
example: true
---

<Drilldown rootPageId='page0' width="25rem">
  <Drilldown.Page id="page0">
    <Drilldown.Option
      id="item1"
      subPageId="page1"
      description="This is a submenu"
    >
      Asd1
    </Drilldown.Option>
    <Drilldown.Option
      id="item2"
      subPageId="page1"
      renderLabelInfo="After"
    >
      Asd2
    </Drilldown.Option>
    <Drilldown.Option
      id="item3"
      themeOverride={{ padding: '0.25rem 0.75rem' }}
      afterLabelContentVAlign="center"
      renderLabelInfo={<Checkbox
        label={<ScreenReaderContent>Label</ScreenReaderContent>}
        variant='toggle'
        defaultChecked
        labelPlacement="start"
        tabIndex={-1}
      />}
    >
      Asd2
    </Drilldown.Option>
    <Drilldown.Separator id="sep1">Asd2</Drilldown.Separator>
    <Drilldown.Option
      id="item4"
      renderLabelInfo="After"
      disabled
    >
      disabled
    </Drilldown.Option>
    <Drilldown.Option
      id="item5"
      description={lorem.paragraph(2)}
    >
      Asd2
    </Drilldown.Option>

    <Drilldown.Option
      id="item6"
      href="/#Drilldown/#Drilldown"
    >
      Link to top of the page
    </Drilldown.Option>
    <Drilldown.Option
      id="item7"
      href="/#Drilldown/#Drilldown"
      disabled
    >
      Disabled Link
    </Drilldown.Option>

    <Drilldown.Group
      id="group1"
      renderGroupTitle="Multi-select group"
      selectableType="multiple"
    >
      <Drilldown.Option id="item11">GroupItem</Drilldown.Option>
      <Drilldown.Option id="item12">GroupItem</Drilldown.Option>
      <Drilldown.Option id="item13">GroupItem</Drilldown.Option>
    </Drilldown.Group>

    <Drilldown.Group
      id="group2"
      renderGroupTitle="Single-select group"
      selectableType="single"
    >
      <Drilldown.Option id="item21">GroupItem</Drilldown.Option>
      <Drilldown.Option id="item22">GroupItem</Drilldown.Option>
      <Drilldown.Option id="item23">GroupItem</Drilldown.Option>
    </Drilldown.Group>

    <Drilldown.Option id="item8">Asd2</Drilldown.Option>
    <Drilldown.Option id="item9">Asd3</Drilldown.Option>
  </Drilldown.Page>

  <Drilldown.Page id="page1" renderTitle={"Asdddddd"}>
    <Drilldown.Option id="item1">Asd1</Drilldown.Option>
    <Drilldown.Option id="item2">Asd2</Drilldown.Option>
    <Drilldown.Option id="item3">Asd3</Drilldown.Option>
  </Drilldown.Page>
</Drilldown>

```

### Guidelines

```js
---
guidelines: true
---
<Guidelines>
  <Figure recommendation="yes" title="Do">
    <Figure.Item>TODO: guidelines</Figure.Item>
  </Figure>
  <Figure recommendation="no" title="Don't">
    <Figure.Item>TODO: guidelines</Figure.Item>
  </Figure>
</Guidelines>
```
