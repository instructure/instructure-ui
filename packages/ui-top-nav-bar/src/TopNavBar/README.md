---
describes: TopNavBar
---

The `TopNavBar` component is a navigation bar component that helps to consistently position the site navigation items and actions throughout all pages and applications. It’s used for branding, navigation, user login and actions.

TopNavBar adapts to small screen widths by truncating nav items and displaying a more specialised view.

### Playground

Click on the button below to open up an interactive, fullscreen example, where you can toggle the elements of TopNavBar on and off. You can test the "desktop" and "smallViewport" views, several layout versions, states, menu item variants, and many more.

```js
---
type: example
---
class PlaygroundExample extends React.Component {
  state = {
    rtlMode: false,
    showBreadcrumb: false,
    inverseColor: false,
    isSecondaryNavigation: false,
    hasBrandSection: true,
    hasMenuItemsSection: true,
    hasActionItemsSection: true,
    hasUserSection: true,
    useAlternativeTitle: false,
    renderIcon: true,
    iconBackground: true,
    extraMenuItems: false,
    extraActionItems: false,
    actionItemShowChevronForSubmenu: false,
    actionItemVariant: 'icon',
    userShowChevronForSubmenu: true,
    userVariant: 'avatar',
    disableMenuItem: false,
    disableMenuItemWithSubmenu: false,
    disableSubmenuItem: false,
    disableAction: false,
    disableUser: false,
    isModalOpen: false,
    exampleViewport: 'desktop',
    isSearchOpen: false,
    currentPageId: 'overview',
    activeIds: ['overview'],
    breadcrumbs: ['Overview'],
    searchInputValue: '',
  }

  canvasNavbarHeight = '3.5rem'
  activeOptionStyle = {
    display: 'inline-block',
    fontWeight: 'bold',
    paddingBottom: '0.125rem',
    borderBottom: '0.125rem solid currentColor'
  }

  fillerText = lorem.paragraphs(4)

  navItems = [
    {
      id: 'overview',
      label: 'Overview',
      href: '#Overview'
    },
    {
      id: 'admin',
      label: 'Admin',
      submenu: [
        {
          id: 'manage',
          label: 'Manage',
          submenu: { /* submenu */ }
        },
        {
          id: 'reporting',
          label: 'Reporting',
          submenu: { /* submenu */ }
        },
        {
          id: 'assessment',
          label: 'Assessment',
          submenu: { /* submenu */ }
        },
        {
          id: 'itemBank',
          label: 'Item Bank',
          href: '/#TopNavBar'
        },
        {
          id: 'progressReports',
          label: 'Progress Reports',
          href: '/#TopNavBar'
        }
      ],
    },
    {
      id: 'contact',
      label: 'Contact',
      customPopoverConfig: {
        on: 'click',
        shouldContainFocus: true,
        children: (
          <View
            as="div"
            padding="medium"
            width="25rem"
            role="dialog"
            tabIndex={0}
            aria-label="Contact information"
            position="relative"
            borderRadius="small"
          >
            <Heading level="h3">Contact information</Heading>
            <p>{lorem.sentence()}</p>
            <Button color="primary" margin="x-small 0 small">Help Center</Button>
            <hr aria-hidden="true" />
            <View as="div" margin="medium 0 0">
              <Text weight="bold">
                <div>Contact person</div>
                <Link href="/#TopNavBar" isWithinText={false}>
                  contact.person@example.com
                </Link>
                <div>(801) 123-4567</div>
              </Text>
            </View>
          </View>
        )
      }
    },
    {
      id: 'data',
      label: 'Data',
      onClick: () => console.log('"Data" menu item clicked')
    },
  ]

  toggleSearch(isOpen) {
    this.setState({ isSearchOpen: isOpen })
  }

  generateSubmenu(navItem) {
    const { id: rootItemId, submenu } = navItem

    return (
      <Drilldown rootPageId={`root_${rootItemId}`}>
        {[
          <Drilldown.Page id={`root_${rootItemId}`} key={`root_${rootItemId}`}>
            {[
              ...submenu.map(submenuItem => {
                const isActive = this.state.activeIds.includes(submenuItem.id)
                const isCurrentPage = this.state.activeIds[this.state.activeIds.length - 1] === submenuItem.id
                let onOptionClick = submenuItem.onClick

                if (submenuItem.href && !submenuItem.submenu) {
                  onOptionClick = (() => {
                    this.setState({
                      currentPageId: rootItemId,
                      activeIds: [rootItemId, submenuItem.id],
                      breadcrumbs: [
                        this.navItems.find(item => item.id === rootItemId).label,
                        submenuItem.label
                      ]
                    })
                  })
                }

                return (
                  <Drilldown.Option
                    key={`${submenuItem.id}_option`}
                    id={`${submenuItem.id}_option`}
                    aria-current={isCurrentPage ? "page" : undefined}
                    subPageId={submenuItem.submenu ? `${submenuItem.id}_page` : undefined}
                    href={!submenuItem.submenu ? submenuItem.href : undefined}
                    onOptionClick={onOptionClick}
                    afterLabelContentVAlign="center"
                    renderBeforeLabel={submenuItem.renderIcon}
                    {...this.state.disableSubmenuItem
                      && submenuItem.label === 'Item Bank'
                      && { disabled: true }
                    }
                  >
                    {isActive ? (
                      <span style={this.activeOptionStyle}>
                        {submenuItem.label}
                      </span>
                    ) : submenuItem.label}
                  </Drilldown.Option>
                )
              })
            ]}
          </Drilldown.Page>,

          ...submenu.filter(item => item.submenu).map(
            (submenuItem) => (
              <Drilldown.Page id={`${submenuItem.id}_page`} key={`${submenuItem.id}_page`}>
                {Array.from(Array(5)).map((_item, idx) => {
                  const id = `${submenuItem.id}_subItem-${idx}`
                  const label = `${submenuItem.label} Lvl 2 Item`
                  const isActive = this.state.activeIds.includes(id)
                  const isCurrentPage = this.state.activeIds[this.state.activeIds.length - 1] === id
                  return (
                    <Drilldown.Option
                      id={id}
                      key={id}
                      href="/#TopNavBar"
                      aria-current={isCurrentPage ? "page" : undefined}
                      onOptionClick={() => {
                        this.setState({
                          currentPageId: rootItemId,
                          activeIds: [rootItemId, submenuItem.id, id],
                          breadcrumbs: [
                            this.navItems.find(item => item.id === rootItemId).label,
                            submenuItem.label,
                            label
                          ]
                        })
                      }}
                      afterLabelContentVAlign="center"
                    >
                      {isActive ? (
                        <span style={this.activeOptionStyle}>
                          {label}
                        </span>
                      ) : label}
                    </Drilldown.Option>
                  )
                })}
              </Drilldown.Page>
            )
          )
        ]}
      </Drilldown>
    )
  }

  renderSearch(currentLayout, closeInPlaceDialog) {
    return (
      <View as="div" padding="x-small">
        <TextInput
          id="searchInput"
          width="100%"
          display="block"
          renderLabel={<ScreenReaderContent>Search</ScreenReaderContent>}
          renderBeforeInput={() => <IconSearchLine inline={false} />}
          placeholder="Search..."
          onChange={(_event, value) => {
            this.setState({ searchInputValue: value })
          }}
          value={this.state.searchInputValue}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault()
              event.stopPropagation()

              console.log(`Search input submitted value "${this.state.searchInputValue}".`)

              this.setState({ searchInputValue: '' })

              if (currentLayout === 'smallViewport' && typeof closeInPlaceDialog === 'function') {
                closeInPlaceDialog()
              } else {
                this.toggleSearch(false)
              }
            }
          }}
          themeOverride={
            this.state.isSecondaryNavigation
              ? undefined
              : (_theme, globalTheme) => ({
                focusOutlineColor: globalTheme.colors.borderLightest
              })
          }
        />
      </View>
    )
  }

  renderExampleSettings() {
    const settings = {
      viewport: {
        label: 'Example settings',
        radios: {
          exampleViewport: ['desktop', 'smallViewport']
        },
        checkboxes: ['rtlMode']
      },
      secondaryNav: {
        label: 'Secondary navigation',
        checkboxes: [
          'isSecondaryNavigation',
        ]
      },
      breadcrumb: {
        label: 'Display Breadcrumb',
        checkboxes: ['showBreadcrumb']
      },
      global: {
        label: 'Global settings',
        checkboxes: [
          'inverseColor',
          'hasBrandSection',
          'hasMenuItemsSection',
          'hasActionItemsSection',
          'hasUserSection',
        ]
      },
      smallViewportLayout: {
        label: 'Small viewport layout settings',
        checkboxes: [
          'useAlternativeTitle'
        ]
      },
      brand: {
        label: 'TopNavBar.Brand settings',
        checkboxes: [
          'renderIcon',
          'iconBackground',
        ]
      },
      menuItems: {
        label: 'TopNavBar.MenuItems settings',
        checkboxes: [
          'extraMenuItems',
        ]
      },
      actionItems: {
        label: 'TopNavBar.ActionItems settings',
        checkboxes: [
          'extraActionItems',
          'actionItemShowChevronForSubmenu',
        ],
        radios: {
          actionItemVariant: [
            'icon', 'default', 'default with icon', 'button', 'button with icon'
          ]
        }
      },
      user: {
        label: 'TopNavBar.User settings',
        checkboxes: [
          'userShowChevronForSubmenu',
        ],
        radios: {
          userVariant: ['avatar', 'avatar with user name', 'user name', 'login text', 'login button']
        }
      },
      disabledSection: {
        label: 'Disabled state',
        checkboxes: [
          'disableMenuItem',
          'disableMenuItemWithSubmenu',
          'disableSubmenuItem',
          'disableAction',
          'disableUser',
        ],
      },
    }

    const settingLabels = {
      exampleViewport: 'Toggle example viewport',
      rtlMode: 'RTL mode',
      showBreadcrumb: 'Show Breadcrumb',
      isSecondaryNavigation: 'Display as secondary navigation',
      inverseColor: '"inverseColor" prop',
      hasBrandSection: '"renderBrand" prop',
      hasMenuItemsSection: '"renderMenuItems" prop',
      hasActionItemsSection: '"renderActionItems" prop',
      hasUserSection: '"renderUser" prop',
      useAlternativeTitle: '"alternativeTitle" prop',
      extraMenuItems: 'Display extra menu items',
      extraActionItems: 'Display extra action items',
      actionItemShowChevronForSubmenu: '"showSubmenuChevron" prop',
      userShowChevronForSubmenu: '"showSubmenuChevron" prop',
      actionItemVariant: 'Display action items as variant:',
      userVariant: 'Display user menu as:',
      disableMenuItem: 'menu item',
      disableMenuItemWithSubmenu: 'menu item with submenu',
      disableSubmenuItem: 'submenu item',
      disableAction: 'action',
      disableUser: 'user',
    }

    const settingDescriptions = {
      isSecondaryNavigation: 'When the navbar is used as a secondary navigation (e.g.: under Canvas main navbar), using the inverse color mode is recommended. For using Breadcumbs in the navbar, inverse color is necessary.',
      showBreadcrumb: 'Display a Breadcrumb in the navbar. Requires the `renderBrand` and `renderMenuItems` props to be null and `inverseColor` to be true.',
      hasBrandSection: 'Displays brand section',
      hasMenuItemsSection: 'Displays main navbar items',
      hasActionItemsSection: 'Displays action items',
      hasUserSection: 'Displays user menu',
      useAlternativeTitle: 'Displays other data (e.g.: page title) instead of the Brand logo and link',
      renderIcon: 'Visible only in "desktop" mode',
      iconBackground: 'Visible only in "desktop" mode',
      extraMenuItems: 'In "desktop" mode, when there is not enough room to list all the menu items, they will be accessible via a dropdown menu at the end of the list',
      actionItemShowChevronForSubmenu: 'Displays the open/close chevron next to the item, when it has a submenu or custom popover',
      userShowChevronForSubmenu: 'Displays the open/close chevron next to the item, when it has a submenu or custom popover (only visible in "desktop" mode)',
      extraActionItems: 'In "smallViewport" mode, when there is not enough room to list all the action items, they will be accessible via a dropdown menu at the end of the list',
      actionItemVariant: 'In "smallViewport" mode all items are displayed as `variant="icon"` due to the lack of space',
      userVariant: 'In "smallViewport" mode it will always display as text (with or without avatar)',
      disableMenuItem: 'e.g.: "Settings" menu item',
      disableMenuItemWithSubmenu: 'e.g.: "Admin" menu item',
      disableSubmenuItem: 'e.g.: "Item Bank" menu item under "Admin"',
      disableAction: 'e.g.: "Info" action',
    }

    return (
      <View as="div" margin="medium 0 large">
        <FormFieldGroup
          description={(
            <Heading as="p" level="h3" margin="0 0 large">
              Example Settings
            </Heading>
          )}
          colSpacing="large"
          rowSpacing="large"
          layout="stacked"
          vAlign="top"
        >
          {Object.values(settings).map(({ label, checkboxes = [], radios = {} }) => {
            const name = label.replace(' ', '')

            const checkboxSettings = checkboxes.length ? (
              <CheckboxGroup
                description={label}
                name={name}
                key={name}
                layout="stacked"
                defaultValue={checkboxes.filter(setting => this.state[setting])}
              >
                {checkboxes.map((setting) => (
                    <Checkbox
                      key={`${setting}Setting`}
                      variant="toggle"
                      value={setting}
                      label={settingLabels[setting] || `"${setting}" prop`}
                      checked={false}
                      messages={settingDescriptions[setting]
                        ? [{ text: settingDescriptions[setting], type: 'hint' }]
                        : undefined
                      }
                      onChange={() => {
                        this.setState({ [setting]: !this.state[setting] })
                      }}
                    />
                  ))}
              </CheckboxGroup>
            ) : null

            const radioSettings = Object.entries(radios).map(([name, values]) => {
              return (
                <RadioInputGroup
                  onChange={(_event, value) => {
                    this.setState({ [name]: value })
                  }}
                  value={this.state[name]}
                  name={`${name}Setting`}
                  description={settingLabels[name] || name}
                  messages={settingDescriptions[name]
                    ? [{ text: settingDescriptions[name], type: 'hint' }]
                    : undefined
                  }
                >
                  {values.map(value =>
                    <RadioInput key={value} value={value} label={value} />
                  )}
                </RadioInputGroup>
              )
            })

            return [checkboxSettings, radioSettings]
          })}
        </FormFieldGroup>
      </View>
    )
  }

  renderPageContent() {
    return (
      <View overflowY='auto' as="div">
        <View as="div" maxWidth="75rem" margin="0 auto">

          <View as="div" margin="large medium small">
            <Button
              onClick={() => { this.setState({ isModalOpen: false }) }}
              renderIcon={IconXSolid}
            >
              Close TopNavBar Fullscreen Example
            </Button>
          </View>

          <View as="div" margin="large medium 0">
            <Heading as="p" level="h2" margin="0 0 x-small">
              {this.state.breadcrumbs[this.state.breadcrumbs.length - 1]}
            </Heading>

            {this.state.breadcrumbs.length > 1 && (
              <Breadcrumb label="You are here:">
                {this.state.breadcrumbs.map(breadcrumb => (
                  <Breadcrumb.Link key={breadcrumb}>
                    {breadcrumb}
                  </Breadcrumb.Link>

                ))}
              </Breadcrumb>
            )}
          </View>

          <Responsive
            query={{
              small: { maxWidth: 719 },
              large: { minWidth: 720 }
            }}
            props={{
              small: {
                flexDirection: 'column',
                textWidth: "100%",
                settingsWidth: "100%"
              },
              large: {
                flexDirection: 'row-reverse',
                textWidth: "60%",
                settingsWidth: "40%"
              }
            }}
            render={(props, matches) => {
              return (
                <Flex
                  alignItems="start"
                  wrap="wrap"
                  direction={props.flexDirection}
                >
                  <Flex.Item
                    width={props.settingsWidth}
                    padding="small medium medium"
                  >
                    {this.renderExampleSettings()}
                  </Flex.Item>
                  <Flex.Item
                    width={props.textWidth}
                    padding="small medium medium"
                  >
                    {Array.from(Array(5)).map((_i, idx) => (
                      <View as="div" margin="medium 0" key={idx}>
                        {this.fillerText}
                      </View>
                    ))}
                  </Flex.Item>
                </Flex>
              )
            }}
          />
        </View>
      </View>
    )
  }

  renderNavBar() {
    const navItems = [
      ...this.navItems,
      ...(this.state.extraMenuItems
        ? Array.from(Array(20)).map((i, idx) => (
          {
            id: `item${idx}`,
            label: `Item ${idx + 1}`,
            href: `/#Item${idx}`
          }
        ))
        : []
      )
    ]

    const actionItemSettings = {
      variant: this.state.actionItemVariant.replace(' with icon', ''),
      showSubmenuChevron: this.state.actionItemShowChevronForSubmenu,
    }

    return (
      <TopNavBar
        inverseColor={this.state.inverseColor}
        mediaQueryMatch="element"
      >
        {({ currentLayout, inverseColor }) => {

          if (currentLayout === 'desktop' && !this.state.actionItemVariant.includes('icon')) {
            actionItemSettings.renderIcon = undefined
          }

          return (
            <TopNavBar.Layout
              navLabel={this.state.isSecondaryNavigation
                ? 'Secondary navigation bar'
                : 'Main navigation bar'}
              smallViewportConfig={{
                dropdownMenuToggleButtonLabel: 'Toggle Menu',
                dropdownMenuLabel: 'Main Menu',
                alternativeTitle: this.state.useAlternativeTitle || inverseColor
                  ? this.state.breadcrumbs[this.state.breadcrumbs.length - 1]
                  : undefined,
                renderInPlaceDialogConfig: {
                  open: this.state.isSearchOpen,
                  onClose: () => {
                    this.toggleSearch(false)
                  },
                  closeButtonLabel: 'Close Search and return to Navigation',
                  returnFocusElement: () =>
                    document.getElementById('Search'),
                  shouldCloseOnEscape: true,
                  shouldCloseOnDocumentClick: false,
                  shouldContainFocus: false,
                  content: ({ closeInPlaceDialog }) => this.renderSearch(currentLayout, closeInPlaceDialog)
                }
              }}
              renderBrand={this.state.hasBrandSection ? (
                <TopNavBar.Brand
                  screenReaderLabel="Elevate Data Sync"
                  href="/#TopNavBar"
                  {...{
                    ...(this.state.renderIcon && {
                      renderIcon: inverseColor
                        ? undefined
                        : elevateIcon
                    }),
                    ...(this.state.iconBackground && {
                      iconBackground: '#0097D3'
                    }),
                  }}
                />
              ) : undefined }
              renderMenuItems={this.state.hasMenuItemsSection ? (
                <TopNavBar.MenuItems
                  listLabel="Page navigation"
                  currentPageId={this.state.currentPageId}
                  renderHiddenItemsMenuTriggerLabel={(
                    hiddenChildrenCount
                  ) => `${hiddenChildrenCount} More`}
                >
                  {navItems.map(item => (
                    <TopNavBar.Item
                      key={item.id}
                      id={item.id}

                      {...this.state.disableMenuItem && item.label === 'Settings' && {
                        status: 'disabled'
                      }}
                      {...this.state.disableMenuItemWithSubmenu && item.label === 'Admin' && {
                        status: 'disabled'
                      }}

                      {...item.submenu && {
                        renderSubmenu: this.generateSubmenu(item),
                        'aria-label': `Open for ${item.label} menu`
                      }}

                      {...item.customPopoverConfig && {
                        customPopoverConfig: item.customPopoverConfig,
                        'aria-label': `Open for ${item.label} menu`
                      }}

                      {...!item.submenu && !item.customPopoverConfig ? {
                        // Example logic:
                        href: '/#TopNavBar',
                        onClick: () => {
                          if (typeof item.onClick === 'function') {
                            item.onClick()
                          }

                          this.setState({
                            currentPageId: item.id,
                            activeIds: [item.id],
                            breadcrumbs: [item.label],
                          })
                        }
                      } : {
                        href: undefined,
                        onClick: undefined
                      }}
                    >
                      {item.label}
                    </TopNavBar.Item>
                  ))}
                </TopNavBar.MenuItems>
              ) : undefined }
              renderActionItems={this.state.hasActionItemsSection ? (
                <TopNavBar.ActionItems
                  listLabel="Actions"
                  renderHiddenItemsMenuTriggerLabel={(
                    hiddenChildrenCount
                  ) => `${hiddenChildrenCount} more actions`}
                  renderHiddenItemsMenuTriggerTooltip={(
                    hiddenChildrenCount
                  ) => `${hiddenChildrenCount} more actions`}
                >
                  <TopNavBar.Item
                    id="Search1"
                    renderIcon={<IconSearchLine />}
                    aria-label="Open to search in the page"
                    {...actionItemSettings}
                    {...(currentLayout === 'desktop'
                      ? {
                        customPopoverConfig: {
                          children: this.renderSearch(currentLayout),
                          color: 'primary-inverse',
                          isShowingContent: this.state.isSearchOpen,
                          onShowContent: () => { this.toggleSearch(true) },
                          onHideContent: () => { this.toggleSearch(false) },
                          on: 'click',
                          shouldCloseOnDocumentClick: true,
                          placement: 'bottom end'
                        }
                      }
                      : {
                        onClick: () => {
                          this.toggleSearch(true)
                        }
                      })}
                  >
                    Search
                  </TopNavBar.Item>

                  <TopNavBar.Item
                    id="Info"
                    renderIcon={<IconQuestionLine />}
                    aria-label="Open for info menu"
                    renderSubmenu={this.generateSubmenu({
                      id: 'Info',
                      submenu: ['Contact', 'Map', 'Career'].map(item => ({
                        id: item.toLowerCase(),
                        label: item,
                        onClick: () => {
                          console.log(`"${item}" action clicked`)
                        }
                      }))
                    })}
                    {...actionItemSettings}
                    {...this.state.disableAction && {
                      status: 'disabled'
                    }}
                  >
                    Info
                  </TopNavBar.Item>

                  {this.state.extraActionItems &&
                    [
                      { name: 'Alerts', icon: <IconAlertsLine /> },
                      { name: 'Calendar', icon: <IconCalendarMonthLine /> },
                      { name: 'Discussion', icon: <IconDiscussionLine /> },
                    ].map(({ name, icon }) => {
                      return (
                        <TopNavBar.Item
                          id={name.toLowerCase()}
                          key={name}
                          onClick={() => {
                            console.log(`"${name}" action clicked`)
                          }}
                          renderIcon={icon}
                          {...actionItemSettings}
                        >
                          {name}
                        </TopNavBar.Item>
                      )
                    })}
                </TopNavBar.ActionItems>
              ) : undefined }
              renderUser={this.state.hasUserSection ? (
                <TopNavBar.User>
                  <TopNavBar.Item
                    id="User"
                    tooltip="User settings"
                    aria-label="User settings"
                    variant={this.state.userVariant === 'avatar'
                      ? 'avatar'
                      : this.state.userVariant.includes('button')
                      ? 'button'
                      : 'default'
                    }
                    renderAvatar={this.state.userVariant.includes('avatar')
                      ? {
                        avatarName: 'User Name',
                        avatarSrc: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
                      }
                      : undefined
                    }
                    renderSubmenu={this.state.userVariant.includes('login')
                      ? undefined
                      : this.generateSubmenu({
                        id: 'Info',
                        submenu: [
                          { label: 'Profile', icon: IconUserLine },
                          { label: 'Personal settings', icon: IconSettingsLine },
                          { label: 'Log out', icon: IconXLine },
                        ].map(item => ({
                          id: item.label.replace(' ', '').toLowerCase(),
                          label: item.label,
                          renderIcon: item.icon,
                          onClick: () => {
                            console.log(`"${item.label}" action clicked`)
                          }
                        }))
                      })
                    }
                    href={this.state.userVariant.includes('login')
                      ? '/#TopNavBar'
                      : undefined
                    }
                    showSubmenuChevron={this.state.userShowChevronForSubmenu}
                    {...this.state.disableUser && {
                      status: 'disabled'
                    }}
                  >
                    {this.state.userVariant.includes('login')
                      ? 'Log in/Register'
                      : 'User Name'
                    }
                  </TopNavBar.Item>
                </TopNavBar.User>
              ) : undefined }
              renderBreadcrumb={this.state.showBreadcrumb && (
                <TopNavBar.Breadcrumb>
                  <Breadcrumb label="You are here:">
                    <Breadcrumb.Link href="#">Course page 1</Breadcrumb.Link>
                    <Breadcrumb.Link href="#">Course page 2</Breadcrumb.Link>
                    <Breadcrumb.Link href="#">Course page 3</Breadcrumb.Link>
                    <Breadcrumb.Link href="#">Course page 4</Breadcrumb.Link>
                    <Breadcrumb.Link>Course page 5</Breadcrumb.Link>
                  </Breadcrumb>
                </TopNavBar.Breadcrumb>
              )}
              themeOverride={{
                // For example demo
                smallViewportZIndex: 9999,
                smallViewportTrayFixTopPosition: this.state.isSecondaryNavigation
                  ? `calc(${this.canvasNavbarHeight} + 1px + 3.5rem)`
                  : '3.5rem'
              }}
            />
          )
        }}
      </TopNavBar>
    )
  }

  renderModalContent() {
    return (
      <div
        key={this.state.exampleViewport}
        style={{
          height: '100%',
          overflow: 'hidden',
          minHeight: 0,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {this.state.isSecondaryNavigation && (
          <div
            style={{
              background: '#394B58',
              color: 'white',
              position: 'relative',
              padding: '16px',
              flex: `0 0 ${this.canvasNavbarHeight}`,
              boxSizing: 'border-box',
              zIndex: 10000
            }}
          >
            Primary Navbar
          </div>
        )}


        <InstUISettingsProvider dir={this.state.rtlMode ? 'rtl' : 'ltr'}>
          {this.renderNavBar()}
        </InstUISettingsProvider>

        {this.renderPageContent()}
      </div>
    )
  }

  render() {
    return (
      <div>
        <Button
          color="primary"
          onClick={() => { this.setState({ isModalOpen: true }) }}
        >
          Open TopNavBar Fullscreen Example
        </Button>

        <Modal
          open={this.state.isModalOpen}
          onDismiss={() => { this.setState({ isModalOpen: false }) }}
          size={this.state.exampleViewport === 'desktop'
            ? 'fullscreen'
            : 'small'
          }
          label="TopNavBar Fullscreen Example"
          shouldCloseOnDocumentClick={false}
          overflow="fit"
        >
          <Modal.Body padding="none">
            {this.renderModalContent()}
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}

const elevateLogo = (
  <svg
    width="90"
    height="36"
    viewBox="0 0 90 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      <path
        d="M0.0861816 10.546V0.0927734H7.63835V2.44336H2.74183V4.0713H7.5314V6.42454H2.74183V8.20601H7.63835V10.5566L0.0861816 10.546Z"
        fill="white"
      />
      <path
        d="M10.3696 10.546V0.0927734H13.0279V8.20601H17.1679V10.5566L10.3696 10.546Z"
        fill="white"
      />
      <path
        d="M19.761 10.546V0.0927734H27.3132V2.44336H22.4166V4.0713H27.2036V6.42454H22.4166V8.20601H27.3132V10.5566L19.761 10.546Z"
        fill="white"
      />
      <path
        d="M32.8697 10.546L28.9932 0.0927734H32.0062L34.5549 7.62895L37.0879 0.0927734H40.0984L36.2219 10.546H32.8697Z"
        fill="white"
      />
      <path
        d="M48.407 10.546L47.8853 9.03983H43.8262L43.3175 10.546H40.3123L44.1888 0.0927734H47.541L51.4175 10.546H48.407ZM45.874 2.75571L44.5697 6.68925H47.1783L45.874 2.75571Z"
        fill="white"
      />
      <path
        d="M54.7514 10.546V2.44336H51.8635V0.0927734H60.2818V2.44336H57.4122V10.546H54.7514Z"
        fill="white"
      />
      <path
        d="M62.781 10.546V0.0927734H70.3462V2.44336H65.4393V4.0713H70.2262V6.42454H65.4393V8.20601H70.3358V10.5566L62.781 10.546Z"
        fill="white"
      />
      <path
        d="M0.404541 31.897V18.0767H5.77584C10.0437 18.0767 13.0045 20.8322 13.0045 24.9749C13.0045 29.1599 10.0437 31.897 5.79671 31.897H0.404541ZM10.0437 24.9749C10.0437 22.5502 8.57498 20.6655 5.79671 20.6655H3.30541V29.3055H5.77584C8.47063 29.3055 10.0437 27.3387 10.0437 24.9749Z"
        fill="white"
      />
      <path
        d="M20.7236 31.8971V30.8383C20.0479 31.6668 18.8845 32.1433 17.5932 32.1433C16.0279 32.1433 14.1836 31.0659 14.1836 28.8265C14.1836 26.4653 16.0097 25.5944 17.5932 25.5944C18.921 25.5944 20.0636 26.0286 20.7236 26.8174V25.5547C20.7236 24.5409 19.8653 23.8765 18.5584 23.8765C17.4979 23.8877 16.4821 24.3112 15.7201 25.0597L14.7001 23.2068C15.8913 22.1525 17.4268 21.5863 19.0071 21.6186C21.274 21.6186 23.3375 22.5291 23.3375 25.4091V31.8971H20.7236ZM20.7236 29.4936V28.2494C20.2932 27.6697 19.4766 27.3574 18.6366 27.3574C17.6166 27.3574 16.7792 27.9186 16.7792 28.8715C16.7792 29.8244 17.6166 30.3618 18.6366 30.3618C19.4766 30.3618 20.2932 30.0733 20.7236 29.4936Z"
        fill="white"
      />
      <path
        d="M26.2148 29.3825V24.189H24.5818V21.8887H26.2148V19.1543H28.8105V21.8887H30.8114V24.189H28.8105V28.689C28.8105 29.3322 29.1366 29.8087 29.7079 29.8087C30.0347 29.8233 30.355 29.7128 30.6053 29.499L31.1583 31.5081C30.7696 31.8602 30.0757 32.1514 28.9931 32.1514C27.1748 32.1461 26.2148 31.1931 26.2148 29.3825Z"
        fill="white"
      />
      <path
        d="M38.3036 31.8971V30.8382C37.6305 31.6668 36.4775 32.1432 35.1732 32.1432C33.6079 32.1432 31.761 31.0659 31.761 28.8265C31.761 26.4653 33.6001 25.5944 35.1732 25.5944C36.4984 25.5944 37.6436 26.0285 38.3036 26.8174V25.5547C38.3036 24.5409 37.4453 23.8765 36.1384 23.8765C35.078 23.8882 34.0624 24.3116 33.3001 25.0597L32.2801 23.2068C33.4725 22.1527 35.0086 21.5866 36.5897 21.6185C38.8566 21.6185 40.9175 22.5291 40.9175 25.4091V31.8971H38.3036ZM38.3036 29.4935V28.2494C37.8758 27.6697 37.0592 27.3574 36.2166 27.3574C35.194 27.3574 34.3566 27.9185 34.3566 28.8715C34.3566 29.8244 35.194 30.3618 36.2166 30.3618C37.0592 30.3618 37.8758 30.0732 38.3036 29.4935Z"
        fill="white"
      />
      <path
        d="M47.022 29.9489L48.6159 27.6486C49.1742 28.244 49.846 28.718 50.5904 29.042C51.3348 29.366 52.1363 29.5331 52.9463 29.5333C54.5585 29.5333 55.315 28.808 55.315 28.0006C55.3046 25.5971 47.4785 27.2647 47.4785 22.0739C47.4785 19.7736 49.4376 17.8677 52.6437 17.8677C54.8089 17.8677 56.6063 18.5321 57.9524 19.7947L56.348 21.9918C55.2592 21.004 53.8459 20.4649 52.3854 20.4803C51.162 20.4803 50.4681 21.0097 50.4681 21.8462C50.4681 24.0221 58.2941 22.5503 58.2941 27.7121C58.2941 30.24 56.4967 32.1459 52.842 32.1459C50.1889 32.1459 48.3107 31.2539 47.022 29.9489Z"
        fill="white"
      />
      <path
        d="M59.7236 33.451C59.9833 33.5569 60.2603 33.6126 60.5402 33.6151C61.2158 33.6151 61.6645 33.4298 61.9097 32.8898L62.2775 32.0216L58.2732 21.8887H61.0436L63.6158 28.8504L66.2115 21.8887H68.9871L64.3515 33.5357C63.6158 35.4231 62.3088 35.9181 60.6158 35.9604C60.1882 35.9558 59.7626 35.8998 59.348 35.7937L59.7236 33.451Z"
        fill="white"
      />
      <path
        d="M76.6122 31.8972V25.846C76.6122 24.4589 75.8974 23.993 74.7861 23.993C74.3515 24.0019 73.9244 24.1103 73.5368 24.3101C73.1492 24.51 72.8112 24.7961 72.5479 25.1472V31.8972H69.9548V21.8886H72.5479V23.1725C72.9844 22.6849 73.5175 22.2964 74.1123 22.0323C74.707 21.7681 75.35 21.6344 75.9992 21.6398C78.1853 21.6398 79.2261 22.8839 79.2261 24.8163V31.8839L76.6122 31.8972Z"
        fill="white"
      />
      <path
        d="M80.9401 26.8809C80.9401 23.8156 83.1444 21.6397 86.1574 21.6397C88.1792 21.6397 89.4053 22.5318 90.0574 23.4424L88.3618 25.0597C88.1345 24.7133 87.823 24.4322 87.4575 24.2435C87.0919 24.0548 86.6846 23.9649 86.2748 23.9824C84.7096 23.9824 83.5983 25.1418 83.5983 26.8941C83.5983 28.6465 84.7018 29.8059 86.2748 29.8059C86.6855 29.8148 87.0919 29.7189 87.4565 29.527C87.8212 29.335 88.1325 29.0532 88.3618 28.7074L90.0574 30.3247C89.4053 31.2353 88.1792 32.1485 86.1574 32.1485C83.1444 32.1459 80.9401 29.97 80.9401 26.8809Z"
        fill="white"
      />
    </g>
  </svg>
)

const elevateLogoInverse = (
  <svg
    width="91"
    height="36"
    viewBox="0 0 91 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M-0.177261 10.5509V0.10437H7.48102V2.45344H2.5157V4.08033H7.37256V6.43205H2.5157V8.21237H7.48102V10.5614L-0.177261 10.5509Z"
      fill="#0097D3"
    />
    <path
      d="M10.251 10.5509V0.10437H12.9466V8.21237H17.1447V10.5614L10.251 10.5509Z"
      fill="#0097D3"
    />
    <path
      d="M19.7739 10.5509V0.10437H27.4322V2.45344H22.4669V4.08033H27.3211V6.43205H22.4669V8.21237H27.4322V10.5614L19.7739 10.5509Z"
      fill="#0097D3"
    />
    <path
      d="M33.0667 10.5509L29.1357 0.10437H32.1911L34.7756 7.63568L37.3442 0.10437H40.397L36.466 10.5509H33.0667Z"
      fill="#0097D3"
    />
    <path
      d="M48.8223 10.5509L48.2932 9.04565H44.177L43.6612 10.5509H40.6138L44.5448 0.10437H47.944L51.875 10.5509H48.8223ZM46.2536 2.76559L44.931 6.69658H47.5763L46.2536 2.76559Z"
      fill="#0097D3"
    />
    <path
      d="M55.256 10.5509V2.45344H52.3276V0.10437H60.8642V2.45344H57.9543V10.5509H55.256Z"
      fill="#0097D3"
    />
    <path
      d="M63.3984 10.5509V0.10437H71.0699V2.45344H66.094V4.08033H70.9482V6.43205H66.094V8.21237H71.0593V10.5614L63.3984 10.5509Z"
      fill="#0097D3"
    />
    <path
      d="M0.145493 31.8879V18.0765H5.59227C9.92006 18.0765 12.9225 20.8303 12.9225 24.9703C12.9225 29.1526 9.92006 31.8879 5.61343 31.8879H0.145493ZM9.92006 24.9703C9.92006 22.5472 8.43073 20.6637 5.61343 20.6637H3.08712V29.2981H5.59227C8.32491 29.2981 9.92006 27.3326 9.92006 24.9703Z"
      fill="#143D50"
    />
    <path
      d="M20.75 31.8878V30.8297C20.0649 31.6577 18.8851 32.1338 17.5756 32.1338C15.9884 32.1338 14.1181 31.0572 14.1181 28.8192C14.1181 26.4596 15.9699 25.5892 17.5756 25.5892C18.9221 25.5892 20.0808 26.0231 20.75 26.8114V25.5496C20.75 24.5364 19.8797 23.8724 18.5544 23.8724C17.479 23.8836 16.4489 24.3068 15.6763 25.0549L14.6419 23.2031C15.8498 22.1495 17.4069 21.5837 19.0094 21.6159C21.3082 21.6159 23.4007 22.5259 23.4007 25.4041V31.8878H20.75ZM20.75 29.4858V28.2425C20.3136 27.6632 19.4856 27.351 18.6338 27.351C17.5994 27.351 16.7503 27.9119 16.7503 28.8642C16.7503 29.8165 17.5994 30.3535 18.6338 30.3535C19.4856 30.3535 20.3136 30.0652 20.75 29.4858Z"
      fill="#143D50"
    />
    <path
      d="M26.3186 29.3748V24.1847H24.6626V21.8858H26.3186V19.1532H28.9507V21.8858H30.9797V24.1847H28.9507V28.6817C28.9507 29.3246 29.2814 29.8007 29.8607 29.8007C30.1921 29.8153 30.5169 29.7049 30.7707 29.4912L31.3315 31.499C30.9373 31.8509 30.2337 32.1419 29.1359 32.1419C27.2921 32.1366 26.3186 31.1842 26.3186 29.3748Z"
      fill="#143D50"
    />
    <path
      d="M38.5769 31.8878V30.8297C37.8944 31.6576 36.7252 32.1338 35.4025 32.1338C33.8153 32.1338 31.9424 31.0572 31.9424 28.8192C31.9424 26.4595 33.8073 25.5892 35.4025 25.5892C36.7463 25.5892 37.9076 26.0231 38.5769 26.8114V25.5495C38.5769 24.5364 37.7066 23.8724 36.3813 23.8724C35.306 23.8841 34.2761 24.3073 33.5031 25.0549L32.4688 23.2031C33.6779 22.1498 35.2357 21.584 36.8389 21.6159C39.1377 21.6159 41.2275 22.5259 41.2275 25.404V31.8878H38.5769ZM38.5769 29.4858V28.2425C38.1431 27.6632 37.3151 27.351 36.4606 27.351C35.4236 27.351 34.5745 27.9118 34.5745 28.8642C34.5745 29.8165 35.4236 30.3535 36.4606 30.3535C37.3151 30.3535 38.1431 30.0651 38.5769 29.4858Z"
      fill="#143D50"
    />
    <path
      d="M47.418 29.9409L49.0343 27.6421C49.6005 28.2371 50.2817 28.7109 51.0365 29.0347C51.7914 29.3584 52.6042 29.5255 53.4255 29.5256C55.0604 29.5256 55.8275 28.8008 55.8275 27.9939C55.8169 25.592 47.8809 27.2585 47.8809 22.071C47.8809 19.7722 49.8675 17.8676 53.1187 17.8676C55.3143 17.8676 57.137 18.5315 58.502 19.7934L56.8751 21.989C55.771 21.0019 54.3378 20.4631 52.8568 20.4785C51.6161 20.4785 50.9125 21.0076 50.9125 21.8435C50.9125 24.018 58.8485 22.5472 58.8485 27.7056C58.8485 30.2319 57.0259 32.1366 53.3197 32.1366C50.6294 32.1366 48.7248 31.2451 47.418 29.9409Z"
      fill="#143D50"
    />
    <path
      d="M60.2979 33.441C60.5613 33.5468 60.8421 33.6025 61.1259 33.605C61.8111 33.605 62.2661 33.4198 62.5147 32.8802L62.8877 32.0125L58.8271 21.8861H61.6365L64.2448 28.8434L66.8769 21.8861H69.6916L64.9908 33.5256C64.2448 35.4118 62.9195 35.9065 61.2027 35.9488C60.769 35.9441 60.3375 35.8882 59.917 35.7821L60.2979 33.441Z"
      fill="#143D50"
    />
    <path
      d="M77.4242 31.888V25.8407C77.4242 24.4545 76.6994 23.989 75.5725 23.989C75.1317 23.9978 74.6987 24.1061 74.3056 24.3058C73.9126 24.5055 73.5698 24.7915 73.3028 25.1423V31.888H70.6733V21.8859H73.3028V23.1689C73.7455 22.6817 74.2861 22.2934 74.8892 22.0294C75.4923 21.7655 76.1443 21.6319 76.8026 21.6372C79.0194 21.6372 80.0749 22.8806 80.0749 24.8117V31.8747L77.4242 31.888Z"
      fill="#143D50"
    />
    <path
      d="M81.8125 26.8749C81.8125 23.8116 84.0478 21.6371 87.1032 21.6371C89.1533 21.6371 90.3966 22.5286 91.058 23.4386L89.3385 25.0549C89.108 24.7087 88.7921 24.4278 88.4214 24.2392C88.0508 24.0506 87.6377 23.9607 87.2222 23.9782C85.635 23.9782 84.5081 25.1369 84.5081 26.8881C84.5081 28.6393 85.6271 29.798 87.2222 29.798C87.6387 29.8069 88.0507 29.7111 88.4205 29.5192C88.7903 29.3274 89.1059 29.0458 89.3385 28.7002L91.058 30.3165C90.3966 31.2265 89.1533 32.1391 87.1032 32.1391C84.0478 32.1365 81.8125 29.962 81.8125 26.8749Z"
      fill="#143D50"
    />
  </svg>
)

const elevateIcon = (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M17.2933 31.0827C15.1594 30.574 13.2178 29.4599 11.7019 27.8743C10.1859 26.2887 9.16013 24.2991 8.7478 22.1445C8.33547 19.9899 8.55415 17.7621 9.37754 15.7288C10.2009 13.6955 11.594 11.9433 13.3893 10.6827L13.0666 13.9707L14.4 14.0987L14.912 8.8L9.59997 8.26666L9.47198 9.6L12.232 9.86666C9.9706 11.5897 8.35089 14.0199 7.63086 16.7701C6.91083 19.5204 7.1319 22.4326 8.25887 25.0426C9.38584 27.6527 11.3539 29.8105 13.8494 31.1724C16.345 32.5343 19.2245 33.0218 22.0293 32.5573L21.8106 31.2427C20.3095 31.4942 18.7729 31.4398 17.2933 31.0827Z"
      fill="white"
    />
    <path
      d="M30.8027 13.3335C29.4769 11.1761 27.5381 9.46282 25.2339 8.41261C22.9297 7.36241 20.3648 7.02291 17.8667 7.43748L18.0854 8.75215C20.6006 8.33221 23.184 8.76789 25.4223 9.98951C27.6607 11.2111 29.4247 13.1481 30.4323 15.4907C31.4398 17.8332 31.6327 20.446 30.98 22.911C30.3273 25.3761 28.8668 27.5511 26.832 29.0882L27.0987 26.3362L25.7654 26.2081L25.3094 30.9015L30.0027 31.3575L30.1307 30.0241L28.0374 29.8215C30.4138 27.872 32.0034 25.1275 32.5118 22.096C33.0202 19.0646 32.4131 15.9516 30.8027 13.3335Z"
      fill="white"
    />
    <path
      d="M26.7973 21.0347C26.7966 20.4238 26.5537 19.8382 26.1217 19.4063C25.6898 18.9743 25.1042 18.7314 24.4933 18.7307H24.376C24.3739 17.6701 23.9768 16.6484 23.2623 15.8647C22.5478 15.081 21.567 14.5915 20.5112 14.4916C19.4554 14.3917 18.4002 14.6886 17.5514 15.3244C16.7026 15.9602 16.121 16.8893 15.92 17.9307H15.808C15.0909 17.9307 14.4031 18.2155 13.896 18.7226C13.3889 19.2297 13.104 19.9175 13.104 20.6347C13.104 21.3518 13.3889 22.0396 13.896 22.5467C14.4031 23.0538 15.0909 23.3387 15.808 23.3387H24.4933C25.1044 23.3387 25.6904 23.0959 26.1225 22.6638C26.5546 22.2317 26.7973 21.6457 26.7973 21.0347ZM24.4933 22.0053H15.808C15.4445 22.0053 15.0958 21.8609 14.8388 21.6039C14.5817 21.3468 14.4373 20.9982 14.4373 20.6347C14.4373 20.2711 14.5817 19.9225 14.8388 19.6654C15.0958 19.4084 15.4445 19.264 15.808 19.264H17.1227L17.1627 18.64C17.1878 17.8599 17.5217 17.1217 18.0911 16.5879C18.6605 16.054 19.4186 15.7682 20.1987 15.7933C20.9788 15.8184 21.7169 16.1524 22.2508 16.7218C22.7846 17.2911 23.0704 18.0492 23.0453 18.8293V19.0587C23.0453 19.152 23.0453 19.2453 23.0293 19.3253L22.9627 20.0533H24.4933C24.7508 20.0533 24.9977 20.1556 25.1797 20.3376C25.3617 20.5197 25.464 20.7666 25.464 21.024C25.464 21.2814 25.3617 21.5283 25.1797 21.7104C24.9977 21.8924 24.7508 21.9947 24.4933 21.9947V22.0053Z"
      fill="white"
    />
  </svg>
)

render(<PlaygroundExample />)
```

### Responsive layout

TopNavBar is a responsive component, and it has 4 "sections" or "blocks".

The `<TopNavBar.Layout>` component has a `smallViewportConfig` prop that handles how the mobile viewport is set up.

#### Main blocks

##### TopNavBar.Brand

`<TopNavBar.Brand>` contains the brand logo and icon.

Use the brand logo over the primary brand color.

```js
---
type: example
---
<div>
  <View as="div" margin="medium 0">
    <TopNavBar>
      {() => (
        <TopNavBar.Layout
          navLabel="Example navigation bar"
          smallViewportConfig={{
            dropdownMenuToggleButtonLabel: 'Toggle Menu',
            dropdownMenuLabel: 'Main Menu',
          }}
          renderBrand={(
            <TopNavBar.Brand
              screenReaderLabel="Brand name"
              renderIcon={(
                <IconBoldLine
                  size="small"
                  color="primary-inverse"
                  height="2.5rem"
                  width="2.5rem"
                />
              )}
              iconBackground="#0097D3"
              href="/#TopNavBar"
            />
          )}
        />
      )}
    </TopNavBar>
  </View>

  <View as="div" margin="medium 0">
    <TopNavBar>
      {() => (
        <TopNavBar.Layout
          navLabel="Example navigation bar"
          smallViewportConfig={{
            dropdownMenuToggleButtonLabel: 'Toggle Menu',
            dropdownMenuLabel: 'Main Menu',
          }}
          renderBrand={(
            <TopNavBar.Brand
              screenReaderLabel="Brand name"
              href="/#TopNavBar"
            />
          )}
        />
      )}
    </TopNavBar>
  </View>
</div>
```

##### TopNavBar.Breadcrumb

`<TopNavBar.Breadcrumb>` contains a `<Breadcrumb>` component with multiple links and a hamburger icon.

In order to use `<TopNavBar.Breadcrumb>` in desktop mode, the following conditions must be met:

1. `inverseColor` should be set to `true` on `<TopNavBar>`.
2. `renderBrand` property should **not** be set on `<TopNavBar.Layout>`.
3. `renderMenuItems` property should **not** be set `<TopNavBar.Layout>`.
4. `renderBreadcrumb` property should be implemented on `<TopNavBar.Layout>`.
5. (optional) an `onClick` property can be passed to `<TopNavBar.Breadcrumb>` to handle the click event on the hamburger icon.

In small viewport mode, a link is shown for the last but one element of the `<Breadcrumb>` instead of all the crumbs and the hamburger icon. One has to set the following:

1. `inverseColor` should be set to `true` on `<TopNavBar>`.
2. `renderBreadcrumb` property should be implemented on `<TopNavBar.Layout>`.
3. rest of the props starting with render should not be added.

```js
---
type: example
---
  <div>
    <View as="div" margin="medium 0">
      <TopNavBar inverseColor>
        {() => (
          <TopNavBar.Layout
            navLabel="Example navigation bar"
            smallViewportConfig={{
              dropdownMenuToggleButtonLabel: 'Toggle Menu',
              dropdownMenuLabel: 'Main Menu',
            }}
            renderBreadcrumb={(
              <TopNavBar.Breadcrumb onClick={console.log("Hamburger icon clicked.")}>
                <Breadcrumb label="You are here:">
                  <Breadcrumb.Link href="#">Course page 1</Breadcrumb.Link>
                  <Breadcrumb.Link href="#">Course page 2</Breadcrumb.Link>
                  <Breadcrumb.Link href="#">Course page 3</Breadcrumb.Link>
                  <Breadcrumb.Link href="#">Course page 4</Breadcrumb.Link>
                  <Breadcrumb.Link>Course page 5</Breadcrumb.Link>
                </Breadcrumb>
              </TopNavBar.Breadcrumb>
            )}
          />
        )}
      </TopNavBar>
    </View>
  </div>
```

##### TopNavBar.MenuItems

`<TopNavBar.MenuItems>` contains the main menu items, subpage links.

If there is not enough space to display all items, the list is truncated, and the hidden items are available under a dropdown menu.

When a menu item has multiple levels, a submenu can be rendered by passing a [Drilldown](#Drilldown) navigation via it's `renderSubmenu` prop. If a more specialized dropdown is needed, it can be configured by the `customPopoverConfig` prop (see the [Dropdowns](/#TopNavBar/#items-dropdowns) section).

The current page is highlighted, if it's id is passed via the `currentPageId` prop. (Note that it doesn't highlight items in submenus, but it highlights items hidden in truncated lists.)

```js
---
type: example
---
<div>
  <View as="div" margin="medium 0">
    <TopNavBar breakpoint="10rem">
      {() => (
        <TopNavBar.Layout
          navLabel="Example navigation bar"
          smallViewportConfig={{
            dropdownMenuToggleButtonLabel: 'Toggle Menu',
            dropdownMenuLabel: 'Main Menu',
          }}
          renderMenuItems={(
            <TopNavBar.MenuItems
              listLabel="Page navigation"
              currentPageId="menuItems1Page2"
              renderHiddenItemsMenuTriggerLabel={(
                hiddenChildrenCount
              ) => `${hiddenChildrenCount} More`}
            >
              {Array.from(Array(4)).map((_item, idx) => (
                <TopNavBar.Item
                  id={`menuItems1Page${idx + 1}`}
                  key={`menuItems1Page${idx + 1}`}
                  href={idx === 2 ? undefined : "/#TopNavBar"}
                  renderSubmenu={idx === 2 ? (
                    <Drilldown rootPageId="root">
                      <Drilldown.Page id="root">
                        {Array.from(Array(4)).map((_item, idx) => (
                          <Drilldown.Option
                            id={`option${idx + 1}`}
                            key={`option${idx + 1}`}
                            href="/#TopNavBar"
                          >
                            Option {idx + 1}
                          </Drilldown.Option>
                        ))}
                      </Drilldown.Page>
                    </Drilldown>
                  ) : undefined}
                >
                  Page {idx + 1}
                </TopNavBar.Item>
              ))}
            </TopNavBar.MenuItems>
          )}
        />
      )}
    </TopNavBar>
  </View>

  <View as="div" margin="medium 0">
    <TopNavBar breakpoint="10rem">
      {() => (
        <TopNavBar.Layout
          navLabel="Example navigation bar"
          smallViewportConfig={{
            dropdownMenuToggleButtonLabel: 'Toggle Menu',
            dropdownMenuLabel: 'Main Menu',
          }}
          renderMenuItems={(
            <TopNavBar.MenuItems
              listLabel="Page navigation"
              currentPageId="menuItems2Page11"
              renderHiddenItemsMenuTriggerLabel={(
                hiddenChildrenCount
              ) => `${hiddenChildrenCount} More`}
            >
              {Array.from(Array(14)).map((_item, idx) => (
                <TopNavBar.Item
                  id={`menuItems2Page${idx + 1}`}
                  key={`menuItems2Page${idx + 1}`}
                  href={idx === 2 || idx === 6 ? undefined : "/#TopNavBar"}
                  renderSubmenu={idx === 2 ? (
                    <Drilldown rootPageId="root">
                      <Drilldown.Page id="root">
                        {Array.from(Array(4)).map((_item, idx) => (
                          <Drilldown.Option
                            id={`option${idx + 1}`}
                            key={`option${idx + 1}`}
                            href="/#TopNavBar"
                          >
                            Option {idx + 1}
                          </Drilldown.Option>
                        ))}
                      </Drilldown.Page>
                    </Drilldown>
                  ) : undefined}
                  customPopoverConfig={idx === 6 ? {
                    children: (
                      <View padding="medium" as="div">
                        Example Custom Popover
                      </View>
                    ),
                    on: 'click'
                  }: undefined}
                >
                  Page {idx + 1}
                </TopNavBar.Item>
              ))}
            </TopNavBar.MenuItems>
          )}
        />
      )}
    </TopNavBar>
  </View>
</div>
```

##### TopNavBar.ActionItems

`<TopNavBar.ActionItems>` contains items that do some action or have special function.

Action items can have submenus and popovers too. It is also recommended to add helpful tooltips to items that are "icon" variants.

**Special case:** The "Search" action should open in a flyout on desktop. On the mobile/tablet view it should fill the header (see the [Playground](/#TopNavBar/#playground) example).

```js
---
type: example
---
<div>
  <View as="div" margin="medium 0">
    <TopNavBar>
      {() => (
        <TopNavBar.Layout
          navLabel="Example navigation bar"
          smallViewportConfig={{
            dropdownMenuToggleButtonLabel: 'Toggle Menu',
            dropdownMenuLabel: 'Main Menu',
          }}
          renderActionItems={(
            <TopNavBar.ActionItems
              listLabel="Actions"
              renderHiddenItemsMenuTriggerLabel={(
                hiddenChildrenCount
              ) => `${hiddenChildrenCount} more actions`}
            >
              <TopNavBar.Item
                id="AlertsAction1"
                variant="icon"
                tooltip="Alerts"
                renderIcon={<IconAlertsLine />}
                onClick={() => {
                  console.log('Alerts')
                }}
              >
                Alerts
              </TopNavBar.Item>
              <TopNavBar.Item
                id="SearchAction"
                variant="icon"
                tooltip="Search"
                renderIcon={<IconSearchLine />}
                customPopoverConfig={{
                  on: 'click',
                  children: (
                    <View as="div" padding="x-small">
                      <TextInput
                        id="searchInput"
                        width="100%"
                        display="block"
                        renderLabel={<ScreenReaderContent>Search</ScreenReaderContent>}
                        renderBeforeInput={() => <IconSearchLine inline={false} />}
                        placeholder="Search..."
                        onChange={(_event, value) => {
                          console.log(value)
                        }}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter') {
                            event.preventDefault()
                            event.stopPropagation()

                            console.log(`Search input submitted.`)
                          }
                        }}
                      />
                    </View>
                  )
                }}
              >
                Search
              </TopNavBar.Item>
              <TopNavBar.Item
                id="ForumAction1"
                renderIcon={<IconDiscussionLine />}
                onClick={() => {
                  console.log('Forum')
                }}
              >
                Forum
              </TopNavBar.Item>
              <TopNavBar.Item
                id="InfoAction1"
                variant="icon"
                tooltip="Info"
                renderIcon={<IconQuestionLine />}
                href="/#TopNavBar"
              >
                Info
              </TopNavBar.Item>
            </TopNavBar.ActionItems>
          )}
          renderUser={(
            <TopNavBar.User>
              <TopNavBar.Item
                id="LogInRegisterButton1"
                href="/#TopNavBar"
                variant="button"
              >
                Log In/Register
              </TopNavBar.Item>
            </TopNavBar.User>
          )}
        />
      )}
    </TopNavBar>
  </View>
