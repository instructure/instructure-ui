/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 - present Instructure, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
import React from 'react'
import IconTrash from '@instructure/ui-icons/lib/Solid/IconTrash'
/* eslint-disable instructure-ui/no-relative-package-imports */
import View from '../../../../../ui-layout/lib/components/View'
import Flex, { FlexItem } from '../../../../../ui-layout/lib/components/Flex'
import TextInput from '../../../../../ui-forms/lib/components/TextInput'
import Text from '../../../../../ui-elements/lib/components/Text'
/* eslint-enable instructure-ui/no-relative-package-imports */
import ScreenReaderContent from '@instructure/ui-a11y/lib/components/ScreenReaderContent'
import Button from '../index'

export const sizes = () => {
  return (
    <div>
      <View as="div" margin="0 0 large">
        <Button size="small" icon={IconTrash} variant="icon" margin="0 small 0 0">
          <ScreenReaderContent>Delete something</ScreenReaderContent>
        </Button>
        <Button size="small" icon={IconTrash} margin="0 small 0 0">
          <ScreenReaderContent>Delete something</ScreenReaderContent>
        </Button>
        <Button size="small" icon={IconTrash} variant="circle-danger" margin="0 small 0 0">
          <ScreenReaderContent>Delete something</ScreenReaderContent>
        </Button>
        <Button size="small" margin="0 small 0 0">Delete</Button>
        <Button size="small" icon={IconTrash} margin="0 small 0 0">
          Delete
        </Button>
        <Button size="small" icon={IconTrash} variant="link" margin="0 small 0 0">
          Delete
        </Button>
        <Button margin="x-small 0 0" size="small" fluidWidth>fluidWidth Button</Button>
      </View>
      <View as="div" margin="0 0 large">
        <Button icon={IconTrash} variant="icon" margin="0 small 0 0">
          <ScreenReaderContent>Delete something</ScreenReaderContent>
        </Button>
        <Button icon={IconTrash} margin="0 small 0 0">
          <ScreenReaderContent>Delete something</ScreenReaderContent>
        </Button>
        <Button icon={IconTrash} variant="circle-danger" margin="0 small 0 0">
          <ScreenReaderContent>Delete something</ScreenReaderContent>
        </Button>
        <Button margin="0 small 0 0">Delete</Button>
        <Button icon={IconTrash} margin="0 small 0 0">
          Delete
        </Button>
        <Button icon={IconTrash} variant="link" margin="0 small 0 0">
          Delete
        </Button>
        <Button margin="x-small 0 0" fluidWidth>fluidWidth Button</Button>
      </View>
      <View as="div">
        <Button icon={IconTrash} variant="icon" margin="0 small 0 0" size="large">
          <ScreenReaderContent>Delete something</ScreenReaderContent>
        </Button>
        <Button icon={IconTrash} margin="0 small 0 0" size="large">
          <ScreenReaderContent>Delete something</ScreenReaderContent>
        </Button>
        <Button icon={IconTrash} variant="circle-danger" margin="0 small 0 0" size="large">
          <ScreenReaderContent>Delete something</ScreenReaderContent>
        </Button>
        <Button margin="0 small 0 0" size="large">Delete</Button>
        <Button icon={IconTrash} margin="0 small 0 0" size="large">
          Delete
        </Button>
        <Button icon={IconTrash} variant="link" margin="0 small 0 0" size="large">
          Delete
        </Button>
        <Button margin="x-small 0 0" size="large" fluidWidth>fluidWidth Button</Button>
      </View>
    </div>
  )
}

export const overflow = () => {
  return (
    <div>
      <Button margin="0 0 small 0" icon={IconTrash}>Buttons handle overflow with ellipsis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean elementum nunc purus, eu molestie turpis vestibulum eu.</Button>
      <Button fluidWidth icon={IconTrash}>fluidWidth Buttons wrap text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean elementum nunc purus, eu molestie turpis vestibulum eu.</Button>
    </div>
  )
}

