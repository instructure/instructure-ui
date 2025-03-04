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
import React, { useState } from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { expect } from 'vitest'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import Select from '../index'
import { View } from '@instructure/ui-view'



describe('<Select />', () => {
  it('should render an input and show options on click', async () => {
    type EventData = { id?: string; direction?: 1 | -1 | undefined }

    const SingleSelectExample = ({ options }: any ) => {
      const [inputValue, setInputValue] = useState(options[0].label)
      const [isShowingOptions, setIsShowingOptions] = useState(false)
      const [highlightedOptionId, setHighlightedOptionId] = useState<string>('')
      const [selectedOptionId, setSelectedOptionId] = useState(options[0].id)
      const [announcement, setAnnouncement] = useState('')
      console.log(announcement)

      const getOptionById = (queryId: any) => {
        return options.find(({ id }: any) => id === queryId)
      }

      const handleShowOptions = (_event: any) => {
        setIsShowingOptions(true)
      }

      const handleHideOptions = (_event: any) => {
        const option = getOptionById(selectedOptionId).label
        setIsShowingOptions(false)
        setHighlightedOptionId('')
        setSelectedOptionId(selectedOptionId ? option : '')
        setAnnouncement('List collapsed.')
      }

      const handleBlur = (_event: any) => {
        setHighlightedOptionId('')
      }

      const handleHighlightOption = (event: any, { id }: EventData) => {
        event.persist()
        const optionsAvailable = `${options.length} options available.`
        const nowOpen = !isShowingOptions
          ? `List expanded. ${optionsAvailable}`
          : ''
        const option = getOptionById(id).label
        setHighlightedOptionId(id || '')
        setInputValue(event.type === 'keydown' ? option : inputValue)
        setAnnouncement(`${option} ${nowOpen}`)
      }

      const handleSelectOption = (_event: any, { id }: EventData) => {
        const option = getOptionById(id).label
        setSelectedOptionId(id)
        setInputValue(option)
        setIsShowingOptions(false)
        setAnnouncement(`"${option}" selected. List collapsed.`)
      }

      return (
        <div>
          <Select
            renderLabel="Single Select"
            assistiveText="Use arrow keys to navigate options."
            inputValue={inputValue}
            isShowingOptions={isShowingOptions}
            onBlur={handleBlur}
            onRequestShowOptions={handleShowOptions}
            onRequestHideOptions={handleHideOptions}
            onRequestHighlightOption={handleHighlightOption}
            onRequestSelectOption={handleSelectOption}
          >
            {options.map((option: any) => {
              return (
                <Select.Option
                  id={option.id}
                  key={option.id}
                  isHighlighted={option.id === highlightedOptionId}
                  isSelected={option.id === selectedOptionId}
                >
                  {option.label}
                </Select.Option>
              )
            })}
          </Select>
        </div>
      )
    }

    render(
      <View>
        <SingleSelectExample
          options={[
            { id: 'opt1', label: 'Alaska' },
            { id: 'opt2', label: 'American Samoa' },
            { id: 'opt3', label: 'Arizona' }
          ]}
        />
      </View>
    )

    const input = screen.getByLabelText('Single Select')

    input.focus()
    await userEvent.click(input)

    await waitFor(() => {
      screen.debug()
      expect(screen.getByText('Arizona')).toBeInTheDocument()
    })
  })
})