</div>
```

##### TopNavBar.User

`<TopNavBar.User>` contains the login/register button and user menu.

```js
---
type: example
---
<div>
  <View as="div" margin="medium 0">
    <TopNavBar breakpoint="10rem">
      {() => (
        <TopNavBar.Layout
          navLabel="Example navigation bar"
          smallViewportConfig={{
            dropdownMenuToggleButtonLabel: 'Toggle Menu',
            dropdownMenuLabel: 'Main Menu',
          }}
          renderUser={(
            <TopNavBar.User>
              <TopNavBar.Item
                id="LogInRegisterButton3"
                href="/#TopNavBar"
              >
                Log In/Register
              </TopNavBar.Item>
            </TopNavBar.User>
          )}
        />
      )}
    </TopNavBar>
  </View>

  <View as="div" margin="medium 0">
    <TopNavBar breakpoint="10rem">
      {() => (
        <TopNavBar.Layout
          navLabel="Example navigation bar"
          smallViewportConfig={{
            dropdownMenuToggleButtonLabel: 'Toggle Menu',
            dropdownMenuLabel: 'Main Menu',
          }}
          renderUser={(
            <TopNavBar.User>
              <TopNavBar.Item
                id="LogInRegisterButton4"
                href="/#TopNavBar"
                variant="button"
              >
                Log In/Register
              </TopNavBar.Item>
            </TopNavBar.User>
          )}
        />
      )}
    </TopNavBar>
  </View>

  <View as="div" margin="medium 0">
    <TopNavBar breakpoint="10rem">
      {() => (
        <TopNavBar.Layout
          navLabel="Example navigation bar"
          smallViewportConfig={{
            dropdownMenuToggleButtonLabel: 'Toggle Menu',
            dropdownMenuLabel: 'Main Menu',
          }}
          renderUser={(
            <TopNavBar.User>
              <TopNavBar.Item
                id="UserMenu1"
                renderSubmenu={(
                  <Drilldown rootPageId="root">
                    <Drilldown.Page id="root">
                      {Array.from(Array(4)).map((_item, idx) => (
                        <Drilldown.Option
                          id={`userOption${idx + 1}`}
                          key={`userOption${idx + 1}`}
                          href="/#TopNavBar"
                        >
                          User Menu Option {idx + 1}
                        </Drilldown.Option>
                      ))}
                    </Drilldown.Page>
                  </Drilldown>
                )}
              >
                User Name
              </TopNavBar.Item>
            </TopNavBar.User>
          )}
        />
      )}
    </TopNavBar>
  </View>

  <View as="div" margin="medium 0">
    <TopNavBar breakpoint="10rem">
      {() => (
        <TopNavBar.Layout
          navLabel="Example navigation bar"
          smallViewportConfig={{
            dropdownMenuToggleButtonLabel: 'Toggle Menu',
            dropdownMenuLabel: 'Main Menu',
          }}
          renderUser={(
            <TopNavBar.User>
              <TopNavBar.Item
                id="UserMenu2"
                renderAvatar={{ avatarName: 'User Name', avatarSrc: avatarSquare }}
                renderSubmenu={(
                  <Drilldown rootPageId="root">
                    <Drilldown.Page id="root">
                      {Array.from(Array(4)).map((_item, idx) => (
                        <Drilldown.Option
                          id={`userOption${idx + 1}`}
                          key={`userOption${idx + 1}`}
                          href="/#TopNavBar"
                        >
                          User Menu Option {idx + 1}
                        </Drilldown.Option>
                      ))}
                    </Drilldown.Page>
                  </Drilldown>
                )}
              >
                User Name
              </TopNavBar.Item>
            </TopNavBar.User>
          )}
        />
      )}
    </TopNavBar>
  </View>

  <View as="div" margin="medium 0">
    <TopNavBar breakpoint="10rem">
      {() => (
        <TopNavBar.Layout
          navLabel="Example navigation bar"
          smallViewportConfig={{
            dropdownMenuToggleButtonLabel: 'Toggle Menu',
            dropdownMenuLabel: 'Main Menu',
          }}
          renderUser={(
            <TopNavBar.User>
              <TopNavBar.Item
                id="UserMenu3"
                variant="avatar"
                renderAvatar={{ avatarName: 'User Name', avatarSrc: avatarSquare }}
                onClick={() => {
                  console.log('User action')
                }}
              >
                User Name
              </TopNavBar.Item>
            </TopNavBar.User>
          )}
        />
      )}
    </TopNavBar>
  </View>
