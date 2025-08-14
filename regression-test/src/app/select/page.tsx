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

'use client'
import React, { useRef, useState } from 'react'
import { Select as sl } from 'instructure-ui/ui-select/es/index'
import { SimpleSelect as ss } from 'instructure-ui/ui-simple-select/es/index'
import { View as vw } from 'instructure-ui/ui-view/es/index'
import {
  IconUserSolid as ius,
  IconUserLine as iul,
  IconSearchLine as isl
} from 'instructure-ui/ui-icons/es/index'

const Select = sl as any
const SimpleSelect = ss as any
const View = vw as any
const IconUserSolid = ius as any
const IconUserLine = iul as any
const IconSearchLine = isl as any

type OptionT = { id: string; label: string; disabled?: boolean }

function SingleSelectExample({ options }: { options: OptionT[] }) {
  const [inputValue, setInputValue] = useState(options[0].label)
  const [isShowingOptions, setIsShowingOptions] = useState(false)
  const [highlightedOptionId, setHighlightedOptionId] = useState<string | null>(
    null
  )
  const [selectedOptionId, setSelectedOptionId] = useState<string>(
    options[0].id
  )
  const inputRef = useRef<any>()

  const getOptionById = (id?: string | null) => options.find((o) => o.id === id)

  const handleShowOptions = (event: any) => {
    setIsShowingOptions(true)
    if (!inputValue && !selectedOptionId && options.length > 0) {
      if (event.key === 'ArrowDown') setHighlightedOptionId(options[0].id)
      if (event.key === 'ArrowUp')
        setHighlightedOptionId(options[options.length - 1].id)
    }
  }
  const handleHideOptions = () => {
    setIsShowingOptions(false)
    setHighlightedOptionId(null)
    const option = getOptionById(selectedOptionId)
    setInputValue(option ? option.label : '')
  }
  const handleHighlightOption = (_e: any, { id }: { id: string }) => {
    setHighlightedOptionId(id)
  }
  const handleSelectOption = (_e: any, { id }: { id: string }) => {
    const option = getOptionById(id)
    if (!option) return
    // focus juggling improves SR experience
    if (inputRef.current) {
      inputRef.current.blur()
      inputRef.current.focus()
    }
    setSelectedOptionId(id)
    setInputValue(option.label)
    setIsShowingOptions(false)
  }

  return (
    <View display="block" width="22rem">
      <Select
        renderLabel="Single Select"
        assistiveText="Use arrow keys to navigate options."
        inputValue={inputValue}
        isShowingOptions={isShowingOptions}
        onBlur={() => setHighlightedOptionId(null)}
        onRequestShowOptions={handleShowOptions}
        onRequestHideOptions={handleHideOptions}
        onRequestHighlightOption={handleHighlightOption}
        onRequestSelectOption={handleSelectOption}
        inputRef={(el: any) => (inputRef.current = el)}
      >
        {options.map((opt) => (
          <Select.Option
            key={opt.id}
            id={opt.id}
            isHighlighted={opt.id === highlightedOptionId}
            isSelected={opt.id === selectedOptionId}
            isDisabled={opt.disabled}
          >
            {opt.label}
          </Select.Option>
        ))}
      </Select>
    </View>
  )
}

function AutocompleteExample({ options }: { options: OptionT[] }) {
  const [inputValue, setInputValue] = useState('')
  const [isShowingOptions, setIsShowingOptions] = useState(false)
  const [highlightedOptionId, setHighlightedOptionId] = useState<string | null>(
    null
  )
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null)
  const [filteredOptions, setFilteredOptions] = useState<OptionT[]>(options)
  const inputRef = useRef<any>()

  const getOptionById = (id?: string | null) => options.find((o) => o.id === id)
  const filterOptions = (val: string) =>
    options.filter((o) => o.label.toLowerCase().startsWith(val.toLowerCase()))

  const handleShowOptions = () => setIsShowingOptions(true)
  const handleHideOptions = () => {
    setIsShowingOptions(false)
    // basic matching behavior
    if (
      filteredOptions.length === 1 &&
      filteredOptions[0].label.toLowerCase() === inputValue.toLowerCase()
    ) {
      const only = filteredOptions[0]
      setSelectedOptionId(only.id)
      setInputValue(only.label)
      setFilteredOptions(options)
      return
    }
    if (inputValue.length === 0) {
      setSelectedOptionId(null)
      setFilteredOptions(options)
      return
    }
    if (selectedOptionId) {
      const selected = getOptionById(selectedOptionId)
      if (selected) setInputValue(selected.label)
    }
  }
  const handleInputChange = (e: any) => {
    const val = e.target.value
    const newOptions = filterOptions(val)
    setInputValue(val)
    setFilteredOptions(newOptions)
    setHighlightedOptionId(newOptions.length > 0 ? newOptions[0].id : null)
    setIsShowingOptions(true)
  }
  const handleHighlightOption = (_e: any, { id }: { id: string }) => {
    setHighlightedOptionId(id)
  }
  const handleSelectOption = (_e: any, { id }: { id: string }) => {
    const option = getOptionById(id)
    if (!option) return
    if (inputRef.current) {
      inputRef.current.blur()
      inputRef.current.focus()
    }
    setSelectedOptionId(id)
    setInputValue(option.label)
    setIsShowingOptions(false)
    setFilteredOptions(options)
  }

  return (
    <View display="block" width="26rem">
      <Select
        renderLabel="Autocomplete"
        assistiveText="Type or use arrow keys to navigate options."
        placeholder="Start typing to search..."
        inputValue={inputValue}
        isShowingOptions={isShowingOptions}
        onBlur={() => setHighlightedOptionId(null)}
        onInputChange={handleInputChange}
        onRequestShowOptions={handleShowOptions}
        onRequestHideOptions={handleHideOptions}
        onRequestHighlightOption={handleHighlightOption}
        onRequestSelectOption={handleSelectOption}
        renderBeforeInput={<IconUserSolid inline={false} />}
        renderAfterInput={<IconSearchLine inline={false} />}
        inputRef={(el: any) => (inputRef.current = el)}
      >
        {filteredOptions.length > 0 ? (
          filteredOptions.map((opt) => (
            <Select.Option
              key={opt.id}
              id={opt.id}
              isHighlighted={opt.id === highlightedOptionId}
              isSelected={opt.id === selectedOptionId}
              isDisabled={opt.disabled}
              renderBeforeLabel={!opt.disabled ? IconUserSolid : IconUserLine}
            >
              {!opt.disabled ? opt.label : `${opt.label} (unavailable)`}
            </Select.Option>
          ))
        ) : (
          <Select.Option id="empty-option" key="empty-option">
            ---
          </Select.Option>
        )}
      </Select>
    </View>
  )
}

