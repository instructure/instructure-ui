---
title: Drilldown Menu
category: Patterns
id: Drilldown
---

## Drilldown Menu

This example shows an accessible implementation of a multi level menu using InstUI components. ([Popover](#Popover), [Menu](#Menu))
This component is useful when you want to display large amounts of data in a compact manner and using [Menu.SubMenu](#Menu) would be too cumbersome to use.

```js
---
render: false
example: true
---

const dataMap = {
  1: {
    id: 1,
    subAccounts: {
      accounts: [
        {
          id: 2,
          accountName: 'Sub Account 1'
        },
        {
          id: 7,
          accountName: 'Sub Account 7'
        }
      ]
    }
  },
  2: {
    id: 2,
    accountName: 'Sub Account 1',
    parentAccount: 1,
    subAccounts: {
      accounts: [
        {
          id: 3,
          accountName: 'Sub Account 2'
        },
        {
          id: 4,
          accountName: 'Sub Account 3'
        },
        {
          id: 5,
          accountName: 'Sub Account 4'
        }
      ]
    }
  },
  3: {
    id: 3,
    accountName: 'Sub Account 2',
    parentAccount: 2,
    subAccounts: {
      accounts: [
        {
          id: 6,
          accountName: 'Sub Account 5'
        }
      ]
    }
  },
  4: {
    id: 4,
    accountName: 'Sub Account 3',
    parentAccount: 2,
    subAccounts: {
      accounts: []
    }
  },
  5: {
    id: 5,
    accountName: 'Sub Account 4',
    parentAccount: 2,
    subAccounts: {
      accounts: []
    }
  },
  6: {
    id: 6,
    accountName: 'Sub Account 5',
    parentAccount: 3,
    subAccounts: {
      accounts: []
    }
  },
  7: {
    id: 7,
    accountName: 'Sub Account 7',
    parentAccount: 1,
    subAccounts: {
      accounts: []
    }
  }
}

const useResetState = (initialState) => {
  const [value, setValue] = React.useState(initialState)
  React.useEffect(() => {
    setValue(initialState)
  }, [initialState])

  return [value, setValue]
}

const Example = ({ rootId, onChange = (_id) => {}, data }) => {
  const [tempAccountId, setTempAccountId] = useResetState(data[rootId].id)
  const menuRef = React.useRef()
  const accountObj = {
    ...data[tempAccountId]
  }
  const topLevelAccounts = [accountObj]
  const hasParentAccount = accountObj?.parentAccount
  const hasChildAccounts = accountObj?.subAccounts?.accounts.length > 0
  const childAccounts = accountObj?.subAccounts?.accounts

  const setAccountId = (id) => {
    setTempAccountId(id)
    onChange(id)

    menuRef.current.focus()
  }

  const titleAccounts = topLevelAccounts.filter((a) => a.id && a.accountName)

  const renderBackNavigation = () => {
    if (hasParentAccount) {
      const parentName = data[accountObj.parentAccount].accountName

      return (
        <Menu.Item
          as="div"
          onClick={() => {
            setAccountId(accountObj.parentAccount)
          }}
        >
          <Flex as="div" justifyItems="start">
            <View margin="0 small 0 0">
              <IconArrowOpenStartLine />
            </View>
            <TruncateText>
              {parentName || 'Back'}
            </TruncateText>
          </Flex>
        </Menu.Item>
      )
    }
  }

  const renderChildList = () => {
    return childAccounts
      ?.concat()
      .sort((a, b) => {
        if (a?.accountName > b?.accountName) return 1
        if (a?.accountName < b?.accountName) return -1
        return 0
      })
      .map((a) => {
        if (data[a.id] && data[a.id]?.subAccounts?.accounts?.length) {
          return (
            <Menu.Item key={a.id} as="div" onClick={() => setAccountId(a.id)}>
              <Flex as="div" justifyItems="space-between">
                <TruncateText>{a.accountName}</TruncateText>
                <View margin="0 0 0 small">
                  <IconArrowOpenEndLine />
                </View>
              </Flex>
            </Menu.Item>
          )
        } else {
          return (
            <Menu.Item key={a.id} as="div" onClick={() => {console.log(`Selected account: ${a.accountName}`)}}>
              <TruncateText>{a.accountName}</TruncateText>
            </Menu.Item>
          )
        }
      }) || null
  }

  return (
    <View as="div">
      <Popover
        renderTrigger={
          <Tooltip
          renderTip="Select user account"
          on={['hover', 'focus']}
          placement="top"
            >
            <IconButton screenReaderLabel="Select user account">
              <IconUserLine />
            </IconButton>
          </Tooltip>
        }
        shouldRenderOffscreen={false}
        on="click"
        placement="bottom start"
        constrain="parent"
        offsetY={16}
      >
        <Menu
          menuRef={(ref) => {
            menuRef.current = ref
          }}
          themeOverride={{ minWidth: '24rem' }}
        >
          {renderBackNavigation()}
          {titleAccounts.map((a) => {
            return (
              <Menu.Item
                key={a.id}
                as="div"
                onClick={() => setAccountId(a.id)}
                themeOverride={{labelColor: '#008ee2'}}
              >
                <TruncateText>{a.accountName}</TruncateText>
              </Menu.Item>
            )
          })}
          {(hasParentAccount || titleAccounts.length) &&
            hasChildAccounts && <Menu.Separator />}
          {renderChildList()}
        </Menu>
      </Popover>
    </View>
  )
}


render(<Example rootId="1" onChange={(selectedId) => console.log(`Selected account: ${dataMap[selectedId].accountName}`)} data={dataMap}/>)
```