</div>
```

#### smallViewport mode

At the breakpoint (defined by the `breakpoint` and `mediaQueryMatch` props) it will switch between the "desktop" (fullscreen) view mode and the "smallViewport" view mode (optimized for mobile devices and smaller viewports).

The main difference between the two is that in "smallViewport" mode:

- The content of the `<TopNavBar.MenuItems>` and the `<TopNavBar.User>` blocks will be moved to a dropdown menu. The user block comes first, and there is a separator between the 2 blocks.
- The `<TopNavBar.ActionItems>` stays in place, but its items will be converted into "icon" variant items.
- The `<TopNavBar.Brand>` block will only display the brand logo.

```js
---
type: example
---
class LayoutExample extends React.Component {
  state = {
    exampleWidth: '100%',
    isSecondaryNavigation: false,
    isSmallViewportMenuOpen: false
  }

  render() {
    return (
      <View as="div">
        <View as="div" maxWidth="42rem" padding="small" background="primary">
          <FormFieldGroup description="Example settings" layout="columns">
            <Checkbox
              variant="toggle"
              value="toggleSmallViewportMode"
              label="Toggle smallViewport mode"
              checked={this.state.exampleWidth === '500px'}
              onChange={() => {
                this.setState({ exampleWidth: this.state.exampleWidth === '100%'
                  ? '500px'
                  : '100%'
                })
              }}
            />

            <Checkbox
              variant="toggle"
              value="toggleSecondaryNavigationtMode"
              label="Toggle secondary navigation mode"
              checked={this.state.isSecondaryNavigation}
              onChange={() => {
                this.setState({
                  isSecondaryNavigation: !this.state.isSecondaryNavigation
                })
              }}
            />
          </FormFieldGroup>
        </View>

        <View as="div" margin="medium 0 0" width={this.state.exampleWidth}>
          <div
            style={{
              height: '100%',
              position: 'relative',
              background: '#fff'
            }}
          >
            <TopNavBar
              breakpoint='650'
              mediaQueryMatch='element'
              inverseColor={this.state.isSecondaryNavigation}
              key={this.state.exampleWidth}
            >
              {({ currentLayout, inverseColor }) => {
                return (
                  <TopNavBar.Layout
                    navLabel={this.state.isSecondaryNavigation
                      ? 'Example secondary navigation bar'
                      : 'Example navigation bar'}
                    smallViewportConfig={{
                      trayMountNode: () => document.getElementById('menuMountNode'),
                      dropdownMenuToggleButtonLabel: 'Toggle Menu',
                      dropdownMenuLabel: 'Main Menu',
                      onDropdownMenuToggle: (isMenuOpen) => {
                        this.setState({ isSmallViewportMenuOpen: isMenuOpen })
                      },
                      alternativeTitle: inverseColor ? 'Overview' : undefined
                    }}
                    renderBrand={
                      <TopNavBar.Brand
                        screenReaderLabel="Brand name"
                        renderIcon={inverseColor ? undefined : (
                          <IconBoldLine
                            size="small"
                            color="primary-inverse"
                            height="2.5rem"
                            width="2.5rem"
                          />
                        )}
                        iconBackground="#0097D3"
                        href="/#TopNavBar"
                      />
                    }
                    renderMenuItems={
                      <TopNavBar.MenuItems
                        listLabel="Page navigation"
                        currentPageId="OverviewPage"
                        renderHiddenItemsMenuTriggerLabel={(
                          hiddenChildrenCount
                        ) => `${hiddenChildrenCount} More`}
                      >
                        <TopNavBar.Item
                          id="OverviewPage"
                          href="/#TopNavBar"
                        >
                          Overview
                        </TopNavBar.Item>
                        <TopNavBar.Item
                          id="AdminPage"
                          href="/#TopNavBar"
                        >
                          Admin
                        </TopNavBar.Item>
                        <TopNavBar.Item
                          id="SettingsPage"
                          href="/#TopNavBar"
                        >
                          Settings
                        </TopNavBar.Item>
                        <TopNavBar.Item
                          id="MapsPage"
                          href="/#TopNavBar"
                        >
                          Maps
                        </TopNavBar.Item>
                        <TopNavBar.Item
                          id="AssessmentsPage"
                          href="/#TopNavBar"
                        >
                          Assessments
                        </TopNavBar.Item>
                        <TopNavBar.Item
                          id="CommunityPage"
                          href="/#TopNavBar"
                        >
                          Community
                        </TopNavBar.Item>
                      </TopNavBar.MenuItems>
                    }
                    renderActionItems={
                      <TopNavBar.ActionItems
                        listLabel="Actions"
                        renderHiddenItemsMenuTriggerLabel={(
                          hiddenChildrenCount
                        ) => `${hiddenChildrenCount} more actions`}
                      >
                        <TopNavBar.Item
                          id="InfoAction3"
                          variant="icon"
                          tooltip="Info"
                          renderIcon={<IconQuestionLine />}
                          onClick={() => {
                            console.log('Info')
                          }}
                        >
                          Info
                        </TopNavBar.Item>
                        <TopNavBar.Item
                          id="AlertsAction3"
                          variant="icon"
                          tooltip="Alerts"
                          renderIcon={<IconAlertsLine />}
                          onClick={() => {
                            console.log('Alerts')
                          }}
                        >
                          Alerts
                        </TopNavBar.Item>
                      </TopNavBar.ActionItems>
                    }
                    renderUser={
                      <TopNavBar.User>
                        <TopNavBar.Item
                          id="LogInRegisterButton5"
                          href="/#TopNavBar"
                          variant="button"
                        >
                          Log In/Register
                        </TopNavBar.Item>
                      </TopNavBar.User>
                    }
                    themeOverride={{
                      // For example demo
                      smallViewportZIndex: 9999,
                      smallViewportTrayFixTopPosition: this.state.isSecondaryNavigation
                        ? `57px`
                        : '56px'
                    }}
                  />
                )
              }}
            </TopNavBar>

            <div
              id="menuMountNode"
              style={{
                position: 'absolute',
                insetBlockStart: this.state.isSecondaryNavigation
                  ? 'calc(3.5rem + 1px)'
                  : '3.5rem',
                insetInlineStart: '0px',
                width: '100%',
                height: !this.state.isSmallViewportMenuOpen
                  ? '0'
                  : this.state.isSecondaryNavigation
                  ? 'calc(100% - 3.5rem - 1px)'
                  : 'calc(100% - 3.5rem)',

              }}
            />

            <View as="div" minHeight='10rem' padding="medium">
              <Heading as="p" level="h2" margin="medium 0">
                Page Content
              </Heading>

              <p>
                Reprehenderit magna aliquip laboris nostrud. Culpa aliqua ex laboris pariatur quis laboris ipsum culpa quis aliquip nisi veniam consectetur amet. Cillum dolore officia irure est velit.
              </p>
              <p>
                Mollit laboris anim dolor amet mollit ut in duis quis anim. Minim sit aute laborum sunt ad veniam. Labore id in enim labore culpa. Ullamco irure magna enim excepteur nulla incididunt laboris. Dolor quis duis Lorem ad. Veniam non eu nisi labore duis est quis. Laborum aute quis velit reprehenderit consequat esse qui tempor ad in et voluptate.
              </p>
              <p>
                Irure velit duis amet pariatur anim nostrud sit magna anim non do ea exercitation. Adipisicing veniam culpa do nostrud nisi. Do aliqua cupidatat ad fugiat labore ad non fugiat. Laboris et tempor sunt velit incididunt sunt enim occaecat do aliquip nulla magna.
              </p>
            </View>
          </div>

        </View>
      </View>
    )
  }
}