function GroupSelectExample({
  options
}: {
  options: Record<string, OptionT[]>
}) {
  const groupKeys = Object.keys(options)
  const first = options[groupKeys[0]][0]
  const [inputValue, setInputValue] = useState(first.label)
  const [isShowingOptions, setIsShowingOptions] = useState(false)
  const [highlightedOptionId, setHighlightedOptionId] = useState<string | null>(
    null
  )
  const [selectedOptionId, setSelectedOptionId] = useState<string>(first.id)
  const inputRef = useRef<any>()

  const getOptionById = (id?: string | null) =>
    groupKeys.flatMap((k) => options[k]).find((o) => o.id === id)

  return (
    <View display="block" width="24rem">
      <Select
        renderAfterInput={<IconUserLine />}
        renderLabel="Group Select"
        assistiveText="Use arrow keys to navigate options."
        inputValue={inputValue}
        isShowingOptions={isShowingOptions}
        onBlur={() => setHighlightedOptionId(null)}
        onRequestShowOptions={() => setIsShowingOptions(true)}
        onRequestHideOptions={() => {
          setIsShowingOptions(false)
          const selected = getOptionById(selectedOptionId)
          setInputValue(selected ? selected.label : '')
        }}
        onRequestHighlightOption={(_e: any, { id }: { id: string }) =>
          setHighlightedOptionId(id)
        }
        onRequestSelectOption={(_e: any, { id }: { id: string }) => {
          const opt = getOptionById(id)
          if (!opt) return
          if (inputRef.current) {
            inputRef.current.blur()
            inputRef.current.focus()
          }
          setSelectedOptionId(id)
          setInputValue(opt.label)
          setIsShowingOptions(false)
        }}
        inputRef={(el: any) => (inputRef.current = el)}
      >
        {groupKeys.map((groupKey) => (
          <Select.Group key={groupKey} renderLabel={groupKey}>
            {options[groupKey].map((opt) => (
              <Select.Option
                key={opt.id}
                id={opt.id}
                isHighlighted={opt.id === highlightedOptionId}
                isSelected={opt.id === selectedOptionId}
              >
                {opt.label}
              </Select.Option>
            ))}
          </Select.Group>
        ))}
      </Select>
      <div>SimpleSelect:</div>
      <div>
        <SimpleSelect renderLabel="Uncontrolled Select">
          <SimpleSelect.Option
            id="foo"
            value="foo"
            renderBeforeLabel={(props: any) => {
              return <IconUserSolid />
            }}
          >
            Foo
          </SimpleSelect.Option>
          <SimpleSelect.Option id="bar" value="bar">
            Bar
          </SimpleSelect.Option>
          <SimpleSelect.Option id="baz" value="baz">
            Baz
          </SimpleSelect.Option>
        </SimpleSelect>
      </div>
    </View>
  )
}

export default function SelectPage() {
  const basicOptions: OptionT[] = [
    { id: 'opt1', label: 'Alaska' },
    { id: 'opt2', label: 'American Samoa' },
    { id: 'opt3', label: 'Arizona' },
    { id: 'opt4', label: 'Arkansas' }
  ]
  const autoOptions: OptionT[] = [
    { id: 'opt0', label: 'Aaron Aaronson' },
    { id: 'opt1', label: 'Amber Murphy' },
    { id: 'opt2', label: 'Andrew Miller' },
    { id: 'opt3', label: 'Barbara Ward' },
    { id: 'opt4', label: 'Byron Cranston', disabled: true },
    { id: 'opt5', label: 'Dennis Reynolds' },
    { id: 'opt6', label: 'Dee Reynolds' },
    { id: 'opt7', label: 'Ezra Betterthan' }
  ]
  const grouped = {
    Western: [
      { id: 'g_opt1', label: 'Alaska' },
      { id: 'g_opt2', label: 'California' },
      { id: 'g_opt3', label: 'Colorado' }
    ],
    Eastern: [
      { id: 'g_opt4', label: 'Alabama' },
      { id: 'g_opt5', label: 'Connecticut' },
      { id: 'g_opt6', label: 'Delaware' }
    ]
  }

  return (
    <main className="flex gap-12 p-8 flex-col items-start axe-test">
      <SingleSelectExample options={basicOptions} />
      <AutocompleteExample options={autoOptions} />
      <GroupSelectExample options={grouped} />
    </main>
  )
}
