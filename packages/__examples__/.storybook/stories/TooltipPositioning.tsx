import { ApplyLocale } from '@instructure/ui-i18n'
import React from 'react'
import { Alert } from '@instructure/ui-alerts/src/Alert'
import { Avatar } from '@instructure/ui-avatar/src/Avatar'
import { Billboard } from '@instructure/ui-billboard/src/Billboard'
import { Breadcrumb } from '@instructure/ui-breadcrumb/src/Breadcrumb'
import { Button } from '@instructure/ui-buttons/src/Button'
import { Byline } from '@instructure/ui-byline/src/Byline'
import { Checkbox } from '@instructure/ui-checkbox/src/Checkbox'
import { CheckboxGroup } from '@instructure/ui-checkbox/src/CheckboxGroup'
import { CloseButton } from '@instructure/ui-buttons/src/CloseButton'
import { CondensedButton } from '@instructure/ui-buttons/src/CondensedButton'
import { ContextView } from '@instructure/ui-view/src/ContextView'
import { Editable } from '@instructure/ui-editable/src/Editable'
import { Flex } from '@instructure/ui-flex/src/Flex'
import { FormField } from '@instructure/ui-form-field/src/FormField'
import { Heading } from '@instructure/ui-heading/src/Heading'
import { IconButton } from '@instructure/ui-buttons/src/IconButton'
import {
  IconAddLine,
  Img,
  Link,
  List,
  Menu,
  Metric,
  MetricGroup,
  NumberInput,
  Pill,
  ProgressBar,
  ProgressCircle,
  RadioInput,
  RadioInputGroup,
  Rating,
  SimpleSelect,
  Spinner,
  Tag,
  Text,
  TextArea,
  TextInput,
  Tooltip,
  View
} from '@instructure/ui'

function TooltipPositioning() {
  const components = [
    'just some text',
    <a key={1} href="/">
      a
    </a>,
    <Alert key={2}>Alert</Alert>,
    <Avatar key={3} name="Avatar" />,
    <Billboard
      key={4}
      size="small"
      heading="Billboard"
      message="Billboard message"
    />,
    <Breadcrumb.Link key={5}>BreadCrumb.link</Breadcrumb.Link>,
    <Button key={6}>Button</Button>,
    <Byline key={7} description="Byline">
      <Avatar name="bb" />
    </Byline>,
    <Checkbox
      key={8}
      label="checkbox"
      value="medium"
      labelPlacement="top"
      variant="toggle"
    />,
    <CheckboxGroup
      key={9}
      name="sports"
      description="Select your favorite sports"
    >
      <Checkbox label="Football" value="football" />
      <Checkbox label="Basketball" value="basketball" />
      <Checkbox label="Other" value="other" />
    </CheckboxGroup>,
    <CloseButton
      key={10}
      placement="static"
      offset="small"
      screenReaderLabel="Close"
    />,
    <CondensedButton key={11}>CondensedButton</CondensedButton>,
    <ContextView
      key={12}
      padding="small"
      margin="large"
      placement="end top"
      shadow="resting"
    >
      ContextView
    </ContextView>,
    <Editable
      key={13}
      mode="view"
      onChangeMode={() => {}}
      render={() => <span>Editable</span>}
      value="Editable"
    />,
    <Flex key={14} withVisualDebug margin="none none small">
      <Flex.Item>Flex One</Flex.Item>
      <Flex.Item>Flex Two</Flex.Item>
      <Flex.Item>Flex Three</Flex.Item>
    </Flex>,
    <FormField key={15} id="foo" label="Opacity" width="200px">
      <input style={{ display: 'block', width: '100%' }} />
    </FormField>,
    <Heading key={16}>Default Heading</Heading>,
    <IconButton key={17} screenReaderLabel="Add User">
      <IconAddLine />
    </IconButton>,
    <Img
      key={18}
      src="data:image/jpeg;base64,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"
    />,
    <Link key={19} href="https://instructure.github.io/instructure-ui/">
      Link
    </Link>,
    <List key={20} margin="0 0 small">
      <List.Item>List item 1</List.Item>
      <List.Item>List item 2</List.Item>
    </List>,
    <Menu key={20} trigger={<Button>Menu</Button>} />,
    <Metric
      key={21}
      textAlign="start"
      renderLabel="Metric"
      renderValue="80%"
    />,
    <MetricGroup key={22}>
      <Metric renderLabel="MetricGroup" renderValue="80%" />
      <Metric renderLabel="Late" renderValue="4" />
      <Metric renderLabel="Missing" renderValue="2" />
    </MetricGroup>,
    <NumberInput key={23} renderLabel="NumberInput" />,
    <Pill key={24} color="info">
      Pill
    </Pill>,
    <ProgressBar
      key={25}
      size="small"
      screenReaderLabel="progressBar"
      valueNow={40}
      valueMax={60}
      margin="0 0 small"
    />,
    <ProgressCircle
      key={26}
      size="small"
      screenReaderLabel="ProgressCircle"
      valueNow={40}
      valueMax={60}
      margin="0 small 0 0"
    />,
    <RadioInput key={27} label="RadioInput" value="foo" name="bar" />,
    <RadioInputGroup
      key={28}
      name="example1"
      defaultValue="val1"
      description="RadioInputGroup"
    >
      <RadioInput key={281} value="val1" label="val1" />
      <RadioInput key={282} value="val2" label="val2" />
    </RadioInputGroup>,
    <Rating
      key={29}
      label="Overall rating of freshman year experience"
      valueNow={68.45}
      valueMax={100}
    />,
    <SimpleSelect key={30} renderLabel="Uncontrolled Select">
      <SimpleSelect.Option id="simple_Select" value="SimpleSelect">
        SimpleSelect
      </SimpleSelect.Option>
      <SimpleSelect.Option id="baz" value="baz">
        Baz
      </SimpleSelect.Option>
    </SimpleSelect>,
    <Spinner key={31} renderTitle="Spinner" size="x-small" />,
    <Tag key={32} text="Tag" margin="0 x-small 0 0" />,
    <Text key={33}>Text component</Text>,
    <TextArea key={34} label="This is a TextArea" />,
    <TextInput key={35} renderLabel="This is a TextInput" />,
    <View key={36}>This is a View</View>
  ]
  return (
    <ApplyLocale locale="en-US">
      <br />
      {components.map(function (component, key) {
        return wrapComponent(component, key.toString())
      })}
    </ApplyLocale>
  )
}

function wrapComponent(component: string | JSX.Element, key: string) {
  return (
    <View key={key} display="block" padding="large">
      <Tooltip
        renderTip="hello world"
        isShowingContent={true}
        defaultIsShowingContent={true}
        placement="top center"
      >
        {component}
      </Tooltip>
    </View>
  )
}

export default TooltipPositioning