render(<LayoutExample />)
```

#### Secondary navigation

In case TopNavBar is used as secondary navigation (e.g. LTI tools menu in Canvas), use the inverse color version. The `inverseColor` prop displays the navbar with inverted colors.

In the smallViewport layout of the "secodary navigation" mode, don’t show the branding, instead display the current/selected page title by passing the `smallViewportConfig.alternativeTitle` prop. See the example above (toggle secondary navigation mode).

### Items

The main building block of TopNavBar is the `<TopNavBar.Item>`. The items have 4 variants, can have icons, avatars, submenus, tooltips, etc.

#### Variants

The items can display as text, button, icon only or avatar only. The text and button versions can have icons and avatars, and all variants can have submenus, popovers and tooltips.

Not all 4 variation are available in every container, e.g.: items with avatars can only be used in `<TopNavBar.User>`.

In small viewport mode, items in `<TopNavBar.User>` and `<TopNavBar.MenuItems>` will be converted to dropdown menu items ([Drilldown](#Drilldown) options), thus displaying differently (e.g.: all variants display as text options and icons are not rendered). The items in `<TopNavBar.ActionItems>` will be converted to `icon` variants (and are required to have `renderIcon` prop), and the list will get truncated when there is not enough space to display all actions.

```js
---
type: example
---