export const heightAlignment = () => {
  return (
    <div>
      <Text weight="bold">Button height should line up with the height of InstUI form inputs with the same <code>size</code> property.</Text>
      <Flex margin="small 0">
        <FlexItem>
          <TextInput
            label={<ScreenReaderContent>Enter your name</ScreenReaderContent>}
            size="small"
          />
        </FlexItem>
        <FlexItem padding="0 0 0 xx-small">
          <Button size="small">Small</Button>
        </FlexItem>
      </Flex>
      <Flex margin="0 0 small">
        <FlexItem>
          <TextInput label={<ScreenReaderContent>Enter your name</ScreenReaderContent>} />
        </FlexItem>
        <FlexItem padding="0 0 0 xx-small">
          <Button>Medium</Button>
        </FlexItem>
      </Flex>
      <Flex margin="small 0 large">
        <FlexItem>
          <TextInput
            label={<ScreenReaderContent>Enter your name</ScreenReaderContent>}
            size="large"
          />
        </FlexItem>
        <FlexItem padding="0 0 0 xx-small">
          <Button size="large">Large</Button>
        </FlexItem>
      </Flex>
      <Text weight="bold">
        <code>fluidWidth</code> Buttons should default to the same height as default
        Buttons with the corresponding <code>size</code> property.
      </Text>
      <Flex margin="small 0">
        <FlexItem>
          <Button fluidWidth size="small">Small fluidWidth</Button>
        </FlexItem>
        <FlexItem padding="0 0 0 xx-small">
          <Button size="small">Small default</Button>
        </FlexItem>
      </Flex>
      <Flex margin="small 0">
        <FlexItem>
          <Button fluidWidth>Medium fluidWidth</Button>
        </FlexItem>
        <FlexItem padding="0 0 0 xx-small">
          <Button>Medium default</Button>
        </FlexItem>
      </Flex>
      <Flex>
        <FlexItem>
          <Button fluidWidth size="large">Large fluidWidth</Button>
        </FlexItem>
        <FlexItem padding="0 0 0 xx-small">
          <Button size="large">Large default</Button>
        </FlexItem>
      </Flex>
    </div>
  )
}

export const deprecated = () => {
  return (
    <div>
      <Text weight="bold">
        Inserting an icon as a child of Button will now produce a warning, but we need to make sure
        we do not break existing Buttons with icons as children.
      </Text>
      <View as="div" margin="small 0 0">
        <Button margin="0 small 0 0" ><IconTrash />Button label</Button>
        <Button variant="icon" margin="0 small 0 0" ><IconTrash /></Button>
        <Button variant="circle-primary" margin="0 small 0 0" ><IconTrash /></Button>
        <Button size="large" variant="circle-danger" margin="0 small 0 0" ><IconTrash /></Button>
      </View>
    </div>
  )
}

export const variantDefault = () => {
  return (
    <Button>Button Label</Button>
  )
}

export const variantDefaultDisabled = () => {
  return (
    <Button disabled>Button Label</Button>
  )
}

export const variantDefaultIcon = () => {
  return (
    <Button icon={IconTrash}>Button Label</Button>
  )
}

export const variantDefaultIconOnly = () => {
  return (
    <Button icon={IconTrash}>
      <ScreenReaderContent>Button Label</ScreenReaderContent>
    </Button>
  )
}

export const variantPrimary = () => {
  return (
    <Button variant="primary">Button Label</Button>
  )
}

export const variantPrimaryDisabled = () => {
  return (
    <Button variant="primary" disabled>Button Label</Button>
  )
}

export const variantPrimaryIcon = () => {
  return (
    <Button variant="primary" icon={IconTrash}>Button Label</Button>
  )
}

export const variantPrimaryIconOnly = () => {
  return (
    <Button variant="primary" icon={IconTrash}>
      <ScreenReaderContent>Button Label</ScreenReaderContent>
    </Button>
  )
}

