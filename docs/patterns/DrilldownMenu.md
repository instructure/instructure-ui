---
title: Drilldown Menu
category: Patterns
id: Drilldown
---

### Drilldown Menu

This example shows an accessible implementation of a multi level menu using InstUI components. ([Popover](#Popover), [Menu](#Menu))
This component is useful when you want to dislpay large amount of data in a compact manner and using [Menu.SubMenu](#Menu) would be too cumbersome to use.

```js
---
render: false
example: true
---

const dataMap = {
  1: {
    id: 1,
    accountName: 'Root Account 1',
    subAccounts: {
      accounts: [
        {
          id: 2,
          accountName: 'Sub Account 1'
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

  return (
    <View as="div">
      <Popover
        withArrow={false}
        renderTrigger={
          <Tooltip
          renderTip="Select user account"
          on={['hover', 'focus']}
          placement="bottom"
            >
            <IconButton screenReaderLabel="Select user account">
              <IconUserLine />
            </IconButton>
          </Tooltip>
        }
        shouldRenderOffscreen={false}
        on="click"
        placement="bottom center"
        constrain="parent"
      >
        <Menu
          menuRef={(ref) => {
            menuRef.current = ref
          }}
        >
          {accountObj && accountObj.parentAccount && (
            <Menu.Item
              as="div"
              onClick={() => {
                setAccountId(accountObj.parentAccount)
              }}
            >
              <Flex as="div" margin="0 small 0 0" justifyItems="space-between">
                <IconArrowOpenStartLine />
                <TruncateText>
                  {data[accountObj.parentAccount].accountName}
                </TruncateText>
              </Flex>
            </Menu.Item>
          )}
          {topLevelAccounts.map((a) => (
            <Menu.Item key={a.id} as="div" onClick={() => setAccountId(a.id)}>
              <div>
                <TruncateText>{a.accountName}</TruncateText>
              </div>
            </Menu.Item>
          ))}
          {(hasParentAccount || topLevelAccounts.length > 0) &&
            hasChildAccounts && <Menu.Separator />}
          {childAccounts
            ?.concat()
            .sort((a, b) => {
              if (a?.accountName > b?.accountName) return 1
              if (a?.accountName < b?.accountName) return -1
              return 0
            })
            .map((a) => (
              <Menu.Item key={a.id} as="div" onClick={() => setAccountId(a.id)}>
                <Flex as="div" justifyItems="space-between">
                  <TruncateText>{a.accountName}</TruncateText>
                  <IconArrowOpenEndLine />
                </Flex>
              </Menu.Item>
            )) || null}
        </Menu>
      </Popover>
    </View>
  )
}


render(<Example rootId="1" onChange={(selectedId) => console.log(`Selected account: ${dataMap[selectedId].accountName}`)} data={dataMap}/>)
```