<View as="div" background="primary-inverse" padding="medium">
  <Flex wrap="wrap">
    <Flex.Item padding="small">
      <TopNavBar.Item
        id="defaultText"
      >
        Default variant
      </TopNavBar.Item>
    </Flex.Item>
    <Flex.Item padding="small">
      <TopNavBar.Item
        id="defaultIcon"
        renderIcon={<IconDiscussionLine />}
      >
        Default with icon
      </TopNavBar.Item>
    </Flex.Item>
    <Flex.Item padding="small">
      <TopNavBar.Item
        id="defaultAvatar"
        renderAvatar={{ avatarName: 'User Name', avatarSrc: avatarSquare }}
      >
        Default with avatar
      </TopNavBar.Item>
    </Flex.Item>
  </Flex>

  <Flex wrap="wrap">
    <Flex.Item padding="small">
      <TopNavBar.Item
        id="buttonText"
        variant="button"
      >
        Button variant
      </TopNavBar.Item>
    </Flex.Item>
    <Flex.Item padding="small">
      <TopNavBar.Item
        id="buttonIcon"
        variant="button"
        renderIcon={<IconDiscussionLine />}
      >
        Button with icon
      </TopNavBar.Item>
    </Flex.Item>
    <Flex.Item padding="small">
      <TopNavBar.Item
        id="buttonAvatar"
        variant="button"
        renderAvatar={{ avatarName: 'User Name', avatarSrc: avatarSquare }}
      >
        Button with avatar
      </TopNavBar.Item>
    </Flex.Item>
  </Flex>

  <Flex wrap="wrap">
    <Flex.Item padding="small">
      <TopNavBar.Item
        id="iconItem"
        variant="icon"
        renderIcon={<IconDiscussionLine />}
        tooltip="Icon variant"
      >
        Icon variant
      </TopNavBar.Item>
    </Flex.Item>
  </Flex>

  <Flex wrap="wrap">
    <Flex.Item padding="small">
      <TopNavBar.Item
        id="avatarItem"
        variant="avatar"
        renderAvatar={{ avatarName: 'User Name', avatarSrc: avatarSquare }}
        tooltip="Avatar variant"
      >
        Avatar variant
      </TopNavBar.Item>
    </Flex.Item>
  </Flex>
