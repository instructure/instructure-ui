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

import { render } from 'vitest-browser-react'
import { page, userEvent } from 'vitest/browser'
import { describe, it, expect, beforeEach, vi } from 'vitest'

import { Selectable } from '../index.js'
import { SelectableRender } from '../props.js'

const defaultOptions = ['foo', 'bar', 'baz']

describe('<Selectable />', () => {
  const getSelectable = (selectable: SelectableRender) => (
    <span {...selectable.getRootProps()}>
      <label {...selectable.getLabelProps()}>Selectable</label>
      <input
        type="text"
        {...selectable.getTriggerProps()}
        {...selectable.getInputProps()}
      />
      <ul {...selectable.getListProps()}>
        {defaultOptions.map((opt) => (
          <li key={opt} {...selectable.getOptionProps({ id: opt })}>
            {opt}
          </li>
        ))}
      </ul>
    </span>
  )

  it('should focus trigger when label is clicked', async () => {
    await render(
      <Selectable>
        {(selectable) => (
          <span {...selectable.getRootProps()}>
            <label {...selectable.getLabelProps()}>Selectable</label>
            <input
              type="text"
              {...selectable.getTriggerProps()}
              {...selectable.getInputProps()}
            />
            <ul {...selectable.getListProps()}>
              {defaultOptions.map((opt) => (
                <li key={opt} {...selectable.getOptionProps({ id: opt })}>
                  {opt}
                </li>
              ))}
            </ul>
          </span>
        )}
      </Selectable>
    )
    const label = page.getByText('Selectable').element()
    const input = page.getByRole('combobox').element()

    expect(document.activeElement).not.toBe(input)

    await userEvent.click(label)

    await vi.waitFor(() => {
      expect(document.activeElement).toBe(input)
    })
  })

  it('should not blur trigger when label is clicked', async () => {
    const onFocus = vi.fn()
    const onBlur = vi.fn()

    await render(
      <Selectable>
        {(selectable) => (
          <span {...selectable.getRootProps()}>
            <label {...selectable.getLabelProps()}>Selectable</label>
            <input
              type="text"
              {...selectable.getTriggerProps()}
              {...selectable.getInputProps()}
              onBlur={onBlur}
              onFocus={onFocus}
            />
            <ul {...selectable.getListProps()}>
              {defaultOptions.map((opt) => (
                <li key={opt} {...selectable.getOptionProps({ id: opt })}>
                  {opt}
                </li>
              ))}
            </ul>
          </span>
        )}
      </Selectable>
    )
    const label = page.getByText('Selectable').element()
    const input = page.getByRole('combobox').element()

    expect(document.activeElement).not.toBe(input)

    await userEvent.click(label)

    await vi.waitFor(() => {
      expect(onFocus).toHaveBeenCalledTimes(1)
      expect(onBlur).not.toHaveBeenCalled()
    })
  })

  it('should not hide options when list is clicked', async () => {
    const onClick = vi.fn()
    const onMouseDown = vi.fn()
    const onRequestHideOptions = vi.fn()

    await render(
      <Selectable
        isShowingOptions={true}
        onRequestHideOptions={onRequestHideOptions}
      >
        {(selectable) => (
          <span {...selectable.getRootProps()}>
            <label {...selectable.getLabelProps()}>Selectable</label>
            <input
              type="text"
              {...selectable.getTriggerProps()}
              {...selectable.getInputProps()}
            />
            <ul {...selectable.getListProps({ onClick, onMouseDown })}>
              {defaultOptions.map((opt) => (
                <li key={opt} {...selectable.getOptionProps({ id: opt })}>
                  {opt}
                </li>
              ))}
            </ul>
          </span>
        )}
      </Selectable>
    )
    const input = page.getByRole('combobox').element()
    const list = page.getByRole('listbox').element()

    input.focus()
    await userEvent.click(list)

    await vi.waitFor(() => {
      expect(document.activeElement).toBe(input)
      expect(onClick).toHaveBeenCalledTimes(1)
      expect(onMouseDown).toHaveBeenCalledTimes(1)
      expect(onRequestHideOptions).not.toHaveBeenCalled()
    })
  })

  it('should not hide options when an option is clicked', async () => {
    const onClick = vi.fn()
    const onMouseDown = vi.fn()
    const onRequestHideOptions = vi.fn()

    await render(
      <Selectable
        isShowingOptions={true}
        onRequestHideOptions={onRequestHideOptions}
      >
        {(selectable) => (
          <span {...selectable.getRootProps()}>
            <label {...selectable.getLabelProps()}>Selectable</label>
            <input
              type="text"
              {...selectable.getTriggerProps()}
              {...selectable.getInputProps()}
            />
            <ul {...selectable.getListProps()}>
              {defaultOptions.map((opt) => (
                <li
                  key={opt}
                  {...selectable.getOptionProps({
                    id: opt,
                    onClick,
                    onMouseDown
                  })}
                >
                  {opt}
                </li>
              ))}
            </ul>
          </span>
        )}
      </Selectable>
    )
    const input = page.getByRole('combobox').element()
    const option = page.getByText('foo').element()

    input.focus()
    await userEvent.click(option)

    await vi.waitFor(() => {
      expect(document.activeElement).toBe(input)
      expect(onClick).toHaveBeenCalledTimes(1)
      expect(onMouseDown).toHaveBeenCalledTimes(1)
      expect(onRequestHideOptions).not.toHaveBeenCalled()
    })
  })

  it('should not prevent events on other children', async () => {
    const onMouseDown = vi.fn()
    const onClick = vi.fn()
    const onKeyDown = vi.fn()

    await render(
      <Selectable>
        {(selectable) => (
          <span {...selectable.getRootProps()}>
            <label {...selectable.getLabelProps()}>Selectable</label>
            <button
              onMouseDown={onMouseDown}
              onClick={onClick}
              onKeyDown={onKeyDown}
            >
              Selected
            </button>
            <input
              type="text"
              {...selectable.getTriggerProps()}
              {...selectable.getInputProps()}
            />
            <ul {...selectable.getListProps()}>
              {defaultOptions.map((opt) => (
                <li key={opt} {...selectable.getOptionProps({ id: opt })}>
                  {opt}
                </li>
              ))}
            </ul>
          </span>
        )}
      </Selectable>
    )
    const button = page.getByText('Selected').element()

    await userEvent.click(button)
    button.focus()
    await userEvent.keyboard('{Enter}')

    await vi.waitFor(() => {
      expect(onClick).toHaveBeenCalled()
      expect(onMouseDown).toHaveBeenCalled()
      expect(onKeyDown).toHaveBeenCalled()
    })
  })

  describe('with callbacks', () => {
    describe('should fire onRequestShowOptions', () => {
      it('when label is clicked', async () => {
        const onRequestShowOptions = vi.fn()

        const { rerender } = await render(
          <Selectable
            isShowingOptions={false}
            onRequestShowOptions={onRequestShowOptions}
          >
            {(selectable) => getSelectable(selectable)}
          </Selectable>
        )
        const label = page.getByText('Selectable').element()

        await userEvent.click(label)

        await vi.waitFor(() => {
          expect(onRequestShowOptions).toHaveBeenCalledTimes(1)
        })

        // Set isShowingOptions:
        await rerender(
          <Selectable
            isShowingOptions={true}
            onRequestShowOptions={onRequestShowOptions}
          >
            {(selectable) => getSelectable(selectable)}
          </Selectable>
        )

        await userEvent.click(label)

        await vi.waitFor(() => {
          expect(onRequestShowOptions).toHaveBeenCalledTimes(1)
        })
      })

      it('when input is clicked', async () => {
        const onRequestShowOptions = vi.fn()

        const { rerender } = await render(
          <Selectable
            isShowingOptions={false}
            onRequestShowOptions={onRequestShowOptions}
          >
            {(selectable) => getSelectable(selectable)}
          </Selectable>
        )
        const input = page.getByRole('combobox').element()

        await userEvent.click(input)

        await vi.waitFor(() => {
          expect(onRequestShowOptions).toHaveBeenCalledTimes(1)
        })

        await rerender(
          <Selectable
            isShowingOptions={true}
            onRequestShowOptions={onRequestShowOptions}
          >
            {(selectable) => getSelectable(selectable)}
          </Selectable>
        )

        await userEvent.click(input)

        await vi.waitFor(() => {
          expect(onRequestShowOptions).toHaveBeenCalledTimes(1)
        })
      })

      it('when up/down arrows are pressed', async () => {
        const onRequestShowOptions = vi.fn()

        await render(
          <Selectable
            isShowingOptions={false}
            onRequestShowOptions={onRequestShowOptions}
          >
            {(selectable) => getSelectable(selectable)}
          </Selectable>
        )
        const input = page.getByRole('combobox').element()

        input.focus()
        await userEvent.keyboard('{ArrowDown}')
        await vi.waitFor(() => {
          expect(onRequestShowOptions).toHaveBeenCalledTimes(1)
        })

        await userEvent.keyboard('{ArrowUp}')
        await vi.waitFor(() => {
          expect(onRequestShowOptions).toHaveBeenCalledTimes(2)
        })
      })

      it('when space is pressed', async () => {
        const onRequestShowOptions = vi.fn()

        const { rerender } = await render(
          <Selectable onRequestShowOptions={onRequestShowOptions}>
            {(selectable) => getSelectable(selectable)}
          </Selectable>
        )
        const input = page.getByRole('combobox').element()

        input.focus()
        await userEvent.keyboard(' ')

        await rerender(
          <Selectable
            isShowingOptions={true}
            onRequestShowOptions={onRequestShowOptions}
          >
            {(selectable) => getSelectable(selectable)}
          </Selectable>
        )

        input.focus()
        await userEvent.keyboard(' ')
        await vi.waitFor(() => {
          expect(onRequestShowOptions).toHaveBeenCalledTimes(1)
        })
      })
    })

    describe('should fire onRequestHideOptions', () => {
      it('when label is clicked', async () => {
        const onRequestHideOptions = vi.fn()

        const { rerender } = await render(
          <Selectable
            isShowingOptions={true}
            onRequestHideOptions={onRequestHideOptions}
          >
            {(selectable) => getSelectable(selectable)}
          </Selectable>
        )
        const label = page.getByText('Selectable').element()

        await userEvent.click(label)
        await vi.waitFor(() => {
          expect(onRequestHideOptions).toHaveBeenCalledTimes(1)
        })

        await rerender(
          <Selectable
            isShowingOptions={false}
            onRequestHideOptions={onRequestHideOptions}
          >
            {(selectable) => getSelectable(selectable)}
          </Selectable>
        )

        await userEvent.click(label)
        await vi.waitFor(() => {
          expect(onRequestHideOptions).toHaveBeenCalledTimes(1)
        })
      })

      it('when input is clicked', async () => {
        const onRequestHideOptions = vi.fn()

        const { rerender } = await render(
          <Selectable
            isShowingOptions={true}
            onRequestHideOptions={onRequestHideOptions}
          >
            {(selectable) => getSelectable(selectable)}
          </Selectable>
        )
        const input = page.getByRole('combobox').element()

        await userEvent.click(input)
        await vi.waitFor(() => {
          expect(onRequestHideOptions).toHaveBeenCalledTimes(1)
        })

        await rerender(
          <Selectable
            isShowingOptions={false}
            onRequestHideOptions={onRequestHideOptions}
          >
            {(selectable) => getSelectable(selectable)}
          </Selectable>
        )

        await userEvent.click(input)
        await vi.waitFor(() => {
          expect(onRequestHideOptions).toHaveBeenCalledTimes(1)
        })
      })
    })
  })

  describe('getRootProps()', () => {
    it('should provide prop getter for root element', async () => {
      const renderSpy = vi.fn()

      await render(
        <Selectable>
          {(selectable) => {
            renderSpy(selectable)
            return null
          }}
        </Selectable>
      )
      const selectableProps = renderSpy.mock.calls[0][0]
      expect(selectableProps.getRootProps).toBeDefined()
    })

    it('should allow custom props to pass through', async () => {
      await render(
        <Selectable>
          {(selectable) => (
            <span
              {...selectable.getRootProps({
                'data-custom-attr': true,
                className: 'customClass',
                style: { color: 'red' }
              })}
            >
              <label {...selectable.getLabelProps()}>Selectable</label>
              <input
                type="text"
                {...selectable.getTriggerProps()}
                {...selectable.getInputProps()}
              />
            </span>
          )}
        </Selectable>
      )
      const root = page.getByText('Selectable').element().closest('span')

      expect(root).toHaveAttribute('data-custom-attr', 'true')
      expect(root).toHaveClass('customClass')
      expect(root).toHaveStyle('color: rgb(255, 0, 0)')
    })

    it('should allow supplemental onClick behavior', async () => {
      const onClick = vi.fn()
      const onRequestShowOptions = vi.fn()

      await render(
        <Selectable onRequestShowOptions={onRequestShowOptions}>
          {(selectable) => (
            <span>
              <input
                type="text"
                {...selectable.getTriggerProps({ onClick })}
                {...selectable.getInputProps()}
              />
            </span>
          )}
        </Selectable>
      )
      const input = page.getByRole('combobox').element()

      await userEvent.click(input)
      await vi.waitFor(() => {
        expect(onClick).toHaveBeenCalledTimes(1)
        expect(onRequestShowOptions).toHaveBeenCalledTimes(1)
      })
    })
  })

  describe('getLabelProps()', () => {
    it('should provide prop getter for label element', async () => {
      const renderSpy = vi.fn()

      await render(
        <Selectable>
          {(selectable) => {
            renderSpy(selectable)
            return null
          }}
        </Selectable>
      )

      expect(renderSpy.mock.calls[0].length > 0).toBeTruthy()
    })

    it('should set htmlFor prop', async () => {
      await render(
        <Selectable>
          {(selectable) => (
            <span>
              <label {...selectable.getLabelProps()}>Selectable</label>
              <input
                type="text"
                {...selectable.getTriggerProps()}
                {...selectable.getInputProps()}
              />
            </span>
          )}
        </Selectable>
      )
      const label = page.getByText('Selectable').element()
      const input = page.getByRole('combobox').element()

      expect(label).toHaveAttribute('for', input.getAttribute('id'))
    })

    it('should set htmlFor prop with custom defined id', async () => {
      const customId = 'CustomSelect'

      await render(
        <Selectable id={customId}>
          {(selectable) => (
            <span>
              <label {...selectable.getLabelProps()}>Selectable</label>
              <input
                type="text"
                {...selectable.getTriggerProps()}
                {...selectable.getInputProps()}
              />
            </span>
          )}
        </Selectable>
      )
      const label = page.getByText('Selectable').element()
      const input = page.getByRole('combobox').element()

      expect(input).toHaveAttribute('id', customId)
      expect(label).toHaveAttribute('for', customId)
    })

    it('should allow custom props to pass through', async () => {
      await render(
        <Selectable>
          {(selectable) => (
            <span>
              <label
                {...selectable.getLabelProps({
                  'data-custom-attr': true,
                  className: 'customClass',
                  style: { color: 'red' }
                })}
              >
                Selectable
              </label>
              <input
                type="text"
                {...selectable.getTriggerProps()}
                {...selectable.getInputProps()}
              />
            </span>
          )}
        </Selectable>
      )
      const label = page.getByText('Selectable').element()

      expect(label).toHaveAttribute('data-custom-attr', 'true')
      expect(label).toHaveClass('customClass')
      expect(label).toHaveStyle({ color: 'rgb(255, 0, 0)' })
    })
  })

  describe('getTriggerProps()', () => {
    it('should provide prop getter for trigger element', async () => {
      const renderSpy = vi.fn()

      await render(
        <Selectable>
          {(selectable) => {
            renderSpy(selectable)
            return null
          }}
        </Selectable>
      )
      expect(renderSpy.mock.calls[0][0].getTriggerProps).toBeDefined()
    })

    it('should set appropriate prop defaults', async () => {
      const { container } = await render(
        <Selectable>
          {(selectable) => (
            <span>
              <input type="text" {...selectable.getTriggerProps()} />
              <span {...selectable.getDescriptionProps()}>description</span>
            </span>
          )}
        </Selectable>
      )

      const input = container.querySelector('input')
      const desc = page.getByText('description').element()

      expect(input).toHaveAttribute('aria-haspopup', 'listbox')
      expect(input).toHaveAttribute('aria-describedby', desc.id)
      expect(input).toHaveAttribute('id')
    })

    it('should set appropriate props based on isShowingOptions', async () => {
      const { container, rerender } = await render(
        <Selectable isShowingOptions={false}>
          {(selectable) => (
            <span>
              <input type="text" {...selectable.getTriggerProps()} />
              <ul {...selectable.getListProps()}></ul>
            </span>
          )}
        </Selectable>
      )
      const input = container.querySelector('input')
      const list = page.getByRole('listbox').element()

      expect(input).toHaveAttribute('aria-expanded', 'false')
      expect(input).not.toHaveAttribute('aria-controls')

      // Set prop: isShowingOptions true
      await rerender(
        <Selectable isShowingOptions={true}>
          {(selectable) => (
            <span>
              <input type="text" {...selectable.getTriggerProps()} />
              <ul {...selectable.getListProps()}></ul>
            </span>
          )}
        </Selectable>
      )

      expect(input).toHaveAttribute('aria-expanded', 'true')
      expect(input).toHaveAttribute('aria-controls', list.id)
    })

    it('should set appropriate props based on highlightedOptionId', async () => {
      const { container, rerender } = await render(
        <Selectable isShowingOptions={true}>
          {(selectable) => (
            <span>
              <input type="text" {...selectable.getTriggerProps()} />
              <ul {...selectable.getListProps()}>
                {defaultOptions.map((opt) => (
                  <li key={opt} {...selectable.getOptionProps({ id: opt })} />
                ))}
              </ul>
            </span>
          )}
        </Selectable>
      )
      const input = container.querySelector('input')
      const options = page.getByRole('option').elements()

      expect(input).not.toHaveAttribute('aria-activedescendant')

      // Set prop: highlightedOptionId
      await rerender(
        <Selectable
          isShowingOptions={true}
          highlightedOptionId={defaultOptions[0]}
        >
          {(selectable) => (
            <span>
              <input type="text" {...selectable.getTriggerProps()} />
              <ul {...selectable.getListProps()}>
                {defaultOptions.map((opt) => (
                  <li key={opt} {...selectable.getOptionProps({ id: opt })} />
                ))}
              </ul>
            </span>
          )}
        </Selectable>
      )
      expect(input).toHaveAttribute('aria-activedescendant', options[0].id)

      // Set prop: highlightedOptionId
      await rerender(
        <Selectable
          isShowingOptions={true}
          highlightedOptionId={defaultOptions[1]}
        >
          {(selectable) => (
            <span>
              <input type="text" {...selectable.getTriggerProps()} />
              <ul {...selectable.getListProps()}>
                {defaultOptions.map((opt) => (
                  <li key={opt} {...selectable.getOptionProps({ id: opt })} />
                ))}
              </ul>
            </span>
          )}
        </Selectable>
      )
      expect(input).toHaveAttribute('aria-activedescendant', options[1].id)

      // Set prop: isShowingOptions
      await rerender(
        <Selectable
          isShowingOptions={false}
          highlightedOptionId={defaultOptions[1]}
        >
          {(selectable) => (
            <span>
              <input type="text" {...selectable.getTriggerProps()} />
              <ul {...selectable.getListProps()}>
                {defaultOptions.map((opt) => (
                  <li key={opt} {...selectable.getOptionProps({ id: opt })} />
                ))}
              </ul>
            </span>
          )}
        </Selectable>
      )
      expect(input).not.toHaveAttribute('aria-activedescendant')
    })

    it('should allow custom props to pass through', async () => {
      const { container } = await render(
        <Selectable>
          {(selectable) => (
            <span>
              <input
                type="text"
                {...selectable.getTriggerProps({
                  'data-custom-attr': true,
                  placeholder: 'Type to enter text',
                  className: 'customClass',
                  style: { color: 'red' }
                })}
              />
            </span>
          )}
        </Selectable>
      )
      const input = container.querySelector('input')

      expect(input).toHaveAttribute('data-custom-attr', 'true')
      expect(input).toHaveAttribute('style', 'color: red;')
      expect(input).toHaveAttribute('placeholder')
      expect(input).toHaveClass('customClass')
    })

    it('should allow props to be overridden', async () => {
      const { container } = await render(
        <Selectable>
          {(selectable) => (
            <span>
              <input
                type="text"
                {...selectable.getTriggerProps({
                  'aria-haspopup': 'menu',
                  'aria-controls': 'customId'
                })}
              />
            </span>
          )}
        </Selectable>
      )
      const input = container.querySelector('input')

      expect(input).toHaveAttribute('aria-haspopup', 'menu')
      expect(input).toHaveAttribute('aria-controls', 'customId')
    })

    it('should provide a ref to the text input', async () => {
      const inputRef = vi.fn()

      const { container } = await render(
        <Selectable>
          {(selectable) => (
            <span>
              <input
                type="text"
                {...selectable.getTriggerProps({
                  ref: inputRef
                })}
              />
            </span>
          )}
        </Selectable>
      )
      const input = container.querySelector('input')

      expect(inputRef).toHaveBeenCalledWith(input)
    })

    it('should allow role and aria-autocomplete props to be overridden', async () => {
      const { container } = await render(
        <Selectable>
          {(selectable) => (
            <span>
              <input
                type="text"
                {...selectable.getTriggerProps({
                  role: 'textbox',
                  'aria-autocomplete': 'list'
                })}
              />
            </span>
          )}
        </Selectable>
      )
      const input = container.querySelector('input')

      expect(input).toHaveAttribute('role', 'textbox')
      expect(input).toHaveAttribute('aria-autocomplete', 'list')
    })

    it('should allow supplemental onClick behavior', async () => {
      const onClick = vi.fn()

      const onRequestShowOptions = vi.fn()

      await render(
        <Selectable onRequestShowOptions={onRequestShowOptions}>
          {(selectable) => (
            <span {...selectable.getRootProps()}>
              <input
                type="text"
                {...selectable.getTriggerProps({ onClick })}
                {...selectable.getInputProps()}
              />
            </span>
          )}
        </Selectable>
      )
      const input = page.getByRole('combobox').element()

      await userEvent.click(input)
      expect(onClick).toHaveBeenCalledTimes(1)
      expect(onRequestShowOptions).toHaveBeenCalledTimes(1)
    })
  })

  describe('getInputProps()', () => {
    it('should provide prop getter for trigger element', async () => {
      const renderSpy = vi.fn()

      await render(
        <Selectable>
          {(selectable) => {
            renderSpy(selectable)
            return null
          }}
        </Selectable>
      )
      const args = renderSpy.mock.calls[0][0]

      expect(args.getInputProps).toBeDefined()
    })

    it('should set appropriate prop defaults', async () => {
      const { container } = await render(
        <Selectable>
          {(selectable) => (
            <span>
              <input type="text" {...selectable.getInputProps()} />
            </span>
          )}
        </Selectable>
      )
      const input = container.querySelector('input')

      expect(input).toHaveAttribute('role', 'combobox')
      expect(input).toHaveAttribute('aria-autocomplete', 'both')
      expect(input).toHaveAttribute('autocomplete', 'off')
    })

    it('should set appropriate props when readOnly', async () => {
      await render(
        <Selectable>
          {(selectable) => (
            <span>
              <input
                type="text"
                {...selectable.getInputProps({ readOnly: true })}
              />
            </span>
          )}
        </Selectable>
      )
      const input = page.getByRole('combobox').element()

      expect(input).toHaveAttribute('aria-autocomplete', 'none')
      expect(input).toHaveAttribute('readOnly')
      expect(input).not.toHaveAttribute('disabled')
    })

    it('should allow props to be overridden', async () => {
      const { container } = await render(
        <Selectable>
          {(selectable) => (
            <span>
              <input
                type="text"
                {...selectable.getInputProps({
                  role: 'textbox',
                  'aria-autocomplete': 'inline'
                })}
              />
            </span>
          )}
        </Selectable>
      )
      const input = container.querySelector('input')

      expect(input).toHaveAttribute('role', 'textbox')
      expect(input).toHaveAttribute('aria-autocomplete', 'inline')
    })

    it('should allow custom props to pass through', async () => {
      const { container } = await render(
        <Selectable>
          {(selectable) => (
            <span>
              <input
                type="text"
                {...selectable.getInputProps({
                  'data-custom-attr': true,
                  placeholder: 'Type to enter text',
                  className: 'customClass',
                  style: { color: 'red' }
                })}
              />
            </span>
          )}
        </Selectable>
      )
      const input = container.querySelector('input')

      expect(input).toHaveAttribute('data-custom-attr', 'true')
      expect(input).toHaveAttribute('placeholder')
      expect(input).toHaveClass('customClass')
      expect(input).toHaveAttribute('style', 'color: red;')
    })
  })

  describe('getListProps()', () => {
    it('should provide prop getter for list element', async () => {
      const renderSpy = vi.fn()

      await render(
        <Selectable>
          {(selectable) => {
            renderSpy(selectable)
            return null
          }}
        </Selectable>
      )
      const args = renderSpy.mock.calls[0][0]

      expect(args.getListProps).toBeDefined()
    })

    it('should set appropriate prop defaults', async () => {
      const { container } = await render(
        <Selectable isShowingOptions={true}>
          {(selectable) => (
            <span {...selectable.getRootProps()}>
              <input type="text" {...selectable.getTriggerProps()} />
              <ul {...selectable.getListProps()}></ul>
            </span>
          )}
        </Selectable>
      )
      const list = container.querySelector('ul')

      expect(list).toHaveAttribute('id')
      expect(list).toHaveAttribute('role', 'listbox')
    })

    it('should allow custom props to pass through', async () => {
      const { container } = await render(
        <Selectable isShowingOptions={true}>
          {(selectable) => (
            <span {...selectable.getRootProps()}>
              <input type="text" {...selectable.getTriggerProps()} />
              <ul
                {...selectable.getListProps({
                  'data-custom-attr': true,
                  className: 'customClass',
                  style: { color: 'red' }
                })}
              ></ul>
            </span>
          )}
        </Selectable>
      )
      const list = container.querySelector('ul')

      expect(list).toHaveAttribute('data-custom-attr', 'true')
      expect(list).toHaveClass('customClass')
      expect(list).toHaveAttribute('style', 'color: red;')
    })
  })

  describe('getOptionProps()', () => {
    it('should provide prop getter for option element', async () => {
      const renderSpy = vi.fn()

      await render(
        <Selectable>
          {(selectable) => {
            renderSpy(selectable)
            return null
          }}
        </Selectable>
      )
      const args = renderSpy.mock.calls[0][0]

      expect(args.getOptionProps).toBeDefined()
    })

    it('should set appropriate prop defaults', async () => {
      await render(
        <Selectable>
          {(selectable) => (
            <span>
              <input type="text" {...selectable.getTriggerProps()} />
              <ul {...selectable.getListProps()}>
                {defaultOptions.map((opt) => (
                  <li key={opt} {...selectable.getOptionProps({ id: opt })}>
                    {opt}
                  </li>
                ))}
              </ul>
            </span>
          )}
        </Selectable>
      )
      const option = page.getByText(defaultOptions[0]).element()

      expect(option.tagName).toBe('LI')
      expect(option).toHaveAttribute('role', 'option')
      expect(option).toHaveAttribute('aria-selected', 'false')
    })

    it('should set aria-selected based on selectedOptionId', async () => {
      const { container, rerender } = await render(
        <Selectable selectedOptionId={defaultOptions[1]}>
          {(selectable) => (
            <span>
              <input type="text" {...selectable.getTriggerProps()} />
              <ul {...selectable.getListProps()}>
                {defaultOptions.map((opt) => (
                  <li key={opt} {...selectable.getOptionProps({ id: opt })}>
                    {opt}
                  </li>
                ))}
              </ul>
            </span>
          )}
        </Selectable>
      )
      const options = container.querySelectorAll('li')

      expect(options[0]).toHaveAttribute('aria-selected', 'false')
      expect(options[1]).toHaveAttribute('aria-selected', 'true')
      expect(options[2]).toHaveAttribute('aria-selected', 'false')

      // Set prop: selectedOptionId
      await rerender(
        <Selectable selectedOptionId={[defaultOptions[0], defaultOptions[1]]}>
          {(selectable) => (
            <span>
              <input type="text" {...selectable.getTriggerProps()} />
              <ul {...selectable.getListProps()}>
                {defaultOptions.map((opt) => (
                  <li key={opt} {...selectable.getOptionProps({ id: opt })}>
                    {opt}
                  </li>
                ))}
              </ul>
            </span>
          )}
        </Selectable>
      )

      expect(options[0]).toHaveAttribute('aria-selected', 'true')
      expect(options[1]).toHaveAttribute('aria-selected', 'true')
      expect(options[2]).toHaveAttribute('aria-selected', 'false')
    })

    it('should allow custom props to pass through', async () => {
      await render(
        <Selectable>
          {(selectable) => (
            <span>
              <input type="text" {...selectable.getTriggerProps()} />
              <ul {...selectable.getListProps()}>
                {defaultOptions.map((opt) => (
                  <li
                    key={opt}
                    {...selectable.getOptionProps({
                      id: opt,
                      'data-custom-attr': true,
                      className: 'customClass',
                      style: { color: 'red' }
                    })}
                  >
                    {opt}
                  </li>
                ))}
              </ul>
            </span>
          )}
        </Selectable>
      )
      const option = page.getByText(defaultOptions[0]).element()

      expect(option.tagName).toBe('LI')
      expect(option).toHaveAttribute('data-custom-attr', 'true')
      expect(option).toHaveClass('customClass')
      expect(option).toHaveAttribute('style', 'color: red;')
    })

    it('should allow supplemental onClick behavior', async () => {
      const onClick = vi.fn()
      const onRequestSelectOption = vi.fn()

      await render(
        <Selectable
          isShowingOptions={true}
          onRequestSelectOption={onRequestSelectOption}
        >
          {(selectable) => (
            <span>
              <input type="text" {...selectable.getInputProps()} />
              <ul {...selectable.getListProps()}>
                {defaultOptions.map((opt) => (
                  <li
                    key={opt}
                    {...selectable.getOptionProps({ id: opt, onClick })}
                  >
                    {opt}
                  </li>
                ))}
              </ul>
            </span>
          )}
        </Selectable>
      )
      const option_0 = page.getByText(defaultOptions[0]).element()
      const option_1 = page.getByText(defaultOptions[1]).element()

      await userEvent.click(option_0)
      await userEvent.click(option_1)

      await vi.waitFor(() => {
        expect(onRequestSelectOption).toHaveBeenCalledTimes(2)
        expect(onClick).toHaveBeenCalledTimes(2)
      })
    })
  })

  describe('getDisabledOptionProps()', () => {
    it('should provide prop getter for disabled option element', async () => {
      const renderSpy = vi.fn()

      await render(
        <Selectable>
          {(selectable) => {
            renderSpy(selectable)
            return null
          }}
        </Selectable>
      )
      const args = renderSpy.mock.calls[0][0]

      expect(args.getDisabledOptionProps).toBeDefined()
    })

    it('should set aria-disabled prop', async () => {
      await render(
        <Selectable>
          {(selectable) => (
            <span>
              <input
                type="text"
                {...selectable.getTriggerProps()}
                {...selectable.getInputProps()}
              />
              <ul {...selectable.getListProps()}>
                {defaultOptions.map((opt) => (
                  <li
                    key={opt}
                    {...selectable.getOptionProps({ id: opt })}
                    {...selectable.getDisabledOptionProps()}
                  >
                    {opt}
                  </li>
                ))}
              </ul>
            </span>
          )}
        </Selectable>
      )
      const option = page.getByText(defaultOptions[0]).element()

      expect(option.tagName).toBe('LI')
      expect(option).toHaveAttribute('aria-disabled', 'true')
    })
  })

  describe('getDescriptionProps()', () => {
    it('should provide prop getter for description element', async () => {
      const renderSpy = vi.fn()

      await render(
        <Selectable>
          {(selectable) => {
            renderSpy(selectable)
            return null
          }}
        </Selectable>
      )
      const selectableProps = renderSpy.mock.calls[0][0]

      expect(selectableProps.getDescriptionProps).toBeDefined()
    })
  })

  describe('Component tests', () => {
    // the real cursor stays where the previous test left it, which can hover an
    // option of the next render: park it off-component before each test
    beforeEach(async () => {
      const parkingSpot = document.createElement('div')
      parkingSpot.style.cssText =
        'position:fixed;right:0;bottom:0;width:20px;height:20px'
      document.body.appendChild(parkingSpot)
      await userEvent.hover(parkingSpot)
      parkingSpot.remove()
    })

    it('should fire onRequestHideOptions when escape is pressed', async () => {
      const onRequestHideOptions = vi.fn()
      let defaultPrevented = false

      await render(
        <div
          role="button"
          tabIndex={0}
          onKeyUp={(e) => {
            defaultPrevented = e.defaultPrevented
          }}
        >
          <Selectable
            isShowingOptions={true}
            onRequestHideOptions={onRequestHideOptions}
          >
            {(selectable) => getSelectable(selectable)}
          </Selectable>
        </div>
      )
      const input = page.getByRole('combobox').element()

      input.focus()
      await userEvent.keyboard('{Escape}')

      expect(onRequestHideOptions).toHaveBeenCalledOnce()
      expect(defaultPrevented).toBe(true)
    })

    it('should fire onRequestHighlightOption when options are hovered', async () => {
      const onRequestHighlightOption = vi.fn()

      const { container } = await render(
        <Selectable onRequestHighlightOption={onRequestHighlightOption}>
          {(selectable) => getSelectable(selectable)}
        </Selectable>
      )
      const options = container.querySelectorAll('li')

      await userEvent.hover(options[0])
      await vi.waitFor(() => {
        expect(onRequestHighlightOption).toHaveBeenCalled()
      })
      expect(onRequestHighlightOption.mock.lastCall![1]).toHaveProperty(
        'id',
        defaultOptions[0]
      )
      expect(onRequestHighlightOption.mock.lastCall![1]).not.toHaveProperty(
        'direction'
      )

      await userEvent.hover(options[1])
      await vi.waitFor(() => {
        expect(onRequestHighlightOption.mock.lastCall![1]).toHaveProperty(
          'id',
          defaultOptions[1]
        )
      })
      expect(onRequestHighlightOption.mock.lastCall![1]).not.toHaveProperty(
        'direction'
      )
    })

    it('should fire onRequestHighlightOption when up/down arrows are pressed', async () => {
      const onRequestShowOptions = vi.fn()
      const onRequestHighlightOption = vi.fn()

      const { rerender } = await render(
        <Selectable
          isShowingOptions={false}
          onRequestShowOptions={onRequestShowOptions}
          onRequestHighlightOption={onRequestHighlightOption}
        >
          {(selectable) => getSelectable(selectable)}
        </Selectable>
      )
      const input = page.getByRole('combobox').element()

      input.focus()
      await userEvent.keyboard('{ArrowDown}')
      await vi.waitFor(() => {
        expect(onRequestShowOptions).toHaveBeenCalled()
      })
      expect(onRequestHighlightOption).not.toHaveBeenCalled()

      // Set prop: isShowingOptions, highlightedOptionId
      await rerender(
        <Selectable
          isShowingOptions={true}
          highlightedOptionId={defaultOptions[0]}
          onRequestShowOptions={onRequestShowOptions}
          onRequestHighlightOption={onRequestHighlightOption}
        >
          {(selectable) => getSelectable(selectable)}
        </Selectable>
      )

      input.focus()
      await userEvent.keyboard('{ArrowDown}')
      await vi.waitFor(() => {
        expect(onRequestHighlightOption.mock.lastCall![1]).toHaveProperty(
          'direction',
          1
        )
      })
      expect(onRequestHighlightOption.mock.lastCall![1]).not.toHaveProperty(
        'id'
      )

      // Set prop: highlightedOptionId
      await rerender(
        <Selectable
          isShowingOptions={true}
          highlightedOptionId={defaultOptions[1]}
          onRequestShowOptions={onRequestShowOptions}
          onRequestHighlightOption={onRequestHighlightOption}
        >
          {(selectable) => getSelectable(selectable)}
        </Selectable>
      )

      input.focus()
      await userEvent.keyboard('{ArrowUp}')
      await vi.waitFor(() => {
        expect(onRequestHighlightOption.mock.lastCall![1]).toHaveProperty(
          'direction',
          -1
        )
      })
      expect(onRequestHighlightOption.mock.lastCall![1]).not.toHaveProperty(
        'id'
      )
    })

    it('should fire onRequestHighlightFirst/LastOption when home/end is pressed', async () => {
      const onRequestHighlightOption = vi.fn()
      const onRequestHighlightFirstOption = vi.fn()
      const onRequestHighlightLastOption = vi.fn()

      await render(
        <Selectable
          isShowingOptions={true}
          highlightedOptionId={defaultOptions[1]}
          onRequestHighlightOption={onRequestHighlightOption}
          onRequestHighlightFirstOption={onRequestHighlightFirstOption}
          onRequestHighlightLastOption={onRequestHighlightLastOption}
        >
          {(selectable) => getSelectable(selectable)}
        </Selectable>
      )
      const input = page.getByRole('combobox').element()

      input.focus()
      await userEvent.keyboard('{Home}')
      await userEvent.keyboard('{End}')

      await vi.waitFor(() => {
        expect(onRequestHighlightFirstOption).toHaveBeenCalledOnce()
        expect(onRequestHighlightLastOption).toHaveBeenCalledOnce()
      })
      expect(onRequestHighlightOption).not.toHaveBeenCalled()
    })

    it('should fire onRequestSelectOption when enter is pressed', async () => {
      const onRequestSelectOption = vi.fn()

      await render(
        <Selectable
          isShowingOptions={true}
          highlightedOptionId={defaultOptions[1]}
          onRequestSelectOption={onRequestSelectOption}
        >
          {(selectable) => getSelectable(selectable)}
        </Selectable>
      )
      const input = page.getByRole('combobox').element()

      input.focus()
      await userEvent.keyboard('{Enter}')

      await vi.waitFor(() => {
        expect(onRequestSelectOption.mock.lastCall![1]).toHaveProperty(
          'id',
          defaultOptions[1]
        )
      })
    })

    it('should fire onRequestSelectOption when options are clicked', async () => {
      const onRequestSelectOption = vi.fn()

      const { container } = await render(
        <Selectable
          isShowingOptions={true}
          onRequestSelectOption={onRequestSelectOption}
        >
          {(selectable) => getSelectable(selectable)}
        </Selectable>
      )
      const options = container.querySelectorAll('li')

      await userEvent.click(options[1])

      await vi.waitFor(() => {
        expect(onRequestSelectOption.mock.lastCall![1]).toHaveProperty(
          'id',
          defaultOptions[1]
        )
      })
    })

    it('getRootProps() should allow supplemental onKeyDown behavior', async () => {
      const onKeyDown = vi.fn()
      const onRequestHighlightOption = vi.fn()

      await render(
        <Selectable
          isShowingOptions={true}
          highlightedOptionId={defaultOptions[1]}
          onRequestHighlightOption={onRequestHighlightOption}
        >
          {(selectable) => (
            <span {...selectable.getRootProps({ onKeyDown })}>
              <input
                type="text"
                {...selectable.getTriggerProps()}
                {...selectable.getInputProps()}
              />
            </span>
          )}
        </Selectable>
      )
      const input = page.getByRole('combobox').element()

      input.focus()
      await userEvent.keyboard('{ArrowDown}')
      await userEvent.keyboard('{ArrowUp}')

      await vi.waitFor(() => {
        expect(onRequestHighlightOption).toHaveBeenCalledTimes(2)
        expect(onKeyDown).toHaveBeenCalledTimes(2)
      })
    })

    it('getTriggerProps() should allow supplemental onKeyDown behavior', async () => {
      const onKeyDown = vi.fn()
      const onRequestHighlightOption = vi.fn()

      await render(
        <Selectable
          isShowingOptions={true}
          highlightedOptionId={defaultOptions[1]}
          onRequestHighlightOption={onRequestHighlightOption}
        >
          {(selectable) => (
            <span {...selectable.getRootProps()}>
              <input
                type="text"
                {...selectable.getTriggerProps({ onKeyDown })}
                {...selectable.getInputProps()}
              />
            </span>
          )}
        </Selectable>
      )
      const input = page.getByRole('combobox').element()

      input.focus()
      await userEvent.keyboard('{ArrowDown}')
      await userEvent.keyboard('{ArrowUp}')
      await userEvent.keyboard('a')

      await vi.waitFor(() => {
        expect(onRequestHighlightOption).toHaveBeenCalledTimes(2)
        expect(onKeyDown).toHaveBeenCalledTimes(3)
      })
    })

    it('getOptionProps() should allow supplemental onMouseOver behavior', async () => {
      const onMouseOver = vi.fn()
      const onRequestHighlightOption = vi.fn()

      const { container } = await render(
        <Selectable
          isShowingOptions={true}
          onRequestHighlightOption={onRequestHighlightOption}
        >
          {(selectable) => (
            <span>
              <input type="text" {...selectable.getInputProps()} />
              <ul {...selectable.getListProps()}>
                {defaultOptions.map((opt) => (
                  <li
                    key={opt}
                    {...selectable.getOptionProps({ id: opt, onMouseOver })}
                  >
                    {opt}
                  </li>
                ))}
              </ul>
            </span>
          )}
        </Selectable>
      )
      const options = container.querySelectorAll('li')

      await userEvent.hover(options[0])
      await userEvent.hover(options[1])

      await vi.waitFor(() => {
        expect(onMouseOver).toHaveBeenCalledTimes(2)
        expect(onRequestHighlightOption).toHaveBeenCalledTimes(2)
      })
    })
  })
})
