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

import {
  Children,
  forwardRef,
  isValidElement,
  useImperativeHandle,
  useRef,
  useState
} from 'react'
import type { KeyboardEvent, SyntheticEvent } from 'react'

import { logError as error } from '@instructure/console'
import { useStyleNew } from '@instructure/emotion'
import { IconButton } from '@instructure/ui-buttons/latest'
import {
  ChevronLeftInstUIIcon,
  ChevronRightInstUIIcon
} from '@instructure/ui-icons'
import {
  callRenderProp,
  omitProps,
  passthroughProps
} from '@instructure/ui-react-utils'

import { SegmentedControlOption } from '../../SegmentedControlOption/v1/index.js'
import type { SegmentedControlOptionProps } from '../../SegmentedControlOption/v1/props'
import { SegmentedControlContext } from './SegmentedControlContext.js'
import generateStyle from './styles.js'
import type { SegmentedControlProps } from './props'
import { allowedProps } from './props.js'
import { useOverflowScroll } from './useOverflowScroll.js'

const arrowSizes = { sm: 'small', md: 'medium', lg: 'large' } as const

/**
---
category: components
---
**/
const SegmentedControlBase = forwardRef<HTMLDivElement, SegmentedControlProps>(
  (props, ref) => {
    const {
      children,
      value,
      defaultValue,
      onChange,
      size = 'lg',
      isDisabled = false,
      isOverflown = false,
      renderPreviousLabel,
      renderNextLabel,
      themeOverride
    } = props

    const isControlled = value !== undefined
    const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue)
    const selectedValue = isControlled ? value : uncontrolledValue

    error(
      !isControlled || !!onChange,
      '[SegmentedControl] The `value` prop requires an `onChange` handler, otherwise the selection can never change.'
    )

    const styles = useStyleNew({
      generateStyle,
      themeOverride,
      params: { isDisabled, isOverflown },
      componentId: 'SegmentedControl',
      displayName: 'SegmentedControl'
    })

    error(
      !isOverflown || (!!renderPreviousLabel && !!renderNextLabel),
      '[SegmentedControl] `isOverflown` needs `renderPreviousLabel` and `renderNextLabel` so screen readers can name the arrows.'
    )

    const trackRef = useRef<HTMLDivElement | null>(null)
    const previousArrowRef = useRef<HTMLSpanElement | null>(null)
    const nextArrowRef = useRef<HTMLSpanElement | null>(null)
    useImperativeHandle(ref, () => trackRef.current as HTMLDivElement)

    const optionElements = Children.toArray(children).filter(isValidElement)
    const optionProps = optionElements.map(
      (child) => child.props as SegmentedControlOptionProps
    )
    const enabledOptions = optionProps.filter((option) => !option.isDisabled)
    const selectedOption = enabledOptions.find(
      (option) => option.value === selectedValue
    )
    const tabbableValue = (selectedOption ?? enabledOptions[0])?.value

    error(
      optionElements.every((child) => child.type === SegmentedControlOption),
      '[SegmentedControl] Every child must be a `SegmentedControl.Option`. Fragments and wrapper components break keyboard navigation.'
    )

    // the overflow styles are not applied before the first render has finished
    const { canScrollPrevious, canScrollNext, scroll } = useOverflowScroll({
      trackRef,
      isEnabled: isOverflown && !!styles,
      selectedValue,
      previousArrowRef,
      nextArrowRef
    })

    const handleSelect = (event: SyntheticEvent, newValue: string) => {
      if (newValue === selectedValue) return
      if (!isControlled) setUncontrolledValue(newValue)
      onChange?.(event, newValue)
    }

    const handleKeyDown = (event: KeyboardEvent<Element>) => {
      // leave browser and OS shortcuts such as Alt+ArrowLeft (history back) alone
      if (event.altKey || event.ctrlKey || event.metaKey) return

      const group = event.currentTarget.closest('[role="radiogroup"]')
      if (!group) return

      const options = Array.from(
        group.querySelectorAll<HTMLButtonElement>(
          '[role="radio"]:not(:disabled)'
        )
      )
      const current = options.indexOf(event.currentTarget as never)
      // the index mapping below only holds when every radio comes from an option child
      if (current === -1 || options.length !== enabledOptions.length) return

      const isRtl = getComputedStyle(group).direction === 'rtl'
      const forward = isRtl ? 'ArrowLeft' : 'ArrowRight'
      const backward = isRtl ? 'ArrowRight' : 'ArrowLeft'

      let next: number | undefined
      if (event.key === forward || event.key === 'ArrowDown') {
        next = (current + 1) % options.length
      } else if (event.key === backward || event.key === 'ArrowUp') {
        next = (current - 1 + options.length) % options.length
      } else if (event.key === 'Home') {
        next = 0
      } else if (event.key === 'End') {
        next = options.length - 1
      }

      if (next !== undefined) {
        event.preventDefault()
        options[next].focus()
        // enabled radios in the DOM follow the order of the enabled children
        handleSelect(event, enabledOptions[next].value)
      }
    }

    const radioGroup = (
      <div
        {...passthroughProps(omitProps(props, allowedProps))}
        role="radiogroup"
        aria-disabled={isDisabled || undefined}
        css={styles?.segmentedControl}
        ref={trackRef}
        data-cid="SegmentedControl"
      >
        {children}
      </div>
    )

    const renderArrow = (direction: 'previous' | 'next') => {
      const isPrevious = direction === 'previous'
      return (
        <span
          ref={isPrevious ? previousArrowRef : nextArrowRef}
          css={[
            styles?.arrow,
            isPrevious ? styles?.arrowPrevious : styles?.arrowNext
          ]}
        >
          <IconButton
            screenReaderLabel={callRenderProp(
              isPrevious ? renderPreviousLabel : renderNextLabel
            )}
            size={arrowSizes[size]}
            color="primary"
            renderIcon={
              isPrevious ? (
                <ChevronLeftInstUIIcon />
              ) : (
                <ChevronRightInstUIIcon />
              )
            }
            onClick={() => scroll(direction)}
            data-cid="SegmentedControlArrow"
          />
        </span>
      )
    }

    return (
      <SegmentedControlContext.Provider
        value={{
          size,
          isDisabled,
          selectedValue,
          tabbableValue,
          onSelect: handleSelect,
          onKeyDown: handleKeyDown
        }}
      >
        {isOverflown ? (
          <div css={styles?.overflowWrapper}>
            {radioGroup}
            {canScrollPrevious && renderArrow('previous')}
            {canScrollNext && renderArrow('next')}
          </div>
        ) : (
          radioGroup
        )}
      </SegmentedControlContext.Provider>
    )
  }
)

SegmentedControlBase.displayName = 'SegmentedControl'

const SegmentedControl = Object.assign(SegmentedControlBase, {
  Option: SegmentedControlOption
})

export default SegmentedControl
export { SegmentedControl }