</View>
```

#### Dropdowns

`<TopNavBar.Item>` can display 3 type of dropdowns.

##### Submenu

The most common use case is when we want to open a submenu by clicking on the item. The `renderSubmenu` prop accepts a [Drilldown](#Drilldown) component, and the toggle logic is handled by `TopNavBar.Item`. The submenu can have multiple levels.

##### Custom Popover

If custom content needs to be displayed in the dropdown (e.g. search feature), use the `customPopoverConfig` prop. It accepts a config object of [Popover](#Popover) component props (except `renderTrigger`, since the item itself is the trigger).

**Note**: in "smallViewport" mode items in `TopNavBar.ActionItems` can display custom popovers, but since the items in `TopNavBar.MenuItems` are converted to Drilldown options, custom popovers are not recommended to use in menu items.

##### Tooltip

The `tooltip` prop can display extra information on hover/focus. Tooltips can be useful for `variant="icon"` or `variant="avatar"` type menu items where there is no visible text.

It accepts either a string or a config object containing a subset of props from [Tooltip](#Tooltip).

**Note**: items rendered as Drilldown options don't render tooltips.

```js
---
type: example
---

<div>
  <View as="div" margin="medium 0">
    <TopNavBar breakpoint="10rem">
      {() => (
        <TopNavBar.Layout
          navLabel="Example navigation bar"
          smallViewportConfig={{
            dropdownMenuToggleButtonLabel: 'Toggle Menu',
            dropdownMenuLabel: 'Main Menu',
          }}
          renderMenuItems={(
            <TopNavBar.MenuItems
             listLabel="Page navigation"
              renderHiddenItemsMenuTriggerLabel={(
                hiddenChildrenCount
              ) => `${hiddenChildrenCount} More`}
            >
              <TopNavBar.Item
                id="itemSubmenuExample"
                renderSubmenu={(
                  <Drilldown rootPageId="root">
                    <Drilldown.Page id="root">
                      <Drilldown.Option id="rootOption1" subPageId="secondPage">
                        Link One
                      </Drilldown.Option>
                      <Drilldown.Option id="rootOption2" href="/#TopNavBar">
                        Link Two
                      </Drilldown.Option>
                      <Drilldown.Option id="rootOption3" href="/#TopNavBar">
                        Link Three
                      </Drilldown.Option>
                    </Drilldown.Page>
                    <Drilldown.Page id="secondPage">
                      <Drilldown.Option id="secondPageOption1">
                        Level 2 Option One
                      </Drilldown.Option>
                      <Drilldown.Option id="secondPageOption2" href="/#TopNavBar">
                        Level 2 Option Two
                      </Drilldown.Option>
                    </Drilldown.Page>
                  </Drilldown>
                )}
              >
                Menu Item with submenu
              </TopNavBar.Item>
            </TopNavBar.MenuItems>
          )}
          renderActionItems={(
            <TopNavBar.ActionItems
             listLabel="Actions"
              renderHiddenItemsMenuTriggerLabel={(
                hiddenChildrenCount
              ) => `${hiddenChildrenCount} More`}
            >
              <TopNavBar.Item
                id="itemTooltipExample"
                variant="icon"
                tooltip={{
                  renderTip: "Settings action",
                  placement: 'bottom end',
                }}
                renderIcon={<IconSettingsLine />}
              >
                Action Item with tooltip
              </TopNavBar.Item>
              <TopNavBar.Item
                id="itemPopoverExample"
                variant="icon"
                showSubmenuChevron={false}
                tooltip="Open for Content info"
                renderIcon={<IconQuestionLine />}
                customPopoverConfig={{
                  on: 'click',
                  placement: 'bottom end',
                  shouldContainFocus: true,
                  children: (
                    <View
                      as="div"
                      padding="medium"
                      width="25rem"
                      role="dialog"
                      tabIndex={0}
                      aria-label="Contact information"
                      position="relative"
                      borderRadius="small"
                    >
                      <Heading level="h3">Contact information</Heading>
                      <p>{lorem.sentence()}</p>
                      <Button color="primary" margin="x-small 0 small">Help Center</Button>
                      <hr aria-hidden="true" />
                      <View as="div" margin="medium 0 0">
                        <Text weight="bold">
                          <div>Contact person</div>
                          <Link href="/#TopNavBar" isWithinText={false}>
                            contact.person@example.com
                          </Link>
                          <div>(801) 123-4567</div>
                        </Text>
                      </View>
                    </View>
                  )
                }}
              >
                Action Item with popover
              </TopNavBar.Item>
            </TopNavBar.ActionItems>
          )}
        />
      )}
    </TopNavBar>
  </View>
