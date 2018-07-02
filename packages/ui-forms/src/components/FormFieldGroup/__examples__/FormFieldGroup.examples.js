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
import TextInput from '../../../../../ui-forms/lib/components/TextInput'
import Select from '../../../../../ui-forms/lib/components/Select'
import Checkbox from '../../../../../ui-forms/lib/components/Checkbox'
import CheckboxGroup from '../../../../../ui-forms/lib/components/CheckboxGroup'
import RadioInput from '../../../../../ui-forms/lib/components/RadioInput'
import RadioInputGroup from '../../../../../ui-forms/lib/components/RadioInputGroup'
import FormFieldGroup from '../index'

export const inline = () => {
  return (
    <FormFieldGroup
      description="Breakfast"
      layout="inline"
    >
      <TextInput label="Favorite Breakfast Eatery"
        messages={[
        { text: 'Invalid name', type: 'error' }
        ]}
        />
      <Select label="Select Your Favorite Side Dish">
        <option value="apples">Fresh Fruit</option>
        <option value="oranges">Biscuits and Gravy</option>
        <option value="bananas">Bacon</option>
        <option value="watermelon">English Muffins</option>
        <option value="pancakes">Pancakes</option>
      </Select>
      <RadioInputGroup
        name="beverage"
        description="Beverage of Choice"
        defaultValue="coffee"
        layout="columns"
      >
        <RadioInput label="Juice" value="juice" />
        <RadioInput label="Water" value="water" />
        <RadioInput label="Coffee" value="coffee" />
        <RadioInput label="Milk" value="milk" />
        <RadioInput label="Soda" value="soda" />
        <RadioInput label="Hot Tea" value="tea" />
      </RadioInputGroup>
    </FormFieldGroup>
  )
}

export const stacked = () => {
  return (
    <FormFieldGroup
      description="Morning Preferences"
      layout="stacked"
    >
      <TextInput label="Favorite Breakfast Eatery"
        messages={[
        { text: 'Invalid name', type: 'error' }
        ]}
        />
      <Select label="Select Your Favorite Side Dish">
        <option value="apples">Fresh Fruit</option>
        <option value="oranges">Biscuits and Gravy</option>
        <option value="bananas">Bacon</option>
        <option value="watermelon">English Muffins</option>
        <option value="pancakes">Pancakes</option>
      </Select>
      <CheckboxGroup
        name="beverage"
        description="Favorite Beverages"
        layout="columns"
      >
        <Checkbox label="Juice" value="juice" />
        <Checkbox label="Water" value="water" />
        <Checkbox label="Coffee" value="coffee" />
        <Checkbox label="Milk" value="milk" />
        <Checkbox label="Soda" value="soda" />
      </CheckboxGroup>
    </FormFieldGroup>
  )
}

export const columns = () => {
  return (
    <FormFieldGroup
      description="Breakfast"
      layout="columns"
      vAlign="top"
    >
      <TextInput label="Favorite Breakfast Eatery"
        messages={[
        { text: 'Invalid name', type: 'error' }
        ]}
        />
      <Select label="Select Your Favorite Side Dish">
        <option value="apples">Fresh Fruit</option>
        <option value="oranges">Biscuits and Gravy</option>
        <option value="bananas">Bacon</option>
        <option value="watermelon">English Muffins</option>
        <option value="pancakes">Pancakes</option>
      </Select>
      <RadioInputGroup
        name="beverage"
        description="Beverage of Choice"
        defaultValue="coffee"
        layout="columns"
      >
        <RadioInput label="Juice" value="juice" />
        <RadioInput label="Water" value="water" />
        <RadioInput label="Coffee" value="coffee" />
        <RadioInput label="Milk" value="milk" />
        <RadioInput label="Soda" value="soda" />
        <RadioInput label="Hot Tea" value="tea" />
      </RadioInputGroup>
    </FormFieldGroup>
  )
}

export const alignTop = () => {
  return (
    <FormFieldGroup
      description="Breakfast"
      layout="inline"
      vAlign="top"
    >
      <TextInput label="Favorite Breakfast Eatery" />
      <Select label="Select Your Favorite Side Dish">
        <option value="apples">Fresh Fruit</option>
        <option value="oranges">Biscuits and Gravy</option>
        <option value="bananas">Bacon</option>
        <option value="watermelon">English Muffins</option>
        <option value="pancakes">Pancakes</option>
      </Select>
    </FormFieldGroup>
  )
}

