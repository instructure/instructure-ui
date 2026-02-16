// @ts-nocheck
import { ComponentProps, useCallback, useState } from 'react'
import {
  InstUISettingsProvider,
  canvas,
  View,
  Text,
  Link,
  AppNav,
  ScreenReaderContent,
  Popover,
  Flex,
  Button,
  Drilldown,
  Modal,
  Heading,
  CloseButton,
  Avatar,
  withStyleLegacy as withStyle,
  IconButton,
  IconSearchLine,
  IconArrowOpenDownLine,
  IconQuestionLine,
  IconBulletListSolid,
  IconTextLine,
  IconUserLine,
  IconHamburgerLine,
  IconInfoLine,
  IconArrowOpenEndSolid
} from '@instructure/ui'
import { useMutation } from 'react-query'
import KBar from '../KBar/KBar'
import StaticSearch from '../common/components/StaticSearch'
import ApiSearch from '../common/components/ApiSearch'
import useMediaQuery from '../utils/useMediaQuery'
import { generateStyle, generateComponentTheme } from './styles'
import { apiClient } from '../api'

export type MenuItem = {
  key: string
  label: string
  href: string
  showForUsers: boolean
  showForAdmins: boolean
}
export type ItemBank = { id: string | number; name: string; item_count: number }
export type Client = {
  id: string | number
  name: string
  icon: string
  itemBanks: Array<ItemBank>
}

const defaultMenuItems: Array<MenuItem> = [
  {
    key: 'items',
    label: 'Items',
    href: '/items',
    showForUsers: true,
    showForAdmins: false
  },
  {
    key: 'tests',
    label: 'Assessments',
    href: '/tests',
    showForUsers: true,
    showForAdmins: false
  },
  {
    key: 'reports',
    label: 'Reports',
    href: '/reports',
    showForUsers: true,
    showForAdmins: false
  },
  {
    key: 'graphics_orders',
    label: 'Media',
    href: '/gfxorders',
    showForUsers: true,
    showForAdmins: false
  },
  {
    key: 'exports',
    label: 'Export',
    href: '/exports',
    showForUsers: true,
    showForAdmins: true
  },
  {
    key: 'users',
    label: 'Users',
    href: '/users',
    showForUsers: false,
    showForAdmins: true
  },
  {
    key: 'clients',
    label: 'Clients',
    href: '/clients',
    showForUsers: false,
    showForAdmins: true
  }
]

interface HeaderProps {
  user?: { id: string; name: string; email: string; avatar: string }
  isAdmin: boolean
  menuItems: Array<MenuItem>
  clients: Array<Client>
  activeMenuItem: string
  activeClient: string | number
  styles: Record<string, any>
}