</div>
```

##### Full width dialog on small viewports

In "smallViewport" mode, due to the lack of space, some features might be rendered in a special dialog that covers the whole navbar (e.g.: search feature).

This feature is settable via the `smallViewportConfig.renderInPlaceDialogConfig` prop of `TopNavBar.Layout`, and accepts a config object. It can also trap focus.

**Note**: please make sure to set an element to return the focus to upon closing the dialog via the `returnFocusElement` prop.

```js
---
type: example
---

class InPlaceDialogExample extends React.Component {
  state = {
    isSearchOpen: false,
    searchInputValue: ''
  }

  toggleSearch(isOpen) {
    this.setState({ isSearchOpen: isOpen })
  }

  render() {
    return (
      <View as="div" margin="medium 0" maxWidth="29rem">
        <TopNavBar breakpoint="30rem" mediaQueryMatch="element">
          {({ currentLayout }) => (
            <TopNavBar.Layout
              navLabel="Example navigation bar"
              smallViewportConfig={{
                dropdownMenuToggleButtonLabel: 'Toggle Menu',
                dropdownMenuLabel: 'Main Menu',
                renderInPlaceDialogConfig: {
                  open: this.state.isSearchOpen,
                  onClose: () => {
                    this.toggleSearch(false)
                  },
                  closeButtonLabel: 'Close Search and return to Navigation',
                  returnFocusElement: () =>
                    document.getElementById('Search'),
                  shouldCloseOnEscape: true,
                  shouldCloseOnDocumentClick: false,
                  shouldContainFocus: false,
                  content: ({ closeInPlaceDialog }) => (
                    <View as="div" padding="x-small">
                      <TextInput
                        id="searchInput"
                        width="100%"
                        display="block"
                        renderLabel={<ScreenReaderContent>Search</ScreenReaderContent>}
                        renderBeforeInput={() => <IconSearchLine inline={false} />}
                        placeholder="Search..."
                        onChange={(_event, value) => {
                          this.setState({ searchInputValue: value })
                        }}
                        value={this.state.searchInputValue}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter') {
                            event.preventDefault()
                            event.stopPropagation()

                            console.log(`Search input submitted value "${this.state.searchInputValue}".`)

                            this.setState({ searchInputValue: '' })

                            if (currentLayout === 'smallViewport' && typeof closeInPlaceDialog === 'function') {
                              closeInPlaceDialog()
                            }
                          }
                        }}
                        themeOverride={(_theme, globalTheme) => ({
                          focusOutlineColor: globalTheme.colors.borderLightest
                        })}
                      />
                    </View>
                  )
                }
              }}
              renderActionItems={(
                <TopNavBar.ActionItems
                 listLabel="Actions"
                  renderHiddenItemsMenuTriggerLabel={(
                    hiddenChildrenCount
                  ) => `${hiddenChildrenCount} More`}
                >
                  <TopNavBar.Item
                    id="Search2"
                    renderIcon={<IconSearchLine />}
                    tooltip="Opens search dialog"
                    onClick={() => {
                      this.toggleSearch(true)
                    }}
                  >
                    Search
                  </TopNavBar.Item>
                </TopNavBar.ActionItems>
              )}
            />
          )}
        </TopNavBar>
      </View>
    )
  }
}