export const alignMiddle = () => {
  return (
    <FormFieldGroup
      description="Breakfast"
      layout="inline"
    >
      <TextInput label="Favorite Breakfast Eatery" />
      <Select label="Select Your Favorite Side Dish">
        <option value="apples">Fresh Fruit</option>
        <option value="oranges">Biscuits and Gravy</option>
        <option value="bananas">Bacon</option>
        <option value="watermelon">English Muffins</option>
        <option value="pancakes">Pancakes</option>
      </Select>
    </FormFieldGroup>
  )
}

export const alignBottom = () => {
  return (
    <FormFieldGroup
      description="Breakfast"
      layout="inline"
      vAlign="bottom"
    >
      <TextInput label="Favorite Breakfast Eatery" />
      <Select label="Select Your Favorite Side Dish">
        <option value="apples">Fresh Fruit</option>
        <option value="oranges">Biscuits and Gravy</option>
        <option value="bananas">Bacon</option>
        <option value="watermelon">English Muffins</option>
        <option value="pancakes">Pancakes</option>
      </Select>
    </FormFieldGroup>
  )
}

export const error = () => {
  return (
    <FormFieldGroup
      description="Breakfast"
      layout="columns"
      vAlign="top"
      messages={[
        { text: 'You must choose', type: 'error' }
        ]}
    >
      <TextInput label="Favorite Breakfast Eatery" />
      <Select label="Select Your Favorite Side Dish">
        <option value="apples">Fresh Fruit</option>
        <option value="oranges">Biscuits and Gravy</option>
        <option value="bananas">Bacon</option>
        <option value="watermelon">English Muffins</option>
        <option value="pancakes">Pancakes</option>
      </Select>
    </FormFieldGroup>
  )
}

export const hint = () => {
  return (
    <FormFieldGroup
      description="Breakfast"
      layout="columns"
      vAlign="top"
      messages={[
        { text: 'This will help us choose a caterer', type: 'hint' }
        ]}
    >
      <TextInput label="Favorite Breakfast Eatery" />
      <Select label="Select Your Favorite Side Dish">
        <option value="apples">Fresh Fruit</option>
        <option value="oranges">Biscuits and Gravy</option>
        <option value="bananas">Bacon</option>
        <option value="watermelon">English Muffins</option>
        <option value="pancakes">Pancakes</option>
      </Select>
    </FormFieldGroup>
  )
}

export const success = () => {
  return (
    <FormFieldGroup
      description="Breakfast"
      layout="columns"
      vAlign="top"
      messages={[
        { text: 'Thanks for participating', type: 'success' }
        ]}
    >
      <TextInput label="Favorite Breakfast Eatery" />
      <Select label="Select Your Favorite Side Dish">
        <option value="apples">Fresh Fruit</option>
        <option value="oranges">Biscuits and Gravy</option>
        <option value="bananas">Bacon</option>
        <option value="watermelon">English Muffins</option>
        <option value="pancakes">Pancakes</option>
      </Select>
    </FormFieldGroup>
  )
}

export const rowSpacingSmall = () => {
  return (
    <FormFieldGroup
      description="Breakfast"
      layout="inline"
      rowSpacing="small"
    >
      <TextInput label="Favorite Breakfast Eatery" />
      <Select label="Select Your Favorite Side Dish">
        <option value="apples">Fresh Fruit</option>
        <option value="oranges">Biscuits and Gravy</option>
        <option value="bananas">Bacon</option>
        <option value="watermelon">English Muffins</option>
        <option value="pancakes">Pancakes</option>
      </Select>
    </FormFieldGroup>
  )
}

export const rowSpacingMedium = () => {
  return (
    <FormFieldGroup
      description="Breakfast"
      layout="inline"
      rowSpacing="medium"
    >
      <TextInput label="Favorite Breakfast Eatery" />
      <Select label="Select Your Favorite Side Dish">
        <option value="apples">Fresh Fruit</option>
        <option value="oranges">Biscuits and Gravy</option>
        <option value="bananas">Bacon</option>
        <option value="watermelon">English Muffins</option>
        <option value="pancakes">Pancakes</option>
      </Select>
    </FormFieldGroup>
  )
}