const Header: React.FC<HeaderProps> = ({
  user,
  isAdmin = false,
  menuItems = defaultMenuItems,
  clients = [],
  activeMenuItem = 'dashboard',
  activeClient,
  styles
}) => {
  const menuItemsToRender = !user
    ? []
    : menuItems.filter(
        ({ showForUsers, showForAdmins }) =>
          (isAdmin && showForAdmins) || (!isAdmin && showForUsers)
      )
  const currentClient = clients.find((c) => c.id + '' === activeClient + '')

  const [visibleItemsCount, setVisibleItemsCount] = useState(
    menuItemsToRender.length
  )
  const [searchVisible, setSearchVisible] = useState(false)
  const [contextModalOpen, setContextModalOpen] = useState(false)
  const [selectedBank, setSelectedBank] = useState<ItemBank>()
  const isSmall = useMediaQuery('(max-width: 414px)')

  const { mutateAsync: switchCtx } = useMutation((bank: ItemBank) => {
    const client = clients.find((c) => c.itemBanks.includes(bank))
    return apiClient.get(`/users/context?id=${client?.id}`)
  })

  return (
    <InstUISettingsProvider
      theme={{
        componentOverrides: {
          AppNav: { borderWidth: 0 },
          'AppNav.Item': {
            fontSize: 18,
            fontWeight: 400,
            textColor: 'white',
            textColorSelected: 'white'
          }
        }
      }}
    >
      {user ? <KBar menuItems={menuItemsToRender} clients={clients} /> : null}

      <View
        background="primary"
        themeOverride={{ backgroundPrimary: canvas.colors.oxford }}
        as="div"
      >
        <View
          background="primary"
          themeOverride={{ backgroundPrimary: canvas.colors.licorice }}
          as="div"
        >
          <Flex height="24px" alignItems="center">
            <Flex.Item shouldGrow />

            {user && !isAdmin ? (
              <Flex.Item>
                <Drilldown
                  rootPageId="clients"
                  width="20em"
                  placement="bottom"
                  offsetY="5px"
                  trigger={
                    <Button
                      withBackground={false}
                      size="small"
                      themeOverride={{ borderWidth: 0 }}
                      margin="0 medium"
                    >
                      <Text
                        size="small"
                        color="primary"
                        themeOverride={{ primaryColor: canvas.colors.tiara }}
                      >
                        {currentClient?.name}
                        <View margin="0 0 0 xx-small">
                          <IconArrowOpenDownLine />
                        </View>
                      </Text>
                    </Button>
                  }
                >
                  <Drilldown.Page id="clients">
                    <Drilldown.Group
                      id="clients"
                      selectableType="single"
                      onSelect={(_event, { selectedOption: { props } }) =>
                        (window.location.href = `/users/context?id=${props.id}`)
                      }
                    >
                      {clients.map((client) => (
                        <Drilldown.Option
                          key={client.id}
                          id={client.id + ''}
                          disabled={client.id + '' === activeClient + ''}
                          defaultSelected={client.id + '' === activeClient + ''}
                        >
                          {client.name}
                        </Drilldown.Option>
                      ))}
                    </Drilldown.Group>
                  </Drilldown.Page>
                </Drilldown>
              </Flex.Item>
            ) : null}
          </Flex>
        </View>

        <AppNav
          screenReaderLabel="ItemLogic header"
          visibleItemsCount={visibleItemsCount >= 2 ? visibleItemsCount : 0}
          onUpdate={(data) => setVisibleItemsCount(data.visibleItemsCount)}
          margin="0 0 0 small"
          renderBeforeItems={
            <Flex>
              <Link
                href="/"
                themeOverride={{
                  textDecorationWithinText: 'none',
                  color: 'white',
                  hoverColor: 'white'
                }}
              >
                <Flex direction="column" as="div" padding="0 small">
                  <Text size="large" weight="normal">
                    {isSmall ? 'IL' : 'ItemLogic'}
                  </Text>
                  {isSmall ? null : (
                    <View css={styles.logoSubtitle}>
                      <Text
                        size="x-small"
                        color="primary"
                        themeOverride={{ primaryColor: canvas.colors.tiara }}
                      >
                        By Instructure
                      </Text>
                    </View>
                  )}
                </Flex>
              </Link>

              {!user || isAdmin ? null : (
                <Drilldown
                  rootPageId="banks"
                  placement="bottom"
                  offsetY="15px"
                  width="18.5rem"
                  maxHeight="26.5rem"
                  trigger={<AppNav.Item renderLabel="Banks" />}
                >
                  <Drilldown.Page id="banks">
                    {clients.map((client) => (
                      <Drilldown.Group
                        id={`banks-${client.id}`}
                        key={client.id}
                        renderGroupTitle={() => (
                          <Flex>
                            <Avatar
                              size="small"
                              src={client.icon}
                              margin="0 small 0 0"
                              name={client.name}
                            />
                            {client.name}
                          </Flex>
                        )}
                      >
                        {client.itemBanks.length ? (
                          client.itemBanks.map((bank) => (
                            <Drilldown.Option
                              id={`banks-${bank.id}`}
                              key={bank.id}
                              onOptionClick={() => {
                                if (activeClient + '' !== client.id + '') {
                                  setSelectedBank(bank)
                                  setContextModalOpen(true)
                                  return
                                }

                                window.location.href = `/banks/view/${bank.id}/items`
                              }}
                              renderLabelInfo={({ variant }) => (
                                <Text
                                  color="primary"
                                  themeOverride={{
                                    primaryColor:
                                      variant === 'highlighted'
                                        ? 'white'
                                        : canvas.colors.ash
                                  }}
                                >
                                  {bank.item_count}
                                </Text>
                              )}
                            >
                              {bank.name}
                            </Drilldown.Option>
                          ))
                        ) : (
                          <Drilldown.Option
                            id={`no-banks-${client.id}`}
                            disabled
                          >
                            No Item Banks
                          </Drilldown.Option>
                        )}
                      </Drilldown.Group>
                    ))}
                  </Drilldown.Page>
                </Drilldown>
              )}
            </Flex>
          }
          renderAfterItems={
            <View as="div" margin="0 small 0 0">
              {user ? (
                <>
                  <Popover
                    renderTrigger={
                      <IconButton
                        withBackground={false}
                        withBorder={isSmall && searchVisible}
                        screenReaderLabel="Search button"
                        color="primary-inverse"
                      >
                        <IconSearchLine size="x-small" />
                      </IconButton>
                    }
                    isShowingContent={!isSmall && searchVisible}
                    onShowContent={() => setSearchVisible((s) => !s)}
                    onHideContent={() => setSearchVisible(false)}
                    on="click"
                    screenReaderLabel="Search"
                    shouldContainFocus
                    shouldReturnFocus
                    shouldCloseOnDocumentClick
                    offsetY="15px"
                    placement="bottom end"
                  >
                    <HeaderSearch styles={styles} width="400px" />
                  </Popover>

                  <Drilldown
                    rootPageId="help"
                    width="20em"
                    placement="bottom"
                    offsetY="15px"
                    trigger={
                      <IconButton
                        withBackground={false}
                        withBorder={false}
                        screenReaderLabel="Help button"
                        color="primary-inverse"
                      >
                        <IconQuestionLine size="x-small" />
                      </IconButton>
                    }
                  >
                    <Drilldown.Page id="help">
                      <Drilldown.Option id="standards" href="/curriculums">
                        Standards browser
                      </Drilldown.Option>

                      <Drilldown.Option id="prompts" href="/prompts">
                        Prompts
                      </Drilldown.Option>

                      <Drilldown.Option
                        id="help"
                        href="https://community.canvaslms.com/t5/INT-ItemLogic/tkb-p/int_item_logic"
                      >
                        Help
                      </Drilldown.Option>
                    </Drilldown.Page>
                  </Drilldown>

                  <Drilldown
                    rootPageId="account"
                    width="20rem"
                    maxHeight="30rem"
                    offsetY="15px"
                    placement="bottom"
                    trigger={
                      <IconButton
                        withBackground={false}
                        withBorder={false}
                        screenReaderLabel="User button"
                        color="primary-inverse"
                      >
                        <IconUserLine size="x-small" />
                      </IconButton>
                    }
                  >
                    <Drilldown.Page id="account">
                      <Drilldown.Option
                        id="account-link"
                        beforeLabelContentVAlign="center"
                        afterLabelContentVAlign="center"
                        renderAfterLabel={(props) => (
                          <IconArrowOpenEndSolid
                            color={
                              props.variant?.includes('highlighted')
                                ? 'primary-inverse'
                                : 'secondary'
                            }
                          />
                        )}
                        href="/account"
                        themeOverride={{ padding: '0.75rem' }}
                      >
                        {(props) => (
                          <Flex alignItems="center" justifyItems="center">
                            <Flex.Item margin="0 small 0 0">
                              <Avatar
                                name="Profile image"
                                src={user.avatar}
                                size="small"
                              />
                            </Flex.Item>

                            <Flex.Item shouldGrow>
                              <Text as="div">{user.name}</Text>
                              <Text
                                as="div"
                                size="x-small"
                                color={
                                  props.variant?.includes('highlighted')
                                    ? 'primary-inverse'
                                    : 'secondary'
                                }
                              >
                                {user.email}
                              </Text>
                            </Flex.Item>
                          </Flex>
                        )}
                      </Drilldown.Option>

                      <Drilldown.Group id="jobs-group">
                        <Drilldown.Option id="jobs" href="/jobs">
                          Jobs Statistic
                        </Drilldown.Option>
                      </Drilldown.Group>
                      <Drilldown.Group id="logout">
                        <Drilldown.Option
                          id="logout"
                          href="/logout"
                          themeOverride={(_componentTheme, currentTheme) => {
                            return { color: currentTheme.colors.textDanger }
                          }}
                        >
                          Logout
                        </Drilldown.Option>
                      </Drilldown.Group>
                    </Drilldown.Page>
                  </Drilldown>
                </>
              ) : null}
            </View>
          }
          renderTruncateLabel={function () {
            const hiddenItemsCount =
              menuItemsToRender.length - visibleItemsCount
            if (visibleItemsCount >= 2) {
              return `${hiddenItemsCount} More`
            } else {
              return (
                <span>
                  <IconHamburgerLine size="small" inline={false} />
                  <ScreenReaderContent>{`${hiddenItemsCount} More`}</ScreenReaderContent>
                </span>
              )
            }
          }}
        >
          {menuItemsToRender.map(({ key, label, href }) => (
            <AppNav.Item
              key={key}
              renderLabel={label}
              href={href}
              isSelected={key === activeMenuItem}
            />
          ))}
        </AppNav>
      </View>

      {isSmall && searchVisible ? (
        <View
          display="block"
          background="primary"
          shadow="resting"
          borderRadius="0 0 medium medium"
        >
          <HeaderSearch styles={styles} />
        </View>
      ) : null}

      <Modal
        open={contextModalOpen}
        size="small"
        onDismiss={() => setContextModalOpen(false)}
        label="Switching the context"
        shouldCloseOnDocumentClick
      >
        <Modal.Header spacing="default">
          <CloseButton
            placement="end"
            offset="medium"
            onClick={() => setContextModalOpen(false)}
            screenReaderLabel="Close"
          />

          <Heading as="h2">Switching the context</Heading>
        </Modal.Header>

        <Modal.Body>
          <View as="p" margin="none none small">
            <Text>
              You selected a bank that belongs to{' '}
              {selectedBank
                ? clients.find((c) => c.itemBanks.includes(selectedBank))?.name
                : null}
              . By proceeding, the context will be switched as well.
            </Text>
          </View>

          <View
            background="primary"
            borderRadius="medium"
            padding="small"
            display="flex"
            themeOverride={{
              backgroundPrimary: canvas.colors.porcelain
            }}
          >
            <IconInfoLine
              size="x-small"
              color="primary"
              themeOverride={{ primaryColor: canvas.colors.ash }}
            />
            <View margin="0 0 0 small" as="span">
              <Text
                color="primary"
                themeOverride={{ primaryColor: canvas.colors.oxford }}
              >
                The active context is visible in the header.
              </Text>
            </View>
          </View>
        </Modal.Body>

        <Modal.Footer>
          <Button
            onClick={() => setContextModalOpen(false)}
            margin="0 x-small 0 0"
          >
            Cancel
          </Button>
          <Button
            onClick={async () => {
              if (selectedBank) {
                await switchCtx(selectedBank)
                window.location.href = `/banks/view/${selectedBank.id}/items`
              }
            }}
            color="primary"
            type="submit"
          >
            Proceed
          </Button>
        </Modal.Footer>
      </Modal>
    </InstUISettingsProvider>
  )
}