render(<InPlaceDialogExample />)

```

#### Color override example for more complex customization

There's no one-size-fits-all solution when it comes to coloring the items in `TopNavBar.Item`, or anywhere else. You have to override the instUI component that is rendered in place. In the following example we override `Text` and `BaseButton`.

```js
---
type: example
---
<InstUISettingsProvider theme={{
  componentOverrides: {
    "TopNavBar.Item": {
      activeIndicatorColorInverse: "red"
    },
    BaseButton: {
      secondaryGhostColor: "green",
      primaryColor: "yellow",
      primaryBackground:"brown"
    },
    Text:{
      primaryColor: "blue",
      brandColor:"purple"
    },
  }
}}>
  <View as="div" margin="medium 0 0" width={1000}>
    <TopNavBar
      breakpoint='650'
      mediaQueryMatch='element'
      inverseColor={true}
      key={1000}
    >
      {({ currentLayout, inverseColor }) => {
        return (
          <TopNavBar.Layout
            navLabel={true
              ? 'Example secondary navigation bar'
              : 'Example navigation bar'}
            renderBrand={
              <TopNavBar.Brand
                screenReaderLabel="Brand name"
                renderIcon={inverseColor ? undefined : (
                  <IconBoldLine
                    size="small"
                    color="primary-inverse"
                    height="2.5rem"
                    width="2.5rem"
                  />
                )}
                iconBackground="#0097D3"
                href="/#TopNavBar"
              />
            }
            renderMenuItems={
              <TopNavBar.MenuItems
                listLabel="Page navigation"
                currentPageId="OverviewPage"
                renderHiddenItemsMenuTriggerLabel={(
                  hiddenChildrenCount
                ) => `${hiddenChildrenCount} More`}
              >
                <TopNavBar.Item
                  id="OverviewPage"
                  href="/#TopNavBar"
                >
                  Overview
                </TopNavBar.Item>
                <TopNavBar.Item
                  id="AdminPage"
                  href="/#TopNavBar"
                >
                  Admin
                </TopNavBar.Item>
                <TopNavBar.Item
                  id="SettingsPage"
                  href="/#TopNavBar"
                >
                  Settings
                </TopNavBar.Item>
                <TopNavBar.Item
                  id="MapsPage"
                  href="/#TopNavBar"
                >
                  Maps
                </TopNavBar.Item>
                <TopNavBar.Item
                  id="AssessmentsPage"
                  href="/#TopNavBar"
                >
                  Assessments
                </TopNavBar.Item>
                <TopNavBar.Item
                  id="CommunityPage"
                  href="/#TopNavBar"
                >
                  Community
                </TopNavBar.Item>
              </TopNavBar.MenuItems>
            }
            renderActionItems={
              <TopNavBar.ActionItems
                listLabel="Actions"
                renderHiddenItemsMenuTriggerLabel={(
                  hiddenChildrenCount
                ) => `${hiddenChildrenCount} more actions`}
              >
                <TopNavBar.Item
                  id="InfoAction3"
                  variant="icon"
                  tooltip="Info"
                  renderIcon={<IconQuestionLine />}
                  onClick={() => {
                    console.log('Info')
                  }}
                >
                  Info
                </TopNavBar.Item>
                <TopNavBar.Item
                  id="AlertsAction3"
                  variant="icon"
                  tooltip="Alerts"
                  renderIcon={<IconAlertsLine />}
                  onClick={() => {
                    console.log('Alerts')
                  }}
                >
                  Alerts
                </TopNavBar.Item>
              </TopNavBar.ActionItems>
            }
            renderUser={
              <TopNavBar.User>
                <TopNavBar.Item
                  id="LogInRegisterButton5"
                  href="/#TopNavBar"
                  variant="button"
                >
                  Log In/Register
                </TopNavBar.Item>
              </TopNavBar.User>
            }
            themeOverride={{
              // For example demo
              smallViewportZIndex: 9999,
              smallViewportTrayFixTopPosition: true
                ? `57px`
                : '56px'
            }}
          />
        )
      }}
    </TopNavBar>
  </View>
</InstUISettingsProvider>
```