export const variantSuccess = () => {
  return (
    <Button variant="success">Button Label</Button>
  )
}

export const variantSuccessDisabled = () => {
  return (
    <Button variant="success" disabled>Button Label</Button>
  )
}

export const variantSuccessIcon = () => {
  return (
    <Button variant="success" icon={IconTrash}>Button Label</Button>
  )
}

export const variantSuccessIconOnly = () => {
  return (
    <Button variant="success" icon={IconTrash}>
      <ScreenReaderContent>Button Label</ScreenReaderContent>
    </Button>
  )
}

export const variantDanger = () => {
  return (
    <Button variant="danger">Button Label</Button>
  )
}

export const variantDangerDisabled = () => {
  return (
    <Button variant="danger" disabled>Button Label</Button>
  )
}

export const variantDangerIcon = () => {
  return (
    <Button variant="danger" icon={IconTrash}>Button Label</Button>
  )
}

export const variantDangerIconOnly = () => {
  return (
    <Button variant="danger" icon={IconTrash}>
      <ScreenReaderContent>Button Label</ScreenReaderContent>
    </Button>
  )
}

export const variantLight = () => {
  return (
    <Button variant="light">Button Label</Button>
  )
}

export const variantLightDisabled = () => {
  return (
    <Button variant="light" disabled>Button Label</Button>
  )
}

export const variantLightIcon = () => {
  return (
    <Button variant="light" icon={IconTrash}>Button Label</Button>
  )
}

export const variantLightIconOnly = () => {
  return (
    <Button variant="light" icon={IconTrash}>
      <ScreenReaderContent>Button Label</ScreenReaderContent>
    </Button>
  )
}

export const variantLink = () => {
  return (
    <Button variant="link">Button Label</Button>
  )
}

export const variantLinkDisabled = () => {
  return (
    <Button variant="link" disabled>Button Label</Button>
  )
}

export const variantLinkIcon = () => {
  return (
    <Button variant="link" icon={IconTrash}>Button Label</Button>
  )
}

export const variantLinkIconOnly = () => {
  return (
    <Button variant="link" icon={IconTrash}>
      <ScreenReaderContent>Button Label</ScreenReaderContent>
    </Button>
  )
}

export const variantGhost = () => {
  return (
    <Button variant="ghost">Button Label</Button>
  )
}

export const variantGhostDisabled = () => {
  return (
    <Button variant="ghost" disabled>Button Label</Button>
  )
}

export const variantGhostIcon = () => {
  return (
    <Button variant="ghost" icon={IconTrash}>Button Label</Button>
  )
}

export const variantGhostIconOnly = () => {
  return (
    <Button variant="ghost" icon={IconTrash}>
      <ScreenReaderContent>Button Label</ScreenReaderContent>
    </Button>
  )
}

export const variantIcon = () => {
  return (
    <Button variant="icon" icon={IconTrash}><ScreenReaderContent>Button Label</ScreenReaderContent></Button>
  )
}

export const variantIconDisabled = () => {
  return (
    <Button disabled variant="icon" icon={IconTrash}><ScreenReaderContent>Button Label</ScreenReaderContent></Button>
  )
}

export const variantCirclePrimary = () => {
  return (
    <Button variant="circle-primary" icon={IconTrash}><ScreenReaderContent>Button Label</ScreenReaderContent></Button>
  )
}

export const variantCirclePrimaryDisabled = () => {
  return (
    <Button disabled variant="circle-primary" icon={IconTrash}><ScreenReaderContent>Button Label</ScreenReaderContent></Button>
  )
}

export const variantCircleDanger = () => {
  return (
    <Button variant="circle-danger" icon={IconTrash}><ScreenReaderContent>Button Label</ScreenReaderContent></Button>
  )
}

export const variantCircleDangerDisabled = () => {
  return (
    <Button disabled variant="circle-danger" icon={IconTrash}><ScreenReaderContent>Button Label</ScreenReaderContent></Button>
  )
}