interface HeaderSearchProps
  extends Omit<Partial<ComponentProps<typeof StaticSearch>>, 'styles'> {
  styles: Record<string, any>
}

const HeaderSearch: React.FC<HeaderSearchProps> = ({ styles, ...rest }) => {
  return (
    <View padding="small" display="block" as="form">
      <ApiSearch
        searchUrl="/items/search.json"
        transformParams={(params) => ({ q: params.q || 'last_searches' })}
        transformOptions={(data) =>
          data.json.map((r: any) => ({
            ...r,
            id: r?.Item?.id || r?.Resource?.id,
            label: r?.Item?.title || r?.Resource?.title
          }))
        }
        renderLabel={() => <ScreenReaderContent>Search</ScreenReaderContent>}
        placeholder="Search items by ID, title..."
        optionsMaxHeight={8 * 61 + 'px'}
        renderOption={(option, isHighlighted) => (
          <HeaderSearchItem
            option={option}
            isHighlighted={isHighlighted}
            styles={styles}
          />
        )}
        {...rest}
      />
    </View>
  )
}

interface HeaderSearchItemProps {
  styles: Record<string, any>
  option: any
  isHighlighted: boolean
}

const HeaderSearchItem = React.memo<HeaderSearchItemProps>(
  ({ styles, option, isHighlighted }) => {
    const onClick = useCallback(() => {
      if (option.type === 'ITEM') {
        window.location.href = `/items/view/${option.id}`
      } else {
        window.location.href = `/banks/view/${option.Bank.id}/resources/${option.Resource.id}`
      }
    }, [option])

    return (
      <div onClick={onClick}>
        <div>
          {option.type === 'ITEM' ? (
            <IconBulletListSolid
              color="primary"
              themeOverride={{
                primaryColor: isHighlighted ? canvas.colors.electric : 'white'
              }}
            />
          ) : (
            <IconTextLine
              color="primary"
              themeOverride={{
                primaryColor: isHighlighted ? canvas.colors.electric : 'white'
              }}
            />
          )}
        </div>

        <View as="div" margin="0 0 0 small" minWidth="0px">
          <View
            as="div"
            margin="0 0 xx-small 0"
            css={styles.truncateSingleLine}
          >
            {option.label || 'Untitled Item'}
          </View>

          <div>
            <Text
              size="small"
              color="primary"
              themeOverride={{
                primaryColor: isHighlighted ? 'white' : canvas.colors.shamrock
              }}
            >
              {option.Bank.title}
            </Text>

            <Text
              size="small"
              color="primary"
              themeOverride={{
                primaryColor: isHighlighted ? 'white' : canvas.colors.ash
              }}
            >
              {' '}
              |{' '}
            </Text>

            <Text
              size="small"
              color="primary"
              themeOverride={{
                primaryColor: isHighlighted ? 'white' : canvas.colors.ash
              }}
            >
              {option.type === 'ITEM'
                ? `Item: ${option.Item.id_persistent} (v${option.Item.id_version})`
                : `Resource: ${option.Resource.id}`}
            </Text>
          </div>
        </View>
      </div>
    )
  }
)
HeaderSearchItem.displayName = 'HeaderSearchItem'

export default withStyle(generateStyle, generateComponentTheme)(Header as any)