export const rowSpacingLarge = () => {
  return (
    <FormFieldGroup
      description="Breakfast"
      layout="inline"
      rowSpacing="large"
    >
      <TextInput label="Favorite Breakfast Eatery" />
      <Select label="Select Your Favorite Side Dish">
        <option value="apples">Fresh Fruit</option>
        <option value="oranges">Biscuits and Gravy</option>
        <option value="bananas">Bacon</option>
        <option value="watermelon">English Muffins</option>
        <option value="pancakes">Pancakes</option>
      </Select>
    </FormFieldGroup>
  )
}

export const colSpacingSmall = () => {
  return (
    <FormFieldGroup
      description="Breakfast"
      layout="columns"
      colSpacing="small"
    >
      <TextInput label="Favorite Breakfast Eatery" />
      <Select label="Select Your Favorite Side Dish">
        <option value="apples">Fresh Fruit</option>
        <option value="oranges">Biscuits and Gravy</option>
        <option value="bananas">Bacon</option>
        <option value="watermelon">English Muffins</option>
        <option value="pancakes">Pancakes</option>
      </Select>
    </FormFieldGroup>
  )
}

export const colSpacingMedium = () => {
  return (
    <FormFieldGroup
      description="Breakfast"
      layout="columns"
      colSpacing="medium"
    >
      <TextInput label="Favorite Breakfast Eatery" />
      <Select label="Select Your Favorite Side Dish">
        <option value="apples">Fresh Fruit</option>
        <option value="oranges">Biscuits and Gravy</option>
        <option value="bananas">Bacon</option>
        <option value="watermelon">English Muffins</option>
        <option value="pancakes">Pancakes</option>
      </Select>
    </FormFieldGroup>
  )
}

export const colSpacingLarge = () => {
  return (
    <FormFieldGroup
      description="Breakfast"
      layout="columns"
      colSpacing="large"
    >
      <TextInput label="Favorite Breakfast Eatery" />
      <Select label="Select Your Favorite Side Dish">
        <option value="apples">Fresh Fruit</option>
        <option value="oranges">Biscuits and Gravy</option>
        <option value="bananas">Bacon</option>
        <option value="watermelon">English Muffins</option>
        <option value="pancakes">Pancakes</option>
      </Select>
    </FormFieldGroup>
  )
}

export const startAtSmall = () => {
  return (
    <FormFieldGroup
      description="Breakfast"
      layout="columns"
      startAt="small"
    >
      <TextInput label="Favorite Breakfast Eatery" />
      <Select label="Select Your Favorite Side Dish">
        <option value="apples">Fresh Fruit</option>
        <option value="oranges">Biscuits and Gravy</option>
        <option value="bananas">Bacon</option>
        <option value="watermelon">English Muffins</option>
        <option value="pancakes">Pancakes</option>
      </Select>
    </FormFieldGroup>
  )
}

export const startAtMedium = () => {
  return (
    <FormFieldGroup
      description="Breakfast"
      layout="columns"
      startAt="medium"
    >
      <TextInput label="Favorite Breakfast Eatery" />
      <Select label="Select Your Favorite Side Dish">
        <option value="apples">Fresh Fruit</option>
        <option value="oranges">Biscuits and Gravy</option>
        <option value="bananas">Bacon</option>
        <option value="watermelon">English Muffins</option>
        <option value="pancakes">Pancakes</option>
      </Select>
    </FormFieldGroup>
  )
}

export const startAtLarge = () => {
  return (
    <FormFieldGroup
      description="Breakfast"
      layout="columns"
      startAt="large"
    >
      <TextInput label="Favorite Breakfast Eatery" />
      <Select label="Select Your Favorite Side Dish">
        <option value="apples">Fresh Fruit</option>
        <option value="oranges">Biscuits and Gravy</option>
        <option value="bananas">Bacon</option>
        <option value="watermelon">English Muffins</option>
        <option value="pancakes">Pancakes</option>
      </Select>
    </FormFieldGroup>
  )
}

export const startAtXLarge = () => {
  return (
    <FormFieldGroup
      description="Breakfast"
      layout="columns"
      startAt="x-large"
    >
      <TextInput label="Favorite Breakfast Eatery" />
      <Select label="Select Your Favorite Side Dish">
        <option value="apples">Fresh Fruit</option>
        <option value="oranges">Biscuits and Gravy</option>
        <option value="bananas">Bacon</option>
        <option value="watermelon">English Muffins</option>
        <option value="pancakes">Pancakes</option>
      </Select>
    </FormFieldGroup>
  )
}
